import React from "react";
import Amount from "@/components/common/Amount";

const MetricCard = ({
  title,
  value,
  icon,
  gradient,
  borderColor,
  hoverShadow,
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-2xl p-6 text-white transform hover:scale-[1.02] ${hoverShadow} transition-all duration-300 border ${borderColor}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-2`}>
            {title}
          </p>
          <p className="text-3xl font-bold mb-1">
            {typeof value === "number" ? <Amount amount={value} /> : value}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
