
import React from 'react';
import { Button } from '@/shared/components/ui/button';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-red-500">
        <p>{error}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
