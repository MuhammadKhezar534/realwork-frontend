# Theme Guide

## Overview

This application uses a centralized theme system based on the primary color `#bed730` (lime green), along with black and white as complementary colors.

## Theme Files

### 1. `src/styles/theme.js`

The main theme configuration file containing all color variables:

```javascript
import { theme } from "@/styles/theme";

// Access colors
theme.primary; // #bed730
theme.primaryHover; // #a8c128
theme.white; // #ffffff
theme.black; // #000000
```

### 2. `src/index.css`

Contains CSS custom properties (CSS variables) for both the theme and ShadCN UI:

```css
/* Theme Colors */
--theme-primary: #bed730
--theme-bg-dark: #0a0f0a
--theme-bg-light: #ffffff
/* ... and more */
```

### 3. `tailwind.config.js`

Extends Tailwind CSS with custom theme colors:

```javascript
// Use in JSX
className = "bg-primary";
className = "text-primary-dark";
className = "border-theme-borderDark";
```

## Color Palette

### Primary Colors

- **Primary**: `#bed730` - Main brand color (lime green)
- **Primary Hover**: `#a8c128` - Darker shade for hover states
- **Primary Light**: `#d4e668` - Lighter shade for accents
- **Primary Dark**: `#9cb520` - Darkest shade for contrast

### Background Colors (Dark Theme)

- **bgDark**: `#0a0f0a` - Very dark green-tinted black
- **bgDarkSecondary**: `#141914` - Secondary dark background
- **bgSurface**: `#1a1f1a` - Surface dark with green tint
- **bgSurfaceLight**: `#242924` - Lighter surface

### Background Colors (Light Theme)

- **bgLight**: `#ffffff` - Pure white
- **bgLightSecondary**: `#f8faf5` - Very light green tint
- **bgLightTertiary**: `#f0f4ea` - Light background with green tint

### Text Colors

- **textPrimary**: `#000000` - Black text
- **textSecondary**: `#ffffff` - White text

### Border Colors

- **borderDark**: `#2a2f2a` - Dark borders
- **borderLight**: `#e5e7eb` - Light borders

## Usage Examples

### Using Tailwind Classes

```jsx
// Primary color
<button className="bg-primary hover:bg-primary-hover text-black">
  Click Me
</button>

// Dark theme surfaces
<div className="bg-theme-bgSurface border border-theme-borderDark">
  Content
</div>

// Light theme surfaces
<div className="bg-theme-bgLightSecondary">
  Content
</div>
```

### Using Theme Object in JS

```jsx
import { theme } from "@/styles/theme";

const styles = {
  backgroundColor: theme.primary,
  color: theme.black,
};
```

### Using CSS Variables

```css
.custom-element {
  background-color: var(--theme-primary);
  border-color: var(--theme-border-dark);
}
```

## Component Guidelines

### Buttons

- Primary buttons: `bg-primary hover:bg-primary-hover text-black`
- Outline buttons: Use default variant with theme colors
- Destructive buttons: `bg-red-600 hover:bg-red-700`

### Cards

- Dark theme: `bg-theme-bgSurface border-theme-borderDark`
- Light theme: `bg-white border-theme-borderLight`

### Text Headings

- Gradient text: `bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent`

### Sidebar

- Background: `bg-theme-bgSurface`
- Active item: `bg-primary text-black`
- Inactive item: `bg-theme-bgSurfaceLight text-white`

## Page Structure

### Dark Pages (e.g., Home Dashboard)

```jsx
<div className="min-h-screen bg-gradient-to-br from-theme-bgDark via-theme-bgDarkSecondary to-theme-bgDark">
  {/* Content */}
</div>
```

### Light Pages (e.g., Employees, Commission)

```jsx
<div className="min-h-screen bg-gradient-to-br from-theme-bgLightSecondary via-theme-bgLightTertiary to-white">
  {/* Content */}
</div>
```

## Sidebar Position

The sidebar is positioned on the **left side** of the screen:

- Toggle button: `fixed top-6 left-6`
- Sidebar container: `fixed top-0 left-0`
- Translation: `-translate-x-full` (hidden), `translate-x-0` (visible)
- Page padding: `pl-20` (to accommodate sidebar button)

## Customization

To change the theme colors:

1. Update `src/styles/theme.js`
2. Update CSS variables in `src/index.css`
3. Update Tailwind config in `tailwind.config.js`
4. The changes will automatically apply across all pages

## Best Practices

1. **Use theme colors consistently** across all pages
2. **Avoid hardcoded colors** - use theme variables instead
3. **Maintain contrast** for accessibility
4. **Test both light and dark theme pages** to ensure consistency
5. **Use semantic color names** (e.g., `bg-primary` instead of `bg-[#bed730]`)

## Color Accessibility

The primary color `#bed730` has been tested for:

- Sufficient contrast with black text
- Visibility on dark backgrounds
- Distinguishability for color-blind users

Always test new color combinations for WCAG 2.1 AA compliance.
