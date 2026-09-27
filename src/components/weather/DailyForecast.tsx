import React, { useState } from 'react';
import { DailyForecastItem } from '../../types/weather';
import { useApp } from '../../context/AppContext';
import { WeatherIcon } from '../common/WeatherIcon';
import { Calendar, Droplets, ChevronDown, ChevronUp, Wind, Sun } from 'lucide-react';
import { TRANSLATIONS, getLocalizedDay, getLocalizedCondition } from '../../data/translations';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  className?: string;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  daily,
  className = '',
}) => {
  const { formatTemp, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Calculate global min and max across all 7 days for the visual temperature bar scale
  const allHighs = daily.map(d => d.highTemp);
  const allLows = daily.map(d => d.lowTemp);
  const minTemp = Math.min(...allLows);
  const maxTemp = Math.max(...allHighs);
  const tempRange = Math.max(maxTemp - minTemp, 1);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={`p-5 sm:p-6 rounded-3xl bg-skycare-darkBlue/75 backdrop-blur-md border border-skycare-softBlue/25 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-skycare-sun" />
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            {t.dailyForecast}
          </h3>
        </div>
        <span className="text-xs text-skycare-cloud/60">
          {t.dailySubtitle}
        </span>
      </div>

      {/* List of 7 days */}
      <div className="space-y-2">
        {daily.map((item, index) => {
          const isToday = index === 0;
          const isExpanded = expandedIndex === index;
          const displayDay = getLocalizedDay(item.day, settings.language);
          const displayCondition = getLocalizedCondition(item.conditionLabel, settings.language);

          // Calculate bar position percentages
          const leftPercent = ((item.lowTemp - minTemp) / tempRange) * 100;
          const widthPercent = Math.max(((item.highTemp - item.lowTemp) / tempRange) * 100, 15);

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isToday
                  ? 'bg-skycare-skyBlue/30 border-skycare-softBlue/40'
                  : 'bg-skycare-navy/40 border-skycare-softBlue/15 hover:border-skycare-softBlue/40 hover:bg-skycare-navy/60'
              }`}
            >
              {/* Main row */}
              <div
                onClick={() => toggleExpand(index)}
                className="flex items-center justify-between p-3 sm:p-4 cursor-pointer select-none"
              >
                {/* Day & Date */}
                <div className="w-20 sm:w-28 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-skycare-sun' : 'text-white'}`}>
                      {displayDay}
                    </span>
                    {isToday && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-skycare-sun/20 text-skycare-sun">
                        {t.today}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-skycare-cloud/60 block">{item.date}</span>
                </div>

                {/* Weather Icon & Rain */}
                <div className="flex items-center gap-2 shrink-0 w-24 sm:w-32">
                  <WeatherIcon condition={item.condition} size="sm" />
                  <div className="flex items-center gap-1 text-xs text-skycare-accentCyan">
                    {item.rainProbability > 0 ? (
                      <>
                        <Droplets className="w-3 h-3" />
                        <span>{item.rainProbability}%</span>
                      </>
                    ) : (
                      <span className="text-skycare-cloud/40 text-[11px]">0%</span>
                    )}
                  </div>
                </div>

                {/* Low temp */}
                <span className="text-xs sm:text-sm font-semibold text-skycare-cloud/60 text-right w-9">
                  {formatTemp(item.lowTemp)}
                </span>

                {/* Visual Temperature Range Bar */}
                <div className="hidden sm:block flex-1 mx-3 h-2 bg-skycare-navy/80 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-skycare-softBlue via-skycare-accentCyan to-skycare-sun"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>

                {/* High temp */}
                <span className="text-xs sm:text-sm font-bold text-white text-right w-9">
                  {formatTemp(item.highTemp)}
                </span>

                {/* Expand Chevron */}
                <div className="ml-2 text-skycare-cloud/50">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 bg-skycare-navy/80 border-t border-skycare-softBlue/20 text-xs text-skycare-cloud/90 animate-fade-in">
                  <p className="font-medium text-white mb-2">{displayCondition} • {item.summary}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-skycare-cloud/70">
                    <div className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-skycare-sun" />
                      <span>{t.uvIndex}: <strong className="text-white">{item.uvIndex}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-skycare-accentCyan" />
                      <span>{t.humidity}: <strong className="text-white">{item.humidity}%</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-skycare-cloud" />
                      <span>{t.windSpeed}: <strong className="text-white">{item.windSpeed} km/h</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
