import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/dashboard/Sidebar";
import { useStore } from "@/store/useStore";
import {
  parseCommission,
  initializePropertyData,
  prepareCommissionPayload,
} from "@/utils/commissionHelpers";
import PropertyGridCard from "@/components/commission/PropertyGridCard";
import PropertyListCard from "@/components/commission/PropertyListCard";
import CommissionHeader from "@/components/commission/CommissionHeader";
import CommissionPagination from "@/components/commission/CommissionPagination";
import API_BASE_URL from "@/config/api";

function Commission() {
  const { showNotification } = useStore();
  const [properties, setProperties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingPropertyId, setSavingPropertyId] = useState(null);
  const [editingProperties, setEditingProperties] = useState({});
  const [propertyData, setPropertyData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("list");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <CommissionHeader view={view} onViewChange={setView} />

          {view === "grid" ? (
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
                  <PropertyGridCard
                    key={propertyId}
                    property={property}
                    propertyId={propertyId}
                    isEditing={isEditing}
                    data={data}
                    employees={employees}
                    onPropertyDataChange={handlePropertyDataChange}
                    onCheckboxChange={handleCheckboxChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onEdit={handleEdit}
                    savingPropertyId={savingPropertyId}
                    saveButtonRef={saveButtonRefs}
                  />
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
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
                  <PropertyListCard
                    key={propertyId}
                    property={property}
                    propertyId={propertyId}
                    isEditing={isEditing}
                    data={data}
                    employees={employees}
                    onPropertyDataChange={handlePropertyDataChange}
                    onCheckboxChange={handleCheckboxChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onEdit={handleEdit}
                    savingPropertyId={savingPropertyId}
                    saveButtonRef={saveButtonRefs}
                  />
                );
              })}
            </div>
          )}

          {properties.length === 0 && (
            <Card className="bg-white">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No properties found</p>
              </CardContent>
            </Card>
          )}

          <CommissionPagination
            pagination={pagination}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loading={loading}
          />
        </div>
      </div>
      {(savingPropertyId || loading) && <Loader />}
    </div>
  );
}

export default Commission;
