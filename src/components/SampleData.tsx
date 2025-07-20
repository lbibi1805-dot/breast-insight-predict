import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TestTube, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Info
} from 'lucide-react';

interface SampleDataProps {
  onSampleSelect: (features: number[]) => void;
}

export const SampleData: React.FC<SampleDataProps> = ({ onSampleSelect }) => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const sampleCases = [
    {
      id: 'benign-1',
      title: 'Typical Benign Case',
      description: 'Normal breast tissue with healthy characteristics',
      features: [2, 1, 1, 1, 2, 1, 2, 1, 1],
      expectedResult: 'Benign',
      confidence: '99%',
      icon: CheckCircle,
      color: 'border-green-200 bg-green-50',
      badgeColor: 'bg-green-100 text-green-800',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'benign-2',
      title: 'Mild Benign Case',
      description: 'Slightly elevated but still benign tissue',
      features: [3, 2, 1, 1, 3, 2, 3, 2, 1],
      expectedResult: 'Benign',
      confidence: '95%',
      icon: TestTube,
      color: 'border-emerald-200 bg-emerald-50',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
      id: 'malignant-1',
      title: 'Early Malignant Case',
      description: 'Early stage cancer with moderate abnormalities',
      features: [6, 5, 5, 4, 7, 6, 6, 4, 2],
      expectedResult: 'Malignant',
      confidence: '92%',
      icon: AlertTriangle,
      color: 'border-orange-200 bg-orange-50',
      badgeColor: 'bg-orange-100 text-orange-800',
      buttonColor: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      id: 'malignant-2',
      title: 'Advanced Malignant Case',
      description: 'Advanced cancer with severe abnormalities',
      features: [8, 7, 8, 5, 10, 9, 8, 7, 3],
      expectedResult: 'Malignant',
      confidence: '98%',
      icon: XCircle,
      color: 'border-red-200 bg-red-50',
      badgeColor: 'bg-red-100 text-red-800',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    }
  ];

  const handleSampleSelect = (sampleCase: typeof sampleCases[0]) => {
    setSelectedCase(sampleCase.id);
    onSampleSelect(sampleCase.features);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sample Test Cases
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Try these pre-configured cases to see how the AI model responds to different tissue characteristics.
        </p>
      </div>

      {/* Educational Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>For Testing:</strong> These sample cases help you understand how different medical 
          parameters affect the AI prediction results.
        </AlertDescription>
      </Alert>

      {/* Sample Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleCases.map((sampleCase) => {
          const IconComponent = sampleCase.icon;
          const isSelected = selectedCase === sampleCase.id;
          
          return (
            <Card key={sampleCase.id} className={`${sampleCase.color} border-2 hover:shadow-lg transition-all duration-200 ${
              isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-gray-700" />
                    <span>{sampleCase.title}</span>
                  </div>
                  <Badge className={`${sampleCase.badgeColor} border-0`}>
                    {sampleCase.expectedResult}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {sampleCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Feature Preview */}
                <div className="bg-white/50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Parameter Values:</h4>
                  <div className="flex flex-wrap gap-1">
                    {sampleCase.features.map((value, index) => (
                      <span key={index} className={`px-2 py-1 rounded text-xs font-medium ${
                        value <= 3 ? 'bg-green-100 text-green-700' : 
                        value <= 6 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expected Result */}
                <div className="bg-white/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Expected:</span>
                    <div className="text-right">
                      <div className="font-bold">{sampleCase.expectedResult}</div>
                      <div className="text-xs text-gray-600">({sampleCase.confidence} confidence)</div>
                    </div>
                  </div>
                </div>

                {/* Test Button */}
                <Button
                  onClick={() => handleSampleSelect(sampleCase)}
                  className={`w-full ${sampleCase.buttonColor} text-white ${isSelected ? 'opacity-75' : ''}`}
                  disabled={isSelected}
                >
                  {isSelected ? 'Selected ✓' : 'Test This Case'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
