import React, { useState } from 'react';
import { VerifiedAlert, SafetyGuidance } from '../../types/weather';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  CloudRain, 
  Wind, 
  Sun, 
  Flame, 
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { TRANSLATIONS, getLocalizedSuitability } from '../../data/translations';

interface AlertCardProps {
  alert: VerifiedAlert;
  className?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  className = '',
}) => {
  const { settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const [isExpanded, setIsExpanded] = useState(true);

  const getSeverityStyle = (sev: VerifiedAlert['severity']) => {
    switch (sev) {
      case 'Urgent':
      case 'Warning':
        return 'bg-skycare-accentRose/20 text-skycare-accentRose border-skycare-accentRose/40';
      case 'Watch':
        return 'bg-skycare-accentAmber/20 text-skycare-accentAmber border-skycare-accentAmber/40';
      case 'Advisory':
      default:
        return 'bg-skycare-sun/20 text-skycare-sun border-skycare-sun/40';
    }
  };

  const displaySeverity = getLocalizedSuitability(alert.severity, settings.language);

  return (
    <div className={`rounded-3xl bg-gradient-to-br from-skycare-darkBlue/90 to-skycare-navy/95 border border-skycare-accentAmber/30 p-5 sm:p-7 shadow-weather-card text-left transition-all duration-300 ${className}`}>
      {/* Top row: Verified Source & Severity */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-skycare-accentAmber/20 text-skycare-accentAmber">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {alert.source}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-skycare-accentEmerald" />
            </div>
            <p className="text-[11px] text-skycare-cloud/60">
              {t.officialWarning}
            </p>
          </div>
        </div>

        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getSeverityStyle(alert.severity)}`}>
          {displaySeverity}
        </span>
      </div>

      {/* Main Alert Title */}
      <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight mb-2">
        {alert.title}
      </h3>

      {/* Location & Time info pills */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-skycare-cloud/80 mb-4">
        <div className="flex items-center gap-1.5 bg-skycare-navy/60 px-3 py-1 rounded-xl border border-skycare-softBlue/20">
          <MapPin className="w-3.5 h-3.5 text-skycare-sun" />
          <span>{alert.location}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-skycare-navy/60 px-3 py-1 rounded-xl border border-skycare-softBlue/20">
          <Clock className="w-3.5 h-3.5 text-skycare-softBlue" />
          <span>{t.issued}: {alert.issuedTime} • {t.until}: {alert.expiresTime}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-skycare-cloud/90 leading-relaxed mb-4">
        {alert.description}
      </p>

      {/* Instructions list */}
      <div className="border-t border-skycare-softBlue/20 pt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-skycare-sun hover:text-white transition-colors"
        >
          <span>{t.safetyInstructions} ({alert.instructions.length})</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-2 animate-fade-in">
            {alert.instructions.map((inst, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-skycare-cloud/90">
                <CheckCircle2 className="w-4 h-4 text-skycare-accentEmerald shrink-0 mt-0.5" />
                <span>{inst}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface SafetyGuidanceCardProps {
  guidance: SafetyGuidance;
  className?: string;
}

export const SafetyGuidanceCard: React.FC<SafetyGuidanceCardProps> = ({
  guidance,
  className = '',
}) => {
  const { settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CloudRain':
        return <CloudRain className="w-5 h-5 text-skycare-accentCyan" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-skycare-cloud" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-skycare-sun" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-skycare-accentRose" />;
      case 'EyeOff':
      default:
        return <EyeOff className="w-5 h-5 text-skycare-softBlue" />;
    }
  };

  return (
    <div className={`rounded-3xl bg-skycare-darkBlue/75 backdrop-blur-md border border-skycare-softBlue/25 p-5 sm:p-6 shadow-sm hover:border-skycare-softBlue/50 transition-all duration-200 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-2xl bg-skycare-navy/70 border border-skycare-softBlue/20">
          {getIcon(guidance.icon)}
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-skycare-sun block">
            {t.safetyGuidance}
          </span>
          <h4 className="text-base font-bold text-white font-display">
            {guidance.title}
          </h4>
        </div>
      </div>

      {/* Threshold tag */}
      <div className="text-[11px] text-skycare-cloud/70 font-medium mb-3 px-2.5 py-1 rounded-lg bg-skycare-navy/50 inline-block border border-skycare-softBlue/20">
        {t.trigger}: {guidance.threshold}
      </div>

      {/* Summary */}
      <p className="text-xs sm:text-sm text-skycare-cloud/80 leading-relaxed mb-4">
        {guidance.shortSummary}
      </p>

      {/* Proactive Recommendations */}
      <div className="space-y-2 border-t border-skycare-softBlue/20 pt-3">
        {guidance.recommendations.map((rec, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-skycare-cloud/90">
            <div className="w-1.5 h-1.5 rounded-full bg-skycare-sun shrink-0 mt-1.5" />
            <span>{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
