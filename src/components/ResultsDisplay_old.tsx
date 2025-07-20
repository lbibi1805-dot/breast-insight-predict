import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  PieChart, 
  Activity,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';

interface PredictionResponse {
  prediction: number;
  prediction_label: string;
  confidence: number;
  model_used: string;
  model_accuracy: string;
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
              <PieChart className="h-8 w-8 text-gray-400" />
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
      if (confidencePercent >= 95) return { level: 'Very High', color: 'bg-red-100 text-red-800 border-red-200', intensity: 'critical' };
      if (confidencePercent >= 85) return { level: 'High', color: 'bg-orange-100 text-orange-800 border-orange-200', intensity: 'high' };
      return { level: 'Moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', intensity: 'medium' };
    } else {
      if (confidencePercent >= 95) return { level: 'Very Low', color: 'bg-green-100 text-green-800 border-green-200', intensity: 'minimal' };
      if (confidencePercent >= 85) return { level: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', intensity: 'low' };
      return { level: 'Moderate', color: 'bg-blue-100 text-blue-800 border-blue-200', intensity: 'medium' };
    }
  };

  const riskAssessment = getRiskAssessment();

  // Get recommendation based on results
  const getRecommendation = () => {
    if (isMalignant) {
      if (confidencePercent >= 95) {
        return {
          title: 'Immediate Medical Attention Required',
          actions: [
            'Consult with oncologist immediately',
            'Schedule comprehensive imaging (CT/MRI)',
            'Consider tissue biopsy confirmation',
            'Discuss treatment options',
            'Inform patient and family support'
          ],
          urgency: 'critical'
        };
      } else if (confidencePercent >= 85) {
        return {
          title: 'Further Investigation Recommended',
          actions: [
            'Schedule follow-up with specialist',
            'Additional imaging studies',
            'Consider core needle biopsy',
            'Monitor symptoms closely',
            'Plan comprehensive evaluation'
          ],
          urgency: 'high'
        };
      } else {
        return {
          title: 'Close Monitoring Advised',
          actions: [
            'Regular follow-up appointments',
            'Additional diagnostic testing',
            'Consider second opinion',
            'Monitor for changes',
            'Maintain screening schedule'
          ],
          urgency: 'medium'
        };
      }
    } else {
      return {
        title: 'Continue Routine Screening',
        actions: [
          'Maintain regular screening schedule',
          'Annual mammographic screening',
          'Clinical breast examination',
          'Self-examination education',
          'Healthy lifestyle maintenance'
        ],
        urgency: 'low'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className={`w-full shadow-lg border-2 ${
        isMalignant ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
      }`}>
        <CardHeader className={`rounded-t-lg ${
          isMalignant 
            ? 'bg-gradient-to-r from-red-100 to-red-200' 
            : 'bg-gradient-to-r from-green-100 to-green-200'
        }`}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isMalignant ? (
                <AlertCircle className="h-6 w-6 text-red-600" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              )}
              <span className={isMalignant ? 'text-red-900' : 'text-green-900'}>
                Prediction Result
              </span>
            </div>
            <Badge className={`${riskAssessment.color} border text-sm px-3 py-1`}>
              {riskAssessment.level} Risk
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Primary Result */}
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                isMalignant ? 'text-red-700' : 'text-green-700'
              }`}>
                {prediction.prediction_label}
              </div>
              <div className="text-lg text-gray-600 mb-4">
                AI Prediction Classification
              </div>
              
              {/* Confidence Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700">Confidence Level</span>
                  <span className={`font-bold ${
                    isMalignant ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {confidencePercent}%
                  </span>
                </div>
                <Progress 
                  value={confidencePercent} 
                  className={`h-3 ${
                    isMalignant ? 'bg-red-100' : 'bg-green-100'
                  }`} 
                />
                <div className="text-xs text-gray-600">
                  Model certainty in this prediction
                </div>
              </div>
            </div>

            <Separator />

            {/* Model Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="font-semibold text-gray-900">{prediction.model_used}</div>
                <div className="text-sm text-gray-600">Algorithm Used</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="font-semibold text-gray-900">{prediction.model_accuracy}</div>
                <div className="text-sm text-gray-600">Model Accuracy</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="font-semibold text-gray-900">
                  {prediction.prediction === 1 ? 'Class 1' : 'Class 0'}
                </div>
                <div className="text-sm text-gray-600">Numeric Result</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Detailed Analysis</span>
          </CardTitle>
          <CardDescription>
            Comprehensive interpretation of prediction results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Factors */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Risk Assessment</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Overall Risk Level:</span>
                  <Badge className={riskAssessment.color}>
                    {riskAssessment.level}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Prediction Type:</span>
                  <span className="font-medium">{prediction.prediction_label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Certainty Score:</span>
                  <span className="font-medium">{confidencePercent}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Model Reliability:</span>
                  <span className="font-medium text-green-700">High ({prediction.model_accuracy})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Analysis Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Classification Type:</span>
                  <span className="font-medium">Binary Classification</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Clinical Interpretation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Info className="h-4 w-4 text-purple-600" />
              <span>Clinical Interpretation</span>
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                {isMalignant ? (
                  <>
                    The AI model has classified this tissue sample as <strong>malignant</strong> with 
                    {confidencePercent}% confidence. This suggests the presence of abnormal cellular 
                    characteristics consistent with cancerous tissue. The high confidence level indicates 
                    strong algorithmic certainty in this classification.
                  </>
                ) : (
                  <>
                    The AI model has classified this tissue sample as <strong>benign</strong> with 
                    {confidencePercent}% confidence. This indicates normal or non-cancerous tissue 
                    characteristics. The model found patterns consistent with healthy breast tissue 
                    without malignant features.
                  </>
                )}
              </p>
              <div className="text-xs text-gray-600 border-l-4 border-blue-400 pl-3">
                <strong>Important Note:</strong> This AI prediction is a screening tool and should not 
                replace professional medical diagnosis. Always consult with qualified healthcare 
                professionals for definitive medical decisions.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${
            recommendation.urgency === 'critical' ? 'text-red-700' :
            recommendation.urgency === 'high' ? 'text-orange-700' :
            recommendation.urgency === 'medium' ? 'text-yellow-700' : 'text-green-700'
          }`}>
            <AlertCircle className="h-5 w-5" />
            <span>{recommendation.title}</span>
          </CardTitle>
          <CardDescription>
            Recommended next steps based on AI analysis results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-3">
              {recommendation.actions.map((action, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    recommendation.urgency === 'critical' ? 'bg-red-500' :
                    recommendation.urgency === 'high' ? 'bg-orange-500' :
                    recommendation.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-gray-700 flex-1">{action}</span>
                </div>
              ))}
            </div>
            
            {isMalignant && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-red-800">Critical Alert</div>
                    <div className="text-red-700 text-sm">
                      This prediction suggests malignant tissue. Immediate medical consultation 
                      is strongly recommended. Early detection and treatment significantly improve outcomes.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
