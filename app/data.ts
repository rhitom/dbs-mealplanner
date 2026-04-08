export interface Meal {
  type: "breakfast" | "lunch" | "dinner";
  recipeId: string;
  isLeftover?: boolean;
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
    id: "greek-yogurt-bowl",
    name: "Greek Yogurt Bowl",
    emoji: "🥣",
    type: "breakfast",
    prepTime: "5 min",
    ingredients: ["1 cup Greek yogurt", "1/4 cup granola", "1/2 cup mixed berries", "1 tbsp honey", "1 tbsp chia seeds"],
    instructions: ["Spoon yogurt into a bowl.", "Top with granola, berries, and chia seeds.", "Drizzle with honey and serve."],
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
    id: "eggs-benedict",
    name: "Eggs Benedict",
    emoji: "🍳",
    type: "breakfast",
    prepTime: "25 min",
    ingredients: ["4 eggs", "2 English muffins, split", "4 slices Canadian bacon", "3 egg yolks (for hollandaise)", "1/2 cup melted butter", "1 tbsp lemon juice"],
    instructions: ["Make hollandaise: whisk yolks and lemon juice over a double boiler, slowly drizzle in melted butter.", "Toast English muffins and warm Canadian bacon in a skillet.", "Poach eggs in simmering water with a splash of vinegar for 3 minutes.", "Assemble: muffin, bacon, poached egg, hollandaise on top."],
  },
  {
    id: "pancakes",
    name: "Pancakes",
    emoji: "🥞",
    type: "breakfast",
    prepTime: "15 min",
    ingredients: ["1.5 cups flour", "2 tbsp sugar", "1 tbsp baking powder", "1 egg", "1.25 cups milk", "3 tbsp melted butter", "Maple syrup"],
    instructions: ["Whisk flour, sugar, and baking powder together.", "Mix in egg, milk, and melted butter until just combined.", "Pour 1/4 cup batter onto a hot greased griddle. Flip when bubbles form.", "Serve stacked with butter and maple syrup."],
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
    id: "caesar-salad",
    name: "Caesar Salad",
    emoji: "🥗",
    type: "lunch",
    prepTime: "15 min",
    ingredients: ["1 head romaine lettuce", "1/4 cup Caesar dressing", "1/4 cup shaved parmesan", "1 cup croutons", "1 lemon", "Black pepper"],
    instructions: ["Chop romaine and place in a large bowl.", "Toss with Caesar dressing and a squeeze of lemon.", "Top with parmesan, croutons, and fresh black pepper.", "Serve immediately."],
  },
  {
    id: "grain-bowl",
    name: "Grain Bowl",
    emoji: "🍚",
    type: "lunch",
    prepTime: "15 min",
    ingredients: ["1 cup cooked quinoa", "1/2 cup roasted chickpeas", "1 cup mixed greens", "1/2 avocado, sliced", "2 tbsp tahini dressing", "Cherry tomatoes"],
    instructions: ["Arrange quinoa as the base in a bowl.", "Top with chickpeas, greens, avocado, and tomatoes.", "Drizzle with tahini dressing.", "Toss gently and serve."],
  },
  {
    id: "turkey-wrap",
    name: "Turkey Wrap",
    emoji: "🌯",
    type: "lunch",
    prepTime: "10 min",
    ingredients: ["2 large flour tortillas", "6 slices deli turkey", "1/2 cup shredded lettuce", "1 tomato, sliced", "2 tbsp mayo or mustard", "2 slices Swiss cheese"],
    instructions: ["Lay tortillas flat and spread with mayo or mustard.", "Layer turkey, cheese, lettuce, and tomato.", "Roll up tightly, tucking in the sides.", "Slice in half diagonally and serve."],
  },
  {
    id: "pho",
    name: "Pho",
    emoji: "🍜",
    type: "lunch",
    prepTime: "30 min",
    ingredients: ["4 cups beef broth", "8 oz rice noodles", "1/2 lb beef sirloin, thinly sliced", "1 onion, halved", "2 star anise", "Bean sprouts, basil, lime, sriracha"],
    instructions: ["Char onion under the broiler for 5 minutes.", "Simmer broth with charred onion and star anise for 20 minutes. Strain.", "Cook rice noodles according to package. Divide into bowls.", "Ladle hot broth over noodles and raw beef (it cooks in the broth). Top with garnishes."],
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
    id: "tacos",
    name: "Tacos",
    emoji: "🌮",
    type: "dinner",
    prepTime: "20 min",
    ingredients: ["1 lb ground beef", "1 packet taco seasoning", "8 small tortillas", "1 cup shredded lettuce", "1/2 cup shredded cheese", "Salsa and sour cream"],
    instructions: ["Brown the ground beef in a skillet over medium heat.", "Drain fat and stir in taco seasoning with 1/4 cup water.", "Simmer 5 minutes until thickened.", "Serve in warm tortillas with toppings."],
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
    id: "grilled-salmon",
    name: "Grilled Salmon",
    emoji: "🐟",
    type: "dinner",
    prepTime: "25 min",
    ingredients: ["4 salmon fillets", "2 tbsp olive oil", "2 lemons", "2 cloves garlic, minced", "Fresh dill", "Salt and pepper"],
    instructions: ["Mix olive oil, lemon juice, garlic, salt, and pepper for a marinade.", "Marinate salmon for 10 minutes.", "Grill over medium-high heat, 4-5 minutes per side.", "Garnish with fresh dill and lemon slices."],
  },
];

