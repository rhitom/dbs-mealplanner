# mealplanner - Weekly Meal Planner

A weekly meal planner. Data in client-side state.

## Stack
- Next.js (App router)
- Tailwind CSS
- React context for state (no database yet, resets on refresh)

## Architecture
- `app/data.ts` — types (`Meal`, `Recipe`, `DayPlan`, `TimeBlock`), recipe catalog (15 recipes), sample week data, `getRecipe()` helper
- `app/context.tsx` — MealPlannerProvider wraps the app; provides `days`, `favorites`, `addMealToPlan`, `addNote`, `addTimeBlock`, `addLeftover`, `toggleFavorite`, `isFavorite`
- Meals reference recipes by `recipeId` — all meals come from the recipe catalog

## Pages
- / — week view: 7-day grid showing meals (resolved from recipe catalog), links to Recipes and Add New
- /day/[date] — day detail: recipe cards (click through to recipe detail), schedule, notes, prev/next nav, leftover marking
- /new — tabbed form (Note / Time Block) with date picker. Meals are added from the recipe bank instead.
- /recipes — recipe catalog grid (15 recipes), sorted favorites-first then alphabetical, heart toggle, "Add to plan" picker on each card
- /recipes/[id] — full recipe detail: ingredients, instructions, favorite toggle, "Add to Meal Plan" button. Back button is context-aware (returns to day view or recipe list)
