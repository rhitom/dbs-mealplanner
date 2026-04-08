"use client";

import Link from "next/link";
import { useMealPlanner } from "./context";

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

  // Show the 7 days of the current week (Apr 6–12)
  const weekDates = [
    "2026-04-06", "2026-04-07", "2026-04-08", "2026-04-09",
    "2026-04-10", "2026-04-11", "2026-04-12",
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Meal Planner</h1>
            <p className="text-sm text-zinc-500 mt-1">Week of April 6 – 12, 2026</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/recipes"
              className="border border-zinc-300 text-zinc-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/new"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add New
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weekDates.map((date) => {
            const day = days.find((d) => d.date === date);
            const { dayName, monthDay } = formatDate(date);
            const isToday = date === TODAY;
            const meals = day?.meals || [];

            return (
              <Link
                key={date}
                href={`/day/${date}`}
                className={`block rounded-xl border bg-white p-4 transition-shadow hover:shadow-md ${
                  isToday
                    ? "border-blue-400 ring-2 ring-blue-100"
                    : "border-zinc-200"
                }`}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="font-semibold text-zinc-900">{dayName}</h2>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      isToday
                        ? "bg-blue-100 text-blue-700"
                        : "text-zinc-400"
                    }`}
                  >
                    {isToday ? "Today" : monthDay}
                  </span>
                </div>

                {meals.length > 0 ? (
                  <ul className="space-y-2">
                    {meals.slice(0, 3).map((meal, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-base">{meal.emoji}</span>
                        <span className="text-zinc-500 w-16 shrink-0 capitalize">
                          {meal.type}
                        </span>
                        <span className="text-zinc-800 truncate">{meal.name}</span>
                      </li>
                    ))}
                    {meals.length > 3 && (
                      <li className="text-xs text-zinc-400">
                        +{meals.length - 3} more
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-400 italic">No meals planned</p>
                )}

                {day?.note && (
                  <p className="mt-3 text-xs text-zinc-400 italic border-t border-zinc-100 pt-2">
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
