import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SkyCareLogo } from '../components/common/SkyCareLogo';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { User, Mail, Lock, Sparkles } from 'lucide-react';

import { TRANSLATIONS } from '../data/translations';
import { INDIAN_LANGUAGES } from '../data/mockData';
import { IndianLanguage } from '../types/weather';

export const SignupPage: React.FC = () => {
  const { signupUser, navigateTo, settings, setLanguage } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full name is required';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms and Privacy Policy';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      signupUser(fullName, email);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-md space-y-5">
        {/* Single Centered Logo & Title */}
        <div className="flex flex-col items-center text-center">
          <SkyCareLogo size="lg" onClick={() => navigateTo('landing')} className="cursor-pointer mb-3" />
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            {t.createAccountTitle}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-skycare-cloud/70">
            {t.createAccountSubtitle}
          </p>
        </div>

        {/* Quick Language Selector Bar */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {INDIAN_LANGUAGES.slice(0, 5).map((lang) => {
            const isSelected = settings.language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code as IndianLanguage)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  isSelected
                    ? 'bg-skycare-sun text-skycare-navy shadow-sm scale-105'
                    : 'bg-skycare-darkBlue/70 text-skycare-cloud/70 hover:text-white hover:bg-skycare-skyBlue/40 border border-skycare-softBlue/20'
                }`}
              >
                {lang.native}
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-skycare-darkBlue/95 via-skycare-navy/95 to-skycare-navy border border-skycare-softBlue/30 shadow-2xl backdrop-blur-xl text-left">
          {/* Sign In / Sign Up Card Switcher */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-skycare-navy/80 border border-skycare-softBlue/25 mb-6">
            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="py-2 rounded-xl text-xs font-semibold text-skycare-cloud/70 hover:text-white transition-all"
            >
              {t.signInBtn}
            </button>
            <button
              type="button"
              className="py-2 rounded-xl text-xs font-bold bg-skycare-skyBlue text-white shadow-sm transition-all"
            >
              {t.createAccountBtn}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t.fullNameLabel}
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
              }}
              error={errors.fullName}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label={t.emailLabel}
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              autoComplete="email"
            />

            <Input
              label={t.passwordLabel}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="new-password"
            />

            <Input
              label={t.confirmPasswordLabel}
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              error={errors.confirmPassword}
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="new-password"
            />

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-xs text-skycare-cloud/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.agreeTerms) setErrors(prev => ({ ...prev, agreeTerms: undefined }));
                  }}
                  className="mt-0.5 rounded border-skycare-softBlue/40 bg-skycare-navy text-skycare-sun focus:ring-skycare-sun focus:ring-offset-skycare-navy"
                />
                <span>
                  I agree to the <span className="text-skycare-sun hover:underline">SkyCare Terms of Service</span> and <span className="text-skycare-sun hover:underline">Privacy Policy</span>.
                </span>
              </label>
              {errors.agreeTerms && (
                <span className="text-xs text-skycare-accentRose font-medium mt-1 block">
                  {errors.agreeTerms}
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<Sparkles className="w-4 h-4 text-skycare-navy" />}
            >
              {t.createAccountBtn}
            </Button>
          </form>
        </div>

        <div className="text-center text-xs text-skycare-cloud/70">
          <span>{t.alreadyHaveAccount} </span>
          <button
            onClick={() => navigateTo('login')}
            className="text-skycare-sun font-bold hover:underline transition-colors ml-1"
          >
            {t.signInBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
