import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const PropertyForm = ({
  propertyId,
  data,
  employees,
  onPropertyDataChange,
  onCheckboxChange,
  onSave,
  onCancel,
  savingPropertyId,
  saveButtonRef,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`employee-${propertyId}`}>Employee</Label>
        <Select
          id={`employee-${propertyId}`}
          value={data.employeeId || ""}
          onChange={(e) =>
            onPropertyDataChange(propertyId, "employeeId", e.target.value)
          }
        >
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option
              key={employee._id || employee.id}
              value={employee._id || employee.id}
            >
              {employee.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`checkbox-${propertyId}`}
            checked={data.usePercentage || false}
            onChange={(e) => onCheckboxChange(propertyId, e.target.checked)}
          />
          <Label
            htmlFor={`checkbox-${propertyId}`}
            className="text-sm font-medium cursor-pointer"
          >
            Use Percentage
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`commission-${propertyId}`}>
          Commission {data.usePercentage ? "(%)" : "(Fixed Amount)"}
        </Label>
        <Input
          id={`commission-${propertyId}`}
          type="number"
          step="0.01"
          min="0"
          max={data.usePercentage ? "100" : undefined}
          value={data.commission || ""}
          onChange={(e) =>
            onPropertyDataChange(propertyId, "commission", e.target.value)
          }
          placeholder={
            data.usePercentage ? "Enter percentage" : "Enter fixed amount"
          }
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          ref={(el) => (saveButtonRef.current[propertyId] = el)}
          onClick={() => onSave(propertyId)}
          className="flex-1"
          disabled={savingPropertyId === propertyId}
        >
          {savingPropertyId === propertyId ? "Saving..." : "Save"}
        </Button>
        <Button
          variant="outline"
          onClick={() => onCancel(propertyId)}
          className="flex-1"
          disabled={savingPropertyId === propertyId}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PropertyForm;
