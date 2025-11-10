import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const API_BASE_URL = "http://localhost:3000";

function Commission() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperties, setEditingProperties] = useState({});
  const [propertyData, setPropertyData] = useState({});

  useEffect(() => {
    fetchProperties();
    fetchEmployees();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`);
      setProperties(response.data.data || []);

      // Initialize property data with existing values
      const initialData = {};
      (response.data.data || []).forEach((property) => {
        const propertyId = property._id || property.id;
        let commissionValue = "";
        let usePercentage = false;

        if (
          property.commission !== undefined &&
          property.commission !== null &&
          property.commission !== ""
        ) {
          const commissionStr = String(property.commission);
          // Check if commission ends with %
          if (commissionStr.endsWith("%")) {
            usePercentage = true;
            // Remove % and get the number
            commissionValue = commissionStr.slice(0, -1);
          } else {
            usePercentage = false;
            commissionValue = commissionStr;
          }
        }

        initialData[propertyId] = {
          employeeId: property.employeeId || "",
          commission: commissionValue,
          usePercentage: usePercentage,
        };
      });
      setPropertyData(initialData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEdit = (propertyId) => {
    setEditingProperties((prev) => ({
      ...prev,
      [propertyId]: true,
    }));
  };

  const handleCancel = (propertyId) => {
    setEditingProperties((prev) => {
      const newState = { ...prev };
      delete newState[propertyId];
      return newState;
    });
    // Reset to original values
    fetchProperties();
  };

  const handleSave = async (propertyId) => {
    try {
      const data = propertyData[propertyId] || {};
      const payload = {};

      if (data.employeeId) {
        payload.employeeId = data.employeeId;
      }

      if (
        data.commission !== undefined &&
        data.commission !== null &&
        data.commission !== ""
      ) {
        // Format commission as string: add % if usePercentage is true, otherwise just the number as string
        if (data.usePercentage) {
          payload.commission = `${data.commission}%`;
        } else {
          payload.commission = String(data.commission);
        }
      }

      await axios.put(
        `${API_BASE_URL}/properties/${propertyId}/assign-employee`,
        payload
      );

      setEditingProperties((prev) => {
        const newState = { ...prev };
        delete newState[propertyId];
        return newState;
      });

      await fetchProperties();
    } catch (error) {
      console.error("Error saving property assignment:", error);
      alert("Failed to save property assignment. Please try again.");
    }
  };

  const handlePropertyDataChange = (propertyId, field, value) => {
    setPropertyData((prev) => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (propertyId, checked) => {
    setPropertyData((prev) => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        usePercentage: checked,
      },
    }));
  };

  const formatAddress = (adres) => {
    if (!adres) return "No address available";

    const parts = [];
    if (adres.straat) parts.push(adres.straat);
    if (adres.huisnummer) {
      const huisnummer = adres.huisnummer;
      const num = huisnummer.hoofdnummer || "";
      const toevoeging = huisnummer.toevoeging || "";
      if (num) parts.push(`${num}${toevoeging ? ` ${toevoeging}` : ""}`);
    }
    if (adres.postcode) parts.push(adres.postcode);
    if (adres.plaats) parts.push(adres.plaats);
    if (adres.provincie) parts.push(adres.provincie);
    if (adres.land) parts.push(adres.land);

    return parts.join(", ") || "No address available";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Commission Management
          </h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => {
            const propertyId = property._id || property.id;
            const isEditing = editingProperties[propertyId];

            // Parse commission from property if not in propertyData
            let commissionValue = "";
            let usePercentage = false;
            if (
              property.commission !== undefined &&
              property.commission !== null &&
              property.commission !== ""
            ) {
              const commissionStr = String(property.commission);
              if (commissionStr.endsWith("%")) {
                usePercentage = true;
                commissionValue = commissionStr.slice(0, -1);
              } else {
                usePercentage = false;
                commissionValue = commissionStr;
              }
            }

            const data = propertyData[propertyId] || {
              employeeId: property.employeeId || "",
              commission: commissionValue,
              usePercentage: usePercentage,
            };

            return (
              <Card
                key={propertyId}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200"
              >
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                  <CardTitle className="text-lg font-semibold">
                    Property {property.id || propertyId}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Address
                    </Label>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {formatAddress(property.adres)}
                    </p>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`employee-${propertyId}`}>
                          Employee
                        </Label>
                        <Select
                          id={`employee-${propertyId}`}
                          value={data.employeeId || ""}
                          onChange={(e) =>
                            handlePropertyDataChange(
                              propertyId,
                              "employeeId",
                              e.target.value
                            )
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
                            onChange={(e) =>
                              handleCheckboxChange(propertyId, e.target.checked)
                            }
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
                          Commission{" "}
                          {data.usePercentage ? "(%)" : "(Fixed Amount)"}
                        </Label>
                        <Input
                          id={`commission-${propertyId}`}
                          type="number"
                          step="0.01"
                          min="0"
                          max={data.usePercentage ? "100" : undefined}
                          value={data.commission || ""}
                          onChange={(e) =>
                            handlePropertyDataChange(
                              propertyId,
                              "commission",
                              e.target.value
                            )
                          }
                          placeholder={
                            data.usePercentage
                              ? "Enter percentage"
                              : "Enter fixed amount"
                          }
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleSave(propertyId)}
                          className="flex-1"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleCancel(propertyId)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Employee
                        </Label>
                        <p className="text-sm text-gray-600">
                          {data.employeeId
                            ? employees.find(
                                (e) => (e._id || e.id) === data.employeeId
                              )?.name || "Unknown"
                            : "Not assigned"}
                        </p>
                      </div>

                      {data.commission !== undefined &&
                        data.commission !== null &&
                        data.commission !== "" && (
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">
                              Commission
                            </Label>
                            <p className="text-sm text-gray-600">
                              {data.commission}
                              {data.usePercentage ? "%" : ""}
                            </p>
                          </div>
                        )}

                      <Button
                        variant="outline"
                        onClick={() => handleEdit(propertyId)}
                        className="w-full"
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {properties.length === 0 && (
          <Card className="bg-white">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No properties found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Commission;
