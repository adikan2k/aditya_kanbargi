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
- Scroll animations: IntersectionObserver-based fade-in/slide-up effects on all major sections
- Back to Top button with smooth scroll behavior
- Keyword highlighting throughout content (technical terms, quantitative metrics)

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

## Recent Enhancements (October 2025)

### Visual Improvements
1. **Enhanced Neural Network Animation** (About section)
   - Increased node count from 30 to 50 for fuller visual presence
   - Multi-colored nodes with glow effects (indigo, purple, pink)
   - Thicker connection lines with higher opacity (0.6)
   - Extended connection radius (180px) for more dynamic linking
   - Increased canvas opacity from 0.4 to 0.7 for better visibility
   - Faster node movement for more engaging animation

2. **Scroll Animations System**
   - Custom `useScrollAnimation` hook using IntersectionObserver API
   - Fade-in and slide-up animations triggered when sections enter viewport
   - Applied to all major sections: About, Experience, Projects, TechStack, Contact
   - Smooth transitions with 0.6s duration and ease-out timing
   - 50% threshold for optimal trigger timing

3. **Content Highlighting**
   - Keyword highlighting for technical terms throughout content
   - Full-phrase highlighting for quantitative outcomes in Experience section
   - Examples: "Extended early-warning prediction lead time by 6 hours"
   - Subtle bg-primary/10 background with rounded corners
   - Improved visual hierarchy and readability

### Functional Updates
1. **Download Resume Button**
   - Updated to link directly to Google Drive
   - URL: https://drive.google.com/file/d/1cEuFXF9V4iW0W52X6-GHWlH1ULWZ8eqo/view?usp=sharing
   - Opens in new tab with proper security attributes (target="_blank", rel="noopener noreferrer")

2. **Back to Top Button**
   - Sticky positioning at bottom-right corner
   - Smooth scroll behavior when clicked
   - Appears when user scrolls down

### User Experience
- Improved visual engagement through animations and transitions
- Better content scannability with strategic highlighting
- Enhanced mobile responsiveness across all sections
- Maintained light/dark mode compatibility for all new features

## Latest Updates (November 23, 2025)

### New Project Category Added
1. **Natural Language Processing**
   - Added new project filter category for NLP projects
   - Category tagline: "Advanced NLP systems for language understanding, generation, and semantic analysis."
   - Integrated into project filtering system for organized portfolio browsing

### New Project Added
1. **USDA Food Security & Forecasting Dashboard**
   - Added 12th project to the portfolio (displayed as most recent)
   - Category: Analytics and Forecasting
   - Tech stack: Power BI, Google BigQuery, SQL, ETL
   - Description: Live executive dashboard backed by automated BigQuery pipeline tracking USDA agricultural trends
   - Highlights: 95% reduction in manual data processing time, predictive inflation metrics for supply chain decisions
   - Includes professional project visualization with dashboard mockup

## Previous Updates (October 30, 2025)

### UI/UX Enhancements
1. **Resume Button Simplification**
   - Changed button text from "Download Resume" to "Resume" for cleaner interface
   - Maintains Google Drive link functionality

2. **Experience Section - Company Logos**
   - Added actual company logos next to each role
   - GW School of Nursing: Official GW logo with brand colors (navy blue and gold)
   - LTIMindtree: Official LTIMindtree logo with brand colors (blue)
   - Logos are displayed as small thumbnails (h-6) inline with company name
   - Maintains original brand colors for authenticity and professional appearance
   - Updated LTIMindtree role title to "Technical Business Analyst - ServiceNow"

3. **Projects Section - Dynamic Taglines**
   - Implemented dynamic tagline system that changes based on active category filter
   - Each category (All, Machine Learning, AI, Analytics, Deep Learning, Computer Vision) has unique descriptive tagline
   - Provides context-specific descriptions for filtered project views
   - Example: "AI" filter shows "Intelligent systems leveraging LLMs, agentic frameworks, and advanced AI architectures"

4. **Contact Section - Enhanced Layout**
   - Changed tagline from center-aligned to full-width left-aligned for better readability
   - Added "Current Status" card with colored indicators:
     - Green dot: Actively looking for opportunities
     - Blue dot: MS Data Science Student  
     - Purple dot: Eager to connect and collaborate
   - Reordered sidebar: Current Status → Contact Information → Connect

5. **About Section - Professional Certifications**
   - Added new horizontal certifications card below achievement stats
   - Three certifications displayed with company icons:
     - AWS Certified AI Practitioner (SiAmazon icon, orange)
     - Databricks Certified GenAI Accreditation (SiDatabricks icon, red)
     - AWS Certified ML Engineer - Associate (SiAmazon icon, orange)
   - Grid layout with responsive design (3 columns on medium+ screens)
   - Each certification shows icon, title, and specialization

6. **Project Cards - Hover Interaction Redesign**
   - Replaced blue overlay with semi-transparent dark overlay (bg-black/40)
   - Eye icon (Lucide React) appears centered on hover
   - Icon displayed in circular badge with backdrop blur effect
   - Removed "View Details" text for cleaner, icon-only interaction
   - Entire card is clickable and links to GitHub repository

### Technical Implementation
- All sections maintain responsive design with fluid scaling across screen sizes
- Mobile-first approach with breakpoints at md (768px) and lg (1024px)
- Dark mode compatibility maintained across all new components
- Icons sourced from Lucide React and react-icons/si for consistency
- Hover states use existing hover-elevate utility classes