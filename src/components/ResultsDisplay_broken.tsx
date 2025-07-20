
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Target, 
  BarChart3, 
  Activity,
  AlertCircle,
  CheckCircle2,
  Info,
  TrendingUp
} from 'lucide-react';

interface PredictionResponse {
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

interface ResultsDisplayProps {
  prediction: PredictionResponse | null;
  isLoading: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  prediction, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <Card className="w-full shadow-lg border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 animate-pulse text-blue-600" />
            <span>Processing Prediction...</span>
          </CardTitle>
          <CardDescription>
            AI model is analyzing the medical parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="w-full shadow-lg border-gray-200">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <span>Prediction Results</span>
          </CardTitle>
          <CardDescription>
            Enter medical parameters and click predict to see AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Target className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600">
              Ready to analyze medical data. Please input patient parameters and run prediction.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isMalignant = prediction.prediction === 1;
  const confidencePercent = Math.round(prediction.confidence * 100);
  
  // Calculate risk assessment
  const getRiskAssessment = () => {
    if (isMalignant) {
      if (confidencePercent >= 95) return { level: 'Very High', color: 'bg-red-100 text-red-800 border-red-200' };
      if (confidencePercent >= 85) return { level: 'High', color: 'bg-orange-100 text-orange-800 border-orange-200' };
      return { level: 'Moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    } else {
      if (confidencePercent >= 95) return { level: 'Very Low', color: 'bg-green-100 text-green-800 border-green-200' };
      if (confidencePercent >= 85) return { level: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      return { level: 'Moderate', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
  };

  const riskAssessment = getRiskAssessment();

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600" />
          <span>AI Prediction Results</span>
        </CardTitle>
        <CardDescription>
          Machine learning analysis of breast tissue characteristics
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* MAIN PREDICTION RESULT - Large and Prominent */}
        <div className="text-center p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-blue-100">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Diagnosis Prediction</h2>
            <div className={`inline-flex items-center px-6 py-4 rounded-full text-3xl font-bold ${
              isMalignant 
                ? 'bg-red-100 text-red-800 border-2 border-red-200' 
                : 'bg-green-100 text-green-800 border-2 border-green-200'
            }`}>
              {isMalignant ? (
                <AlertCircle className="h-8 w-8 mr-3" />
              ) : (
                <CheckCircle2 className="h-8 w-8 mr-3" />
              )}
              {prediction.prediction_label}
            </div>
          </div>
          
          {/* Confidence Score */}
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Confidence Level</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${
                  isMalignant ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'
                }`}
                style={{ width: `${confidencePercent}%` }}
              ></div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{confidencePercent}%</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Risk Assessment</span>
            </h4>
            <Badge className={`${riskAssessment.color} border-0 text-lg px-4 py-2`}>
              {prediction.risk_level ? `${prediction.risk_level} Risk` : `${riskAssessment.level} Risk`}
            </Badge>
            {prediction.probabilities && (
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Benign:</span> {Math.round(prediction.probabilities.benign * 100)}%</p>
                <p><span className="font-medium">Malignant:</span> {Math.round(prediction.probabilities.malignant * 100)}%</p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              <span>Model Info</span>
            </h4>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Algorithm:</span> {prediction.model_used}</p>
              <p><span className="font-medium">Accuracy:</span> {prediction.model_accuracy}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Clinical Interpretation from API */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Info className="h-4 w-4 text-purple-600" />
            <span>Clinical Interpretation</span>
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            {prediction.medical_interpretation ? (
              <p className="text-gray-700 text-sm leading-relaxed">
                {prediction.medical_interpretation}
              </p>
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">
                {isMalignant ? (
                  <>
                    The AI model has classified this tissue sample as <strong className="text-red-700">MALIGNANT</strong> with 
                    {confidencePercent}% confidence. This suggests the presence of abnormal cellular 
                    characteristics consistent with cancerous tissue.
                  </>
                ) : (
                  <>
                    The AI model has classified this tissue sample as <strong className="text-green-700">BENIGN</strong> with 
                    {confidencePercent}% confidence. This indicates normal or non-cancerous tissue 
                    characteristics without malignant features.
                  </>
                )}
              </p>
            )}
            
            {prediction.recommendation && (
              <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h5 className="font-semibold text-blue-800 mb-1">Medical Recommendation</h5>
                <p className="text-blue-700 text-sm">{prediction.recommendation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-yellow-800">Important Medical Disclaimer</h5>
              <p className="text-yellow-700 text-sm mt-1">
                This AI prediction is for educational and research purposes only. 
                Always consult qualified healthcare professionals for medical diagnosis and treatment decisions.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
