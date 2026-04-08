export interface Meal {
  type: "breakfast" | "lunch" | "dinner";
  name: string;
  emoji: string;
  prepTime?: string;
}

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  type: "breakfast" | "lunch" | "dinner";
  prepTime: string;
  ingredients: string[];
  instructions: string[];
}

export interface TimeBlock {
  time: string;
  label: string;
}

export interface DayPlan {
  date: string; // YYYY-MM-DD
  meals: Meal[];
  note?: string;
  schedule?: TimeBlock[];
}

// Current week: Mon Apr 6 – Sun Apr 12, 2026
export const weekData: DayPlan[] = [
  {
    date: "2026-04-06",
    meals: [
      { type: "breakfast", name: "Avocado Toast", emoji: "🥑", prepTime: "10 min" },
      { type: "lunch", name: "Caesar Salad", emoji: "🥗", prepTime: "15 min" },
      { type: "dinner", name: "Grilled Salmon", emoji: "🐟", prepTime: "25 min" },
    ],
    note: "Meal prep day — chop veggies and marinate salmon ahead of time.",
    schedule: [
      { time: "7:30 AM", label: "Breakfast" },
      { time: "10:00 AM", label: "Meal prep session" },
      { time: "12:30 PM", label: "Lunch" },
      { time: "6:30 PM", label: "Dinner" },
    ],
  },
  {
    date: "2026-04-07",
    meals: [
      { type: "breakfast", name: "Greek Yogurt Bowl", emoji: "🥣", prepTime: "5 min" },
      { type: "lunch", name: "Turkey Wrap", emoji: "🌯", prepTime: "10 min" },
      { type: "dinner", name: "Chicken Stir-Fry", emoji: "🍳", prepTime: "20 min" },
    ],
    schedule: [
      { time: "8:00 AM", label: "Breakfast" },
      { time: "12:00 PM", label: "Lunch" },
      { time: "7:00 PM", label: "Dinner" },
    ],
  },
  {
    date: "2026-04-08",
    meals: [
      { type: "breakfast", name: "Oatmeal & Berries", emoji: "🫐", prepTime: "10 min" },
      { type: "lunch", name: "Tomato Soup", emoji: "🍅", prepTime: "20 min" },
      { type: "dinner", name: "Pasta Primavera", emoji: "🍝", prepTime: "25 min" },
    ],
    note: "Use up veggies before they go bad.",
    schedule: [
      { time: "7:30 AM", label: "Breakfast" },
      { time: "12:30 PM", label: "Lunch" },
      { time: "3:00 PM", label: "Grocery run — restock fruit" },
      { time: "7:00 PM", label: "Dinner" },
    ],
  },
  {
    date: "2026-04-09",
    meals: [
      { type: "breakfast", name: "Smoothie", emoji: "🥤", prepTime: "5 min" },
      { type: "lunch", name: "Grain Bowl", emoji: "🍚", prepTime: "15 min" },
      { type: "dinner", name: "Tacos", emoji: "🌮", prepTime: "20 min" },
    ],
    schedule: [
      { time: "8:00 AM", label: "Breakfast" },
      { time: "12:00 PM", label: "Lunch" },
      { time: "6:30 PM", label: "Dinner" },
    ],
  },
  {
    date: "2026-04-10",
    meals: [
      { type: "breakfast", name: "Eggs Benedict", emoji: "🍳", prepTime: "25 min" },
      { type: "lunch", name: "Pho", emoji: "🍜", prepTime: "30 min" },
      { type: "dinner", name: "Pizza Night", emoji: "🍕", prepTime: "45 min" },
    ],
    note: "Date night — make it fancy.",
    schedule: [
      { time: "9:00 AM", label: "Breakfast" },
      { time: "1:00 PM", label: "Lunch" },
      { time: "5:00 PM", label: "Start pizza dough" },
      { time: "7:30 PM", label: "Dinner" },
    ],
  },
  {
    date: "2026-04-11",
    meals: [
      { type: "breakfast", name: "Pancakes", emoji: "🥞", prepTime: "15 min" },
      { type: "lunch", name: "BLT Sandwich", emoji: "🥪", prepTime: "10 min" },
      { type: "dinner", name: "Beef Stew", emoji: "🥘", prepTime: "60 min" },
    ],
    schedule: [
      { time: "9:00 AM", label: "Breakfast" },
      { time: "12:30 PM", label: "Lunch" },
      { time: "4:00 PM", label: "Start beef stew (slow cook)" },
      { time: "7:00 PM", label: "Dinner" },
    ],
  },
  {
    date: "2026-04-12",
    meals: [
      { type: "breakfast", name: "French Toast", emoji: "🍞", prepTime: "15 min" },
      { type: "lunch", name: "Sushi", emoji: "🍣", prepTime: "40 min" },
      { type: "dinner", name: "Roast Chicken", emoji: "🍗", prepTime: "75 min" },
    ],
    note: "Sunday roast tradition. Leftovers for Monday lunch.",
    schedule: [
      { time: "9:30 AM", label: "Breakfast" },
      { time: "12:00 PM", label: "Lunch" },
      { time: "4:00 PM", label: "Prep & season chicken" },
      { time: "5:00 PM", label: "Chicken in oven" },
      { time: "6:30 PM", label: "Dinner" },
    ],
  },
];

