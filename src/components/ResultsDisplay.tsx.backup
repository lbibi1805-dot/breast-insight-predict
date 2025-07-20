
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, TrendingUp, Brain, Target } from 'lucide-react';

interface ResultsDisplayProps {
  prediction: any;
  isLoading: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  prediction,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card className="w-full shadow-lg border-blue-100">
        <CardContent className="p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analyzing Medical Data...
          </h3>
          <p className="text-gray-600">
            AI model is processing your input parameters
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="w-full shadow-lg border-blue-100">
        <CardContent className="p-12 text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready for Analysis
          </h3>
          <p className="text-gray-600">
            Enter medical parameters and click "Predict" to get AI analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  const isBenign = prediction.prediction_label === 'Benign';
  const confidencePercent = Math.round(prediction.confidence * 100);
  
  const resultColor = isBenign 
    ? 'from-green-500 to-green-600' 
    : 'from-red-500 to-red-600';
  
  const resultBgColor = isBenign 
    ? 'bg-green-50 border-green-200' 
    : 'bg-red-50 border-red-200';
  
  const resultTextColor = isBenign 
    ? 'text-green-800' 
    : 'text-red-800';

  const getRecommendation = () => {
    if (isBenign && confidencePercent >= 90) {
      return "Low risk indication. Continue regular screening as recommended by healthcare provider.";
    } else if (isBenign && confidencePercent < 90) {
      return "Moderate confidence in benign prediction. Consider follow-up examination for confirmation.";
    } else if (!isBenign && confidencePercent >= 90) {
      return "High risk indication. Immediate consultation with oncologist strongly recommended.";
    } else {
      return "Uncertain prediction. Additional diagnostic tests and specialist consultation recommended.";
    }
  };

  const getConfidenceLevel = () => {
    if (confidencePercent >= 90) return { level: 'Very High', color: 'text-green-600' };
    if (confidencePercent >= 75) return { level: 'High', color: 'text-blue-600' };
    if (confidencePercent >= 60) return { level: 'Moderate', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-red-600' };
  };

  const confidenceLevel = getConfidenceLevel();

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className={`w-full shadow-lg border-2 ${resultBgColor}`}>
        <CardHeader className={`bg-gradient-to-r ${resultColor} text-white rounded-t-lg`}>
          <CardTitle className="flex items-center justify-between text-xl">
            <span className="flex items-center space-x-2">
              {isBenign ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <AlertCircle className="h-6 w-6" />
              )}
              <span>Prediction Result</span>
            </span>
            <Badge className="bg-white/20 text-white border-white/30">
              AI Analysis
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div>
              <h2 className={`text-4xl font-bold ${resultTextColor} mb-2`}>
                {prediction.prediction_label}
              </h2>
              <p className="text-gray-600">
                Classification: {isBenign ? 'Non-cancerous tissue' : 'Potentially cancerous tissue'}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Confidence Level</span>
                <span className={`text-sm font-bold ${confidenceLevel.color}`}>
                  {confidenceLevel.level} ({confidencePercent}%)
                </span>
              </div>
              <Progress 
                value={confidencePercent} 
                className="h-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Information */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>Model Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Algorithm:</span>
              <p className="text-gray-900">{prediction.model_used} (K-Nearest Neighbors)</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Model Accuracy:</span>
              <p className="text-gray-900">{prediction.model_accuracy}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>Based on Wisconsin Breast Cancer Dataset</span>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Alert className={resultBgColor}>
        <AlertCircle className={`h-4 w-4 ${resultTextColor}`} />
        <AlertDescription className={`${resultTextColor} font-medium`}>
          <strong>Clinical Recommendation:</strong> {getRecommendation()}
        </AlertDescription>
      </Alert>

      {/* Important Notice */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Important:</strong> This AI prediction is for screening assistance only. 
          Final diagnosis must always be made by qualified medical professionals using 
          comprehensive clinical evaluation and appropriate diagnostic procedures.
        </AlertDescription>
      </Alert>
    </div>
  );
};
