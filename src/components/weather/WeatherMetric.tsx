import React, { ReactNode } from 'react';
import { 
  Droplets, 
  Wind, 
  Sun, 
  Eye, 
  CloudRain, 
  Gauge, 
  Thermometer, 
  Activity 
} from 'lucide-react';
import { WeatherMetrics } from '../../types/weather';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../data/translations';

interface WeatherMetricsGridProps {
  metrics: WeatherMetrics;
  className?: string;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({
  metrics,
  className = '',
}) => {
  const { formatSpeed, formatTemp, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const metricCards = [
    {
      id: 'humidity',
      label: t.humidity,
      value: `${metrics.humidity}%`,
      subtext: metrics.humidity > 70 ? 'High moisture' : metrics.humidity < 35 ? 'Dry air' : 'Comfortable',
      icon: <Droplets className="w-5 h-5 text-skycare-accentCyan" />,
      color: 'border-skycare-accentCyan/30',
    },
    {
      id: 'wind',
      label: t.windSpeed,
      value: formatSpeed(metrics.windSpeed),
      subtext: `${metrics.windDirection} • Moderate breeze`,
      icon: <Wind className="w-5 h-5 text-skycare-cloud" />,
      color: 'border-skycare-cloud/20',
    },
    {
      id: 'uv',
      label: t.uvIndex,
      value: `${metrics.uvIndex}`,
      subtext: `${metrics.uvLevel} level`,
      icon: <Sun className="w-5 h-5 text-skycare-sun" />,
      color: 'border-skycare-sun/30',
      highlight: metrics.uvIndex >= 6,
    },
    {
      id: 'visibility',
      label: t.visibility,
      value: `${metrics.visibility} km`,
      subtext: metrics.visibility >= 10 ? 'Clear horizon' : 'Reduced visibility',
      icon: <Eye className="w-5 h-5 text-skycare-softBlue" />,
      color: 'border-skycare-softBlue/30',
    },
    {
      id: 'precipitation',
      label: t.rainProbability,
      value: `${metrics.precipitation}%`,
      subtext: `${metrics.precipitationAmount} mm expected`,
      icon: <CloudRain className="w-5 h-5 text-skycare-accentCyan" />,
      color: 'border-skycare-accentCyan/30',
    },
    {
      id: 'pressure',
      label: t.pressure,
      value: `${metrics.pressure} hPa`,
      subtext: 'Stable barometric level',
      icon: <Gauge className="w-5 h-5 text-skycare-cloud/80" />,
      color: 'border-skycare-softBlue/20',
    },
    {
      id: 'dewPoint',
      label: t.dewPoint,
      value: formatTemp(metrics.dewPoint),
      subtext: 'Atmospheric condensation',
      icon: <Thermometer className="w-5 h-5 text-skycare-sun" />,
      color: 'border-skycare-sun/20',
    },
    {
      id: 'airQuality',
      label: t.airQuality,
      value: `AQI ${metrics.airQualityIndex}`,
      subtext: metrics.airQualityStatus,
      icon: <Activity className="w-5 h-5 text-skycare-accentEmerald" />,
      color: 'border-skycare-accentEmerald/30',
    },
  ];

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
      {metricCards.map((m) => (
        <div
          key={m.id}
          className={`relative p-4 sm:p-5 rounded-2xl bg-skycare-darkBlue/70 backdrop-blur-md border ${m.color} transition-all duration-200 hover:bg-skycare-darkBlue/90 hover:scale-[1.02] shadow-sm text-left`}
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-skycare-cloud/70">
              {m.label}
            </span>
            <div className="p-2 rounded-xl bg-skycare-navy/60">
              {m.icon}
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
            {m.value}
          </div>
          <p className="mt-1 text-xs text-skycare-cloud/70 truncate">
            {m.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};
