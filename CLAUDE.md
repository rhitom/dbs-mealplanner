# mealplanner - Weekly Meal Planner

A weekly meal planner. Data in client-side state.

## Stack
- Next.js (App router)
- Tailwind CSS
- React state for data (no database yet)

## Pages
- / - week view: 7-day grid with 3 meals per day, click any day to navigate
- /day/[date] - single day detail view with full meal cards and notes
- /new - add a meal or a note
- /recipes - list of recipe cards

## Data
- Sample data lives in `app/data.ts` (hardcoded for now)
- Types: `Meal`, `DayPlan`
