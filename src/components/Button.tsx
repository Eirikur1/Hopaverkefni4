/**
 * Button Component
 *
 * A reusable, accessible button component matching the app's design system.
 * Features Roboto Mono typography, black/cream color scheme, and mobile-first responsive design.
 */

import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

/**
 * Button component with customizable variants and sizes
 *
 * @param variant - Visual style variant (primary: black bg, secondary: outlined, ghost: minimal)
 * @param size - Button size (sm, md, lg)
 * @param children - Button content
 * @param fullWidth - Whether button should take full width
 * @param props - Additional HTML button attributes
 *
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Search
 * </Button>
 *
 * @example
 * <Button variant="secondary" size="sm">
 *   Reset
 * </Button>
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  // Base styles - mobile-first with app's design system
  const baseStyles =
    "font-['Roboto_Mono',monospace] font-medium uppercase tracking-wider border-2 border-black active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none";

  // Variant styles matching app's black/cream color scheme
  const variantStyles = {
    primary: "bg-black text-[#f4eedf] hover:bg-[#f4eedf] hover:text-black",
    secondary: "bg-transparent text-black hover:bg-black hover:text-[#f4eedf]",
    ghost: "bg-transparent text-black border-transparent hover:border-black",
  };

  // Size styles - mobile-first with responsive breakpoints
  const sizeStyles = {
    sm: "px-4 sm:px-6 py-2 text-xs sm:text-sm tracking-wider",
    md: "px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-wider",
    lg: "px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-[18px] tracking-[1px] sm:tracking-[2px]",
  };

  // Width style
  const widthStyle = fullWidth ? "w-full" : "";

  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyle,
    className,
  ].join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
