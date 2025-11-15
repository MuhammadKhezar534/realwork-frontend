import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import heykensLogo from "@/assets/images/heykens-logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40 flex flex-col">
      <div className="flex flex-col h-full p-6">
        <div className="mb-8">
          <img
            src={heykensLogo}
            alt="Heykens Logo"
            style={{
              borderRadius: "50%",
              height: "120px",
              width: "120px",
              margin: "auto",
            }}
            className="w-auto object-contain mb-6 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          />
          <LanguageSwitcher />
        </div>

        <nav className="flex-1 space-y-2">
          <Button
            onClick={() => navigate("/")}
            className={`w-full justify-start ${
              isActive("/")
                ? "bg-primary hover:bg-primary-hover text-black"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            } transition-all duration-200 font-medium`}
          >
            {t("pages.home")}
          </Button>
          <Button
            onClick={() => navigate("/employees")}
            className={`w-full justify-start ${
              isActive("/employees")
                ? "bg-primary hover:bg-primary-hover text-black"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            } transition-all duration-200 font-medium`}
          >
            {t("pages.employees")}
          </Button>
          <Button
            onClick={() => navigate("/commission")}
            className={`w-full justify-start ${
              isActive("/commission")
                ? "bg-primary hover:bg-primary-hover text-black"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            } transition-all duration-200 font-medium`}
          >
            {t("pages.propertyManagement")}
          </Button>
        </nav>

        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 font-medium"
        >
          {t("buttons.logout")}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
