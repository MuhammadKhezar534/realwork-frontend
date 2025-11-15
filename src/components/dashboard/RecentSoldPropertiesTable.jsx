import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import API_BASE_URL from "@/config/api";
import Amount from "@/components/common/Amount";

const RecentSoldPropertiesTable = ({ selectedEmployee, selectedCity }) => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchRecentSoldProperties();
  }, [selectedEmployee, selectedCity]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      setEmployees(response.data.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchRecentSoldProperties = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedEmployee) params.employeeId = selectedEmployee;
      if (selectedCity) params.city = selectedCity;

      const response = await axios.get(
        `${API_BASE_URL}/properties/most-recent-sold`,
        { params }
      );
      setProperties(response.data.data || []);
    } catch (error) {
      console.error("Error fetching recent sold properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (adres) => {
    if (!adres) return "N/A";
    const parts = [
      adres.straat,
      adres.huisnummer?.hoofdnummer,
      adres.postcode,
      adres.plaats,
    ].filter(Boolean);
    return parts.join(", ") || "N/A";
  };

  const calculateCommission = (property) => {
    const commission = property.commission;
    const koopprijs = property.financieel?.overdracht?.koopprijs;

    if (!commission) return "N/A";

    if (commission.includes("%")) {
      const percentage = parseFloat(commission.replace("%", ""));
      if (koopprijs && !isNaN(percentage)) {
        const calculatedAmount = (koopprijs * percentage) / 100;
        return <Amount amount={calculatedAmount} />;
      }
      return commission;
    }

    const fixedAmount = parseFloat(commission);
    if (!isNaN(fixedAmount)) {
      return <Amount amount={fixedAmount} />;
    }

    return commission;
  };

  const getEmployeeName = (employeeId) => {
    if (!employeeId) return "Not Assigned";
    const employee = employees.find(
      (e) => e._id === employeeId || e.id === employeeId
    );
    return employee ? employee.name : "Unknown";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          {t("recentSold.title")}
        </h3>
        <div className="text-center text-gray-500 py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        {t("recentSold.title")}
      </h3>
      {properties.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          {t("recentSold.noProperties")}
        </div>
      ) : (
        <div
          className={`overflow-auto ${
            properties.length > 5 ? "max-h-[240px]" : ""
          }`}
        >
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50 backdrop-blur-sm">
              <tr>
                <th className="text-left text-sm font-semibold text-gray-700 p-3 border-b border-gray-200">
                  {t("recentSold.address")}
                </th>
                <th className="text-left text-sm font-semibold text-gray-700 p-3 border-b border-gray-200">
                  {t("recentSold.commission")}
                </th>
                <th className="text-left text-sm font-semibold text-gray-700 p-3 border-b border-gray-200">
                  {t("recentSold.employee")}
                </th>
              </tr>
            </thead>
            <tbody>
              {properties.slice(0, 10).map((property, index) => (
                <tr
                  key={property._id || property.id || index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="text-sm text-gray-700 p-3">
                    {formatAddress(property.adres)}
                  </td>
                  <td className="text-sm text-gray-700 p-3">
                    {calculateCommission(property)}
                  </td>
                  <td className="text-sm text-gray-700 p-3">
                    {getEmployeeName(property.employeeId)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentSoldPropertiesTable;
