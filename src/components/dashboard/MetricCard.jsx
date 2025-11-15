import React from "react";
import { useTranslation } from "react-i18next";
import Amount from "@/components/common/Amount";

const MetricCard = ({
  title,
  value,
  icon,
  gradient,
  borderColor,
  onClick,
  clickable = false,
  showGrowth = false,
}) => {
  const { t } = useTranslation();

  const renderValue = () => {
    if (typeof value === "number") {
      return <Amount amount={value} />;
    }

    if (showGrowth && typeof value === "object" && value?.percent) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {value.percent}%
            </span>
            {value.direction === "up" && (
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {value.direction === "down" && (
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {t("metrics.vsPreviousPeriod")}
          </p>
        </div>
      );
    }

    return value;
  };

  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 border-2 ${borderColor} ${
        clickable ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p
            className={`text-xs font-semibold uppercase tracking-wider mb-2 text-gray-600`}
          >
            {title}
          </p>
          <div className="text-3xl font-bold mb-1 text-gray-900">
            {renderValue()}
          </div>
        </div>
        <div
          className={`bg-gradient-to-br ${gradient} rounded-xl p-3 text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
