
import React, { useEffect } from "react";

interface LoadingStepProps {
  onComplete: () => void;
}

const LoadingStep: React.FC<LoadingStepProps> = ({ onComplete }) => {
  useEffect(() => {
    // Simulate loading process with a timeout
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="wizard-fade-in text-center py-16">
      <h2 className="text-2xl font-bold text-mobility-dark mb-8">
        Analyzing your use case and data...
      </h2>
      
      <div className="max-w-md mx-auto">
        <div className="w-full bg-mobility-gray h-3 rounded-full mb-8">
          <div className="bg-mobility-red h-full rounded-full progress-bar-animation" />
        </div>
        
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mobility-red" />
        </div>
        
        <p className="mt-8 text-mobility-dark">
          Please wait while we analyze your data and prepare recommendations
        </p>
      </div>
    </div>
  );
};

export default LoadingStep;
