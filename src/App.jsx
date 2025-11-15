import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Commission from "./pages/Commission";
import Agents from "./pages/Agents";
import EmployeeStats from "./pages/EmployeeStats";
import ViewProperties from "./pages/ViewProperties";
import Login from "./pages/Login";
import Notification from "./components/common/Notification";
import "./i18n";

function App() {
  return (
    <AuthProvider>
      <Notification />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/commission"
          element={
            <ProtectedRoute>
              <Commission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <Agents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-stats/:employeeId"
          element={
            <ProtectedRoute>
              <EmployeeStats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-properties"
          element={
            <ProtectedRoute>
              <ViewProperties />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
