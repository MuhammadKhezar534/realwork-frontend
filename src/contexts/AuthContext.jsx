import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem("auth");
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          if (parsed.isAuthenticated && parsed.user) {
            setIsAuthenticated(true);
            setUser(parsed.user);
          }
        } catch (error) {
          console.error("Error parsing auth data:", error);
          localStorage.removeItem("auth");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      if (response.data.success) {
        const authData = {
          isAuthenticated: true,
          user: response.data.user,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        setIsAuthenticated(true);
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, error: response.data.error };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
