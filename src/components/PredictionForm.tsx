import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RotateCcw, Zap, HelpCircle } from 'lucide-react';

interface PredictionFormProps {
  features: Array<{
    name: string;
    description: string;
    key: string;
  }>;
  onPredict: (features: number[]) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  features,
  onPredict,
  isLoading
}) => {
  const [formData, setFormData] = useState(
    features.reduce((acc, feature, index) => ({
      ...acc,
      [feature.key]: 1
    }), {} as Record<string, number>)
  );

  const handleSliderChange = (key: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  const handleReset = () => {
    setFormData(
      features.reduce((acc, feature) => ({
        ...acc,
        [feature.key]: 1
      }), {})
    );
  };

  const handleSubmit = () => {
    const featuresArray = features.map(feature => formData[feature.key]);
    onPredict(featuresArray);
  };

  const getRiskLevel = (value: number) => {
    if (value <= 3) return { level: 'Normal', color: 'bg-green-500/20 text-green-400 border-green-500/30', intensity: 'low' };
    if (value <= 6) return { level: 'Suspicious', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', intensity: 'medium' };
    return { level: 'Concerning', color: 'bg-red-500/20 text-red-400 border-red-500/30', intensity: 'high' };
  };

  const averageRisk = Object.values(formData).reduce((sum, val) => sum + val, 0) / features.length;
  const overallRisk = getRiskLevel(averageRisk);

  return (
    <Card className="w-full shadow-xl border-border/50 bg-card/50 backdrop-blur-sm hover-glow">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg border-b border-border/30">
        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-foreground">Medical Parameters Input</span>
          <Badge className={`${overallRisk.color} border hover:scale-105 transition-transform duration-200`}>
            Overall: {overallRisk.level}
          </Badge>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Adjust each parameter based on medical observations (1 = Normal, 10 = Highly Abnormal)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <TooltipProvider>
          {features.map((feature, index) => {
            const value = formData[feature.key];
            const risk = getRiskLevel(value);
            
            return (
              <div key={feature.key} className="space-y-3 p-3 sm:p-4 rounded-lg border border-border/30 hover:border-border hover:bg-card/30 transition-all duration-300 group">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 text-sm sm:text-base">
                      {feature.name}
                    </h4>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-card border-border text-foreground">
                        <p>{feature.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {value}
                    </span>
                    <Badge className={`${risk.color} border text-xs hover:scale-105 transition-transform duration-200`}>
                      {risk.level}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Slider
                    value={[value]}
                    onValueChange={(val) => handleSliderChange(feature.key, val)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full group-hover:opacity-100 transition-opacity duration-200"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="hover:text-foreground transition-colors duration-200">1 - Normal</span>
                    <span className="hover:text-foreground transition-colors duration-200">5 - Moderate</span>
                    <span className="hover:text-foreground transition-colors duration-200">10 - Severe</span>
                  </div>
                </div>
              </div>
            );
          })}
        </TooltipProvider>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-border/30">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-border hover:border-primary hover:bg-primary/10 button-hover text-sm sm:text-base"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground button-hover text-sm sm:text-base"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Predict'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
