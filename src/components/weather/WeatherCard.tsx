import React from 'react';
import { FullLocationWeather } from '../../types/weather';
import { useApp } from '../../context/AppContext';
import { WeatherIcon } from '../common/WeatherIcon';
import { MapPin, ArrowUp, ArrowDown, Sparkles, Clock } from 'lucide-react';
import { TRANSLATIONS, getLocalizedCondition } from '../../data/translations';

interface WeatherCardProps {
  weather: FullLocationWeather;
  onLocationClick?: () => void;
  className?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  onLocationClick,
  className = '',
}) => {
  const { formatTemp, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const current = weather.current;
  const location = weather.location;
  const displayCondition = getLocalizedCondition(current.conditionLabel, settings.language);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-skycare-skyBlue/80 via-skycare-darkBlue/90 to-skycare-navy/95 border border-skycare-softBlue/30 p-6 sm:p-8 md:p-10 shadow-weather-card transition-all duration-300 hover:border-skycare-softBlue/50 text-left ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-skycare-sun/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-skycare-softBlue/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Location & Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
        <button
          onClick={onLocationClick}
          className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-skycare-sun rounded-xl p-1 -m-1"
        >
          <div className="p-2.5 rounded-xl bg-skycare-navy/70 text-skycare-sun border border-skycare-softBlue/20 group-hover:border-skycare-sun/40 transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display group-hover:text-skycare-sun transition-colors">
                {location.city}, {location.state}
              </h1>
              {location.isCurrent && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-skycare-accentCyan/20 text-skycare-accentCyan border border-skycare-accentCyan/30">
                  {t.activeBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-skycare-cloud/75 font-medium">
              India • Indian Standard Time (IST)
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2 bg-skycare-navy/60 px-3 py-1.5 rounded-xl border border-skycare-softBlue/20 text-xs text-skycare-cloud/80">
          <Clock className="w-3.5 h-3.5 text-skycare-softBlue" />
          <span>{t.now} • {t.today}</span>
        </div>
      </div>

      {/* Main Temperature & Weather Hero Visual */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left: Temp & Condition */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-3">
            <span className="text-6xl sm:text-7xl md:text-8xl font-black text-white font-display tracking-tighter drop-shadow-md">
              {formatTemp(current.temp)}
            </span>
            <div className="flex flex-col text-xs sm:text-sm text-skycare-cloud/85 font-medium">
              <span>{t.feelsLike} {formatTemp(current.feelsLike)}</span>
              <div className="flex items-center gap-2 mt-1 text-skycare-cloud/70">
                <span className="flex items-center text-skycare-sun font-semibold">
                  <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
                  {formatTemp(current.highTemp)}
                </span>
                <span className="text-skycare-softBlue/60">/</span>
                <span className="flex items-center text-skycare-cloud/60">
                  <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
                  {formatTemp(current.lowTemp)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-skycare-cloud font-display tracking-tight flex items-center gap-2">
              <span>{displayCondition}</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-skycare-cloud/80 max-w-md leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>

        {/* Right: Weather Icon & Visual Card */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-skycare-darkBlue/40 border border-skycare-softBlue/20 backdrop-blur-md">
          <WeatherIcon
            condition={current.condition}
            size="hero"
            className="my-2 filter drop-shadow-xl"
          />
          <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-skycare-skyBlue/40 border border-skycare-softBlue/30 text-xs font-semibold text-skycare-cloud">
            <Sparkles className="w-3.5 h-3.5 text-skycare-sun" />
            <span>{t.optimalRoutine}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
