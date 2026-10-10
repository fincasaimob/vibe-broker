import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "copper" | "light" | "ghost" | "heroOutline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", asChild, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent",
      copper: "bg-copper text-copper-foreground hover:bg-copper/90",
      light: "bg-light text-light-foreground hover:bg-light/90",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      heroOutline: "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const finalClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (asChild) {
      return props.children as any;
    }

    return (
      <button ref={ref} className={finalClassName} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button };
