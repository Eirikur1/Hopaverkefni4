import React, { useEffect, useState } from 'react';
import { getRecipeDetails } from '../services/api';

interface RecipeModalProps {
  recipeId: number;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const data = await getRecipeDetails(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#f4eedf] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border-2 sm:border-4 border-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-2 sm:top-4 right-2 sm:right-4 float-right bg-black text-[#f4eedf] w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl hover:bg-gray-800 z-10"
          aria-label="Close modal"
        >
          ×
        </button>

        {loading ? (
          <div className="p-6 sm:p-12 text-center font-['Roboto_Mono',monospace] text-black">
            Loading recipe details...
          </div>
        ) : recipe ? (
          <div className="p-4 sm:p-8">
            {/* Recipe Image */}
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover mb-4 sm:mb-6"
              />
            )}

            {/* Recipe Title */}
            <h2 className="font-['Roboto_Mono',monospace] font-bold text-xl sm:text-2xl md:text-3xl text-black mb-3 sm:mb-4">
              {recipe.title}
            </h2>

            {/* Recipe Info */}
            <div className="flex flex-wrap gap-3 sm:gap-6 mb-4 sm:mb-6 font-['Roboto_Mono',monospace] text-xs sm:text-sm text-black">
              {recipe.readyInMinutes && (
                <div>
                  <span className="font-bold">Time:</span> {recipe.readyInMinutes} min
                </div>
              )}
              {recipe.servings && (
                <div>
                  <span className="font-bold">Servings:</span> {recipe.servings}
                </div>
              )}
              {recipe.extendedIngredients && (
                <div>
                  <span className="font-bold">Ingredients:</span>{' '}
                  {recipe.extendedIngredients.length}
                </div>
              )}
            </div>

            {/* Ingredients */}
            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="font-['Roboto_Mono',monospace] font-bold text-lg sm:text-xl text-black mb-2 sm:mb-3">
                  Ingredients
                </h3>
                <ul className="font-['Roboto_Mono',monospace] text-xs sm:text-sm text-black space-y-2">
                  {recipe.extendedIngredients.map((ingredient: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions */}
            {recipe.instructions && (
              <div className="mb-4 sm:mb-6">
                <h3 className="font-['Roboto_Mono',monospace] font-bold text-lg sm:text-xl text-black mb-2 sm:mb-3">
                  Instructions
                </h3>
                <div
                  className="font-['Roboto_Mono',monospace] text-xs sm:text-sm text-black"
                  dangerouslySetInnerHTML={{
                    __html: recipe.instructions,
                  }}
                />
              </div>
            )}

            {/* Source Link */}
            {recipe.sourceUrl && (
              <div className="mt-4 sm:mt-6">
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Roboto_Mono',monospace] text-xs sm:text-sm text-black underline hover:no-underline"
                >
                  View Original Recipe →
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 sm:p-12 text-center font-['Roboto_Mono',monospace] text-black">
            Recipe not found
          </div>
        )}
      </div>
    </div>
  );
};


