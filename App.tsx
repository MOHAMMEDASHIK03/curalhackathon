
import React, { useState, useCallback } from 'react';
import type { UserProfile, UserType } from './types';
import LandingPage from './components/landing/LandingPage';
import PatientOnboarding from './components/onboarding/PatientOnboarding';
import ResearcherOnboarding from './components/onboarding/ResearcherOnboarding';
import PatientDashboard from './components/dashboard/patient/PatientDashboard';
import ResearcherDashboard from './components/dashboard/researcher/ResearcherDashboard';

type View = 'landing' | 'onboarding' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleSelectUserType = useCallback((type: UserType) => {
    setUserType(type);
    setView('onboarding');
  }, []);

  const handleOnboardingComplete = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    setView('dashboard');
  }, []);

  const handleGoBackToLanding = useCallback(() => {
    setView('landing');
    setUserType(null);
    setUserProfile(null);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onSelectUserType={handleSelectUserType} />;
      case 'onboarding':
        if (userType === 'patient') {
          return <PatientOnboarding onComplete={handleOnboardingComplete} onBack={handleGoBackToLanding} />;
        }
        if (userType === 'researcher') {
          return <ResearcherOnboarding onComplete={handleOnboardingComplete} onBack={handleGoBackToLanding} />;
        }
        return null; // Should not happen
      case 'dashboard':
        if (userProfile?.type === 'patient') {
          return <PatientDashboard userProfile={userProfile} onLogout={handleGoBackToLanding} />;
        }
        if (userProfile?.type === 'researcher') {
          return <ResearcherDashboard userProfile={userProfile} onLogout={handleGoBackToLanding} />;
        }
        return null; // Should not happen
      default:
        return <LandingPage onSelectUserType={handleSelectUserType} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {renderContent()}
    </div>
  );
};

export default App;