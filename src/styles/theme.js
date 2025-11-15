export const theme = {
  // Primary brand color - Lime green
  primary: "#bed730",
  primaryHover: "#a8c128",
  primaryLight: "#d4e668",
  primaryDark: "#9cb520",

  // Neutral colors
  white: "#ffffff",
  black: "#000000",

  // Background colors - Dark theme with green tint
  bgDark: "#0a0f0a",
  bgDarkSecondary: "#141914",
  bgSurface: "#1a1f1a",
  bgSurfaceLight: "#242924",

  // Background colors - Light theme
  bgLight: "#ffffff",
  bgLightSecondary: "#f8faf5",
  bgLightTertiary: "#f0f4ea",

  // Text colors
  textPrimary: "#000000",
  textSecondary: "#ffffff",
  textMuted: "#666666",
  textMutedLight: "#999999",

  // Accent colors
  accentSuccess: "#bed730",
  accentDanger: "#dc2626",
  accentWarning: "#f59e0b",
  accentInfo: "#3b82f6",

  // Border colors
  borderDark: "#2a2f2a",
  borderLight: "#e5e7eb",

  // Shadow colors
  shadowLight: "rgba(0, 0, 0, 0.05)",
  shadowMedium: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.2)",
  shadowPrimary: "rgba(190, 215, 48, 0.2)",
};

// Tailwind-compatible color classes generator
export const getThemeClasses = () => ({
  // Background classes
  bgPrimary: "bg-[#bed730]",
  bgPrimaryHover: "hover:bg-[#a8c128]",
  bgDark: "bg-[#0a0f0a]",
  bgSurface: "bg-[#1a1f1a]",
  bgLight: "bg-white",

  // Text classes
  textPrimary: "text-[#bed730]",
  textWhite: "text-white",
  textBlack: "text-black",

  // Border classes
  borderPrimary: "border-[#bed730]",
  borderDark: "border-[#2a2f2a]",
});

export default theme;
