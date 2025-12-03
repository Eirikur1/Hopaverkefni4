/**
 * FilmGrain Component
 *
 * Adds a subtle film grain overlay effect to create a vintage aesthetic.
 * Uses CSS animation for continuous grain movement.
 */

import React from "react";

export const FilmGrain: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        animation: "grain 0.5s steps(10) infinite",
      }}
      aria-hidden="true"
    />
  );
};

export default FilmGrain;
