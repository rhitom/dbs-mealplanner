import Link from "next/link";
import { weekData } from "./data";

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
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-zinc-900">Meal Planner</h1>
        <p className="text-sm text-zinc-500 mt-1">Week of April 6 – 12, 2026</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weekData.map((day) => {
            const { dayName, monthDay } = formatDate(day.date);
            const isToday = day.date === TODAY;

            return (
              <Link
                key={day.date}
                href={`/day/${day.date}`}
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

                <ul className="space-y-2">
                  {day.meals.map((meal) => (
                    <li key={meal.type} className="flex items-center gap-2 text-sm">
                      <span className="text-base">{meal.emoji}</span>
                      <span className="text-zinc-500 w-16 shrink-0 capitalize">
                        {meal.type}
                      </span>
                      <span className="text-zinc-800 truncate">{meal.name}</span>
                    </li>
                  ))}
                </ul>

                {day.note && (
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
