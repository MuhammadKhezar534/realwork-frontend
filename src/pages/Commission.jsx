import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/common/Loader";
import Amount from "@/components/common/Amount";
import { useStore } from "@/store/useStore";
import {
  parseCommission,
  initializePropertyData,
  formatAddress,
  prepareCommissionPayload,
} from "@/utils/commissionHelpers";
import API_BASE_URL from "@/config/api";

function Commission() {
  const navigate = useNavigate();
  const { showNotification } = useStore();
  const [properties, setProperties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingPropertyId, setSavingPropertyId] = useState(null);
  const [editingProperties, setEditingProperties] = useState({});
  const [propertyData, setPropertyData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const saveButtonRefs = useRef({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/properties`, {
        params: {
          page: currentPage,
          limit: 50,
        },
      });
      setProperties(response.data.data || []);

      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }

      const initialData = initializePropertyData(response.data.data || []);
      setPropertyData(initialData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

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
    // fetchProperties();
  };

  const handleSave = async (propertyId) => {
    const scrollPosition = window.scrollY;

    setSavingPropertyId(propertyId);
    try {
      const data = propertyData[propertyId] || {};
      const payload = prepareCommissionPayload(data);

      await axios.put(
        `${API_BASE_URL}/properties/${propertyId}/assign-employee`,
        payload
      );

      setEditingProperties((prev) => {
        const newState = { ...prev };
        delete newState[propertyId];
        return newState;
      });

      showNotification("success", "Property updated successfully!");
      await fetchProperties();

      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    } catch (error) {
      console.error("Error saving property assignment:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to save property assignment. Please try again.";
      showNotification("error", errorMessage);
    } finally {
      setSavingPropertyId(null);
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

            const { commissionValue, usePercentage } = parseCommission(
              property.commission
            );

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
                          ref={(el) =>
                            (saveButtonRefs.current[propertyId] = el)
                          }
                          onClick={() => handleSave(propertyId)}
                          className="flex-1"
                          disabled={savingPropertyId === propertyId}
                        >
                          {savingPropertyId === propertyId
                            ? "Saving..."
                            : "Save"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleCancel(propertyId)}
                          className="flex-1"
                          disabled={savingPropertyId === propertyId}
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
                              {data.usePercentage ? (
                                `${data.commission}%`
                              ) : (
                                <Amount amount={data.commission} />
                              )}
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

        {pagination.totalPages > 1 && (
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * pagination.limit + 1} to{" "}
                  {Math.min(currentPage * pagination.limit, pagination.total)}{" "}
                  of {pagination.total} properties
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={
                              currentPage === pageNum ? "default" : "outline"
                            }
                            onClick={() => setCurrentPage(pageNum)}
                            disabled={loading}
                            className="min-w-[40px]"
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(pagination.totalPages, prev + 1)
                      )
                    }
                    disabled={currentPage === pagination.totalPages || loading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {(savingPropertyId || loading) && <Loader />}
    </div>
  );
}

export default Commission;
