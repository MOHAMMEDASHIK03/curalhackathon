import React, { useState } from 'react';
import type { ResearcherProfile } from '../../types';
import { UserIcon, AcademicCapIcon, LinkIcon } from '../common/Icons';

interface ResearcherOnboardingProps {
  onComplete: (profile: ResearcherProfile) => void;
  onBack: () => void;
}

const ResearcherOnboarding: React.FC<ResearcherOnboardingProps> = ({ onComplete, onBack }) => {
  const [name, setName] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [researchInterests, setResearchInterests] = useState('');
  const [orcid, setOrcid] = useState('');
  const [researchGate, setResearchGate] = useState('');
  const [availableForMeetings, setAvailableForMeetings] = useState(true);

  const handleComplete = () => {
    if (name.trim() && specialties.trim() && researchInterests.trim()) {
      onComplete({
        type: 'researcher',
        name,
        specialties: specialties.split(',').map(s => s.trim()),
        researchInterests: researchInterests.split(',').map(i => i.trim()),
        orcid: orcid.trim(),
        researchGate: researchGate.trim(),
        availableForMeetings,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 p-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-green-dark text-center mb-6">Researcher Profile Setup</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
             <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 p-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="e.g., Dr. John Smith"
                />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
             <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <AcademicCapIcon />
                </div>
                <input
                  type="text"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  className="w-full pl-10 p-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="Oncology, Neurology, Immunology"
                />
            </div>
            <p className="text-xs text-gray-500 mt-1">Separate with commas.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Research Interests</label>
             <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <AcademicCapIcon />
                </div>
                <input
                  type="text"
                  value={researchInterests}
                  onChange={(e) => setResearchInterests(e.target.value)}
                  className="w-full pl-10 p-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  placeholder="Gene Therapy, Clinical AI"
                />
            </div>
            <p className="text-xs text-gray-500 mt-1">Separate with commas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ORCID (Optional)</label>
              <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LinkIcon />
                  </div>
                  <input type="text" value={orcid} onChange={(e) => setOrcid(e.target.value)} className="w-full pl-10 p-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" placeholder="0000-0000-0000-0000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ResearchGate (Optional)</label>
              <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LinkIcon />
                  </div>
                  <input type="text" value={researchGate} onChange={(e) => setResearchGate(e.target.value)} className="w-full pl-10 p-3 text-base text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" placeholder="profile/Your-Name" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-base font-medium text-gray-700">Available for patient meetings?</span>
            <label htmlFor="availability-toggle" className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                id="availability-toggle" 
                className="sr-only peer"
                checked={availableForMeetings}
                onChange={() => setAvailableForMeetings(!availableForMeetings)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green-dark"></div>
            </label>
          </div>
        </div>
        <button
          onClick={handleComplete}
          disabled={!name.trim() || !specialties.trim() || !researchInterests.trim()}
          className="mt-8 w-full bg-brand-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-green-dark transition-all duration-300 disabled:bg-gray-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Create My Profile
        </button>
        <div className="text-center mt-6">
            <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                &larr; Back to role selection
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResearcherOnboarding;