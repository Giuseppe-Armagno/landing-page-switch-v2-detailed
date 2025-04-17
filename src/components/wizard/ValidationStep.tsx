
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle } from "lucide-react";

interface ValidationStepProps {
  onComplete: () => void;
  onBack: () => void;
}

const ValidationStep: React.FC<ValidationStepProps> = ({ onComplete, onBack }) => {
  // Simulated data for demonstration
  const validationData = {
    datasetDimensions: "1245 displacements",
    periodMonitored: "01/03/2025 - 30/03/2025",
    validation: {
      completeness: { status: "success", message: "Data is complete" },
      gpsCoordinates: { status: "success", message: "GPS coordinates are valid" },
      timestamp: { status: "warning", message: "Minor inconsistencies in timestamps" },
    },
  };

  return (
    <div className="wizard-fade-in">
      <h2 className="text-2xl font-bold text-mobility-dark mb-6">
        Validation & Preview
      </h2>
      
      <div className="space-y-8">
        <div className="bg-white border border-mobility-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-mobility-dark mb-4">Dataset Preview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-mobility-border">
              <span className="text-sm font-medium text-mobility-dark">Dataset Dimensions:</span>
              <span className="text-sm text-mobility-dark">{validationData.datasetDimensions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-mobility-dark">Period Monitored:</span>
              <span className="text-sm text-mobility-dark">{validationData.periodMonitored}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-mobility-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-mobility-dark mb-4">Automatic Validation</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-mobility-dark">Completeness of the data</p>
                <p className="text-xs text-gray-500">{validationData.validation.completeness.message}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-mobility-dark">GPS Coordinates Validity</p>
                <p className="text-xs text-gray-500">{validationData.validation.gpsCoordinates.message}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-mobility-dark">Timestamp Consistency</p>
                <p className="text-xs text-gray-500">{validationData.validation.timestamp.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          onClick={onBack}
          className="bg-white border border-mobility-border text-mobility-dark hover:bg-mobility-gray"
        >
          Back
        </Button>
        <Button
          onClick={onComplete}
          className="bg-mobility-red hover:bg-mobility-redHover text-white font-medium"
        >
          Start Analysis
        </Button>
      </div>
    </div>
  );
};

export default ValidationStep;
