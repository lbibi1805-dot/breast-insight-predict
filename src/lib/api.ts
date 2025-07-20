
import axios from 'axios';

const API_BASE_URL = 'https://api-deploy-ml-breastcancer-wisconsin.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, // 30 second timeout for API calls
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface PredictionResponse {
  prediction: number;
  prediction_label: string;
  confidence: number;
  model_used: string;
  model_accuracy: string;
  // Extended fields from API
  risk_level?: string;
  medical_interpretation?: string;
  recommendation?: string;
  probabilities?: {
    benign: number;
    malignant: number;
  };
}

// New API response structure (what we actually receive)
interface ApiPredictionResponse {
  status: string;
  timestamp: string;
  prediction: {
    diagnosis: string;
    confidence: number;
    raw_prediction: number;
    risk_level: string;
    probabilities: {
      benign: number;
      malignant: number;
    };
  };
  input_features: Record<string, number>;
  medical_interpretation: {
    interpretation: string;
    recommendation: string;
    disclaimer: string;
  };
}

export interface BatchPredictionResponse {
  predictions: Array<{
    features: number[];
    prediction: number;
    prediction_label: string;
    confidence: number;
  }>;
  summary: {
    total_predictions: number;
    benign_count: number;
    malignant_count: number;
  };
}

export interface ModelInfoResponse {
  model_name: string;
  algorithm: string;
  k_value: number;
  accuracy: number; // Changed from string to number
  training_date: string;
  features_count: number;
  dataset: string;
}

// Health check endpoint
export const checkApiHealth = async (): Promise<string> => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    throw new Error(`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Batch prediction endpoint
export const batchPredict = async (featuresList: number[][]): Promise<BatchPredictionResponse> => {
  try {
    // Validate input
    if (!Array.isArray(featuresList) || featuresList.length === 0) {
      throw new Error('Features list must be a non-empty array');
    }

    // Validate each feature array
    featuresList.forEach((features, index) => {
      if (!Array.isArray(features) || features.length !== 9) {
        throw new Error(`Feature set ${index + 1} must be an array of exactly 9 numbers`);
      }
      features.forEach((feature, featureIndex) => {
        if (typeof feature !== 'number' || feature < 1 || feature > 10) {
          throw new Error(`Feature ${featureIndex + 1} in set ${index + 1} must be a number between 1 and 10`);
        }
      });
    });

    console.log('Sending batch prediction request with', featuresList.length, 'feature sets');
    
    const response = await apiClient.post<BatchPredictionResponse>('/predict/batch', {
      features_list: featuresList
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. The API might be starting up, please try again in a moment.');
      }
      throw new Error(`API error: ${error.response?.data?.detail || error.message}`);
    }
    throw new Error(`Batch prediction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Model information endpoint with better error handling
export const getModelInfo = async (): Promise<ModelInfoResponse> => {
  try {
    console.log('Fetching model information...');
    
    const response = await apiClient.get('/model/info');
    
    // Handle the nested response structure with fallbacks
    const modelInfo = response.data?.model_info || response.data || {};
    
    return {
      model_name: modelInfo.model_name || modelInfo.algorithm || 'KNN Classifier',
      algorithm: modelInfo.algorithm || 'K-Nearest Neighbors',
      k_value: modelInfo.k_value || 3,
      accuracy: typeof modelInfo.accuracy === 'number' 
        ? modelInfo.accuracy 
        : typeof modelInfo.accuracy === 'string' 
          ? parseFloat(modelInfo.accuracy.replace('%', '')) / 100
          : 0.9708, // Default 97.08%
      training_date: modelInfo.training_date || new Date().toISOString().split('T')[0],
      features_count: modelInfo.features_count || modelInfo.features?.length || 9,
      dataset: modelInfo.dataset || 'Wisconsin Breast Cancer Dataset'
    };
  } catch (error) {
    console.warn('Failed to fetch model info, using defaults:', error);
    
    // Return default model info if API fails
    return {
      model_name: 'KNN Classifier',
      algorithm: 'K-Nearest Neighbors',
      k_value: 3,
      accuracy: 0.9708,
      training_date: new Date().toISOString().split('T')[0],
      features_count: 9,
      dataset: 'Wisconsin Breast Cancer Dataset'
    };
  }
};

// Enhanced prediction function with better error handling
export const predictCancer = async (features: number[]): Promise<PredictionResponse> => {
  try {
    // Validate input features
    if (!Array.isArray(features) || features.length !== 9) {
      throw new Error('Features must be an array of exactly 9 numbers');
    }

    // Validate each feature is a number between 1-10
    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      if (typeof feature !== 'number' || feature < 1 || feature > 10) {
        throw new Error(`Feature ${i + 1} must be a number between 1 and 10`);
      }
    }

    console.log('Sending prediction request with features:', features);
    
    const response = await apiClient.post<ApiPredictionResponse>('/predict', {
      features: features
    });
    
    // Handle the new API response format
    const data = response.data;
    console.log('Raw API response:', data);
    
    // Extract data safely with fallbacks
    const predictionData = (data as ApiPredictionResponse).prediction;
    const medicalData = (data as ApiPredictionResponse).medical_interpretation;
    const diagnosis = predictionData?.diagnosis || 'Benign';
    const confidence = predictionData?.confidence ?? 0.5;
    const rawPrediction = predictionData?.raw_prediction;
    
    // Convert diagnosis to binary prediction (0 = Benign, 1 = Malignant)
    const binaryPrediction = diagnosis === 'Malignant' || rawPrediction === 4 ? 1 : 0;
    
    return {
      prediction: binaryPrediction,
      prediction_label: diagnosis,
      confidence: confidence,
      model_used: 'KNN',
      model_accuracy: '97.08%',
      risk_level: predictionData?.risk_level,
      medical_interpretation: medicalData?.interpretation,
      recommendation: medicalData?.recommendation,
      probabilities: predictionData?.probabilities
    };
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. The API might be starting up, please try again in a moment.');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error occurred. Please try again later.');
      }
      if (error.response?.status === 422) {
        throw new Error('Invalid input data. Please check your parameter values.');
      }
      if (error.response?.status === 503) {
        throw new Error('Service temporarily unavailable. Please try again in a moment.');
      }
      throw new Error(`API error: ${error.response?.data?.detail || error.message}`);
    }
    throw new Error(`Prediction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Utility function to test API connectivity
export const testApiConnection = async (): Promise<boolean> => {
  try {
    await checkApiHealth();
    return true;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};
