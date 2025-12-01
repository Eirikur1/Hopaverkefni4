import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-['Roboto_Mono',monospace] font-medium uppercase tracking-wider border-2 border-black active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none";

  const variantStyles = {
    primary: "bg-black text-[#f4eedf] hover:bg-[#f4eedf] hover:text-black",
    secondary: "bg-transparent text-black hover:bg-black hover:text-[#f4eedf]",
  };

  const sizeStyles = {
    sm: "px-4 sm:px-6 py-2 text-xs sm:text-sm tracking-wider",
    md: "px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-wider",
    lg: "px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-[18px] tracking-[1px] sm:tracking-[2px]",
  };

  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
