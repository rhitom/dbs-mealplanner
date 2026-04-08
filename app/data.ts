export interface Meal {
  type: "breakfast" | "lunch" | "dinner";
  name: string;
  emoji: string;
}

export interface DayPlan {
  date: string; // YYYY-MM-DD
  meals: Meal[];
  note?: string;
}

// Current week: Mon Apr 6 – Sun Apr 12, 2026
export const weekData: DayPlan[] = [
  {
    date: "2026-04-06",
    meals: [
      { type: "breakfast", name: "Avocado Toast", emoji: "🥑" },
      { type: "lunch", name: "Caesar Salad", emoji: "🥗" },
      { type: "dinner", name: "Grilled Salmon", emoji: "🐟" },
    ],
    note: "Meal prep day",
  },
  {
    date: "2026-04-07",
    meals: [
      { type: "breakfast", name: "Greek Yogurt Bowl", emoji: "🥣" },
      { type: "lunch", name: "Turkey Wrap", emoji: "🌯" },
      { type: "dinner", name: "Chicken Stir-Fry", emoji: "🍳" },
    ],
  },
  {
    date: "2026-04-08",
    meals: [
      { type: "breakfast", name: "Oatmeal & Berries", emoji: "🫐" },
      { type: "lunch", name: "Tomato Soup", emoji: "🍅" },
      { type: "dinner", name: "Pasta Primavera", emoji: "🍝" },
    ],
    note: "Use up veggies before they go bad",
  },
  {
    date: "2026-04-09",
    meals: [
      { type: "breakfast", name: "Smoothie", emoji: "🥤" },
      { type: "lunch", name: "Grain Bowl", emoji: "🍚" },
      { type: "dinner", name: "Tacos", emoji: "🌮" },
    ],
  },
  {
    date: "2026-04-10",
    meals: [
      { type: "breakfast", name: "Eggs Benedict", emoji: "🍳" },
      { type: "lunch", name: "Pho", emoji: "🍜" },
      { type: "dinner", name: "Pizza Night", emoji: "🍕" },
    ],
    note: "Date night — make it fancy",
  },
  {
    date: "2026-04-11",
    meals: [
      { type: "breakfast", name: "Pancakes", emoji: "🥞" },
      { type: "lunch", name: "BLT Sandwich", emoji: "🥪" },
      { type: "dinner", name: "Beef Stew", emoji: "🥘" },
    ],
  },
  {
    date: "2026-04-12",
    meals: [
      { type: "breakfast", name: "French Toast", emoji: "🍞" },
      { type: "lunch", name: "Sushi", emoji: "🍣" },
      { type: "dinner", name: "Roast Chicken", emoji: "🍗" },
    ],
    note: "Sunday roast tradition",
  },
];
