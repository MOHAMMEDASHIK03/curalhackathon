
import React from 'react';
import type { UserType } from '../../types';

interface LandingPageProps {
  onSelectUserType: (type: UserType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectUserType }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-brand-blue-dark tracking-tight">CuraLink</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
          Connecting patients and researchers to discover relevant clinical trials, publications, and health experts.
        </p>
      </header>
      
      <main className="w-full max-w-4xl">
        <p className="text-xl font-semibold text-gray-700 mb-8">How would you like to get started?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div 
            onClick={() => onSelectUserType('patient')}
            className="group p-8 border-2 border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-2xl hover:border-brand-blue transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-6xl mb-4">👩‍⚕️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">I am a Patient or Caregiver</h2>
            <p className="text-gray-500">Find personalized clinical trials, health experts, and the latest research.</p>
          </div>

          <div 
            onClick={() => onSelectUserType('researcher')}
            className="group p-8 border-2 border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-2xl hover:border-brand-green transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="text-6xl mb-4">🧑‍🔬</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">I am a Researcher</h2>
            <p className="text-gray-500">Discover collaborators, manage trials, and engage with the community.</p>
          </div>
        </div>
      </main>
      
      <footer className="mt-20 text-gray-500">
        <p>&copy; 2025 CuraLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;