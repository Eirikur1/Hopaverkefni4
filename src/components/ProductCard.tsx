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
      className="flex flex-col w-full max-w-[240px] h-[240px] cursor-pointer hover:scale-[0.98] transition-all duration-300 rounded-[16px] overflow-hidden shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_0_rgba(0,0,0,0.12)] bg-white"
      onClick={onClick}
    >
      {/* Image with gradient overlay */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <img 
          src={image} 
          alt={heading}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75" />
        
        {/* Recipe name on gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <AnimatedText 
            className="font-['Roboto_Mono',sans-serif] font-bold text-base text-white leading-[22px] line-clamp-2 block"
            delay={0.2}
            duration={1}
            stagger={0.1}
          >
            {heading}
          </AnimatedText>
        </div>
      </div>
      
      {/* Bottom info bar */}
      <div className="flex items-center justify-center h-[40px] bg-white px-4">
        <AnimatedText 
          className="font-['Roboto_Mono',sans-serif] text-xs text-black truncate"
          delay={0.4}
          duration={1}
          stagger={0.1}
        >
          {ingredients}
        </AnimatedText>
      </div>
    </div>
  );
};

