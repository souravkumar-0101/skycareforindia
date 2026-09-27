import React from 'react';
import { useApp } from '../context/AppContext';
import { WeatherCard } from '../components/weather/WeatherCard';
import { WeatherMetricsGrid } from '../components/weather/WeatherMetric';
import { InsightCard } from '../components/weather/InsightCard';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { DailyForecast } from '../components/weather/DailyForecast';
import { AlertCard, SafetyGuidanceCard } from '../components/weather/AlertCard';
import { VERIFIED_ALERTS, SAFETY_GUIDANCE_LIST } from '../data/mockData';
import { Calendar, ShieldCheck, ArrowRight, RefreshCw, MapPin } from 'lucide-react';
import { TRANSLATIONS, getLocalizedPurpose, getLocalizedAlerts, getLocalizedGuidance } from '../data/translations';

export const HomeDashboard: React.FC = () => {
  const { 
    user, 
    activeWeather, 
    formattedCurrentDate, 
    navigateTo, 
    showToast, 
    settings 
  } = useApp();

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const getTranslatedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return t.goodMorning;
    if (hour >= 12 && hour < 17) return t.goodAfternoon;
    return t.goodEvening;
  };

  const handleRefresh = () => {
    showToast(t.skycareInsight, `Updated live data for ${activeWeather.location.city}, ${activeWeather.location.state}`, 'info');
  };

  const localizedPurpose = getLocalizedPurpose(user.primaryInterest, settings.language);
  const localizedAlerts = getLocalizedAlerts(VERIFIED_ALERTS, settings.language);
  const localizedGuidance = getLocalizedGuidance(SAFETY_GUIDANCE_LIST, settings.language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in text-left">
      {/* Top Greeting & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-skycare-softBlue/20">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {getTranslatedGreeting()}, {user.fullName.split(' ')[0]}
            </h1>
            <span className="inline-block animate-pulse text-skycare-sun">✨</span>
          </div>
          <p className="text-xs sm:text-sm text-skycare-cloud/70 flex items-center gap-2 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-skycare-sun" />
            <span>{formattedCurrentDate}</span>
            <span>•</span>
            <span className="text-skycare-sun font-bold">{localizedPurpose}</span>
          </p>
        </div>

        {/* Quick action pill: Indian City Switcher / Refresh */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('locations')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-skycare-darkBlue/70 hover:bg-skycare-darkBlue text-xs font-semibold text-skycare-cloud border border-skycare-softBlue/30 transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun"
          >
            <MapPin className="w-3.5 h-3.5 text-skycare-sun" />
            <span>{activeWeather.location.city}, {activeWeather.location.state}</span>
          </button>
          <button
            onClick={handleRefresh}
            title="Refresh Forecast"
            aria-label="Refresh Forecast"
            className="p-2 rounded-xl bg-skycare-darkBlue/70 hover:bg-skycare-darkBlue text-skycare-cloud hover:text-white border border-skycare-softBlue/30 transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Indian Weather Card */}
      <WeatherCard
        weather={activeWeather}
        onLocationClick={() => navigateTo('locations')}
      />

      {/* Personalized SkyCare Insight for Indian Lifestyle */}
      <InsightCard onCustomizeClick={() => navigateTo('onboarding')} />

      {/* Key Atmospheric Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            {t.airQuality} & {t.humidity}
          </h3>
          <button
            onClick={() => navigateTo('weather')}
            className="text-xs text-skycare-sun font-semibold hover:underline flex items-center gap-1"
          >
            <span>{t.telemetryLink}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <WeatherMetricsGrid metrics={activeWeather.current.metrics} />
      </div>

      {/* Forecast Section: Hourly & 7-Day */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <HourlyForecast hourly={activeWeather.hourly} />
        </div>

        <div className="lg:col-span-12">
          <DailyForecast daily={activeWeather.daily} />
        </div>
      </div>

      {/* Safety Section: IMD Alerts & SkyCare Guidance */}
      <div className="space-y-4 pt-4 border-t border-skycare-softBlue/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-skycare-accentEmerald" />
            <h3 className="text-lg font-bold text-white font-display">
              {t.alertsSafety} ({activeWeather.location.city})
            </h3>
          </div>
          <button
            onClick={() => navigateTo('alerts')}
            className="text-xs text-skycare-sun font-semibold hover:underline flex items-center gap-1"
          >
            <span>{t.allProtocols} ({localizedAlerts.length + localizedGuidance.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {localizedAlerts.length > 0 && (
          <AlertCard alert={localizedAlerts[0]} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {localizedGuidance.slice(0, 3).map((guidance) => (
            <SafetyGuidanceCard key={guidance.id} guidance={guidance} />
          ))}
        </div>
      </div>
    </div>
  );
};
