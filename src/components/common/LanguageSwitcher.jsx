import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 border border-gray-200 w-[110px] mt-12">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded-md transition-all duration-200 text-sm font-medium ${
          language === "en"
            ? "bg-primary text-black"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("nl")}
        className={`px-3 py-1 rounded-md transition-all duration-200 text-sm font-medium ${
          language === "nl"
            ? "bg-primary text-black"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
        }`}
      >
        NL
      </button>
    </div>
  );
};

export default LanguageSwitcher;
