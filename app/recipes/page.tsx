"use client";

import Link from "next/link";
import { recipeCatalog } from "../data";
import { useMealPlanner } from "../context";

export default function RecipesPage() {
  const { isFavorite, toggleFavorite } = useMealPlanner();

  const sorted = [...recipeCatalog].sort((a, b) => {
    const aFav = isFavorite(a.id) ? 0 : 1;
    const bFav = isFavorite(b.id) ? 0 : 1;
    if (aFav !== bFav) return aFav - bFav;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← Back to week
            </Link>
            <h1 className="text-2xl font-bold text-zinc-900 mt-2">Recipes</h1>
            <p className="text-sm text-zinc-500 mt-1">
              {recipeCatalog.length} recipes
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((recipe) => {
            const fav = isFavorite(recipe.id);
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
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
