# Realwork Frontend

A modern React dashboard application built with Vite, React Router DOM, Zustand, Axios, Shadcn UI, and Recharts.

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Shadcn UI** - UI component library (configured and ready to use)
- **Recharts** - Chart library
- **Tailwind CSS** - Styling framework

## Getting Started

### Installation

All dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000/api
```

## Project Structure

```
src/
  ├── components/     # React components
  │   └── ExampleChart.jsx  # Example Recharts component
  ├── pages/         # Page components
  │   └── Home.jsx   # Home page with examples
  ├── lib/           # Utility functions and configurations
  │   ├── axios.js   # Axios instance configured
  │   └── utils.js   # Utility functions (cn helper for Tailwind)
  ├── store/         # Zustand stores
  │   └── useStore.js # Example Zustand store
  └── App.jsx        # Main app component with routing
```

## Features

### ✅ React Router DOM

- Configured with BrowserRouter
- Basic routing setup in `App.jsx`

### ✅ Zustand

- Example store in `src/store/useStore.js`
- Used in Home page for state management demo

### ✅ Axios

- Pre-configured instance in `src/lib/axios.js`
- Base URL can be set via `VITE_API_URL` environment variable

### ✅ Shadcn UI

- Fully configured with `components.json`
- Tailwind CSS setup with CSS variables
- Ready to add components using: `npx shadcn-ui@latest add [component-name]`

### ✅ Recharts

- Example chart component in `src/components/ExampleChart.jsx`
- Integrated in Home page

## Adding Shadcn UI Components

To add a new Shadcn UI component, use:

```bash
npx shadcn-ui@latest add [component-name]
```

Example:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

Components will be added to `src/components/ui/`

## Path Aliases

The project uses `@/` as an alias for the `src/` directory. Configured in `vite.config.js`.

Example:

```jsx
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
```
