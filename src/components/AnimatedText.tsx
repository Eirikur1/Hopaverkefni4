import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(GSAPSplitText, ScrollTrigger);

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.15,
  duration = 1.2,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<any>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const masksRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    // Create split text
    splitRef.current = new GSAPSplitText(textRef.current, {
      type: 'lines',
      linesClass: 'split-line',
    });

    // Wrap each line in a mask div
    if (splitRef.current.lines) {
      masksRef.current = [];
      splitRef.current.lines.forEach((line: HTMLElement) => {
        const mask = document.createElement('div');
        mask.style.overflow = 'hidden';
        mask.style.display = 'block';
        
        const parent = line.parentElement;
        if (parent) {
          parent.insertBefore(mask, line);
          mask.appendChild(line);
          masksRef.current.push(mask);
        }
      });

      // Set initial state - lines hidden below
      gsap.set(splitRef.current.lines, {
        y: '120%',
      });

      // Animate lines sliding up from below with ScrollTrigger
      animationRef.current = gsap.to(splitRef.current.lines, {
        y: '0%',
        duration: duration,
        ease: 'power3.out',
        stagger: stagger,
        delay: delay,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill();
        animationRef.current.kill();
      }
      if (splitRef.current) {
        splitRef.current.revert();
      }
      // Remove masks
      masksRef.current.forEach(mask => {
        if (mask.parentElement) {
          while (mask.firstChild) {
            mask.parentElement.insertBefore(mask.firstChild, mask);
          }
          mask.remove();
        }
      });
      masksRef.current = [];
    };
  }, [delay, stagger, duration, children]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

