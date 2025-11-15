import React from "react";
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
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Employee
          </label>
          <Select
            value={selectedEmployee}
            onChange={(e) => onEmployeeChange(e.target.value)}
            className="w-full bg-slate-700/50 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            chevronClassName="text-slate-400"
          >
            <option value="">All Employees</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            City
          </label>
          <Select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full bg-slate-700/50 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            chevronClassName="text-slate-400"
          >
            <option value="">All Cities</option>
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
