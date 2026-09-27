import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { Search, X } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-skycare-cloud/80">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-skycare-softBlue">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-skycare-navy/80 border rounded-xl py-2.5 text-sm text-skycare-cloud placeholder:text-skycare-cloud/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skycare-sun/60 focus:border-skycare-sun/60 ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightIcon ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-skycare-accentRose/80 focus:ring-skycare-accentRose/60'
              : 'border-skycare-softBlue/30 hover:border-skycare-softBlue/60'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 flex items-center text-skycare-cloud/60">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <span className="text-xs text-skycare-accentRose font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-skycare-cloud/60">{helperText}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  value,
  onChange,
  onClear,
  placeholder = 'Search for a city or place...',
  className = '',
  ...props
}, ref) => {
  const hasValue = Boolean(value);

  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-3.5 flex items-center pointer-events-none text-skycare-sun">
        <Search className="w-4 h-4" />
      </div>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-skycare-darkBlue/70 border border-skycare-softBlue/40 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-skycare-cloud/50 backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-skycare-sun focus:border-skycare-sun/80 shadow-inner ${className}`}
        {...props}
      />
      {hasValue && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search query"
          className="absolute right-3 p-1 rounded-full text-skycare-cloud/60 hover:text-white hover:bg-skycare-skyBlue/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
