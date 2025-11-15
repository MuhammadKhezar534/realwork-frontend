import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Amount from "@/components/common/Amount";
import "@/styles/chart.css";

const RealtorPerformanceMetric = ({ data = [] }) => {
  const navigate = useNavigate();

  // Transform data for the chart
  const chartData = data.map((item) => ({
    name: item.employee?.name || "Unknown",
    employeeId: item.employeeId,
    propertyCount: item.propertyCount || 0,
    totalRevenue: item.totalRevenue || 0,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div className="bg-white p-3 border-2 border-primary/30 rounded-lg shadow-xl">
          <p className="font-semibold text-gray-900 mb-2">{data?.name}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm font-medium"
              style={{
                color:
                  entry.dataKey === "propertyCount" ? "#bed730" : "#10b981",
              }}
            >
              {entry.name}:{" "}
              {entry.dataKey === "propertyCount" ? (
                entry.value
              ) : (
                <Amount amount={entry.value} />
              )}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    if (data && data.employeeId) {
      navigate(`/employee-stats/${data.employeeId}`);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-slate-400">
        <p>No data available</p>
      </div>
    );
  }

  const maxPropertyCount = Math.max(
    ...chartData.map((d) => d.propertyCount),
    1
  );
  const maxRevenue = Math.max(...chartData.map((d) => d.totalRevenue), 1);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 80, left: 60, bottom: 80 }}
          barCategoryGap="20%"
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis
            yAxisId="propertyCount"
            orientation="left"
            stroke="#bed730"
            tick={{ fill: "#bed730", fontSize: 14 }}
            allowDecimals={false}
            domain={[0, Math.ceil(maxPropertyCount * 1.1)]}
            label={{
              value: "Property Count",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fill: "#bed730",
                fontSize: "12px",
              },
            }}
          />
          <YAxis
            yAxisId="revenue"
            orientation="right"
            stroke="#10b981"
            tick={{ fill: "#34d399", fontSize: 12 }}
            domain={[0, Math.ceil(maxRevenue * 1.1)]}
            tickFormatter={(value) => {
              if (value >= 1000000) {
                return `€${(value / 1000000).toFixed(1)}M`;
              } else if (value >= 1000) {
                return `€${(value / 1000).toFixed(0)}K`;
              }
              return `€${value}`;
            }}
            label={{
              value: "Revenue (€)",
              angle: -90,
              position: "insideRight",
              style: {
                textAnchor: "middle",
                fill: "#34d399",
                fontSize: "12px",
              },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              color: "#374151",
              height: "0px",
            }}
            iconType="rect"
            formatter={(value) => {
              if (value === "propertyCount") return "Property Count";
              if (value === "totalRevenue") return "Total Revenue (€)";
              return value;
            }}
          />
          <Bar
            dataKey="propertyCount"
            name="Property Count"
            fill="#bed730"
            radius={[4, 4, 0, 0]}
            yAxisId="propertyCount"
            onClick={(data, index) => {
              if (index !== undefined && chartData[index]) {
                handleBarClick(chartData[index]);
              }
            }}
            style={{ cursor: "pointer" }}
            className="bar-chart"
          />
          <Bar
            dataKey="totalRevenue"
            name="Total Revenue"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            yAxisId="revenue"
            onClick={(data, index) => {
              if (index !== undefined && chartData[index]) {
                handleBarClick(chartData[index]);
              }
            }}
            style={{ cursor: "pointer" }}
            className="bar-chart"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealtorPerformanceMetric;
