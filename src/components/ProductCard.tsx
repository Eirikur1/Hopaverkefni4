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
  description,
  onClick,
  id,
}) => {
  return (
    <div 
      data-animate-card
      data-card-key={id}
      className="flex flex-col w-full max-w-[240px] cursor-pointer hover:scale-95 transition-transform duration-300"
      onClick={onClick}
    >
      {/* Image - Fixed aspect ratio */}
      <div className="w-full aspect-square overflow-hidden mb-3 bg-gray-100 rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]">
        <img 
          src={image} 
          alt={heading}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Container - Fixed heights for alignment */}
      <div className="flex flex-col w-full">
        {/* Heading - Fixed height with line clamp */}
        <div className="h-[44px] mb-2 overflow-hidden">
          <AnimatedText 
            className="font-['Roboto_Mono',sans-serif] font-bold text-base text-black leading-[22px] line-clamp-2 block"
            delay={0.2}
            duration={1}
            stagger={0.1}
          >
            {heading}
          </AnimatedText>
        </div>
        
        {/* Ingredients - Fixed height */}
        <div className="h-[20px] mb-2 overflow-hidden">
          <AnimatedText 
            className="font-['Roboto_Mono',sans-serif] text-sm text-black leading-[20px] block truncate"
            delay={0.4}
            duration={1}
            stagger={0.1}
          >
            {ingredients}
          </AnimatedText>
        </div>
        
        {/* Description - Fixed height with line clamp */}
        <div className="h-[40px] overflow-hidden">
          <AnimatedText 
            className="font-['Roboto_Mono',sans-serif] text-sm text-gray-600 leading-[20px] line-clamp-2 block"
            delay={0.6}
            duration={1}
            stagger={0.1}
          >
            {description}
          </AnimatedText>
        </div>
      </div>
    </div>
  );
};

