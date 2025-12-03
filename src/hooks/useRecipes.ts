/**
 * useRecipes Hook
 *
 * Custom hook for managing recipe data, search, and loading states.
 * Centralizes recipe logic and provides better error handling.
 */

import { useState, useCallback } from "react";
import {
  searchRecipes,
  searchRecipesByIngredients,
  getRandomRecipes,
} from "../services/api";
import { formatRecipes } from "../utils/recipeFormatter";

type SearchType = "random" | "query" | "ingredients";

interface UseRecipesReturn {
  recipes: any[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMoreResults: boolean;
  currentSearchType: SearchType;
  loadRandomRecipes: () => Promise<void>;
  handleSearch: (query: string) => Promise<void>;
  handleSearchByIngredients: (ingredients: string[]) => Promise<void>;
  loadMoreRecipes: () => Promise<void>;
  clearError: () => void;
}

export function useRecipes(): UseRecipesReturn {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchType, setCurrentSearchType] =
    useState<SearchType>("random");
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [currentIngredients, setCurrentIngredients] = useState<string[]>([]);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  /**
   * Load random recipes
   */
  const loadRandomRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getRandomRecipes(16);
      const formattedRecipes = formatRecipes(data.recipes);

      setRecipes(formattedRecipes);
      setCurrentSearchType("random");
      setHasMoreResults(true);
    } catch (err: any) {
      console.error("Error loading recipes:", err);
      setError("Failed to load recipes. Please try again.");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search recipes by query
   */
  const handleSearch = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchRecipes(query, 16);
      const formattedRecipes = formatRecipes(data.results);

      setRecipes(formattedRecipes);
      setCurrentSearchType("query");
      setCurrentQuery(query);
      setHasMoreResults(data.totalResults > 16);
    } catch (err: any) {
      console.error("Error searching recipes:", err);
      setError(`No recipes found for "${query}". Try a different search term.`);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search recipes by ingredients
   */
  const handleSearchByIngredients = useCallback(
    async (ingredients: string[]) => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchRecipesByIngredients(ingredients, 16);
        const formattedRecipes = formatRecipes(data.results, true); // Show matched count

        setRecipes(formattedRecipes);
        setCurrentSearchType("ingredients");
        setCurrentIngredients(ingredients);
        setHasMoreResults(data.totalResults > 16);
      } catch (err: any) {
        console.error("Error searching recipes by ingredients:", err);
        setError(
          `No recipes found with those ingredients. Try different ones.`
        );
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Load more recipes (pagination)
   */
  const loadMoreRecipes = useCallback(async () => {
    setLoadingMore(true);
    setError(null);

    try {
      let newRecipes: any[] = [];
      const currentOffset = recipes.length;

      if (currentSearchType === "query") {
        const data = await searchRecipes(currentQuery, 8, currentOffset);
        newRecipes = formatRecipes(data.results);
        setHasMoreResults(
          data.totalResults > currentOffset + newRecipes.length
        );
      } else if (currentSearchType === "ingredients") {
        const data = await searchRecipesByIngredients(
          currentIngredients,
          8,
          currentOffset
        );
        newRecipes = formatRecipes(data.results, true);
        setHasMoreResults(
          data.totalResults > currentOffset + newRecipes.length
        );
      } else {
        const data = await getRandomRecipes(8);
        newRecipes = formatRecipes(data.recipes);
        setHasMoreResults(true);
      }

      // Filter out duplicates
      if (newRecipes.length > 0) {
        const existingIds = new Set(recipes.map((r) => r.id));
        const uniqueNewRecipes = newRecipes.filter(
          (recipe) => !existingIds.has(recipe.id)
        );

        if (uniqueNewRecipes.length > 0) {
          setRecipes([...recipes, ...uniqueNewRecipes]);
        } else {
          setHasMoreResults(false);
        }
      } else {
        setHasMoreResults(false);
      }
    } catch (err: any) {
      console.error("Error loading more recipes:", err);
      setError("Failed to load more recipes. Please try again.");
      setHasMoreResults(false);
    } finally {
      setLoadingMore(false);
    }
  }, [recipes, currentSearchType, currentQuery, currentIngredients]);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    recipes,
    loading,
    loadingMore,
    error,
    hasMoreResults,
    currentSearchType,
    loadRandomRecipes,
    handleSearch,
    handleSearchByIngredients,
    loadMoreRecipes,
    clearError,
  };
}
