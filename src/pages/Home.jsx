import React, { useState } from "react";
import { useGetStats } from "@/hooks/useGetStats";
import { useFetchSaveProperties } from "@/hooks/useFetchSaveProperties";
import Loader from "@/components/common/Loader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FilterSection from "@/components/dashboard/FilterSection";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import ChartsSection from "@/components/dashboard/ChartsSection";
import RecentSoldPropertiesTable from "@/components/dashboard/RecentSoldPropertiesTable";
import Sidebar from "@/components/dashboard/Sidebar";

function Home() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const {
    fetchAndSave,
    loading: fetchingProperties,
    isFetchUpdatedData,
  } = useFetchSaveProperties();

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <DashboardHeader
            onFetchLatestData={handleFetchLatestData}
            fetchingProperties={fetchingProperties}
          />

          <FilterSection
            employees={employees}
            cities={cities}
            selectedEmployee={selectedEmployee}
            selectedCity={selectedCity}
            onEmployeeChange={setSelectedEmployee}
            onCityChange={setSelectedCity}
          />

          <MetricsGrid
            verifiedRevenueData={verifiedRevenueData}
            plannedRevenueData={plannedRevenueData}
            mergeData={mergeData}
          />

          <ChartsSection
            mergeData={mergeData}
            verifiedRevenueData={verifiedRevenueData}
            employeePropertiesData={employeePropertiesData}
          />

          <RecentSoldPropertiesTable
            selectedEmployee={selectedEmployee}
            selectedCity={selectedCity}
          />

          {(loading || fetchingProperties) && <Loader />}
        </div>
      </div>
    </div>
  );
}

export default Home;
