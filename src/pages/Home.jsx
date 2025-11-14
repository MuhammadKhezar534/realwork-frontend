import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useGetStats } from "@/hooks/useGetStats";
import { compareChange } from "@/utils/fun";
import { useAuth } from "@/contexts/AuthContext";
import PropertyStatusChart from "@/components/properties/PieCHart";
import RevenueComparisonChart from "@/components/properties/RevenueComparisonChart";
import RealtorPerformanceMetric from "@/components/properties/RealtorPerformanceMetric";
import Loader from "@/components/common/Loader";
import Amount from "@/components/common/Amount";
import { useFetchSaveProperties } from "@/hooks/useFetchSaveProperties";

const formatCityName = (city) => {
  if (!city) return "";
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};

function Home() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const {
    fetchAndSave,
    loading: fetchingProperties,
    isFetchUpdatedData,
  } = useFetchSaveProperties();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const {
    employees,
    cities,
    loading,
    verifiedRevenueData,
    plannedRevenueData,
    employeePropertiesData,
    error: _error,
    mergeData,
  } = useGetStats(selectedEmployee, selectedCity, isFetchUpdatedData);

  const handleFetchLatestData = async () => {
    await fetchAndSave();
  };
  console.log({
    verifiedRevenueData,
    plannedRevenueData,
    employeePropertiesData,
    mergeData,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            {user && (
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {user.username}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleFetchLatestData}
              disabled={fetchingProperties}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {fetchingProperties ? "Fetching..." : "Get Latest Data"}
            </Button>
            <Button
              onClick={() => navigate("/employees")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              Employees
            </Button>
            <Button
              onClick={() => navigate("/commission")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              Commission
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Employee
              </label>
              <Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full bg-white border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Employees</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                City
              </label>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All Cities</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {formatCityName(city)}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">
                  Total Verified Revenue
                </p>
                <p className="text-3xl font-bold">
                  <Amount
                    amount={
                      verifiedRevenueData?.data?.currentMonth?.revenue || 0
                    }
                  />
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">
                  Planned Revenue
                </p>
                <p className="text-3xl font-bold">
                  <Amount
                    amount={plannedRevenueData?.data?.totalPlannedRevenue || 0}
                  />
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium mb-1">
                  Pipeline Total Value
                </p>
                <p className="text-3xl font-bold">
                  <Amount
                    amount={plannedRevenueData?.pipelineTotalValue || 0}
                  />
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-100 text-sm font-medium mb-1">
                  Revenue Growth
                </p>
                <p className="text-3xl font-bold">
                  {compareChange(
                    verifiedRevenueData?.data?.previousMonthTotalRevenue,
                    verifiedRevenueData?.data?.currentMonth?.revenue
                  )}
                </p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Verified vs Planned Revenue
            </h3>
            <RevenueComparisonChart
              verifiedArray={mergeData?.verifiedRevenueData || []}
              plannedArray={mergeData?.plannedRevenueData || []}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Property Status Distribution
            </h3>
            <PropertyStatusChart
              data={verifiedRevenueData?.groupData?.stats ?? []}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Realtor Performance Metric
            </h3>
            <RealtorPerformanceMetric
              data={employeePropertiesData?.data || []}
            />
          </div>

          {/* <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Property Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={verifiedRevenueData?.groupData?.stats ?? []}
                  cx="40%"
                  cy="60%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div> */}
        </div>

        {(loading || fetchingProperties) && <Loader />}
      </div>
    </div>
  );
}

export default Home;
