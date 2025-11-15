import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@/components/ui/select";

const formatCityName = (city) => {
  if (!city) return "";
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};

const FilterSection = ({
  employees,
  cities,
  selectedEmployee,
  selectedCity,
  onEmployeeChange,
  onCityChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("filters.employee")}
          </label>
          <Select
            value={selectedEmployee}
            onChange={(e) => onEmployeeChange(e.target.value)}
            className="w-full bg-gray-50 border-gray-300 text-gray-900 focus:border-primary focus:ring-primary/20"
            chevronClassName="text-gray-600"
          >
            <option value="">{t("filters.allEmployees")}</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("filters.city")}
          </label>
          <Select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full bg-gray-50 border-gray-300 text-gray-900 focus:border-primary focus:ring-primary/20"
            chevronClassName="text-gray-600"
          >
            <option value="">{t("filters.allCities")}</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {formatCityName(city)}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
