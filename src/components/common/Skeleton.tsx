import React, { ReactNode } from 'react';
import { CloudRain, AlertCircle, RefreshCw, Compass } from 'lucide-react';
import { Button } from './Button';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
}) => {
  const variantStyles = {
    text: 'h-4 rounded-md',
    rect: 'rounded-xl',
    circle: 'rounded-full',
  };

  return (
    <div
      className={`animate-pulse bg-skycare-skyBlue/30 border border-skycare-softBlue/10 ${variantStyles[variant]} ${className}`}
    />
  );
};

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Compass className="w-10 h-10 text-skycare-softBlue" />,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-2xl glass-panel ${className}`}>
      <div className="p-4 rounded-2xl bg-skycare-skyBlue/20 text-skycare-sun mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white font-display mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-skycare-cloud/70 max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Weather Data',
  message = 'We could not connect to the meteorological service. Please check your connection and try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-skycare-navy/80 border border-skycare-accentRose/30 ${className}`}>
      <div className="p-3.5 rounded-2xl bg-skycare-accentRose/15 text-skycare-accentRose mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white font-display mb-1.5">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-skycare-cloud/70 max-w-md mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
