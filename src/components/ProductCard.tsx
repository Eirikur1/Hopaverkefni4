/**
 * ProductCard Component
 * 
 * A modern recipe card with neubrutalism design featuring:
 * - Dual-layer offset shadow effect (black shadow behind cream card)
 * - Vintage film-to-digital color effect on hover
 * - Horizontal scroll animation for long titles
 * - Responsive interactions and animations
 */

import React, { useRef, useEffect, useState } from 'react';
import { AnimatedText } from './AnimatedText';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ProductCardProps {
  image: string;
  heading: string;
  ingredients: string;
  description: string;
  readyInMinutes?: number;
  servings?: number;
  onClick?: () => void;
  id?: number | string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  heading,
  ingredients,
  readyInMinutes,
  servings,
  onClick,
  id,
}) => {
  // --------------------------------------------------------------------------
  // STATE & REFS
  // --------------------------------------------------------------------------
  
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------
  
  // Check if title text overflows container (for scroll effect)
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const isTextOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsOverflowing(isTextOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [heading]);

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  
  return (
    <div 
      data-animate-card
      data-card-key={id}
      className="group relative w-full max-w-[240px] h-[300px] cursor-pointer"
      onClick={onClick}
    >
      {/* Black shadow layer (background) - moves on hover */}
      <div className="absolute inset-0 bg-black rounded-[12px] transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
      
      {/* Main card layer (foreground) - moves opposite direction on hover */}
      <div className="absolute inset-0 bg-[#f4eedf] rounded-[12px] border-2 border-black transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col overflow-hidden">
        
        {/* ====== IMAGE SECTION ====== */}
        <div className="relative w-full h-[200px] overflow-hidden border-b-2 border-black">
          <img 
            src={image} 
            alt={heading}
            className="w-full h-full object-cover sepia-[0.2] contrast-90 brightness-95 group-hover:sepia-0 group-hover:contrast-110 group-hover:brightness-100 transition-all duration-500"
          />
        </div>
        
        {/* ====== CONTENT SECTION ====== */}
        <div className="flex-1 p-4 flex flex-col justify-between bg-[#f4eedf]">
          
          {/* Title with scroll animation for long text */}
          <div ref={textRef} className="overflow-hidden relative h-[19px] flex items-center">
            <div className={`whitespace-nowrap inline-flex items-baseline ${isOverflowing ? 'group-hover:animate-[scroll_10s_linear_infinite]' : ''}`}>
              
              {/* Original title text */}
              <span className="font-['Roboto_Mono',sans-serif] font-bold text-[14px] text-black leading-[19px]">
                <AnimatedText 
                  className="inline"
                  delay={0.2}
                  duration={1}
                  stagger={0.1}
                >
                  {heading}
                </AnimatedText>
              </span>
              
              {/* Duplicate title for seamless scroll loop (only if overflowing) */}
              {isOverflowing && (
                <span 
                  className="font-['Roboto_Mono',sans-serif] font-bold text-[14px] text-black leading-[19px] pl-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  {heading}
                </span>
              )}
            </div>
          </div>
          
          {/* Recipe info section */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-black/20">
            {/* Time and Servings */}
            <div className="flex items-center gap-2 text-[10px] text-black/70 font-['Roboto_Mono',sans-serif] uppercase tracking-wider">
              {readyInMinutes && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {readyInMinutes} min
                </span>
              )}
              {servings && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {servings}
                </span>
              )}
            </div>
            
            {/* Ingredients with dot indicator */}
            <div className="flex items-center justify-between">
              <AnimatedText 
                className="font-['Roboto_Mono',sans-serif] text-[11px] text-black/70 uppercase tracking-wider truncate"
                delay={0.4}
                duration={1}
                stagger={0.1}
              >
                {ingredients}
              </AnimatedText>
              
              {/* Dot indicator that scales on hover */}
              <div 
                className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-300"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
