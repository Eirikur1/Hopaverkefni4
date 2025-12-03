/**
 * ProductCard Component
 *
 * A modern recipe card with neubrutalism design featuring:
 * - Dual-layer offset shadow effect (black shadow behind cream card)
 * - Vintage film-to-digital color effect on hover
 * - Horizontal scroll animation for long titles
 * - Full keyboard accessibility
 */

import React, { useRef, useEffect, useState } from "react";
import { AnimatedText } from "./AnimatedText";
import scheduleIcon from "../assets/schedule_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import groupIcon from "../assets/group_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";

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

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  heading,
  ingredients,
  readyInMinutes,
  servings,
  onClick,
  id,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const isTextOverflowing =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsOverflowing(isTextOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [heading]);

  // Handle keyboard activation (Enter and Space)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <article
      data-animate-card
      data-card-key={id}
      className="group relative w-full max-w-[240px] h-[300px] cursor-pointer"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View recipe: ${heading}. ${
        readyInMinutes ? `Ready in ${readyInMinutes} minutes.` : ""
      } ${servings ? `Serves ${servings}.` : ""}`}
    >
      {/* LIVE CODING SECTION */}

      {/* Shadow layer */}

      {/* Live coding Shawdow! */}

      <div
        className="absolute inset-0 bg-black rounded-[12px] transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2"
        aria-hidden="true"
      />

      {/* Main card */}

      {/*Live coding Main card! :P */}

      <div className="absolute inset-0 bg-[#f4eedf] rounded-[12px] border-2 border-black transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col overflow-hidden">
       
       
        {/* Image Section */}
        <div className="relative w-full h-[200px] overflow-hidden border-b-2 border-black">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover sepia-[0.2] contrast-90 brightness-95 group-hover:sepia-0 group-hover:contrast-110 group-hover:brightness-100 transition-all duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between bg-[#f4eedf]">
          {/* Title with scroll animation for long text */}
          <div
            ref={textRef}
            className="overflow-hidden relative h-[19px] flex items-center"
          >
            <div
              className={`whitespace-nowrap inline-flex items-baseline ${
                isOverflowing
                  ? "group-hover:animate-[scroll_10s_linear_infinite]"
                  : ""
              }`}
            >
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

              {/* Duplicate for scroll loop */}
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

          {/* Recipe info */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-black/20">
            <div className="flex items-center gap-2 text-[10px] text-black/70 font-['Roboto_Mono',sans-serif] uppercase tracking-wider">
              {readyInMinutes && (
                <span className="flex items-center gap-1">
                  <img
                    src={scheduleIcon}
                    alt=""
                    className="w-3 h-3 brightness-0"
                    aria-hidden="true"
                  />
                  <span>{readyInMinutes} min</span>
                </span>
              )}
              {servings && (
                <span className="flex items-center gap-1">
                  <img
                    src={groupIcon}
                    alt=""
                    className="w-3 h-3 brightness-0"
                    aria-hidden="true"
                  />
                  <span>{servings} servings</span>
                </span>
              )}
            </div>

            {/* Ingredients */}
            <div className="flex items-center justify-between">
              <AnimatedText
                className="font-['Roboto_Mono',sans-serif] text-[11px] text-black/70 uppercase tracking-wider truncate"
                delay={0.4}
                duration={1}
                stagger={0.1}
              >
                {ingredients}
              </AnimatedText>

              <div
                className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-300"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
