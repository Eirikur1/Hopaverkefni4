import React, { useEffect, useState } from 'react';
import { getRecipeDetails } from '../services/api';
import { IconButton } from './IconButton';

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/50"
      onClick={onClose}
    >
      {/* Main modal */}
      <div
        className="bg-[#f4eedf] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
          {loading ? (
            <div className="p-6 sm:p-12 text-center font-['Roboto_Mono',monospace] text-black">
              Loading recipe details...
            </div>
          ) : recipe ? (
            <div>
              {/* Header with image */}
              {recipe.image && (
                <div className="relative border-b-4 border-black">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-[250px] sm:h-[350px] object-cover sepia-[0.2] contrast-90 brightness-95 hover:sepia-0 hover:contrast-110 hover:brightness-100 transition-all duration-500"
                  />
                  
                  {/* Close button on image */}
                  <IconButton
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl"
                    shape="square"
                    size="sm"
                    aria-label="Close modal"
                  >
                    ×
                  </IconButton>
                </div>
              )}

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Recipe Title */}
                <h2 className="font-['Roboto_Mono',monospace] font-bold text-2xl sm:text-3xl text-black mb-4 pb-4 border-b-2 border-black">
                  {recipe.title}
                </h2>

                {/* Recipe Info - styled as tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {recipe.readyInMinutes && (
                    <div className="px-4 py-2 bg-black text-[#f4eedf] border-2 border-black font-['Roboto_Mono',monospace] text-xs font-bold uppercase">
                      {recipe.readyInMinutes} min
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="px-4 py-2 bg-white border-2 border-black font-['Roboto_Mono',monospace] text-xs font-bold uppercase">
                      {recipe.servings} servings
                    </div>
                  )}
                  {recipe.extendedIngredients && (
                    <div className="px-4 py-2 bg-white border-2 border-black font-['Roboto_Mono',monospace] text-xs font-bold uppercase">
                      {recipe.extendedIngredients.length} ingredients
                    </div>
                  )}
                </div>

                {/* Ingredients */}
                {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
                  <div className="mb-8 pb-8 border-b-2 border-black">
                    <h3 className="font-['Roboto_Mono',monospace] font-bold text-xl text-black mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-black" />
                      Ingredients
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recipe.extendedIngredients.map((ingredient: any, index: number) => (
                        <div key={index} className="font-['Roboto_Mono',monospace] text-sm text-black flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0" />
                          <span>
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instructions */}
                {recipe.instructions && (
                  <div className="mb-6">
                    <h3 className="font-['Roboto_Mono',monospace] font-bold text-xl text-black mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-black" />
                      Instructions
                    </h3>
                    <div
                      className="font-['Roboto_Mono',monospace] text-sm text-black leading-relaxed p-4 bg-white border-2 border-black"
                      dangerouslySetInnerHTML={{
                        __html: recipe.instructions,
                      }}
                    />
                  </div>
                )}

                {/* Source Link */}
                {recipe.sourceUrl && (
                  <div className="mt-6 pt-6 border-t-2 border-black">
                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-[#f4eedf] border-2 border-black font-['Roboto_Mono',monospace] text-sm font-bold uppercase hover:bg-white hover:text-black transition-all duration-300"
                    >
                      View Original Recipe
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center font-['Roboto_Mono',monospace] text-black">
              Recipe not found
            </div>
          )}
        </div>
    </div>
  );
};


