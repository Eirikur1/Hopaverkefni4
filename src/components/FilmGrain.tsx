import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const FilmGrain: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const dustCreatedRef = useRef(false);

  useEffect(() => {
    if (!stageRef.current || dustCreatedRef.current) return;

    const stage = stageRef.current;
    dustCreatedRef.current = true;

    // Create dust particles
    for (let i = 0; i < 8; i++) {
      const d = document.createElement('div');
      stage.appendChild(d);
      gsap.set(d, {
        attr: { class: 'd' },
        width: 30,
        height: 30,
        backgroundImage: 'url(https://assets.codepen.io/721952/filmDust.png)',
        backgroundPosition: '0 -' + gsap.utils.wrap(0, 8, i) * 30 + 'px',
        position: 'absolute',
        filter: 'brightness(0.3) contrast(1.5)',
      });
    }

    // Dust animation loop
    function dustLoop() {
      gsap.timeline({ onComplete: dustLoop }).set('.d', {
        x: () => window.innerWidth * 1.5 * Math.random(),
        y: () => window.innerHeight * 2 * Math.random(),
        rotation: () => 360 * Math.random(),
        scale: () => Math.random(),
        opacity: () => Math.random(),
      }, 0.07);
    }

    dustLoop();

    // Cleanup function
    return () => {
      gsap.killTweensOf('.d');
    };
  }, []);

  return (
    <>
      {/* Dust Particles Stage */}
      <div
        ref={stageRef}
        className="stage fixed inset-0 pointer-events-none z-40 overflow-hidden"
      />
    </>
  );
};

