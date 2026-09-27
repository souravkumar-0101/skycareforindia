import React from 'react';
import { FullLocationWeather } from '../../types/weather';
import { useApp } from '../../context/AppContext';
import { WeatherIcon } from '../common/WeatherIcon';
import { Trash2, CheckCircle, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';
import { TRANSLATIONS, getLocalizedCondition } from '../../data/translations';

interface LocationCardProps {
  weather: FullLocationWeather;
  isActive: boolean;
  onMakeActive: () => void;
  onDelete: () => void;
  onViewWeather: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  weather,
  isActive,
  onMakeActive,
  onDelete,
  onViewWeather,
}) => {
  const { formatTemp, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const loc = weather.location;
  const current = weather.current;
  const displayCondition = getLocalizedCondition(current.conditionLabel, settings.language);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 border text-left ${
        isActive
          ? 'bg-gradient-to-br from-skycare-skyBlue/80 via-skycare-darkBlue/90 to-skycare-navy/95 border-skycare-sun/60 shadow-weather-card ring-1 ring-skycare-sun/40'
          : 'bg-skycare-darkBlue/60 hover:bg-skycare-darkBlue/80 border-skycare-softBlue/25 hover:border-skycare-softBlue/50'
      }`}
    >
      {/* Top row: City Name, State, Active Badge & Delete */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {loc.city}
            </h3>
            {isActive && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-skycare-sun text-skycare-navy">
                {t.activeBadge}
              </span>
            )}
          </div>
          <p className="text-xs text-skycare-cloud/70">
            {loc.state}, India
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {!isActive && (
            <button
              onClick={onDelete}
              aria-label={`Delete ${loc.city}`}
              title="Delete location"
              className="p-2 rounded-xl text-skycare-cloud/50 hover:text-skycare-accentRose hover:bg-skycare-navy/60 transition-colors focus:outline-none focus:ring-2 focus:ring-skycare-accentRose"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Middle row: Large Temperature & Weather Icon */}
      <div className="flex items-center justify-between my-3">
        <div>
          <span className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
            {formatTemp(current.temp)}
          </span>
          <p className="text-xs sm:text-sm font-semibold text-skycare-cloud/90 mt-0.5">
            {displayCondition}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-skycare-cloud/70">
            <span className="flex items-center text-skycare-sun font-semibold">
              <ArrowUp className="w-3 h-3 mr-0.5" />
              {formatTemp(current.highTemp)}
            </span>
            <span>/</span>
            <span className="flex items-center text-skycare-cloud/60">
              <ArrowDown className="w-3 h-3 mr-0.5" />
              {formatTemp(current.lowTemp)}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-skycare-navy/50 border border-skycare-softBlue/20">
          <WeatherIcon condition={current.condition} size="md" />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-skycare-softBlue/20">
        <button
          onClick={onViewWeather}
          className="flex items-center gap-1 text-xs font-semibold text-skycare-cloud hover:text-white transition-colors"
        >
          <span>{t.viewForecast}</span>
          <ExternalLink className="w-3 h-3 text-skycare-sun" />
        </button>

        {!isActive ? (
          <button
            onClick={onMakeActive}
            className="px-3 py-1.5 rounded-xl bg-skycare-skyBlue/80 hover:bg-skycare-skyBlue text-xs font-semibold text-white border border-skycare-softBlue/40 transition-colors"
          >
            {t.makeActiveBtn}
          </button>
        ) : (
          <span className="flex items-center gap-1 text-xs font-semibold text-skycare-sun">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{t.currentlyActive}</span>
          </span>
        )}
      </div>
    </div>
  );
};
