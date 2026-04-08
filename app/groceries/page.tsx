"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { recipeCatalog, getRecipe } from "../data";
import { useMealPlanner } from "../context";
import type { Meal } from "../data";

// ─── Ingredient parsing & aggregation ────────────────────────────────────────

interface ParsedIngredient {
  qty: number;
  unit: string;
  name: string;
  raw: string;
  recipeId: string;
}

interface GroceryItem {
  name: string;
  totalLine: string;
  breakdown: { raw: string; recipeName: string }[];
}

const UNITS = [
  "cups?", "tbsp", "tsp", "oz", "lbs?", "lb", "cloves?",
  "slices?", "cans?", "heads?", "packets?",
];
const UNIT_RE = new RegExp(`^(${UNITS.join("|")})\\b`, "i");

function singularize(s: string): string {
  if (s.endsWith("ies")) return s.slice(0, -3) + "y";
  if (s.endsWith("ves")) return s.slice(0, -3) + "f";
  if (s.endsWith("ses") || s.endsWith("xes") || s.endsWith("ches") || s.endsWith("shes"))
    return s.slice(0, -2);
  if (s.endsWith("s") && !s.endsWith("ss")) return s.slice(0, -1);
  return s;
}

function parseFraction(s: string): number {
  s = s.trim();
  if (s.includes("/")) {
    const [n, d] = s.split("/").map(Number);
    return d ? n / d : 0;
  }
  return parseFloat(s) || 0;
}

function parseIngredient(raw: string, recipeId: string): ParsedIngredient {
  let s = raw.trim();
  let qty = 0;
  const qtyMatch = s.match(/^(\d+(?:\.\d+)?)\s*/);
  if (qtyMatch) {
    qty = parseFraction(qtyMatch[1]);
    s = s.slice(qtyMatch[0].length);
    const fracMatch = s.match(/^(\d+\/\d+)\s*/);
    if (fracMatch) {
      qty += parseFraction(fracMatch[1]);
      s = s.slice(fracMatch[0].length);
    }
  } else {
    const fracMatch = s.match(/^(\d+\/\d+)\s*/);
    if (fracMatch) {
      qty = parseFraction(fracMatch[1]);
      s = s.slice(fracMatch[0].length);
    }
  }

  let unit = "";
  const unitMatch = s.match(UNIT_RE);
  if (unitMatch) {
    unit = unitMatch[1].toLowerCase().replace(/s$/, "");
    s = s.slice(unitMatch[0].length).trim();
    const parenMatch = s.match(/^\([^)]*\)\s*/);
    if (parenMatch) s = s.slice(parenMatch[0].length);
  }

  let name = s
    .toLowerCase()
    .replace(/,.*$/, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const words = name.split(" ");
  words[words.length - 1] = singularize(words[words.length - 1]);
  name = words.join(" ");

  return { qty, unit, name, raw, recipeId };
}

function formatFraction(n: number): string {
  if (n === 0) return "";
  const whole = Math.floor(n);
  const remainder = +(n - whole).toFixed(4);
  const fracs: [number, string][] = [
    [0.25, "1/4"], [0.3333, "1/3"], [0.5, "1/2"],
    [0.6667, "2/3"], [0.75, "3/4"],
  ];
  let fracStr = "";
  for (const [val, str] of fracs) {
    if (Math.abs(remainder - val) < 0.06) { fracStr = str; break; }
  }
  if (whole > 0 && fracStr) return `${whole} ${fracStr}`;
  if (whole > 0 && remainder < 0.06) return `${whole}`;
  if (whole > 0) return n % 1 === 0 ? `${n}` : n.toFixed(1);
  if (fracStr) return fracStr;
  return n % 1 === 0 ? `${n}` : n.toFixed(1);
}

