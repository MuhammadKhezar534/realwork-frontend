import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AgentForm from "@/components/agents/AgentForm";
import AgentList from "@/components/agents/AgentList";

const API_BASE_URL = "http://localhost:3000";

function Agents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ agentId: "", name: "" });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/agents`);
      setAgents(response.data.data || []);
      if (response.data.data && response.data.data.length === 0) {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAgent = async () => {
    try {
      await axios.post(`${API_BASE_URL}/agents`, {
        agentId: formData.agentId,
        name: formData.name,
      });
      setFormData({ agentId: "", name: "" });
      setShowForm(false);
      await fetchAgents();
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("Failed to add agent. Please try again.");
    }
  };

  const handleEdit = (agent) => {
    if (agent === null) {
      setEditingId(null);
      setFormData({ agentId: "", name: "" });
      return;
    }
    setEditingId(agent.agentId);
    setFormData({
      agentId: agent.agentId,
      name: agent.name || "",
    });
  };

  const handleSave = async (agentId) => {
    try {
      await axios.put(`${API_BASE_URL}/agents/${agentId}`, {
        name: formData.name,
      });
      setEditingId(null);
      setFormData({ agentId: "", name: "" });
      await fetchAgents();
    } catch (error) {
      console.error("Error updating agent:", error);
      alert("Failed to update agent. Please try again.");
    }
  };

  const handleDelete = async (agentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/agents/${agentId}`);
      await fetchAgents();
    } catch (error) {
      console.error("Error deleting agent:", error);
      alert("Failed to delete agent. Please try again.");
    }
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
            Agent Management
          </h1>
          <div className="flex gap-2">
            {/* {agents.length > 0 && !showForm && (
              <Button onClick={() => setShowForm(true)}>Add Agent</Button>
            )} */}
            <Button variant="outline" onClick={() => navigate("/")}>
              Home
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="bg-white shadow-lg border-2 border-transparent hover:border-blue-200">
            <CardContent className="p-6">
              <AgentForm
                formData={formData}
                onSubmit={handleAddAgent}
                onCancel={() => {
                  setShowForm(false);
                  setFormData({ agentId: "", name: "" });
                }}
                onChange={setFormData}
              />
            </CardContent>
          </Card>
        )}

        <AgentList
          agents={agents}
          onEdit={handleEdit}
          onSave={handleSave}
          onDelete={handleDelete}
          editingId={editingId}
          formData={formData}
          onFormChange={setFormData}
        />

        {agents.length === 0 && !showForm && (
          <Card className="bg-white">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No agents found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Agents;
