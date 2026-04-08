"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMealPlanner } from "../../context";

const TODAY = "2026-04-08";

function getAdjacentDates(date: string) {
  const d = new Date(date + "T00:00:00");
  const prev = new Date(d);
  prev.setDate(d.getDate() - 1);
  const next = new Date(d);
  next.setDate(d.getDate() + 1);
  const fmt = (dt: Date) => dt.toISOString().split("T")[0];
  return { prev: fmt(prev), next: fmt(next) };
}

function formatShort(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function DayPage() {
  const { date } = useParams<{ date: string }>();
  const { days } = useMealPlanner();
  const day = days.find((d) => d.date === date);
  const { prev, next } = getAdjacentDates(date);

  if (!day) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-zinc-900 mb-2">
            No meals planned for this day
          </h1>
          <p className="text-sm text-zinc-500 mb-4">{formatShort(date)}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href={`/day/${prev}`}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Previous day
            </Link>
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              Back to week
            </Link>
            <Link
              href={`/day/${next}`}
              className="text-blue-600 hover:underline text-sm"
            >
              Next day →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const d = new Date(date + "T00:00:00");
  const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isToday = date === TODAY;

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to week
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h1 className="text-2xl font-bold text-zinc-900">{dayName}</h1>
          {isToday && (
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-500">{fullDate}</p>
      </header>

      <nav className="max-w-2xl mx-auto px-4 pt-4 flex justify-between items-center">
        <Link
          href={`/day/${prev}`}
          className="flex items-center gap-1 text-sm text-zinc-600 hover:text-blue-600 transition-colors"
        >
          <span className="text-lg">←</span>
          <span>{formatShort(prev)}</span>
        </Link>
        <Link
          href={`/day/${next}`}
          className="flex items-center gap-1 text-sm text-zinc-600 hover:text-blue-600 transition-colors"
        >
          <span>{formatShort(next)}</span>
          <span className="text-lg">→</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
            Meals
          </h2>
          {day.meals.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {day.meals.map((meal, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-zinc-200 p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl mb-3">{meal.emoji}</span>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                    {meal.type}
                  </p>
                  <p className="text-base font-semibold text-zinc-900 mt-1">
                    {meal.name}
                  </p>
                  {meal.prepTime && (
                    <p className="mt-3 text-xs text-zinc-500">⏱ {meal.prepTime}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400 italic">No meals planned.</p>
          )}
        </section>

        {day.schedule && day.schedule.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
              Schedule
            </h2>
            <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100">
              {day.schedule.map((block, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3">
                  <span className="text-sm font-mono text-zinc-400 w-20 shrink-0">
                    {block.time}
                  </span>
                  <span className="text-sm text-zinc-800">{block.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
            Notes
          </h2>
          {day.note ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-sm text-amber-900 leading-relaxed whitespace-pre-line">
                {day.note}
              </p>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-zinc-300 rounded-xl p-5 text-center">
              <p className="text-sm text-zinc-400 italic">
                No notes for this day.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
