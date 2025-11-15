import React from "react";
import PropertyStatusChart from "@/components/properties/PieCHart";
import RevenueComparisonChart from "@/components/properties/RevenueComparisonChart";
import RealtorPerformanceMetric from "@/components/properties/RealtorPerformanceMetric";

const ChartsSection = ({
  mergeData,
  verifiedRevenueData,
  employeePropertiesData,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
          Verified vs Planned Revenue
        </h3>
        <RevenueComparisonChart
          verifiedArray={mergeData?.verifiedRevenueData || []}
          plannedArray={mergeData?.plannedRevenueData || []}
        />
      </div>

      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          Property Status Distribution
        </h3>
        <PropertyStatusChart
          data={verifiedRevenueData?.groupData?.stats ?? []}
        />
      </div>

      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          Realtor Performance Metric
        </h3>
        <RealtorPerformanceMetric data={employeePropertiesData?.data || []} />
      </div>
    </div>
  );
};

export default ChartsSection;
