import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, AlertCircle, Send, History, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { validateSoilData, getStatusColor, formatSoilParameter } from '../utils/utils';
import { mockAnalyzeSoil } from '../services/ragService';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface SoilData {
  sampleId: string;
  N: number;
  P: number;
  K: number;
  pH: number;
  Moisture: number;
  [key: string]: number | string;
}

const SoilAnalyzer: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [userQuery, setUserQuery] = useState<string>('');
  const [responses, setResponses] = useState<{ question: string; answer: string; timestamp: Date }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle file upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError('');
    
    const file = acceptedFiles[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
      setUploadError('Please upload a CSV file');
      return;
    }
    
    setFileName(file.name);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setUploadError('Error parsing CSV file');
          return;
        }
        
        const data = results.data as Record<string, string>[];
        
        if (data.length === 0) {
          setUploadError('CSV file is empty');
          return;
        }
        
        // Convert string values to numbers
        const parsedData = data[0];
        const numericData: Record<string, number | string> = {};
        
        try {
          // First, check for required fields
          const requiredFields = ['sampleId', 'N', 'P', 'K', 'pH', 'Moisture'];
          for (const field of requiredFields) {
            if (!(field in parsedData)) {
              setUploadError(`Missing required field: ${field}`);
              return;
            }
          }

          // Keep sampleId as string
          numericData.sampleId = parsedData.sampleId;
          
          // Convert other fields to numbers
          const numericFields = ['N', 'P', 'K', 'pH', 'Moisture'];
          for (const field of numericFields) {
            const value = parseFloat(parsedData[field]);
            if (isNaN(value)) {
              throw new Error(`Invalid value for ${field}`);
            }
            numericData[field] = value;
          }
          
          setSoilData(numericData as SoilData);
        } catch (error) {
          setUploadError('Invalid data format');
        }
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  // Handle user query submission
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userQuery.trim() || !soilData) return;
    
    setIsLoading(true);
    
    try {
      // Call the mock RAG service
      const answer = await mockAnalyzeSoil(soilData, userQuery);
      
      // Add the response to the history
      setResponses(prev => [
        { 
          question: userQuery, 
          answer, 
          timestamp: new Date() 
        },
        ...prev
      ]);
      
      // Clear the input
      setUserQuery('');
    } catch (error) {
      console.error('Error analyzing soil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Soil Data Upload</h2>
        
        {/* File upload dropzone */}
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            soilData ? 'border-success-300 bg-success-50' : 'border-neutral-300 hover:border-primary-300 hover:bg-primary-50'
          }`}
        >
          <input {...getInputProps()} />
          
          {!soilData ? (
            <div>
              <FileUp className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <p className="text-neutral-700 font-medium">Drag & drop a CSV file, or click to select</p>
              <p className="text-neutral-500 text-sm mt-2">The file should contain sampleId, N, P, K, pH and Moisture values</p>
            </div>
          ) : (
            <div>
              <div className="text-success-700 font-medium">
                ✓ Data loaded successfully: {fileName}
              </div>
              <p className="text-neutral-500 text-sm mt-2">
                Drop a new file to replace current data
              </p>
            </div>
          )}
        </div>
        
        {/* Upload error message */}
        {uploadError && (
          <div className="mt-4 text-error-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>

      {/* Soil data visualization */}
      {soilData && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-800">Soil Analysis</h2>
            <div className="text-sm font-medium text-primary-600">
              Sample ID: {soilData.sampleId}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Soil parameters */}
            <div className="space-y-4">
              <h3 className="font-medium text-neutral-700">Soil Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(soilData)
                  .filter(([key]) => key !== 'sampleId')
                  .map(([key, value]) => (
                    <div 
                      key={key} 
                      className={`p-4 rounded-lg border ${
                        getStatusColor(key, value as number) === 'success' 
                          ? 'border-success-200 bg-success-50' 
                          : getStatusColor(key, value as number) === 'warning'
                            ? 'border-warning-200 bg-warning-50'
                            : 'border-error-200 bg-error-50'
                      }`}
                    >
                      <div className="text-sm text-neutral-500">{key}</div>
                      <div className="text-lg font-semibold mt-1">
                        {formatSoilParameter(key, value as number)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Chart */}
            <div>
              <h3 className="font-medium text-neutral-700 mb-4">Nutrient Balance</h3>
              <div className="w-full h-56 flex items-center justify-center">
                <Doughnut 
                  data={{
                    labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)'],
                    datasets: [
                      {
                        data: [soilData.N, soilData.P, soilData.K],
                        backgroundColor: [
                          '#4caf50',
                          '#2196f3',
                          '#ff9800',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Query interface */}
      {soilData && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Ask About Your Soil</h2>
          
          <form onSubmit={handleQuerySubmit} className="mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="E.g., Can I grow tomatoes in this soil?"
                className="flex-1 border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !userQuery.trim()}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>Ask <Send className="h-4 w-4 ml-2" /></>
                )}
              </button>
            </div>
          </form>
          
          {/* Response history */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <History className="h-5 w-5 text-neutral-500" />
              <h3 className="font-medium text-neutral-700">Query History</h3>
            </div>
            
            {responses.length > 0 ? (
              <div className="space-y-4">
                {responses.map((response, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-neutral-50 border border-neutral-200 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="font-medium text-neutral-800 mb-2">
                      Q: {response.question}
                    </div>
                    <div className="text-neutral-700 whitespace-pre-line">
                      {response.answer}
                    </div>
                    <div className="text-xs text-neutral-500 mt-2">
                      {response.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500 bg-neutral-50 rounded-lg">
                <p>No queries yet. Ask a question to get started!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilAnalyzer;