export function compareChange(oldValue, newValue) {
  if (oldValue === 0) return "Cannot compare to zero";

  const diff = newValue - oldValue;
  const percent = (Math.abs(diff) / oldValue) * 100;

  if (diff > 0) {
    return `${percent.toFixed(2)}% Growth`;
  } else if (diff < 0) {
    return `${percent.toFixed(2)}% Decline`;
  } else {
    return "No change";
  }
}

export function mergeRevenueData({ plannedRevenueData, verifiedRevenueData }) {
  return {
    plannedRevenueData: [...(plannedRevenueData?.data?.months || [])],
    verifiedRevenueData: [
      verifiedRevenueData?.data?.currentMonth || {},
      ...(verifiedRevenueData?.data?.previousMonths || []),
    ],
  };
}

export function processRevenueDataForChart(verifiedArray, plannedArray) {
  const currentYear = new Date().getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Validate inputs
  if (!Array.isArray(verifiedArray)) verifiedArray = [];
  if (!Array.isArray(plannedArray)) plannedArray = [];

  // Create a map for quick lookup
  const verifiedMap = new Map();
  const plannedMap = new Map();

  // Process verified revenue data
  verifiedArray.forEach((item) => {
    if (
      item &&
      typeof item === "object" &&
      item.monthname &&
      typeof item.monthname === "string" &&
      item.year === currentYear &&
      typeof item.revenue === "number" &&
      !isNaN(item.revenue)
    ) {
      const monthIndex = monthNames.indexOf(item.monthname);
      if (monthIndex !== -1) {
        verifiedMap.set(monthIndex, {
          monthname: item.monthname,
          year: item.year,
          revenue: item.revenue || 0,
          data: Array.isArray(item.data) ? item.data : [],
        });
      }
    }
  });

  // Process planned revenue data
  plannedArray.forEach((item) => {
    if (
      item &&
      typeof item === "object" &&
      item.monthname &&
      typeof item.monthname === "string" &&
      item.year === currentYear &&
      typeof item.revenue === "number" &&
      !isNaN(item.revenue)
    ) {
      const monthIndex = monthNames.indexOf(item.monthname);
      if (monthIndex !== -1) {
        plannedMap.set(monthIndex, {
          monthname: item.monthname,
          year: item.year,
          revenue: item.revenue || 0,
          data: Array.isArray(item.data) ? item.data : [],
        });
      }
    }
  });

  // Create array for all 12 months
  const chartData = monthNames.map((monthName, index) => {
    const verified = verifiedMap.get(index);
    const planned = plannedMap.get(index);

    return {
      name: monthName.substring(0, 3), // Short month name for display
      fullMonthName: monthName,
      year: currentYear,
      verified: verified ? verified.revenue : 0,
      planned: planned ? planned.revenue : 0,
      verifiedData: verified ? verified.data : null,
      plannedData: planned ? planned.data : null,
    };
  });

  return chartData;
}
