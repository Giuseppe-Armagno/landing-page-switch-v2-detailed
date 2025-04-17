
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BusinessContextFormProps {
  onNext: () => void;
  formData: BusinessContextData;
  setFormData: React.Dispatch<React.SetStateAction<BusinessContextData>>;
}

export interface BusinessContextData {
  industry: string;
  vehicleType: string;
  businessModel: string;
  operatingArea: string;
  operatingHours: string;
  fleetSize: string;
}

const BusinessContextForm: React.FC<BusinessContextFormProps> = ({
  onNext,
  formData,
  setFormData,
}) => {
  const handleChange = (field: keyof BusinessContextData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.industry !== "" &&
      formData.vehicleType !== "" &&
      formData.businessModel !== "" &&
      formData.operatingArea !== "" &&
      formData.operatingHours !== "" &&
      formData.fleetSize !== ""
    );
  };

  return (
    <div className="wizard-fade-in">
      <h2 className="text-2xl font-bold text-mobility-dark mb-6">Business Context</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Industry
          </label>
          <Select
            value={formData.industry}
            onValueChange={(value) => handleChange("industry", value)}
          >
            <SelectTrigger className="wizard-select">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="micromobility">Micromobility</SelectItem>
              <SelectItem value="carsharing">Car Sharing</SelectItem>
              <SelectItem value="ridehailing">Ride Hailing</SelectItem>
              <SelectItem value="lastmile">Last-Mile Delivery</SelectItem>
              <SelectItem value="urbanlogistics">Urban Logistics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Vehicle Type
          </label>
          <Select
            value={formData.vehicleType}
            onValueChange={(value) => handleChange("vehicleType", value)}
          >
            <SelectTrigger className="wizard-select">
              <SelectValue placeholder="Select Vehicle Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="escooters">E-Scooters</SelectItem>
              <SelectItem value="ebikes">E-Bikes</SelectItem>
              <SelectItem value="mopeds">Mopeds</SelectItem>
              <SelectItem value="cars">Cars</SelectItem>
              <SelectItem value="vans">Vans</SelectItem>
              <SelectItem value="cargobikes">Cargo Bikes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Business Model
          </label>
          <Select
            value={formData.businessModel}
            onValueChange={(value) => handleChange("businessModel", value)}
          >
            <SelectTrigger className="wizard-select">
              <SelectValue placeholder="Select Business Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2csharing">B2C Sharing</SelectItem>
              <SelectItem value="b2bsharing">B2B Sharing</SelectItem>
              <SelectItem value="b2bdelivery">B2B Delivery</SelectItem>
              <SelectItem value="p2psharing">P2P Sharing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Operating Area
          </label>
          <Select
            value={formData.operatingArea}
            onValueChange={(value) => handleChange("operatingArea", value)}
          >
            <SelectTrigger className="wizard-select">
              <SelectValue placeholder="Select Operating Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urbancore">Urban Core</SelectItem>
              <SelectItem value="suburban">Suburban Areas</SelectItem>
              <SelectItem value="mixed">Mixed Urban-Suburban</SelectItem>
              <SelectItem value="specificzones">Specific Zones Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Operating Hours
          </label>
          <Select
            value={formData.operatingHours}
            onValueChange={(value) => handleChange("operatingHours", value)}
          >
            <SelectTrigger className="wizard-select">
              <SelectValue placeholder="Select Operating Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24/7">24/7 Operation</SelectItem>
              <SelectItem value="daytime">Daytime Only (6AM-10PM)</SelectItem>
              <SelectItem value="extended">Extended Hours (6AM-2AM)</SelectItem>
              <SelectItem value="business">Business Hours (9AM-6PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-mobility-dark mb-2">
            Fleet Size
          </label>
          <Select
            value={formData.fleetSize}
            onValueChange={(value) => handleChange("fleetSize", value)}
          >
            <SelectTrigger className="wizard-select">
              <SelectValue placeholder="Select Fleet Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (&lt;1000 vehicles)</SelectItem>
              <SelectItem value="medium">Medium (1000-5000 vehicles)</SelectItem>
              <SelectItem value="large">Large (&gt;5000 vehicles)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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

export default BusinessContextForm;
