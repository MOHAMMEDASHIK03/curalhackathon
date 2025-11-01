
import React, { useState, useEffect, useCallback } from 'react';
import type { PatientProfile, ClinicalTrial, Publication, Expert, ForumPost } from '../../../types';
import { geminiService } from '../../../services/geminiService';
import { MOCK_TRIALS, MOCK_EXPERTS, MOCK_PUBLICATIONS, MOCK_FORUMS } from '../../../constants';
import { DashboardIcon, UserIcon, FlaskIcon, BookIcon, ForumIcon, StarIcon, LogoutIcon, ChevronRightIcon } from '../../common/Icons';

interface PatientDashboardProps {
  userProfile: PatientProfile;
  onLogout: () => void;
}

type PatientView = 'dashboard' | 'experts' | 'trials' | 'publications' | 'forums' | 'favorites';

const Sidebar: React.FC<{ activeView: PatientView; setView: (view: PatientView) => void; onLogout: () => void; userName: string }> = ({ activeView, setView, onLogout, userName }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'experts', label: 'Health Experts', icon: <UserIcon /> },
    { id: 'trials', label: 'Clinical Trials', icon: <FlaskIcon /> },
    { id: 'publications', label: 'Publications', icon: <BookIcon /> },
    { id: 'forums', label: 'Forums', icon: <ForumIcon /> },
    { id: 'favorites', label: 'My Favorites', icon: <StarIcon /> },
  ];

  return (
    <div className="w-64 bg-white p-4 flex flex-col h-full shadow-lg border-r border-gray-200">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-blue-dark">CuraLink</h1>
        <p className="text-sm text-gray-500">For Patients</p>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 px-3">Menu</p>
        <nav className="flex flex-col space-y-1">
          {navItems.map(item => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => { e.preventDefault(); setView(item.id as PatientView); }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                activeView === item.id ? 'bg-brand-blue-light text-brand-blue-dark font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center mb-4 px-2">
           <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold mr-3">{userName.charAt(0)}</div>
           <div>
            <p className="font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">Patient Profile</p>
           </div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({children, className}) => (
    <div className={`bg-white p-5 rounded-xl shadow-sm border border-gray-200 transition hover:shadow-md ${className}`}>
        {children}
    </div>
);

const TrialCard: React.FC<{ trial: ClinicalTrial, onSave: (id: string) => void, isSaved: boolean }> = ({ trial, onSave, isSaved }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSummary = async () => {
    setIsLoading(true);
    const result = await geminiService.getTrialSummary(trial);
    setSummary(result);
    setIsLoading(false);
  };

  return (
    <Card>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-brand-blue-dark flex-1 pr-4">{trial.title}</h3>
        <button onClick={() => onSave(trial.id)} className="text-gray-400 hover:text-yellow-500 transition-colors">
            <StarIcon filled={isSaved} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">{trial.location}</p>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${trial.status === 'Recruiting' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {trial.status}
      </span>
      <p className="text-sm text-gray-700 mt-3">{trial.description}</p>
      {summary && <div className="mt-4 p-3 bg-blue-50 border-l-4 border-brand-blue text-sm text-gray-700 rounded-r-lg">{summary}</div>}
      <div className="mt-4 flex justify-between items-center">
        <a href={trial.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-blue hover:underline">Contact Trial</a>
        <button onClick={handleGetSummary} disabled={isLoading} className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark disabled:opacity-50">
          {isLoading ? 'Generating...' : 'Get AI Summary'}
        </button>
      </div>
    </Card>
  );
};

const ExpertCard: React.FC<{ expert: Expert, onSave: (id: string) => void, isSaved: boolean }> = ({ expert, onSave, isSaved }) => (
    <Card>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg text-brand-blue-dark">{expert.name}</h3>
                <p className="text-sm text-gray-500">{expert.specialty} at {expert.institution}</p>
            </div>
             <button onClick={() => onSave(expert.id)} className="text-gray-400 hover:text-yellow-500 transition-colors">
                <StarIcon filled={isSaved} />
            </button>
        </div>
        <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700">Research Interests:</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {expert.researchInterests.map(interest => (
                    <span key={interest} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">{interest}</span>
                ))}
            </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
            <button className="text-sm font-semibold bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Follow</button>
            <button className="text-sm font-semibold bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue-dark">Request Meeting</button>
        </div>
    </Card>
);

const PublicationCard: React.FC<{ pub: Publication, onSave: (id: string) => void, isSaved: boolean }> = ({ pub, onSave, isSaved }) => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetSummary = async () => {
        setIsLoading(true);
        const result = await geminiService.getPublicationSummary(pub);
        setSummary(result);
        setIsLoading(false);
    };

    return (
        <Card>
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-brand-blue-dark flex-1 pr-4">{pub.title}</h3>
                <button onClick={() => onSave(pub.id)} className="text-gray-400 hover:text-yellow-500 transition-colors">
                    <StarIcon filled={isSaved} />
                </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">{pub.journal} &bull; {pub.year}</p>
            <p className="text-sm text-gray-600 mt-1">By {pub.authors.join(', ')}</p>
            {summary && <div className="mt-4 p-3 bg-blue-50 border-l-4 border-brand-blue text-sm text-gray-700 rounded-r-lg">{summary}</div>}
            <div className="mt-4 flex justify-between items-center">
                <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-blue hover:underline">View Full Paper</a>
                <button onClick={handleGetSummary} disabled={isLoading} className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark disabled:opacity-50">
                    {isLoading ? 'Generating...' : 'Get AI Summary'}
                </button>
            </div>
        </Card>
    );
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ userProfile, onLogout }) => {
  const [view, setView] = useState<PatientView>('dashboard');
  const [favorites, setFavorites] = useState<{ trials: Set<string>, experts: Set<string>, publications: Set<string> }>({
    trials: new Set(),
    experts: new Set(),
    publications: new Set(),
  });

  const toggleFavorite = (type: 'trials' | 'experts' | 'publications', id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev[type]);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { ...prev, [type]: newSet };
    });
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardView profile={userProfile} />;
      case 'experts':
        return <ExpertsView favorites={favorites.experts} toggleFavorite={(id) => toggleFavorite('experts', id)} />;
      case 'trials':
        return <TrialsView favorites={favorites.trials} toggleFavorite={(id) => toggleFavorite('trials', id)} />;
      case 'publications':
        return <PublicationsView favorites={favorites.publications} toggleFavorite={(id) => toggleFavorite('publications', id)} />;
      case 'forums':
        return <ForumsView />;
      case 'favorites':
        return <FavoritesView favorites={favorites} toggleFavorite={toggleFavorite} />;
      default:
        return <div className="p-8"><h2 className="text-2xl font-bold">Not Found</h2></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar activeView={view} setView={setView} onLogout={onLogout} userName={userProfile.name} />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="mt-1 text-gray-600">{subtitle}</p>
    </div>
);

