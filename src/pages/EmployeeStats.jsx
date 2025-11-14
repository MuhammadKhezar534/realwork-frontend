import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/common/Loader";
import Amount from "@/components/common/Amount";

const API_BASE_URL = "http://localhost:3000";

function EmployeeStats() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/employee-properties?employeeId=${employeeId}`
        );
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          setEmployeeData(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching employee stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployeeStats();
    }
  }, [employeeId]);

  if (loading) {
    return (
      <>
        <Loader />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-muted-foreground">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!employeeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Employee not found</p>
              <Button onClick={() => navigate("/")} className="mt-4">
                Back to Home
              </Button>
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
            Employee Statistics: {employeeData.employee?.name || "Unknown"}
          </h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-indigo-600">
                {employeeData.propertyCount || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600">
                <Amount amount={employeeData.totalRevenue || 0} />
              </p>
            </CardContent>
          </Card>
        </div>

        {employeeData.properties && employeeData.properties.length > 0 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Properties List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeData.properties.map((property, index) => (
                  <div
                    key={property._id || property.id || index}
                    className="border-b border-gray-200 pb-4 last:border-0"
                  >
                    <p className="font-semibold">
                      Property ID: {property.id || property._id}
                    </p>
                    {property.adres && (
                      <p className="text-sm text-gray-600">
                        {[
                          property.adres.straat,
                          property.adres.huisnummer?.hoofdnummer,
                          property.adres.postcode,
                          property.adres.plaats,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default EmployeeStats;
