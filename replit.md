# JMLAstro Platform

## Overview

JMLAstro is a modern full-stack astrology consultation platform built with React, Express.js, and PostgreSQL. The platform provides users with horoscope readings, astrology calculators, astrologer directory and booking system, and educational blog content. It features a celestial-themed UI with dark mode design, user authentication via Replit Auth, and real-time consultation booking capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for fast development and build optimization
- **Styling**: TailwindCSS with a custom cosmic/celestial theme using CSS variables for consistent theming
- **Component Library**: Shadcn/UI components built on Radix UI primitives for accessible, customizable components
- **State Management**: React Query (TanStack Query) for server state management and API data fetching with built-in caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation resolvers for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Authentication**: Replit Auth integration with OpenID Connect (OIDC) for secure user authentication
- **Session Management**: Express sessions with PostgreSQL store for persistent user sessions
- **API Design**: RESTful endpoints with consistent error handling and request/response logging

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Core Tables**: 
  - Users (authentication and profile data)
  - Astrologers (profiles, specializations, pricing)
  - Consultations (booking records and session details)
  - Reviews (astrologer ratings and feedback)
  - Blog posts (content management)
  - Horoscopes (daily/weekly/monthly readings)
  - Sessions (authentication session storage)

### Key Features Implementation
- **Horoscope System**: Dynamic horoscope content delivery based on zodiac signs and time periods
- **Calculator Tools**: Interactive astrology calculators (love match, numerology, birth charts)
- **Booking System**: Real-time consultation scheduling with multiple communication types (chat, voice, video)
- **Content Management**: Blog system for astrology articles and educational content
- **Search & Filtering**: Advanced astrologer search with specialization and language filters

### UI/UX Design Patterns
- **Theme**: Cosmic/celestial design with deep blues, gold accents, and gradient elements
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Component Composition**: Modular component architecture with reusable UI primitives
- **Loading States**: Skeleton loading patterns for improved perceived performance
- **Error Handling**: User-friendly error messages with toast notifications

### Development Workflow
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Code Organization**: Monorepo structure with shared schema definitions between client and server
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development Tools**: Hot module replacement in development, runtime error overlays

## External Dependencies

### Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL database hosting with connection pooling
- **Drizzle ORM**: TypeScript-first ORM for database operations and migrations

### Authentication & Session Management
- **Replit Auth**: OAuth2/OIDC authentication provider integration
- **OpenID Client**: Standard OpenID Connect client implementation
- **Passport.js**: Authentication middleware with OpenID Connect strategy
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI Framework & Components
- **Radix UI**: Unstyled, accessible component primitives for complex UI elements
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Modern icon library with React components
- **React Hook Form**: Performance-focused forms with minimal re-renders

### Development & Build Tools
- **Vite**: Fast build tool with hot module replacement and optimized production builds
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **PostCSS**: CSS processing for TailwindCSS compilation

### Data Fetching & State Management
- **TanStack Query**: Server state management with intelligent caching, background updates, and error handling
- **Zod**: Runtime type validation and schema definition for API contracts

### Additional Libraries
- **date-fns**: Modern date utility library for horoscope date calculations
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx & tailwind-merge**: Conditional CSS class composition utilities