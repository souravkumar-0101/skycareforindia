import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings as SettingsIcon, 
  Thermometer, 
  Wind, 
  MapPin, 
  Bell, 
  ShieldCheck, 
  Info, 
  Sliders, 
  Sun, 
  Languages
} from 'lucide-react';
import { INDIAN_LANGUAGES } from '../data/mockData';
import { IndianLanguage } from '../types/weather';
import { TRANSLATIONS } from '../data/translations';

export const SettingsPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    setTempUnit,
    setLanguage 
  } = useApp();

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-in text-left">
      <div className="pb-2 border-b border-skycare-softBlue/20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skycare-skyBlue/30 text-skycare-sun text-xs font-semibold mb-2 border border-skycare-sun/30">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>{t.settings}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
          {t.settings}
        </h1>
        <p className="text-xs sm:text-sm text-skycare-cloud/70">
          {t.selectCitySubtitle}
        </p>
      </div>

      {/* 1. REGIONAL LANGUAGE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-skycare-sun" />
          <h2 className="text-base sm:text-lg font-bold text-white font-display">
            {t.languageRegionTitle}
          </h2>
        </div>

        <div className="rounded-2xl bg-skycare-darkBlue/60 border border-skycare-softBlue/20 p-5 space-y-3">
          <div>
            <h4 className="text-sm font-bold text-white">{t.preferredLanguage}</h4>
            <p className="text-xs text-skycare-cloud/70">
              {t.languageName} • SkyCare India Multi-Lingual Sync
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2">
            {INDIAN_LANGUAGES.map((lang) => {
              const isSelected = settings.language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code as IndianLanguage)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-skycare-sun text-skycare-navy border-skycare-sun font-bold shadow-sm'
                      : 'bg-skycare-navy/70 text-skycare-cloud border-skycare-softBlue/20 hover:border-skycare-softBlue/50'
                  }`}
                >
                  <span className="text-xs font-bold block">{lang.name}</span>
                  <span className="text-[10px] block opacity-80">{lang.native}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. UNITS & PREFERENCES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-skycare-sun" />
          <h2 className="text-base sm:text-lg font-bold text-white font-display">
            {t.measurementTitle}
          </h2>
        </div>

        <div className="rounded-2xl bg-skycare-darkBlue/60 border border-skycare-softBlue/20 divide-y divide-skycare-softBlue/20">
          {/* Temperature Unit */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-skycare-navy text-skycare-sun mt-0.5">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.tempUnitLabel}</h4>
                <p className="text-xs text-skycare-cloud/70">Standard Indian convention: Celsius (°C)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => setTempUnit('C')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  settings.tempUnit === 'C'
                    ? 'bg-skycare-sun text-skycare-navy border-skycare-sun shadow-sm'
                    : 'bg-skycare-navy/80 text-skycare-cloud border-skycare-softBlue/30 hover:bg-skycare-navy'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                type="button"
                onClick={() => setTempUnit('F')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  settings.tempUnit === 'F'
                    ? 'bg-skycare-sun text-skycare-navy border-skycare-sun shadow-sm'
                    : 'bg-skycare-navy/80 text-skycare-cloud border-skycare-softBlue/30 hover:bg-skycare-navy'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          {/* Wind Speed Unit */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-skycare-navy text-skycare-cloud mt-0.5">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.windUnitLabel}</h4>
                <p className="text-xs text-skycare-cloud/70">{t.windSpeed} (km/h)</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-center">
              {(['km/h', 'mph', 'm/s'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => updateSettings({ windSpeedUnit: unit })}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    settings.windSpeedUnit === unit
                      ? 'bg-skycare-skyBlue text-white border-skycare-softBlue font-bold'
                      : 'bg-skycare-navy/80 text-skycare-cloud/70 border-skycare-softBlue/20'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION & GEO PREFERENCES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-skycare-sun" />
          <h2 className="text-base sm:text-lg font-bold text-white font-display">
            {t.locationPrefTitle}
          </h2>
        </div>

        <div className="rounded-2xl bg-skycare-darkBlue/60 border border-skycare-softBlue/20 divide-y divide-skycare-softBlue/20">
          <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-skycare-navy text-skycare-accentCyan mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.autoGpsLabel}</h4>
                <p className="text-xs text-skycare-cloud/70">{t.autoGpsDesc}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => updateSettings({ autoLocateOnLaunch: !settings.autoLocateOnLaunch })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.autoLocateOnLaunch ? 'bg-skycare-sun' : 'bg-skycare-navy border border-skycare-softBlue/40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-skycare-navy transition-transform ${
                  settings.autoLocateOnLaunch ? 'translate-x-6 bg-skycare-navy' : 'translate-x-0 bg-skycare-cloud/50'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 4. NOTIFICATIONS & ALERTS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-skycare-sun" />
          <h2 className="text-base sm:text-lg font-bold text-white font-display">
            {t.notificationPrefTitle}
          </h2>
        </div>

        <div className="rounded-2xl bg-skycare-darkBlue/60 border border-skycare-softBlue/20 divide-y divide-skycare-softBlue/20">
          <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-skycare-navy text-skycare-accentAmber mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.pushAlertsLabel}</h4>
                <p className="text-xs text-skycare-cloud/70">{t.pushAlertsDesc}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => updateSettings({ enablePushAlerts: !settings.enablePushAlerts })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                settings.enablePushAlerts ? 'bg-skycare-sun' : 'bg-skycare-navy border border-skycare-softBlue/40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-skycare-navy transition-transform ${
                  settings.enablePushAlerts ? 'translate-x-6' : 'translate-x-0 bg-skycare-cloud/50'
                }`}
              />
            </button>
          </div>

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-skycare-navy text-skycare-sun mt-0.5">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t.morningBriefingLabel}</h4>
                <p className="text-xs text-skycare-cloud/70">{t.morningBriefingDesc}</p>
              </div>
            </div>

            <span className="text-xs font-bold text-skycare-sun bg-skycare-navy/80 px-3 py-1.5 rounded-xl border border-skycare-softBlue/30 self-end sm:self-center">
              {settings.dailyBriefingTime} IST
            </span>
          </div>
        </div>
      </section>

      {/* 5. ABOUT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-skycare-sun" />
          <h2 className="text-base sm:text-lg font-bold text-white font-display">
            {t.aboutTitle}
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-skycare-darkBlue/60 border border-skycare-softBlue/20 space-y-2 text-xs text-skycare-cloud/80 leading-relaxed">
          <div className="flex items-center justify-between font-semibold text-white">
            <span>SkyCare India Web Edition</span>
            <span className="text-skycare-sun">{t.versionLabel}</span>
          </div>
          <p>
            SkyCare is tailored specifically for Indian users, supporting all Indian seasons (Summer, Monsoon, Post-Monsoon, Winter) with localized intelligence for commuting, farming, functions, and family health.
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-skycare-cloud/50">
            <ShieldCheck className="w-3.5 h-3.5 text-skycare-accentEmerald" />
            <span>Built with modern responsive TypeScript & React • Indian Meteorological Standards</span>
          </div>
        </div>
      </section>
    </div>
  );
};
