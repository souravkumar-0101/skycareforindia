import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { WeatherIcon } from '../components/common/WeatherIcon';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Clock, 
  CheckCircle2, 
  Shield, 
  Globe 
} from 'lucide-react';
import { PrimaryInterest } from '../types/weather';
import { getPersonaInsight } from '../data/mockData';
import { TRANSLATIONS, getLocalizedSuitability } from '../data/translations';

export const LandingPage: React.FC = () => {
  const { navigateTo, formatTemp, activeWeather, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const [selectedPersona, setSelectedPersona] = useState<PrimaryInterest>('Daily Planning');

  const personas: { id: PrimaryInterest; icon: string; label: string; desc: string }[] = [
    { id: 'Daily Planning', icon: '🌦', label: t.purposePlanning, desc: t.purposePlanningDesc },
    { id: 'Daily Commute', icon: '🚗', label: t.purposeCommute, desc: t.purposeCommuteDesc },
    { id: 'Fitness & Outdoor Activities', icon: '🏃', label: t.purposeFitness, desc: t.purposeFitnessDesc },
    { id: 'Travel', icon: '✈️', label: t.purposeTravel, desc: t.purposeTravelDesc },
    { id: 'Farming & Gardening', icon: '🌱', label: t.purposeFarming, desc: t.purposeFarmingDesc },
    { id: 'Family Safety', icon: '👨‍👩‍👧', label: t.purposeSafety, desc: t.purposeSafetyDesc },
    { id: 'General Weather', icon: '☀️', label: t.navWeather, desc: t.onboardingSubtitle },
  ];

  const currentInsight = getPersonaInsight(selectedPersona, activeWeather, settings.language);
  const displaySuitability = getLocalizedSuitability(currentInsight.suitabilityLabel, settings.language);

  return (
    <div className="flex flex-col min-h-screen text-skycare-cloud overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-skycare-skyBlue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-skycare-sun/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-skycare-skyBlue/40 border border-skycare-sun/30 text-xs font-bold text-skycare-sun shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SkyCare India • {t.languageName}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-display tracking-tight leading-[1.08]">
              Weather that <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-skycare-sun via-skycare-cloud to-white">
                understands you.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-skycare-cloud/80 max-w-xl font-normal leading-relaxed">
              {t.createAccountSubtitle} {t.onboardingSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigateTo('signup')}
                rightIcon={<ArrowRight className="w-4 h-4 text-skycare-navy" />}
              >
                {t.createAccountBtn}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigateTo('home')}
                leftIcon={<Compass className="w-4 h-4 text-skycare-sun" />}
              >
                {t.launchBtn}
              </Button>
            </div>

            <div className="pt-6 border-t border-skycare-softBlue/20 flex flex-wrap items-center gap-6 text-xs text-skycare-cloud/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-skycare-accentEmerald" />
                <span>{t.verifiedAlerts}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-skycare-sun" />
                <span>{t.skycareInsight}</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Atmospheric Indian Weather Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-skycare-skyBlue/90 via-skycare-darkBlue/95 to-skycare-navy border border-skycare-softBlue/40 p-6 sm:p-8 shadow-2xl shadow-skycare-navy/90 text-left backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-skycare-navy/60 text-skycare-sun border border-skycare-softBlue/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-display">Vadodara, Gujarat</h3>
                    <p className="text-[11px] text-skycare-cloud/60">India • Indian Standard Time</p>
                  </div>
                </div>
                <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-skycare-accentEmerald/20 text-skycare-accentEmerald border border-skycare-accentEmerald/30">
                  {t.activeBadge}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-6xl font-black text-white font-display tracking-tight">
                    {formatTemp(29)}
                  </span>
                  <p className="text-sm font-semibold text-skycare-cloud mt-1">Partly Cloudy</p>
                  <p className="text-xs text-skycare-cloud/70">{t.feelsLike} {formatTemp(31)}</p>
                </div>
                <div className="p-3 rounded-2xl bg-skycare-navy/50 border border-skycare-softBlue/20">
                  <WeatherIcon condition="partly-cloudy" size="lg" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-skycare-navy/70 border border-skycare-sun/30 mb-5">
                <div className="flex items-center gap-2 text-xs font-bold text-skycare-sun mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.skycareInsight}</span>
                </div>
                <p className="text-xs text-skycare-cloud/90 leading-relaxed">
                  {currentInsight.headline}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-skycare-softBlue/20 text-center">
                <div className="p-2 rounded-xl bg-skycare-navy/40">
                  <span className="text-[10px] text-skycare-cloud/60 block">07 PM</span>
                  <span className="text-xs font-bold text-white block my-0.5">{formatTemp(28)}</span>
                  <span className="text-[10px] text-skycare-accentCyan">10% {t.rainChance}</span>
                </div>
                <div className="p-2 rounded-xl bg-skycare-skyBlue/40 border border-skycare-sun/40">
                  <span className="text-[10px] text-skycare-sun font-bold block">08 PM</span>
                  <span className="text-xs font-bold text-white block my-0.5">{formatTemp(27)}</span>
                  <span className="text-[10px] text-skycare-accentCyan">10% {t.rainChance}</span>
                </div>
                <div className="p-2 rounded-xl bg-skycare-navy/40">
                  <span className="text-[10px] text-skycare-cloud/60 block">06 AM</span>
                  <span className="text-xs font-bold text-white block my-0.5">{formatTemp(24)}</span>
                  <span className="text-[10px] text-skycare-accentCyan">5% {t.rainChance}</span>
                </div>
                <div className="p-2 rounded-xl bg-skycare-navy/40">
                  <span className="text-[10px] text-skycare-cloud/60 block">10 AM</span>
                  <span className="text-xs font-bold text-white block my-0.5">{formatTemp(29)}</span>
                  <span className="text-[10px] text-skycare-accentCyan">10% {t.rainChance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE FEATURES SECTION */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-skycare-sun block mb-2">
            Why SkyCare India
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            {t.onboardingTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-skycare-cloud/70 max-w-2xl mx-auto">
            {t.onboardingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-skycare-darkBlue/70 border border-skycare-softBlue/25 hover:border-skycare-sun/40 transition-all duration-300 group">
            <div className="p-3 rounded-2xl bg-skycare-navy text-skycare-sun w-fit mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              {t.purposePlanning}
            </h3>
            <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
              {t.purposePlanningDesc}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-skycare-darkBlue/70 border border-skycare-softBlue/25 hover:border-skycare-sun/40 transition-all duration-300 group">
            <div className="p-3 rounded-2xl bg-skycare-navy text-skycare-accentCyan w-fit mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              {t.purposeCommute}
            </h3>
            <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
              {t.purposeCommuteDesc}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-skycare-darkBlue/70 border border-skycare-softBlue/25 hover:border-skycare-sun/40 transition-all duration-300 group">
            <div className="p-3 rounded-2xl bg-skycare-navy text-skycare-accentEmerald w-fit mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              {t.purposeSafety}
            </h3>
            <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
              {t.purposeSafetyDesc}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-skycare-darkBlue/70 border border-skycare-softBlue/25 hover:border-skycare-sun/40 transition-all duration-300 group">
            <div className="p-3 rounded-2xl bg-skycare-navy text-skycare-softBlue w-fit mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              {t.yourLocations}
            </h3>
            <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
              {t.popularCities}
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-skycare-darkBlue/90 via-skycare-navy/95 to-skycare-navy border border-skycare-softBlue/30 text-center relative overflow-hidden">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-skycare-sun block mb-2">
              SkyCare Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              {t.onboardingTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left relative z-10">
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-2xl bg-skycare-sun text-skycare-navy font-black flex items-center justify-center text-lg mb-4 shadow-md shadow-skycare-sun/20">
                1
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1.5">
                {t.onboardingSubtitle}
              </h3>
              <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
                {t.purposePlanningDesc}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-2xl bg-skycare-skyBlue text-white font-black flex items-center justify-center text-lg mb-4 border border-skycare-softBlue/40">
                2
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1.5">
                {t.whereLocated}
              </h3>
              <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
                {t.selectCitySubtitle}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-2xl bg-skycare-softBlue text-white font-black flex items-center justify-center text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1.5">
                {t.skycareInsight}
              </h3>
              <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
                {t.optimalRoutine}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-2xl bg-skycare-accentEmerald text-skycare-navy font-black flex items-center justify-center text-lg mb-4 shadow-md shadow-skycare-accentEmerald/20">
                4
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1.5">
                {t.launchBtn}
              </h3>
              <p className="text-xs sm:text-sm text-skycare-cloud/70 leading-relaxed">
                {t.alertsSafetySubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PURPOSE SELECTOR SECTION */}
      <section id="personalization" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-skycare-sun block mb-2">
            {t.skycareInsight}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            {t.onboardingTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-skycare-cloud/70 max-w-xl mx-auto">
            {t.onboardingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {personas.map((p) => {
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border select-none ${
                  isSelected
                    ? 'bg-skycare-sun text-skycare-navy font-bold border-skycare-sun shadow-lg shadow-skycare-sun/20 scale-105'
                    : 'bg-skycare-darkBlue/70 text-skycare-cloud/80 border-skycare-softBlue/20 hover:border-skycare-softBlue/60 hover:text-white'
                }`}
              >
                <span className="text-2xl mb-1.5">{p.icon}</span>
                <span className="text-xs font-semibold leading-tight line-clamp-2">
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-skycare-darkBlue/90 via-skycare-navy/95 to-skycare-navy border border-skycare-sun/40 shadow-xl text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{personas.find(p => p.id === selectedPersona)?.icon}</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-skycare-sun">
                  {t.personalizedFor}: {selectedPersona}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {currentInsight.headline}
                </h3>
              </div>
            </div>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-skycare-accentEmerald/20 text-skycare-accentEmerald border border-skycare-accentEmerald/30">
              {displaySuitability} ({currentInsight.suitabilityScore}%)
            </span>
          </div>

          <p className="text-sm sm:text-base text-skycare-cloud/90 leading-relaxed mb-6 max-w-3xl">
            {currentInsight.advice}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-skycare-softBlue/20">
            {currentInsight.bulletPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-skycare-cloud/80 p-2.5 rounded-xl bg-skycare-navy/50">
                <CheckCircle2 className="w-4 h-4 text-skycare-sun shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="p-10 sm:p-14 md:p-20 rounded-3xl bg-gradient-to-br from-skycare-skyBlue via-skycare-darkBlue to-skycare-navy border border-skycare-sun/40 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-skycare-sun/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight">
              Make weather work for you.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-skycare-cloud/80 leading-relaxed">
              {t.createAccountSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigateTo('signup')}
                rightIcon={<ArrowRight className="w-4 h-4 text-skycare-navy" />}
              >
                {t.createAccountBtn}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateTo('home')}
              >
                {t.launchBtn}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-skycare-softBlue/20 bg-skycare-navy/90 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white font-display text-xl">
                Sky<span className="text-skycare-sun">Care</span>
              </span>
            </div>
            <p className="text-xs text-skycare-cloud/70 leading-relaxed">
              Weather that understands you. India-focused personalized meteorological intelligence.
            </p>
            <p className="text-[11px] text-skycare-cloud/50">
              © {new Date().getFullYear()} SkyCare India. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-skycare-sun mb-3">{t.navWeather}</h4>
            <ul className="space-y-2 text-xs text-skycare-cloud/70">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">{t.navHome}</button></li>
              <li><button onClick={() => navigateTo('weather')} className="hover:text-white transition-colors">{t.navWeather}</button></li>
              <li><button onClick={() => navigateTo('locations')} className="hover:text-white transition-colors">{t.navLocations}</button></li>
              <li><button onClick={() => navigateTo('alerts')} className="hover:text-white transition-colors">{t.navAlerts}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-skycare-sun mb-3">{t.onboardingTitle}</h4>
            <ul className="space-y-2 text-xs text-skycare-cloud/70">
              <li><span>{t.purposeCommute}</span></li>
              <li><span>{t.purposeFitness}</span></li>
              <li><span>{t.purposeFarming}</span></li>
              <li><span>{t.purposeSafety}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-skycare-sun mb-3">{t.languageRegionTitle}</h4>
            <ul className="space-y-2 text-xs text-skycare-cloud/70">
              <li><span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-skycare-accentEmerald"></span> {t.verifiedAlerts}</span></li>
              <li><span>{t.aqiStandard}</span></li>
              <li><span>{t.languageName}</span></li>
              <li><span>{t.versionLabel}</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
