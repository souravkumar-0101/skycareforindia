import React from 'react';
import { HourlyForecastItem } from '../../types/weather';
import { useApp } from '../../context/AppContext';
import { WeatherIcon } from '../common/WeatherIcon';
import { Droplets, Clock } from 'lucide-react';
import { TRANSLATIONS, getLocalizedTime, getLocalizedCondition } from '../../data/translations';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  className?: string;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourly,
  className = '',
}) => {
  const { formatTemp, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  return (
    <div className={`p-5 sm:p-6 rounded-3xl bg-skycare-darkBlue/75 backdrop-blur-md border border-skycare-softBlue/25 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-skycare-sun" />
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            {t.hourlyForecast}
          </h3>
        </div>
        <span className="text-xs text-skycare-cloud/60">
          {t.hourlySubtitle}
        </span>
      </div>

      {/* Horizontally Scrollable Cards Container */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-2 px-2 scroll-smooth">
        {hourly.map((item, index) => {
          const isCurrent = index === 0;
          const displayTime = getLocalizedTime(item.time, settings.language);
          const displayCondition = getLocalizedCondition(item.conditionLabel, settings.language);

          return (
            <div
              key={index}
              className={`flex-shrink-0 flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-2xl min-w-[90px] sm:min-w-[100px] text-center transition-all duration-200 border ${
                isCurrent
                  ? 'bg-skycare-skyBlue/70 border-skycare-sun shadow-md ring-1 ring-skycare-sun/50'
                  : 'bg-skycare-navy/60 border-skycare-softBlue/20 hover:border-skycare-softBlue/60 hover:bg-skycare-navy/80'
              }`}
            >
              {/* Time */}
              <span className={`text-xs font-semibold ${isCurrent ? 'text-skycare-sun font-bold' : 'text-skycare-cloud/80'}`}>
                {displayTime}
              </span>

              {/* Weather Icon */}
              <div className="my-2.5">
                <WeatherIcon condition={item.condition} size="sm" />
              </div>

              {/* Temperature */}
              <span className="text-base sm:text-lg font-bold text-white font-display">
                {formatTemp(item.temperature)}
              </span>

              <span className="text-[10px] text-skycare-cloud/60 truncate max-w-[80px] block mt-0.5" title={displayCondition}>
                {displayCondition}
              </span>

              {/* Rain Probability */}
              <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-skycare-accentCyan">
                <Droplets className="w-3 h-3" />
                <span>{item.rainProbability}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
