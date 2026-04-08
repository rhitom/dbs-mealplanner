"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { recipeCatalog } from "../../data";
import { useMealPlanner } from "../../context";
import type { Meal } from "../../data";

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { isFavorite, toggleFavorite, addMealToPlan } = useMealPlanner();
  const backHref = searchParams.get("from") || "/recipes";
  const backLabel = searchParams.get("from") ? "← Back to day" : "← Back to recipes";
  const recipe = recipeCatalog.find((r) => r.id === id);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerDate, setPickerDate] = useState("2026-04-08");
  const [pickerType, setPickerType] = useState<Meal["type"]>(recipe?.type || "dinner");
  const [submitted, setSubmitted] = useState(false);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-zinc-900 mb-2">
            Recipe not found
          </h1>
          <Link href="/recipes" className="text-blue-600 hover:underline text-sm">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  const fav = isFavorite(recipe.id);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    addMealToPlan(pickerDate, recipe!.id, pickerType);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowPicker(false);
    }, 2000);
  }

  const inputClass =
    "rounded-md border border-zinc-300 px-2 py-1.5 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <Link href={backHref} className="text-sm text-blue-600 hover:underline">
          {backLabel}
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-3xl">{recipe.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">{recipe.name}</h1>
            <p className="text-sm text-zinc-500 capitalize">
              {recipe.type} · ⏱ {recipe.prepTime}
            </p>
          </div>
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="ml-auto text-2xl transition-transform hover:scale-110"
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          >
            {fav ? "❤️" : "🤍"}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Add to plan */}
        <section>
          {!showPicker && !submitted && (
            <button
              onClick={() => setShowPicker(true)}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add to Meal Plan
            </button>
          )}
          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-lg px-4 py-3">
              Added to plan!
            </div>
          )}
          {showPicker && !submitted && (
            <form onSubmit={handleAdd} className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
              <p className="text-sm font-medium text-zinc-900">Add to meal plan</p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-zinc-500 mb-1">Date</label>
                  <input type="date" value={pickerDate} onChange={(e) => setPickerDate(e.target.value)} className={inputClass + " w-full"} required />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-zinc-500 mb-1">Meal</label>
                  <select value={pickerType} onChange={(e) => setPickerType(e.target.value as Meal["type"])} className={inputClass + " w-full"}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add
                </button>
                <button type="button" onClick={() => setShowPicker(false)} className="text-sm text-zinc-500 hover:text-zinc-700">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
            Ingredients
          </h2>
          <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100">
            {recipe.ingredients.map((item, i) => (
              <div key={i} className="px-5 py-3 text-sm text-zinc-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
            Instructions
          </h2>
          <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="px-5 py-3 flex gap-3">
                <span className="text-sm font-semibold text-blue-600 shrink-0">
                  {i + 1}.
                </span>
                <p className="text-sm text-zinc-800">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
