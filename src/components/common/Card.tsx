import React, { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'sun' | 'light' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'glass-panel text-skycare-cloud',
    elevated: 'glass-panel-elevated text-skycare-cloud',
    sun: 'glass-panel-sun text-white',
    light: 'glass-panel-light text-skycare-cloud',
    bordered: 'bg-skycare-darkBlue/40 border border-skycare-softBlue/30 text-skycare-cloud',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
  disabled?: boolean;
  className?: string;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  selected,
  onClick,
  title,
  description,
  icon,
  badge,
  disabled = false,
  className = '',
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative flex flex-col p-4 md:p-5 rounded-2xl cursor-pointer text-left transition-all duration-200 border select-none focus:outline-none focus:ring-2 focus:ring-skycare-sun ${
        selected
          ? 'bg-skycare-skyBlue/50 border-skycare-sun shadow-lg shadow-skycare-sun/10 ring-1 ring-skycare-sun'
          : 'bg-skycare-darkBlue/50 border-skycare-softBlue/20 hover:border-skycare-softBlue/60 hover:bg-skycare-darkBlue/80'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.99]'} ${className}`}
    >
      {/* Top row: Icon & Radio Check indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${selected ? 'bg-skycare-sun text-skycare-navy' : 'bg-skycare-navy/80 text-skycare-cloud'}`}>
          {icon}
        </div>
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            selected
              ? 'border-skycare-sun bg-skycare-sun text-skycare-navy'
              : 'border-skycare-cloud/30 bg-skycare-navy/40'
          }`}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-skycare-navy" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-white text-base md:text-lg">{title}</h3>
        {badge && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-skycare-sun/20 text-skycare-sun border border-skycare-sun/30">
            {badge}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1 text-xs md:text-sm text-skycare-cloud/70 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  icon,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center font-medium rounded-full transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-skycare-sun ${
        sizeStyles[size]
      } ${
        selected
          ? 'bg-skycare-sun text-skycare-navy border-skycare-sun shadow-sm font-semibold'
          : 'bg-skycare-darkBlue/60 text-skycare-cloud border-skycare-softBlue/30 hover:border-skycare-softBlue/70 hover:bg-skycare-skyBlue/30'
      } ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
