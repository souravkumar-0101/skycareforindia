import React from 'react';
import { useApp } from '../../context/AppContext';
import { getPersonaInsight } from '../../data/mockData';
import { Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS, getLocalizedSuitability, getLocalizedPurpose } from '../../data/translations';

interface InsightCardProps {
  onCustomizeClick?: () => void;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  onCustomizeClick,
  className = '',
}) => {
  const { user, activeWeather, navigateTo, settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const insight = getPersonaInsight(user.primaryInterest, activeWeather, settings.language);
  const displaySuitability = getLocalizedSuitability(insight.suitabilityLabel, settings.language);
  const localizedPurpose = getLocalizedPurpose(user.primaryInterest, settings.language);

  const getScoreColor = (label: string) => {
    switch (label) {
      case 'Ideal':
      case 'सर्वश्रेष्ठ':
      case 'શ્રેષ્ઠ':
      case 'सर्वोत्तम':
      case 'আদর্শ':
      case 'மிகச் சிறந்தது':
      case 'అత్యంత అనుకూలం':
      case 'ಅತ್ಯುತ್ತಮ':
      case 'ഏറ്റവും അനുയോജ്യം':
      case 'ਬਹੁਤ ਵਧੀਆ':
        return 'bg-skycare-accentEmerald/20 text-skycare-accentEmerald border-skycare-accentEmerald/30';
      case 'Good':
      case 'उत्तम':
      case 'ভালো':
      case 'நல்லது':
      case 'మంచిది':
      case 'നല്ലത്':
      case 'ਵਧੀਆ':
        return 'bg-skycare-sun/20 text-skycare-sun border-skycare-sun/30';
      case 'Fair':
      case 'सामान्य':
      case 'સામાન્ય':
      case 'मध्यम':
      case 'মাঝারি':
      case 'மிதமான':
      case 'సాధారణం':
      case 'ಮಿಶ್ರ':
      case 'സമ്മിശ്രം':
        return 'bg-skycare-accentAmber/20 text-skycare-accentAmber border-skycare-accentAmber/30';
      default:
        return 'bg-skycare-accentRose/20 text-skycare-accentRose border-skycare-accentRose/30';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-skycare-skyBlue/50 via-skycare-darkBlue/80 to-skycare-navy/90 border border-skycare-sun/30 p-5 sm:p-7 shadow-weather-card text-left transition-all duration-300 ${className}`}
    >
      {/* Sun Accent Backdrop Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-skycare-sun/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Persona Tag & Suitability */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-skycare-sun text-skycare-navy font-bold shadow-md shadow-skycare-sun/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-skycare-sun">
              {t.skycareInsight}
            </span>
            <div className="text-xs font-semibold text-skycare-cloud/80">
              {t.personalizedFor} <span className="text-white font-bold">{localizedPurpose}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(insight.suitabilityLabel)}`}>
            {displaySuitability} ({insight.suitabilityScore}%)
          </span>
          <button
            onClick={onCustomizeClick || (() => navigateTo('onboarding'))}
            title="Change primary interest"
            className="text-xs text-skycare-cloud/70 hover:text-skycare-sun underline underline-offset-4 transition-colors font-medium"
          >
            {t.changePurpose}
          </button>
        </div>
      </div>

      {/* Main Insight Headline & Description */}
      <div className="relative z-10 mb-5">
        <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight leading-snug">
          {insight.headline}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-skycare-cloud/80 leading-relaxed">
          {insight.advice}
        </p>
      </div>

      {/* Recommended Time Window Banner */}
      <div className="relative z-10 flex items-center gap-2.5 p-3 rounded-xl bg-skycare-navy/60 border border-skycare-softBlue/30 text-xs sm:text-sm text-skycare-cloud mb-4">
        <Clock className="w-4 h-4 text-skycare-sun shrink-0" />
        <span className="font-semibold text-white">{insight.recommendedWindow}</span>
      </div>

      {/* Actionable Check-Points */}
      <div className="relative z-10 space-y-2">
        {insight.bulletPoints.map((point, index) => (
          <div key={index} className="flex items-start gap-2.5 text-xs text-skycare-cloud/90">
            <CheckCircle2 className="w-4 h-4 text-skycare-accentCyan shrink-0 mt-0.5" />
            <span>{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
