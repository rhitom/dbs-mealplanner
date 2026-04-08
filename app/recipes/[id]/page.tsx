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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-xl text-foreground mb-2">
            Recipe not found
          </h1>
          <Link href="/recipes" className="text-accent hover:text-accent/80 text-sm">
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
    "rounded-lg border border-border px-3 py-2 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-transparent";

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href={backHref} className="text-sm text-accent hover:text-accent/80">
            {backLabel}
          </Link>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-4xl">{recipe.emoji}</span>
            <div>
              <h1 className="font-serif text-3xl text-foreground">{recipe.name}</h1>
              <p className="text-sm text-muted capitalize mt-0.5">
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
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-10">
        {/* Add to plan */}
        <section>
          {!showPicker && !submitted && (
            <button
              onClick={() => setShowPicker(true)}
              className="w-full bg-accent text-white text-sm font-medium py-3 rounded-xl hover:bg-accent/90 transition-colors"
            >
              + Add to Meal Plan
            </button>
          )}
          {submitted && (
            <div className="bg-sage-light border border-sage/20 text-sage text-sm rounded-xl px-4 py-3">
              Added to plan!
            </div>
          )}
          {showPicker && !submitted && (
            <form onSubmit={handleAdd} className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <p className="font-serif text-base text-foreground">Add to meal plan</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-muted uppercase tracking-widest mb-1.5">Date</label>
                  <input type="date" value={pickerDate} onChange={(e) => setPickerDate(e.target.value)} className={inputClass + " w-full"} required />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-muted uppercase tracking-widest mb-1.5">Meal</label>
                  <select value={pickerType} onChange={(e) => setPickerType(e.target.value as Meal["type"])} className={inputClass + " w-full"}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-accent text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-accent/90">
                  Add
                </button>
                <button type="button" onClick={() => setShowPicker(false)} className="text-sm text-muted hover:text-foreground">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>

        <section>
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-5">
            Ingredients
          </h2>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {recipe.ingredients.map((item, i) => (
              <div key={i} className="px-6 py-3.5 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-5">
            Instructions
          </h2>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="px-6 py-4 flex gap-4">
                <span className="text-sm font-serif text-accent shrink-0">
                  {i + 1}.
                </span>
                <p className="text-sm text-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
