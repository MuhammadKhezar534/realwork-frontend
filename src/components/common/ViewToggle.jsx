import React from "react";
import { useTranslation } from "react-i18next";

const ViewToggle = ({ view, onViewChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-md border border-gray-200">
      <button
        onClick={() => onViewChange("list")}
        className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
          view === "list"
            ? "bg-primary text-black shadow-md"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span>{t("view.list")}</span>
        </div>
      </button>
      <button
        onClick={() => onViewChange("grid")}
        className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
          view === "grid"
            ? "bg-primary text-black shadow-md"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>{t("view.grid")}</span>
        </div>
      </button>
    </div>
  );
};

export default ViewToggle;
