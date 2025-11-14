import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { processRevenueDataForChart } from "@/utils/fun";
import { useStore } from "@/store/useStore";

const RevenueComparisonChart = ({ verifiedArray, plannedArray }) => {
  const navigate = useNavigate();
  const { setProperties } = useStore();

  if (!Array.isArray(verifiedArray)) verifiedArray = [];
  if (!Array.isArray(plannedArray)) plannedArray = [];

  const chartData = processRevenueDataForChart(verifiedArray, plannedArray);

  const handlePointClick = (data, revenueType) => {
    if (!data || !data.fullMonthName || !data.year) return;

    const revenue = revenueType === "verified" ? data.verified : data.planned;
    const properties =
      revenueType === "verified" ? data.verifiedData : data.plannedData;

    if (revenue && revenue > 0) {
      if (Array.isArray(properties) && properties.length > 0) {
        setProperties(properties);
        navigate("/view-properties");
      }
    }
  };

  const VerifiedDot = (props) => {
    const { cx, cy, payload } = props;
    const revenue = payload?.verified;

    if (!revenue || revenue === 0) {
      return null;
    }

    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#6366f1"
        stroke="#fff"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onClick={() => handlePointClick(payload, "verified")}
        onMouseEnter={(e) => {
          e.target.style.opacity = "0.7";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
        }}
      />
    );
  };

  const PlannedDot = (props) => {
    const { cx, cy, payload } = props;
    const revenue = payload?.planned;

    if (!revenue || revenue === 0) {
      return null;
    }

    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#10b981"
        stroke="#fff"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onClick={() => handlePointClick(payload, "planned")}
        onMouseEnter={(e) => {
          e.target.style.opacity = "0.7";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
        }}
      />
    );
  };

  const formatAmountString = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "€0";
    }
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) {
      return "€0";
    }
    if (Math.abs(numAmount) >= 1000000) {
      const millions = numAmount / 1000000;
      return millions >= 10
        ? `€${millions.toFixed(0)}M`
        : `€${millions.toFixed(1)}M`;
    }
    if (Math.abs(numAmount) >= 1000) {
      const thousands = numAmount / 1000;
      return thousands >= 10
        ? `€${thousands.toFixed(0)}K`
        : `€${thousands.toFixed(1)}K`;
    }
    return numAmount % 1 === 0
      ? `€${numAmount.toString()}`
      : `€${numAmount.toFixed(2)}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === "Verified Revenue"
                ? "Verified Revenue"
                : "Planned Revenue"}
              : {formatAmountString(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="verified"
          stroke="#6366f1"
          strokeWidth={3}
          name="Verified Revenue"
          dot={<VerifiedDot />}
          activeDot={{
            r: 6,
            onClick: (e, payload) =>
              handlePointClick(payload.payload, "verified"),
          }}
        />
        <Line
          type="monotone"
          dataKey="planned"
          stroke="#10b981"
          strokeWidth={3}
          name="Planned Revenue"
          dot={<PlannedDot />}
          activeDot={{
            r: 6,
            onClick: (e, payload) =>
              handlePointClick(payload.payload, "planned"),
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueComparisonChart;
