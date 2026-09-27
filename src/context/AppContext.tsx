import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  PageRoute, 
  UserProfile, 
  AppSettings, 
  FullLocationWeather, 
  UserLocation, 
  TemperatureUnit, 
  PrimaryInterest,
  IndianLanguage,
  OutdoorTime,
  PriorityMetric
} from '../types/weather';
import { INITIAL_LOCATIONS, ALL_SEARCHABLE_CITIES, INDIAN_LANGUAGES } from '../data/mockData';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;
  user: UserProfile;
  isLoggedIn: boolean;
  locations: FullLocationWeather[];
  activeLocationId: string;
  activeWeather: FullLocationWeather;
  settings: AppSettings;
  toasts: ToastItem[];
  timeGreeting: string;
  formattedCurrentDate: string;
  
  // Actions
  formatTemp: (celsius: number) => string;
  formatSpeed: (kmh: number) => string;
  toggleTempUnit: () => void;
  setTempUnit: (unit: TemperatureUnit) => void;
  setLanguage: (lang: IndianLanguage) => void;
  setActiveLocation: (id: string) => void;
  addLocationByData: (loc: UserLocation) => void;
  removeLocation: (id: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  loginUser: (email: string, name?: string) => void;
  signupUser: (name: string, email: string, interest?: PrimaryInterest) => void;
  logoutUser: () => void;
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-in-101',
  fullName: 'Rahul Sharma',
  email: 'rahul.sharma@skycare.in',
  primaryInterest: 'Daily Planning',
  outdoorTime: ['Early Morning', 'Evening'],
  priorityMetrics: ['Rain', 'Temperature', 'Humidity', 'UV'],
  memberSince: 'September 2026',
  preferredLanguage: 'en',
};

