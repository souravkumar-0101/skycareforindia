import React from 'react';
import { WeatherConditionType } from '../../types/weather';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  Wind, 
  CloudFog, 
  Moon
} from 'lucide-react';

interface WeatherIconProps {
  condition: WeatherConditionType | string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  animated?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  condition,
  size = 'md',
  className = '',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    hero: 'w-24 h-24 md:w-32 md:h-32',
  };

  const currentSize = sizeClasses[size];

  // Custom styled weather icon renders
  switch (condition) {
    case 'sunny':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          {animated && (
            <div className="absolute inset-0 rounded-full bg-skycare-sun/20 blur-md animate-pulse" />
          )}
          <Sun className={`w-full h-full text-skycare-sun ${animated ? 'animate-[spin_20s_linear_infinite]' : ''}`} />
        </div>
      );

    case 'partly-cloudy':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          {animated && (
            <div className="absolute -top-1 -right-1 w-2/3 h-2/3 rounded-full bg-skycare-sun/25 blur-sm" />
          )}
          <CloudSun className="w-full h-full text-skycare-cloud" />
        </div>
      );

    case 'cloudy':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <Cloud className="w-full h-full text-skycare-cloud/80" />
        </div>
      );

    case 'rain':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          {animated && (
            <div className="absolute inset-0 rounded-full bg-skycare-softBlue/20 blur-sm animate-pulse" />
          )}
          <CloudRain className="w-full h-full text-skycare-accentCyan" />
        </div>
      );

    case 'heavy-rain':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <CloudRain className="w-full h-full text-skycare-softBlue" />
        </div>
      );

    case 'thunderstorm':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          {animated && (
            <div className="absolute inset-0 rounded-full bg-skycare-sun/20 blur-md animate-ping" />
          )}
          <CloudLightning className="w-full h-full text-skycare-sun" />
        </div>
      );

    case 'snow':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <CloudSnow className="w-full h-full text-white" />
        </div>
      );

    case 'windy':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <Wind className="w-full h-full text-skycare-cloud" />
        </div>
      );

    case 'foggy':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <CloudFog className="w-full h-full text-skycare-cloud/70" />
        </div>
      );

    case 'night':
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <Moon className="w-full h-full text-skycare-sun" />
        </div>
      );

    default:
      return (
        <div className={`relative flex items-center justify-center ${currentSize} ${className}`}>
          <Sun className="w-full h-full text-skycare-sun" />
        </div>
      );
  }
};
