import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  CloudSun, 
  MapPin, 
  ShieldAlert, 
  User 
} from 'lucide-react';
import { PageRoute } from '../../types/weather';
import { VERIFIED_ALERTS } from '../../data/mockData';
import { TRANSLATIONS } from '../../data/translations';

export const MobileNavigation: React.FC = () => {
  const { currentPage, navigateTo, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  // Do not show bottom bar on landing, login, signup, onboarding, location picker
  const hideOnPages: PageRoute[] = ['landing', 'login', 'signup', 'onboarding', 'location-picker'];
  if (hideOnPages.includes(currentPage)) {
    return null;
  }

  const navItems: { id: PageRoute; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
    { id: 'home', label: t.navHome, icon: <Home className="w-5 h-5" /> },
    { id: 'weather', label: t.navWeather, icon: <CloudSun className="w-5 h-5" /> },
    { id: 'locations', label: t.navLocations, icon: <MapPin className="w-5 h-5" /> },
    { id: 'alerts', label: t.navAlerts, icon: <ShieldAlert className="w-5 h-5" />, badgeCount: VERIFIED_ALERTS.length },
    { id: 'profile', label: t.navProfile, icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-skycare-navy/95 backdrop-blur-2xl border-t border-skycare-softBlue/25 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 select-none min-w-[56px] ${
                isActive
                  ? 'text-skycare-sun scale-105'
                  : 'text-skycare-cloud/60 hover:text-skycare-cloud'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-skycare-accentRose text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-skycare-navy">
                    {item.badgeCount}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-tight ${isActive ? 'font-bold text-white' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-skycare-sun mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
