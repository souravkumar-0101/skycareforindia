import React from 'react';
import { WeatherMetrics, SunTimes } from '../../types/weather';
import { useApp } from '../../context/AppContext';
import { Activity, Sunrise, Sunset, Sun, HeartPulse } from 'lucide-react';
import { TRANSLATIONS, getLocalizedCondition } from '../../data/translations';

interface AirQualityCardProps {
  metrics: WeatherMetrics;
  className?: string;
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({
  metrics,
  className = '',
}) => {
  const { settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const aqi = metrics.airQualityIndex;
  const displayStatus = getLocalizedCondition(metrics.airQualityStatus, settings.language);
  
  // Calculate percentage for progress bar (max 300)
  const percent = Math.min((aqi / 200) * 100, 100);

  return (
    <div className={`p-5 sm:p-6 rounded-3xl bg-skycare-darkBlue/75 backdrop-blur-md border border-skycare-softBlue/25 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-skycare-accentEmerald" />
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            {t.airQualityHealth}
          </h3>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-skycare-accentEmerald/20 text-skycare-accentEmerald border border-skycare-accentEmerald/30">
          {displayStatus}
        </span>
      </div>

      {/* Main AQI Meter */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-extrabold text-white font-display">
          {aqi}
        </span>
        <span className="text-xs text-skycare-cloud/70 font-semibold uppercase tracking-wider">
          {t.aqiStandard}
        </span>
      </div>

      {/* Gauge Bar */}
      <div className="w-full h-2.5 bg-skycare-navy rounded-full overflow-hidden mb-4 relative">
        <div
          className="h-full bg-gradient-to-r from-skycare-accentEmerald via-skycare-sun to-skycare-accentRose rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Pollutant Breakdown Grid */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-skycare-navy/60 border border-skycare-softBlue/20 text-center mb-4">
        <div>
          <span className="text-[10px] text-skycare-cloud/60 uppercase font-semibold block">PM 2.5</span>
          <span className="text-xs sm:text-sm font-bold text-white">8.4 µg/m³</span>
        </div>
        <div>
          <span className="text-[10px] text-skycare-cloud/60 uppercase font-semibold block">PM 10</span>
          <span className="text-xs sm:text-sm font-bold text-white">16.2 µg/m³</span>
        </div>
        <div>
          <span className="text-[10px] text-skycare-cloud/60 uppercase font-semibold block">O3 Ozone</span>
          <span className="text-xs sm:text-sm font-bold text-white">28 ppb</span>
        </div>
      </div>

      {/* Health Guidance Message */}
      <div className="flex items-start gap-2.5 text-xs text-skycare-cloud/80 leading-relaxed">
        <HeartPulse className="w-4 h-4 text-skycare-accentEmerald shrink-0 mt-0.5" />
        <span>
          {t.aqiGoodHealthNote}
        </span>
      </div>
    </div>
  );
};

interface SunArcCardProps {
  sunTimes: SunTimes;
  className?: string;
}

export const SunArcCard: React.FC<SunArcCardProps> = ({
  sunTimes,
  className = '',
}) => {
  const { settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  return (
    <div className={`p-5 sm:p-6 rounded-3xl bg-skycare-darkBlue/75 backdrop-blur-md border border-skycare-softBlue/25 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-skycare-sun" />
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            {t.solarCycle}
          </h3>
        </div>
        <span className="text-xs text-skycare-cloud/60">
          {t.goldenHour} {sunTimes.goldenHour}
        </span>
      </div>

      {/* Visual Sun Arc graphic */}
      <div className="relative w-full h-24 my-2 flex items-center justify-center">
        {/* Arc stroke */}
        <svg viewBox="0 0 200 100" className="w-full h-full max-w-[240px] overflow-visible">
          <path
            d="M 10 90 A 90 90 0 0 1 190 90"
            fill="none"
            stroke="rgba(63, 120, 163, 0.3)"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          {/* Active daylight arc */}
          <path
            d="M 10 90 A 90 90 0 0 1 140 35"
            fill="none"
            stroke="#F5C978"
            strokeWidth="3"
          />
          {/* Glowing sun node on arc */}
          <circle cx="140" cy="35" r="7" fill="#F5C978" className="animate-pulse" />
          <circle cx="140" cy="35" r="12" stroke="#F5C978" strokeWidth="1" strokeOpacity="0.4" />
          {/* Baseline horizon */}
          <line x1="0" y1="90" x2="200" y2="90" stroke="rgba(220, 234, 243, 0.2)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Sunrise & Sunset Times */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-skycare-navy/60 border border-skycare-softBlue/20">
          <div className="p-2 rounded-xl bg-skycare-sun/20 text-skycare-sun">
            <Sunrise className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-skycare-cloud/60 uppercase font-bold block">{t.sunrise}</span>
            <span className="text-sm font-bold text-white">{sunTimes.sunrise}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-skycare-navy/60 border border-skycare-softBlue/20">
          <div className="p-2 rounded-xl bg-skycare-softBlue/20 text-skycare-softBlue">
            <Sunset className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-skycare-cloud/60 uppercase font-bold block">{t.sunset}</span>
            <span className="text-sm font-bold text-white">{sunTimes.sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
