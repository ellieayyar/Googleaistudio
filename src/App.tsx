import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  LogOut, 
  Bookmark, 
  CheckCircle, 
  HelpCircle,
  FileText, 
  X, 
  MessageSquare, 
  Info,
  Menu,
  ChevronRight,
  ShieldAlert,
  Check
} from 'lucide-react';

// Types and dynamic tasks generator
import { OnboardingAnswers, Task, Province, ImmigrationStatus, BiggestConcern } from './types';
import { generatePersonalizedTasks } from './data/tasks';

// Page Views
import HomeView from './components/HomeView';
import OnboardingView from './components/OnboardingView';
import DashboardView from './components/DashboardView';
import TaskDetailView from './components/TaskDetailView';
import PricingView from './components/PricingView';
import AboutView from './components/AboutView';

export default function App() {
  const [route, setRoute] = useState<string>('home');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  // Newcomer states, restored from local storage
  const [profile, setProfile] = useState<OnboardingAnswers | null>(() => {
    const saved = localStorage.getItem('settlefy_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('settlefy_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Flow Helper: Stores requested pricing tier in-memory to flow automatically into onboarding
  const [selectedTier, setSelectedTier] = useState<'free' | 'confident' | 'whiteglove'>('confident');

  // UI Modal control states
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showDemoNotification, setShowDemoNotification] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Synced state Routing with Browser Location Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setMobileMenuOpen(false); // Close mobile menus on navigating

      if (hash === '#/') {
        setRoute('home');
        setSelectedTaskId(null);
      } else if (hash === '#/get-started') {
        setRoute('onboarding');
        setSelectedTaskId(null);
      } else if (hash === '#/dashboard') {
        // Safe lock: if no profile exists, guide them into onboarding instead!
        const savedProfile = localStorage.getItem('settlefy_user_profile');
        if (!savedProfile) {
          // Fire premium demo seed notification
          setShowDemoNotification(true);
          window.location.hash = '#/get-started';
        } else {
          setRoute('dashboard');
          setSelectedTaskId(null);
        }
      } else if (hash.startsWith('#/task/')) {
        const id = hash.replace('#/task/', '');
        setRoute('task-detail');
        setSelectedTaskId(id);
      } else if (hash === '#/pricing') {
        setRoute('pricing');
        setSelectedTaskId(null);
      } else if (hash === '#/about') {
        setRoute('about');
        setSelectedTaskId(null);
      } else {
        setRoute('home');
        setSelectedTaskId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial check on load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set the current hash helper
  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  // Onboarding Submit Completion handler
  const handleOnboardingComplete = (answers: OnboardingAnswers) => {
    const generated = generatePersonalizedTasks(answers);
    
    setProfile(answers);
    setTasks(generated);

    localStorage.setItem('settlefy_user_profile', JSON.stringify(answers));
    localStorage.setItem('settlefy_tasks', JSON.stringify(generated));

    navigateTo('#/dashboard');
  };

  // Toggle single task completion status
  const handleToggleTaskComplete = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: t.status === 'completed' ? 'not_started' : 'completed' as const
        };
      }
      return t;
    });
    setTasks(updated);
    localStorage.setItem('settlefy_tasks', JSON.stringify(updated));
  };

  // Toggle document sub-checklist checkboxes inside a task page
  const handleToggleDocCheck = (taskId: string, docText: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          requiredDocs: t.requiredDocs.map(d => {
            if (d.text === docText) {
              return { ...d, checked: !d.checked };
            }
            return d;
          })
        };
      }
      return t;
    });
    setTasks(updated);
    localStorage.setItem('settlefy_tasks', JSON.stringify(updated));
  };

  // Try Out Settlefy Demo in One-Click!
  const handleLoadDemoWorkspace = () => {
    setShowDemoNotification(false);
    const demoAnswers: OnboardingAnswers = {
      name: 'Maria Moreno',
      status: 'PR holder',
      province: 'Ontario',
      family: 'With partner',
      employment: 'Looking for work',
      arrival: 'Within 1 month',
      concern: 'Healthcare',
      hasPaid: true,
      tier: 'confident'
    };
    handleOnboardingComplete(demoAnswers);
  };

  // Upgrade Plan in one click directly inside dashboard
  const handleUpgradeToPremium = () => {
    if (!profile) return;
    const upgradedProfile: OnboardingAnswers = {
      ...profile,
      hasPaid: true,
      tier: 'confident'
    };
    
    // Regenerate tasks with hasPaid constraints lifted
    const updatedTasks = generatePersonalizedTasks(upgradedProfile);
    
    setProfile(upgradedProfile);
    setTasks(updatedTasks);

    localStorage.setItem('settlefy_user_profile', JSON.stringify(upgradedProfile));
    localStorage.setItem('settlefy_tasks', JSON.stringify(updatedTasks));
  };

  // Absolute Reset of Profile
  const handleResetWorkspace = () => {
    if (window.confirm('Do you want to clear your settlement profile and start fresh?')) {
      localStorage.removeItem('settlefy_user_profile');
      localStorage.removeItem('settlefy_tasks');
      setProfile(null);
      setTasks([]);
      navigateTo('#/');
    }
  };

  // Find currently selected task for TaskDetail view
  const activeTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans flex flex-col justify-between">
      
      {/* Persistent Navigation Header */}
      <header className="bg-white border-b border-gray-150/70 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => navigateTo('#/')}
            className="flex items-center gap-2.5 transition text-left cursor-pointer group text-[#2D3748]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#028090] text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-[#028090]/95">
              <Compass className="w-5.5 h-5.5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#2D3748] block leading-none">Settlefy</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">canada 90-day plan</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button 
              onClick={() => navigateTo('#/')} 
              className={`text-sm font-bold tracking-tight cursor-pointer ${route === 'home' ? 'text-[#028090]' : 'text-gray-400 hover:text-[#2D3748]'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('#/dashboard')} 
              className={`text-sm font-bold tracking-tight cursor-pointer ${route === 'dashboard' ? 'text-[#028090]' : 'text-gray-400 hover:text-[#2D3748]'}`}
            >
              My Roadmap
            </button>
            <button 
              onClick={() => navigateTo('#/pricing')} 
              className={`text-sm font-bold tracking-tight cursor-pointer ${route === 'pricing' ? 'text-[#028090]' : 'text-gray-400 hover:text-[#2D3748]'}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => navigateTo('#/about')} 
              className={`text-sm font-bold tracking-tight cursor-pointer ${route === 'about' ? 'text-[#028090]' : 'text-gray-400 hover:text-[#2D3748]'}`}
            >
              About
            </button>
          </nav>

          {/* User Profile Badge Side */}
          <div className="hidden md:flex items-center gap-4">
            {profile ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-black block text-[#2D3748]">{profile.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#028090] block mt-0.5">
                    {profile.province} • {profile.tier === 'free' ? 'Free Plan' : 'Premium'}
                  </span>
                </div>
                <button
                  onClick={handleResetWorkspace}
                  title="Reset profile & start fresh"
                  className="bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 p-2 rounded-lg transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('#/get-started')}
                className="bg-[#028090] hover:bg-[#028090]/90 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-500 hover:text-[#2D3748] rounded-xl focus:outline-none md:hidden cursor-pointer"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>

        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="bg-white border-b border-gray-100 py-4 px-6 md:hidden flex flex-col gap-4 animate-fade-in shadow-inner z-30 relative">
          <button 
            onClick={() => navigateTo('#/')} 
            className="text-left py-2 font-bold text-[#2D3748]"
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo('#/dashboard')} 
            className="text-left py-2 font-bold text-[#2D3748]"
          >
            My Roadmap
          </button>
          <button 
            onClick={() => navigateTo('#/pricing')} 
            className="text-left py-2 font-bold text-[#2D3748]"
          >
            Pricing
          </button>
          <button 
            onClick={() => navigateTo('#/about')} 
            className="text-left py-2 font-bold text-[#2D3748]"
          >
            About
          </button>
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            {profile ? (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 block">Logged Profile</span>
                  <span className="text-sm font-bold text-[#2D3748]">{profile.name} ({profile.province})</span>
                </div>
                <button
                  onClick={handleResetWorkspace}
                  className="text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1.5 rounded transition"
                >
                  Reset Framework
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('#/get-started')}
                className="w-full bg-[#028090] text-center text-white font-bold py-3 rounded-xl"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Container Core Router Views */}
      <main className="flex-1 bg-[#FAF7F2] py-8 relative">
        <div className="animate-fade-in">
          {route === 'home' && (
            <HomeView 
              onNavigate={navigateTo} 
              onSelectTier={setSelectedTier} 
            />
          )}

          {route === 'onboarding' && (
            <OnboardingView 
              onComplete={handleOnboardingComplete} 
              selectedTier={selectedTier} 
            />
          )}

          {route === 'dashboard' && profile && (
            <DashboardView 
              answers={profile} 
              tasks={tasks}
              onToggleTaskComplete={handleToggleTaskComplete}
              onNavigate={navigateTo}
              onUpgradeTier={handleUpgradeToPremium}
            />
          )}

          {route === 'task-detail' && activeTask && profile && (
            <TaskDetailView 
              task={activeTask}
              userProvince={profile.province}
              onToggleComplete={() => handleToggleTaskComplete(activeTask.id)}
              onToggleDocCheck={(docText) => handleToggleDocCheck(activeTask.id, docText)}
              onNavigate={navigateTo}
            />
          )}

          {route === 'pricing' && (
            <PricingView 
              onNavigate={navigateTo} 
              onSelectTier={setSelectedTier} 
            />
          )}

          {route === 'about' && (
            <AboutView />
          )}
        </div>
      </main>

      {/* Persistent Footer */}
      <footer className="bg-white border-t border-gray-150/70 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#028090] text-white flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-[#2D3748]">Settlefy</span>
            </div>
            <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
              Settlefy Canada organizes the first 90 days after landing into one calm, simplified, and supportive timeline workspace.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Newcomer Links</h4>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => navigateTo('#/')} className="text-xs text-gray-500 hover:text-[#028090] text-left cursor-pointer font-medium">Home</button>
              <button onClick={() => navigateTo('#/pricing')} className="text-xs text-gray-500 hover:text-[#028090] text-left cursor-pointer font-medium">Pricing Options</button>
              <button onClick={() => navigateTo('#/about')} className="text-xs text-gray-500 hover:text-[#028090] text-left cursor-pointer font-medium">About Team Story</button>
              <button onClick={() => navigateTo('#/dashboard')} className="text-xs text-gray-500 hover:text-[#028090] text-left cursor-pointer font-medium font-bold">My Roadmap Dashboard</button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Support & Trust</h4>
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => setShowContactModal(true)} 
                className="text-xs text-gray-500 hover:text-[#028090] text-left cursor-pointer font-medium flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-gray-450" /> Contact Support Desk
              </button>
              <button 
                onClick={() => setShowPrivacyModal(true)} 
                className="text-xs text-gray-500 hover:text-[#028090] text-left cursor-pointer font-medium flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-gray-450" /> Data Privacy Policy
              </button>
              <span className="text-[10px] text-gray-400 block mt-3 font-semibold uppercase">
                Active Version • v1.1.26
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 border-t border-gray-100 mt-10 pt-6 text-center text-[11px] text-gray-400 font-medium">
          <p>Copyright Settlefy Canada 2026. "Your first 90 days, simplified." All rights reserved. Settlefy is an independent settlement helper resource and not affiliated with the Government of Canada of IRCC.</p>
        </div>
      </footer>

      {/* Modal 1: Clean Demo seed notification modal */}
      {showDemoNotification && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-150 relative text-center">
            <button 
              onClick={() => setShowDemoNotification(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-150 text-gray-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <span className="text-3xl mb-4 inline-block">🇨🇦</span>
            <h3 className="text-xl font-bold text-[#2D3748] mb-2">Create your settlement profile!</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              You haven't generated a custom newcomer roadmap yet. To experience the interactive Settlefy dashboard tools, you can either begin a quick onboarding quiz or load a completed demo profile immediately!
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowDemoNotification(false); navigateTo('#/get-started'); }}
                className="w-full py-3 rounded-xl bg-[#028090] text-white font-bold text-sm tracking-wide shadow hover:bg-[#028090]/90 cursor-pointer"
              >
                Go to Onboarding Wizard
              </button>
              <button
                onClick={handleLoadDemoWorkspace}
                className="w-full py-3 rounded-xl border border-gray-250 text-gray-500 font-bold text-sm hover:bg-gray-50 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#C4972F]" /> Try Demo Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Contact Support Desk Popup */}
      {showContactModal && (
        <div className="fixed inset-0 bg-[#2D3748]/30 backdrop-blur-[2px] flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-150 text-gray-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#2D3748] mb-2">Contact Settlefy Support</h3>
            <p className="text-gray-450 text-xs leading-relaxed mb-6">
              We are here to assist with any roadmap files, account requests, or pricing clarifications. Drop us a note!
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Your message has been sent successfully! Our settlement monitors will contact you shortly.'); setShowContactModal(false); }} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Your Email</label>
                <input required type="email" placeholder="e.g. newcomer@gmail.com" className="w-full p-3 rounded-xl border border-gray-250 text-xs focus:outline-none focus:ring-1 focus:ring-[#028090]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">How can we help?</label>
                <textarea required rows={3} placeholder="Describe your question or province change query..." className="w-full p-3 rounded-xl border border-gray-250 text-xs focus:outline-none focus:ring-1 focus:ring-[#028090]"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#028090] hover:bg-[#028090]/90 text-white py-3 rounded-xl text-xs font-bold tracking-wide cursor-pointer transition">
                Send Support Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Privacy Policy Popup */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-[#2D3748]/30 backdrop-blur-[2px] flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative text-left">
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-150 text-gray-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase mb-2 inline-block">GDPR & PIPEDA Compliant</span>
            <h3 className="text-xl font-bold text-[#2D3748] mb-2">Our Privacy Promise</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              We take immigrant data privacy extremely seriously. Settlefy collects your profile choices solely to tailor checklists.
            </p>

            <div className="space-y-3 mb-6 bg-[#FAF7F2] p-4 rounded-xl border border-gray-100">
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><b>LocalStorage Persistence</b>: All onboarding answers and task checking items stay entirely on your custom computer browser.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><b>No Third-party Sharing</b>: We never sell your visa details or province allocations to banks or shelter agencies.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><b>Instant Deletion</b>: Clicking the "LogOut" icon in the top header clears 100% of your data immediately from this device.</span>
              </div>
            </div>

            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="w-full bg-[#2D3748] text-white py-3 rounded-xl text-xs font-bold cursor-pointer"
            >
              Close Privacy Rules
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
