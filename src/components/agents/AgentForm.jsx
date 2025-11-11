import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AgentForm = ({
  formData,
  onSubmit,
  onCancel,
  onChange,
  isEditing = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Agent" : "Add Agent"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agentId">Agent ID</Label>
            <Input
              id="agentId"
              type="text"
              value={formData.agentId || ""}
              onChange={(e) =>
                onChange({ ...formData, agentId: e.target.value })
              }
              placeholder="Enter agent ID"
              required
              disabled={isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name || ""}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              placeholder="Enter agent name"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Agent"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentForm;
