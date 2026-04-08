"use client";

import Link from "next/link";
import { useMealPlanner } from "./context";
import { getRecipe } from "./data";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return {
    dayName: DAY_NAMES[d.getDay()],
    monthDay: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
}

const TODAY = "2026-04-08";

export default function Home() {
  const { days } = useMealPlanner();

  const weekDates = [
    "2026-04-06", "2026-04-07", "2026-04-08", "2026-04-09",
    "2026-04-10", "2026-04-11", "2026-04-12",
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-8">
        <div className="flex items-end justify-between max-w-4xl mx-auto">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground tracking-tight">
              Meal Planner
            </h1>
            <p className="text-sm text-muted mt-1 tracking-wide">
              Week of April 6 – 12, 2026
            </p>
          </div>
          <nav className="flex gap-3">
            <Link
              href="/groceries"
              className="border border-border text-muted text-sm px-4 py-2 rounded-lg hover:border-accent hover:text-accent transition-colors"
            >
              Groceries
            </Link>
            <Link
              href="/recipes"
              className="border border-border text-muted text-sm px-4 py-2 rounded-lg hover:border-accent hover:text-accent transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/new"
              className="bg-accent text-white text-sm px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              + Add New
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {weekDates.map((date) => {
            const day = days.find((d) => d.date === date);
            const { dayName, monthDay } = formatDate(date);
            const isToday = date === TODAY;
            const meals = day?.meals || [];

            return (
              <Link
                key={date}
                href={`/day/${date}`}
                className={`group block rounded-2xl border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  isToday
                    ? "border-accent/40 ring-2 ring-accent-light"
                    : "border-border hover:border-accent/30"
                }`}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="font-serif text-lg text-foreground">{dayName}</h2>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      isToday
                        ? "bg-accent-light text-accent"
                        : "text-muted"
                    }`}
                  >
                    {isToday ? "Today" : monthDay}
                  </span>
                </div>

                {meals.length > 0 ? (
                  <ul className="space-y-2.5">
                    {meals.slice(0, 3).map((meal, i) => {
                      const recipe = getRecipe(meal.recipeId);
                      if (!recipe) return null;
                      return (
                        <li key={i} className="flex items-center gap-2.5 text-sm">
                          <span className="text-base">{recipe.emoji}</span>
                          <span className="text-muted w-16 shrink-0 capitalize text-xs tracking-wide">
                            {meal.type}
                          </span>
                          <span className="text-foreground truncate">
                            {recipe.name}
                            {meal.isLeftover && (
                              <span className="text-accent/60 text-xs ml-1">(leftover)</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                    {meals.length > 3 && (
                      <li className="text-xs text-muted">
                        +{meals.length - 3} more
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted/60 italic">No meals planned</p>
                )}

                {day?.note && (
                  <p className="mt-4 text-xs text-muted italic border-t border-border pt-3">
                    {day.note}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
