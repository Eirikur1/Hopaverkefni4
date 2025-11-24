/**
 * Type Definitions
 *
 * This file contains TypeScript type definitions and interfaces
 * used throughout the application.
 */

// Example: API Response type
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Example: User type
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Example: Error type
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Add your own types here as needed

// Recipe types
export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
}

export interface RecipeDetails extends Recipe {
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions?: string;
  extendedIngredients?: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
  }>;
}

export interface RecipeSearchResult {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}



