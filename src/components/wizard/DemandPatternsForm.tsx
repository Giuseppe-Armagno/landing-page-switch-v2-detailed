
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DemandPatternsFormProps {
  onNext: () => void;
  onBack: () => void;
  formData: DemandPatternsData;
  setFormData: React.Dispatch<React.SetStateAction<DemandPatternsData>>;
}

export interface DemandPatternsData {
  demandFactors: string[];
  seasonalPatterns: string[];
  competitiveContext: string;
  predictionHorizon: string;
}

const DEMAND_FACTORS = [
  "Weather",
  "Events",
  "Tourism",
  "Commuting",
  "Weekend Activities",
  "Business Travel",
];

const SEASONAL_PATTERNS = [
  "Daily Peaks",
  "Weekly Patterns",
  "Monthly Patterns",
  "Seasonal Changes",
  "Holiday Effects",
];

const DemandPatternsForm: React.FC<DemandPatternsFormProps> = ({
  onNext,
  onBack,
  formData,
  setFormData,
}) => {
  const toggleDemandFactor = (factor: string) => {
    setFormData((prev) => {
      if (prev.demandFactors.includes(factor)) {
        return {
          ...prev,
          demandFactors: prev.demandFactors.filter((f) => f !== factor),
        };
      } else {
        return {
          ...prev,
          demandFactors: [...prev.demandFactors, factor],
        };
      }
    });
  };

  const toggleSeasonalPattern = (pattern: string) => {
    setFormData((prev) => {
      if (prev.seasonalPatterns.includes(pattern)) {
        return {
          ...prev,
          seasonalPatterns: prev.seasonalPatterns.filter((p) => p !== pattern),
        };
      } else {
        return {
          ...prev,
          seasonalPatterns: [...prev.seasonalPatterns, pattern],
        };
      }
    });
  };

  const handleChange = (field: keyof DemandPatternsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.demandFactors.length > 0 &&
      formData.seasonalPatterns.length > 0 &&
      formData.competitiveContext !== "" &&
      formData.predictionHorizon !== ""
    );
  };

  return (
    <div className="wizard-fade-in">
      <h2 className="text-2xl font-bold text-mobility-dark mb-6">Demand Patterns</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-3">
            Demand Influencing Factors (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {DEMAND_FACTORS.map((factor) => (
              <Badge
                key={factor}
                onClick={() => toggleDemandFactor(factor)}
                className={`cursor-pointer px-3 py-1.5 text-sm ${
                  formData.demandFactors.includes(factor)
                    ? "bg-mobility-red hover:bg-mobility-redHover text-white"
                    : "bg-white text-mobility-dark border border-mobility-border hover:bg-mobility-gray"
                }`}
              >
                {factor}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-3">
            Seasonal Patterns (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {SEASONAL_PATTERNS.map((pattern) => (
              <Badge
                key={pattern}
                onClick={() => toggleSeasonalPattern(pattern)}
                className={`cursor-pointer px-3 py-1.5 text-sm ${
                  formData.seasonalPatterns.includes(pattern)
                    ? "bg-mobility-red hover:bg-mobility-redHover text-white"
                    : "bg-white text-mobility-dark border border-mobility-border hover:bg-mobility-gray"
                }`}
              >
                {pattern}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-mobility-dark mb-2">
              Competitive Context
            </label>
            <Select
              value={formData.competitiveContext}
              onValueChange={(value) => handleChange("competitiveContext", value)}
            >
              <SelectTrigger className="wizard-select">
                <SelectValue placeholder="Select Competitive Context" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Operator</SelectItem>
                <SelectItem value="few">Few Competitors</SelectItem>
                <SelectItem value="high">Highly Competitive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-mobility-dark mb-2">
              Prediction Horizon
            </label>
            <Select
              value={formData.predictionHorizon}
              onValueChange={(value) => handleChange("predictionHorizon", value)}
            >
              <SelectTrigger className="wizard-select">
                <SelectValue placeholder="Select Prediction Horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short-term (1-3 days)</SelectItem>
                <SelectItem value="medium">Medium-term (1-2 weeks)</SelectItem>
                <SelectItem value="long">Long-term (1+ months)</SelectItem>
              </SelectContent>
            </Select>
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
          onClick={onNext}
          disabled={!isFormValid()}
          className="bg-mobility-red hover:bg-mobility-redHover text-white font-medium disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DemandPatternsForm;
