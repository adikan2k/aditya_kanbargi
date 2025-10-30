# Portfolio Website with Appointment Booking

## Overview

This is a professional portfolio website for Aditya Kanbargi, a Data Scientist and ML Engineer. The application showcases professional experience, projects, technical skills, and provides contact functionality. Built as a single-page application with modern web technologies, it features a clean, professional design inspired by portfolio leaders like Dribbble and Behance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & UI Library**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (single-page application pattern)
- **shadcn/ui** component library based on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens

**Design System**
- Custom Tailwind configuration with extended color palette using CSS variables for theming
- Design guidelines emphasize professional portfolio aesthetics with specific typography hierarchy (Inter for headings/body, Space Mono for accent)
- Responsive breakpoint system with mobile-first approach
- Support for light/dark theme toggling with localStorage persistence

**State Management**
- **TanStack Query (React Query)** for server state management and data fetching
- Local React state (useState, useEffect) for UI state like theme, mobile menu, and form interactions
- No global state management library needed due to simple application structure

**Key Components**
- Modular page sections: Hero, About, Experience, Projects, TechStack, Contact, Footer
- Reusable UI components from shadcn/ui: Button, Card, Badge, Input, Textarea, Form components
- Custom animations: NetworkBackground and NeuralNetworkAnimation for visual engagement
- Responsive Navigation with scroll tracking and mobile menu

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running on Node.js
- Development and production modes with environment-based configuration
- Middleware stack: JSON parsing, URL encoding, request logging

**API Design**
- RESTful endpoint: `POST /api/contact` for contact form submissions
- Error handling with appropriate HTTP status codes
- Request/response logging for debugging

**Email Integration**
- **Resend** API for transactional email delivery
- Dynamic credential fetching from Replit Connectors API
- Email sent to `adityakan2000@gmail.com` with reply-to field set to submitter's email

**Development Server**
- Vite integration in development mode for HMR
- Static file serving in production from dist/public
- Custom error overlay for development debugging

### Data Storage Solutions

**Database Schema (Drizzle ORM)**
- **PostgreSQL** database with Drizzle ORM for type-safe queries
- Schema definitions in `shared/schema.ts` with Zod validation

**Tables:**
1. `users` - User authentication (id, username, password)
2. `appointments` - Appointment bookings (id, name, email, phone, date, time, duration, purpose, notes, createdAt)

**Note:** Current implementation uses in-memory storage (`MemStorage` class) for users. The appointment booking UI exists but isn't connected to the database backend yet - this is a placeholder for future implementation.

**Database Configuration**
- Drizzle Kit for migrations and schema management
- Connection via `DATABASE_URL` environment variable (Neon serverless PostgreSQL driver)

### Authentication and Authorization

**Current State:** No active authentication system is implemented. The schema includes a users table with username/password fields, and there's a storage interface for user CRUD operations, but no login/signup endpoints or session management exist in the routes.

**Placeholder Architecture:**
- User schema with bcrypt-ready password field structure
- Storage abstraction layer (IStorage interface) for future database integration
- Sessions could be implemented via `connect-pg-simple` (already in dependencies)

### External Dependencies

**Third-Party Services**
- **Resend** - Transactional email service for contact form submissions
  - Credentials fetched dynamically from Replit Connectors API
  - Supports both repl identity and web deployment renewal tokens

**Database**
- **Neon Database** - Serverless PostgreSQL (via `@neondatabase/serverless`)
- Connection pooling and edge-ready deployment

**Email Service Integration**
- Contact form sends structured HTML emails with sender details
- Reply-to header enables direct email responses
- Error handling for email delivery failures

**UI Component Libraries**
- **Radix UI** - Headless component primitives for accessibility
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets (Simple Icons for tech logos)
- **embla-carousel-react** - Carousel component (listed in dependencies)

**Development Tools**
- **Replit Dev Tools** - Cartographer plugin and dev banner (Replit-specific)
- **Runtime Error Overlay** - Development error modal

**Build & Deployment**
- Vite for frontend bundling
- esbuild for backend bundling (ESM format)
- PostCSS with Tailwind and Autoprefixer

**Asset Management**
- Static assets in `attached_assets` directory
- Profile images and project screenshots
- Custom alias `@assets` for importing assets in components