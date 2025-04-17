
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-6 mb-4 overflow-x-auto py-2 w-full">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center flex-shrink-0">
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-center font-medium transition-all ${
                step === currentStep
                  ? "wizard-step-active"
                  : step < currentStep
                  ? "wizard-step-completed"
                  : "wizard-step-pending"
              }`}
            >
              {step}
            </div>
            <span className="text-xs mt-1 text-center whitespace-nowrap">
              {step === 1
                ? "Business"
                : step === 2
                ? "Demand"
                : step === 3
                ? "Technical"
                : step === 4
                ? "Loading"
                : "Validation"}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-mobility-gray h-2 rounded-full max-w-3xl">
        <div
          className="bg-mobility-red h-full rounded-full transition-all"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
