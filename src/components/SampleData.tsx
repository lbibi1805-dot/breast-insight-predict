
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, TestTube, AlertTriangle } from 'lucide-react';

interface SampleDataProps {
  onSampleSelect: (features: number[]) => void;
}

export const SampleData: React.FC<SampleDataProps> = ({ onSampleSelect }) => {
  const sampleCases = [
    {
      id: 'benign',
      title: 'Typical Benign Case',
      description: 'Low-risk parameters indicating normal tissue characteristics',
      features: [2, 1, 1, 1, 2, 1, 2, 1, 1],
      expectedResult: 'Benign',
      riskLevel: 'Low',
      icon: TestTube,
      color: 'border-green-200 bg-green-50',
      badgeColor: 'bg-green-100 text-green-800',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      characteristics: [
        'Thin clump thickness (2)',
        'Uniform cell size (1)',
        'Regular cell shape (1)',
        'Good marginal adhesion (1)',
        'Normal epithelial cells (2)'
      ]
    },
    {
      id: 'malignant',
      title: 'Typical Malignant Case',
      description: 'High-risk parameters suggesting abnormal tissue characteristics',
      features: [8, 7, 8, 5, 10, 9, 8, 1, 1],
      expectedResult: 'Malignant',
      riskLevel: 'High',
      icon: AlertTriangle,
      color: 'border-red-200 bg-red-50',
      badgeColor: 'bg-red-100 text-red-800',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      characteristics: [
        'Thick clump formation (8)',
        'Non-uniform cell size (7)',
        'Irregular cell shape (8)',
        'Poor marginal adhesion (5)',
        'Enlarged epithelial cells (10)'
      ]
    },
    {
      id: 'borderline',
      title: 'Borderline Case',
      description: 'Moderate-risk parameters requiring careful evaluation',
      features: [5, 4, 4, 3, 6, 4, 5, 3, 2],
      expectedResult: 'Variable',
      riskLevel: 'Moderate',
      icon: FlaskConical,
      color: 'border-yellow-200 bg-yellow-50',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      characteristics: [
        'Moderate clump thickness (5)',
        'Some cell size variation (4)',
        'Mild shape irregularity (4)',
        'Fair marginal adhesion (3)',
        'Moderately enlarged cells (6)'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Test with Sample Data
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Try these pre-configured medical parameter sets to see how the AI model 
          responds to different tissue characteristics. Each case represents typical 
          patterns found in clinical data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleCases.map((sampleCase) => {
          const IconComponent = sampleCase.icon;
          
          return (
            <Card key={sampleCase.id} className={`${sampleCase.color} border-2 hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-5 w-5 text-gray-700" />
                    <span className="text-lg">{sampleCase.title}</span>
                  </div>
                  <Badge className={`${sampleCase.badgeColor} border-0`}>
                    {sampleCase.riskLevel} Risk
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-700">
                  {sampleCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">
                    Key Characteristics:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {sampleCase.characteristics.map((characteristic, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{characteristic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-800">
                    Parameter Values:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {sampleCase.features.map((value, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs px-2 py-1"
                      >
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => onSampleSelect(sampleCase.features)}
                    className={`w-full text-white ${sampleCase.buttonColor}`}
                  >
                    Test This Case
                  </Button>
                </div>

                <div className="text-xs text-gray-500 bg-white/50 p-2 rounded">
                  <strong>Expected:</strong> {sampleCase.expectedResult} classification
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <FlaskConical className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                About These Sample Cases
              </h3>
              <p className="text-blue-800 text-sm mb-3">
                These sample cases are derived from the Wisconsin Breast Cancer Dataset, 
                the same dataset used to train our AI model. They represent real patterns 
                observed in clinical pathology.
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• <strong>Benign case:</strong> Shows characteristics of healthy tissue</li>
                <li>• <strong>Malignant case:</strong> Displays typical cancer cell features</li>
                <li>• <strong>Borderline case:</strong> Demonstrates ambiguous characteristics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
