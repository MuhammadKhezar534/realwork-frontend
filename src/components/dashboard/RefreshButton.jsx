import React from "react";
import { Button } from "@/components/ui/button";

const RefreshButton = ({ onFetchLatestData, fetchingProperties }) => {
  return (
    <Button
      onClick={onFetchLatestData}
      disabled={fetchingProperties}
      className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium p-3 rounded-lg"
      aria-label="Refresh data"
    >
      <svg
        className={`w-5 h-5 ${fetchingProperties ? "animate-spin" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </Button>
  );
};

export default RefreshButton;
