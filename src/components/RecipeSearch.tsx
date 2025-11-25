import React, { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchMode === 'query' && searchQuery.trim()) {
      onSearch(searchQuery);
    } else if (searchMode === 'ingredients' && ingredientsInput.trim()) {
      const ingredients = ingredientsInput
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length > 0);
      onSearchByIngredients(ingredients);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setIngredientsInput('');
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
            placeholder="Search for recipes..."
            className="w-full px-6 py-4 font-['Roboto_Mono',monospace] text-base border-2 border-black bg-transparent focus:outline-none focus:border-black"
          />
        ) : (
          <input
            type="text"
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
            placeholder="Enter ingredients (comma separated): e.g., chicken, tomato, garlic"
            className="w-full px-6 py-4 font-['Roboto_Mono',monospace] text-base border-2 border-black bg-transparent focus:outline-none focus:border-black"
          />
        )}
        
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-8 py-4 font-['Roboto_Mono',monospace] text-sm uppercase tracking-wider bg-black text-[#f4eedf] hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
          
          {showReset && (
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-4 font-['Roboto_Mono',monospace] text-sm uppercase tracking-wider bg-transparent text-black border-2 border-black hover:bg-black hover:text-[#f4eedf] transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

