import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PropertyForm from "./PropertyForm";
import Amount from "@/components/common/Amount";
import { formatAddress } from "@/utils/commissionHelpers";
import { useTranslation } from "react-i18next";

const PropertyListCard = ({
  property,
  propertyId,
  isEditing,
  data,
  employees,
  onPropertyDataChange,
  onCheckboxChange,
  onSave,
  onCancel,
  onEdit,
  savingPropertyId,
  saveButtonRef,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary/30">
      {isEditing ? (
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              {t("commission.propertyId")}
            </Label>
            <p className="text-sm text-gray-600">{property.id || propertyId}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              {t("commission.address")}
            </Label>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              {formatAddress(property.adres)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                {t("commission.status")}
              </Label>
              <p className="text-sm text-gray-600">
                {property.financieel?.overdracht?.status || "-"}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                {t("commission.transferDate")}
              </Label>
              <p className="text-sm text-gray-600">
                {property.financieel?.overdracht?.transportdatum ||
                  t("commission.noDate")}
              </p>
            </div>
          </div>
          <PropertyForm
            property={property}
            propertyId={propertyId}
            data={data}
            employees={employees}
            onPropertyDataChange={onPropertyDataChange}
            onCheckboxChange={onCheckboxChange}
            onSave={onSave}
            onCancel={onCancel}
            savingPropertyId={savingPropertyId}
            saveButtonRef={saveButtonRef}
          />
        </CardContent>
      ) : (
        <div className="flex items-center justify-between p-6">
          <div className="flex-1 grid grid-cols-5 gap-4">
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase">
                {t("commission.propertyId")}
              </Label>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {property.id || propertyId}
              </p>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase">
                {t("commission.address")}
              </Label>
              <p className="text-sm text-gray-700 mt-1">
                {formatAddress(property.adres)}
              </p>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase">
                {t("commission.status")}
              </Label>
              <p className="text-sm text-gray-700 mt-1">
                {property.financieel?.overdracht?.status || "-"}
              </p>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase">
                {t("commission.transferDate")}
              </Label>
              <p className="text-sm text-gray-700 mt-1">
                {property.financieel?.overdracht?.transportdatum ||
                  t("commission.noDate")}
              </p>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase">
                {t("commission.assignedEmployee")}
              </Label>
              <p className="text-sm text-gray-700 mt-1">
                {data.employeeId
                  ? employees.find((e) => (e._id || e.id) === data.employeeId)
                      ?.name || "Unknown"
                  : t("commission.notAssigned")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Label className="text-xs font-semibold text-gray-500 uppercase">
                {t("commission.commission")}
              </Label>
              {data.commission !== undefined &&
              data.commission !== null &&
              data.commission !== "" ? (
                <p className="text-sm text-gray-700 mt-1">
                  {data.usePercentage ? (
                    `${data.commission}%`
                  ) : (
                    <Amount amount={data.commission} />
                  )}
                </p>
              ) : (
                <p className="text-sm text-red-600 mt-1">
                  {t("commission.notAssigned")}
                </p>
              )}
            </div>
            <Button variant="outline" onClick={() => onEdit(propertyId)}>
              {t("buttons.edit")}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PropertyListCard;
