
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
    if (value <= 3) return { level: 'Normal', color: 'bg-green-100 text-green-800', intensity: 'low' };
    if (value <= 6) return { level: 'Suspicious', color: 'bg-yellow-100 text-yellow-800', intensity: 'medium' };
    return { level: 'Concerning', color: 'bg-red-100 text-red-800', intensity: 'high' };
  };

  const getSliderColor = (value: number) => {
    if (value <= 3) return 'from-green-400 to-green-600';
    if (value <= 6) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const averageRisk = Object.values(formData).reduce((sum, val) => sum + val, 0) / features.length;
  const overallRisk = getRiskLevel(averageRisk);

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <span>Medical Parameters Input</span>
          <Badge className={`${overallRisk.color} border-0`}>
            Overall: {overallRisk.level}
          </Badge>
        </CardTitle>
        <CardDescription>
          Adjust each parameter based on medical observations (1 = Normal, 10 = Highly Abnormal)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <TooltipProvider>
          {features.map((feature, index) => {
            const value = formData[feature.key];
            const risk = getRiskLevel(value);
            const sliderGradient = getSliderColor(value);
            
            return (
              <div key={feature.key} className="space-y-3 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{feature.name}</h4>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{feature.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{value}</span>
                    <Badge className={`${risk.color} border-0 text-xs`}>
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
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 - Normal</span>
                    <span>5 - Moderate</span>
                    <span>10 - Severe</span>
                  </div>
                </div>
              </div>
            );
          })}
        </TooltipProvider>

        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-gray-300 hover:border-blue-400"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Predict'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
