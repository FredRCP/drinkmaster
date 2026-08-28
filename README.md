# 🍸 DrinkMaster - Professional Cocktail Discovery PWA

A sophisticated, professional-grade Progressive Web App for discovering cocktails based on your available ingredients, built with modern web technologies and designed for elegance.

## ✨ Features

- **Ingredient-Based Discovery**: Find cocktails you can make with ingredients you have
- **Drink Score™**: Intelligent algorithm matching system (0-100%)
- **Dark Theme Design**: Elegant Apple-like interface with gold accents
- **PWA Ready**: Installable on any device, works offline
- **Real-time Sync**: Seamless synchronization across devices
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## 🏗️ Project Structure

```
barilq/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Shared components
│   ├── features/         # Feature modules (self-contained)
│   ├── hooks/            # Global custom hooks
│   ├── lib/              # Utilities and configurations
│   ├── services/         # API calls and data operations
│   ├── stores/           # Zustand state management
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions
├── public/               # Static assets
├── supabase/             # Supabase configuration
└── configuration files
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 + React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui |
| **Database** | Supabase (PostgreSQL) |
| **State Management** | Zustand |
| **Server State** | TanStack Query v5 |
| **Forms** | React Hook Form + Zod |
| **PWA** | Serwist |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Supabase account
- Vercel account (for deployment)

### Setup

1. **Clone and install**
   ```bash
   git clone <repository>
   cd barilq
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📋 Project Roadmap

### ✅ Sprint 1: Foundation
- [x] Project architecture
- [x] Environment setup
- [x] Tailwind configuration
- [x] Dark theme implementation
- [x] Design tokens
- [x] PWA configuration
- [x] Base layout and providers

### 📅 Sprint 2: Initial Screen
- [ ] Ingredient selection UI
- [ ] Search functionality
- [ ] Ingredient list display
- [ ] "Discover Drinks" button

### 📅 Sprint 3: Matching Algorithm
- [ ] Drink Score™ implementation
- [ ] Matching results display
- [ ] "Can make" vs "One ingredient away" categorization

### 📅 Sprint 4: Drink Details
- [ ] Drink detail page
- [ ] Ingredient list
- [ ] Instructions display
- [ ] Metadata (difficulty, time, ABV, etc)

### 📅 Sprint 5: Pantry Management
- [ ] Save selected ingredients
- [ ] Persistent storage
- [ ] Auto-save functionality

### 📅 Sprint 6: Favorites
- [ ] Add to favorites
- [ ] Favorites list
- [ ] Quick access

### 📅 Sprint 7: Catalog
- [ ] Full drinks catalog
- [ ] Advanced filtering
- [ ] Search functionality
- [ ] Category browsing

## 📂 Directory Guide

### `/src/app`
Next.js app directory with routes and layouts.

### `/src/components`
Shared, reusable components used across features. Examples:
- Buttons, inputs, cards
- Navigation
- Modals, notifications

### `/src/features`
Self-contained feature modules. Each feature has its own:
- Components (feature-specific)
- Hooks
- Services
- Types

**Features:**
- `auth/` - Authentication
- `drinks/` - Drink discovery
- `ingredients/` - Ingredient management
- `pantry/` - User's pantry
- `favorites/` - Favorite drinks
- `catalog/` - Complete catalog

### `/src/hooks`
Global, reusable custom hooks:
- `useIsMobile()` - Responsive design
- `useLocalStorage()` - Persistent state
- `useDebounce()` - Input debouncing
- `useAsync()` - Async operations

### `/src/lib`
Utility functions and configurations:
- `supabase.ts` - Supabase client
- `utils.ts` - Helper functions

### `/src/services`
API calls and external data operations:
- Authentication service
- Drinks service
- Ingredients service
- Pantry service

### `/src/stores`
Zustand stores for global state:
- Auth store
- Pantry store
- UI store

### `/src/types`
TypeScript type definitions organized by domain.

## 🎨 Design System

### Colors
- **Background**: `#0F0F10` (Dark base)
- **Cards**: `#1B1B1D` (Elevated)
- **Accent**: `#D4AF37` (Dourado fosco - matte gold)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#B8B8BA`

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (text)
- **Sizes**: xs (0.75rem) to 5xl (3rem)

### Components
- Buttons (primary, secondary, ghost)
- Input fields
- Cards
- Modals
- Notifications

## 🔒 Environment Variables

See `.env.example` for required variables.

```bash
NEXT_PUBLIC_SUPABASE_URL=         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Public anon key
SUPABASE_SERVICE_ROLE_KEY=        # Service role (server-only)
NEXT_PUBLIC_APP_NAME=             # App name
```

## 📦 Database Schema

See `supabase/` directory for migrations and schema documentation.

**Main tables:**
- `ingredients` - Available ingredients
- `drinks` - Cocktail recipes
- `drink_ingredients` - Mapping with quantities
- `users` - User profiles
- `pantry` - User's selected ingredients
- `favorites` - User's favorite drinks
- `categories` - Drink categories
- `glass_types` - Glassware
- `techniques` - Preparation techniques

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy

```bash
npm run build
npm start
```

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format

# Database operations
npm run db:push    # Push schema to Supabase
npm run db:pull    # Pull latest schema
```

## 📱 PWA Features

- **Offline Support**: Works without internet (cached content)
- **Installable**: Add to home screen on any device
- **Fast**: Optimized performance with lazy loading
- **Secure**: HTTPS-only, secure headers

## 🔐 Security

- Environment variables for sensitive data
- Row Level Security (RLS) on Supabase
- Secure authentication with Supabase Auth
- CSRF protection on forms
- Rate limiting on API calls

## 📊 Performance

- Code splitting
- Image optimization
- Lazy loading
- Caching strategies
- Optimistic updates

## 🤝 Contributing

This is a professional project. Please:
1. Follow the established code structure
2. Maintain TypeScript strict mode
3. Add types for all new code
4. Keep components small and focused
5. Write meaningful commit messages

## 📄 License

Private project

## 🙋 Support

For issues, questions, or suggestions, please contact the development team.

---

**Built with ❤️ by RCP Creative**

*Bring your ideas to life with professional-grade applications.*
