# BlogHub

## Overview

BlogHub is a modern blog platform built with Next.js 15 for sharing stories, ideas, and insights. It features a public-facing blog catalog, an admin dashboard for content management, and a membership system. The platform supports posts, authors, comments, and user membership with a clean, responsive UI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: Next.js 15 with App Router and React Server Components
- **Styling**: Tailwind CSS v4 with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Icons**: Lucide React
- **Data Fetching**: SWR for client-side data fetching with automatic revalidation
- **Fonts**: Geist and Geist Mono from Google Fonts

### Backend Architecture

- **API Routes**: Next.js API routes in the App Router (`app/api/`)
- **Database**: MongoDB with native MongoDB driver (not Mongoose)
- **Authentication**: JWT-based session management using jose library
- **Session Storage**: HTTP-only cookies for secure token storage

### Key Design Patterns

1. **Server/Client Component Split**: Server components for layouts and authentication checks, client components for interactive features
2. **Protected Routes**: Dashboard routes protected via server-side session verification in layout
3. **CRUD API Pattern**: RESTful API routes for posts, authors, comments, and membership
4. **Connection Pooling**: Cached MongoDB client connection for performance

### Authentication Flow

- Simple admin credentials (username/password) stored in code
- JWT tokens with 24-hour expiration
- Session verification on protected dashboard routes
- Login redirects to dashboard, logout clears session cookie

### Data Models

- **Posts**: Blog articles with title, slug, content, excerpt, category, tags, status (draft/published/archived)
- **Authors**: Contributors with name, email, bio, role, status
- **Comments**: User comments linked to posts with moderation status (pending/approved/rejected)
- **Members**: Membership applications with contact info and membership type

## External Dependencies

### Database
- **MongoDB**: Primary data store (requires MONGODB_URI environment variable)
- Database name: `blog_hub`
- Collections: posts, authors, comments, members

### Third-Party Services
- **Vercel Analytics**: Usage tracking and analytics (@vercel/analytics)

### Environment Variables Required
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing (defaults to hardcoded value if not set)

### Key NPM Dependencies
- `next`: 15.x (App Router)
- `mongodb`: Native MongoDB driver
- `jose`: JWT handling
- `swr`: Client-side data fetching
- `date-fns`: Date formatting
- `@radix-ui/*`: UI primitives
- `tailwindcss`: v4 with tw-animate-css