# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production (runs TypeScript check first)
- `yarn preview` - Preview production build locally
- `yarn lint` - Run Biome linter
- `yarn lint:fix` - Run Biome linter with auto-fix
- `yarn format` - Check formatting with Biome
- `yarn format:fix` - Format code with Biome
- `yarn check` - Run all Biome checks (lint + format)
- `yarn check:fix` - Run all Biome checks with auto-fix

## Architecture Overview

This is a React TypeScript admin panel built with Vite and TanStack Router.

### Key Technologies
- **React 19** with TypeScript
- **TanStack Router** for file-based routing with type safety
- **Zustand** for state management
- **Vite** for build tooling
- **Biome** for linting and formatting (ESLint has been removed)
- **Yarn** as package manager

### Routing Structure
The app uses TanStack Router with file-based routing:
- Routes are defined in `src/routes/` directory
- `__root.tsx` provides the root layout with TanStack Router DevTools
- Router setup happens in `main.tsx` with generated route tree from `routeTree.gen.ts`
- Type safety is enforced through router registration

### Code Standards
- Files must use kebab-case naming (enforced by Biome)
- Tab indentation for formatting
- Double quotes for JavaScript strings
- Automatic import organization enabled
- Use `type` instead of `interface` for TypeScript type definitions

### Project Structure
- `src/routes/` - Route definitions (thin route components that import from pages)
- `src/pages/` - Page components organized by feature with structured folder organization
- `src/assets/` - Static assets like images
- Route tree is auto-generated at `src/routeTree.gen.ts`

### Page Feature Structure
Each page feature folder should follow this structure:
```
src/pages/{feature-name}/
  index.ts          # Main export file - exports the primary page component
  ui/              # UI components specific to this feature
    {feature}-page.tsx    # Main page component
    {feature}-form.tsx    # Forms and UI elements
    components.tsx        # Smaller UI components
  model/           # State management and data logic
    store.ts            # Zustand store for this feature
    types.ts            # TypeScript types (using `type`, not `interface`)
    constants.ts        # Feature-specific constants
  helpers/         # Utility functions and helpers
    utils.ts            # Helper functions
    validators.ts       # Validation logic
    api.ts             # API calls specific to this feature
```

Example structure:
```
src/
  pages/
    login/
      index.ts                    # export { LoginPage } from './ui/login-page'
      ui/
        login-page.tsx           # Main login page component
        login-form.tsx           # Login form component
      model/
        store.ts                 # Login state (Zustand)
        types.ts                 # Login-related types
      helpers/
        validators.ts            # Login validation logic
        api.ts                  # Authentication API calls
    dashboard/
      index.ts                    # export { DashboardPage } from './ui/dashboard-page'
      ui/
        dashboard-page.tsx       # Main dashboard component
        dashboard-widgets.tsx    # Dashboard widgets
      model/
        store.ts                 # Dashboard state
        types.ts                 # Dashboard types
      helpers/
        utils.ts                # Dashboard utilities
  routes/
    login.tsx                    # import { LoginPage } from '../pages/login'
    dashboard.tsx               # import { DashboardPage } from '../pages/dashboard'
```

### File Organization Rules
- All files must use kebab-case naming (enforced by Biome)
- Each page feature should be organized in a structured folder under `src/pages/`
- Route files in `src/routes/` should import from page index files
- Always create the full folder structure and use index.ts for clean imports
- This structure provides clear separation of concerns and scalable organization