
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
  accuracy: string;
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

// Single prediction endpoint
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
    
    const response = await apiClient.post<PredictionResponse>('/predict', {
      features: features
    });
    
    return response.data;
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
      throw new Error(`API error: ${error.response?.data?.detail || error.message}`);
    }
    throw new Error(`Prediction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

// Model information endpoint
export const getModelInfo = async (): Promise<ModelInfoResponse> => {
  try {
    console.log('Fetching model information...');
    
    const response = await apiClient.get<ModelInfoResponse>('/model/info');
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. The API might be starting up, please try again in a moment.');
      }
      throw new Error(`API error: ${error.response?.data?.detail || error.message}`);
    }
    throw new Error(`Failed to get model info: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
