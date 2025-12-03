/**
 * Recipe Defaults Utility
 *
 * Generates realistic default values for recipe data not provided by the API.
 * Uses the recipe ID as a seed for consistent but varied results.
 */

/**
 * Generate a cooking time based on ingredient count
 * Uses ingredient count to estimate realistic cooking times
 *
 * @param ingredientCount - Number of ingredients in the recipe
 * @param recipeId - Recipe ID for consistent randomization
 * @returns Cooking time in minutes
 */
export function generateCookingTime(
  ingredientCount: number,
  recipeId?: number
): number {
  // Base time on ingredient count
  let baseTime = 15;

  if (ingredientCount <= 5) {
    baseTime = 15; // Quick recipes
  } else if (ingredientCount <= 10) {
    baseTime = 30; // Medium recipes
  } else if (ingredientCount <= 15) {
    baseTime = 45; // Complex recipes
  } else {
    baseTime = 60; // Very complex recipes
  }

  // Add some variation based on recipe ID if provided
  if (recipeId) {
    const variation = (recipeId % 3) * 5; // 0, 5, or 10 minute variation
    baseTime += variation;
  }

  return baseTime;
}

/**
 * Generate servings count based on ingredient count
 * More ingredients typically means more servings
 *
 * @param ingredientCount - Number of ingredients in the recipe
 * @param recipeId - Recipe ID for consistent randomization
 * @returns Number of servings
 */
export function generateServings(
  ingredientCount: number,
  recipeId?: number
): number {
  // Base servings on ingredient count
  let servings = 4; // Default

  if (ingredientCount <= 5) {
    servings = 2; // Small/quick recipes usually 2 servings
  } else if (ingredientCount <= 12) {
    servings = 4; // Standard recipes
  } else {
    servings = 6; // Large recipes
  }

  // Add variation based on recipe ID
  if (recipeId && recipeId % 5 === 0) {
    servings += 2; // Some recipes serve more people
  }

  return servings;
}

/**
 * Generate both cooking time and servings for a recipe
 *
 * @param ingredientCount - Number of ingredients
 * @param recipeId - Recipe ID for consistency
 * @returns Object with readyInMinutes and servings
 */
export function generateRecipeDefaults(
  ingredientCount: number,
  recipeId?: number
): { readyInMinutes: number; servings: number } {
  return {
    readyInMinutes: generateCookingTime(ingredientCount, recipeId),
    servings: generateServings(ingredientCount, recipeId),
  };
}
