import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, FileUp, BarChart3, MessageSquare, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentSamples] = useState([
    { 
      id: 1, 
      name: 'North Field Sample', 
      date: '2025-04-15', 
      status: 'Good',
      summary: 'Suitable for most crops. Slightly alkaline, good nutrient balance.' 
    },
    { 
      id: 2, 
      name: 'South Garden', 
      date: '2025-04-10', 
      status: 'Needs Improvement',
      summary: 'Low in Phosphorus. Consider adding phosphate fertilizer.' 
    },
  ]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Guest'}!</h1>
        <p className="opacity-90 max-w-2xl">
          SoilGPT Lite uses advanced AI to provide personalized crop recommendations and soil health insights. 
          Upload your soil data or explore our knowledge base to get started.
        </p>
      </div>
      
      {/* Quick actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link 
          to="/analyzer"
          className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow flex flex-col items-center text-center"
        >
          <FileUp className="h-10 w-10 text-primary-600 mb-3" />
          <h3 className="font-medium text-neutral-800">Upload Data</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Analyze your soil sample by uploading CSV data
          </p>
        </Link>
        
        <Link 
          to="/analyzer"
          className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow flex flex-col items-center text-center"
        >
          <Leaf className="h-10 w-10 text-accent-600 mb-3" />
          <h3 className="font-medium text-neutral-800">Crop Recommendations</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Get custom crop suggestions based on your soil profile
          </p>
        </Link>
        
        <Link 
          to="/knowledge"
          className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow flex flex-col items-center text-center"
        >
          <BarChart3 className="h-10 w-10 text-secondary-600 mb-3" />
          <h3 className="font-medium text-neutral-800">Soil Insights</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Understand your soil parameters and health indicators
          </p>
        </Link>
        
        <Link 
          to="/integrations"
          className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow flex flex-col items-center text-center"
        >
          <MessageSquare className="h-10 w-10 text-success-500 mb-3" />
          <h3 className="font-medium text-neutral-800">Simulated Integrations</h3>
          <p className="text-sm text-neutral-600 mt-2">
            Try out Slack-like CLI and Jira ticketing features
          </p>
        </Link>
      </div>
      
      {/* Recent soil samples */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800">Recent Soil Samples</h2>
          <Link 
            to="/analyzer" 
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
          >
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {recentSamples.length > 0 ? (
          <div className="space-y-4">
            {recentSamples.map(sample => (
              <div 
                key={sample.id}
                className="border border-neutral-200 rounded-md p-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-neutral-800">{sample.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sample.status === 'Good' 
                      ? 'bg-success-50 text-success-700' 
                      : 'bg-warning-50 text-warning-700'
                  }`}>
                    {sample.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{sample.summary}</p>
                <div className="text-xs text-neutral-500">Analyzed: {sample.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            <p>No soil samples analyzed yet.</p>
            <Link 
              to="/analyzer" 
              className="mt-2 inline-block text-primary-600 hover:text-primary-700"
            >
              Upload your first sample
            </Link>
          </div>
        )}
      </div>

      {/* Getting started */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Getting Started</h2>
        <ol className="space-y-3 text-neutral-700">
          <li className="flex items-start">
            <span className="bg-primary-100 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
            <span>Upload a CSV file with soil analysis data (N, P, K, pH, and Moisture values)</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-100 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
            <span>Ask natural language questions about crop suitability or soil improvements</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-100 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
            <span>Review AI-generated recommendations specific to your soil profile</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-100 text-primary-800 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
            <span>Optionally generate a Jira ticket for required soil amendments</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Dashboard;