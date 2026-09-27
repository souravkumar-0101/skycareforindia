import { 
  FullLocationWeather, 
  VerifiedAlert, 
  SafetyGuidance, 
  PrimaryInterest, 
  PersonaInsight, 
  UserLocation,
  IndianLanguage 
} from '../types/weather';

export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', active: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', active: false },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', active: false },
  { code: 'mr', name: 'Marathi', native: 'मराठी', active: false },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', active: false },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', active: false },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', active: false },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', active: false },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', active: false },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', active: false },
];

export const INITIAL_LOCATIONS: FullLocationWeather[] = [
  {
    location: {
      id: 'loc-vadodara',
      city: 'Vadodara',
      state: 'Gujarat',
      country: 'India',
      latitude: 22.3072,
      longitude: 73.1812,
      timezone: 'Asia/Kolkata',
      isCurrent: true,
    },
    current: {
      temp: 29,
      feelsLike: 31,
      highTemp: 33,
      lowTemp: 24,
      condition: 'partly-cloudy',
      conditionLabel: 'Partly Cloudy',
      description: 'Pleasant evening with mild post-monsoon westerly breeze and comfortable humidity.',
      metrics: {
        humidity: 68,
        windSpeed: 14,
        windDirection: 'SW',
        uvIndex: 4,
        uvLevel: 'Moderate',
        visibility: 7,
        precipitation: 15,
        precipitationAmount: 1.2,
        pressure: 1010,
        dewPoint: 22,
        airQualityIndex: 58,
        airQualityStatus: 'Satisfactory',
        cloudCover: 40,
      },
      sunTimes: {
        sunrise: '06:26 AM',
        sunset: '06:34 PM',
        firstLight: '06:04 AM',
        lastLight: '06:56 PM',
        goldenHour: '05:58 PM',
      }
    },
    hourly: [
      { time: 'Now', rawHour: 18, temperature: 29, feelsLike: 31, condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', rainProbability: 15, windSpeed: 14, uvIndex: 1 },
      { time: '07:00 PM', rawHour: 19, temperature: 28, feelsLike: 30, condition: 'partly-cloudy', conditionLabel: 'Pleasant Breeze', rainProbability: 10, windSpeed: 13, uvIndex: 0 },
      { time: '08:00 PM', rawHour: 20, temperature: 27, feelsLike: 29, condition: 'partly-cloudy', conditionLabel: 'Cool Evening', rainProbability: 10, windSpeed: 12, uvIndex: 0 },
      { time: '09:00 PM', rawHour: 21, temperature: 26, feelsLike: 28, condition: 'cloudy', conditionLabel: 'Mild Night', rainProbability: 15, windSpeed: 11, uvIndex: 0 },
      { time: '10:00 PM', rawHour: 22, temperature: 25, feelsLike: 27, condition: 'cloudy', conditionLabel: 'Calm', rainProbability: 10, windSpeed: 10, uvIndex: 0 },
      { time: '11:00 PM', rawHour: 23, temperature: 25, feelsLike: 26, condition: 'cloudy', conditionLabel: 'Overcast', rainProbability: 10, windSpeed: 9, uvIndex: 0 },
      { time: '06:00 AM', rawHour: 6, temperature: 24, feelsLike: 25, condition: 'sunny', conditionLabel: 'Fresh Dawn', rainProbability: 5, windSpeed: 10, uvIndex: 1 },
      { time: '08:00 AM', rawHour: 8, temperature: 26, feelsLike: 27, condition: 'sunny', conditionLabel: 'Bright Morning', rainProbability: 5, windSpeed: 12, uvIndex: 3 },
      { time: '10:00 AM', rawHour: 10, temperature: 29, feelsLike: 31, condition: 'sunny', conditionLabel: 'Warm Sun', rainProbability: 10, windSpeed: 14, uvIndex: 6 },
      { time: '12:00 PM', rawHour: 12, temperature: 32, feelsLike: 35, condition: 'partly-cloudy', conditionLabel: 'Hot Midday', rainProbability: 15, windSpeed: 16, uvIndex: 8 },
      { time: '02:00 PM', rawHour: 14, temperature: 33, feelsLike: 36, condition: 'partly-cloudy', conditionLabel: 'Warm Afternoon', rainProbability: 20, windSpeed: 17, uvIndex: 7 },
      { time: '04:00 PM', rawHour: 16, temperature: 31, feelsLike: 33, condition: 'partly-cloudy', conditionLabel: 'Passing Clouds', rainProbability: 20, windSpeed: 15, uvIndex: 4 },
    ],
    daily: [
      { day: 'Today', date: '27 Sep', condition: 'partly-cloudy', conditionLabel: 'Partly Cloudy', highTemp: 33, lowTemp: 24, rainProbability: 15, uvIndex: 8, humidity: 68, windSpeed: 14, summary: 'Pleasant evening with mild post-monsoon breeze.' },
      { day: 'Mon', date: '28 Sep', condition: 'sunny', conditionLabel: 'Bright & Warm', highTemp: 34, lowTemp: 24, rainProbability: 10, uvIndex: 8, humidity: 62, windSpeed: 13, summary: 'Clear sunny sky with warm afternoon temperatures.' },
      { day: 'Tue', date: '29 Sep', condition: 'partly-cloudy', conditionLabel: 'Scattered Clouds', highTemp: 33, lowTemp: 25, rainProbability: 25, uvIndex: 7, humidity: 70, windSpeed: 15, summary: 'Humid afternoon with chance of brief localized drizzle.' },
      { day: 'Wed', date: '30 Sep', condition: 'rain', conditionLabel: 'Passing Showers', highTemp: 31, lowTemp: 24, rainProbability: 55, uvIndex: 5, humidity: 78, windSpeed: 18, summary: 'Monsoon showers likely during afternoon hours.' },
      { day: 'Thu', date: '01 Oct', condition: 'partly-cloudy', conditionLabel: 'Pleasant & Fresh', highTemp: 32, lowTemp: 23, rainProbability: 20, uvIndex: 7, humidity: 65, windSpeed: 14, summary: 'Post-shower clarity with cooler night breeze.' },
      { day: 'Fri', date: '02 Oct', condition: 'sunny', conditionLabel: 'Sunny & Crisp', highTemp: 34, lowTemp: 23, rainProbability: 5, uvIndex: 8, humidity: 58, windSpeed: 12, summary: 'Gandhi Jayanti holiday with great outdoor weather.' },
      { day: 'Sat', date: '03 Oct', condition: 'sunny', conditionLabel: 'Clear Weekend', highTemp: 34, lowTemp: 24, rainProbability: 10, uvIndex: 8, humidity: 60, windSpeed: 11, summary: 'Warm sun throughout the weekend.' },
    ],
    updatedAt: 'Just now'
  },
  {
    location: {
      id: 'loc-ahmedabad',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      latitude: 23.0225,
      longitude: 72.5714,
      timezone: 'Asia/Kolkata',
    },
    current: {
      temp: 31,
      feelsLike: 33,
      highTemp: 35,
      lowTemp: 25,
      condition: 'sunny',
      conditionLabel: 'Clear & Sunny',
      description: 'Warm afternoon along the Sabarmati riverfront with dry westerly winds.',
      metrics: {
        humidity: 55,
        windSpeed: 15,
        windDirection: 'WNW',
        uvIndex: 7,
        uvLevel: 'High',
        visibility: 6,
        precipitation: 5,
        precipitationAmount: 0.0,
        pressure: 1009,
        dewPoint: 20,
        airQualityIndex: 74,
        airQualityStatus: 'Satisfactory',
        cloudCover: 15,
      },
      sunTimes: {
        sunrise: '06:28 AM',
        sunset: '06:36 PM',
        firstLight: '06:06 AM',
        lastLight: '06:58 PM',
        goldenHour: '06:00 PM',
      }
    },
    hourly: [
      { time: 'Now', rawHour: 18, temperature: 31, feelsLike: 33, condition: 'sunny', conditionLabel: 'Clear', rainProbability: 5, windSpeed: 15, uvIndex: 1 },
      { time: '07:00 PM', rawHour: 19, temperature: 29, feelsLike: 31, condition: 'sunny', conditionLabel: 'Dusk', rainProbability: 0, windSpeed: 14, uvIndex: 0 },
      { time: '08:00 PM', rawHour: 20, temperature: 28, feelsLike: 30, condition: 'partly-cloudy', conditionLabel: 'Pleasant', rainProbability: 0, windSpeed: 12, uvIndex: 0 },
      { time: '09:00 PM', rawHour: 21, temperature: 27, feelsLike: 29, condition: 'partly-cloudy', conditionLabel: 'Mild', rainProbability: 0, windSpeed: 11, uvIndex: 0 },
    ],
    daily: [
      { day: 'Today', date: '27 Sep', condition: 'sunny', conditionLabel: 'Clear & Bright', highTemp: 35, lowTemp: 25, rainProbability: 5, uvIndex: 8, humidity: 55, windSpeed: 15, summary: 'Warm and dry throughout the day.' },
      { day: 'Mon', date: '28 Sep', condition: 'sunny', conditionLabel: 'Sunny Spells', highTemp: 36, lowTemp: 25, rainProbability: 0, uvIndex: 8, humidity: 50, windSpeed: 14, summary: 'Peak afternoon heat near 36°C.' },
      { day: 'Tue', date: '29 Sep', condition: 'partly-cloudy', conditionLabel: 'Mild Clouds', highTemp: 34, lowTemp: 24, rainProbability: 15, uvIndex: 7, humidity: 62, windSpeed: 16, summary: 'Scattered clouds tempering the heat.' },
      { day: 'Wed', date: '30 Sep', condition: 'rain', conditionLabel: 'Light Rain', highTemp: 32, lowTemp: 24, rainProbability: 45, uvIndex: 6, humidity: 72, windSpeed: 18, summary: 'Brief afternoon rain showers.' },
      { day: 'Thu', date: '01 Oct', condition: 'sunny', conditionLabel: 'Crisp Sunshine', highTemp: 34, lowTemp: 23, rainProbability: 10, uvIndex: 7, humidity: 58, windSpeed: 13, summary: 'Sunny and clear across SG Highway.' },
      { day: 'Fri', date: '02 Oct', condition: 'sunny', conditionLabel: 'Warm & Clear', highTemp: 35, lowTemp: 24, rainProbability: 0, uvIndex: 8, humidity: 52, windSpeed: 12, summary: 'Comfortable evening for riverfront strolls.' },
      { day: 'Sat', date: '03 Oct', condition: 'sunny', conditionLabel: 'Dry Autumn', highTemp: 35, lowTemp: 24, rainProbability: 0, uvIndex: 8, humidity: 50, windSpeed: 11, summary: 'Bright and dry weekend forecast.' },
    ]
  },
  {
    location: {
      id: 'loc-mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      latitude: 19.0760,
      longitude: 72.8777,
      timezone: 'Asia/Kolkata',
    },
    current: {
      temp: 29,
      feelsLike: 34,
      highTemp: 31,
      lowTemp: 26,
      condition: 'rain',
      conditionLabel: 'Coastal Drizzle',
      description: 'High humidity with Arabian Sea breezes and passing monsoon drizzle along Marine Drive.',
      metrics: {
        humidity: 82,
        windSpeed: 20,
        windDirection: 'WSW',
        uvIndex: 5,
        uvLevel: 'Moderate',
        visibility: 5,
        precipitation: 45,
        precipitationAmount: 3.5,
        pressure: 1008,
        dewPoint: 25,
        airQualityIndex: 46,
        airQualityStatus: 'Good',
        cloudCover: 75,
      },
      sunTimes: {
        sunrise: '06:27 AM',
        sunset: '06:33 PM',
        firstLight: '06:06 AM',
        lastLight: '06:54 PM',
        goldenHour: '05:57 PM',
      }
    },
    hourly: [
      { time: 'Now', rawHour: 18, temperature: 29, feelsLike: 34, condition: 'rain', conditionLabel: 'Passing Drizzle', rainProbability: 45, windSpeed: 20, uvIndex: 1 },
      { time: '07:00 PM', rawHour: 19, temperature: 28, feelsLike: 33, condition: 'cloudy', conditionLabel: 'Sea Breeze', rainProbability: 30, windSpeed: 18, uvIndex: 0 },
      { time: '08:00 PM', rawHour: 20, temperature: 28, feelsLike: 32, condition: 'cloudy', conditionLabel: 'Humid Evening', rainProbability: 25, windSpeed: 17, uvIndex: 0 },
      { time: '09:00 PM', rawHour: 21, temperature: 27, feelsLike: 31, condition: 'partly-cloudy', conditionLabel: 'Breezy', rainProbability: 20, windSpeed: 16, uvIndex: 0 },
    ],
    daily: [
      { day: 'Today', date: '27 Sep', condition: 'rain', conditionLabel: 'Coastal Showers', highTemp: 31, lowTemp: 26, rainProbability: 45, uvIndex: 6, humidity: 82, windSpeed: 20, summary: 'Intermittent coastal showers and sea breeze.' },
      { day: 'Mon', date: '28 Sep', condition: 'heavy-rain', conditionLabel: 'Monsoon Spells', highTemp: 30, lowTemp: 25, rainProbability: 75, uvIndex: 4, humidity: 88, windSpeed: 26, summary: 'Moderate rain spells across Western Suburbs.' },
      { day: 'Tue', date: '29 Sep', condition: 'rain', conditionLabel: 'Showers & Wind', highTemp: 30, lowTemp: 25, rainProbability: 60, uvIndex: 5, humidity: 84, windSpeed: 22, summary: 'Passing showers throughout the day.' },
      { day: 'Wed', date: '30 Sep', condition: 'partly-cloudy', conditionLabel: 'Sun & Humidity', highTemp: 32, lowTemp: 26, rainProbability: 30, uvIndex: 7, humidity: 78, windSpeed: 18, summary: 'Sunbreaks between passing clouds.' },
      { day: 'Thu', date: '01 Oct', condition: 'partly-cloudy', conditionLabel: 'Coastal Warmth', highTemp: 32, lowTemp: 26, rainProbability: 20, uvIndex: 8, humidity: 75, windSpeed: 16, summary: 'Warm and humid post-monsoon weather.' },
      { day: 'Fri', date: '02 Oct', condition: 'sunny', conditionLabel: 'Bright & Humid', highTemp: 33, lowTemp: 26, rainProbability: 10, uvIndex: 8, humidity: 72, windSpeed: 15, summary: 'Clear sunny sky over the coastline.' },
      { day: 'Sat', date: '03 Oct', condition: 'sunny', conditionLabel: 'Sunny Seaside', highTemp: 33, lowTemp: 26, rainProbability: 10, uvIndex: 8, humidity: 70, windSpeed: 14, summary: 'Ideal weather for beach promenades.' },
    ]
  },
  {
    location: {
      id: 'loc-delhi',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: 'Asia/Kolkata',
    },
    current: {
      temp: 32,
      feelsLike: 35,
      highTemp: 34,
      lowTemp: 23,
      condition: 'sunny',
      conditionLabel: 'Warm & Clear',
      description: 'Sunny early autumn weather in the capital region with moderate afternoon warmth.',
      metrics: {
        humidity: 52,
        windSpeed: 12,
        windDirection: 'NW',
        uvIndex: 7,
        uvLevel: 'High',
        visibility: 4,
        precipitation: 0,
        precipitationAmount: 0.0,
        pressure: 1012,
        dewPoint: 20,
        airQualityIndex: 142,
        airQualityStatus: 'Moderate',
        cloudCover: 10,
      },
      sunTimes: {
        sunrise: '06:12 AM',
        sunset: '06:15 PM',
        firstLight: '05:49 AM',
        lastLight: '06:38 PM',
        goldenHour: '05:39 PM',
      }
    },
    hourly: [
      { time: 'Now', rawHour: 18, temperature: 32, feelsLike: 35, condition: 'sunny', conditionLabel: 'Warm', rainProbability: 0, windSpeed: 12, uvIndex: 1 },
      { time: '07:00 PM', rawHour: 19, temperature: 30, feelsLike: 32, condition: 'sunny', conditionLabel: 'Clear Evening', rainProbability: 0, windSpeed: 10, uvIndex: 0 },
      { time: '08:00 PM', rawHour: 20, temperature: 28, feelsLike: 30, condition: 'sunny', conditionLabel: 'Pleasant', rainProbability: 0, windSpeed: 9, uvIndex: 0 },
      { time: '09:00 PM', rawHour: 21, temperature: 26, feelsLike: 28, condition: 'sunny', conditionLabel: 'Cooling Down', rainProbability: 0, windSpeed: 8, uvIndex: 0 },
    ],
    daily: [
      { day: 'Today', date: '27 Sep', condition: 'sunny', conditionLabel: 'Clear Sky', highTemp: 34, lowTemp: 23, rainProbability: 0, uvIndex: 7, humidity: 52, windSpeed: 12, summary: 'Warm afternoon and pleasant evening.' },
      { day: 'Mon', date: '28 Sep', condition: 'sunny', conditionLabel: 'Bright Autumn', highTemp: 35, lowTemp: 23, rainProbability: 0, uvIndex: 8, humidity: 48, windSpeed: 11, summary: 'Dry northwest winds and clear sun.' },
      { day: 'Tue', date: '29 Sep', condition: 'sunny', conditionLabel: 'Warm & Dry', highTemp: 35, lowTemp: 24, rainProbability: 0, uvIndex: 8, humidity: 46, windSpeed: 13, summary: 'Warm midday across NCR.' },
      { day: 'Wed', date: '30 Sep', condition: 'partly-cloudy', conditionLabel: 'Mild Haze', highTemp: 34, lowTemp: 23, rainProbability: 10, uvIndex: 6, humidity: 54, windSpeed: 10, summary: 'Passing light cloud cover.' },
      { day: 'Thu', date: '01 Oct', condition: 'sunny', conditionLabel: 'Pleasant Day', highTemp: 33, lowTemp: 22, rainProbability: 0, uvIndex: 7, humidity: 50, windSpeed: 12, summary: 'Cooler nighttime temperatures beginning.' },
      { day: 'Fri', date: '02 Oct', condition: 'sunny', conditionLabel: 'Clear & Crisp', highTemp: 33, lowTemp: 21, rainProbability: 0, uvIndex: 7, humidity: 48, windSpeed: 11, summary: 'Great day for outdoor India Gate visits.' },
      { day: 'Sat', date: '03 Oct', condition: 'sunny', conditionLabel: 'Sunny Weekend', highTemp: 34, lowTemp: 22, rainProbability: 0, uvIndex: 7, humidity: 46, windSpeed: 10, summary: 'Consistent dry weather pattern.' },
    ]
  },
  {
    location: {
      id: 'loc-bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      latitude: 12.9716,
      longitude: 77.5946,
      timezone: 'Asia/Kolkata',
    },
    current: {
      temp: 24,
      feelsLike: 25,
      highTemp: 27,
      lowTemp: 19,
      condition: 'partly-cloudy',
      conditionLabel: 'Mild & Breezy',
      description: 'Signature pleasant Bengaluru climate with gentle cool breeze and overcast patches.',
      metrics: {
        humidity: 70,
        windSpeed: 16,
        windDirection: 'W',
        uvIndex: 5,
        uvLevel: 'Moderate',
        visibility: 8,
        precipitation: 20,
        precipitationAmount: 0.5,
        pressure: 1014,
        dewPoint: 18,
        airQualityIndex: 32,
        airQualityStatus: 'Good',
        cloudCover: 50,
      },
      sunTimes: {
        sunrise: '06:09 AM',
        sunset: '06:14 PM',
        firstLight: '05:49 AM',
        lastLight: '06:34 PM',
        goldenHour: '05:40 PM',
      }
    },
    hourly: [
      { time: 'Now', rawHour: 18, temperature: 24, feelsLike: 25, condition: 'partly-cloudy', conditionLabel: 'Cool Breeze', rainProbability: 20, windSpeed: 16, uvIndex: 1 },
      { time: '07:00 PM', rawHour: 19, temperature: 23, feelsLike: 23, condition: 'partly-cloudy', conditionLabel: 'Pleasant', rainProbability: 15, windSpeed: 14, uvIndex: 0 },
      { time: '08:00 PM', rawHour: 20, temperature: 22, feelsLike: 22, condition: 'cloudy', conditionLabel: 'Chilly Evening', rainProbability: 15, windSpeed: 13, uvIndex: 0 },
      { time: '09:00 PM', rawHour: 21, temperature: 21, feelsLike: 21, condition: 'cloudy', conditionLabel: 'Cool Night', rainProbability: 10, windSpeed: 11, uvIndex: 0 },
    ],
    daily: [
      { day: 'Today', date: '27 Sep', condition: 'partly-cloudy', conditionLabel: 'Mild & Pleasant', highTemp: 27, lowTemp: 19, rainProbability: 20, uvIndex: 6, humidity: 70, windSpeed: 16, summary: 'Delightful weather across the city.' },
      { day: 'Mon', date: '28 Sep', condition: 'rain', conditionLabel: 'Evening Showers', highTemp: 26, lowTemp: 19, rainProbability: 60, uvIndex: 5, humidity: 78, windSpeed: 18, summary: 'Typical Bengaluru evening drizzle.' },
      { day: 'Tue', date: '29 Sep', condition: 'partly-cloudy', conditionLabel: 'Breezy & Cool', highTemp: 27, lowTemp: 19, rainProbability: 30, uvIndex: 6, humidity: 72, windSpeed: 17, summary: 'Crisp morning for Cubbon Park runs.' },
      { day: 'Wed', date: '30 Sep', condition: 'sunny', conditionLabel: 'Bright & Calm', highTemp: 28, lowTemp: 18, rainProbability: 10, uvIndex: 7, humidity: 65, windSpeed: 14, summary: 'Clear blue skies with cool morning breeze.' },
      { day: 'Thu', date: '01 Oct', condition: 'partly-cloudy', conditionLabel: 'Mild Clouds', highTemp: 27, lowTemp: 19, rainProbability: 25, uvIndex: 6, humidity: 68, windSpeed: 15, summary: 'Great walking weather in Indiranagar.' },
      { day: 'Fri', date: '02 Oct', condition: 'rain', conditionLabel: 'Light Rain', highTemp: 26, lowTemp: 19, rainProbability: 50, uvIndex: 5, humidity: 76, windSpeed: 16, summary: 'Passing showers in the late afternoon.' },
      { day: 'Sat', date: '03 Oct', condition: 'partly-cloudy', conditionLabel: 'Comfortable', highTemp: 27, lowTemp: 19, rainProbability: 15, uvIndex: 6, humidity: 68, windSpeed: 13, summary: 'Relaxing weekend atmosphere.' },
    ]
  },
  {
    location: {
      id: 'loc-jaipur',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      latitude: 26.9124,
      longitude: 75.7873,
      timezone: 'Asia/Kolkata',
    },
    current: {
      temp: 33,
      feelsLike: 35,
      highTemp: 36,
      lowTemp: 23,
      condition: 'sunny',
      conditionLabel: 'Golden Sunshine',
      description: 'Dry desert breezes with clear skies over the Pink City.',
      metrics: {
        humidity: 42,
        windSpeed: 13,
        windDirection: 'NW',
        uvIndex: 8,
        uvLevel: 'Very High',
        visibility: 7,
        precipitation: 0,
        precipitationAmount: 0.0,
        pressure: 1011,
        dewPoint: 17,
        airQualityIndex: 65,
        airQualityStatus: 'Satisfactory',
        cloudCover: 5,
      },
      sunTimes: {
        sunrise: '06:19 AM',
        sunset: '06:23 PM',
        firstLight: '05:56 AM',
        lastLight: '06:46 PM',
        goldenHour: '05:47 PM',
      }
    },
    hourly: [
      { time: 'Now', rawHour: 18, temperature: 33, feelsLike: 35, condition: 'sunny', conditionLabel: 'Warm', rainProbability: 0, windSpeed: 13, uvIndex: 1 },
      { time: '07:00 PM', rawHour: 19, temperature: 30, feelsLike: 31, condition: 'sunny', conditionLabel: 'Sunset Glow', rainProbability: 0, windSpeed: 11, uvIndex: 0 },
      { time: '08:00 PM', rawHour: 20, temperature: 28, feelsLike: 29, condition: 'sunny', conditionLabel: 'Comfortable', rainProbability: 0, windSpeed: 10, uvIndex: 0 },
    ],
    daily: [
      { day: 'Today', date: '27 Sep', condition: 'sunny', conditionLabel: 'Sunny & Dry', highTemp: 36, lowTemp: 23, rainProbability: 0, uvIndex: 8, humidity: 42, windSpeed: 13, summary: 'Pure Rajasthan sunshine.' },
      { day: 'Mon', date: '28 Sep', condition: 'sunny', conditionLabel: 'Warm Autumn', highTemp: 36, lowTemp: 24, rainProbability: 0, uvIndex: 8, humidity: 40, windSpeed: 12, summary: 'High UV during midday.' },
      { day: 'Tue', date: '29 Sep', condition: 'sunny', conditionLabel: 'Clear Skies', highTemp: 35, lowTemp: 23, rainProbability: 0, uvIndex: 8, humidity: 38, windSpeed: 11, summary: 'Ideal day for monument tours.' },
      { day: 'Wed', date: '30 Sep', condition: 'partly-cloudy', conditionLabel: 'Mild Clouds', highTemp: 34, lowTemp: 22, rainProbability: 5, uvIndex: 7, humidity: 45, windSpeed: 14, summary: 'Passing light cloud cover.' },
      { day: 'Thu', date: '01 Oct', condition: 'sunny', conditionLabel: 'Crisp Sun', highTemp: 35, lowTemp: 22, rainProbability: 0, uvIndex: 8, humidity: 42, windSpeed: 12, summary: 'Cool morning followed by warm sun.' },
      { day: 'Fri', date: '02 Oct', condition: 'sunny', conditionLabel: 'Pleasant Holiday', highTemp: 35, lowTemp: 22, rainProbability: 0, uvIndex: 8, humidity: 39, windSpeed: 10, summary: 'Warm dry conditions for sightseeing.' },
      { day: 'Sat', date: '03 Oct', condition: 'sunny', conditionLabel: 'Brilliant Weekend', highTemp: 36, lowTemp: 23, rainProbability: 0, uvIndex: 8, humidity: 38, windSpeed: 9, summary: 'Steady clear weather.' },
    ]
  }
];

export const ALL_SEARCHABLE_CITIES: UserLocation[] = [
  { id: 'loc-vadodara', city: 'Vadodara', state: 'Gujarat', country: 'India', latitude: 22.3072, longitude: 73.1812, timezone: 'Asia/Kolkata' },
  { id: 'loc-ahmedabad', city: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata' },
  { id: 'loc-mumbai', city: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { id: 'loc-pune', city: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
  { id: 'loc-delhi', city: 'Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { id: 'loc-new-delhi', city: 'New Delhi', state: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { id: 'loc-bengaluru', city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
  { id: 'loc-hyderabad', city: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
  { id: 'loc-chennai', city: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
  { id: 'loc-kolkata', city: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
  { id: 'loc-jaipur', city: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata' },
  { id: 'loc-surat', city: 'Surat', state: 'Gujarat', country: 'India', latitude: 21.1702, longitude: 72.8311, timezone: 'Asia/Kolkata' },
  { id: 'loc-rajkot', city: 'Rajkot', state: 'Gujarat', country: 'India', latitude: 22.3039, longitude: 70.8022, timezone: 'Asia/Kolkata' },
  { id: 'loc-lucknow', city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, timezone: 'Asia/Kolkata' },
  { id: 'loc-indore', city: 'Indore', state: 'Madhya Pradesh', country: 'India', latitude: 22.7196, longitude: 75.8577, timezone: 'Asia/Kolkata' },
  { id: 'loc-bhopal', city: 'Bhopal', state: 'Madhya Pradesh', country: 'India', latitude: 23.2599, longitude: 77.4126, timezone: 'Asia/Kolkata' },
  { id: 'loc-nagpur', city: 'Nagpur', state: 'Maharashtra', country: 'India', latitude: 21.1458, longitude: 79.0882, timezone: 'Asia/Kolkata' },
  { id: 'loc-patna', city: 'Patna', state: 'Bihar', country: 'India', latitude: 25.5941, longitude: 85.1376, timezone: 'Asia/Kolkata' },
  { id: 'loc-chandigarh', city: 'Chandigarh', state: 'Chandigarh', country: 'India', latitude: 30.7333, longitude: 76.7794, timezone: 'Asia/Kolkata' },
  { id: 'loc-kochi', city: 'Kochi', state: 'Kerala', country: 'India', latitude: 9.9312, longitude: 76.2673, timezone: 'Asia/Kolkata' },
  { id: 'loc-thiruvananthapuram', city: 'Thiruvananthapuram', state: 'Kerala', country: 'India', latitude: 8.5241, longitude: 76.9366, timezone: 'Asia/Kolkata' },
  { id: 'loc-bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', country: 'India', latitude: 20.2961, longitude: 85.8245, timezone: 'Asia/Kolkata' },
  { id: 'loc-guwahati', city: 'Guwahati', state: 'Assam', country: 'India', latitude: 26.1445, longitude: 91.7362, timezone: 'Asia/Kolkata' },
  { id: 'loc-srinagar', city: 'Srinagar', state: 'Jammu & Kashmir', country: 'India', latitude: 34.0837, longitude: 74.7973, timezone: 'Asia/Kolkata' },
  { id: 'loc-shimla', city: 'Shimla', state: 'Himachal Pradesh', country: 'India', latitude: 31.1048, longitude: 77.1734, timezone: 'Asia/Kolkata' },
  { id: 'loc-dehradun', city: 'Dehradun', state: 'Uttarakhand', country: 'India', latitude: 30.3165, longitude: 78.0322, timezone: 'Asia/Kolkata' },
  { id: 'loc-amritsar', city: 'Amritsar', state: 'Punjab', country: 'India', latitude: 31.6340, longitude: 74.8723, timezone: 'Asia/Kolkata' },
  { id: 'loc-varanasi', city: 'Varanasi', state: 'Uttar Pradesh', country: 'India', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata' },
];

export const VERIFIED_ALERTS: VerifiedAlert[] = [
  {
    id: 'alt-imd-001',
    source: 'India Meteorological Department (IMD) — Regional Centre',
    severity: 'Advisory',
    alertColor: 'Yellow',
    title: 'Yellow Alert: Moderate Rainfall & Gusty Wind Advisory',
    location: 'Vadodara & Central Gujarat Districts',
    issuedTime: 'Today at 08:30 AM IST',
    expiresTime: 'Today at 09:00 PM IST',
    description: 'Light to moderate rainfall with isolated thundershowers and gusty winds reaching 30–40 km/h expected across Central Gujarat. Localized waterlogging in low-lying underpasses possible during peak rain intervals.',
    instructions: [
      'Commuters are advised to check water levels at underpasses (like Sayajigunj & Alkapuri) before traveling.',
      'Two-wheeler riders should wear helmets and avoid riding under weak tree branches or hoardings during gusty spells.',
      'Farmers should postpone foliar spray applications until rainfall subsides.'
    ]
  },
  {
    id: 'alt-imd-002',
    source: 'State Disaster Management Authority (SDMA) & IMD',
    severity: 'Advisory',
    alertColor: 'Yellow',
    title: 'Midday Heat & High UV Index Advisory',
    location: 'Western & North Gujarat Plains',
    issuedTime: 'Today at 11:00 AM IST',
    expiresTime: 'Today at 04:30 PM IST',
    description: 'Afternoon temperatures expected to touch 33–35°C with High UV Index (7.0–8.0). High humidity may cause elevated heat index.',
    instructions: [
      'Stay hydrated with water, ORS, lemonade, or coconut water during afternoon hours.',
      'Cover head and face with light cotton cloth or umbrella when stepping out.',
      'Ensure elderly family members and children avoid direct sun exposure between 12:00 PM and 03:30 PM.'
    ]
  }
];

export const SAFETY_GUIDANCE_LIST: SafetyGuidance[] = [
  {
    id: 'sg-monsoon',
    category: 'Heavy Rain',
    title: 'Monsoon Rain & Waterlogged Roads',
    threshold: 'Rainfall > 15 mm/h or IMD Yellow/Orange Alert',
    shortSummary: 'Waterlogged roads, reduced vehicle tire traction, and traffic jams require extra commute buffer.',
    recommendations: [
      'Keep 20–30 minutes extra buffer for city commute during downpours.',
      'Avoid driving through waterlogged underpasses or roads with submerged curbs.',
      'Keep a compact umbrella and water-resistant footwear handy.'
    ],
    actionTips: [
      'Check vehicle wiper blades and tire tread depth.',
      'Unplug sensitive electronic appliances during thunderstorms.'
    ],
    icon: 'CloudRain',
    accentColor: '#3F78A3'
  },
  {
    id: 'sg-heat',
    category: 'Heat',
    title: 'Extreme Afternoon Heat & Humidity',
    threshold: 'Heat Index > 34°C or Summer Afternoon Peak',
    shortSummary: 'High temperatures combined with tropical humidity cause fatigue and dehydration.',
    recommendations: [
      'Drink plenty of water, chaas (buttermilk), or coconut water before feeling thirsty.',
      'Wear loose, light-colored, breathable cotton fabrics.',
      'Avoid strenuous workouts in direct midday sun; choose early morning (6:00–7:30 AM).'
    ],
    actionTips: [
      'Never leave children or pets in parked vehicles even for a few minutes.',
      'Keep glucose or electrolyte water ready for active outdoor travel.'
    ],
    icon: 'Flame',
    accentColor: '#F43F5E'
  },
  {
    id: 'sg-uv',
    category: 'High UV',
    title: 'Tropical Solar Radiation & UV Protection',
    threshold: 'UV Index ≥ 6.0 (High to Very High)',
    shortSummary: 'Intense tropical sun exposure can cause skin irritation and sunburn in 20 minutes.',
    recommendations: [
      'Apply SPF 30+ sunscreen on exposed face and arms before leaving home.',
      'Wear sunglasses with UV400 protection to protect eye health from sun glare.',
      'Seek shaded tree cover or canopy areas when waiting at outdoor stops.'
    ],
    actionTips: [
      'Carry a cotton scarf or umbrella when traveling on two-wheelers.',
      'Reapply sunscreen if sweating heavily outdoors.'
    ],
    icon: 'Sun',
    accentColor: '#F5C978'
  },
  {
    id: 'sg-wind',
    category: 'Strong Wind',
    title: 'Strong Gusts & Pre-Monsoon Squalls',
    threshold: 'Wind speed > 35 km/h or thunderstorm squalls',
    shortSummary: 'Sudden gusts affect two-wheeler stability, outdoor hoardings, and construction sheets.',
    recommendations: [
      'Two-wheeler riders must slow down on open flyovers and bridge crossings.',
      'Park vehicles away from old trees, temporary tin sheds, and large roadside billboards.',
      'Secure loose terrace items, clotheslines, and balcony plant pots.'
    ],
    actionTips: [
      'Close high-rise balcony glass windows firmly.',
      'Report dangling power cables immediately to the local electricity board.'
    ],
    icon: 'Wind',
    accentColor: '#174A73'
  },
  {
    id: 'sg-visibility',
    category: 'Poor Visibility',
    title: 'Morning Fog, Mist & Dust Haze',
    threshold: 'Visibility < 3 km (Common in winter & early mornings)',
    shortSummary: 'Dense morning fog on highways (e.g. Ahmedabad–Vadodara Expressway) requires careful driving.',
    recommendations: [
      'Use low-beam headlights and yellow fog lamps; avoid high beams in thick fog.',
      'Maintain double following distance on national highways and expressways.',
      'Check train and flight schedules for possible fog-related delays.'
    ],
    actionTips: [
      'Keep windshields clean inside and out to prevent misting.',
      'Cyclists and morning walkers should wear brightly colored or reflective gear.'
    ],
    icon: 'EyeOff',
    accentColor: '#3F78A3'
  }
];

export function getPersonaInsight(interest: PrimaryInterest, weather: FullLocationWeather, lang: IndianLanguage = 'en'): PersonaInsight {
  const current = weather.current;
  const temp = current.temp;
  const condition = current.condition;
  const rainProb = current.metrics.precipitation;
  const uv = current.metrics.uvIndex;
  const wind = current.metrics.windSpeed;
  const aqi = current.metrics.airQualityIndex;
  const city = weather.location.city;
  const state = weather.location.state;

  if (lang === 'hi') {
    switch (interest) {
      case 'Daily Commute':
        if (rainProb > 30 || condition === 'rain' || condition === 'heavy-rain') {
          return {
            interest,
            badge: 'यात्रा सलाह',
            headline: `${city} में शाम के समय बारिश से यात्रा प्रभावित हो सकती है`,
            advice: `शाम को काम से लौटते समय बारिश के आसार हैं। मुख्य सड़कों पर जलभराव और भारी ट्रैफिक के कारण अधिक समय लग सकता है।`,
            suitabilityScore: 72,
            suitabilityLabel: 'सावधानी जरूरी',
            recommendedWindow: 'अनुकूल समय: शाम 05:30 से पहले या 07:30 के बाद निकलें',
            bulletPoints: [
              'रेनकोट या छाता साथ रखना न भूलें',
              'शहर के अंडरपास और चौराहों पर 15-20 मिनट का अतिरिक्त समय लेकर चलें',
              `दृश्यता ${current.metrics.visibility} किमी है — गाड़ी की हेडलाइट लो-बीम पर रखें`
            ]
          };
        }
        return {
          interest,
          badge: 'सुगम यात्रा',
          headline: 'सड़कें साफ़ हैं और यात्रा के लिए मौसम अत्यंत अनुकूल है',
          advice: `${city}, ${state} में आवागमन के लिए परिस्थितियां उत्तम हैं। मध्यम तापमान (${temp}°C) और साफ़ दृश्यता से सफर आरामदायक रहेगा।`,
          suitabilityScore: 95,
          suitabilityLabel: 'सर्वश्रेष्ठ',
          recommendedWindow: 'दिनभर सुगम एवं सुरक्षित आवागमन',
          bulletPoints: [
            'सड़कें सूखी हैं और दृश्यता बहुत अच्छी है',
            'दुपहिया वाहन, बस और मेट्रो यात्रा के लिए सुखद मौसम',
            'मौसम से संबंधित किसी देरी की संभावना नहीं है'
          ]
        };

      case 'Outdoor Activities':
      case 'Fitness':
      case 'Fitness & Outdoor Activities':
        if (temp > 32 || uv > 6) {
          return {
            interest,
            badge: 'फिटनेस सलाह',
            headline: 'सुबह के समय वर्कआउट और आउटडोर गतिविधियों के लिए सबसे अच्छा मौसम',
            advice: `दोपहर में तापमान ${current.highTemp}°C तक पहुंचेगा। ताजी हवा और बेहतर ऊर्जा के लिए अपनी सुबह की सैर या दौड़ जल्दी पूरी करें।`,
            suitabilityScore: 88,
            suitabilityLabel: 'उत्तम',
            recommendedWindow: 'उत्तम समय: सुबह 06:00 से 07:45 बजे तक (तापमान: 24°C)',
            bulletPoints: [
              `वायु गुणवत्ता सूचकांक ${aqi} (${current.metrics.airQualityStatus}) है — गहरी सांस लेने के लिए उपयुक्त`,
              `दोपहर में यूवी इंडेक्स ${uv} तक पहुंचेगा — सुबह 8:30 के बाद हल्की सनस्क्रीन लगाएं`,
              'पानी पीते रहें और नारियल पानी या ओआरएस का उपयोग करें'
            ]
          };
        }
        return {
          interest,
          badge: 'अनुकूल आउटडोर समय',
          headline: 'शाम की सैर और आउटडोर मनोरंजन के लिए मौसम अनुकूल है',
          advice: `${city} में मौसम सुहावना है। ${temp}°C तापमान और ${wind} किमी/घंटा की मंद हवा पार्क और ट्रैक के लिए ताज़गी भरा माहौल बनाती है।`,
          suitabilityScore: 96,
          suitabilityLabel: 'सर्वश्रेष्ठ',
          recommendedWindow: 'शाम की सैर का समय: 05:45 PM – 07:30 PM',
          bulletPoints: [
            'सुहावना मौसम और बारिश की कोई बाधा नहीं',
            'दौड़ने, साइकिल चलाने और योग के लिए सुरक्षित वातावरण',
            `संतोषजनक वायु गुणवत्ता (AQI ${aqi})`
          ]
        };

      case 'Travel':
        return {
          interest,
          badge: 'यात्रा पूर्वानुमान',
          headline: `${city}, ${state} में यात्रा और पर्यटन के लिए उत्तम मौसम`,
          advice: `साफ़ दृश्यता (${current.metrics.visibility} किमी) और हल्की हवा। ऐतिहासिक धरोहरों, स्थानीय बाज़ारों और दर्शनीय स्थलों के भ्रमण के लिए अनुकूल।`,
          suitabilityScore: 92,
          suitabilityLabel: 'सर्वश्रेष्ठ',
          recommendedWindow: 'फोटोग्राफी के लिए सबसे अच्छा समय: ' + current.sunTimes.goldenHour,
          bulletPoints: [
            'सूर्योदय: ' + current.sunTimes.sunrise + ' | सूर्यास्त: ' + current.sunTimes.sunset,
            `अधिकतम ${current.highTemp}°C, न्यूनतम ${current.lowTemp}°C — हल्के सूती कपड़े पहनें`,
            'स्थानीय प्रशासन द्वारा किसी मार्ग अवरोध की सूचना नहीं है'
          ]
        };

      case 'Farming & Gardening':
        return {
          interest,
          badge: 'कृषि एवं मिट्टी सलाह',
          headline: 'मिट्टी में उचित नमी एवं फसलों के लिए अनुकूल वातावरण',
          advice: `${city} क्षेत्र में आर्द्रता ${current.metrics.humidity}% और बारिश की संभावना ${rainProb}% है। फसलों की सिंचाई और बागवानी के लिए अनुकूल स्थिति।`,
          suitabilityScore: 88,
          suitabilityLabel: 'उत्तम',
          recommendedWindow: 'सिंचाई एवं पौधों को पानी देने का समय: 06:30 AM – 08:00 AM',
          bulletPoints: [
            `बारिश का अनुमान: ${current.metrics.precipitationAmount} मिमी (${rainProb}% संभावना)`,
            `हवा की गति ${wind} किमी/घंटा — कीटनाशक छिड़काव के लिए सुरक्षित`,
            'मिट्टी में नमी का स्तर संतुलित बना हुआ है'
          ]
        };

      case 'Events':
      case 'Events & Functions':
        if (rainProb > 30) {
          return {
            interest,
            badge: 'समारोह सलाह',
            headline: 'शाम के समय मौसम में बदलाव और बारिश की संभावना',
            advice: `${city} में शाम के समय हल्की बारिश हो सकती है। लॉन रिसेप्शन, विवाह या खुले में कार्यक्रम आयोजित करते समय वाटरप्रूफ टेंट की व्यवस्था रखें।`,
            suitabilityScore: 75,
            suitabilityLabel: 'सामान्य',
            recommendedWindow: 'शाम की तैयारी से पहले प्रति घंटे का पूर्वानुमान देखें',
            bulletPoints: [
              `शाम 06:00 से 08:00 बजे के बीच ${rainProb}% बारिश के आसार`,
              `हवा की गति ${wind} किमी/घंटा — टेंट और शामियाने को मजबूती से बांधें`,
              'सूर्यास्त के समय सुहावना माहौल: ' + current.sunTimes.sunset
            ]
          };
        }
        return {
          interest,
          badge: 'खुले आयोजन के लिए साफ़',
          headline: 'आउटडोर समारोहों एवं आयोजनों के लिए एकदम सही मौसम',
          advice: `बारिश की नगण्य संभावना और सुखद तापमान (${temp}°C) खुले में पारिवारिक समारोहों और कार्यक्रमों के लिए आदर्श है।`,
          suitabilityScore: 94,
          suitabilityLabel: 'सर्वश्रेष्ठ',
          recommendedWindow: 'आयोजन का मुख्य समय: 06:00 PM – 10:30 PM',
          bulletPoints: [
            'पूरी शाम शुष्क और साफ़ मौसम का पूर्वानुमान',
            'मेहमानों के खानपान और प्रस्तुतियों के लिए आरामदायक हवा',
            'मौसम संबंधी किसी अचानक व्यवधान की आशंका नहीं'
          ]
        };

      case 'Family Safety':
        return {
          interest,
          badge: 'पारिवारिक सुरक्षा स्थिति',
          headline: 'परिवार और बच्चों के लिए सुरक्षित एवं आरामदायक मौसम',
          advice: `${city} में वायु गुणवत्ता ${current.metrics.airQualityStatus} (AQI ${aqi}) है। बच्चों के बाहर खेलने और बुजुर्गों के टहलने के लिए अनुकूल।`,
          suitabilityScore: 96,
          suitabilityLabel: 'सर्वश्रेष्ठ',
          recommendedWindow: 'पारिवारिक भ्रमण का समय: 04:30 PM – 07:00 PM',
          bulletPoints: [
            `साफ़ हवा (AQI ${aqi}) — सांस के रोगियों के लिए भी अनुकूल`,
            `दोपहर में यूवी इंडेक्स ${uv} — धूप से बचाव के लिए टोपी या स्कार्फ पहनें`,
            'जिले में मौसम विभाग (IMD) की कोई गंभीर चेतावनी जारी नहीं है'
          ]
        };

      case 'Daily Planning':
      default:
        return {
          interest,
          badge: 'आज का मौसम',
          headline: 'दोपहर में गर्मी बढ़ने की संभावना, सुबह के समय काम निपटाएं',
          advice: `आज ${city} में अधिकतम तापमान ${current.highTemp}°C और न्यूनतम ${current.lowTemp}°C रहेगा। धूप में निकलने से बचें और सुबह या शाम के समय बाहर के काम करें।`,
          suitabilityScore: 92,
          suitabilityLabel: 'उत्तम',
          recommendedWindow: 'आरामदायक समय: सुबह 07:00 – 11:00 और शाम 05:00 के बाद',
          bulletPoints: [
            `वर्तमान तापमान: ${temp}°C (महसूस हो रहा है: ${current.feelsLike}°C)`,
            `नमी: ${current.metrics.humidity}% • हवा: ${wind} किमी/घंटा ${current.metrics.windDirection}`,
            `बारिश की संभावना: ${rainProb}% • वायुमंडलीय दबाव: ${current.metrics.pressure} hPa`
          ]
        };
    }
  }

  if (lang === 'gu') {
    switch (interest) {
      case 'Daily Commute':
        return {
          interest,
          badge: 'મુસાફરી સલાહ',
          headline: `${city} માં મુસાફરી માટે રસ્તાઓ સાફ અને અનુકૂળ છે`,
          advice: `${city}, ${state} માં વાહનવ્યવહાર અને પ્રવાસ માટે વાતાવરણ સારું છે. તાપમાન ${temp}°C અને વિઝિબિલિટી સ્પષ્ટ છે.`,
          suitabilityScore: 94,
          suitabilityLabel: 'શ્રેષ્ઠ',
          recommendedWindow: 'દિવસ દરમિયાન સલામત મુસાફરી',
          bulletPoints: [
            'રસ્તાઓ સૂકા છે અને દૃશ્યતા ખૂબ સારી છે',
            'ટુ-વ્હીલર અને જાહેર પરિવહન માટે આરામદાયક હવામાન',
            'હવામાનને કારણે કોઈ મોટા ટ્રાફિક વિલંબની શક્યતા નથી'
          ]
        };
      case 'Farming & Gardening':
        return {
          interest,
          badge: 'કૃષિ અને બાગાયત સલાહ',
          headline: 'જમીનમાં સારો ભેજ અને પાક માટે ઉત્તમ વાતાવરણ',
          advice: `${city} વિસ્તારમાં ભેજ ${current.metrics.humidity}% અને વરસાદની શક્યતા ${rainProb}% છે. પાકની સંભાળ અને પિયત માટે ઉત્તમ સમય.`,
          suitabilityScore: 89,
          suitabilityLabel: 'ઉત્તમ',
          recommendedWindow: 'પિયતનો શ્રેષ્ઠ સમય: સવારે 06:30 – 08:00',
          bulletPoints: [
            `પવનની ગતિ ${wind} કિમી/કલાક — દવા છંટકાવ માટે અનુકૂળ`,
            'જમીનમાં ભેજનું પ્રમાણ સંતુલિત છે',
            `સૂર્યપ્રકાશ પૂરતો મળશે`
          ]
        };
      default:
        return {
          interest,
          badge: 'આજનું હવામાન',
          headline: `${city} માં બપોરે તાપમાન વધવાની શક્યતા`,
          advice: `આજે ${city} માં મહત્તમ તાપમાન ${current.highTemp}°C અને લઘુત્તમ ${current.lowTemp}°C રહેશે. જરૂરી કામો સવારના સમયે પતાવવાની સલાહ છે.`,
          suitabilityScore: 92,
          suitabilityLabel: 'ઉત્તમ',
          recommendedWindow: 'અનુકૂળ સમય: સવારે 07:00 – 11:00 અને સાંજે 05:00 પછી',
          bulletPoints: [
            `વર્તમાન તાપમાન: ${temp}°C (અનુભવાતું: ${current.feelsLike}°C)`,
            `ભેજ: ${current.metrics.humidity}% • પવન: ${wind} કિમી/કલાક`,
            `વરસાદની શક્યતા: ${rainProb}%`
          ]
        };
    }
  }

  if (lang === 'mr') {
    return {
      interest,
      badge: 'हवामान सल्ला',
      headline: `${city} मध्ये आजचे हवामान अनुकूल आणि सुखद आहे`,
      advice: `आज ${city} मध्ये कमाल तापमान ${current.highTemp}°C आणि किमान ${current.lowTemp}°C राहील. सकाळच्या आणि संध्याकाळच्या वेळी कामे करण्यासाठी उत्तम वेळ.`,
      suitabilityScore: 93,
      suitabilityLabel: 'सर्वोत्तम',
      recommendedWindow: 'अनुकूल वेळ: सकाळी 07:00 ते 11:00 आणि संध्याकाळी 05:00 नंतर',
      bulletPoints: [
        `सध्याचे तापमान: ${temp}°C (जाणवणारे: ${current.feelsLike}°C)`,
        `आर्द्रता: ${current.metrics.humidity}% • वाऱ्याचा वेग: ${wind} किमी/तास`,
        `पावसाची शक्यता: ${rainProb}% • हवेची गुणवत्ता (AQI ${aqi})`
      ]
    };
  }

  if (lang === 'bn') {
    return {
      interest,
      badge: 'আবহাওয়া পরামর্শ',
      headline: `${city}-তে আজকের আবহাওয়া কাজ ও ভ্রমণের জন্য উপযোগী`,
      advice: `আজ ${city}-তে সর্বোচ্চ তাপমাত্রা ${current.highTemp}°C এবং সর্বনিম্ন ${current.lowTemp}°C থাকবে। সকাল ও বিকেলের দিকে বাইরে বেরোনো সবচেয়ে আরামদায়ক হবে।`,
      suitabilityScore: 93,
      suitabilityLabel: 'আদর্শ',
      recommendedWindow: 'উপযুক্ত সময়: সকাল ০৭:০০ – ১১:০০ এবং বিকেল ০৫:০০ এর পর',
      bulletPoints: [
        `বর্তমান তাপমাত্রা: ${temp}°C (অনুভূত: ${current.feelsLike}°C)`,
        `আর্দ্রতা: ${current.metrics.humidity}% • বাতাসের গতি: ${wind} কিমি/ঘণ্টা`,
        `বৃষ্টির সম্ভাবনা: ${rainProb}% • বায়ুর মান (AQI ${aqi})`
      ]
    };
  }

  if (lang === 'ta') {
    return {
      interest,
      badge: 'வானிலை ஆலோசனை',
      headline: `${city} இல் இன்றைய வானிலை அன்றாட பணிகளுக்கு ஏற்றது`,
      advice: `இன்று ${city} இல் அதிகபட்ச வெப்பநிலை ${current.highTemp}°C மற்றும் குறைந்தபட்ச வெப்பநிலை ${current.lowTemp}°C ஆக இருக்கும். காலை மற்றும் மாலை வேளைகளில் பணிகளைத் திட்டமிடுங்கள்.`,
      suitabilityScore: 94,
      suitabilityLabel: 'மிகச் சிறந்தது',
      recommendedWindow: 'உகந்த நேரம்: காலை 07:00 – 11:00 மற்றும் மாலை 05:00 மணிக்குப் பிறகு',
      bulletPoints: [
        `தற்போதைய வெப்பநிலை: ${temp}°C (உணரப்படுவது: ${current.feelsLike}°C)`,
        `ஈரப்பதம்: ${current.metrics.humidity}% • காற்றின் வேகம்: ${wind} கிமீ/மணி`,
        `மழை வாய்ப்பு: ${rainProb}% • காற்று தரம் (AQI ${aqi})`
      ]
    };
  }

  if (lang === 'te') {
    return {
      interest,
      badge: 'వాతావరణ సూచన',
      headline: `${city} లో నేటి వాతావరణం పనులకు అనుకూలంగా ఉంది`,
      advice: `నేడు ${city} లో గరిష్ట ఉష్ణోగ్రత ${current.highTemp}°C మరియు కనిష్ట ఉష్ణోగ్రత ${current.lowTemp}°C గా నమోదు కావచ్చు. ఉదయం మరియు సాయంత్రం వేళలు బయట పనులకు అనుకూలం.`,
      suitabilityScore: 93,
      suitabilityLabel: 'అత్యంత అనుకూలం',
      recommendedWindow: 'అనుకూల సమయం: ఉదయం 07:00 – 11:00 మరియు సాయంత్రం 05:00 తర్వాత',
      bulletPoints: [
        `ప్రస్తుత ఉష్ణోగ్రత: ${temp}°C (అనిపించేది: ${current.feelsLike}°C)`,
        `తేమ: ${current.metrics.humidity}% • గాలి వేగం: ${wind} కిమీ/గం`,
        `వర్ష సూచన: ${rainProb}% • గాలి నాణ్యత (AQI ${aqi})`
      ]
    };
  }

  if (lang === 'kn') {
    return {
      interest,
      badge: 'ಹವಾಮಾನ ಸಲಹೆ',
      headline: `${city} ನಲ್ಲಿ ಇಂದಿನ ಹವಾಮಾನ ದಿನನಿತ್ಯದ ಕೆಲಸಗಳಿಗೆ ಹಿತಕರವಾಗಿದೆ`,
      advice: `ಇಂದು ${city} ನಲ್ಲಿ ಗರಿಷ್ಠ ತಾಪಮಾನ ${current.highTemp}°C ಮತ್ತು ಕನಿಷ್ಠ ತಾಪಮಾನ ${current.lowTemp}°C ಇರಲಿದೆ. ಬೆಳಗಿನ ಜಾವ ಮತ್ತು ಸಂಜೆ ವೇಳೆ ಕೆಲಸಗಳಿಗೆ ಅತ್ಯುತ್ತಮ.`,
      suitabilityScore: 94,
      suitabilityLabel: 'ಅತ್ಯುತ್ತಮ',
      recommendedWindow: 'ಸೂಕ್ತ ಸಮಯ: ಬೆಳಿಗ್ಗೆ 07:00 – 11:00 ಮತ್ತು ಸಂಜೆ 05:00 ನಂತರ',
      bulletPoints: [
        `ಪ್ರಸ್ತುತ ತಾಪಮಾನ: ${temp}°C (ಅನುಭವವಾಗುವುದು: ${current.feelsLike}°C)`,
        `ಆರ್ದ್ರತೆ: ${current.metrics.humidity}% • ಗಾಳಿಯ ವೇಗ: ${wind} ಕಿಮೀ/ಗಂಟೆ`,
        `ಮಳೆಯ ಸಾಧ್ಯತೆ: ${rainProb}% • ವಾಯು ಗುಣಮಟ್ಟ (AQI ${aqi})`
      ]
    };
  }

  if (lang === 'ml') {
    return {
      interest,
      badge: 'കാലാവസ്ഥാ നിർദ്ദേശം',
      headline: `${city}-ൽ ഇന്നത്തെ കാലാവസ്ഥ സുഖകരവും അനുയോജ്യവുമാണ്`,
      advice: `ഇന്ന് ${city}-ൽ കൂടിയ താപനില ${current.highTemp}°C-ഉം കുറഞ്ഞ താപനില ${current.lowTemp}°C-ഉം ആയിരിക്കും. രാവിലത്തെയും വൈകുന്നേരത്തെയും സമയം പുറത്തെ ജോലികൾക്ക് ഉത്തമം.`,
      suitabilityScore: 94,
      suitabilityLabel: 'ഏറ്റവും അനുയോജ്യം',
      recommendedWindow: 'അനുയോജ്യമായ സമയം: രാവിലെ 07:00 – 11:00, വൈകുന്നേരം 05:00 ന് ശേഷം',
      bulletPoints: [
        `നിലവിലെ താപനില: ${temp}°C (അനുഭവപ്പെടുന്നത്: ${current.feelsLike}°C)`,
        `ഈർപ്പം: ${current.metrics.humidity}% • കാറ്റിന്റെ വേഗത: ${wind} കിമീ/മണിക്കൂർ`,
        `മഴ സാധ്യത: ${rainProb}% • വായു ഗുണനിലവാരം (AQI ${aqi})`
      ]
    };
  }

  if (lang === 'pa') {
    return {
      interest,
      badge: 'ਮੌਸਮ ਸਲਾਹ',
      headline: `${city} ਵਿੱਚ ਅੱਜ ਦਾ ਮੌਸਮ ਬਾਹਰੀ ਕੰਮਾਂ ਲਈ ਬਹੁਤ ਵਧੀਆ ਹੈ`,
      advice: `ਅੱਜ ${city} ਵਿੱਚ ਵੱਧ ਤੋਂ ਵੱਧ ਤਾਪਮਾਨ ${current.highTemp}°C ਅਤੇ ਘੱਟ ਤੋਂ ਘੱਟ ${current.lowTemp}°C ਰਹੇਗਾ। ਸਵੇਰ ਅਤੇ ਸ਼ਾਮ ਦਾ ਸਮਾਂ ਸਫ਼ਰ ਅਤੇ ਕੰਮਾਂ ਲਈ ਸਭ ਤੋਂ ਢੁਕਵਾਂ ਹੈ।`,
      suitabilityScore: 94,
      suitabilityLabel: 'ਬਹੁਤ ਵਧੀਆ',
      recommendedWindow: 'ਢੁਕਵਾਂ ਸਮਾਂ: ਸਵੇਰੇ 07:00 – 11:00 ਅਤੇ ਸ਼ਾਮ 05:00 ਤੋਂ ਬਾਅਦ',
      bulletPoints: [
        `ਮੌਜੂਦਾ ਤਾਪਮਾਨ: ${temp}°C (ਮਹਿਸੂਸ ਹੁੰਦਾ: ${current.feelsLike}°C)`,
        `ਨਮੀ: ${current.metrics.humidity}% • ਹਵਾ ਦੀ ਗਤੀ: ${wind} ਕਿਮੀ/ਘੰਟਾ`,
        `ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ: ${rainProb}% • ਹਵਾ ਗੁਣਵੱਤਾ (AQI ${aqi})`
      ]
    };
  }

  // Default English
  switch (interest) {
    case 'Daily Commute':
      if (rainProb > 30 || condition === 'rain' || condition === 'heavy-rain') {
        return {
          interest,
          badge: 'Commute Advisory',
          headline: 'Rain May Affect Your Evening Commute',
          advice: `Rain showers are expected around evening commute hours in ${city}. Road traffic on main corridors will be slower with wet pavement.`,
          suitabilityScore: 72,
          suitabilityLabel: 'Caution Required',
          recommendedWindow: 'Optimal travel: Leave before 05:30 PM or after 07:30 PM',
          bulletPoints: [
            'Carry a raincoat or umbrella for transit transitions',
            'Allow 15–20 minutes extra buffer for city traffic and underpasses',
            `Visibility is ${current.metrics.visibility} km — keep vehicle headlights on low-beam`
          ]
        };
      }
      return {
        interest,
        badge: 'Smooth Commute',
        headline: 'Clear Roads & Comfortable Travel Conditions',
        advice: `Expect smooth transit conditions across ${city}, ${state}. Moderate temperature (${temp}°C) and clear visibility (${current.metrics.visibility} km) create an effortless commute.`,
        suitabilityScore: 95,
        suitabilityLabel: 'Ideal',
        recommendedWindow: 'Smooth traveling throughout the day',
        bulletPoints: [
          'Excellent road visibility and dry road surfaces',
          'Comfortable conditions for two-wheeler, bus, and metro commutes',
          'No significant weather-related delays anticipated on major routes'
        ]
      };

    case 'Outdoor Activities':
    case 'Fitness':
    case 'Fitness & Outdoor Activities':
      if (temp > 32 || uv > 6) {
        return {
          interest,
          badge: 'Fitness & Outdoor Advisory',
          headline: 'Early Morning Conditions are Ideal for Outdoor Activity',
          advice: `Afternoon temperatures will touch ${current.highTemp}°C with higher humidity. Schedule your walks, jogs, and outdoor sessions in the early morning for maximum comfort and fresh air.`,
          suitabilityScore: 88,
          suitabilityLabel: 'Good',
          recommendedWindow: 'Best time: 06:00 AM – 07:45 AM (Temp: 24°C, Fresh Breeze)',
          bulletPoints: [
            `Air Quality Index is ${aqi} (${current.metrics.airQualityStatus}) — great for deep breathing during dawn`,
            `UV Index peaks at ${uv} by midday — wear light sunscreen if exercising after 8:30 AM`,
            'Carry a water bottle; stay well hydrated with coconut water or electrolytes'
          ]
        };
      }
      return {
        interest,
        badge: 'Optimal Outdoor Window',
        headline: 'Conditions Look Suitable for an Evening Walk & Recreation',
        advice: `Atmospheric conditions in ${city} are pleasant for outdoor recreation and fitness. Temperature of ${temp}°C and a gentle ${wind} km/h breeze create a refreshing environment for parks and tracks.`,
        suitabilityScore: 96,
        suitabilityLabel: 'Ideal',
        recommendedWindow: 'Evening Window: 05:45 PM – 07:30 PM',
        bulletPoints: [
          'Pleasant ambient temperature with no heavy rain disruption',
          'Safe and comfortable for running, cycling, and recreation in public spaces',
          `Satisfactory air quality (${aqi} AQI)`
        ]
      };

    case 'Travel':
      return {
        interest,
        badge: 'Destination Outlook',
        headline: `Favorable Weather for Travel in ${city}, ${state}`,
        advice: `High visibility (${current.metrics.visibility} km) and mild breezes (${wind} km/h). Ideal for local sightseeing, heritage monuments, markets, and regional travel.`,
        suitabilityScore: 92,
        suitabilityLabel: 'Ideal',
        recommendedWindow: 'Golden Hour photography: ' + current.sunTimes.goldenHour,
        bulletPoints: [
          'Sunrise at ' + current.sunTimes.sunrise + ' | Sunset at ' + current.sunTimes.sunset,
          `High of ${current.highTemp}°C, low of ${current.lowTemp}°C — pack light breathable cottons`,
          'Zero travel advisories or highway disruptions reported by local authorities'
        ]
      };

    case 'Farming & Gardening':
      return {
        interest,
        badge: 'Agri & Soil Advisory',
        headline: 'Balanced Soil Moisture & Favorable Weather for Crops',
        advice: `Current humidity is ${current.metrics.humidity}% with ${rainProb}% rain probability in ${city} region. Good conditions for standing crops, horticulture, and garden watering.`,
        suitabilityScore: 88,
        suitabilityLabel: 'Good',
        recommendedWindow: 'Best irrigation & watering time: 06:30 AM – 08:00 AM',
        bulletPoints: [
          `Rainfall forecast: ${current.metrics.precipitationAmount} mm expected (${rainProb}% likelihood)`,
          `Wind speed at ${wind} km/h — safe for nutrient spraying and pruning`,
          'Soil moisture levels are stable with moderate evaporation rate'
        ]
      };

    case 'Events':
    case 'Events & Functions':
      if (rainProb > 30) {
        return {
          interest,
          badge: 'Function Advisory',
          headline: 'Outdoor Conditions May Change During the Evening',
          advice: `Passing showers are possible around evening hours in ${city}. If organizing lawn receptions, weddings, or terrace gatherings, keep waterproof canopy backups ready.`,
          suitabilityScore: 75,
          suitabilityLabel: 'Fair',
          recommendedWindow: 'Check hourly forecast before evening setup',
          bulletPoints: [
            `${rainProb}% chance of light rain during 06:00 PM – 08:00 PM`,
            `Wind speed is ${wind} km/h — ensure tent poles and shamianas are firmly anchored`,
            'Pleasant twilight ambience during sunset at ' + current.sunTimes.sunset
          ]
        };
      }
      return {
        interest,
        badge: 'Event Planning Clear',
        headline: 'Perfect Weather for Outdoor Events & Gatherings',
        advice: `Minimal rain probability and comfortable ambient temperature (${temp}°C) make ${city} excellent for open-air functions, family dinners, and cultural events.`,
        suitabilityScore: 94,
        suitabilityLabel: 'Ideal',
        recommendedWindow: 'Prime event timing: 06:00 PM – 10:30 PM',
        bulletPoints: [
          'Dry, clear weather forecast throughout the evening',
          'Comfortable breeze for guest dining and stage performances',
          'No sudden weather interruptions expected'
        ]
      };

    case 'Family Safety':
      return {
        interest,
        badge: 'Family Safety Status',
        headline: 'Safe & Comfortable Atmospheric Conditions for Family',
        advice: `Air quality is ${current.metrics.airQualityStatus} (AQI ${aqi}) with balanced temperature in ${city}. Safe for young children playing outdoors and elderly family members.`,
        suitabilityScore: 96,
        suitabilityLabel: 'Ideal',
        recommendedWindow: 'Family outing time: 04:30 PM – 07:00 PM',
        bulletPoints: [
          `Clean air quality (${aqi} AQI) — comfortable for asthma-sensitive members`,
          `UV Index ${uv} requires basic caps or light scarves during midday`,
          'No severe weather warnings active from IMD in your district'
        ]
      };

    case 'Daily Planning':
    case 'General Weather':
    default:
      return {
        interest,
        badge: 'Today\'s Weather',
        headline: 'High Temperatures Expected This Afternoon',
        advice: `Today in ${city}, expect a high of ${current.highTemp}°C and a low of ${current.lowTemp}°C. Consider planning major outdoor errands earlier or later in the day.`,
        suitabilityScore: 92,
        suitabilityLabel: 'Good',
        recommendedWindow: 'Most comfortable: 07:00 AM – 11:00 AM & 05:00 PM onwards',
        bulletPoints: [
          `Current temperature: ${temp}°C (Feels like ${current.feelsLike}°C)`,
          `Humidity: ${current.metrics.humidity}% • Wind: ${wind} km/h ${current.metrics.windDirection}`,
          `Rain probability: ${rainProb}% • Pressure: ${current.metrics.pressure} hPa (Stable)`
        ]
      };
  }
}
