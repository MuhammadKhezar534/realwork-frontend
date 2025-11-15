import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, Sector } from "recharts";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import "@/styles/chart.css";

const CustomTooltip = ({ active, payload, total }) => {
  console.log({ active, payload, total });
  if (active && payload && payload.length) {
    const data = payload[0];
    const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;

    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-xl">
        <p className="text-sm font-semibold text-slate-800 mb-1">
          {data.name || "Unknown"}
        </p>
        <p className="text-sm text-slate-600">
          Count:{" "}
          <span className="font-semibold text-slate-900">
            {data.value || 0}
          </span>
        </p>
        <p className="text-sm text-slate-600">
          Percentage:{" "}
          <span className="font-semibold text-slate-900">{percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#FF6B6B",
  "#FF0000",
  "#00FF00",
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#e2e8f0"
        fontSize="14"
        fontWeight="500"
      >{`${value} (${(percent * 100).toFixed(1)}%)`}</text>
    </g>
  );
};

export default function PropertyStatusChart({ data }) {
  const navigate = useNavigate();
  const { setProperties } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = data?.reduce((sum, item) => sum + (item.count || 0), 0);
  console.log({ total, data });

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleClick = (entry) => {
    if (
      entry &&
      Array.isArray(entry.properties) &&
      entry.properties.length > 0
    ) {
      setProperties(entry.properties);
      navigate("/view-properties");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <PieChart width={480} height={350}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="count"
          nameKey="status"
          onMouseEnter={onPieEnter}
          onClick={handleClick}
          cursor="pointer"
          className="pie-chart"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={
            <CustomTooltip active={activeIndex} payload={data} total={total} />
          }
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ color: "#e2e8f0" }}
        />
      </PieChart>
    </div>
  );
}
