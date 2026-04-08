# mealplanner - Weekly Meal Planner

A weekly meal planner. Data in client-side state.

## Stack
- Next.js (App router)
- Tailwind CSS
- React context for state (no database yet, resets on refresh)

## Architecture
- `app/context.tsx` — MealPlannerProvider wraps the app in layout.tsx; provides `days`, `favorites`, `addMeal`, `addNote`, `addTimeBlock`, `addLeftover`, `toggleFavorite`, `isFavorite`
- `app/data.ts` — types (`Meal`, `Recipe`, `DayPlan`, `TimeBlock`) and hardcoded sample data (week + recipe catalog)

## Pages
- / — week view: 7-day grid with 3 meals per day, links to Recipes and Add New
- /day/[date] — day detail: recipe cards (prep time), schedule time blocks, notes, prev/next nav, leftover marking (pick target day + meal slot)
- /new — tabbed form (Recipe / Note / Time Block) with date picker, adds to app state
- /recipes — recipe catalog grid, sorted favorites-first then alphabetical, heart toggle on cards
- /recipes/[id] — full recipe detail: ingredients, instructions, favorite toggle
