"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMealPlanner } from "../../context";
import { getRecipe } from "../../data";
import type { Meal } from "../../data";

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

function LeftoverPicker({
  currentDate,
  mealIndex,
  onClose,
}: {
  currentDate: string;
  mealIndex: number;
  onClose: () => void;
}) {
  const { addLeftover } = useMealPlanner();
  const nextDay = getAdjacentDates(currentDate).next;
  const [toDate, setToDate] = useState(nextDay);
  const [toType, setToType] = useState<Meal["type"]>("lunch");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addLeftover(currentDate, mealIndex, toDate, toType);
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }

  if (submitted) {
    return (
      <div className="mt-3 bg-sage-light border border-sage/20 rounded-lg px-3 py-2 text-xs text-sage">
        Leftover added to {formatShort(toDate)}
      </div>
    );
  }

  const inputClass =
    "rounded-lg border border-border px-2 py-1 text-xs text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-transparent";

  return (
    <form onSubmit={handleSubmit} className="mt-3 bg-background border border-border rounded-xl p-3 space-y-2">
      <p className="text-xs font-medium text-foreground">Save leftover to:</p>
      <div className="flex gap-2">
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className={inputClass} required />
        <select value={toType} onChange={(e) => setToType(e.target.value as Meal["type"])} className={inputClass}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-accent text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-accent/90">
          Add Leftover
        </button>
        <button type="button" onClick={onClose} className="text-xs text-muted hover:text-foreground">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function DayPage() {
  const { date } = useParams<{ date: string }>();
  const { days } = useMealPlanner();
  const day = days.find((d) => d.date === date);
  const { prev, next } = getAdjacentDates(date);
  const [leftoverPickerIndex, setLeftoverPickerIndex] = useState<number | null>(null);

  if (!day) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-xl text-foreground mb-2">
            No meals planned for this day
          </h1>
          <p className="text-sm text-muted mb-6">{formatShort(date)}</p>
          <div className="flex gap-6 justify-center">
            <Link href={`/day/${prev}`} className="text-accent hover:text-accent/80 text-sm">
              ← Previous day
            </Link>
            <Link href="/" className="text-accent hover:text-accent/80 text-sm">
              Back to week
            </Link>
            <Link href={`/day/${next}`} className="text-accent hover:text-accent/80 text-sm">
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
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sm text-accent hover:text-accent/80">
            ← Back to week
          </Link>
          <div className="flex items-center gap-3 mt-3">
            <h1 className="font-serif text-3xl text-foreground">{dayName}</h1>
            {isToday && (
              <span className="text-xs font-medium bg-accent-light text-accent px-2.5 py-0.5 rounded-full">
                Today
              </span>
            )}
          </div>
          <p className="text-sm text-muted mt-1">{fullDate}</p>
        </div>
      </header>

      <nav className="max-w-2xl mx-auto px-4 pt-6 flex justify-between items-center">
        <Link
          href={`/day/${prev}`}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
        >
          <span>←</span>
          <span>{formatShort(prev)}</span>
        </Link>
        <Link
          href={`/day/${next}`}
          className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
        >
          <span>{formatShort(next)}</span>
          <span>→</span>
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-10">
        <section>
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-5">
            Meals
          </h2>
          {day.meals.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-3">
              {day.meals.map((meal, i) => {
                const recipe = getRecipe(meal.recipeId);
                if (!recipe) return null;

                return (
                  <div
                    key={i}
                    className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-0.5 transition-all relative"
                  >
                    {meal.isLeftover && (
                      <span className="absolute top-3 right-3 text-[10px] font-medium bg-accent-light text-accent px-2 py-0.5 rounded-full tracking-wide">
                        Leftover
                      </span>
                    )}
                    <Link href={`/recipes/${recipe.id}?from=/day/${date}`} className="flex flex-col items-center">
                      <span className="text-4xl mb-4">{recipe.emoji}</span>
                      <p className="text-xs text-muted uppercase tracking-widest">
                        {meal.type}
                      </p>
                      <p className="font-serif text-base text-foreground mt-1.5">
                        {recipe.name}
                        {meal.isLeftover && (
                          <span className="text-accent/60 text-xs ml-1 font-sans">(leftover)</span>
                        )}
                      </p>
                      <p className="mt-2.5 text-xs text-muted">⏱ {meal.isLeftover ? "5 min" : recipe.prepTime}</p>
                      <p className="mt-1.5 text-xs text-accent">View recipe →</p>
                    </Link>
                    {!meal.isLeftover && (
                      <>
                        <button
                          onClick={() =>
                            setLeftoverPickerIndex(leftoverPickerIndex === i ? null : i)
                          }
                          className="mt-4 text-xs text-muted hover:text-accent transition-colors"
                        >
                          🥡 Mark as leftover
                        </button>
                        {leftoverPickerIndex === i && (
                          <LeftoverPicker
                            currentDate={date}
                            mealIndex={i}
                            onClose={() => setLeftoverPickerIndex(null)}
                          />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted italic">No meals planned.</p>
          )}
        </section>

        {day.schedule && day.schedule.length > 0 && (
          <section>
            <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-5">
              Schedule
            </h2>
            <div className="bg-card rounded-2xl border border-border divide-y divide-border">
              {day.schedule.map((block, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                  <span className="text-sm font-mono text-muted w-20 shrink-0">
                    {block.time}
                  </span>
                  <span className="text-sm text-foreground">{block.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-5">
            Notes
          </h2>
          {day.note ? (
            <div className="bg-accent-light/50 border border-accent/15 rounded-2xl p-6">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {day.note}
              </p>
            </div>
          ) : (
            <div className="bg-card border border-dashed border-border rounded-2xl p-6 text-center">
              <p className="text-sm text-muted italic">
                No notes for this day.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
