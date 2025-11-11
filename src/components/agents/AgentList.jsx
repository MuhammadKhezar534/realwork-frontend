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
import AgentForm from "./AgentForm";

const AgentList = ({
  agents,
  onEdit,
  onSave,
  onDelete,
  editingId,
  formData,
  onFormChange,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);

  const handleDeleteClick = (agentId) => {
    setAgentToDelete(agentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (agentToDelete) {
      onDelete(agentToDelete);
      setDeleteDialogOpen(false);
      setAgentToDelete(null);
    }
  };

  if (agents.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
          const agentId = agent.agentId;
          const isEditing = editingId === agentId;

          return (
            <Card
              key={agentId}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200"
            >
              {isEditing ? (
                <CardContent className="pt-6">
                  <AgentForm
                    formData={formData}
                    onSubmit={() => onSave(agentId)}
                    onCancel={() => {
                      onEdit(null);
                      onFormChange({ agentId: "", name: "" });
                    }}
                    onChange={onFormChange}
                    isEditing={true}
                  />
                </CardContent>
              ) : (
                <>
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                    <CardTitle className="text-lg font-semibold">
                      {agent.name || agent.agentId}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Agent ID:</span>{" "}
                        {agent.agentId}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Name:</span>{" "}
                        {agent.name === "" ? "Not assigned" : agent.name}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => onEdit(agent)}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      {/* <Button
                        variant="destructive"
                        onClick={() => handleDeleteClick(agentId)}
                        className="flex-1"
                      >
                        Delete
                      </Button> */}
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          );
        })}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Agent</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this agent? This action cannot be
              undone.
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

export default AgentList;
