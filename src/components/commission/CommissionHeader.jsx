import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ViewToggle from "@/components/common/ViewToggle";

const CommissionHeader = ({ view, onViewChange }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
        {t("commission.management")}
      </h1>
      <div className="flex items-center gap-3">
        <ViewToggle view={view} onViewChange={onViewChange} />
        <Button variant="outline" onClick={() => navigate("/")}>
          {t("pages.home")}
        </Button>
      </div>
    </div>
  );
};

export default CommissionHeader;
