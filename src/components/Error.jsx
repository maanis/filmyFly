import React from 'react';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';

export function Error({
  title = "Something went wrong",
  message = "We're having trouble loading this page. Please try again later.",
  showRefresh = true
}) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleHome = () => {
    window.location.href = '/feed';
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 animate-ping bg-red-100 rounded-full opacity-75"></div>
            <AlertCircle className="w-20 h-20 text-red-500 relative" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleHome}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer duration-200 ease-in-out"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          {showRefresh && (
            <button
              onClick={handleRefresh}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors duration-200 ease-in-out"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Error