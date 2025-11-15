import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeList from "@/components/employees/EmployeeList";
import ViewToggle from "@/components/common/ViewToggle";
import Sidebar from "@/components/dashboard/Sidebar";
import Loader from "@/components/common/Loader";
import API_BASE_URL from "@/config/api";

function Employees() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [view, setView] = useState("list");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      setEmployees(response.data.data || []);
      if (response.data.data && response.data.data.length === 0) {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post(`${API_BASE_URL}/employees`, {
        name: formData.name,
      });
      setFormData({ name: "" });
      setShowForm(false);
      await fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  const handleEdit = (employee) => {
    if (employee === null) {
      setEditingId(null);
      setFormData({ name: "" });
      return;
    }
    setEditingId(employee._id || employee.id);
    setFormData({
      name: employee.name,
    });
  };

  const handleSave = async (employeeId) => {
    try {
      await axios.put(`${API_BASE_URL}/employees/${employeeId}`, {
        name: formData.name,
      });
      setEditingId(null);
      setFormData({ name: "" });
      await fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee. Please try again.");
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`${API_BASE_URL}/employees/${employeeId}`);
      await fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
          <Sidebar />
          <div className="flex-1 ml-64 p-8">
            <div className="max-w-7xl mx-auto">
              <p className="text-center text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {t("employee.management")}
            </h1>
            <div className="flex items-center gap-3">
              {employees.length > 0 && !showForm && (
                <>
                  <ViewToggle view={view} onViewChange={setView} />
                  <Button onClick={() => setShowForm(true)}>
                    {t("buttons.addEmployee")}
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => navigate("/")}>
                {t("pages.home")}
              </Button>
            </div>
          </div>

          {showForm && (
            <Card className="bg-white shadow-lg border-2 border-transparent hover:border-primary-light">
              <CardContent className="p-6">
                <EmployeeForm
                  formData={formData}
                  onSubmit={handleAddEmployee}
                  onCancel={() => {
                    setShowForm(false);
                    setFormData({ name: "" });
                  }}
                  onChange={setFormData}
                />
              </CardContent>
            </Card>
          )}

          <EmployeeList
            employees={employees}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            editingId={editingId}
            formData={formData}
            onFormChange={setFormData}
            view={view}
          />

          {employees.length === 0 && !showForm && (
            <Card className="bg-white">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No employees found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employees;
