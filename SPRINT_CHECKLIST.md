# BarIQ Sprint Checklist

## Sprint 1: Foundation ✅ COMPLETE

Project architecture, environment setup, and design system.

### Tasks
- [x] Create project structure (src/app, src/features, src/components, etc)
- [x] Install all dependencies
- [x] Configure Tailwind CSS v4
- [x] Configure shadcn/ui
- [x] Setup Supabase client
- [x] Configure PWA (Serwist)
- [x] Setup dark theme
- [x] Configure TypeScript
- [x] Setup ESLint & Prettier
- [x] Create design tokens (colors, typography)
- [x] Create base layout and providers
- [x] Create global utilities and hooks
- [x] Create type definitions
- [x] Create README and SETUP documentation
- [x] Create manifest.json for PWA

### Deliverables
- ✅ Professional project structure
- ✅ All configuration files
- ✅ Design system with tokens
- ✅ TypeScript setup
- ✅ PWA foundation
- ✅ Development environment ready

### Stats
- **Duration**: Sprint 1
- **Files Created**: 30+
- **Dependencies**: 45+
- **Ready for Sprint 2**: ✅ YES

---

## Sprint 2: Initial Screen 📅 NEXT

Ingredient selection interface and search functionality.

### Tasks
- [ ] Create `features/ingredients` directory structure
- [ ] Design ingredient selection component
- [ ] Build ingredient list from mock data
- [ ] Implement search/filter for ingredients
- [ ] Add checkbox selection UI
- [ ] Create "Discover Drinks" button
- [ ] Style with design system (dark theme, gold accents)
- [ ] Add responsive design for mobile/desktop
- [ ] Implement Zustand pantry store
- [ ] Save selections to localStorage
- [ ] Add animation/transitions
- [ ] Test on mobile and desktop

### Components Needed
- `IngredientList` - Display list of ingredients
- `IngredientSearch` - Search/filter box
- `IngredientCheckbox` - Individual ingredient item
- `DiscoverButton` - CTA button
- `InitialScreen` - Container component

### State Management
- `usePantryStore` - Selected ingredients

### API Integration
- Mock data for now (Sprint 3: connect to Supabase)

### Design Mockup
```
┌─────────────────────────────────────────┐
│           🍸 BarIQ                      │
├─────────────────────────────────────────┤
│                                         │
│  Qual ingrediente você possui?         │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │ 🔍 Pesquisar                    │  │
│  └─────────────────────────────────┘  │
│                                         │
│  ☐ Gin                                  │
│  ☐ Vodka                               │
│  ☐ Rum                                 │
│  ☐ Limão                               │
│  ☐ Hortelã                             │
│  ☐ Tônica                              │
│  ☐ Campari                             │
│  ☐ Whisky                              │
│                                         │
│         [Descobrir Drinks]              │
│                                         │
└─────────────────────────────────────────┘
```

---

## Sprint 3: Matching Algorithm 📅 FUTURE

Drink Score™ implementation and results display.

### Tasks
- [ ] Create Drink Score™ algorithm
- [ ] Implement matching logic
- [ ] Display "Can make" drinks (100%)
- [ ] Display "One ingredient away" (80-99%)
- [ ] Display "Multiple ingredients away" (<80%)
- [ ] Create results component
- [ ] Add drink cards with preview
- [ ] Implement sorting/filtering of results
- [ ] Add animations for results reveal
- [ ] Test algorithm accuracy

### Components Needed
- `DrinkResults` - Results container
- `DrinkCard` - Individual drink preview
- `DrinkScore` - Score display badge
- `MissingIngredients` - Shows what's missing

### Algorithm
```
Drink Score™ = (Available Ingredients / Total Ingredients) * 100

Example:
- Gin Tônica requires: Gin, Tônica
- You have: Gin, Limão
- Score: 50%
- Missing: Tônica
```

### Design Mockup
```
┌─────────────────────────────────────────┐
│  Você consegue fazer                   │
│                                         │
│  🍸 Gin Tônica                         │
│     100%                                │
│  ◄────────────────────────────────────►│
│                                         │
│  🍸 Mojito                             │
│     100%                                │
│                                         │
│  Você está a um ingrediente de fazer  │
│                                         │
│  🍸 Cosmopolitan                       │
│     80%                                 │
│     Falta: Cranberry                    │
└─────────────────────────────────────────┘
```

---

## Sprint 4: Drink Details 📅 FUTURE

Individual drink page with full information.

### Tasks
- [ ] Create drink detail page route
- [ ] Design detail layout
- [ ] Display large drink image
- [ ] List all ingredients with quantities
- [ ] Show preparation instructions
- [ ] Display metadata (difficulty, time, ABV, glass type, technique)
- [ ] Add back button
- [ ] Add to favorites button
- [ ] Share functionality
- [ ] Related drinks suggestions

