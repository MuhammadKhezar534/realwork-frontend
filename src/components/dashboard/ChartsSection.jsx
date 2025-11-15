import React from "react";
import { useTranslation } from "react-i18next";
import PropertyStatusChart from "@/components/properties/PieCHart";
import RevenueComparisonChart from "@/components/properties/RevenueComparisonChart";
import RealtorPerformanceMetric from "@/components/properties/RealtorPerformanceMetric";

const ChartsSection = ({
  mergeData,
  verifiedRevenueData,
  employeePropertiesData,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          {t("charts.verifiedVsPlanned")}
        </h3>
        <RevenueComparisonChart
          verifiedArray={mergeData?.verifiedRevenueData || []}
          plannedArray={mergeData?.plannedRevenueData || []}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
          {t("charts.propertyStatusDistribution")}
        </h3>
        <PropertyStatusChart
          data={verifiedRevenueData?.groupData?.stats ?? []}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-primary-light rounded-full"></div>
          {t("charts.realtorPerformance")}
        </h3>
        <RealtorPerformanceMetric data={employeePropertiesData?.data || []} />
      </div>
    </div>
  );
};

export default ChartsSection;
