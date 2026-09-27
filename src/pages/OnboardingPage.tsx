import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SkyCareLogo } from '../components/common/SkyCareLogo';
import { Button } from '../components/common/Button';
import { 
  PrimaryInterest, 
  UserLocation 
} from '../types/weather';
import { ALL_SEARCHABLE_CITIES } from '../data/mockData';
import { 
  CalendarDays, 
  Car, 
  Activity, 
  Plane, 
  Sprout, 
  PartyPopper, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  MapPin, 
  Navigation,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/translations';

export const OnboardingPage: React.FC = () => {
  const { user, updateProfile, addLocationByData, navigateTo, showToast, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPurpose, setSelectedPurpose] = useState<PrimaryInterest>(user.primaryInterest || 'Daily Commute');
  const [selectedCity, setSelectedCity] = useState<UserLocation>(ALL_SEARCHABLE_CITIES[0]); // Vadodara default
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Exact 8 options matching user specification with dynamic translations
  const purposeOptions: { id: PrimaryInterest; emoji: string; title: string; description: string; icon: React.ReactNode }[] = [
    {
      id: 'Daily Commute',
      emoji: '🚗',
      title: t.purposeCommute,
      description: t.purposeCommuteDesc,
      icon: <Car className="w-5 h-5 text-skycare-accentCyan" />
    },
    {
      id: 'Outdoor Activities',
      emoji: '🏕️',
      title: t.purposeOutdoor,
      description: t.purposeOutdoorDesc,
      icon: <Activity className="w-5 h-5 text-skycare-accentEmerald" />
    },
    {
      id: 'Fitness',
      emoji: '🏃',
      title: t.purposeFitness,
      description: t.purposeFitnessDesc,
      icon: <Activity className="w-5 h-5 text-skycare-sun" />
    },
    {
      id: 'Travel',
      emoji: '✈️',
      title: t.purposeTravel,
      description: t.purposeTravelDesc,
      icon: <Plane className="w-5 h-5 text-skycare-softBlue" />
    },
    {
      id: 'Farming & Gardening',
      emoji: '🌱',
      title: t.purposeFarming,
      description: t.purposeFarmingDesc,
      icon: <Sprout className="w-5 h-5 text-skycare-accentEmerald" />
    },
    {
      id: 'Daily Planning',
      emoji: '🌦',
      title: t.purposePlanning,
      description: t.purposePlanningDesc,
      icon: <CalendarDays className="w-5 h-5 text-skycare-sun" />
    },
    {
      id: 'Events',
      emoji: '🎉',
      title: t.purposeEvents,
      description: t.purposeEventsDesc,
      icon: <PartyPopper className="w-5 h-5 text-skycare-sun" />
    },
    {
      id: 'Family Safety',
      emoji: '👨‍👩‍👧',
      title: t.purposeSafety,
      description: t.purposeSafetyDesc,
      icon: <ShieldCheck className="w-5 h-5 text-skycare-accentRose" />
    },
  ];

  const filteredCities = ALL_SEARCHABLE_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const currentLoc: UserLocation = {
            id: 'loc-current',
            city: 'Vadodara',
            state: 'Gujarat',
            country: 'India',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timezone: 'Asia/Kolkata',
            isCurrent: true,
          };
          setSelectedCity(currentLoc);
          showToast('GPS Detected', 'Location set to Vadodara, Gujarat (Current Location)', 'success');
        },
        () => {
          setIsLocating(false);
          setSelectedCity(ALL_SEARCHABLE_CITIES[0]);
          showToast('GPS Detection Note', 'Defaulted to Vadodara, Gujarat for Indian demonstration', 'info');
        },
        { timeout: 5000 }
      );
    } else {
      setIsLocating(false);
      setSelectedCity(ALL_SEARCHABLE_CITIES[0]);
    }
  };

  const handleFinishOnboarding = () => {
    // 1. Update user profile
    updateProfile({
      primaryInterest: selectedPurpose,
    });

    // 2. Set active location
    addLocationByData(selectedCity);

    // 3. Celebrate setup completion with confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F5C978', '#3F78A3', '#DCEAF3', '#10B981']
    });

    // 4. Navigate to dashboard
    showToast('SkyCare Ready', `Personalized for ${selectedPurpose} in ${selectedCity.city}`, 'success');
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-skycare-navy via-skycare-darkBlue to-skycare-navy text-skycare-cloud flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header with SkyCare Logo and Progress Indicator */}
      <div className="max-w-4xl mx-auto w-full pt-2 sm:pt-4">
        <div className="flex items-center justify-between">
          <SkyCareLogo size="md" />

          {/* Step Indicator */}
          <div className="flex items-center gap-3 bg-skycare-darkBlue/80 px-4 py-2 rounded-2xl border border-skycare-softBlue/30 text-xs font-semibold">
            <span className="text-skycare-cloud/70">
              {t.stepIndicator} <strong className="text-white">{step}</strong> of 2
            </span>
            <div className="flex items-center gap-1.5">
              <div className={`w-3.5 h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-skycare-sun w-5' : 'bg-skycare-softBlue/30'}`} />
              <div className={`w-3.5 h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-skycare-sun w-5' : 'bg-skycare-softBlue/30'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full my-auto py-6 sm:py-8">
        {/* ================= STEP 1: USER PURPOSE SELECTION ================= */}
        {step === 1 && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
            {/* Header Text */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skycare-skyBlue/30 border border-skycare-sun/30 text-xs font-bold text-skycare-sun mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>India-Focused Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight leading-tight">
                {t.onboardingTitle}
              </h1>
              <p className="text-sm sm:text-base text-skycare-cloud/80">
                {t.onboardingSubtitle}
              </p>
            </div>

            {/* 8 Purpose Options Grid (Single selection only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {purposeOptions.map((option) => {
                const isSelected = selectedPurpose === option.id;
                return (
                  <div
                    key={option.id}
                    onClick={() => setSelectedPurpose(option.id)}
                    className={`relative p-4 sm:p-5 rounded-3xl cursor-pointer transition-all duration-300 select-none flex flex-col justify-between min-h-[140px] sm:min-h-[150px] border text-left ${
                      isSelected
                        ? 'bg-gradient-to-br from-skycare-skyBlue/90 via-skycare-darkBlue to-skycare-navy border-skycare-sun shadow-lg shadow-skycare-navy ring-2 ring-skycare-sun/60 scale-[1.02]'
                        : 'bg-skycare-darkBlue/60 hover:bg-skycare-darkBlue/90 border-skycare-softBlue/25 hover:border-skycare-softBlue/60'
                    }`}
                  >
                    {/* Top Row: Emoji & Checkbox Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-2xl sm:text-3xl p-2 rounded-2xl bg-skycare-navy/60 border border-skycare-softBlue/20">
                        {option.emoji}
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-skycare-sun text-skycare-navy font-bold shadow-md'
                            : 'border-2 border-skycare-softBlue/30 bg-skycare-navy/40'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white font-display mb-1 flex items-center gap-1.5">
                        <span>{option.title}</span>
                      </h3>
                      <p className="text-xs text-skycare-cloud/70 leading-relaxed line-clamp-2">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action: Continue */}
            <div className="flex items-center justify-between pt-4 border-t border-skycare-softBlue/20 max-w-2xl mx-auto w-full">
              <span className="text-xs text-skycare-cloud/60 font-medium">
                {t.personalizedFor} <strong className="text-skycare-sun">{selectedPurpose}</strong>
              </span>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setStep(2)}
                rightIcon={<ArrowRight className="w-4 h-4 text-skycare-navy" />}
                className="px-8 shadow-xl"
              >
                {t.continueBtn}
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: INDIAN LOCATION SELECTION ================= */}
        {step === 2 && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-left">
            {/* Header Text */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-skycare-skyBlue/30 border border-skycare-sun/30 text-xs font-bold text-skycare-sun mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedPurpose} • India</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight leading-tight">
                {t.whereLocated}
              </h1>
              <p className="text-sm sm:text-base text-skycare-cloud/80">
                {t.selectCitySubtitle}
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-5">
              {/* GPS Auto-Detect Button */}
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-skycare-darkBlue/90 hover:bg-skycare-darkBlue border border-skycare-sun/40 text-white font-semibold text-sm shadow-md transition-all group focus:outline-none focus:ring-2 focus:ring-skycare-sun"
              >
                <Navigation className={`w-4 h-4 text-skycare-sun group-hover:rotate-45 transition-transform ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Detecting Indian GPS coordinates...' : t.useGpsLocation}</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-skycare-cloud/50 justify-center uppercase font-bold tracking-wider">
                <div className="h-px bg-skycare-softBlue/20 flex-1" />
                <span>OR SEARCH ANY INDIAN CITY</span>
                <div className="h-px bg-skycare-softBlue/20 flex-1" />
              </div>

              {/* City Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-skycare-cloud/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchCityPlaceholder}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-skycare-navy/80 border border-skycare-softBlue/30 text-white placeholder-skycare-cloud/40 text-sm focus:outline-none focus:ring-2 focus:ring-skycare-sun transition-all"
                />
              </div>

              {/* Selected City Preview Pill */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-skycare-darkBlue to-skycare-navy border border-skycare-softBlue/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-skycare-sun text-skycare-navy">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-skycare-sun block">
                      {t.activeIndianCity}
                    </span>
                    <h4 className="text-base font-bold text-white font-display">
                      {selectedCity.city}, {selectedCity.state}
                    </h4>
                    <span className="text-xs text-skycare-cloud/60">India • Asia/Kolkata</span>
                  </div>
                </div>

                <span className="text-xs font-bold text-skycare-accentEmerald px-3 py-1 rounded-full bg-skycare-accentEmerald/20 border border-skycare-accentEmerald/30">
                  {t.activeBadge}
                </span>
              </div>

              {/* Popular Indian Cities Carousel / Chips */}
              <div>
                <span className="text-xs font-semibold text-skycare-cloud/70 block mb-2.5">
                  {t.popularCities}:
                </span>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1 no-scrollbar">
                  {filteredCities.slice(0, 14).map((city) => {
                    const isPicked = selectedCity.id === city.id;
                    return (
                      <button
                        key={city.id}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city);
                          setSearchQuery('');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                          isPicked
                            ? 'bg-skycare-sun text-skycare-navy border-skycare-sun font-bold shadow-sm'
                            : 'bg-skycare-darkBlue/70 text-skycare-cloud border-skycare-softBlue/20 hover:border-skycare-softBlue/60 hover:text-white'
                        }`}
                      >
                        {city.city}, {city.state}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Back & Launch SkyCare */}
            <div className="flex items-center justify-between pt-4 border-t border-skycare-softBlue/20 max-w-xl mx-auto w-full">
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep(1)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={handleFinishOnboarding}
                rightIcon={<Sparkles className="w-4 h-4 text-skycare-navy" />}
                className="px-8 shadow-xl"
              >
                {t.launchBtn}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="text-center text-xs text-skycare-cloud/50 pb-2">
        SkyCare India • Personalized Weather Intelligence & Safety
      </div>
    </div>
  );
};
