export type TemperatureUnit = 'C' | 'F';

export type WeatherConditionType = 
  | 'sunny' 
  | 'partly-cloudy' 
  | 'cloudy' 
  | 'rain' 
  | 'heavy-rain' 
  | 'thunderstorm' 
  | 'snow' 
  | 'windy' 
  | 'foggy';

export type IndianLanguage = 
  | 'en' 
  | 'hi' 
  | 'gu' 
  | 'mr' 
  | 'ta' 
  | 'te' 
  | 'bn' 
  | 'kn' 
  | 'ml' 
  | 'pa';

export type PrimaryInterest = 
  | 'Daily Planning'
  | 'Daily Commute'
  | 'Outdoor Activities'
  | 'Fitness'
  | 'Fitness & Outdoor Activities'
  | 'Travel'
  | 'Farming & Gardening'
  | 'Events'
  | 'Events & Functions'
  | 'Family Safety'
  | 'General Weather';

export type OutdoorTime = 'Early Morning' | 'Morning' | 'Afternoon' | 'Evening' | 'Night';

export type PriorityMetric = 'Rain' | 'Temperature' | 'Humidity' | 'UV' | 'Wind' | 'Air Quality' | 'Alerts';

export interface WeatherMetrics {
  humidity: number;         // percentage (0-100)
  windSpeed: number;        // km/h
  windDirection: string;    // e.g. 'NW', 'SSW', 'SW'
  uvIndex: number;          // 0-12
  uvLevel: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
  visibility: number;       // km
  precipitation: number;    // % probability
  precipitationAmount: number; // mm
  pressure: number;         // hPa
  dewPoint: number;         // °C
  airQualityIndex: number;  // 1-500 (CPCB / AQI standard)
  airQualityStatus: 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';
  cloudCover: number;       // %
}

export interface HourlyForecastItem {
  time: string;             // 'Now', '07:00 PM', '08:00 PM', etc.
  rawHour: number;          // 0-23
  temperature: number;      // in °C
  feelsLike: number;
  condition: WeatherConditionType;
  conditionLabel: string;
  rainProbability: number;  // 0-100%
  windSpeed: number;        // km/h
  uvIndex: number;
}

export interface DailyForecastItem {
  day: string;              // 'Today', 'Mon', 'Tue', etc.
  date: string;             // '27 Sep', '28 Sep', etc.
  condition: WeatherConditionType;
  conditionLabel: string;
  highTemp: number;         // in °C
  lowTemp: number;          // in °C
  rainProbability: number;  // 0-100%
  uvIndex: number;
  humidity: number;
  windSpeed: number;
  summary: string;
}

export interface SunTimes {
  sunrise: string;          // e.g. '06:22 AM'
  sunset: string;           // e.g. '06:34 PM'
  firstLight: string;
  lastLight: string;
  goldenHour: string;
}

export interface UserLocation {
  id: string;
  city: string;
  state: string;            // State in India (e.g. 'Gujarat', 'Maharashtra')
  country: string;          // 'India'
  latitude: number;
  longitude: number;
  timezone: string;         // 'Asia/Kolkata'
  isCurrent?: boolean;
}

export interface FullLocationWeather {
  location: UserLocation;
  current: {
    temp: number;           // in °C
    feelsLike: number;      // in °C
    highTemp: number;
    lowTemp: number;
    condition: WeatherConditionType;
    conditionLabel: string;
    description: string;
    metrics: WeatherMetrics;
    sunTimes: SunTimes;
  };
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  updatedAt?: string;
}

export interface VerifiedAlert {
  id: string;
  source: string;           // e.g. 'India Meteorological Department (IMD)', 'State Disaster Management Authority (SDMA)'
  severity: 'Urgent' | 'Warning' | 'Watch' | 'Advisory';
  alertColor: 'Red' | 'Orange' | 'Yellow' | 'Green';
  title: string;
  location: string;
  issuedTime: string;
  expiresTime: string;
  description: string;
  instructions: string[];
}

export interface SafetyGuidance {
  id: string;
  category: 'Heavy Rain' | 'Strong Wind' | 'High UV' | 'Heat' | 'Poor Visibility';
  title: string;
  threshold: string;
  shortSummary: string;
  recommendations: string[];
  actionTips: string[];
  icon: string;
  accentColor: string;
}

export interface PersonaInsight {
  interest: PrimaryInterest;
  badge: string;
  headline: string;
  advice: string;
  suitabilityScore: number; // 0-100%
  suitabilityLabel: 'Ideal' | 'Good' | 'Fair' | 'Caution Required' | 'Stay Indoors' | string;
  recommendedWindow: string;
  bulletPoints: string[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  primaryInterest: PrimaryInterest;
  outdoorTime: OutdoorTime[];
  priorityMetrics: PriorityMetric[];
  memberSince: string;
  preferredLanguage?: IndianLanguage;
}

export interface AppSettings {
  tempUnit: TemperatureUnit;
  windSpeedUnit: 'km/h' | 'mph' | 'm/s';
  pressureUnit: 'hPa' | 'inHg' | 'mbar';
  precipitationUnit: 'mm' | 'inches';
  autoLocateOnLaunch: boolean;
  enablePushAlerts: boolean;
  dailyBriefingTime: string;
  eveningRecapTime: string;
  uvAlertsThreshold: number;
  language: IndianLanguage;
  highContrast: boolean;
}

export type PageRoute = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'onboarding' 
  | 'location-picker' 
  | 'home' 
  | 'weather' 
  | 'locations' 
  | 'alerts' 
  | 'profile' 
  | 'settings';
