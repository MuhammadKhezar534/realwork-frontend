import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/store/useStore";

function ViewProperties() {
  const navigate = useNavigate();
  const { properties, clearProperties } = useStore();

  const handleBack = () => {
    clearProperties();
    navigate("/");
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No properties found</p>
              <Button onClick={handleBack}>Back to Home</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Properties List
          </h1>
          <Button variant="outline" onClick={handleBack}>
            Back to Home
          </Button>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Total Properties: {properties.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.map((property, index) => (
                <div
                  key={property._id || property.id || index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gradient-to-r from-white to-slate-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          ID: {property.id || property._id || `N/A`}
                        </span>
                      </div>
                      {property.adres && (
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            Address:
                          </p>
                          <p className="text-base text-gray-900">
                            {[
                              property.adres.straat,
                              property.adres.huisnummer?.hoofdnummer,
                              property.adres.postcode,
                              property.adres.plaats,
                            ]
                              .filter(Boolean)
                              .join(", ") || "Address not available"}
                          </p>
                        </div>
                      )}
                      {!property.adres && (
                        <p className="text-sm text-gray-500 italic">
                          Address not available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ViewProperties;
