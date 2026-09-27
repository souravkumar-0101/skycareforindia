import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileNavigation } from './components/common/MobileNavigation';
import { ToastContainer } from './components/common/Modal';

import { SplashScreen } from './components/common/SplashScreen';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { LocationPage } from './pages/LocationPage';
import { HomeDashboard } from './pages/HomeDashboard';
import { WeatherPage } from './pages/WeatherPage';
import { LocationsPage } from './pages/LocationsPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentPage, toasts, removeToast } = useApp();
  const [showSplash, setShowSplash] = React.useState<boolean>(() => {
    // Show splash once per page reload / fresh visit
    return true;
  });

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'location-picker':
        return <LocationPage />;
      case 'home':
        return <HomeDashboard />;
      case 'weather':
        return <WeatherPage />;
      case 'locations':
        return <LocationsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-skycare-navy text-skycare-cloud relative overflow-x-hidden selection:bg-skycare-sun selection:text-skycare-navy">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Body (with padding bottom for mobile navigation bar) */}
      <main className="flex-1 pb-24 md:pb-12">
        {renderPage()}
      </main>

      {/* Bottom Navigation for Mobile Devices */}
      <MobileNavigation />

      {/* Reactive Global Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
