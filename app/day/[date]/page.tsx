import Link from "next/link";
import { weekData } from "../../data";

const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
} as const;

export default async function DayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const day = weekData.find((d) => d.date === date);

  if (!day) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-zinc-900 mb-2">Day not found</h1>
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            Back to week
          </Link>
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

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← Back to week
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 mt-2">{dayName}</h1>
        <p className="text-sm text-zinc-500">{fullDate}</p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {day.meals.map((meal) => (
          <div
            key={meal.type}
            className="bg-white rounded-xl border border-zinc-200 p-5"
          >
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">
              {MEAL_LABELS[meal.type]}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{meal.emoji}</span>
              <span className="text-lg font-semibold text-zinc-900">
                {meal.name}
              </span>
            </div>
          </div>
        ))}

        {day.note && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
              Note
            </p>
            <p className="text-sm text-amber-900">{day.note}</p>
          </div>
        )}
      </main>
    </div>
  );
}
