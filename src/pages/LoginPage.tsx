import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SkyCareLogo } from '../components/common/SkyCareLogo';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Mail, Lock, LogIn, ShieldCheck, Check } from 'lucide-react';

import { TRANSLATIONS } from '../data/translations';
import { INDIAN_LANGUAGES } from '../data/mockData';
import { IndianLanguage } from '../types/weather';

export const LoginPage: React.FC = () => {
  const { loginUser, navigateTo, showToast, settings, setLanguage } = useApp();
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
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
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginUser(email);
    }, 600);
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrors({});
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      showToast('Invalid Email', 'Please enter a valid email address', 'warning');
      return;
    }
    setForgotSent(true);
    showToast('Reset Link Sent', `Password reset instructions sent to ${forgotEmail}`, 'success');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-md space-y-5">
        {/* Single Centered Logo & Title */}
        <div className="flex flex-col items-center text-center">
          <SkyCareLogo size="lg" onClick={() => navigateTo('landing')} className="cursor-pointer mb-3" />
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            {t.welcomeBack}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-skycare-cloud/70">
            {t.signInSubtitle}
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
              className="py-2 rounded-xl text-xs font-bold bg-skycare-skyBlue text-white shadow-sm transition-all"
            >
              {t.signInBtn}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('signup')}
              className="py-2 rounded-xl text-xs font-semibold text-skycare-cloud/70 hover:text-white transition-all"
            >
              {t.createAccountBtn}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="current-password"
            />

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotSent(false);
                  setShowForgotModal(true);
                }}
                className="text-xs text-skycare-cloud/70 hover:text-skycare-sun transition-colors font-medium"
              >
                {t.forgotPassword}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<LogIn className="w-4 h-4 text-skycare-navy" />}
            >
              {t.signInBtn}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-skycare-softBlue/20">
            <p className="text-[11px] font-semibold text-skycare-cloud/60 text-center mb-2.5 uppercase tracking-wider">
              {t.quickDemoLogins}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('rahul.sharma@skycare.in', 'vadodara2026')}
                className="flex flex-col items-start p-2.5 rounded-xl bg-skycare-skyBlue/20 hover:bg-skycare-skyBlue/40 border border-skycare-softBlue/30 text-left transition-all group"
              >
                <span className="text-[11px] font-bold text-white group-hover:text-skycare-sun flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-skycare-sun" /> Rahul Sharma
                </span>
                <span className="text-[10px] text-skycare-cloud/60">Vadodara, Gujarat</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('priya.patel@skycare.in', 'ahmedabad2026')}
                className="flex flex-col items-start p-2.5 rounded-xl bg-skycare-skyBlue/20 hover:bg-skycare-skyBlue/40 border border-skycare-softBlue/30 text-left transition-all group"
              >
                <span className="text-[11px] font-bold text-white group-hover:text-skycare-sun flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-skycare-sun" /> Priya Patel
                </span>
                <span className="text-[10px] text-skycare-cloud/60">Ahmedabad, Gujarat</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('vikram.malhotra@skycare.in', 'mumbai2026')}
                className="flex flex-col items-start p-2.5 rounded-xl bg-skycare-skyBlue/20 hover:bg-skycare-skyBlue/40 border border-skycare-softBlue/30 text-left transition-all group"
              >
                <span className="text-[11px] font-bold text-white group-hover:text-skycare-sun flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-skycare-sun" /> Vikram Malhotra
                </span>
                <span className="text-[10px] text-skycare-cloud/60">Mumbai, Maharashtra</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('ananya.sen@skycare.in', 'kolkata2026')}
                className="flex flex-col items-start p-2.5 rounded-xl bg-skycare-skyBlue/20 hover:bg-skycare-skyBlue/40 border border-skycare-softBlue/30 text-left transition-all group"
              >
                <span className="text-[11px] font-bold text-white group-hover:text-skycare-sun flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-skycare-sun" /> Ananya Sen
                </span>
                <span className="text-[10px] text-skycare-cloud/60">Kolkata, WB</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-skycare-cloud/70">
          <span>{t.dontHaveAccount} </span>
          <button
            onClick={() => navigateTo('signup')}
            className="text-skycare-sun font-bold hover:underline transition-colors ml-1"
          >
            {t.createAccountBtn}
          </button>
        </div>
      </div>

      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Reset Password"
        subtitle="Enter your email to receive recovery instructions."
        maxWidth="sm"
      >
        {forgotSent ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-skycare-accentEmerald/20 text-skycare-accentEmerald mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm text-skycare-cloud/80">
              We've dispatched a password reset link to <strong className="text-white">{forgotEmail}</strong>.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowForgotModal(false)}
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={forgotEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForgotEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setShowForgotModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-1"
              >
                Send Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
