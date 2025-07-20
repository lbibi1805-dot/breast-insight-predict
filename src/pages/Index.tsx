
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm shadow-lg border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 sm:p-3 bg-primary/20 rounded-xl hover-glow group">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground hover:text-primary transition-colors duration-300">
                Breast Cancer Prediction Tool
              </h1>
              <p className="text-base sm:text-lg text-primary font-medium mt-1">
                AI-Powered Medical Screening Assistant
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Medical Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Alert className="bg-destructive/10 border-destructive/30 hover-glow">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive-foreground">
            <strong>Medical Disclaimer:</strong> This tool is for educational and research purposes only. 
            It should NOT be used for actual medical diagnosis. Always consult qualified healthcare 
            professionals for medical decisions. Results are based on AI predictions and may not be accurate.
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs defaultValue="predict" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-card/50 backdrop-blur-sm shadow-lg h-auto">
            <TabsTrigger 
              value="predict" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/20 transition-all duration-200 p-3 sm:p-4 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Prediction</span>
              <span className="sm:hidden">Predict</span>
            </TabsTrigger>
            <TabsTrigger 
              value="samples" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/20 transition-all duration-200 p-3 sm:p-4 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Sample Data</span>
              <span className="sm:hidden">Samples</span>
            </TabsTrigger>
            <TabsTrigger 
              value="model" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/20 transition-all duration-200 p-3 sm:p-4 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Model Info</span>
              <span className="sm:hidden">Model</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/20 transition-all duration-200 p-3 sm:p-4 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Education</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
              <div className="card-hover">
                <PredictionForm
                  features={medicalFeatures}
                  onPredict={handlePrediction}
                  isLoading={isLoading}
                />
              </div>
              <div className="card-hover">
                <ResultsDisplay
                  prediction={prediction}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="samples" className="card-hover">
            <SampleData onSampleSelect={handleSampleData} />
          </TabsContent>

          <TabsContent value="model" className="card-hover">
            <ModelInfo modelInfo={modelInfo} />
          </TabsContent>

          <TabsContent value="education">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Heart className="h-5 w-5 text-destructive hover:scale-110 transition-transform duration-300" />
                    <span className="text-hover">About Breast Cancer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Breast cancer occurs when cells in breast tissue divide and grow without normal control. 
                    Early detection significantly improves treatment outcomes.
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Risk Factors:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li className="hover:text-foreground transition-colors duration-200">Age (risk increases with age)</li>
                      <li className="hover:text-foreground transition-colors duration-200">Family history of breast cancer</li>
                      <li className="hover:text-foreground transition-colors duration-200">Genetic mutations (BRCA1, BRCA2)</li>
                      <li className="hover:text-foreground transition-colors duration-200">Previous breast cancer diagnosis</li>
                      <li className="hover:text-foreground transition-colors duration-200">Dense breast tissue</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-foreground">
                    <Info className="h-5 w-5 text-primary hover:scale-110 transition-transform duration-300" />
                    <span className="text-hover">Feature Explanations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {medicalFeatures.slice(0, 5).map((feature, index) => (
                      <div key={index} className="border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors duration-300 group">
                        <h5 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors duration-200">{feature.name}</h5>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-primary font-medium bg-primary/10 p-3 rounded-lg">
                    Each feature is scored from 1 (normal) to 10 (highly abnormal)
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Powered by Machine Learning • Wisconsin Breast Cancer Dataset
            </p>
            <p className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
              For educational and research purposes only • Not for medical diagnosis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
