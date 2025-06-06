import React, { useState } from "react";
import StepIndicator from "./StepIndicator";
import BusinessContextForm, { BusinessContextData } from "./BusinessContextForm";
import DemandPatternsForm, { DemandPatternsData } from "./DemandPatternsForm";
import TechnicalDataForm, { TechnicalDataFormData } from "./TechnicalDataForm";
import LoadingStep from "./LoadingStep";
import ValidationStep from "./ValidationStep";
import LoginStep from "./LoginStep";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  const [businessContextData, setBusinessContextData] = useState<BusinessContextData>({
    industry: "",
    vehicleType: "",
    businessModel: "",
    operatingArea: "",
    operatingHours: "",
    fleetSize: "",
  });

  const [demandPatternsData, setDemandPatternsData] = useState<DemandPatternsData>({
    demandFactors: [],
    seasonalPatterns: [],
    competitiveContext: "",
    predictionHorizon: "",
  });

  const [technicalData, setTechnicalData] = useState<TechnicalDataFormData>({
    csvFile: null,
    temporalGranularity: "",
    spatialGranularity: "",
    destinationPresence: false,
    externalFactors: [],
    specificColumns: "",
    forecastType: "",
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log("Wizard completed with data:", {
      businessContext: businessContextData,
      demandPatterns: demandPatternsData,
      technicalData: technicalData,
    });
    
    alert("Analysis started successfully!");
  };

  React.useEffect(() => {
    try {
      const { csvFile, ...technicalDataWithoutFile } = technicalData;
      
      localStorage.setItem("mobility-wizard-data", JSON.stringify({
        businessContextData,
        demandPatternsData,
        technicalData: technicalDataWithoutFile,
        currentStep,
      }));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [businessContextData, demandPatternsData, technicalData, currentStep]);

  React.useEffect(() => {
    try {
      const savedData = localStorage.getItem("mobility-wizard-data");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setBusinessContextData(parsedData.businessContextData);
        setDemandPatternsData(parsedData.demandPatternsData);
        setTechnicalData({
          ...parsedData.technicalData,
          csvFile: null,
        });
        setCurrentStep(parsedData.currentStep);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        {currentStep === 1 && (
          <BusinessContextForm
            onNext={handleNext}
            formData={businessContextData}
            setFormData={setBusinessContextData}
          />
        )}
        
        {currentStep === 2 && (
          <DemandPatternsForm
            onNext={handleNext}
            onBack={handleBack}
            formData={demandPatternsData}
            setFormData={setDemandPatternsData}
          />
        )}
        
        {currentStep === 3 && (
          <TechnicalDataForm
            onNext={handleNext}
            onBack={handleBack}
            formData={technicalData}
            setFormData={setTechnicalData}
          />
        )}
        
        {currentStep === 4 && (
          <LoginStep
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 5 && (
          <LoadingStep onComplete={handleNext} />
        )}
        
        {currentStep === 6 && (
          <ValidationStep
            onComplete={handleComplete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Wizard;
