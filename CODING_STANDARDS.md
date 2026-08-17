# BarIQ Coding Standards

Professional development standards for maintaining code quality and consistency.

## Table of Contents

1. [TypeScript](#typescript)
2. [React Components](#react-components)
3. [File Organization](#file-organization)
4. [Naming Conventions](#naming-conventions)
5. [Code Style](#code-style)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Performance](#performance)
9. [Testing](#testing)
10. [Git Workflow](#git-workflow)

---

## TypeScript

### Strict Mode (Always)

```typescript
// ✅ GOOD
interface User {
  id: string
  email: string
  createdAt: Date
}

const user: User = {
  id: '123',
  email: 'john@example.com',
  createdAt: new Date(),
}

// ❌ BAD
const user = {
  id: '123',
  email: 'john@example.com',
  createdAt: new Date(),
}
```

### Type Definition Rules

```typescript
// ✅ GOOD - Export types in separate file or at top
export interface Product {
  id: string
  name: string
  price: number
}

export type ProductStatus = 'active' | 'inactive' | 'archived'

// ❌ BAD - Inline types in components
const MyComponent = () => {
  interface Props {
    name: string
  }
}
```

### Avoid `any` Type

```typescript
// ✅ GOOD
const handleData = (data: unknown): void => {
  if (typeof data === 'string') {
    console.log(data.toUpperCase())
  }
}

// ❌ BAD
const handleData = (data: any): void => {
  console.log(data.toUpperCase()) // Runtime error risk
}
```

### Generic Types

```typescript
// ✅ GOOD - Reusable generic
interface Response<T> {
  data: T
  error?: string
}

const getUserResponse: Response<User> = {
  data: user,
}

// ❌ BAD - Hardcoded types
interface UserResponse {
  data: User
  error?: string
}

interface DrinkResponse {
  data: Drink
  error?: string
}
```

---

## React Components

### Functional Components Only

```typescript
// ✅ GOOD
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return <div>{user.name}</div>
}

// ❌ BAD (Class components)
export class UserCard extends React.Component {
  render() {
    return <div>{this.props.user.name}</div>
  }
}
```

### Props Interface Pattern

```typescript
// ✅ GOOD
interface UserCardProps {
  user: User
  onSelect?: (id: string) => void
  isSelected?: boolean
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onSelect,
  isSelected = false,
}) => {
  return (
    <div
      onClick={() => onSelect?.(user.id)}
      data-selected={isSelected}
    >
      {user.name}
    </div>
  )
}

// ❌ BAD
export const UserCard = ({ user, onSelect, isSelected }) => {
  return <div onClick={() => onSelect(user.id)}>{user.name}</div>
}
```

### Custom Hooks Pattern

```typescript
// ✅ GOOD
interface UseUserReturn {
  user: User | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useUser(id: string): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refetch = async () => {
    try {
      setIsLoading(true)
      const data = await fetchUser(id)
      setUser(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refetch()
  }, [id])

  return { user, isLoading, error, refetch }
}

// ❌ BAD
export function useUser(id) {
  const [state, setState] = useState(null)
  // Unclear what's in state
  return state
}
```

### Component Composition

```typescript
// ✅ GOOD - Small, focused components
export const DrinkCard: React.FC<DrinkCardProps> = ({ drink }) => (
  <div className="card">
    <DrinkImage src={drink.image} />
    <DrinkName name={drink.name} />
    <DrinkScore score={drink.score} />
  </div>
)

// ❌ BAD - Too much in one component
export const DrinkCard: React.FC<DrinkCardProps> = ({ drink }) => (
  <div className="card">
    <img src={drink.image} />
    <h2>{drink.name}</h2>
    <div>{drink.score}%</div>
    {/* 100 more lines of logic */}
  </div>
)
```

---

## File Organization

### Feature Structure

```
features/drinks/
├── components/
│   ├── DrinkCard.tsx      # Specific to drinks feature
│   ├── DrinkList.tsx
│   └── DrinkDetail.tsx
├── hooks/
│   ├── useDrinks.ts       # Feature-specific hook
│   └── useDrinkDetail.ts
├── services/
│   └── drinks.service.ts  # API calls
├── types.ts               # Feature types
├── index.ts               # Clean exports
└── README.md              # Feature documentation
```

### Shared Components Structure

```
components/
├── common/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── feedback/
│   ├── Loading.tsx
│   ├── Error.tsx
│   └── Empty.tsx
└── providers.tsx
```

### File Naming

```typescript
// ✅ GOOD
- components/Button.tsx (PascalCase for components)
- hooks/useUser.ts (use prefix for hooks)
- services/user.service.ts (lowercase with domain)
- stores/auth.store.ts (domain.store)
- types/user.ts (lowercase)
- utils/formatDate.ts (camelCase for utilities)

// ❌ BAD
- components/button.tsx
- hooks/get-user.ts
- services/userService.ts
- stores/authStore.ts
```

---

## Naming Conventions

### Variables and Functions

```typescript
// ✅ GOOD - Clear, descriptive names
const maxRetryAttempts = 3
const isLoadingData = false
const getUserById = (id: string): User => {}
const calculateDrinkScore = (): number => {}

// ❌ BAD - Vague or abbreviated
const max = 3
const loading = false
const getUser = () => {}
const calcScore = () => {}
```

### React Component Names

```typescript
// ✅ GOOD - Descriptive, suffixed
export const UserProfileCard: React.FC = () => {}
export const LoadingSpinner: React.FC = () => {}
export const DrinkListItem: React.FC = () => {}

// ❌ BAD - Generic or unclear
export const Card: React.FC = () => {}
export const Loading: React.FC = () => {}
export const Item: React.FC = () => {}
```

### Boolean Variables

```typescript
// ✅ GOOD - is/has prefix
const isVisible = true
const isLoading = false
const hasError = false
const isAuthenticated = true

// ❌ BAD - unclear boolean meaning
const visible = true
const loading = false
const error = false
const authenticated = true
```

### Constants

```typescript
// ✅ GOOD - UPPER_SNAKE_CASE
const MAX_RETRIES = 3
const API_TIMEOUT_MS = 30000
const DEFAULT_PAGE_SIZE = 20

// ❌ BAD - camelCase for constants
const maxRetries = 3
const apiTimeoutMs = 30000
const defaultPageSize = 20
```

---

## Code Style

### Import Organization

```typescript
// ✅ GOOD - Organized imports
// 1. React
import React, { useState, useEffect } from 'react'

// 2. External libraries
import { useQuery } from '@tanstack/react-query'
import { create } from 'zustand'

// 3. Internal absolute imports
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { useDrinks } from '@/features/drinks/hooks'

// 4. Types
import type { Drink } from '@/types'
```

### Line Length

```typescript
// ✅ GOOD - Split long lines (max 100 chars)
const isValid =
  user.email.length > 0 &&
  user.email.includes('@') &&
  user.password.length >= 8

// ❌ BAD - Too long
const isValid = user.email.length > 0 && user.email.includes('@') && user.password.length >= 8
```

### Function Documentation

```typescript
// ✅ GOOD - JSDoc comments
/**
 * Calculate drink score based on available ingredients
 * @param availableIngredients - User's selected ingredients
 * @param drinkIngredients - Required ingredients for drink
 * @returns Score percentage (0-100)
 */
export function calculateDrinkScore(
  availableIngredients: string[],
  drinkIngredients: string[]
): number {
  const matches = availableIngredients.filter((i) =>
    drinkIngredients.includes(i)
  ).length
  return Math.round((matches / drinkIngredients.length) * 100)
}

// ❌ BAD - No documentation
export function calculateDrinkScore(available, required) {
  return (available.filter((i) => required.includes(i)).length / required.length) * 100
}
```

### Destructuring

```typescript
// ✅ GOOD - Destructure for clarity
const { user, isLoading, error } = useUser(id)
const { addIngredient, removeIngredient } = usePantryStore()

// ❌ BAD - Unnecessary dot notation
const userHook = useUser(id)
const user = userHook.user
const isLoading = userHook.isLoading
```

### Error Handling

```typescript
// ✅ GOOD - Proper error handling
try {
  const data = await fetchDrinks()
  setDrinks(data)
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  console.error('Failed to fetch drinks:', message)
  setError(new Error(message))
}

// ❌ BAD - Swallowing errors
try {
  const data = await fetchDrinks()
  setDrinks(data)
} catch {
  // Silently failing
}
```

---

## State Management

### Zustand Store Pattern

```typescript
// ✅ GOOD
import { create } from 'zustand'

interface PantryState {
  ingredients: string[]
  addIngredient: (id: string) => void
  removeIngredient: (id: string) => void
  clear: () => void
}

export const usePantryStore = create<PantryState>((set) => ({
  ingredients: [],
  addIngredient: (id) =>
    set((state) => ({
      ingredients: [...state.ingredients, id],
    })),
  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((ing) => ing !== id),
    })),
  clear: () => set({ ingredients: [] }),
}))

// ❌ BAD - Unclear state structure
const store = create((set) => ({
  state: { items: [] },
  update: (newState) => set({ state: newState }),
}))
```

### React Query Pattern

```typescript
// ✅ GOOD
const { data: drinks, isLoading, error } = useQuery({
  queryKey: ['drinks', pantryIngredients],
  queryFn: () => fetchDrinks(pantryIngredients),
  staleTime: 1000 * 60 * 5, // 5 minutes
  retry: 2,
})

// ❌ BAD - Manual data fetching
const [drinks, setDrinks] = useState(null)
const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  setIsLoading(true)
  fetchDrinks(pantryIngredients)
    .then(setDrinks)
    .finally(() => setIsLoading(false))
}, [pantryIngredients])
```

---

## API Integration

### Service Layer Pattern

```typescript
// ✅ GOOD - Centralized API calls
// src/services/drinks.service.ts
export async function fetchDrinks(): Promise<Drink[]> {
  const response = await supabase.from('drinks').select('*')

  if (response.error) {
    throw new Error(`Failed to fetch drinks: ${response.error.message}`)
  }

  return response.data
}

// In component
const { data: drinks } = useQuery({
  queryKey: ['drinks'],
  queryFn: fetchDrinks,
})

// ❌ BAD - API calls in components
const MyComponent = () => {
  useEffect(() => {
    supabase.from('drinks').select('*').then(setDrinks)
  }, [])
}
```

### Error Types

```typescript
// ✅ GOOD - Typed errors
export async function fetchDrink(id: string): Promise<Drink> {
  try {
    const response = await supabase
      .from('drinks')
      .select('*')
      .eq('id', id)
      .single()

    if (response.error) {
      throw new BarIQError('DRINK_NOT_FOUND', `Drink not found: ${id}`, 404)
    }

    return response.data
  } catch (error) {
    if (error instanceof BarIQError) {
      throw error
    }
    throw new BarIQError('UNKNOWN_ERROR', 'Failed to fetch drink', 500)
  }
}
```

---

## Performance

### Component Memoization

```typescript
// ✅ GOOD - Memoize when needed
export const DrinkCard = React.memo<DrinkCardProps>(({ drink, onSelect }) => (
  <div onClick={() => onSelect(drink.id)}>{drink.name}</div>
))

// Use only if component receives many props or re-renders frequently
// Don't over-memoize

// ❌ BAD - Memoizing everything
export const Header = React.memo(() => <h1>Header</h1>)
```

### Lazy Loading

```typescript
// ✅ GOOD - Code splitting
const CatalogPage = lazy(() => import('@/features/catalog/pages/CatalogPage'))

export const Router = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <CatalogPage />
  </Suspense>
)

// ❌ BAD - No code splitting
import { CatalogPage } from '@/features/catalog/pages/CatalogPage'
```

### Image Optimization

```typescript
// ✅ GOOD - Next.js Image component
import Image from 'next/image'

export const DrinkImage = ({ src, alt }: Props) => (
  <Image
    src={src}
    alt={alt}
    width={400}
    height={300}
    quality={85}
    loading="lazy"
  />
)

// ❌ BAD - Raw img tag
export const DrinkImage = ({ src, alt }: Props) => (
  <img src={src} alt={alt} />
)
```

---

## Testing

### Component Testing

```typescript
// ✅ GOOD - Focused tests
import { render, screen } from '@testing-library/react'
import { DrinkCard } from './DrinkCard'

describe('DrinkCard', () => {
  it('should display drink name', () => {
    const drink = { id: '1', name: 'Martini' }
    render(<DrinkCard drink={drink} />)

    expect(screen.getByText('Martini')).toBeInTheDocument()
  })

  it('should call onSelect when clicked', () => {
    const onSelect = jest.fn()
    const drink = { id: '1', name: 'Martini' }

    render(<DrinkCard drink={drink} onSelect={onSelect} />)
    screen.getByText('Martini').click()

    expect(onSelect).toHaveBeenCalledWith('1')
  })
})
```

---

## Git Workflow

### Commit Messages

```bash
# ✅ GOOD - Descriptive commits
git commit -m "feat: implement drink score calculation algorithm"
git commit -m "fix: correct ingredient filtering in search"
git commit -m "refactor: extract DrinkCard component"
git commit -m "docs: add testing guidelines to CODING_STANDARDS"

# ❌ BAD
git commit -m "fix stuff"
git commit -m "updates"
git commit -m "WIP"
```

### Branch Naming

```bash
# ✅ GOOD
git checkout -b feat/drink-score-algorithm
git checkout -b fix/ingredient-search-filter
git checkout -b refactor/api-service-layer
git checkout -b docs/setup-guide

# ❌ BAD
git checkout -b feature1
git checkout -b fix123
git checkout -b test-branch
```

### PR Standards

- Link to relevant sprint task
- Write descriptive PR title
- Document changes in description
- Request review from team
- Pass all tests and linting

---

## Summary Checklist

Before committing:

- [ ] All types are properly defined
- [ ] No `any` types used
- [ ] Components are small and focused
- [ ] Functions have JSDoc comments
- [ ] Error handling is implemented
- [ ] No console logs in production code
- [ ] Imports are organized
- [ ] Naming follows conventions
- [ ] Code is formatted with Prettier
- [ ] No linting errors (`npm run lint`)
- [ ] Tests pass (if applicable)
- [ ] Commit message is descriptive

---

**Last Updated**: Sprint 1
**Version**: 1.0
