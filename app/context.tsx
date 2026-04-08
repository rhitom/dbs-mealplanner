"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { weekData as initialData, DayPlan, Meal, TimeBlock } from "./data";

interface MealPlannerContextType {
  days: DayPlan[];
  favorites: Set<string>;
  addMealToPlan: (date: string, recipeId: string, mealType: Meal["type"]) => void;
  addNote: (date: string, note: string) => void;
  addTimeBlock: (date: string, block: TimeBlock) => void;
  addLeftover: (fromDate: string, mealIndex: number, toDate: string, toMealType: Meal["type"]) => void;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

const MealPlannerContext = createContext<MealPlannerContextType | null>(null);

function ensureDayExists(days: DayPlan[], date: string): DayPlan[] {
  return days.find((d) => d.date === date)
    ? days
    : [...days, { date, meals: [], schedule: [] }];
}

export function MealPlannerProvider({ children }: { children: ReactNode }) {
  const [days, setDays] = useState<DayPlan[]>(initialData);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(["avocado-toast", "tacos", "grilled-salmon"])
  );

  function addMealToPlan(date: string, recipeId: string, mealType: Meal["type"]) {
    setDays((prev) => {
      const updated = ensureDayExists(prev, date);
      return updated.map((d) => {
        if (d.date !== date) return d;
        // Replace existing meal of same type, or add
        const meals = d.meals.filter((m) => m.type !== mealType);
        return { ...d, meals: [...meals, { type: mealType, recipeId }] };
      });
    });
  }

  function addNote(date: string, note: string) {
    setDays((prev) => {
      const updated = ensureDayExists(prev, date);
      return updated.map((d) =>
        d.date === date
          ? { ...d, note: d.note ? `${d.note}\n${note}` : note }
          : d
      );
    });
  }

  function addTimeBlock(date: string, block: TimeBlock) {
    setDays((prev) => {
      const updated = ensureDayExists(prev, date);
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

  function addLeftover(fromDate: string, mealIndex: number, toDate: string, toMealType: Meal["type"]) {
    setDays((prev) => {
      const sourceDay = prev.find((d) => d.date === fromDate);
      if (!sourceDay || !sourceDay.meals[mealIndex]) return prev;

      const originalMeal = sourceDay.meals[mealIndex];
      const leftoverMeal: Meal = {
        type: toMealType,
        recipeId: originalMeal.recipeId,
        isLeftover: true,
      };

      let updated = ensureDayExists(prev, toDate);
      return updated.map((d) => {
        if (d.date !== toDate) return d;
        const meals = d.meals.filter((m) => m.type !== toMealType);
        return { ...d, meals: [...meals, leftoverMeal] };
      });
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
      value={{ days, favorites, addMealToPlan, addNote, addTimeBlock, addLeftover, toggleFavorite, isFavorite }}
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
