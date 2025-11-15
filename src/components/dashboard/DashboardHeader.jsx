import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DashboardHeader = ({ onFetchLatestData, fetchingProperties }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Dashboard
        </h1>
        {user && (
          <p className="text-sm text-slate-400 font-medium">
            Welcome back, <span className="text-blue-400">{user.username}</span>
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <Button
          onClick={onFetchLatestData}
          disabled={fetchingProperties}
          className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {fetchingProperties ? "Fetching..." : "Get Latest Data"}
        </Button>
        <Button
          onClick={() => navigate("/employees")}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
        >
          Employees
        </Button>
        <Button
          onClick={() => navigate("/commission")}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
        >
          Commission
        </Button>
        <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
