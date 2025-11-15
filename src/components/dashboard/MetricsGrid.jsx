import React from "react";
import MetricCard from "./MetricCard";
import { compareChange } from "@/utils/fun";

const MetricsGrid = ({ verifiedRevenueData, plannedRevenueData }) => {
  const metrics = [
    {
      title: "Total Verified Revenue",
      value: verifiedRevenueData?.data?.currentMonth?.revenue || 0,
      gradient: "from-blue-600 via-blue-700 to-indigo-700",
      borderColor: "border-blue-500/20",
      hoverShadow: "hover:shadow-blue-500/20",
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
      title: "Planned Revenue",
      value: plannedRevenueData?.data?.totalPlannedRevenue || 0,
      gradient: "from-emerald-600 via-emerald-700 to-teal-700",
      borderColor: "border-emerald-500/20",
      hoverShadow: "hover:shadow-emerald-500/20",
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
      title: "Pipeline Total Value",
      value: plannedRevenueData?.pipelineTotalValue || 0,
      gradient: "from-amber-600 via-amber-700 to-orange-700",
      borderColor: "border-amber-500/20",
      hoverShadow: "hover:shadow-amber-500/20",
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
      title: "Revenue Growth",
      value: compareChange(
        verifiedRevenueData?.data?.previousMonthTotalRevenue,
        verifiedRevenueData?.data?.currentMonth?.revenue
      ),
      gradient: "from-purple-600 via-purple-700 to-pink-700",
      borderColor: "border-purple-500/20",
      hoverShadow: "hover:shadow-purple-500/20",
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
