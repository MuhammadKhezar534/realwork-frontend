import { useState, useEffect } from "react";
import axios from "axios";
import { mergeRevenueData } from "@/utils/fun";

const API_BASE_URL = "http://localhost:3000";

export const useGetStats = (selectedEmployee, selectedCity) => {
  const [employees, setEmployees] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifiedRevenueData, setVerifiedRevenueData] = useState(null);
  const [plannedRevenueData, setPlannedRevenueData] = useState(null);
  const [employeePropertiesData, setEmployeePropertiesData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch employees list
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/employees`);
        if (response.data && response.data.data) {
          setEmployees(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to fetch employees");
      }
    };

    fetchEmployees();
  }, []);

  // Fetch properties to extract cities
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/properties`);
        if (response.data && response.data.data) {
          // Extract unique cities from properties
          const uniqueCities = [
            ...new Set(
              response.data.data
                .map((prop) => prop?.adres?.plaats)
                .filter((city) => city)
            ),
          ];
          setCities(uniqueCities.sort());
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to fetch properties");
      }
    };

    fetchProperties();
  }, []);

  // Fetch all three APIs when filters change
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (selectedEmployee) {
          params.append("employeeId", selectedEmployee);
        }
        if (selectedCity) {
          params.append("city", selectedCity);
        }

        const queryString = params.toString();
        const urlSuffix = queryString ? `?${queryString}` : "";

        // Fetch all three APIs in parallel
        const [verifiedRes, plannedRes, employeePropsRes] = await Promise.all([
          axios.get(
            `${API_BASE_URL}/properties/fetch-verified-revenue${urlSuffix}`
          ),
          axios.get(
            `${API_BASE_URL}/properties/fetch-planned-revenue${urlSuffix}`
          ),
          axios.get(`${API_BASE_URL}/employee-properties${urlSuffix}`),
        ]);

        setVerifiedRevenueData(verifiedRes.data);
        setPlannedRevenueData(plannedRes.data);
        setEmployeePropertiesData(employeePropsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedEmployee, selectedCity]);

  return {
    employees,
    cities,
    loading,
    verifiedRevenueData,
    plannedRevenueData,
    employeePropertiesData,
    error,
    mergeData: mergeRevenueData({ plannedRevenueData, verifiedRevenueData }),
  };
};