const DashboardView: React.FC<{ profile: PatientProfile }> = ({ profile }) => {
    return (
        <div>
            <PageHeader title={`Welcome, ${profile.name}`} subtitle="Here are your personalized recommendations based on your profile." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <h3 className="font-bold text-lg text-brand-blue-dark">Recommended Clinical Trials</h3>
                    <ul className="mt-4 space-y-3">
                        {MOCK_TRIALS.slice(0,2).map(t => <li key={t.id} className="text-sm text-gray-700 flex items-start"><ChevronRightIcon/> <span className="ml-1">{t.title}</span></li>)}
                    </ul>
                </Card>
                <Card>
                    <h3 className="font-bold text-lg text-brand-blue-dark">Top Health Experts</h3>
                    <ul className="mt-4 space-y-3">
                         {MOCK_EXPERTS.slice(0,2).map(e => <li key={e.id} className="text-sm text-gray-700 flex items-start"><ChevronRightIcon/> <span className="ml-1">{e.name} - {e.specialty}</span></li>)}
                    </ul>
                </Card>
                 <Card>
                    <h3 className="font-bold text-lg text-brand-blue-dark">Latest Publications</h3>
                    <ul className="mt-4 space-y-3">
                         {MOCK_PUBLICATIONS.slice(0,2).map(p => <li key={p.id} className="text-sm text-gray-700 flex items-start"><ChevronRightIcon/> <span className="ml-1">{p.title}</span></li>)}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

const TrialsView: React.FC<{ favorites: Set<string>, toggleFavorite: (id: string) => void }> = ({ favorites, toggleFavorite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredTrials = MOCK_TRIALS.filter(trial => trial.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <PageHeader title="Clinical Trials" subtitle="Find trials relevant to your condition and location." />
            <input 
                type="text" 
                placeholder="Search trials by keyword (e.g., Lung Cancer Immunotherapy)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue"
            />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTrials.map(trial => (
                    <TrialCard key={trial.id} trial={trial} onSave={toggleFavorite} isSaved={favorites.has(trial.id)} />
                ))}
            </div>
        </div>
    );
}

const ExpertsView: React.FC<{ favorites: Set<string>, toggleFavorite: (id: string) => void }> = ({ favorites, toggleFavorite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredExperts = MOCK_EXPERTS.filter(expert => expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || expert.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div>
            <PageHeader title="Health Experts" subtitle="Connect with specialists in your area of interest." />
             <input type="text" placeholder="Search experts by name or specialty" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredExperts.map(expert => (
                    <ExpertCard key={expert.id} expert={expert} onSave={toggleFavorite} isSaved={favorites.has(expert.id)} />
                ))}
            </div>
        </div>
    )
}

const PublicationsView: React.FC<{ favorites: Set<string>, toggleFavorite: (id: string) => void }> = ({ favorites, toggleFavorite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredPubs = MOCK_PUBLICATIONS.filter(pub => pub.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div>
            <PageHeader title="Publications" subtitle="Explore the latest research papers and articles." />
            <input type="text" placeholder="Search publications by title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPubs.map(pub => (
                    <PublicationCard key={pub.id} pub={pub} onSave={toggleFavorite} isSaved={favorites.has(pub.id)} />
                ))}
            </div>
        </div>
    );
};