### Components Needed
- `DrinkDetail` - Main container
- `DrinkImage` - Hero image
- `DrinkMetadata` - Stats display
- `IngredientsList` - Detailed ingredient list
- `Instructions` - Step-by-step guide
- `ActionButtons` - Favorite, share, etc

### Metadata Display
- 🎯 Difficulty (Easy/Medium/Hard)
- ⏱️ Time (minutes)
- 🥃 Glass Type (with emoji)
- 🔧 Technique (Shake, Stir, etc)
- 🍷 ABV (Alcohol %)

---

## Sprint 5: Pantry Management 📅 FUTURE

Save and manage user's ingredient pantry.

### Tasks
- [ ] Create pantry page
- [ ] Display saved ingredients
- [ ] Add/remove ingredients UI
- [ ] Auto-save to Supabase
- [ ] Sync across devices
- [ ] Show pantry in header/navigation
- [ ] Add ingredient count badge
- [ ] Implement quick-add for common ingredients
- [ ] Add local cache for offline
- [ ] Test persistence

### Components Needed
- `PantryPage` - Main pantry view
- `PantryList` - List of saved ingredients
- `PantryStats` - Summary/count
- `QuickAddButton` - Common items

### Storage
- Supabase: `pantry` table
- Local: `usePantryStore` (Zustand)

---

## Sprint 6: Favorites 📅 FUTURE

Save and access favorite cocktails.

### Tasks
- [ ] Create favorites page
- [ ] Add favorite button to drink detail
- [ ] Persist favorites to Supabase
- [ ] Display favorites list
- [ ] Remove from favorites
- [ ] Add to pantry from favorites
- [ ] Empty state UI
- [ ] Share favorites list
- [ ] Organize by category
- [ ] Sync across devices

### Components Needed
- `FavoritesPage` - Main favorites view
- `FavoriteButton` - Heart icon toggle
- `FavoritesList` - List of saved drinks
- `EmptyState` - No favorites message

### Storage
- Supabase: `favorites` table
- Local: `useFavoritesStore` (optional)

---

## Sprint 7: Catalog 📅 FUTURE

Complete drinks catalog with advanced filtering.

### Tasks
- [ ] Create catalog page
- [ ] Display all drinks in grid/list
- [ ] Implement search functionality
- [ ] Add category filters
- [ ] Add difficulty filters
- [ ] Add ABV range slider
- [ ] Implement sorting options
- [ ] Add pagination/infinite scroll
- [ ] Create advanced filter modal
- [ ] Optimize for large lists (React Query)
- [ ] Add favorites filter toggle

### Components Needed
- `CatalogPage` - Main catalog view
- `DrinkGrid` - Grid display
- `FilterBar` - Filter controls
- `FilterModal` - Advanced filters
- `SortOptions` - Sorting dropdown
- `PaginationControls` - Navigation

### Filters
- Category (Cocktails, Shots, Mocktails, etc)
- Difficulty (Easy, Medium, Hard)
- ABV Range (Slider)
- Contains Ingredient (Multi-select)
- In Pantry (Toggle)
- Favorites Only (Toggle)

### Sorting
- Name (A-Z, Z-A)
- Difficulty (Easy→Hard)
- Preparation Time (Short→Long)
- Popularity (Most favorited)

---

## Post-Sprint 7: AI Features & Enhancement 🚀

After core MVP is complete.

### Planned Features
- [ ] AI-powered cocktail suggestions
- [ ] Personalized recommendations
- [ ] Recipe variations
- [ ] Ingredient substitutions
- [ ] Cocktail history/trends
- [ ] User profiles & sharing
- [ ] Shopping list export
- [ ] Bar menu generator
- [ ] Multiple language support
- [ ] Analytics dashboard

---

## Current Status

| Sprint | Status | Completion |
|--------|--------|-----------|
| Sprint 1 | ✅ COMPLETE | 100% |
| Sprint 2 | 📅 READY | 0% |
| Sprint 3 | 📋 PLANNED | 0% |
| Sprint 4 | 📋 PLANNED | 0% |
| Sprint 5 | 📋 PLANNED | 0% |
| Sprint 6 | 📋 PLANNED | 0% |
| Sprint 7 | 📋 PLANNED | 0% |

**Total Progress**: 14.3% (1/7 sprints complete)

---

## Notes for Next Sprint

### What's Ready
- ✅ Project structure
- ✅ Design system
- ✅ TypeScript setup
- ✅ Supabase connection
- ✅ Development environment

### Before Starting Sprint 2
- [ ] Review ingredient data structure
- [ ] Plan mock ingredient list (30-50 items)
- [ ] Design search algorithm
- [ ] Plan state management for selections
- [ ] Create ingredient icons/emojis

### Estimated Timeline
- Sprint 1: ✅ Complete
- Sprint 2-7: 2-3 weeks per sprint
- **Total MVP**: 12-18 weeks

---

**Last Updated**: Sprint 1 Complete
**Next Review**: Before Sprint 2 Kickoff
