
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface TechnicalDataFormProps {
  onNext: () => void;
  onBack: () => void;
  formData: TechnicalDataFormData;
  setFormData: React.Dispatch<React.SetStateAction<TechnicalDataFormData>>;
}

export interface TechnicalDataFormData {
  csvFile: File | null;
  temporalGranularity: string;
  spatialGranularity: string;
  destinationPresence: boolean;
  externalFactors: string[];
  specificColumns: string;
  forecastType: string;
}

const EXTERNAL_FACTORS = ["Weather", "Events", "School Calendar", "Holiday", "None"];

const TechnicalDataForm: React.FC<TechnicalDataFormProps> = ({
  onNext,
  onBack,
  formData,
  setFormData,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({ ...prev, csvFile: file }));
    }
  };

  const handleExternalFactorsChange = (factor: string) => {
    if (factor === "None") {
      // If "None" is selected, remove all other factors
      if (formData.externalFactors.includes("None")) {
        setFormData((prev) => ({ ...prev, externalFactors: [] }));
      } else {
        setFormData((prev) => ({ ...prev, externalFactors: ["None"] }));
      }
    } else {
      // If any other factor is selected, remove "None" if it's there
      setFormData((prev) => {
        const newFactors = prev.externalFactors.includes(factor)
          ? prev.externalFactors.filter((f) => f !== factor)
          : [...prev.externalFactors.filter((f) => f !== "None"), factor];
        return { ...prev, externalFactors: newFactors };
      });
    }
  };

  const handleChange = (field: keyof TechnicalDataFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.temporalGranularity !== "" &&
      formData.spatialGranularity !== "" &&
      formData.forecastType !== ""
    );
  };

  return (
    <div className="wizard-fade-in">
      <h2 className="text-2xl font-bold text-mobility-dark mb-6">Technical Data</h2>
      <div className="space-y-6">
        <div className="border-2 border-dashed border-mobility-border bg-mobility-gray rounded-lg p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-mobility-red" />
            <h3 className="mt-2 text-sm font-medium text-mobility-dark">Upload your CSV file</h3>
            <p className="mt-1 text-xs text-gray-500">CSV file containing displacement data</p>
            
            <div className="mt-4">
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".csv"
                className="sr-only"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center justify-center rounded-md bg-mobility-red px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-mobility-redHover"
              >
                {fileName ? "Change file" : "Select file"}
              </label>
            </div>
            
            {fileName && (
              <div className="mt-3 text-sm text-mobility-dark">
                Selected: <span className="font-medium">{fileName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-mobility-dark mb-2">
              Temporal Granularity <span className="text-mobility-red">*</span>
            </label>
            <Input
              value={formData.temporalGranularity}
              onChange={(e) => handleChange("temporalGranularity", e.target.value)}
              placeholder="e.g. hourly, daily"
              className="wizard-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-mobility-dark mb-2">
              Spatial Granularity <span className="text-mobility-red">*</span>
            </label>
            <Input
              value={formData.spatialGranularity}
              onChange={(e) => handleChange("spatialGranularity", e.target.value)}
              placeholder="e.g. zip code, hex zones"
              className="wizard-input"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              checked={formData.destinationPresence}
              onCheckedChange={(checked) => handleChange("destinationPresence", checked)}
              id="destination-presence"
            />
            <Label htmlFor="destination-presence">Destination Presence</Label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-3">
            External factors influencing results
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {EXTERNAL_FACTORS.map((factor) => (
              <div key={factor} className="flex items-center space-x-2">
                <Checkbox
                  id={`factor-${factor}`}
                  checked={formData.externalFactors.includes(factor)}
                  onCheckedChange={() => handleExternalFactorsChange(factor)}
                />
                <label
                  htmlFor={`factor-${factor}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {factor}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Specific Column to consider (optional)
          </label>
          <Textarea
            value={formData.specificColumns}
            onChange={(e) => handleChange("specificColumns", e.target.value)}
            placeholder="Enter column names separated by commas"
            className="wizard-input min-h-[80px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Type of desired forecast <span className="text-mobility-red">*</span>
          </label>
          <Select
            value={formData.forecastType}
            onValueChange={(value) => handleChange("forecastType", value)}
          >
            <SelectTrigger className="wizard-select">
              <SelectValue placeholder="Select Forecast Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aggregated">Aggregated Demand</SelectItem>
              <SelectItem value="od">Origin-Destination (OD)</SelectItem>
              <SelectItem value="pickup">Pick-up Only</SelectItem>
            </SelectContent>
          </Select>
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

export default TechnicalDataForm;