export const recipeCatalog: Recipe[] = [
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    emoji: "🥑",
    type: "breakfast",
    prepTime: "10 min",
    ingredients: ["2 slices sourdough bread", "1 ripe avocado", "1 lemon", "Red pepper flakes", "Salt and pepper", "2 eggs (optional)"],
    instructions: ["Toast the bread until golden and crispy.", "Mash the avocado with lemon juice, salt, and pepper.", "Spread avocado on toast and top with red pepper flakes.", "Add a fried or poached egg on top if desired."],
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken Stir-Fry",
    emoji: "🍳",
    type: "dinner",
    prepTime: "20 min",
    ingredients: ["2 chicken breasts, sliced", "1 bell pepper", "1 cup broccoli florets", "2 tbsp soy sauce", "1 tbsp sesame oil", "1 clove garlic, minced", "Rice for serving"],
    instructions: ["Heat sesame oil in a wok over high heat.", "Cook chicken until golden, about 5 minutes.", "Add garlic, bell pepper, and broccoli. Stir-fry 3 minutes.", "Pour in soy sauce, toss to coat, and serve over rice."],
  },
  {
    id: "pasta-primavera",
    name: "Pasta Primavera",
    emoji: "🍝",
    type: "dinner",
    prepTime: "25 min",
    ingredients: ["12 oz penne pasta", "1 zucchini, diced", "1 cup cherry tomatoes", "1/2 cup peas", "2 tbsp olive oil", "1/4 cup parmesan", "Fresh basil"],
    instructions: ["Cook pasta according to package directions.", "Sauté zucchini and tomatoes in olive oil until tender.", "Add peas and cooked pasta to the pan.", "Toss with parmesan and fresh basil. Season to taste."],
  },
  {
    id: "greek-yogurt-bowl",
    name: "Greek Yogurt Bowl",
    emoji: "🥣",
    type: "breakfast",
    prepTime: "5 min",
    ingredients: ["1 cup Greek yogurt", "1/4 cup granola", "1/2 cup mixed berries", "1 tbsp honey", "1 tbsp chia seeds"],
    instructions: ["Spoon yogurt into a bowl.", "Top with granola, berries, and chia seeds.", "Drizzle with honey and serve."],
  },
  {
    id: "tacos",
    name: "Tacos",
    emoji: "🌮",
    type: "dinner",
    prepTime: "20 min",
    ingredients: ["1 lb ground beef", "1 packet taco seasoning", "8 small tortillas", "1 cup shredded lettuce", "1/2 cup shredded cheese", "Salsa and sour cream"],
    instructions: ["Brown the ground beef in a skillet over medium heat.", "Drain fat and stir in taco seasoning with 1/4 cup water.", "Simmer 5 minutes until thickened.", "Serve in warm tortillas with toppings."],
  },
  {
    id: "tomato-soup",
    name: "Tomato Soup",
    emoji: "🍅",
    type: "lunch",
    prepTime: "20 min",
    ingredients: ["1 can (28 oz) crushed tomatoes", "1 onion, diced", "2 cloves garlic", "1 cup vegetable broth", "1/4 cup heavy cream", "2 tbsp butter", "Fresh basil"],
    instructions: ["Melt butter and sauté onion and garlic until soft.", "Add crushed tomatoes and broth. Simmer 15 minutes.", "Blend until smooth with an immersion blender.", "Stir in cream, garnish with basil, and serve."],
  },
  {
    id: "eggs-benedict",
    name: "Eggs Benedict",
    emoji: "🍳",
    type: "breakfast",
    prepTime: "25 min",
    ingredients: ["4 eggs", "2 English muffins, split", "4 slices Canadian bacon", "3 egg yolks (for hollandaise)", "1/2 cup melted butter", "1 tbsp lemon juice"],
    instructions: ["Make hollandaise: whisk yolks and lemon juice over a double boiler, slowly drizzle in melted butter.", "Toast English muffins and warm Canadian bacon in a skillet.", "Poach eggs in simmering water with a splash of vinegar for 3 minutes.", "Assemble: muffin, bacon, poached egg, hollandaise on top."],
  },
  {
    id: "beef-stew",
    name: "Beef Stew",
    emoji: "🥘",
    type: "dinner",
    prepTime: "60 min",
    ingredients: ["1.5 lbs beef chuck, cubed", "3 potatoes, diced", "3 carrots, sliced", "1 onion, chopped", "2 cups beef broth", "2 tbsp tomato paste", "2 tbsp flour", "Thyme and bay leaf"],
    instructions: ["Toss beef in flour and brown in a Dutch oven with oil.", "Add onion and cook until softened.", "Stir in tomato paste, broth, potatoes, carrots, thyme, and bay leaf.", "Cover and simmer for 45 minutes until beef is tender."],
  },
  {
    id: "smoothie",
    name: "Berry Smoothie",
    emoji: "🥤",
    type: "breakfast",
    prepTime: "5 min",
    ingredients: ["1 banana", "1 cup frozen mixed berries", "1/2 cup Greek yogurt", "1 cup almond milk", "1 tbsp honey"],
    instructions: ["Add all ingredients to a blender.", "Blend on high until smooth, about 30 seconds.", "Pour into a glass and serve immediately."],
  },
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    emoji: "🐟",
    type: "dinner",
    prepTime: "25 min",
    ingredients: ["4 salmon fillets", "2 tbsp olive oil", "2 lemons", "2 cloves garlic, minced", "Fresh dill", "Salt and pepper"],
    instructions: ["Mix olive oil, lemon juice, garlic, salt, and pepper for a marinade.", "Marinate salmon for 10 minutes.", "Grill over medium-high heat, 4-5 minutes per side.", "Garnish with fresh dill and lemon slices."],
  },
];
