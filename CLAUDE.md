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
- **/** — Weekly homepage with 7-day grid, today highlight, meal previews from recipe catalog
- **/day/[date]** — Day detail with meal cards, schedule time blocks, notes, prev/next navigation
- **/new** — Tabbed form for adding notes and time blocks (meals added via recipe bank)
- **/recipes** — Recipe catalog grid (15 recipes), favorites sorting, "Add to plan" picker
- **/recipes/[id]** — Full recipe detail with ingredients, instructions, favorite toggle, context-aware back button
- **/groceries** — Side-by-side weekly planner + grocery checklist with ingredient deduplication

## Features
- **Recipe-based meal planning** — all meals reference recipes by ID from a 15-recipe catalog
- **Favorites** — toggle hearts on recipe cards and detail pages, favorites sort to top
- **Leftovers** — mark meals as leftover, choose target day/slot, replaces existing meal, maintains breakfast/lunch/dinner order
- **Add to plan** — assign recipes to specific days and meal slots from recipe cards or detail pages
- **Grocery list** — auto-aggregates ingredients from weekly meals, sums quantities, merges duplicates, per-recipe breakdown
- **Editable weekly plan on /groceries** — click any meal slot to swap recipes via dropdown
- **Context-aware navigation** — recipe detail back button returns to day view or recipe list depending on origin

## Key decisions
- React context for state (no database, resets on refresh)
- Meals reference `recipeId` instead of storing name/emoji directly — all meal data resolved from catalog
- Removed calories field per user request
- Removed Recipe tab from /new — meals only come from the recipe bank
- Leftovers replace existing meals in the target slot (not stack)

## MCP Tests
- Navigated to localhost:3000 and verified the homepage loads with the weekly meal grid
- Navigated to /new, filled in a note ("make risotto next week.") for April 10, and submitted the form
- Navigated back to homepage to verify the note persisted in state
- Navigated to /groceries and swapped 7 meal slots to create a rotation of 2 breakfasts (Avocado Toast, Greek Yogurt Bowl), 3 lunches (Caesar Salad, Tomato Soup, Grain Bowl), and 3 dinners (Grilled Salmon, Chicken Stir-Fry, Pasta Primavera)
- Verified the grocery list updated correctly, dropping from 79 to 42 items with proper quantity aggregation
