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
      <div className="mt-3 bg-sage-light border border-sage/20 rounded-xl px-3 py-2 text-xs text-sage">
        Added to plan!
      </div>
    );
  }

  const inputClass =
    "rounded-lg border border-border px-2 py-1.5 text-xs text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-transparent";

  return (
    <form onClick={(e) => e.preventDefault()} onSubmit={handleSubmit} className="mt-3 bg-background border border-border rounded-xl p-3 space-y-2">
      <p className="text-xs font-medium text-foreground">Add to meal plan:</p>
      <div className="flex gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} required />
        <select value={mealType} onChange={(e) => setMealType(e.target.value as Meal["type"])} className={inputClass}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-accent text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-accent/90">
          Add
        </button>
        <button type="button" onClick={onClose} className="text-xs text-muted hover:text-foreground">
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
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm text-accent hover:text-accent/80">
            ← Back to week
          </Link>
          <h1 className="font-serif text-3xl text-foreground mt-3">Recipes</h1>
          <p className="text-sm text-muted mt-1">
            {recipeCatalog.length} recipes in your collection
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((recipe) => {
            const fav = isFavorite(recipe.id);
            const showPicker = addPickerRecipeId === recipe.id;
            return (
              <div
                key={recipe.id}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all relative"
              >
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className="absolute top-4 right-4 text-xl transition-transform hover:scale-110"
                  aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                >
                  {fav ? "❤️" : "🤍"}
                </button>

                <Link href={`/recipes/${recipe.id}`} className="block">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl mb-4">{recipe.emoji}</span>
                    <p className="font-serif text-base text-foreground">
                      {recipe.name}
                    </p>
                    <p className="text-xs text-muted capitalize mt-1 tracking-wide">
                      {recipe.type}
                    </p>
                    <p className="text-xs text-muted/70 mt-2">
                      ⏱ {recipe.prepTime}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => setAddPickerRecipeId(showPicker ? null : recipe.id)}
                  className="mt-4 w-full text-xs text-accent hover:text-accent/80 font-medium transition-colors"
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
