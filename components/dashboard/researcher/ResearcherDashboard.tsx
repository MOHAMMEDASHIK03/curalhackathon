
import React, { useState } from 'react';
import type { ResearcherProfile, ClinicalTrial, Expert, Publication } from '../../../types';
import { MOCK_FORUMS, MOCK_EXPERTS, MOCK_TRIALS, MOCK_PUBLICATIONS } from '../../../constants';
import { DashboardIcon, UsersIcon, FlaskIcon, BookIcon, ForumIcon, StarIcon, LogoutIcon, PlusIcon } from '../../common/Icons';

interface ResearcherDashboardProps {
  userProfile: ResearcherProfile;
  onLogout: () => void;
}

type ResearcherView = 'dashboard' | 'collaborators' | 'trials' | 'forums' | 'favorites';

const Sidebar: React.FC<{ activeView: ResearcherView; setView: (view: ResearcherView) => void; onLogout: () => void; userName: string }> = ({ activeView, setView, onLogout, userName }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'collaborators', label: 'Collaborators', icon: <UsersIcon /> },
    { id: 'trials', label: 'Manage Trials', icon: <FlaskIcon /> },
    { id: 'forums', label: 'Forums', icon: <ForumIcon /> },
    { id: 'favorites', label: 'My Favorites', icon: <StarIcon /> },
  ];

  return (
    <div className="w-64 bg-white p-4 flex flex-col h-full shadow-lg border-r border-gray-200">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-green-dark">CuraLink</h1>
        <p className="text-sm text-gray-500">For Researchers</p>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 px-3">Menu</p>
        <nav className="flex flex-col space-y-1">
          {navItems.map(item => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => { e.preventDefault(); setView(item.id as ResearcherView); }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                activeView === item.id ? 'bg-brand-green-light text-brand-green-dark font-semibold' : 'text-gray-600 hover:bg-gray-100'
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
           <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold mr-3">{userName.charAt(0)}</div>
           <div>
            <p className="font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">Researcher Profile</p>
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

const ResearcherDashboard: React.FC<ResearcherDashboardProps> = ({ userProfile, onLogout }) => {
  const [view, setView] = useState<ResearcherView>('dashboard');
  const [favorites, setFavorites] = useState<{ trials: Set<string>, collaborators: Set<string>, publications: Set<string> }>({
    trials: new Set(),
    collaborators: new Set(),
    publications: new Set(),
  });

   const toggleFavorite = (type: 'trials' | 'collaborators' | 'publications', id: string) => {
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
        return <DashboardView profile={userProfile} setView={setView} />;
      case 'collaborators':
          return <CollaboratorsView favorites={favorites.collaborators} toggleFavorite={(id) => toggleFavorite('collaborators', id)} />;
      case 'trials':
          return <ManageTrialsView />;
      case 'forums':
        return <ForumsView researcherName={userProfile.name} />;
      case 'favorites':
        return <FavoritesView favorites={favorites} toggleFavorite={toggleFavorite} />;
      default:
        return <div className="p-8"><h2 className="text-2xl font-bold">{view.charAt(0).toUpperCase() + view.slice(1)}</h2><p>Content for this section is under development.</p></div>;
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

const DashboardView: React.FC<{ profile: ResearcherProfile, setView: (view: ResearcherView) => void }> = ({ profile, setView }) => {
    return (
        <div>
            <PageHeader title={`Welcome, ${profile.name}`} subtitle="Here's a summary of your activities and recommendations." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-bold text-lg text-brand-green-dark">Your Clinical Trials</h3>
                    <p className="text-sm text-gray-600 mt-2">You are currently managing 3 trials.</p>
                    <button onClick={() => setView('trials')} className="mt-4 text-sm font-semibold text-brand-green hover:text-brand-green-dark flex items-center space-x-2">
                        <PlusIcon />
                        <span>Add or Manage Trials</span>
                    </button>
                </Card>
                 <Card>
                    <h3 className="font-bold text-lg text-brand-green-dark">Recent Forum Activity</h3>
                    <p className="text-sm text-gray-600 mt-2">There is 1 new question in the 'Clinical Trials Insights' forum awaiting your expertise.</p>
                     <a href="#" onClick={(e) => { e.preventDefault(); setView('forums'); }} className="mt-4 text-sm font-semibold text-brand-green hover:text-brand-green-dark inline-block">View Forums</a>
                </Card>
            </div>
        </div>
    );
}

const ForumsView: React.FC<{ researcherName: string }> = ({ researcherName }) => {
  const [forums, setForums] = useState(MOCK_FORUMS);
  const [replyContent, setReplyContent] = useState<{[key: string]: string}>({});

  const handleReplyChange = (postId: string, text: string) => {
    setReplyContent(prev => ({...prev, [postId]: text}));
  };

  const handlePostReply = (postId: string) => {
    const content = replyContent[postId];
    if (!content || !content.trim()) return;

    setForums(prevForums => prevForums.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, { id: `reply${Date.now()}`, author: researcherName, content }]
        };
      }
      return post;
    }));
    
    handleReplyChange(postId, ''); // Clear input
  };

  return (
    <div>
      <PageHeader title="Forums" subtitle="Engage with patients by answering their questions." />
      <div className="space-y-6">
        {forums.map(post => (
          <Card key={post.id}>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">{post.category}</span>
            <h3 className="text-xl font-bold text-gray-800 mt-2">{post.title}</h3>
            <p className="text-sm text-gray-500">Asked by: {post.author}</p>
            <p className="text-gray-700 mt-4">{post.content}</p>
            <div className="mt-6 border-t pt-4 space-y-4">
              <h4 className="font-semibold text-gray-700">Replies ({post.replies.length})</h4>
              {post.replies.map(reply => (
                <div key={reply.id} className="bg-green-50 p-4 rounded-lg border-l-4 border-brand-green">
                  <p className="font-bold text-brand-green-dark">{reply.author}</p>
                  <p className="text-gray-800 mt-1">{reply.content}</p>
                </div>
              ))}
              <div className="mt-4">
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green"
                  rows={3}
                  placeholder="Write your reply..."
                  value={replyContent[post.id] || ''}
                  onChange={(e) => handleReplyChange(post.id, e.target.value)}
                />
                <button 
                  onClick={() => handlePostReply(post.id)}
                  disabled={!replyContent[post.id] || !replyContent[post.id]?.trim()}
                  className="mt-2 bg-brand-green text-white py-2 px-5 rounded-lg font-semibold hover:bg-brand-green-dark transition duration-300 disabled:bg-gray-400">
                  Post Reply
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CollaboratorCard: React.FC<{ expert: Expert, onSave: (id: string) => void, isSaved: boolean }> = ({ expert, onSave, isSaved }) => (
    <Card>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg text-brand-green-dark">{expert.name}</h3>
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
        <div className="mt-4 flex justify-end">
            <button className="text-sm font-semibold bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-green-dark">Send Connection Request</button>
        </div>
    </Card>
);

const CollaboratorsView: React.FC<{ favorites: Set<string>, toggleFavorite: (id: string) => void }> = ({ favorites, toggleFavorite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCollaborators = MOCK_EXPERTS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <div>
            <PageHeader title="Collaborators" subtitle="Find and connect with fellow researchers." />
             <input type="text" placeholder="Search collaborators by name or specialty" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full max-w-lg p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCollaborators.map(c => <CollaboratorCard key={c.id} expert={c} onSave={toggleFavorite} isSaved={favorites.has(c.id)} />)}
            </div>
        </div>
    )
}

const ManageTrialsView: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Manage Clinical Trials</h1>
                    <p className="mt-1 text-gray-600">Add new trials or update existing ones.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="bg-brand-green text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-green-dark transition">
                    {showForm ? 'Cancel' : 'Add New Trial'}
                </button>
            </div>
            {showForm && (
                 <Card className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">New Trial Form</h3>
                    <form className="space-y-4">
                        <input className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Trial Title" />
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg" rows={4} placeholder="Description..."></textarea>
                        <input className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Location (e.g., City, Country)" />
                         <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                            <option>Recruiting</option>
                            <option>Not yet recruiting</option>
                            <option>Completed</option>
                        </select>
                        <button type="submit" className="bg-brand-green text-white font-semibold px-5 py-2 rounded-lg hover:bg-brand-green-dark">Save Trial</button>
                    </form>
                </Card>
            )}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">Your Active Trials</h3>
                {MOCK_TRIALS.slice(0, 3).map(trial => (
                    <Card key={trial.id} className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-brand-green-dark">{trial.title}</p>
                            <p className="text-sm text-gray-500">{trial.location} - {trial.status}</p>
                        </div>
                        <button className="text-sm font-semibold text-gray-600 hover:text-black">Edit</button>
                    </Card>
                ))}
            </div>
        </div>
    )
}

const FavoritesView: React.FC<{favorites: any, toggleFavorite: any}> = ({ favorites, toggleFavorite }) => {
    const favCollaborators = MOCK_EXPERTS.filter(e => favorites.collaborators.has(e.id));

    return (
        <div>
            <PageHeader title="My Favorites" subtitle="Your saved collaborators, trials, and publications." />
            {favCollaborators.length === 0 ? (
                <p className="text-gray-600">You haven't saved any favorites yet. Click the star icon on any item to save it here.</p>
            ) : (
                <div className="space-y-10">
                     <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Saved Collaborators</h2>
                         {favCollaborators.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {favCollaborators.map(e => <CollaboratorCard key={e.id} expert={e} onSave={(id) => toggleFavorite('collaborators', id)} isSaved={true} />)}
                            </div>
                        ) : <p className="text-gray-500">No saved collaborators.</p>}
                    </section>
                </div>
            )}
        </div>
    )
}

export default ResearcherDashboard;