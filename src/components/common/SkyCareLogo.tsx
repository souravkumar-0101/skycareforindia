import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../data/translations';

interface SkyCareLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SkyCareLogo: React.FC<SkyCareLogoProps> = ({
  size = 'md',
  showSlogan = false,
  onClick,
  className = '',
}) => {
  const { settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const sizeMap = {
    sm: {
      icon: 'w-7 h-7',
      text: 'text-lg',
      slogan: 'text-[10px]',
      sun: 'w-2 h-2',
    },
    md: {
      icon: 'w-9 h-9',
      text: 'text-xl',
      slogan: 'text-xs',
      sun: 'w-2.5 h-2.5',
    },
    lg: {
      icon: 'w-12 h-12',
      text: 'text-2xl md:text-3xl',
      slogan: 'text-xs md:text-sm',
      sun: 'w-3.5 h-3.5',
    },
  };

  const s = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Brand Icon */}
      <div className={`relative ${s.icon} rounded-xl bg-gradient-to-br from-skycare-skyBlue via-skycare-darkBlue to-skycare-navy p-1.5 flex items-center justify-center border border-skycare-softBlue/30 shadow-md shadow-skycare-navy/60 group-hover:border-skycare-sun/50 transition-all duration-300`}>
        {/* Sun Glow */}
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-skycare-sun/40 rounded-full blur-[2px]" />
        
        {/* SVG Logo Graphic */}
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
          {/* Glowing Sun */}
          <circle cx="21" cy="11" r="5" fill="#F5C978" />
          <circle cx="21" cy="11" r="7" stroke="#F5C978" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
          
          {/* Cloud Formation */}
          <path
            d="M9 23C7.34315 23 6 21.6569 6 20C6 18.45 7.15 17.17 8.65 17.02C9.09 14.15 11.55 12 14.5 12C17.06 12 19.25 13.62 19.86 15.91C20.21 15.84 20.57 15.8 20.94 15.8C22.63 15.8 24 17.17 24 18.86C24 20.55 22.63 21.92 20.94 21.92L9 23Z"
            fill="#DCEAF3"
            opacity="0.95"
          />
          {/* Lower Arc Wave */}
          <path
            d="M6 25C10 23.5 16 23.5 24 25"
            stroke="#3F78A3"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-white font-display ${s.text}`}>
            {t.brandPrefix}<span className="text-skycare-sun">{t.brandSuffix}</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-skycare-accentCyan animate-pulse" />
        </div>
        {showSlogan && (
          <span className={`text-skycare-cloud/70 font-medium tracking-normal ${s.slogan}`}>
            {t.brandSlogan}
          </span>
        )}
      </div>
    </div>
  );
};
