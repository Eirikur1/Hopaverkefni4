/**
 * API Service
 *
 * This file contains functions for making API calls.
 * Centralize your API logic here for better maintainability.
 */

import type { ApiResponse, ApiError } from "../types";

// Base URL for your API (update this with your actual API)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

/**
 * Generic fetch wrapper with error handling
 *
 * @param endpoint - API endpoint to call
 * @param options - Fetch options
 * @returns Promise with typed response
 */
export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `API Error: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }

    const data = await response.json();

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

/**
 * Example: Fetch data from API
 *
 * @example
 * const result = await fetchExampleData();
 */
export async function fetchExampleData<T>(): Promise<T> {
  const response = await fetchApi<T>("/example-endpoint");
  return response.data;
}

// Recipe API Configuration - TheMealDB (Free API)
// Using free API key '1' - built into the URL
const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Helper function to count ingredients in a meal
 */
function countIngredients(meal: any): number {
  let count = 0;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim()) {
      count++;
    }
  }
  return count;
}

/**
 * Search recipes by query
 */
export async function searchRecipes(query: string, number: number = 12, offset: number = 0): Promise<any> {
  try {
    const response = await fetch(
      `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`
    );
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data.status === 'failure' || !response.ok) {
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }
    
    // TheMealDB returns {meals: [...]} or {meals: null} if no results
    // Convert to Spoonacular-like format for consistency
    return {
      results: data.meals ? data.meals.slice(offset, offset + number).map((meal: any) => ({
        id: parseInt(meal.idMeal),
        title: meal.strMeal,
        image: meal.strMealThumb,
        summary: meal.strInstructions,
        extendedIngredients: Array.from({ length: countIngredients(meal) })
      })) : [],
      totalResults: data.meals ? data.meals.length : 0
    };
  } catch (error) {
    console.error('Recipe search error:', error);
    throw error;
  }
}

/**
 * Search recipes by ingredients
 */
export async function searchRecipesByIngredients(
  ingredients: string[],
  number: number = 12,
  offset: number = 0
): Promise<any> {
  try {
    // TheMealDB only supports single ingredient filtering in free version
    // Use the first ingredient for now
    const mainIngredient = ingredients[0];
    const response = await fetch(
      `${MEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(mainIngredient)}`
    );
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data.status === 'failure' || !response.ok) {
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }
    
    // Get the meals for this page
    const meals = data.meals || [];
    const mealsForPage = meals.slice(offset, offset + number);
    
    // Fetch full details for each meal to get accurate ingredient counts
    const detailedMeals = await Promise.all(
      mealsForPage.map(async (meal: any) => {
        try {
          const detailResponse = await fetch(
            `${MEALDB_BASE_URL}/lookup.php?i=${meal.idMeal}`
          );
          const detailData = await detailResponse.json();
          
          if (detailData.meals && detailData.meals.length > 0) {
            const fullMeal = detailData.meals[0];
            const ingredientCount = countIngredients(fullMeal);
            
            // Count how many of the searched ingredients are in this recipe
            const searchIngredients = ingredients.map(i => i.toLowerCase().trim());
            let matchedCount = 0;
            const matchedIngredients = new Set<string>();
            
            for (let i = 1; i <= 20; i++) {
              const ingredient = fullMeal[`strIngredient${i}`];
              if (ingredient && ingredient.trim()) {
                const ingredientLower = ingredient.toLowerCase().trim();
                
                // Check if any search ingredient matches this recipe ingredient
                for (const searchIngredient of searchIngredients) {
                  // Skip if we already matched this search ingredient
                  if (matchedIngredients.has(searchIngredient)) continue;
                  
                  // Match if:
                  // 1. Exact match (e.g., "rice" === "rice")
                  // 2. Recipe ingredient contains search term as a word (e.g., "basmati rice" contains "rice")
                  // 3. Search term contains recipe ingredient as a word (e.g., "chicken breast" search matches "chicken")
                  const ingredientWords = ingredientLower.split(/\s+/);
                  const searchWords = searchIngredient.split(/\s+/);
                  
                  const hasMatch = 
                    ingredientLower === searchIngredient ||
                    ingredientWords.some(word => searchWords.includes(word) && word.length > 2) ||
                    searchWords.some(word => ingredientWords.includes(word) && word.length > 2);
                  
                  if (hasMatch) {
                    matchedIngredients.add(searchIngredient);
                    matchedCount++;
                    break; // Found a match for this recipe ingredient, move to next
                  }
                }
              }
            }
            
            return {
              id: parseInt(meal.idMeal),
              title: meal.strMeal,
              image: meal.strMealThumb,
              usedIngredientCount: matchedCount,
              missedIngredientCount: Math.max(0, ingredientCount - matchedCount),
              totalIngredients: ingredientCount
            };
          }
          
          // Fallback if details fetch fails
          return {
            id: parseInt(meal.idMeal),
            title: meal.strMeal,
            image: meal.strMealThumb,
            usedIngredientCount: 1,
            missedIngredientCount: 0,
            totalIngredients: 0
          };
        } catch (error) {
          console.error(`Error fetching details for meal ${meal.idMeal}:`, error);
          return {
            id: parseInt(meal.idMeal),
            title: meal.strMeal,
            image: meal.strMealThumb,
            usedIngredientCount: 1,
            missedIngredientCount: 0,
            totalIngredients: 0
          };
        }
      })
    );
    
    // Sort by matched ingredients (highest first), then by total ingredients (lowest first)
    const sortedMeals = detailedMeals.sort((a, b) => {
      // First priority: more matched ingredients come first
      if (b.usedIngredientCount !== a.usedIngredientCount) {
        return b.usedIngredientCount - a.usedIngredientCount;
      }
      // Second priority: fewer total ingredients (simpler recipes)
      return a.totalIngredients - b.totalIngredients;
    });
    
    return {
      results: sortedMeals,
      totalResults: meals.length
    };
  } catch (error) {
    console.error('Recipe search by ingredients error:', error);
    throw error;
  }
}

/**
 * Get recipe details by ID
 */
export async function getRecipeDetails(id: number): Promise<any> {
  try {
    const response = await fetch(
      `${MEALDB_BASE_URL}/lookup.php?i=${id}`
    );
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data.status === 'failure' || !response.ok) {
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }
    
    // Return the first meal from the array
    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];
      
      // Extract ingredients and measures
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push({
            name: ingredient,
            amount: measure || '',
            original: `${measure || ''} ${ingredient}`.trim()
          });
        }
      }
      
      return {
        id: parseInt(meal.idMeal),
        title: meal.strMeal,
        image: meal.strMealThumb,
        summary: meal.strInstructions,
        instructions: meal.strInstructions,
        extendedIngredients: ingredients,
        sourceUrl: meal.strSource || meal.strYoutube || '',
        readyInMinutes: 30, // TheMealDB doesn't provide this
        servings: 4 // Default value
      };
    }
    
    throw new Error('Recipe not found');
  } catch (error) {
    console.error('Recipe details error:', error);
    throw error;
  }
}

/**
 * Get random recipes
 */
export async function getRandomRecipes(number: number = 8): Promise<any> {
  try {
    // TheMealDB free API only gives 1 random meal at a time
    // We need to make multiple requests to get multiple random meals
    const promises = Array.from({ length: number }, () =>
      fetch(`${MEALDB_BASE_URL}/random.php`).then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    
    // Extract meals from all responses
    const meals = results
      .filter(data => data.meals && data.meals.length > 0)
      .map(data => data.meals[0]);
    
    return {
      recipes: meals.map((meal: any) => ({
        id: parseInt(meal.idMeal),
        title: meal.strMeal,
        image: meal.strMealThumb,
        summary: meal.strInstructions,
        extendedIngredients: Array.from({ length: countIngredients(meal) })
      }))
    };
  } catch (error) {
    console.error('Random recipes error:', error);
    throw error;
  }
}



