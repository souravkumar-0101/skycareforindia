import React from 'react';
import { useApp } from '../context/AppContext';
import { WeatherCard } from '../components/weather/WeatherCard';
import { WeatherMetricsGrid } from '../components/weather/WeatherMetric';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { DailyForecast } from '../components/weather/DailyForecast';
import { AirQualityCard, SunArcCard } from '../components/weather/AirQualityCard';
import { MapPin, CloudSun } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const WeatherPage: React.FC = () => {
  const { 
    activeWeather, 
    locations, 
    activeLocationId, 
    setActiveLocation, 
    navigateTo,
    settings
  } = useApp();

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-skycare-softBlue/20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skycare-skyBlue/30 text-skycare-sun text-xs font-semibold mb-2 border border-skycare-sun/30">
            <CloudSun className="w-3.5 h-3.5" />
            <span>{t.navWeather} • IMD & CPCB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            {t.navWeather}
          </h1>
          <p className="text-xs sm:text-sm text-skycare-cloud/70">
            {t.alertsSafetySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {locations.map((loc) => {
            const isActive = loc.location.id === activeLocationId;
            return (
              <button
                key={loc.location.id}
                onClick={() => setActiveLocation(loc.location.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-skycare-sun text-skycare-navy border-skycare-sun shadow-sm font-bold'
                    : 'bg-skycare-darkBlue/70 text-skycare-cloud border-skycare-softBlue/20 hover:border-skycare-softBlue/60 hover:bg-skycare-darkBlue'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{loc.location.city}</span>
              </button>
            );
          })}
          <button
            onClick={() => navigateTo('locations')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-skycare-sun bg-skycare-navy/80 border border-skycare-sun/30 hover:bg-skycare-navy transition-colors whitespace-nowrap"
          >
            {t.addCityBtn}
          </button>
        </div>
      </div>

      <WeatherCard
        weather={activeWeather}
        onLocationClick={() => navigateTo('locations')}
      />

      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white font-display">
          {t.precisionTelemetry}
        </h3>
        <WeatherMetricsGrid metrics={activeWeather.current.metrics} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SunArcCard sunTimes={activeWeather.current.sunTimes} />
        <AirQualityCard metrics={activeWeather.current.metrics} />
      </div>

      <HourlyForecast hourly={activeWeather.hourly} />

      <DailyForecast daily={activeWeather.daily} />
    </div>
  );
};
