import { useState } from "react";
import { fetchSaveProperties } from "@/services/propertyService";
import { useStore } from "@/store/useStore";

export const useFetchSaveProperties = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useStore();
  const [isFetchUpdatedData, setIsFetchUpdatedData] = useState(false);

  const fetchAndSave = async () => {
    setLoading(true);
    try {
      const result = await fetchSaveProperties();

      if (result.success) {
        setIsFetchUpdatedData(true);
        showNotification(
          "success",
          `Properties fetched and saved successfully! Inserted: ${result.data.insertedCount}, Updated: ${result.data.updatedCount}`
        );
      } else {
        showNotification("error", result.error);
      }

      return result;
    } catch (error) {
      console.error("Error fetching and saving properties:", error);
      showNotification(
        "error",
        "An unexpected error occurred. Please try again."
      );
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  return { fetchAndSave, loading, isFetchUpdatedData };
};
