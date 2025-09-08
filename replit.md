# Overview

This is a React-based web application that creates reusable ProductCard components for cross-framework integration, specifically designed for Angular applications. The project features a modern React frontend with shadcn/ui components, Express.js backend, and PostgreSQL database integration through Drizzle ORM. The application can build standalone web components that can be embedded in other frameworks.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the main application
- **Vite** as the build tool and development server
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with CSS custom properties for theming
- **TanStack Query** for server state management and API data fetching
- **Wouter** as a lightweight client-side router
- **Web Components**: Custom ProductCard component that can be built as a standalone web component for cross-framework integration

## Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with `/api` prefix for all endpoints
- **Memory-based storage** with interface abstraction for easy database swapping
- **Middleware** for request logging and error handling
- **Development/Production** environment handling with Vite integration in dev mode

## Database Design
- **PostgreSQL** as the primary database
- **Drizzle ORM** for type-safe database operations and migrations
- **Schema Definition**: Users and Products tables with proper relationships
- **Zod Integration** for runtime validation of database inputs/outputs

## Build System
- **Dual Build Targets**: Main application and standalone web component
- **Development Mode**: Hot reload with Vite dev server
- **Production Mode**: Optimized builds with static asset serving
- **Standalone Builds**: Web component compilation for external framework integration

## Component Architecture
- **Atomic Design**: Reusable UI components in `/components/ui`
- **Page Components**: Route-specific components in `/pages`
- **Custom Hooks**: Shared logic like mobile detection and toast notifications
- **TypeScript Interfaces**: Shared types between client and server in `/shared`

## State Management
- **Server State**: TanStack Query for API data caching and synchronization
- **Client State**: React hooks for local component state
- **Form State**: React Hook Form with Zod validation schemas

# External Dependencies

## Development & Build Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: Fast JavaScript bundler for server builds
- **TypeScript**: Type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with autoprefixer

## UI & Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management
- **Embla Carousel**: Carousel/slider functionality

## Database & ORM
- **Neon Database**: Serverless PostgreSQL provider
- **Drizzle ORM**: TypeScript ORM with SQL-like syntax
- **Drizzle Kit**: Database migration and introspection tools

## API & State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state and validation management
- **Zod**: Runtime type validation and schema definition

## Routing & Navigation
- **Wouter**: Minimalist client-side routing

## Development Experience
- **Replit Integration**: Development environment optimizations
- **Runtime Error Overlay**: Enhanced debugging in development
- **Cartographer**: Replit-specific development tooling