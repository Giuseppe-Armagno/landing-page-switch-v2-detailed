
import React from "react";
import { Button } from "@/components/ui/button";
import { Google } from "lucide-react";

interface LoginStepProps {
  onNext: () => void;
  onBack: () => void;
}

const LoginStep: React.FC<LoginStepProps> = ({ onNext, onBack }) => {
  return (
    <div className="wizard-fade-in">
      <h2 className="text-2xl font-bold text-mobility-dark mb-6">Login</h2>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Please log in to continue with the analysis
          </p>
        </div>
        
        <Button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
        >
          <Google className="h-5 w-5" />
          Continue with Google
        </Button>
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          onClick={onBack}
          className="bg-white border border-mobility-border text-mobility-dark hover:bg-mobility-gray"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default LoginStep;
