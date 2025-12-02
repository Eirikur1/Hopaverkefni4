/**
 * Recipe Formatter Utility
 * 
 * Centralized logic for formatting recipe data consistently across the application.
 * Reduces code duplication and ensures uniform recipe presentation.
 */

interface RawRecipe {
  id: number;
  title: string;
  image: string;
  extendedIngredients?: any[];
  ingredientNames?: string[];
  usedIngredientCount?: number;
  totalIngredients?: number;
  readyInMinutes?: number;
  servings?: number;
}

interface FormattedRecipe {
  id: number;
  image: string;
  heading: string;
  ingredients: string;
  description: string;
  readyInMinutes: number;
  servings: number;
}

/**
 * Formats a raw recipe object into the format expected by ProductCard
 * 
 * @param recipe - Raw recipe data from API
 * @param showMatchedCount - Whether to show matched ingredient count (for ingredient search)
 * @returns Formatted recipe object
 */
export function formatRecipe(
  recipe: RawRecipe, 
  showMatchedCount: boolean = false
): FormattedRecipe {
  // Get ingredient count from various possible sources
  const ingredientCount = 
    recipe.extendedIngredients?.length || 
    recipe.totalIngredients || 
    0;

  // Get ingredient names and create description
  const ingredientNames = recipe.ingredientNames || [];
  const firstThree = ingredientNames.slice(0, 3).join(', ');
  const hasMore = ingredientNames.length > 3;
  const description = firstThree 
    ? (hasMore ? `${firstThree}...` : firstThree) 
    : "Delicious recipe";

  // Build ingredients text
  let ingredientsText = ingredientCount > 0 
    ? `${ingredientCount} Ingredients` 
    : "Recipe";

  // Add matched count if applicable (ingredient search)
  if (showMatchedCount && recipe.usedIngredientCount && recipe.usedIngredientCount > 0) {
    ingredientsText += ` · ${recipe.usedIngredientCount} matched`;
  }

  return {
    id: recipe.id,
    image: recipe.image,
    heading: recipe.title,
    ingredients: ingredientsText,
    description,
    readyInMinutes: recipe.readyInMinutes || 30,
    servings: recipe.servings || 4,
  };
}

/**
 * Formats an array of raw recipes
 * 
 * @param recipes - Array of raw recipe data
 * @param showMatchedCount - Whether to show matched ingredient count
 * @returns Array of formatted recipes
 */
export function formatRecipes(
  recipes: RawRecipe[], 
  showMatchedCount: boolean = false
): FormattedRecipe[] {
  return recipes.map(recipe => formatRecipe(recipe, showMatchedCount));
}

