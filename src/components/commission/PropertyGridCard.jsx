import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PropertyForm from "./PropertyForm";
import Amount from "@/components/common/Amount";
import { formatAddress } from "@/utils/commissionHelpers";
import { useTranslation } from "react-i18next";

const PropertyGridCard = ({
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
      <CardHeader className="bg-gradient-to-r from-primary to-primary-dark text-black rounded-t-lg">
        <CardTitle className="text-lg font-semibold">
          Property {property.id || propertyId}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
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

        {isEditing ? (
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
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Employee
              </Label>
              <p className="text-sm text-gray-600">
                {data.employeeId
                  ? employees.find((e) => (e._id || e.id) === data.employeeId)
                      ?.name || "Unknown"
                  : "Not assigned"}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                {t("commission.commission")}
              </Label>
              {data.commission !== undefined &&
              data.commission !== null &&
              data.commission !== "" ? (
                <p className="text-sm text-gray-600">
                  {data.usePercentage ? (
                    `${data.commission}%`
                  ) : (
                    <Amount amount={data.commission} />
                  )}
                </p>
              ) : (
                <p className="text-sm text-red-600">
                  {t("commission.notAssigned")}
                </p>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => onEdit(propertyId)}
              className="w-full"
            >
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyGridCard;
