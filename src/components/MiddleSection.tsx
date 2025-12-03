import React from "react";
import { AnimatedText } from "./AnimatedText";
import { LogoLoop } from "./LogoLoop";
import { foodIcons } from "../config/foodIcons";

export const MiddleSection: React.FC = () => {
  return (
    <>
      {/* Middle Section with Text and Fish */}
      <section 
        className="flex justify-center items-center gap-4 sm:gap-8 md:gap-[156px] mt-8 sm:mt-12 md:mt-[120px] mb-8 sm:mb-12 md:mb-[120px] px-4 sm:px-8 overflow-x-hidden"
        aria-label="About our recipes"
      >
        <div className="font-['Roboto_Mono',monospace] text-xs sm:text-sm md:text-base lg:text-[20px] text-black w-[100px] sm:w-[180px] md:w-[300px] lg:w-[525px] flex-shrink-0 text-left flex items-center">
          <div>
            <AnimatedText className="font-bold mb-1 sm:mb-2" delay={0.2}>
              Elegant
            </AnimatedText>
            <AnimatedText className="font-normal" delay={0.4}>
              dishes from the ingredients in your kitchen.
            </AnimatedText>
          </div>
        </div>

        {/* Decorative dotted line - hidden from screen readers */}
        <div className="flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}vectors/decorative/dotted_line.svg`}
            alt=""
            className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[514px] w-[10px] sm:w-[15px] md:w-[20px]"
          />
        </div>

        {/* Decorative fish illustration - hidden from screen readers */}
        <div 
          className="w-[150px] sm:w-[250px] md:w-[350px] lg:w-[474px] h-[180px] sm:h-[280px] md:h-[400px] lg:h-[545px] flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <img
            src={`${import.meta.env.BASE_URL}vectors/illustrations/fish.svg`}
            alt=""
            className="rotate-90 w-full h-full object-contain"
          />
        </div>
      </section>

      {/* Animated Logo Loop Divider - decorative */}
      <div 
        className="w-full my-4 sm:my-6 md:my-8 overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-[36px] sm:h-[48px] md:h-[64px] lg:h-[80px] flex items-center">
          <LogoLoop
            logos={foodIcons}
            speed={120}
            direction="left"
            logoHeight={36}
            gap={50}
            hoverSpeed={0}
            scaleOnHover={false}
            ariaLabel="Decorative food icons"
          />
        </div>
      </div>
    </>
  );
};
