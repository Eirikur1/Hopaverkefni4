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
                <span className="font-['Roboto_Mono',sans-serif] font-bold text-[14px] text-black leading-[19px] pl-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {heading}
                </span>
              )}
            </div>
          </div>
          
          {/* Ingredients info with animated dot indicator */}
          <div className="flex items-center justify-between pt-2 border-t border-black/20">
            <AnimatedText 
              className="font-['Roboto_Mono',sans-serif] text-[10px] text-black/70 uppercase tracking-wider truncate"
              delay={0.4}
              duration={1}
              stagger={0.1}
            >
              {ingredients}
            </AnimatedText>
            
            {/* Dot indicator that scales on hover */}
            <div className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
