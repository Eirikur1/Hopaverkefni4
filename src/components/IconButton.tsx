/**
 * IconButton Component
 *
 * A specialized button for icon-only actions like close, back, or scroll-to-top.
 * Features circular or square variants with hover effects.
 */

import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  shape?: "circle" | "square";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

/**
 * Icon button for actions that don't need text labels
 *
 * @param variant - Visual style (primary: black bg, ghost: minimal)
 * @param shape - Button shape (circle for floating actions, square for modals)
 * @param size - Button size
 * @param children - Icon content (SVG, image, or text)
 * @param props - Additional HTML button attributes
 *
 * @example
 * <IconButton shape="circle" aria-label="Scroll to top">
 *   <img src="/icon.svg" alt="" />
 * </IconButton>
 *
 * @example
 * <IconButton variant="ghost" shape="square" aria-label="Close">
 *   ×
 * </IconButton>
 */
export function IconButton({
  variant = "primary",
  shape = "circle",
  size = "md",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  // Base styles
  const baseStyles =
    "flex items-center justify-center border-2 border-black transition-all duration-200 active:scale-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant styles
  const variantStyles = {
    primary: "bg-black text-[#f4eedf] hover:bg-[#f4eedf] hover:text-black shadow-lg",
    ghost: "bg-transparent text-black hover:bg-gray-100",
  };

  // Shape styles
  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-none",
  };

  // Size styles
  const sizeStyles = {
    sm: "w-8 h-8 sm:w-10 sm:h-10",
    md: "w-10 h-10 sm:w-12 sm:h-12",
    lg: "w-12 h-12 sm:w-14 sm:h-14",
  };

  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    shapeStyles[shape],
    sizeStyles[size],
    className,
  ].join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

