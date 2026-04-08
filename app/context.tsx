"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { weekData as initialData, DayPlan, Meal, TimeBlock } from "./data";

interface MealPlannerContextType {
  days: DayPlan[];
  favorites: Set<string>;
  addMeal: (date: string, meal: Meal) => void;
  addNote: (date: string, note: string) => void;
  addTimeBlock: (date: string, block: TimeBlock) => void;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

const MealPlannerContext = createContext<MealPlannerContextType | null>(null);

export function MealPlannerProvider({ children }: { children: ReactNode }) {
  const [days, setDays] = useState<DayPlan[]>(initialData);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(["avocado-toast", "tacos", "grilled-salmon"])
  );

  function addMeal(date: string, meal: Meal) {
    setDays((prev) => {
      const updated = prev.find((d) => d.date === date)
        ? prev
        : [...prev, { date, meals: [], schedule: [] }];
      return updated.map((d) =>
        d.date === date ? { ...d, meals: [...d.meals, meal] } : d
      );
    });
  }

  function addNote(date: string, note: string) {
    setDays((prev) => {
      const updated = prev.find((d) => d.date === date)
        ? prev
        : [...prev, { date, meals: [], schedule: [] }];
      return updated.map((d) =>
        d.date === date
          ? { ...d, note: d.note ? `${d.note}\n${note}` : note }
          : d
      );
    });
  }

  function addTimeBlock(date: string, block: TimeBlock) {
    setDays((prev) => {
      const updated = prev.find((d) => d.date === date)
        ? prev
        : [...prev, { date, meals: [], schedule: [] }];
      return updated.map((d) =>
        d.date === date
          ? {
              ...d,
              schedule: [...(d.schedule || []), block].sort((a, b) =>
                a.time.localeCompare(b.time)
              ),
            }
          : d
      );
    });
  }

  function toggleFavorite(recipeId: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
      } else {
        next.add(recipeId);
      }
      return next;
    });
  }

  function isFavorite(recipeId: string) {
    return favorites.has(recipeId);
  }

  return (
    <MealPlannerContext.Provider
      value={{ days, favorites, addMeal, addNote, addTimeBlock, toggleFavorite, isFavorite }}
    >
      {children}
    </MealPlannerContext.Provider>
  );
}

export function useMealPlanner() {
  const ctx = useContext(MealPlannerContext);
  if (!ctx) throw new Error("useMealPlanner must be used within MealPlannerProvider");
  return ctx;
}
