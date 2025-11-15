import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import RefreshButton from "./RefreshButton";

const DashboardHeader = ({ onFetchLatestData, fetchingProperties }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2 tracking-tight">
          {t("dashboard.title")}
        </h1>
        {user && (
          <p className="text-sm text-gray-600 font-medium">
            {t("dashboard.welcomeBack")},{" "}
            <span className="text-primary font-semibold">{user.username}</span>
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <RefreshButton
          onFetchLatestData={onFetchLatestData}
          fetchingProperties={fetchingProperties}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