const DEFAULT_SETTINGS: AppSettings = {
  tempUnit: 'C',
  windSpeedUnit: 'km/h',
  pressureUnit: 'hPa',
  precipitationUnit: 'mm',
  autoLocateOnLaunch: true,
  enablePushAlerts: true,
  dailyBriefingTime: '07:00 AM',
  eveningRecapTime: '07:30 PM',
  uvAlertsThreshold: 6,
  language: 'en',
  highContrast: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('skycare_in_logged_in') === 'true';
  });

  // Page routing: Defaults directly to 'login' if not logged in
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    const saved = localStorage.getItem('skycare_in_current_page');
    const hasAuth = localStorage.getItem('skycare_in_logged_in') === 'true';
    if (!hasAuth) {
      return (saved === 'signup' || saved === 'landing') ? (saved as PageRoute) : 'login';
    }
    return (saved as PageRoute) || 'home';
  });

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('skycare_in_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  // Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('skycare_in_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Locations & Weather
  const [locations, setLocations] = useState<FullLocationWeather[]>(() => {
    const saved = localStorage.getItem('skycare_in_locations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_LOCATIONS;
      }
    }
    return INITIAL_LOCATIONS;
  });

  const [activeLocationId, setActiveLocationId] = useState<string>(() => {
    const saved = localStorage.getItem('skycare_in_active_loc');
    return saved || 'loc-vadodara';
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('skycare_in_current_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('skycare_in_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('skycare_in_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('skycare_in_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('skycare_in_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('skycare_in_active_loc', activeLocationId);
  }, [activeLocationId]);

  // Active Weather memo
  const activeWeather = useMemo(() => {
    const found = locations.find(l => l.location.id === activeLocationId);
    return found || locations[0] || INITIAL_LOCATIONS[0];
  }, [locations, activeLocationId]);

  // Dynamic greeting based on Indian time of day
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const formattedCurrentDate = useMemo(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return now.toLocaleDateString('en-IN', options);
  }, []);

  // Actions
  const showToast = (
    title: string, 
    message?: string, 
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageRoute) => {
    // Check auth protection
    if (!isLoggedIn && page !== 'login' && page !== 'signup' && page !== 'landing') {
      setCurrentPage('login');
      showToast('Sign In Required', 'Please log in with your credentials to access SkyCare', 'info');
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTemp = (celsius: number): string => {
    if (settings.tempUnit === 'F') {
      const fahrenheit = Math.round((celsius * 9) / 5 + 32);
      return `${fahrenheit}°`;
    }
    return `${Math.round(celsius)}°C`;
  };

  const formatSpeed = (kmh: number): string => {
    if (settings.windSpeedUnit === 'mph') {
      const mph = Math.round(kmh * 0.621371);
      return `${mph} mph`;
    }
    if (settings.windSpeedUnit === 'm/s') {
      const ms = Math.round((kmh / 3.6) * 10) / 10;
      return `${ms} m/s`;
    }
    return `${kmh} km/h`;
  };

  const setTempUnit = (unit: TemperatureUnit) => {
    setSettings(prev => ({ ...prev, tempUnit: unit }));
    showToast('Temperature Unit Changed', `Displaying temperature in °${unit}`, 'info');
  };

  const toggleTempUnit = () => {
    const nextUnit: TemperatureUnit = settings.tempUnit === 'C' ? 'F' : 'C';
    setTempUnit(nextUnit);
  };

  const setLanguage = (lang: IndianLanguage) => {
    const langObj = INDIAN_LANGUAGES.find(l => l.code === lang);
    setSettings(prev => ({ ...prev, language: lang }));
    if (lang === 'en') {
      showToast('Language Set to English', 'Primary interface active in English', 'info');
    } else {
      showToast(`${langObj?.name || 'Regional'} Selected`, `Full ${langObj?.native || ''} translations arriving in next update. Current display is in English.`, 'info');
    }
  };

  const setActiveLocation = (id: string) => {
    const loc = locations.find(l => l.location.id === id);
    if (loc) {
      setActiveLocationId(id);
      showToast('Location Selected', `Now viewing weather for ${loc.location.city}, ${loc.location.state}`, 'info');
    }
  };

  const addLocationByData = (locData: UserLocation) => {
    const existing = locations.find(l => l.location.id === locData.id || l.location.city.toLowerCase() === locData.city.toLowerCase());
    if (existing) {
      setActiveLocationId(existing.location.id);
      showToast('Location Selected', `${existing.location.city}, ${existing.location.state} is already in your dashboard`, 'info');
      return;
    }

    const baseTemp = 28 + Math.floor(Math.random() * 6);
    const newLocWeather: FullLocationWeather = {
      location: {
        ...locData,
        id: locData.id || `loc-${Date.now()}`
      },
      current: {
        temp: baseTemp,
        feelsLike: baseTemp + 2,
        highTemp: baseTemp + 4,
        lowTemp: baseTemp - 5,
        condition: 'partly-cloudy',
        conditionLabel: 'Partly Cloudy',
        description: `Mild and pleasant conditions across ${locData.city}, ${locData.state}.`,
        metrics: {
          humidity: 60 + Math.floor(Math.random() * 20),
          windSpeed: 12 + Math.floor(Math.random() * 8),
          windDirection: 'SW',
          uvIndex: 5 + Math.floor(Math.random() * 3),
          uvLevel: 'Moderate',
          visibility: 6 + Math.floor(Math.random() * 4),
          precipitation: 15,
          precipitationAmount: 1.0,
          pressure: 1010,
          dewPoint: 21,
          airQualityIndex: 45 + Math.floor(Math.random() * 40),
          airQualityStatus: 'Satisfactory',
          cloudCover: 35,
        },
        sunTimes: {
          sunrise: '06:20 AM',
          sunset: '06:30 PM',
          firstLight: '05:58 AM',
          lastLight: '06:52 PM',
          goldenHour: '05:50 PM',
        }
      },
      hourly: [
        { time: 'Now', rawHour: 18, temperature: baseTemp, feelsLike: baseTemp + 2, condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', rainProbability: 15, windSpeed: 12, uvIndex: 1 },
        { time: '07:00 PM', rawHour: 19, temperature: baseTemp - 1, feelsLike: baseTemp + 1, condition: 'sunny', conditionLabel: 'Pleasant Dusk', rainProbability: 10, windSpeed: 11, uvIndex: 0 },
        { time: '08:00 PM', rawHour: 20, temperature: baseTemp - 2, feelsLike: baseTemp, condition: 'sunny', conditionLabel: 'Clear Night', rainProbability: 5, windSpeed: 10, uvIndex: 0 },
        { time: '09:00 PM', rawHour: 21, temperature: baseTemp - 3, feelsLike: baseTemp - 1, condition: 'partly-cloudy', conditionLabel: 'Mild', rainProbability: 5, windSpeed: 9, uvIndex: 0 },
      ],
      daily: [
        { day: 'Today', date: '27 Sep', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', highTemp: baseTemp + 4, lowTemp: baseTemp - 5, rainProbability: 15, uvIndex: 7, humidity: 65, windSpeed: 12, summary: 'Pleasant weather across the city.' },
        { day: 'Mon', date: '28 Sep', condition: 'sunny', conditionLabel: 'Sunny & Bright', highTemp: baseTemp + 5, lowTemp: baseTemp - 4, rainProbability: 10, uvIndex: 8, humidity: 60, windSpeed: 11, summary: 'Clear sunny sky with warm afternoon.' },
        { day: 'Tue', date: '29 Sep', condition: 'partly-cloudy', conditionLabel: 'Passing Clouds', highTemp: baseTemp + 3, lowTemp: baseTemp - 5, rainProbability: 20, uvIndex: 7, humidity: 68, windSpeed: 13, summary: 'Humid afternoon with gentle breeze.' },
        { day: 'Wed', date: '30 Sep', condition: 'rain', conditionLabel: 'Light Rain', highTemp: baseTemp + 1, lowTemp: baseTemp - 6, rainProbability: 50, uvIndex: 5, humidity: 75, windSpeed: 16, summary: 'Passing showers likely.' },
        { day: 'Thu', date: '01 Oct', condition: 'sunny', conditionLabel: 'Pleasant Day', highTemp: baseTemp + 3, lowTemp: baseTemp - 5, rainProbability: 10, uvIndex: 7, humidity: 62, windSpeed: 12, summary: 'Crisp sunny day.' },
        { day: 'Fri', date: '02 Oct', condition: 'sunny', conditionLabel: 'Clear & Calm', highTemp: baseTemp + 4, lowTemp: baseTemp - 4, rainProbability: 5, uvIndex: 8, humidity: 58, windSpeed: 10, summary: 'Comfortable holiday weather.' },
        { day: 'Sat', date: '03 Oct', condition: 'sunny', conditionLabel: 'Sunny Weekend', highTemp: baseTemp + 5, lowTemp: baseTemp - 4, rainProbability: 5, uvIndex: 8, humidity: 55, windSpeed: 10, summary: 'Bright and dry weekend.' },
      ],
      updatedAt: 'Just now'
    };

    setLocations(prev => [...prev, newLocWeather]);
    setActiveLocationId(newLocWeather.location.id);
    showToast('Location Added', `${locData.city}, ${locData.state} added to your dashboard`, 'success');
  };

  const removeLocation = (id: string) => {
    if (locations.length <= 1) {
      showToast('Cannot Remove', 'You must keep at least one active location', 'warning');
      return;
    }
    const target = locations.find(l => l.location.id === id);
    const updated = locations.filter(l => l.location.id !== id);
    setLocations(updated);

    if (activeLocationId === id) {
      setActiveLocationId(updated[0].location.id);
    }
    showToast('Location Removed', `${target?.location.city || 'Location'} removed from your list`, 'info');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast('Preferences Saved', 'Your SkyCare purpose and preferences have been updated', 'success');
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    showToast('Settings Saved', 'Application preferences updated', 'success');
  };

  const loginUser = (email: string, name?: string) => {
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      fullName: name || (email.includes('priya') ? 'Priya Patel' : prev.fullName),
    }));
    showToast('Login Successful!', `Welcome to SkyCare, ${name || user.fullName}`, 'success');
    // Navigate to Onboarding ("What are you using SkyCare for?")
    setCurrentPage('onboarding');
  };

  const signupUser = (name: string, email: string, interest?: PrimaryInterest) => {
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      fullName: name,
      email: email,
      primaryInterest: interest || prev.primaryInterest,
    }));
    showToast('Account Created!', `Welcome to SkyCare, ${name}`, 'success');
    setCurrentPage('onboarding');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    showToast('Signed Out', 'You have been safely signed out', 'info');
    setCurrentPage('login');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        user,
        isLoggedIn,
        locations,
        activeLocationId,
        activeWeather,
        settings,
        toasts,
        timeGreeting,
        formattedCurrentDate,
        formatTemp,
        formatSpeed,
        toggleTempUnit,
        setTempUnit,
        setLanguage,
        setActiveLocation,
        addLocationByData,
        removeLocation,
        updateProfile,
        updateSettings,
        loginUser,
        signupUser,
        logoutUser,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