// Helper to look up a recipe by ID
export function getRecipe(id: string): Recipe | undefined {
  return recipeCatalog.find((r) => r.id === id);
}

// Current week: Mon Apr 6 – Sun Apr 12, 2026
export const weekData: DayPlan[] = [
  {
    date: "2026-04-06",
    meals: [
      { type: "breakfast", recipeId: "avocado-toast" },
      { type: "lunch", recipeId: "caesar-salad" },
      { type: "dinner", recipeId: "grilled-salmon" },
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
      { type: "breakfast", recipeId: "greek-yogurt-bowl" },
      { type: "lunch", recipeId: "turkey-wrap" },
      { type: "dinner", recipeId: "chicken-stir-fry" },
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
      { type: "breakfast", recipeId: "smoothie" },
      { type: "lunch", recipeId: "tomato-soup" },
      { type: "dinner", recipeId: "pasta-primavera" },
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
      { type: "breakfast", recipeId: "pancakes" },
      { type: "lunch", recipeId: "grain-bowl" },
      { type: "dinner", recipeId: "tacos" },
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
      { type: "breakfast", recipeId: "eggs-benedict" },
      { type: "lunch", recipeId: "pho" },
      { type: "dinner", recipeId: "chicken-stir-fry" },
    ],
    note: "Date night — make it fancy.",
    schedule: [
      { time: "9:00 AM", label: "Breakfast" },
      { time: "1:00 PM", label: "Lunch" },
      { time: "7:30 PM", label: "Dinner" },
    ],
  },
  {
    date: "2026-04-11",
    meals: [
      { type: "breakfast", recipeId: "avocado-toast" },
      { type: "lunch", recipeId: "caesar-salad" },
      { type: "dinner", recipeId: "beef-stew" },
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
      { type: "breakfast", recipeId: "greek-yogurt-bowl" },
      { type: "lunch", recipeId: "grain-bowl" },
      { type: "dinner", recipeId: "grilled-salmon" },
    ],
    note: "Sunday roast tradition. Leftovers for Monday lunch.",
    schedule: [
      { time: "9:30 AM", label: "Breakfast" },
      { time: "12:00 PM", label: "Lunch" },
      { time: "4:00 PM", label: "Prep & season salmon" },
      { time: "6:30 PM", label: "Dinner" },
    ],
  },
];
