import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { PrimaryInterest } from '../types/weather';
import { 
  User,
  Mail, 
  MapPin, 
  Sparkles, 
  Thermometer, 
  Settings, 
  LogOut, 
  Edit3, 
  ShieldCheck 
} from 'lucide-react';
import { TRANSLATIONS, getLocalizedPurpose } from '../data/translations';

export const ProfilePage: React.FC = () => {
  const { 
    user, 
    updateProfile, 
    activeWeather, 
    settings, 
    toggleTempUnit, 
    navigateTo, 
    logoutUser 
  } = useApp();

  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState(user.fullName);
  const [emailInput, setEmailInput] = useState(user.email);
  const [interestInput, setInterestInput] = useState<PrimaryInterest>(user.primaryInterest);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: nameInput.trim() || user.fullName,
      email: emailInput.trim() || user.email,
      primaryInterest: interestInput,
    });
    setIsEditModalOpen(false);
  };

  const personaOptions: { id: PrimaryInterest; label: string }[] = [
    { id: 'Daily Commute', label: `🚗 ${t.purposeCommute}` },
    { id: 'Outdoor Activities', label: `🏕️ ${t.purposeOutdoor}` },
    { id: 'Fitness', label: `🏃 ${t.purposeFitness}` },
    { id: 'Travel', label: `✈️ ${t.purposeTravel}` },
    { id: 'Farming & Gardening', label: `🌱 ${t.purposeFarming}` },
    { id: 'Daily Planning', label: `🌦 ${t.purposePlanning}` },
    { id: 'Events', label: `🎉 ${t.purposeEvents}` },
    { id: 'Family Safety', label: `👨‍👩‍👧 ${t.purposeSafety}` },
  ];

  const localizedPrimaryInterest = getLocalizedPurpose(user.primaryInterest, settings.language);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in text-left">
      <div className="flex items-center justify-between pb-2 border-b border-skycare-softBlue/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            {t.profile}
          </h1>
          <p className="text-xs sm:text-sm text-skycare-cloud/70">
            {t.onboardingSubtitle}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-skycare-darkBlue/90 via-skycare-navy/95 to-skycare-navy border border-skycare-softBlue/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-skycare-sun/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-skycare-sun via-skycare-softBlue to-skycare-skyBlue flex items-center justify-center font-black text-skycare-navy text-3xl sm:text-4xl shadow-lg shadow-skycare-sun/20 border-2 border-white/20">
              {user.fullName.charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-skycare-navy border border-skycare-accentEmerald text-skycare-accentEmerald">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {user.fullName}
                </h2>
                <p className="text-xs sm:text-sm text-skycare-cloud/70 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-skycare-softBlue" />
                  <span>{user.email}</span>
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNameInput(user.fullName);
                  setEmailInput(user.email);
                  setInterestInput(user.primaryInterest);
                  setIsEditModalOpen(true);
                }}
                leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              >
                {t.editProfile}
              </Button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-skycare-skyBlue/50 text-skycare-sun font-bold border border-skycare-sun/30">
                ★ {localizedPrimaryInterest}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-skycare-navy/80 text-skycare-cloud/80 border border-skycare-softBlue/20">
                India User • {t.languageName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-skycare-darkBlue/70 border border-skycare-softBlue/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-skycare-cloud/60">
            <span className="font-semibold uppercase tracking-wider">{t.activeIndianCity}</span>
            <MapPin className="w-4 h-4 text-skycare-sun" />
          </div>
          <p className="text-lg font-bold text-white font-display">
            {activeWeather.location.city}
          </p>
          <p className="text-xs text-skycare-cloud/70">
            {activeWeather.location.state}, India
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-skycare-darkBlue/70 border border-skycare-softBlue/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-skycare-cloud/60">
            <span className="font-semibold uppercase tracking-wider">{t.primaryPurpose}</span>
            <Sparkles className="w-4 h-4 text-skycare-sun" />
          </div>
          <p className="text-lg font-bold text-white font-display truncate">
            {localizedPrimaryInterest}
          </p>
          <p className="text-xs text-skycare-cloud/70">
            {t.calibratedRecommendations}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-skycare-darkBlue/70 border border-skycare-softBlue/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-skycare-cloud/60">
            <span className="font-semibold uppercase tracking-wider">{t.standardUnit}</span>
            <Thermometer className="w-4 h-4 text-skycare-sun" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white font-display">
              Celsius (°{settings.tempUnit})
            </span>
            <button
              onClick={toggleTempUnit}
              className="text-xs font-bold text-skycare-sun hover:underline"
            >
              {t.switchTo} °{settings.tempUnit === 'C' ? 'F' : 'C'}
            </button>
          </div>
          <p className="text-xs text-skycare-cloud/70">
            Indian standard format: °C
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-bold text-white font-display">
          {t.accountActions}
        </h3>
        <div className="divide-y divide-skycare-softBlue/20 rounded-2xl bg-skycare-darkBlue/60 border border-skycare-softBlue/20 overflow-hidden">
          <button
            onClick={() => navigateTo('locations')}
            className="w-full flex items-center justify-between p-4 hover:bg-skycare-skyBlue/30 text-xs sm:text-sm font-semibold text-skycare-cloud hover:text-white transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-skycare-sun" />
              <span>{t.manageCitiesBtn}</span>
            </div>
            <span className="text-xs text-skycare-cloud/60">{t.configure}</span>
          </button>

          <button
            onClick={() => navigateTo('settings')}
            className="w-full flex items-center justify-between p-4 hover:bg-skycare-skyBlue/30 text-xs sm:text-sm font-semibold text-skycare-cloud hover:text-white transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-skycare-softBlue" />
              <span>{t.settings} & {t.languageRegionTitle}</span>
            </div>
            <span className="text-xs text-skycare-cloud/60">{t.preferences}</span>
          </button>

          <button
            onClick={logoutUser}
            className="w-full flex items-center justify-between p-4 hover:bg-skycare-accentRose/20 text-xs sm:text-sm font-semibold text-skycare-accentRose transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span>{t.signOutBtn}</span>
            </div>
            <span className="text-xs text-skycare-accentRose/80">{t.logout}</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={t.editProfile}
        subtitle={t.onboardingSubtitle}
        maxWidth="md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
          <Input
            label={t.fullNameLabel}
            value={nameInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />

          <Input
            label={t.emailLabel}
            type="email"
            value={emailInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-skycare-cloud/80 block">
              {t.onboardingTitle}
            </label>
            <select
              value={interestInput}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setInterestInput(e.target.value as PrimaryInterest)}
              className="w-full bg-skycare-navy border border-skycare-softBlue/30 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-skycare-sun"
            >
              {personaOptions.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-skycare-darkBlue text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1"
            >
              {t.cancelBtn}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1"
            >
              {t.saveChangesBtn}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