function prettyName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function buildGroceryList(recipeIds: string[]): GroceryItem[] {
  const all: ParsedIngredient[] = [];
  for (const id of recipeIds) {
    const recipe = getRecipe(id);
    if (!recipe) continue;
    for (const raw of recipe.ingredients) {
      all.push(parseIngredient(raw, id));
    }
  }

  const groups = new Map<string, ParsedIngredient[]>();
  for (const p of all) {
    if (!groups.has(p.name)) groups.set(p.name, []);
    groups.get(p.name)!.push(p);
  }

  const items: GroceryItem[] = [];
  for (const [name, entries] of groups) {
    const byUnit = new Map<string, number>();
    for (const e of entries) {
      if (e.qty > 0) {
        byUnit.set(e.unit, (byUnit.get(e.unit) || 0) + e.qty);
      }
    }

    const parts: string[] = [];
    for (const [unit, total] of byUnit) {
      const f = formatFraction(total);
      parts.push(unit ? `${f} ${unit}` : f);
    }

    let totalLine: string;
    if (parts.length > 0) {
      totalLine = `${parts.join(" + ")} ${prettyName(name)}`;
    } else {
      totalLine = prettyName(name);
    }

    const breakdown = entries.map((e) => ({
      raw: e.raw,
      recipeName: getRecipe(e.recipeId)?.name || e.recipeId,
    }));

    items.push({ name, totalLine, breakdown });
  }

  items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

// ─── Weekly planner types ────────────────────────────────────────────────────

const WEEK_DATES = [
  "2026-04-06", "2026-04-07", "2026-04-08", "2026-04-09",
  "2026-04-10", "2026-04-11", "2026-04-12",
];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEAL_TYPES: Meal["type"][] = ["breakfast", "lunch", "dinner"];

interface WeekSlot {
  date: string;
  type: Meal["type"];
  recipeId: string | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function GroceriesPage() {
  const { days } = useMealPlanner();

  const [weekSlots, setWeekSlots] = useState<WeekSlot[]>(() => {
    const slots: WeekSlot[] = [];
    for (const date of WEEK_DATES) {
      for (const type of MEAL_TYPES) {
        const day = days.find((d) => d.date === date);
        const meal = day?.meals.find((m) => m.type === type);
        slots.push({ date, type, recipeId: meal?.recipeId || null });
      }
    }
    return slots;
  });

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [editingSlot, setEditingSlot] = useState<string | null>(null);

  const groceryList = useMemo(() => {
    const ids: string[] = [];
    for (const slot of weekSlots) {
      if (slot.recipeId) ids.push(slot.recipeId);
    }
    return buildGroceryList(ids);
  }, [weekSlots]);

  function setSlotRecipe(date: string, type: Meal["type"], recipeId: string | null) {
    setWeekSlots((prev) =>
      prev.map((s) =>
        s.date === date && s.type === type ? { ...s, recipeId } : s
      )
    );
    setEditingSlot(null);
  }

  function toggleChecked(key: string) {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const checkedCount = checkedItems.size;
  const totalCount = groceryList.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-accent hover:text-accent/80">
            ← Back to week
          </Link>
          <h1 className="font-serif text-3xl text-foreground mt-3">Grocery List</h1>
          <p className="text-sm text-muted mt-1">
            Plan your meals for the week, then check off groceries as you shop
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left column: Weekly meal preview */}
          <section>
            <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-5">
              Weekly Meals
            </h2>
            <div className="space-y-3">
              {WEEK_DATES.map((date, di) => (
                <div key={date} className="bg-card rounded-2xl border border-border p-5">
                  <h3 className="font-serif text-sm text-foreground mb-3">
                    {DAY_LABELS[di]}{" "}
                    <span className="font-sans text-muted text-xs">
                      {new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {MEAL_TYPES.map((type) => {
                      const slot = weekSlots.find((s) => s.date === date && s.type === type)!;
                      const recipe = slot.recipeId ? getRecipe(slot.recipeId) : null;
                      const slotKey = `${date}-${type}`;
                      const isEditing = editingSlot === slotKey;

                      return (
                        <div key={type} className="flex items-center gap-3">
                          <span className="text-xs text-muted w-16 capitalize shrink-0 tracking-wide">{type}</span>
                          {isEditing ? (
                            <div className="flex-1">
                              <select
                                autoFocus
                                value={slot.recipeId || ""}
                                onChange={(e) => setSlotRecipe(date, type, e.target.value || null)}
                                onBlur={() => setEditingSlot(null)}
                                className="w-full rounded-lg border border-border px-2 py-1.5 text-xs text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-accent/40"
                              >
                                <option value="">— Empty —</option>
                                {recipeCatalog.map((r) => (
                                  <option key={r.id} value={r.id}>
                                    {r.emoji} {r.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingSlot(slotKey)}
                              className="flex-1 text-left text-xs py-1.5 px-2.5 rounded-lg hover:bg-background transition-colors"
                            >
                              {recipe ? (
                                <span className="text-foreground">
                                  {recipe.emoji} {recipe.name}
                                </span>
                              ) : (
                                <span className="text-muted/40 italic">+ Add meal</span>
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right column: Grocery checklist */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-medium text-muted uppercase tracking-widest">
                Shopping List ({checkedCount}/{totalCount})
              </h2>
              {checkedCount > 0 && (
                <button
                  onClick={() => setCheckedItems(new Set())}
                  className="text-xs text-muted hover:text-accent transition-colors"
                >
                  Uncheck all
                </button>
              )}
            </div>

            {groceryList.length > 0 ? (
              <div className="bg-card rounded-2xl border border-border divide-y divide-border">
                {groceryList.map(({ name, totalLine, breakdown }) => {
                  const checked = checkedItems.has(name);
                  const hasMultiple = breakdown.length > 1;
                  return (
                    <label
                      key={name}
                      className="flex items-start gap-3 px-6 py-3.5 cursor-pointer hover:bg-background/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleChecked(name)}
                        className="mt-0.5 h-4 w-4 rounded border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm ${checked ? "line-through text-muted/50" : "text-foreground"}`}>
                          {totalLine}
                        </span>
                        {hasMultiple && (
                          <ul className="mt-1 space-y-0.5">
                            {breakdown.map((b, i) => (
                              <li key={i} className={`text-xs ${checked ? "line-through text-muted/30" : "text-muted"}`}>
                                {b.raw} — <span className="italic">{b.recipeName}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="bg-card border border-dashed border-border rounded-2xl p-6 text-center">
                <p className="text-sm text-muted italic">
                  Add meals to your weekly plan to generate a grocery list.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
