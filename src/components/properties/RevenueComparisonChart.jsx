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

const RevenueComparisonChart = ({ verifiedArray, plannedArray }) => {
  const navigate = useNavigate();

  if (!Array.isArray(verifiedArray)) verifiedArray = [];
  if (!Array.isArray(plannedArray)) plannedArray = [];

  const chartData = processRevenueDataForChart(verifiedArray, plannedArray);

  const handlePointClick = (data, revenueType) => {
    if (!data || !data.fullMonthName || !data.year) return;

    const revenue = revenueType === "verified" ? data.verified : data.planned;

    if (revenue && revenue > 0) {
      const monthName = data.fullMonthName;
      const year = data.year;
      navigate(`/revenue/${revenueType}/${year}/${monthName}`);
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

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
          formatter={(value, name) => {
            if (typeof value === "number") {
              return [
                `€${value.toLocaleString()}`,
                name === "Verified Revenue"
                  ? "Verified Revenue"
                  : "Planned Revenue",
              ];
            }
            return [value, name];
          }}
        />
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