const ForumsView: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Forums</h1>
                    <p className="mt-1 text-gray-600">Ask questions and get answers from researchers.</p>
                </div>
                <button className="bg-brand-blue text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-blue-dark transition">Post a Question</button>
            </div>
             <div className="space-y-6">
                {MOCK_FORUMS.map(post => (
                    <Card key={post.id}>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">{post.category}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-2">{post.title}</h3>
                        <p className="text-sm text-gray-500">Asked by: {post.author}</p>
                        <p className="text-gray-700 mt-4">{post.content}</p>
                        {post.replies.length > 0 && (
                            <div className="mt-6 border-t pt-4 space-y-4">
                                <h4 className="font-semibold text-gray-700">Researcher Reply</h4>
                                {post.replies.slice(0,1).map(reply => (
                                    <div key={reply.id} className="bg-blue-50 p-4 rounded-lg border-l-4 border-brand-blue">
                                    <p className="font-bold text-brand-blue-dark">{reply.author}</p>
                                    <p className="text-gray-800 mt-1">{reply.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

const FavoritesView: React.FC<{favorites: any, toggleFavorite: any}> = ({ favorites, toggleFavorite }) => {
    const favTrials = MOCK_TRIALS.filter(t => favorites.trials.has(t.id));
    const favExperts = MOCK_EXPERTS.filter(e => favorites.experts.has(e.id));
    const favPubs = MOCK_PUBLICATIONS.filter(p => favorites.publications.has(p.id));

    return (
        <div>
            <PageHeader title="My Favorites" subtitle="Your saved trials, experts, and publications." />
            {favTrials.length === 0 && favExperts.length === 0 && favPubs.length === 0 ? (
                <p className="text-gray-600">You haven't saved any favorites yet. Click the star icon on any item to save it here.</p>
            ) : (
                <div className="space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Saved Trials</h2>
                        {favTrials.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {favTrials.map(t => <TrialCard key={t.id} trial={t} onSave={(id) => toggleFavorite('trials', id)} isSaved={true} />)}
                            </div>
                        ) : <p className="text-gray-500">No saved trials.</p>}
                    </section>
                     <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Saved Experts</h2>
                         {favExperts.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {favExperts.map(e => <ExpertCard key={e.id} expert={e} onSave={(id) => toggleFavorite('experts', id)} isSaved={true} />)}
                            </div>
                        ) : <p className="text-gray-500">No saved experts.</p>}
                    </section>
                     <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Saved Publications</h2>
                         {favPubs.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {favPubs.map(p => <PublicationCard key={p.id} pub={p} onSave={(id) => toggleFavorite('publications', id)} isSaved={true} />)}
                            </div>
                        ) : <p className="text-gray-500">No saved publications.</p>}
                    </section>
                </div>
            )}
        </div>
    )
}

export default PatientDashboard;