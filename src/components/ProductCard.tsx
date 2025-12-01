import React from 'react';
import { AnimatedText } from './AnimatedText';

interface ProductCardProps {
  image: string;
  heading: string;
  ingredients: string;
  description: string;
  onClick?: () => void;
  id?: number | string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  heading,
  ingredients,
  onClick,
  id,
}) => {
  return (
    <div 
      data-animate-card
      data-card-key={id}
      className="group relative w-full max-w-[240px] h-[300px] cursor-pointer"
      onClick={onClick}
    >
      {/* Background card - black */}
      <div className="absolute inset-0 bg-black rounded-[12px] transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
      
      {/* Main card - offset for shadow effect */}
      <div className="absolute inset-0 bg-[#f4eedf] rounded-[12px] border-2 border-black transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 flex flex-col overflow-hidden">
        
        {/* Image section */}
        <div className="relative w-full h-[200px] overflow-hidden border-b-2 border-black">
          <img 
            src={image} 
            alt={heading}
            className="w-full h-full object-cover sepia-[0.2] contrast-90 brightness-95 group-hover:sepia-0 group-hover:contrast-110 group-hover:brightness-100 transition-all duration-500"
          />
        </div>
        
        {/* Content section */}
        <div className="flex-1 p-4 flex flex-col justify-between bg-[#f4eedf]">
          {/* Title */}
          <AnimatedText 
            className="font-['Roboto_Mono',sans-serif] font-bold text-[14px] text-black leading-[19px] truncate"
            delay={0.2}
            duration={1}
            stagger={0.1}
          >
            {heading}
          </AnimatedText>
          
          {/* Ingredients */}
          <div className="flex items-center justify-between pt-2 border-t border-black/20">
            <AnimatedText 
              className="font-['Roboto_Mono',sans-serif] text-[10px] text-black/70 uppercase tracking-wider truncate"
              delay={0.4}
              duration={1}
              stagger={0.1}
            >
              {ingredients}
            </AnimatedText>
            <div className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

