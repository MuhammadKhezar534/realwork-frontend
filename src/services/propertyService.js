import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const fetchSaveProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-save-properties`);

    if (response.data && response.data.message) {
      return {
        success: true,
        data: response.data,
      };
    }

    if (response.data && response.data.fetchedCount === 0) {
      return {
        success: false,
        error:
          "No properties were fetched. This might indicate an authorization issue or API error.",
        status: 200,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        success: false,
        error:
          "Unauthorized: Your authorization token has expired. Please contact administrator.",
        status: 401,
      };
    }

    if (error.response?.status >= 500) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          "Server error: Failed to fetch properties from external API. Please try again later.",
        status: error.response?.status || 500,
      };
    }

    if (!error.response) {
      return {
        success: false,
        error:
          "Network error: Unable to connect to the server. Please check your connection.",
        status: 0,
      };
    }

    const errorMessage =
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch and save properties. Please try again.";

    return {
      success: false,
      error: errorMessage,
      status: error.response?.status || 500,
    };
  }
};
