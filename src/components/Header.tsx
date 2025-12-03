import React from "react";
import SplitText from "./SplitText";

interface HeaderProps {
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  // Handle keyboard activation (Enter and Space)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onLogoClick();
    }
  };

  return (
    <header className="flex flex-col items-center pt-0">
      <div
        className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onLogoClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Menú - Click to refresh recipes and scroll to top"
      >
        <SplitText
          text="Menú"
          tag="h1"
          className="font-['Gochi_Hand',cursive] text-[48px] sm:text-[64px] text-black tracking-[0.64px] leading-[50px] sm:leading-[66px] mt-8 sm:mt-12 mb-2"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.3}
          rootMargin="0px"
          textAlign="center"
        />
      </div>
    </header>
  );
};
