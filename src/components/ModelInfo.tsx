
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Database, TrendingUp, Calendar, Target, Users } from 'lucide-react';

interface ModelInfoProps {
  modelInfo: any;
}

export const ModelInfo: React.FC<ModelInfoProps> = ({ modelInfo }) => {
  const accuracyPercent = modelInfo ? parseFloat(modelInfo.accuracy.replace('%', '')) : 97;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI Model Information
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn about the machine learning model powering our breast cancer prediction tool, 
          including its algorithm, performance metrics, and training data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Algorithm Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>Algorithm</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-bold text-lg text-blue-900">
                {modelInfo ? modelInfo.model_name : 'KNN'}
              </h3>
              <p className="text-blue-800 text-sm">
                {modelInfo ? modelInfo.algorithm : 'K-Nearest Neighbors'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">K-Value:</span>
                <span className="font-semibold text-blue-900">
                  {modelInfo ? modelInfo.k_value : 3}
                </span>
              </div>
              <div className="text-xs text-blue-600">
                Finds {modelInfo ? modelInfo.k_value : 3} most similar cases for classification
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-bold text-2xl text-green-900">
                {modelInfo ? modelInfo.accuracy : '97.08%'}
              </h3>
              <p className="text-green-800 text-sm">Classification Accuracy</p>
            </div>
            <Progress value={accuracyPercent} className="h-2" />
            <div className="text-xs text-green-600">
              Tested on validation dataset with {accuracyPercent}% correct predictions
            </div>
          </CardContent>
        </Card>

        {/* Dataset Card */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-600" />
              <span>Training Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h3 className="font-bold text-lg text-purple-900">
                Wisconsin Dataset
              </h3>
              <p className="text-purple-800 text-sm">Breast Cancer Database</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700">Features:</span>
                <span className="font-semibold text-purple-900">
                  {modelInfo ? modelInfo.features_count : 9}
                </span>
              </div>
              <div className="text-xs text-purple-600">
                Clinical measurements from pathology reports
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>How It Works</span>
            </CardTitle>
            <CardDescription>
              Understanding the K-Nearest Neighbors algorithm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Data Input</h4>
                  <p className="text-xs text-gray-600">
                    Your 9 medical parameters are normalized and processed
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Similarity Search</h4>
                  <p className="text-xs text-gray-600">
                    Algorithm finds the 3 most similar cases in training data
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Classification</h4>
                  <p className="text-xs text-gray-600">
                    Majority vote from neighbors determines the prediction
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <span>Clinical Validation</span>
            </CardTitle>
            <CardDescription>
              Real-world performance and limitations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-green-800 mb-2">Strengths:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• High accuracy on Wisconsin dataset (97%+)</li>
                  <li>• Interpretable results with confidence scores</li>
                  <li>• Robust to outliers and noise</li>
                  <li>• No assumptions about data distribution</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-orange-800 mb-2">Limitations:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Performance depends on training data quality</li>
                  <li>• May not generalize to all populations</li>
                  <li>• Requires expert medical interpretation</li>
                  <li>• Not a replacement for clinical diagnosis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Information */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span>Model Training Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Training Date:</span>
              <p className="text-gray-900">
                {modelInfo ? modelInfo.training_date : '2025-01-20'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Dataset Source:</span>
              <p className="text-gray-900">
                {modelInfo ? modelInfo.dataset : 'Wisconsin Breast Cancer'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Model Version:</span>
              <p className="text-gray-900">v2.1.0</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Updated:</span>
              <p className="text-gray-900">January 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
