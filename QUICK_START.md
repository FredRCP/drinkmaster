# BarIQ - Quick Start

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local

# 3. Add Supabase credentials to .env.local
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 4. Start dev server
npm run dev

# 5. Open http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Routes and layouts
├── components/       # Shared components
├── features/         # Self-contained features
│   ├── auth/
│   ├── drinks/
│   ├── ingredients/
│   ├── pantry/
│   ├── favorites/
│   └── catalog/
├── hooks/            # Global hooks
├── lib/              # Utilities
├── services/         # API calls
├── stores/           # Zustand stores
├── types/            # TypeScript types
└── utils/            # Helpers
```

## Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build production
npm run start        # Start production
npm run lint         # Check linting
npm run format       # Format code
npm run type-check   # TypeScript check
npm run db:push      # Push schema to Supabase
npm run db:pull      # Pull schema from Supabase
```

## Key Files to Know

- `tailwind.config.ts` - Design tokens (colors, typography)
- `tsconfig.json` - Path aliases (@/components, @/utils, etc)
- `.env.example` - Environment variables template
- `CODING_STANDARDS.md` - Development guidelines
- `SPRINT_CHECKLIST.md` - Project roadmap

## Creating a New Feature

### 1. Create feature directory

```bash
mkdir -p src/features/myfeature/{components,hooks,services}
```

### 2. Add types

```typescript
// src/features/myfeature/types.ts
export interface MyEntity {
  id: string
  name: string
}
```

### 3. Create component

```typescript
// src/features/myfeature/components/MyComponent.tsx
'use client'

import { MyEntity } from '../types'

interface MyComponentProps {
  entity: MyEntity
}

export const MyComponent: React.FC<MyComponentProps> = ({ entity }) => {
  return <div>{entity.name}</div>
}
```

### 4. Create service (if API calls needed)

```typescript
// src/features/myfeature/services/myfeature.service.ts
import { supabase } from '@/lib/supabase'
import { MyEntity } from '../types'

export async function fetchMyEntities(): Promise<MyEntity[]> {
  const { data, error } = await supabase
    .from('my_entities')
    .select('*')

  if (error) throw error
  return data
}
```

### 5. Create custom hook

```typescript
// src/features/myfeature/hooks/useMyEntities.ts
import { useQuery } from '@tanstack/react-query'
import { fetchMyEntities } from '../services/myfeature.service'

export function useMyEntities() {
  return useQuery({
    queryKey: ['myEntities'],
    queryFn: fetchMyEntities,
  })
}
```

### 6. Export from index

```typescript
// src/features/myfeature/index.ts
export { MyComponent } from './components/MyComponent'
export { useMyEntities } from './hooks/useMyEntities'
export * from './types'
```

## Design System Usage

### Colors

```typescript
// Use Tailwind classes
<div className="bg-background text-text-primary">
  Background with primary text
</div>

<div className="border border-border">
  Border with accent color
</div>

<div className="bg-accent-gold text-background">
  Gold accent background
</div>
```

### Typography

```typescript
// Heading styles
<h1 className="heading-1">Large Title</h1>
<h2 className="heading-2">Subtitle</h2>
<h3 className="heading-3">Section Title</h3>

// Text utilities
<p className="text-primary">Primary text</p>
<p className="text-secondary">Secondary text</p>
<p className="text-tertiary">Tertiary text</p>
```

### Components

```typescript
// Shared components
import { Button } from '@/components/Button'

<Button variant="primary" size="lg">
  Click me
</Button>

<Button variant="secondary" isLoading>
  Loading...
</Button>
```

## Working with Supabase

### Query data

```typescript
import { supabase } from '@/lib/supabase'

const { data, error } = await supabase
  .from('drinks')
  .select('*')
  .order('name')
```

### Insert data

```typescript
const { data, error } = await supabase
  .from('drinks')
  .insert([{ name: 'Martini' }])
```

### Update data

```typescript
const { data, error } = await supabase
  .from('drinks')
  .update({ name: 'Dry Martini' })
  .eq('id', '123')
```

### Delete data

```typescript
const { data, error } = await supabase
  .from('drinks')
  .delete()
  .eq('id', '123')
```

## State Management

### Using Zustand Store

```typescript
// Create store
import { create } from 'zustand'

export const usePantryStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),
}))

// Use in component
const items = usePantryStore((state) => state.items)
const add = usePantryStore((state) => state.addItem)
```

### Using React Query

```typescript
// For server state
const { data, isLoading, error } = useQuery({
  queryKey: ['drinks'],
  queryFn: fetchDrinks,
})
```

## Debugging

### Check Types

```bash
npm run type-check
```

### Check Linting

```bash
npm run lint
```

### View Errors

```bash
# Check browser console (F12)
# Check terminal output
# Check Network tab for API errors
```

## Deployment

```bash
# Build locally first
npm run build

# Check for errors
npm run type-check
npm run lint

# If all good, push to GitHub
git add .
git commit -m "feat: sprint 2 complete"
git push

# Deploy to Vercel (automatic or manual)
# https://vercel.com/docs/nextjs/deploy
```

## Next Steps

1. Read `SETUP.md` for detailed setup
2. Read `CODING_STANDARDS.md` for development guidelines
3. Review `SPRINT_CHECKLIST.md` for project roadmap
4. Start Sprint 2: Initial Screen

## Need Help?

- **Types**: Check `src/types/index.ts`
- **Components**: Check `src/components/`
- **Styling**: Check `tailwind.config.ts`
- **Examples**: Check any feature in `src/features/`

---

**You're ready to code! 🚀**
