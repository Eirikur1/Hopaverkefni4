import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: "circle" | "square";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { shape = "circle", size = "md", children, className = "", ...props },
    ref
  ) => {
    const baseStyles =
      "flex items-center justify-center bg-black text-[#f4eedf] hover:bg-[#f4eedf] hover:text-black border-2 border-black transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg";

    const shapeStyles = {
      circle: "rounded-full",
      square: "rounded-none",
    };

    const sizeStyles = {
      sm: "w-8 h-8 sm:w-10 sm:h-10",
      md: "w-10 h-10 sm:w-12 sm:h-12",
      lg: "w-12 h-12 sm:w-14 sm:h-14",
    };

    const buttonClasses = [
      baseStyles,
      shapeStyles[shape],
      sizeStyles[size],
      className,
    ].join(" ");

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
