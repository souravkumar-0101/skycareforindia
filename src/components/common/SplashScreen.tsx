import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CloudSun, Sparkles, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { settings } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing SkyCare...');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(35);
      setStatusText(t.locationPrefTitle || 'Connecting to Indian meteorological stations...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStatusText(t.calibratedRecommendations || 'Calibrating personalized weather intelligence...');
    }, 900);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText(`${t.welcomeBack} ${t.brandName}!`);
    }, 1400);

    const timer4 = setTimeout(() => {
      handleFinish();
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [t]);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-skycare-navy via-skycare-darkBlue to-skycare-navy text-white transition-opacity duration-300 select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top subtle decorative ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-skycare-skyBlue/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-skycare-sun/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Brand Tag */}
      <div className="pt-8 relative z-10 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-skycare-darkBlue/80 border border-skycare-softBlue/30 shadow-lg text-[11px] font-bold tracking-widest uppercase text-skycare-sun">
        <Sparkles className="w-3.5 h-3.5 text-skycare-sun" />
        <span>SkyCare India • {t.languageName}</span>
      </div>

      {/* Center Welcome Animation */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm px-4 space-y-6 animate-fade-in">
        <div className="relative">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-3xl bg-skycare-sun/20 blur-xl animate-ping" style={{ animationDuration: '3s' }} />
          
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-skycare-darkBlue to-skycare-skyBlue border-2 border-skycare-sun/50 shadow-2xl flex items-center justify-center relative overflow-hidden">
            <CloudSun className="w-12 h-12 sm:w-14 sm:h-14 text-skycare-sun animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-skycare-sun/10 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
            {t.brandPrefix}<span className="text-skycare-sun">{t.brandSuffix}</span>
          </h1>
          <p className="text-sm sm:text-base text-skycare-cloud/80 font-medium">
            “{t.brandSlogan}”
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-full space-y-2.5 pt-4">
          <div className="h-2 w-full bg-skycare-darkBlue/80 rounded-full overflow-hidden border border-skycare-softBlue/30 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-skycare-softBlue via-skycare-sun to-skycare-sun rounded-full transition-all duration-500 ease-out shadow-sm shadow-skycare-sun/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-skycare-cloud/70 font-medium animate-pulse">
            {statusText}
          </p>
        </div>
      </div>

      {/* Bottom Skip / Enter Button */}
      <div className="pb-6 relative z-10 w-full max-w-xs flex justify-center">
        <button
          onClick={handleFinish}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-skycare-darkBlue/90 hover:bg-skycare-skyBlue/80 text-xs font-bold text-skycare-cloud hover:text-white border border-skycare-softBlue/40 shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <span>{t.signInBtn}</span>
          <ArrowRight className="w-3.5 h-3.5 text-skycare-sun" />
        </button>
      </div>
    </div>
  );
};
