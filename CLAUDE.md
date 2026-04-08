# mealplanner - Weekly Meal Planner

A weekly meal planner. Data in client-side state.

## Stack
- Next.js (App router)
- Tailwind CSS
- React context for state (no database yet, resets on refresh)

## Design
- **Typography**: Playfair Display (serif) for headings, Geist Sans for body
- **Palette**: Warm earth tones — terracotta accent (#C2734C), sage green (#7C8B6E), warm cream background (#FAF7F2), ivory cards (#FFFDF9)
- **Style**: Minimalist, generous spacing, rounded-2xl cards, subtle hover lift effects
- CSS variables defined in `globals.css`: `--accent`, `--sage`, `--card`, `--border`, `--muted`, etc.

## Architecture
- `app/data.ts` — types (`Meal`, `Recipe`, `DayPlan`, `TimeBlock`), recipe catalog (15 recipes), sample week data, `getRecipe()` helper
- `app/context.tsx` — MealPlannerProvider wraps the app; provides `days`, `favorites`, `addMealToPlan`, `addNote`, `addTimeBlock`, `addLeftover`, `toggleFavorite`, `isFavorite`
- Meals reference recipes by `recipeId` — all meals come from the recipe catalog

## Pages
- / — week view: 7-day grid showing meals (resolved from recipe catalog), links to Groceries, Recipes, and Add New
- /day/[date] — day detail: recipe cards (click through to recipe detail), schedule, notes, prev/next nav, leftover marking
- /new — tabbed form (Note / Time Block) with date picker. Meals are added from the recipe bank instead.
- /recipes — recipe catalog grid (15 recipes), sorted favorites-first then alphabetical, heart toggle, "Add to plan" picker on each card
- /recipes/[id] — full recipe detail: ingredients, instructions, favorite toggle, "Add to Meal Plan" button. Back button is context-aware (returns to day view or recipe list)
- /groceries — side-by-side layout: editable weekly meal plan (left) and aggregated grocery checklist (right). Ingredients are deduplicated with quantity summing and per-recipe breakdowns

## Session Summary

### Pages built
- **/** — Weekly homepage with 7-day grid, today highlight, meal previews from recipe catalog
- **/day/[date]** — Day detail with meal cards, schedule time blocks, notes, prev/next navigation
- **/new** — Tabbed form for adding notes and time blocks (meals added via recipe bank)
- **/recipes** — Recipe catalog grid (15 recipes), favorites sorting, "Add to plan" picker
- **/recipes/[id]** — Full recipe detail with ingredients, instructions, favorite toggle, context-aware back button
- **/groceries** — Side-by-side weekly planner + grocery checklist with ingredient deduplication

### Features implemented
- **Recipe-based meal planning** — all meals reference recipes by ID from a 15-recipe catalog
- **Favorites** — toggle hearts on recipe cards and detail pages, favorites sort to top
- **Leftovers** — mark meals as leftover, choose target day/slot, replaces existing meal, maintains breakfast/lunch/dinner order
- **Add to plan** — assign recipes to specific days and meal slots from recipe cards or detail pages
- **Grocery list** — auto-aggregates ingredients from weekly meals, sums quantities, merges duplicates, per-recipe breakdown
- **Editable weekly plan on /groceries** — click any meal slot to swap recipes via dropdown
- **Context-aware navigation** — recipe detail back button returns to day view or recipe list depending on origin

### Key decisions
- React context for state (no database, resets on refresh)
- Meals reference `recipeId` instead of storing name/emoji directly — all meal data resolved from catalog
- Removed calories field per user request
- Removed Recipe tab from /new — meals only come from the recipe bank
- Leftovers replace existing meals in the target slot (not stack)

### Design
- Playfair Display serif headings, Geist Sans body text
- Warm earth-tone palette: terracotta accent, sage green, cream background, ivory cards
- Forced light mode to prevent dark mode inversion
- Minimalist zen styling with hover lift effects and generous spacing

### Remaining tasks
- Configure Playwright MCP (command ran with error — needs re-run with correct syntax)
- Verify at least one interaction using Playwright MCP
- Deploy to Vercel via GitHub
