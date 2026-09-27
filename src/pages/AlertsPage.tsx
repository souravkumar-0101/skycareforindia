import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCard, SafetyGuidanceCard } from '../components/weather/AlertCard';
import { VERIFIED_ALERTS, SAFETY_GUIDANCE_LIST } from '../data/mockData';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { TRANSLATIONS, getLocalizedAlerts, getLocalizedGuidance } from '../data/translations';

export const AlertsPage: React.FC = () => {
  const { activeWeather, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified' | 'guidance'>('all');

  const localizedAlerts = getLocalizedAlerts(VERIFIED_ALERTS, settings.language);
  const localizedGuidance = getLocalizedGuidance(SAFETY_GUIDANCE_LIST, settings.language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-skycare-softBlue/20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-skycare-accentAmber/20 text-skycare-sun text-xs font-semibold mb-2 border border-skycare-accentAmber/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>IMD & Disaster Preparedness • {activeWeather.location.city}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            {t.alertsSafety}
          </h1>
          <p className="text-xs sm:text-sm text-skycare-cloud/70">
            {t.alertsSafetySubtitle} ({activeWeather.location.city}, {activeWeather.location.state})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedFilter === 'all'
                ? 'bg-skycare-sun text-skycare-navy border-skycare-sun font-bold'
                : 'bg-skycare-darkBlue/70 text-skycare-cloud border-skycare-softBlue/30 hover:bg-skycare-darkBlue'
            }`}
          >
            {t.allProtocols}
          </button>
          <button
            onClick={() => setSelectedFilter('verified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedFilter === 'verified'
                ? 'bg-skycare-sun text-skycare-navy border-skycare-sun font-bold'
                : 'bg-skycare-darkBlue/70 text-skycare-cloud border-skycare-softBlue/30 hover:bg-skycare-darkBlue'
            }`}
          >
            {t.verifiedAlerts} ({localizedAlerts.length})
          </button>
          <button
            onClick={() => setSelectedFilter('guidance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedFilter === 'guidance'
                ? 'bg-skycare-sun text-skycare-navy border-skycare-sun font-bold'
                : 'bg-skycare-darkBlue/70 text-skycare-cloud border-skycare-softBlue/30 hover:bg-skycare-darkBlue'
            }`}
          >
            {t.safetyGuidance} ({localizedGuidance.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: VERIFIED ALERTS */}
      {(selectedFilter === 'all' || selectedFilter === 'verified') && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-skycare-accentAmber/20 text-skycare-accentAmber">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display uppercase tracking-wide">
                {t.imdVerifiedAlerts}
              </h2>
              <p className="text-xs text-skycare-cloud/70">
                {t.alertsSafetySubtitle}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {localizedAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: SKYCARE SAFETY GUIDANCE */}
      {(selectedFilter === 'all' || selectedFilter === 'guidance') && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-skycare-sun/20 text-skycare-sun">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display uppercase tracking-wide">
                {t.skycareIndianGuidance}
              </h2>
              <p className="text-xs text-skycare-cloud/70">
                {t.alertsSafetySubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {localizedGuidance.map((guidance) => (
              <SafetyGuidanceCard key={guidance.id} guidance={guidance} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
