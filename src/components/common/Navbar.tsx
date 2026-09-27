import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkyCareLogo } from './SkyCareLogo';
import { Button } from './Button';
import { 
  Home, 
  CloudSun, 
  MapPin, 
  ShieldAlert, 
  User, 
  Settings, 
  ChevronDown, 
  LogIn, 
  Sparkles,
  Plus,
  Languages,
  Check
} from 'lucide-react';
import { PageRoute, IndianLanguage } from '../../types/weather';
import { INDIAN_LANGUAGES } from '../../data/mockData';
import { TRANSLATIONS } from '../../data/translations';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    user, 
    isLoggedIn, 
    locations, 
    activeLocationId, 
    setActiveLocation, 
    settings, 
    toggleTempUnit,
    setLanguage,
    activeWeather
  } = useApp();

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-4 h-4" /> },
    { id: 'weather', label: t.navWeather, icon: <CloudSun className="w-4 h-4" /> },
    { id: 'locations', label: t.navLocations, icon: <MapPin className="w-4 h-4" /> },
    { id: 'alerts', label: t.navAlerts, icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'profile', label: t.navProfile, icon: <User className="w-4 h-4" /> },
  ];

  const currentLangObj = INDIAN_LANGUAGES.find(l => l.code === settings.language) || INDIAN_LANGUAGES[0];
  const isAuthOrOnboarding = currentPage === 'login' || currentPage === 'signup' || currentPage === 'onboarding';

  if (isAuthOrOnboarding) {
    return (
      <header className="sticky top-0 z-40 w-full bg-skycare-navy/80 backdrop-blur-xl border-b border-skycare-softBlue/15 py-2.5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
          {/* Top Indian Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              title="Choose Language"
              aria-label="Language Selector"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-skycare-darkBlue/80 hover:bg-skycare-darkBlue text-xs font-semibold text-skycare-cloud hover:text-white border border-skycare-softBlue/30 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun"
            >
              <Languages className="w-4 h-4 text-skycare-sun shrink-0" />
              <span className="font-bold text-white">{currentLangObj.name}</span>
              <span className="text-[11px] text-skycare-sun font-medium">({currentLangObj.native})</span>
              <ChevronDown className={`w-3.5 h-3.5 text-skycare-cloud/70 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsLangDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-skycare-darkBlue/95 backdrop-blur-2xl border border-skycare-softBlue/40 shadow-2xl p-2 z-30 animate-slide-up text-left">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-skycare-sun border-b border-skycare-softBlue/20">
                    {t.preferredLanguage}
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1 space-y-0.5">
                    {INDIAN_LANGUAGES.map((lang) => {
                      const isSelected = settings.language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code as IndianLanguage);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                            isSelected
                              ? 'bg-skycare-skyBlue text-white font-bold'
                              : 'text-skycare-cloud hover:bg-skycare-skyBlue/30 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.name}</span>
                            <span className="text-[11px] text-skycare-cloud/60">({lang.native})</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-skycare-sun" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  const isLanding = currentPage === 'landing';

  return (
    <header className="sticky top-0 z-40 w-full bg-skycare-navy/90 backdrop-blur-xl border-b border-skycare-softBlue/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo & Desktop Nav Links */}
        <div className="flex items-center gap-6">
          <SkyCareLogo
            size="md"
            onClick={() => navigateTo(isLoggedIn ? 'home' : 'landing')}
            className="cursor-pointer"
          />

          {/* Desktop Nav Items */}
          {!isLanding && (
            <nav className="hidden md:flex items-center gap-1 bg-skycare-darkBlue/60 p-1.5 rounded-2xl border border-skycare-softBlue/20">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-skycare-sun ${
                      isActive
                        ? 'bg-skycare-skyBlue text-white shadow-sm ring-1 ring-skycare-softBlue/50'
                        : 'text-skycare-cloud/70 hover:text-white hover:bg-skycare-skyBlue/30'
                    }`}
                  >
                    <span className={isActive ? 'text-skycare-sun' : ''}>{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {isLanding && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-skycare-cloud/80">
              <a href="#features" className="hover:text-white transition-colors">{t.features}</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">{t.howItWorks}</a>
              <a href="#personalization" className="hover:text-white transition-colors">{t.indianWeather}</a>
              <a href="#safety" className="hover:text-white transition-colors">{t.safetyAndAlerts}</a>
            </nav>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Indian Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              title="Select Indian Language"
              aria-label="Language Selector"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-skycare-darkBlue/70 hover:bg-skycare-darkBlue text-xs font-semibold text-skycare-cloud border border-skycare-softBlue/30 transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun"
            >
              <Languages className="w-3.5 h-3.5 text-skycare-sun shrink-0" />
              <span className="hidden sm:inline font-medium">{currentLangObj.name}</span>
              <ChevronDown className="w-3 h-3 text-skycare-cloud/60" />
            </button>

            {isLangDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsLangDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-skycare-darkBlue/95 backdrop-blur-xl border border-skycare-softBlue/40 shadow-2xl p-2 z-30 animate-slide-up text-left">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-skycare-sun border-b border-skycare-softBlue/20">
                    {t.preferredLanguage}
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1 space-y-0.5">
                    {INDIAN_LANGUAGES.map((lang) => {
                      const isSelected = settings.language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as IndianLanguage);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                            isSelected
                              ? 'bg-skycare-skyBlue text-white font-bold'
                              : 'text-skycare-cloud hover:bg-skycare-skyBlue/30 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.name}</span>
                            <span className="text-[11px] text-skycare-cloud/60">({lang.native})</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-skycare-sun" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Location Switcher */}
          {!isLanding && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-skycare-darkBlue/70 hover:bg-skycare-darkBlue text-xs sm:text-sm font-medium text-skycare-cloud border border-skycare-softBlue/30 transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun"
              >
                <MapPin className="w-3.5 h-3.5 text-skycare-sun shrink-0" />
                <span className="font-semibold text-white max-w-[100px] sm:max-w-[140px] truncate">
                  {activeWeather.location.city}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-skycare-cloud/60 transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsLocationDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-skycare-darkBlue/95 backdrop-blur-xl border border-skycare-softBlue/40 shadow-2xl p-2 z-30 animate-slide-up text-left">
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-skycare-cloud/60 border-b border-skycare-softBlue/20">
                      {t.savedCities}
                    </div>
                    <div className="max-h-56 overflow-y-auto py-1 space-y-1">
                      {locations.map((loc) => {
                        const isCurrentActive = loc.location.id === activeLocationId;
                        return (
                          <button
                            key={loc.location.id}
                            onClick={() => {
                              setActiveLocation(loc.location.id);
                              setIsLocationDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                              isCurrentActive
                                ? 'bg-skycare-skyBlue text-white font-semibold'
                                : 'text-skycare-cloud hover:bg-skycare-skyBlue/30 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <MapPin className={`w-3.5 h-3.5 ${isCurrentActive ? 'text-skycare-sun' : 'text-skycare-cloud/40'}`} />
                              <span className="truncate">{loc.location.city}, {loc.location.state}</span>
                            </div>
                            <span className="font-bold text-skycare-sun ml-2">
                              {Math.round(loc.current.temp)}°C
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="pt-2 border-t border-skycare-softBlue/20">
                      <button
                        onClick={() => {
                          setIsLocationDropdownOpen(false);
                          navigateTo('locations');
                        }}
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-skycare-navy/80 hover:bg-skycare-navy text-skycare-sun border border-skycare-sun/30 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{t.manageCitiesBtn}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Temperature Unit Toggle */}
          <button
            type="button"
            onClick={toggleTempUnit}
            title="Toggle °C / °F"
            aria-label="Toggle Temperature Unit"
            className="flex items-center justify-center px-2.5 py-1.5 rounded-xl bg-skycare-darkBlue/70 hover:bg-skycare-darkBlue text-xs font-bold border border-skycare-softBlue/30 text-skycare-cloud hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun"
          >
            <span className={settings.tempUnit === 'C' ? 'text-skycare-sun font-bold' : 'text-skycare-cloud/40'}>°C</span>
            <span className="mx-1 text-skycare-softBlue/50">|</span>
            <span className={settings.tempUnit === 'F' ? 'text-skycare-sun font-bold' : 'text-skycare-cloud/40'}>°F</span>
          </button>

          {/* Settings Shortcut */}
          {!isLanding && (
            <button
              onClick={() => navigateTo('settings')}
              aria-label="App Settings"
              title={t.settings}
              className={`p-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun ${
                currentPage === 'settings'
                  ? 'bg-skycare-skyBlue text-skycare-sun border-skycare-sun/40'
                  : 'bg-skycare-darkBlue/60 hover:bg-skycare-darkBlue text-skycare-cloud hover:text-white border-skycare-softBlue/30'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* User Auth or Sign in */}
          {isLanding ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateTo('login')}
              >
                {t.signInBtn}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigateTo('signup')}
                rightIcon={<Sparkles className="w-3.5 h-3.5 text-skycare-navy" />}
              >
                {t.createAccountBtn}
              </Button>
            </div>
          ) : isLoggedIn ? (
            <button
              onClick={() => navigateTo('profile')}
              title={`Signed in as ${user.fullName}`}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-skycare-darkBlue/60 hover:bg-skycare-darkBlue border border-skycare-softBlue/30 transition-all focus:outline-none focus:ring-2 focus:ring-skycare-sun"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-skycare-sun to-skycare-softBlue flex items-center justify-center font-bold text-skycare-navy text-xs shadow-inner">
                {user.fullName.charAt(0)}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-white max-w-[90px] truncate">
                {user.fullName.split(' ')[0]}
              </span>
            </button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigateTo('login')}
              leftIcon={<LogIn className="w-3.5 h-3.5" />}
            >
              {t.signInBtn}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
