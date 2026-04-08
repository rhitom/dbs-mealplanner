"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { recipeCatalog } from "../../data";
import { useMealPlanner } from "../../context";

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { isFavorite, toggleFavorite } = useMealPlanner();
  const backHref = searchParams.get("from") || "/recipes";
  const backLabel = searchParams.get("from") ? "← Back to day" : "← Back to recipes";
  const recipe = recipeCatalog.find((r) => r.id === id);

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
