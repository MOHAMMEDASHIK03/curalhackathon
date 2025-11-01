import React, { useState, useCallback } from 'react';
import type { PatientProfile } from '../../types';
import { geminiService } from '../../services/geminiService';
import { UserIcon, MapPinIcon } from '../common/Icons';

interface PatientOnboardingProps {
  onComplete: (profile: PatientProfile) => void;
  onBack: () => void;
}

const PatientOnboarding: React.FC<PatientOnboardingProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [naturalInput, setNaturalInput] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNaturalInputChange = async () => {
    if (!naturalInput.trim()) return;
    setIsLoading(true);
    try {
      const parsedConditions = await geminiService.parseNaturalLanguageCondition(naturalInput);
      setConditions(parsedConditions);
      setStep(2);
    } catch (error) {
      console.error("Failed to parse condition:", error);
      setConditions([naturalInput]);
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleComplete = () => {
    if (name.trim() && location.trim() && conditions.length > 0) {
      onComplete({
        type: 'patient',
        name,
        conditions,
        location,
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Describe your condition</h2>
            <p className="text-gray-600 mb-6">Tell us in your own words. For example, "I have Brain Cancer."</p>
            <textarea
              value={naturalInput}
              onChange={(e) => setNaturalInput(e.target.value)}
              className="w-full p-4 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
              rows={4}
              placeholder="Start typing here..."
            />
            <button
              onClick={handleNaturalInputChange}
              disabled={isLoading || !naturalInput.trim()}
              className="mt-6 w-full bg-brand-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-blue-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isLoading ? 'Analyzing...' : 'Continue'}
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm your profile details</h2>
            <p className="text-gray-600 mb-6">We've populated some details based on your input. Please review and complete your profile.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <UserIcon />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 p-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="e.g., Jane Doe"
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
                 <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MapPinIcon />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 p-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      placeholder="City, Country"
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conditions of Interest</label>
                <div className="flex flex-wrap gap-2 p-3 border-2 border-gray-200 rounded-lg bg-gray-50 min-h-[48px]">
                  {conditions.map((condition, index) => (
                    <span key={index} className="px-3 py-1 bg-brand-blue-light text-brand-blue-dark rounded-full text-sm font-semibold">
                      {condition}
                    </span>
                  ))}
                </div>
                 <p className="text-xs text-gray-500 mt-1">AI has identified these topics. You can add more later.</p>
              </div>
            </div>
            <button
              onClick={handleComplete}
              disabled={!name.trim() || !location.trim()}
              className="mt-8 w-full bg-brand-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-blue-dark transition-all duration-300 disabled:bg-gray-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Create My Profile
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark text-center mb-2">Patient Profile Setup</h1>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div className="bg-brand-blue h-2 rounded-full transition-all duration-500" style={{ width: `${step * 50}%` }}></div>
        </div>
        {renderStep()}
        <div className="text-center mt-6">
            <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                &larr; Back to role selection
            </button>
        </div>
      </div>
    </div>
  );
};

export default PatientOnboarding;