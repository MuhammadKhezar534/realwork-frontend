import React, { useState } from "react";
import { useGetStats } from "@/hooks/useGetStats";
import { useFetchSaveProperties } from "@/hooks/useFetchSaveProperties";
import Loader from "@/components/common/Loader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FilterSection from "@/components/dashboard/FilterSection";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import ChartsSection from "@/components/dashboard/ChartsSection";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
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
        />

        <ChartsSection
          mergeData={mergeData}
          verifiedRevenueData={verifiedRevenueData}
          employeePropertiesData={employeePropertiesData}
        />

        {(loading || fetchingProperties) && <Loader />}
      </div>
    </div>
  );
}

export default Home;
