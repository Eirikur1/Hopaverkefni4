/**
 * RecipeModal Component
 *
 * Accessible full-screen modal displaying detailed recipe information.
 *
 * Accessibility features:
 * - role="dialog" and aria-modal for screen readers
 * - Focus trap keeps keyboard focus within modal
 * - ESC key closes modal
 * - Focus returns to trigger element on close
 * - aria-labelledby for modal title
 */

import React, { useEffect, useState, useRef, useCallback } from "react";
import { getRecipeDetails } from "../services/api";
import { IconButton } from "./IconButton";

interface RecipeModalProps {
  recipeId: number;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipeId,
  onClose,
}) => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Store the previously focused element to restore focus on close
  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the close button when modal opens
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      // Restore focus to previous element on unmount
      previousActiveElement.current?.focus();
    };
  }, []);

  // Fetch recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const data = await getRecipeDetails(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Handle close with focus restoration
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  // Focus trap - keep focus within modal
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, [loading]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const modalTitleId = `modal-title-${recipeId}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/50"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
    >
      <div
        ref={modalRef}
        className="bg-[#f4eedf] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading State */}
        {loading ? (
          <div
            className="p-6 sm:p-12 text-center font-['Roboto_Mono',monospace] text-black"
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">Loading recipe details</span>
            Loading recipe details...
            {/* Hidden close button for focus trap during loading */}
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="sr-only"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        ) : recipe ? (
          <div>
            {/* Hero Image */}
            {recipe.image && (
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={`${recipe.title} dish`}
                  className="w-full h-[250px] sm:h-[350px] object-cover sepia-[0.2] contrast-90 brightness-95 hover:sepia-0 hover:contrast-110 hover:brightness-100 transition-all duration-500"
                />

                <IconButton
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-2xl"
                  shape="square"
                  size="sm"
                  aria-label="Close recipe details"
                >
                  ×
                </IconButton>
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2
                id={modalTitleId}
                className="font-['Roboto_Mono',monospace] font-bold text-2xl sm:text-3xl text-black mb-6"
              >
                {recipe.title}
              </h2>

              {/* Metadata tags */}
              <div
                className="flex flex-wrap gap-3 mb-8"
                role="list"
                aria-label="Recipe information"
              >
                {recipe.readyInMinutes && (
                  <div
                    className="px-4 py-2 bg-black text-[#f4eedf] rounded-full font-['Roboto_Mono',monospace] text-xs font-bold uppercase"
                    role="listitem"
                  >
                    <span className="sr-only">Cooking time:</span>
                    {recipe.readyInMinutes} min
                  </div>
                )}
                {recipe.servings && (
                  <div
                    className="px-4 py-2 bg-black/10 rounded-full font-['Roboto_Mono',monospace] text-xs font-bold uppercase"
                    role="listitem"
                  >
                    <span className="sr-only">Servings:</span>
                    {recipe.servings} servings
                  </div>
                )}
                {recipe.extendedIngredients && (
                  <div
                    className="px-4 py-2 bg-black/10 rounded-full font-['Roboto_Mono',monospace] text-xs font-bold uppercase"
                    role="listitem"
                  >
                    <span className="sr-only">Number of ingredients:</span>
                    {recipe.extendedIngredients.length} ingredients
                  </div>
                )}
              </div>

              {/* Ingredients */}
              {recipe.extendedIngredients?.length > 0 && (
                <section className="mb-8" aria-labelledby="ingredients-heading">
                  <h3
                    id="ingredients-heading"
                    className="font-['Roboto_Mono',monospace] font-bold text-xl text-black mb-4"
                  >
                    Ingredients
                  </h3>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recipe.extendedIngredients.map(
                      (ingredient: any, index: number) => (
                        <li
                          key={index}
                          className="font-['Roboto_Mono',monospace] text-sm text-black flex items-start gap-2"
                        >
                          <span
                            className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            {ingredient.amount} {ingredient.unit}{" "}
                            {ingredient.name}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}

              {/* Instructions */}
              {recipe.instructions && (
                <section
                  className="mb-6"
                  aria-labelledby="instructions-heading"
                >
                  <h3
                    id="instructions-heading"
                    className="font-['Roboto_Mono',monospace] font-bold text-xl text-black mb-4"
                  >
                    Instructions
                  </h3>

                  <div
                    className="font-['Roboto_Mono',monospace] text-sm text-black leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: recipe.instructions,
                    }}
                  />
                </section>
              )}

              {/* Source Link */}
              {recipe.sourceUrl && (
                <div className="mt-8">
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-[#f4eedf] rounded-full font-['Roboto_Mono',monospace] text-sm font-bold uppercase hover:bg-black/80 transition-all duration-300"
                  >
                    View Original Recipe
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Error State */
          <div
            className="p-12 text-center font-['Roboto_Mono',monospace] text-black"
            role="alert"
          >
            Recipe not found
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="block mx-auto mt-4 px-6 py-2 bg-black text-[#f4eedf] rounded font-bold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
