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
  number: number = 12
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
    
    // Convert to Spoonacular-like format
    return data.meals ? data.meals.slice(0, number).map((meal: any) => ({
      id: parseInt(meal.idMeal),
      title: meal.strMeal,
      image: meal.strMealThumb,
      usedIngredientCount: 1, // Since we're filtering by one ingredient
      missedIngredientCount: 0 // We don't have this info from TheMealDB
    })) : [];
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



