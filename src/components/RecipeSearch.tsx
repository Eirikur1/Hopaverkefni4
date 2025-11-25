import React, { useState, useEffect, useRef } from 'react';

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
    <div className="w-full max-w-[800px] mx-auto mb-12">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSearchMode('query')}
          className={`px-6 py-2 font-['Roboto_Mono',monospace] text-sm uppercase tracking-wider transition-colors ${
            searchMode === 'query'
              ? 'bg-black text-[#f4eedf]'
              : 'bg-transparent text-black border-2 border-black'
          }`}
        >
          Search Recipes
        </button>
        <button
          onClick={() => setSearchMode('ingredients')}
          className={`px-6 py-2 font-['Roboto_Mono',monospace] text-sm uppercase tracking-wider transition-colors ${
            searchMode === 'ingredients'
              ? 'bg-black text-[#f4eedf]'
              : 'bg-transparent text-black border-2 border-black'
          }`}
        >
          By Ingredients
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {searchMode === 'query' ? (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Start typing to search recipes..."
            className="w-full px-6 py-4 font-['Roboto_Mono',monospace] text-base text-black border-2 border-black bg-transparent focus:outline-none focus:border-black placeholder:text-gray-500"
          />
        ) : (
          <input
            type="text"
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
            placeholder="Start typing ingredients: e.g., chicken rice garlic"
            className="w-full px-6 py-4 font-['Roboto_Mono',monospace] text-base text-black border-2 border-black bg-transparent focus:outline-none focus:border-black placeholder:text-gray-500"
          />
        )}
        
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-8 py-4 font-['Roboto_Mono',monospace] text-sm uppercase tracking-wider bg-black text-[#f4eedf] border-2 border-black hover:bg-[#f4eedf] hover:text-black active:scale-95 transition-all duration-200"
          >
            Search
          </button>
          
          {showReset && (
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-4 font-['Roboto_Mono',monospace] text-sm uppercase tracking-wider bg-transparent text-black border-2 border-black hover:bg-black hover:text-[#f4eedf] active:scale-95 transition-all duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

