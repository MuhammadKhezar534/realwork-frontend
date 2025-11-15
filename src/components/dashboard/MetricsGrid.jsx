import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MetricCard from "./MetricCard";
import { compareChange } from "@/utils/fun";
import { useStore } from "@/store/useStore";

const MetricsGrid = ({
  verifiedRevenueData,
  plannedRevenueData,
  mergeData,
}) => {
  const navigate = useNavigate();
  const { setProperties } = useStore();
  const { t } = useTranslation();

  const handleVerifiedRevenueClick = () => {
    const properties = verifiedRevenueData?.data?.currentMonth?.data;
    if (Array.isArray(properties) && properties.length > 0) {
      setProperties(properties);
      navigate("/view-properties");
    }
  };

  const handlePlannedRevenueClick = () => {
    const plannedRevenueArray = mergeData?.plannedRevenueData || [];
    const allProperties = [];

    plannedRevenueArray.forEach((revenue) => {
      if (revenue?.data && Array.isArray(revenue.data)) {
        allProperties.push(...revenue.data);
      }
    });

    if (allProperties.length > 0) {
      setProperties(allProperties);
      navigate("/view-properties");
    }
  };

  const handlePipelineClick = () => {
    const properties = plannedRevenueData?.allFilteredProperties;
    if (Array.isArray(properties) && properties.length > 0) {
      setProperties(properties);
      navigate("/view-properties");
    }
  };

  const metrics = [
    {
      title: t("metrics.totalVerifiedRevenue"),
      value: verifiedRevenueData?.data?.currentMonth?.revenue || 0,
      gradient: "from-primary via-primary-dark to-[#7a9318]",
      borderColor: "border-primary/30",
      hoverShadow: "hover:shadow-primary/20",
      onClick: handleVerifiedRevenueClick,
      clickable: true,
      icon: (
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
      ),
    },
    {
      title: t("metrics.plannedRevenue"),
      value: plannedRevenueData?.data?.totalPlannedRevenue || 0,
      gradient: "from-emerald-600 via-emerald-700 to-teal-700",
      borderColor: "border-emerald-300",
      hoverShadow: "hover:shadow-emerald-500/20",
      onClick: handlePlannedRevenueClick,
      clickable: true,
      icon: (
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
      ),
    },
    {
      title: t("metrics.pipelineTotalValue"),
      value: plannedRevenueData?.pipelineTotalValue || 0,
      gradient: "from-[#d4e668] via-primary to-primary-hover",
      borderColor: "border-primary-light",
      hoverShadow: "hover:shadow-primary-light/20",
      onClick: handlePipelineClick,
      clickable: true,
      icon: (
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
      ),
    },
    {
      title: t("metrics.revenueGrowth"),
      value: compareChange(
        verifiedRevenueData?.data?.previousMonthTotalRevenue,
        verifiedRevenueData?.data?.currentMonth?.revenue
      ),
      gradient: "from-gray-700 via-gray-800 to-gray-900",
      borderColor: "border-gray-300",
      hoverShadow: "hover:shadow-gray-500/20",
      clickable: false,
      showGrowth: true,
      icon: (
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
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;
