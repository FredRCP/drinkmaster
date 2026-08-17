# BarIQ Setup Guide

Complete step-by-step guide to get BarIQ running locally.

## Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Version 10 or higher
- **Git**: For version control
- **Supabase Account**: Free tier is sufficient
- **Code Editor**: VS Code recommended

## Installation Steps

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd barilq
```

### 2. Install Dependencies

```bash
npm install
```

This will install all packages from `package.json`:
- Next.js, React, TypeScript
- Tailwind CSS, shadcn/ui
- Supabase, Zustand, React Query
- Serwist for PWA

### 3. Setup Supabase Project

#### Option A: Create New Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: `barilq` (or your preference)
   - **Database Password**: Create strong password
   - **Region**: Choose closest to you
5. Wait for project to initialize (~2 min)

#### Option B: Use Existing HomeHub Project

If you already have a Supabase project for HomeHub:
1. Go to your existing project
2. Create new schema: `barilq`
3. You'll share Supabase credentials with other apps

### 4. Get Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Key**: `eyJhbGc...` (public key)
   - **Service Role Key**: `eyJhbGc...` (secret key)

### 5. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env.local
```

Edit `.env.local`:

```env
# From Supabase API settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Keep these as defaults
NEXT_PUBLIC_APP_NAME=BarIQ
NEXT_PUBLIC_APP_VERSION=0.1.0
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_GAMIFICATION=false
NEXT_PUBLIC_ENABLE_AI_FEATURES=false
```

**⚠️ Important**: Never commit `.env.local` to git!

### 6. Setup Supabase Storage

If using existing HomeHub project:

1. Go to **Storage** in Supabase dashboard
2. Create buckets (if not exist):
   - `barilq_drinks` - for cocktail images
   - `barilq_ingredients` - for ingredient images

For new projects, wait for Sprint 2+ to create storage.

### 7. Start Development Server

```bash
npm run dev
```

Output should show:
```
> barilq@0.1.0 dev
> next dev

▲ Next.js 16.0.0
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 1.2s
```

### 8. Verify Installation

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see:
   - 🍸 emoji
   - "BarIQ" title
   - "Sprint 1 ✓" message
   - Dark theme with gold accents

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Fix:**
1. Check `.env.local` exists
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is set
3. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
4. Restart dev server: `npm run dev`

### Error: "Cannot find module '@/types'"

**Fix:**
1. TypeScript paths might not be recognized
2. Restart VS Code or your IDE
3. Rebuild: `npm run build`

### Error: "Port 3000 already in use"

**Fix:**
```bash
# Use different port
npm run dev -- -p 3001
```

### Tailwind styles not showing (everything looks gray)

**Fix:**
1. Clear Next.js cache: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## Project Structure Verification

After installation, verify you have:

```
barilq/
├── src/
│   ├── app/
│   │   ├── layout.tsx ✓
│   │   ├── page.tsx ✓
│   │   └── globals.css ✓
│   ├── components/
│   │   └── providers.tsx ✓
│   ├── features/ ✓
│   ├── hooks/ ✓
│   ├── lib/ ✓
│   ├── services/ ✓
│   ├── stores/ ✓
│   ├── types/ ✓
│   └── utils/ ✓
├── public/ ✓
├── package.json ✓
├── tsconfig.json ✓
├── tailwind.config.ts ✓
├── next.config.ts ✓
└── .env.local ✓ (not in git)
```

## Next Steps

Now that Sprint 1 is complete:

### Sprint 2 (Ingredient Selection)
- Build the initial screen
- Implement ingredient checkboxes
- Add search functionality
- Add "Discover Drinks" button

### Development Tips

1. **TypeScript**: Always define types for your data
2. **Components**: Keep them small and single-purpose
3. **Features**: Each feature is self-contained
4. **Naming**: Use descriptive names for files and functions
5. **Formatting**: Run `npm run format` regularly

### Useful Commands

```bash
# Type checking (no build)
npm run type-check

# Code linting
npm run lint

# Format code
npm run format

# Build production bundle
npm run build

# Start from production build
npm start

# Database operations
npm run db:push    # Push schema changes
npm run db:pull    # Pull latest schema
```

## VS Code Extensions (Recommended)

Install these for better development experience:

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **TypeScript Vue Plugin**
- **Thunder Client** or **REST Client** (for API testing)
- **Supabase** (official extension)

## Git Setup

```bash
# Initialize git (if not done)
git init

# Add remote
git remote add origin <your-repo-url>

# Create initial commit
git add .
git commit -m "Sprint 1: Project foundation and architecture"

# Push to GitHub
git branch -M main
git push -u origin main
```

## Deployment Preparation

Before deploying to Vercel, ensure:

1. ✅ All environment variables set in Vercel dashboard
2. ✅ Supabase RLS policies configured
3. ✅ Storage buckets created
4. ✅ Database schema pushed to Supabase
5. ✅ `npm run build` succeeds locally
6. ✅ `npm run type-check` passes
7. ✅ `npm run lint` passes

## Local Development Checklist

- [ ] Node.js 20+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` configured
- [ ] Supabase project created
- [ ] Dev server running (`npm run dev`)
- [ ] Page loads at localhost:3000
- [ ] Dark theme visible
- [ ] No TypeScript errors
- [ ] Tailwind styles working

## Getting Help

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review error messages in console
3. Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
4. Check Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
5. Check Tailwind documentation: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Summary

You now have:

✅ Project structure (Sprint 1 complete)
✅ All dependencies installed
✅ Supabase connected
✅ Development environment ready
✅ Dark theme + design tokens
✅ TypeScript configured
✅ PWA foundation

**You're ready to start Sprint 2!** 🚀
