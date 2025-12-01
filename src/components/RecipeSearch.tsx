import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface RecipeSearchProps {
  onSearch: (query: string) => void;
  onSearchByIngredients: (ingredients: string[]) => void;
  onReset: () => void;
  showReset?: boolean;
}

export const RecipeSearch: React.FC<RecipeSearchProps> = ({
  onSearch,
  onSearchByIngredients,
  onReset,
  showReset = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [searchMode, setSearchMode] = useState<'query' | 'ingredients'>('query');
  const debounceTimerRef = useRef<number | null>(null);
  const lastSearchedQueryRef = useRef<string>('');
  const lastSearchedIngredientsRef = useRef<string>('');

  // Reset last searched when switching modes
  useEffect(() => {
    lastSearchedQueryRef.current = '';
    lastSearchedIngredientsRef.current = '';
  }, [searchMode]);

  // Auto-search as user types (for both modes)
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchMode === 'query' && searchQuery.trim().length >= 2) {
      // Only search if the query has changed from last search
      if (searchQuery.trim() !== lastSearchedQueryRef.current) {
        // Set new timer to search after user stops typing
        debounceTimerRef.current = setTimeout(() => {
          lastSearchedQueryRef.current = searchQuery.trim();
          onSearch(searchQuery);
        }, 1000); // Wait 1 second after user stops typing
      }
    } else if (searchMode === 'ingredients' && ingredientsInput.trim().length >= 2) {
      // Only search if the ingredients have changed from last search
      if (ingredientsInput.trim() !== lastSearchedIngredientsRef.current) {
        // Set new timer to search after user stops typing
        debounceTimerRef.current = setTimeout(() => {
          lastSearchedIngredientsRef.current = ingredientsInput.trim();
          const ingredients = ingredientsInput
            .split(/[\s,]+/) // Split by spaces or commas
            .map(i => i.trim())
            .filter(i => i.length > 0);
          
          if (ingredients.length > 0) {
            onSearchByIngredients(ingredients);
          }
        }, 1000); // Wait 1 second after user stops typing
      }
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, ingredientsInput, searchMode, onSearch, onSearchByIngredients]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchMode === 'query' && searchQuery.trim()) {
      lastSearchedQueryRef.current = searchQuery.trim();
      onSearch(searchQuery);
    } else if (searchMode === 'ingredients' && ingredientsInput.trim()) {
      lastSearchedIngredientsRef.current = ingredientsInput.trim();
      const ingredients = ingredientsInput
        .split(/[\s,]+/) // Split by spaces or commas
        .map(i => i.trim())
        .filter(i => i.length > 0);
      onSearchByIngredients(ingredients);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setIngredientsInput('');
    lastSearchedQueryRef.current = '';
    lastSearchedIngredientsRef.current = '';
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onReset();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mb-8 sm:mb-12">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Button
          variant={searchMode === 'query' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSearchMode('query')}
        >
          Search Recipes
        </Button>
        <Button
          variant={searchMode === 'ingredients' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSearchMode('ingredients')}
        >
          By Ingredients
        </Button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
        {searchMode === 'query' ? (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Start typing to search recipes..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 font-['Roboto_Mono',monospace] text-sm sm:text-base text-black border-2 border-black bg-transparent focus:outline-none focus:border-black placeholder:text-gray-500"
          />
        ) : (
          <input
            type="text"
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
            placeholder="Start typing ingredients: e.g., chicken rice garlic"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 font-['Roboto_Mono',monospace] text-sm sm:text-base text-black border-2 border-black bg-transparent focus:outline-none focus:border-black placeholder:text-gray-500"
          />
        )}
        
        <div className="flex gap-2 sm:gap-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="flex-1"
          >
            Search
          </Button>
          
          {showReset && (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

