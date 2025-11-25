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

// Recipe API Configuration
const SPOONACULAR_API_KEY = '165f3f67815047d4935ddaebe754c8df';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * Search recipes by query
 */
export async function searchRecipes(query: string, number: number = 12, offset: number = 0): Promise<any> {
  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&number=${number}&offset=${offset}&apiKey=${SPOONACULAR_API_KEY}&addRecipeInformation=true&fillIngredients=true`
    );
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data.status === 'failure' || !response.ok) {
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }
    
    return data;
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
    const ingredientsParam = ingredients.join(',');
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/findByIngredients?ingredients=${encodeURIComponent(ingredientsParam)}&number=${number}&apiKey=${SPOONACULAR_API_KEY}&ranking=2`
    );
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data.status === 'failure' || !response.ok) {
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }
    
    return data;
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
      `${SPOONACULAR_BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data.status === 'failure' || !response.ok) {
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }
    
    return data;
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
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/random?number=${number}&apiKey=${SPOONACULAR_API_KEY}`
    );
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data.status === 'failure' || !response.ok) {
      throw new Error(data.message || `API Error: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('Random recipes error:', error);
    throw error;
  }
}



