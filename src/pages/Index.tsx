
import React, { useState, useEffect } from 'react';
import { Activity, Heart, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PredictionForm } from '@/components/PredictionForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { ModelInfo } from '@/components/ModelInfo';
import { SampleData } from '@/components/SampleData';
import { useToast } from '@/hooks/use-toast';
import { predictCancer, getModelInfo } from '@/lib/api';

const Index = () => {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);
  const { toast } = useToast();

  const medicalFeatures = [
    {
      name: 'Clump Thickness',
      description: 'Thickness of cell clumps - Normal cells form thin layers',
      key: 'clumpThickness'
    },
    {
      name: 'Uniform Cell Size',
      description: 'Consistency of cell sizes - Cancer cells vary more in size',
      key: 'uniformCellSize'
    },
    {
      name: 'Uniform Cell Shape',
      description: 'Consistency of cell shapes - Cancer cells have irregular shapes',
      key: 'uniformCellShape'
    },
    {
      name: 'Marginal Adhesion',
      description: 'Cell adhesion quality - Cancer cells lose adhesion easily',
      key: 'marginalAdhesion'
    },
    {
      name: 'Single Epithelial Cell Size',
      description: 'Size of epithelial cells - Enlarged in cancer',
      key: 'singleEpithelialCellSize'
    },
    {
      name: 'Bare Nuclei',
      description: 'Presence of bare nuclei - More common in cancer',
      key: 'bareNuclei'
    },
    {
      name: 'Bland Chromatin',
      description: 'Chromatin structure quality - Coarser in cancer cells',
      key: 'blandChromatin'
    },
    {
      name: 'Normal Nucleoli',
      description: 'Nucleoli appearance - More prominent in cancer',
      key: 'normalNucleoli'
    },
    {
      name: 'Mitoses',
      description: 'Cell division frequency - Higher in cancer cells',
      key: 'mitoses'
    }
  ];

  useEffect(() => {
    fetchModelInfo();
  }, []);

  const fetchModelInfo = async () => {
    try {
      const info = await getModelInfo();
      setModelInfo(info);
    } catch (error) {
      console.error('Failed to fetch model info:', error);
    }
  };

  const handlePrediction = async (features) => {
    setIsLoading(true);
    try {
      const result = await predictCancer(features);
      setPrediction(result);
      toast({
        title: "Prediction Complete",
        description: `Result: ${result.prediction_label} (${Math.round(result.confidence * 100)}% confidence)`,
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleData = async (sampleFeatures) => {
    await handlePrediction(sampleFeatures);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Breast Cancer Prediction Tool
              </h1>
              <p className="text-lg text-blue-600 font-medium">
                AI-Powered Medical Screening Assistant
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Medical Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Medical Disclaimer:</strong> This tool is for educational and research purposes only. 
            It should NOT be used for actual medical diagnosis. Always consult qualified healthcare 
            professionals for medical decisions. Results are based on AI predictions and may not be accurate.
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="predict" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="predict" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Prediction
            </TabsTrigger>
            <TabsTrigger value="samples" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Sample Data
            </TabsTrigger>
            <TabsTrigger value="model" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Model Info
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Education
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <PredictionForm
                  features={medicalFeatures}
                  onPredict={handlePrediction}
                  isLoading={isLoading}
                />
              </div>
              <div>
                <ResultsDisplay
                  prediction={prediction}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="samples">
            <SampleData onSampleSelect={handleSampleData} />
          </TabsContent>

          <TabsContent value="model">
            <ModelInfo modelInfo={modelInfo} />
          </TabsContent>

          <TabsContent value="education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>About Breast Cancer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    Breast cancer occurs when cells in breast tissue divide and grow without normal control. 
                    Early detection significantly improves treatment outcomes.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Risk Factors:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Age (risk increases with age)</li>
                      <li>Family history of breast cancer</li>
                      <li>Genetic mutations (BRCA1, BRCA2)</li>
                      <li>Previous breast cancer diagnosis</li>
                      <li>Dense breast tissue</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <span>Feature Explanations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {medicalFeatures.slice(0, 5).map((feature, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-3">
                        <h5 className="font-medium text-sm">{feature.name}</h5>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-blue-600 font-medium">
                    Each feature is scored from 1 (normal) to 10 (highly abnormal)
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Powered by Machine Learning • Wisconsin Breast Cancer Dataset
            </p>
            <p className="text-xs text-gray-500">
              For educational and research purposes only • Not for medical diagnosis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
