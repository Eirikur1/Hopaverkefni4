import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";

interface Props {
  onSearch: (query: string) => void;
  onSearchByIngredients: (ingredients: string[]) => void;
  onReset?: () => void;
  showReset?: boolean;
}

export function RecipeSearch({ onSearch, onSearchByIngredients, onReset, showReset = false }: Props) {
  const [query, setQuery] = useState("");
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [mode, setMode] = useState<"query" | "ingredients">("query");
  const timer = useRef<number | null>(null);
  const lastQuery = useRef("");
  const lastIngredients = useRef("");

  useEffect(() => {
    lastQuery.current = "";
    lastIngredients.current = "";
  }, [mode]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (mode === "query" && query.trim().length >= 2 && query.trim() !== lastQuery.current) {
      timer.current = setTimeout(() => {
        lastQuery.current = query.trim();
        onSearch(query);
      }, 1000);
    } else if (mode === "ingredients" && ingredientsInput.trim().length >= 2 && ingredientsInput.trim() !== lastIngredients.current) {
      timer.current = setTimeout(() => {
        lastIngredients.current = ingredientsInput.trim();
        const list = ingredientsInput.split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
        if (list.length) onSearchByIngredients(list);
      }, 1000);
    }

    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [query, ingredientsInput, mode, onSearch, onSearchByIngredients]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "query" && query.trim()) {
      lastQuery.current = query.trim();
      onSearch(query);
    } else if (mode === "ingredients" && ingredientsInput.trim()) {
      lastIngredients.current = ingredientsInput.trim();
      const list = ingredientsInput.split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
      onSearchByIngredients(list);
    }
  }

  function reset() {
    setQuery("");
    setIngredientsInput("");
    lastQuery.current = "";
    lastIngredients.current = "";
    if (timer.current) clearTimeout(timer.current);
    onReset?.();
  }

  return (
    <div className="w-full max-w-[800px] mx-auto mb-8 sm:mb-12">
      <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Button variant={mode === "query" ? "primary" : "secondary"} size="sm" onClick={() => setMode("query")}>
          Search Recipes
        </Button>
        <Button variant={mode === "ingredients" ? "primary" : "secondary"} size="sm" onClick={() => setMode("ingredients")}>
          By Ingredients
        </Button>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3 sm:gap-4">
        {mode === "query" ? (
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Start typing to search recipes..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 font-['Roboto_Mono',monospace] text-sm sm:text-base text-black border-2 border-black bg-transparent focus:outline-none placeholder:text-gray-500"
          />
        ) : (
          <input
            type="text"
            value={ingredientsInput}
            onChange={e => setIngredientsInput(e.target.value)}
            placeholder="e.g., chicken rice garlic"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 font-['Roboto_Mono',monospace] text-sm sm:text-base text-black border-2 border-black bg-transparent focus:outline-none placeholder:text-gray-500"
          />
        )}

        <div className="flex gap-2 sm:gap-4">
          <Button type="submit" variant="primary" size="md" className="flex-1">Search</Button>
          {showReset && <Button type="button" variant="secondary" size="md" onClick={reset}>Reset</Button>}
        </div>
      </form>
    </div>
  );
}
