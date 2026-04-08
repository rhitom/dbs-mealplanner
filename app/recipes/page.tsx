"use client";

import { useState } from "react";
import Link from "next/link";
import { recipeCatalog } from "../data";
import { useMealPlanner } from "../context";
import type { Meal } from "../data";

function AddToPlanPicker({
  recipeId,
  defaultType,
  onClose,
}: {
  recipeId: string;
  defaultType: Meal["type"];
  onClose: () => void;
}) {
  const { addMealToPlan } = useMealPlanner();
  const [date, setDate] = useState("2026-04-08");
  const [mealType, setMealType] = useState<Meal["type"]>(defaultType);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addMealToPlan(date, recipeId, mealType);
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }

  if (submitted) {
    return (
      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-800">
        Added to plan!
      </div>
    );
  }

  const inputClass =
    "rounded-md border border-zinc-300 px-2 py-1 text-xs text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <form onClick={(e) => e.preventDefault()} onSubmit={handleSubmit} className="mt-3 bg-zinc-50 border border-zinc-200 rounded-lg p-3 space-y-2">
      <p className="text-xs font-medium text-zinc-700">Add to meal plan:</p>
      <div className="flex gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} required />
        <select value={mealType} onChange={(e) => setMealType(e.target.value as Meal["type"])} className={inputClass}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
          Add
        </button>
        <button type="button" onClick={onClose} className="text-xs text-zinc-500 hover:text-zinc-700">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function RecipesPage() {
  const { isFavorite, toggleFavorite } = useMealPlanner();
  const [addPickerRecipeId, setAddPickerRecipeId] = useState<string | null>(null);

  const sorted = [...recipeCatalog].sort((a, b) => {
    const aFav = isFavorite(a.id) ? 0 : 1;
    const bFav = isFavorite(b.id) ? 0 : 1;
    if (aFav !== bFav) return aFav - bFav;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Back to week
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 mt-2">Recipes</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {recipeCatalog.length} recipes
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((recipe) => {
            const fav = isFavorite(recipe.id);
            const showPicker = addPickerRecipeId === recipe.id;
            return (
              <div
                key={recipe.id}
                className="bg-white rounded-xl border border-zinc-200 p-5 hover:shadow-md transition-shadow relative"
              >
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className="absolute top-3 right-3 text-xl transition-transform hover:scale-110"
                  aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                >
                  {fav ? "❤️" : "🤍"}
                </button>

                <Link href={`/recipes/${recipe.id}`} className="block">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-3">{recipe.emoji}</span>
                    <p className="text-base font-semibold text-zinc-900">
                      {recipe.name}
                    </p>
                    <p className="text-xs text-zinc-500 capitalize mt-1">
                      {recipe.type}
                    </p>
                    <p className="text-xs text-zinc-400 mt-2">
                      ⏱ {recipe.prepTime}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => setAddPickerRecipeId(showPicker ? null : recipe.id)}
                  className="mt-3 w-full text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  + Add to plan
                </button>

                {showPicker && (
                  <AddToPlanPicker
                    recipeId={recipe.id}
                    defaultType={recipe.type}
                    onClose={() => setAddPickerRecipeId(null)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
