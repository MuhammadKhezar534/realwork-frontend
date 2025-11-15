import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = ({
  employees,
  onEdit,
  onSave,
  onDelete,
  editingId,
  formData,
  onFormChange,
  view = "list",
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      onDelete(employeeToDelete);
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  if (employees.length === 0) {
    return null;
  }

  const renderEmployeeCard = (employee) => {
    const employeeId = employee._id || employee.id;
    const isEditing = editingId === employeeId;

    return (
      <Card
        key={employeeId}
        className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200"
      >
        {isEditing ? (
          <CardContent className="pt-6">
            <EmployeeForm
              formData={formData}
              onSubmit={() => onSave(employeeId)}
              onCancel={() => {
                onEdit(null);
                onFormChange({ name: "" });
              }}
              onChange={onFormChange}
              isEditing={true}
            />
          </CardContent>
        ) : (
          <>
            <CardHeader className="bg-gradient-to-r from-primary to-primary-dark text-black rounded-t-lg">
              <CardTitle className="text-lg font-semibold">
                {employee.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onEdit(employee)}
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(employeeId)}
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    );
  };

  return (
    <>
      {view === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {employees.map(renderEmployeeCard)}
        </div>
      ) : (
        <div className="space-y-4">
          {employees.map((employee) => {
            const employeeId = employee._id || employee.id;
            const isEditing = editingId === employeeId;

            return (
              <Card
                key={employeeId}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200"
              >
                {isEditing ? (
                  <CardContent className="pt-6">
                    <EmployeeForm
                      formData={formData}
                      onSubmit={() => onSave(employeeId)}
                      onCancel={() => {
                        onEdit(null);
                        onFormChange({ name: "" });
                      }}
                      onChange={onFormChange}
                      isEditing={true}
                    />
                  </CardContent>
                ) : (
                  <div className="flex items-center justify-between p-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {employee.name}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => onEdit(employee)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteClick(employeeId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeList;
