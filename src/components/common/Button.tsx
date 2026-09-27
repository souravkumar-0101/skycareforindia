import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-skycare-navy select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm gap-2 min-h-[42px]',
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[50px] font-semibold',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-skycare-sun to-skycare-sunHover text-skycare-navy shadow-md shadow-skycare-sun/20 hover:shadow-lg hover:shadow-skycare-sun/30 hover:brightness-105 focus:ring-skycare-sun font-semibold',
    secondary: 'bg-skycare-skyBlue/80 hover:bg-skycare-skyBlue text-white border border-skycare-softBlue/40 shadow-sm focus:ring-skycare-softBlue',
    outline: 'bg-transparent hover:bg-skycare-darkBlue/70 text-skycare-cloud border border-skycare-cloud/20 hover:border-skycare-cloud/40 focus:ring-skycare-softBlue',
    ghost: 'bg-transparent hover:bg-skycare-skyBlue/30 text-skycare-cloud hover:text-white focus:ring-skycare-softBlue',
    danger: 'bg-skycare-accentRose/90 hover:bg-skycare-accentRose text-white focus:ring-skycare-accentRose shadow-sm',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
  icon: ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'ghost',
  size = 'md',
  ariaLabel,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 p-1.5 text-xs',
    md: 'w-10 h-10 p-2 text-sm',
    lg: 'w-12 h-12 p-3 text-base',
  };

  const variantStyles = {
    primary: 'bg-skycare-sun text-skycare-navy hover:bg-skycare-sunHover focus:ring-skycare-sun shadow-sm',
    secondary: 'bg-skycare-skyBlue/70 hover:bg-skycare-skyBlue text-skycare-cloud border border-skycare-softBlue/30',
    outline: 'border border-skycare-cloud/20 hover:border-skycare-cloud/40 text-skycare-cloud bg-skycare-darkBlue/40 hover:bg-skycare-darkBlue',
    ghost: 'hover:bg-skycare-skyBlue/30 text-skycare-cloud hover:text-white',
  };

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skycare-softBlue active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
