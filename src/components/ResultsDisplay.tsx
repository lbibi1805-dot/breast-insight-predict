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
      <Card className="w-full shadow-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 animate-pulse text-primary" />
            <span className="text-foreground">Processing Prediction...</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            AI model is analyzing the medical parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-2 bg-muted rounded w-full mb-2"></div>
              <div className="h-2 bg-muted rounded w-4/5"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="w-full shadow-xl border-border/50 bg-card/50 backdrop-blur-sm hover-glow">
        <CardHeader className="bg-gradient-to-r from-muted/20 to-muted/10 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
            <span className="text-foreground">Prediction Results</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter medical parameters and click predict to see AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="text-center py-6 sm:py-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </div>
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Ready to analyze medical data. Please input patient parameters and run prediction.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isMalignant = prediction.prediction === 1;
  const confidencePercent = Math.round(prediction.confidence * 100);
  
  const getRiskAssessment = () => {
    if (isMalignant) {
      if (confidencePercent >= 95) return { level: 'Very High', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      if (confidencePercent >= 85) return { level: 'High', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
      return { level: 'Moderate', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    } else {
      if (confidencePercent >= 95) return { level: 'Very Low', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      if (confidencePercent >= 85) return { level: 'Low', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      return { level: 'Moderate', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
  };

  const riskAssessment = getRiskAssessment();

  return (
    <Card className="w-full shadow-xl border-border/50 bg-card/50 backdrop-blur-sm hover-glow">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary hover:scale-110 transition-transform duration-300" />
          <span className="text-foreground">AI Prediction Results</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Machine learning analysis of breast tissue characteristics
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        
        {/* MAIN PREDICTION RESULT */}
        <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-muted/10 to-primary/5 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-muted-foreground mb-2">Diagnosis Prediction</h2>
            <div className={`inline-flex items-center px-4 sm:px-6 py-3 sm:py-4 rounded-full text-2xl sm:text-3xl font-bold border-2 hover:scale-105 transition-transform duration-300 ${
              isMalignant 
                ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                : 'bg-green-500/20 text-green-400 border-green-500/30'
            }`}>
              {isMalignant ? (
                <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" />
              ) : (
                <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3" />
              )}
              {prediction.prediction_label}
            </div>
          </div>
          
          {/* Confidence Score */}
          <div className="mt-6">
            <p className="text-muted-foreground mb-2 text-sm sm:text-base">Confidence Level</p>
            <div className="w-full bg-muted/30 rounded-full h-3 sm:h-4 mb-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  isMalignant ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'
                }`}
                style={{ width: `${confidencePercent}%` }}
              ></div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{confidencePercent}%</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3 p-4 rounded-lg border border-border/30 hover:border-border hover:bg-card/30 transition-all duration-300">
            <h4 className="font-semibold text-foreground flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Risk Assessment</span>
            </h4>
            <Badge className={`${riskAssessment.color} border text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2 hover:scale-105 transition-transform duration-200`}>
              {prediction.risk_level ? `${prediction.risk_level} Risk` : `${riskAssessment.level} Risk`}
            </Badge>
            {prediction.probabilities && (
              <div className="text-sm space-y-1 text-muted-foreground">
                <p className="hover:text-foreground transition-colors duration-200">
                  <span className="font-medium">Benign:</span> {Math.round(prediction.probabilities.benign * 100)}%
                </p>
                <p className="hover:text-foreground transition-colors duration-200">
                  <span className="font-medium">Malignant:</span> {Math.round(prediction.probabilities.malignant * 100)}%
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-3 p-4 rounded-lg border border-border/30 hover:border-border hover:bg-card/30 transition-all duration-300">
            <h4 className="font-semibold text-foreground flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span>Model Info</span>
            </h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p className="hover:text-foreground transition-colors duration-200">
                <span className="font-medium">Algorithm:</span> {prediction.model_used}
              </p>
              <p className="hover:text-foreground transition-colors duration-200">
                <span className="font-medium">Accuracy:</span> {prediction.model_accuracy}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Clinical Interpretation */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Info className="h-4 w-4 text-primary" />
            <span>Clinical Interpretation</span>
          </h4>
          <div className="bg-muted/20 p-4 rounded-lg space-y-3 border border-border/30 hover:border-border transition-colors duration-300">
            {prediction.medical_interpretation ? (
              <p className="text-muted-foreground text-sm leading-relaxed hover:text-foreground transition-colors duration-200">
                {prediction.medical_interpretation}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm leading-relaxed hover:text-foreground transition-colors duration-200">
                {isMalignant ? (
                  <>
                    The AI model has classified this tissue sample as <strong className="text-red-400">MALIGNANT</strong> with {confidencePercent}% confidence. This suggests the presence of abnormal cellular characteristics consistent with cancerous tissue.
                  </>
                ) : (
                  <>
                    The AI model has classified this tissue sample as <strong className="text-green-400">BENIGN</strong> with {confidencePercent}% confidence. This indicates normal or non-cancerous tissue characteristics without malignant features.
                  </>
                )}
              </p>
            )}
            
            {prediction.recommendation && (
              <div className="mt-3 p-3 bg-primary/10 border-l-4 border-primary rounded">
                <h5 className="font-semibold text-primary mb-1">Medical Recommendation</h5>
                <p className="text-primary/80 text-sm">{prediction.recommendation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-destructive/10 border-l-4 border-destructive/50 p-4 rounded hover:bg-destructive/20 transition-colors duration-300">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <h5 className="font-semibold text-destructive">Important Medical Disclaimer</h5>
              <p className="text-destructive/80 text-sm mt-1">
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
