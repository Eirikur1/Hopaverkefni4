import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedGridProps {
  children: React.ReactNode;
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center';
  blurToFocus?: boolean;
  className?: string;
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  children,
  ease = 'power3.out',
  duration = 0.8,
  stagger = 0.05,
  animateFrom = 'bottom',
  blurToFocus = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedItemsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('[data-animate-card]');
    
    items.forEach((item, index) => {
      const key = (item as HTMLElement).getAttribute('data-card-key') || `item-${index}`;
      
      // Only animate items that haven't been animated yet
      if (!animatedItemsRef.current.has(key)) {
        animatedItemsRef.current.add(key);
        
        // Get initial position based on animateFrom direction
        let startPosition = { x: 0, y: 100, opacity: 0 };
        
        switch (animateFrom) {
          case 'top':
            startPosition = { x: 0, y: -100, opacity: 0 };
            break;
          case 'bottom':
            startPosition = { x: 0, y: 100, opacity: 0 };
            break;
          case 'left':
            startPosition = { x: -100, y: 0, opacity: 0 };
            break;
          case 'right':
            startPosition = { x: 100, y: 0, opacity: 0 };
            break;
          case 'center':
            startPosition = { x: 0, y: 0, opacity: 0 };
            break;
        }

        // Animate from initial position
        gsap.fromTo(
          item,
          {
            ...startPosition,
            ...(blurToFocus && { filter: 'blur(4px)' }),
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration,
            ease,
            delay: index * stagger,
          }
        );
      }
    });
  }, [children, animateFrom, blurToFocus, duration, ease, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

