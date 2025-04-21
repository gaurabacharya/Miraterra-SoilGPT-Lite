import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in">
      <div className="text-9xl font-bold text-primary-200">404</div>
      <h1 className="text-2xl font-semibold text-neutral-800 mt-4">Page Not Found</h1>
      <p className="text-neutral-600 mt-2 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex space-x-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Go Home</span>
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;