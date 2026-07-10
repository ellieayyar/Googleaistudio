import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Award, 
  Check, 
  Mail, 
  Lock, 
  User, 
  AlertTriangle, 
  RefreshCw,
  Info
} from 'lucide-react';
import { OnboardingAnswers, ImmigrationStatus, Province } from '../types';

interface OnboardingViewProps {
  onComplete: (answers: OnboardingAnswers) => void;
  selectedTier: 'free' | 'confident' | 'whiteglove';
}

export default function OnboardingView({ onComplete, selectedTier }: OnboardingViewProps) {
  // Wizard Steps:
  // -1: Login / Sign Up Screen
  //  0: Prompt to Resume (if partial answers exist)
  //  1: Visa Type
  //  2: Settling Province
  //  3: Arrival Date
  const [step, setStep] = useState<number>(-1);
  
  // Auth states
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isEmailLogin, setIsEmailLogin] = useState<boolean>(false);
  const [authName, setAuthName] = useState<string>('');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Logged-in session state
  const [userSession, setUserSession] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('settlefy_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Onboarding answers states
  const [visaType, setVisaType] = useState<ImmigrationStatus>('PR holder');
  const [province, setProvince] = useState<Province>('Ontario');
  const [arrivalDate, setArrivalDate] = useState<string>(() => {
    // Default to today
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Error simulation states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const [generationAttempt, setGenerationAttempt] = useState<number>(0);
  const [generationError, setGenerationError] = useState<string>('');

  // Load resume/midway state on mount or login
  useEffect(() => {
    if (userSession) {
      // If logged in, look for existing incomplete session
      const savedMidway = localStorage.getItem(`settlefy_midway_${userSession.email}`);
      if (savedMidway && step === -1) {
        setStep(0); // Go to resume prompt
      } else if (step === -1) {
        setStep(1); // Go to first question
      }
    }
  }, [userSession]);

  // Save intermediate answers to localStorage whenever they change
  useEffect(() => {
    if (userSession && step > 0) {
      const midwayData = {
        visaType,
        province,
        arrivalDate,
        step
      };
      localStorage.setItem(`settlefy_midway_${userSession.email}`, JSON.stringify(midwayData));
    }
  }, [visaType, province, arrivalDate, step, userSession]);

  const handleResume = () => {
    if (!userSession) return;
    const savedMidway = localStorage.getItem(`settlefy_midway_${userSession.email}`);
    if (savedMidway) {
      try {
        const parsed = JSON.parse(savedMidway);
        setVisaType(parsed.visaType || 'PR holder');
        setProvince(parsed.province || 'Ontario');
        setArrivalDate(parsed.arrivalDate || new Date().toISOString().split('T')[0]);
        setStep(parsed.step || 1);
      } catch (err) {
        setStep(1);
      }
    } else {
      setStep(1);
    }
  };

  const handleStartFresh = () => {
    if (userSession) {
      localStorage.removeItem(`settlefy_midway_${userSession.email}`);
    }
    setVisaType('PR holder');
    setProvince('Ontario');
    const today = new Date();
    setArrivalDate(today.toISOString().split('T')[0]);
    setStep(1);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    setAuthError('');
    setTimeout(() => {
      // Simulate Google auth success
      const simulatedUser = {
        email: 'settlefy2026@gmail.com',
        name: 'Google User'
      };
      localStorage.setItem('settlefy_auth_user', JSON.stringify(simulatedUser));
      setUserSession(simulatedUser);
      setIsGoogleLoading(false);
    }, 1200);
  };

  const handleEmailAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError('Please fill in all credentials.');
      return;
    }

    if (!isEmailLogin && !authName.trim()) {
      setAuthError('Please enter your name.');
      return;
    }

    // Process simulation
    const nameToUse = isEmailLogin ? authEmail.split('@')[0] : authName.trim();
    const user = {
      email: authEmail.toLowerCase().trim(),
      name: nameToUse
    };

    localStorage.setItem('settlefy_auth_user', JSON.stringify(user));
    
    // Also save account mapping in "database" so we can simulate persistent accounts on different devices/re-logins
    const accountsDbSaved = localStorage.getItem('settlefy_accounts_db');
    const db = accountsDbSaved ? JSON.parse(accountsDbSaved) : {};
    if (!db[user.email]) {
      db[user.email] = { name: user.name, profile: null, tasks: [] };
      localStorage.setItem('settlefy_accounts_db', JSON.stringify(db));
    } else {
      // User already exists, let's restore their data!
      const existing = db[user.email];
      if (existing.profile) {
        // Automatically restore and redirect to dashboard
        localStorage.setItem('settlefy_user_profile', JSON.stringify(existing.profile));
        localStorage.setItem('settlefy_tasks', JSON.stringify(existing.tasks || []));
        window.location.reload();
        return;
      }
    }

    setUserSession(user);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      triggerSubmitWithSimulation();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const triggerSubmitWithSimulation = () => {
    if (!userSession) return;
    
    setIsLoading(true);
    setGenerationError('');
    
    // Attempt counter
    const currentAttempt = generationAttempt + 1;
    setGenerationAttempt(currentAttempt);

    const stages = [
      'Authenticating your profile...',
      'Analyzing registry frameworks for your province...',
      'Generating custom timelines for your visa rules...',
      'Validating government links checklist...'
    ];

    let currentStageIdx = 0;
    setLoadingText(stages[0]);

    const interval = setInterval(() => {
      currentStageIdx += 1;
      if (currentStageIdx < stages.length) {
        setLoadingText(stages[currentStageIdx]);
      } else {
        clearInterval(interval);
        
        // Simulating the PRD network error requirement:
        // "6. If onboarding fails due to network or API error, user sees a plain error message and can retry without losing their answers"
        if (currentAttempt === 1) {
          setIsLoading(false);
          setGenerationError('API Connection Error: Settlefy cloud sync failed because the remote server is unreachable. Please retry to complete sync.');
        } else {
          // Success! Clear midway state
          localStorage.removeItem(`settlefy_midway_${userSession.email}`);
          
          const completedAnswers: OnboardingAnswers = {
            name: userSession.name,
            email: userSession.email,
            arrivalDate: arrivalDate,
            status: visaType,
            province: province,
            hasPaid: selectedTier !== 'free',
            tier: selectedTier,
            // Fallbacks for compatibility
            family: 'Single',
            employment: 'Looking for work',
            arrival: 'Within 1 month',
            concern: 'Documentation'
          };

          // Save to simulated database for persistence
          const accountsDbSaved = localStorage.getItem('settlefy_accounts_db');
          const db = accountsDbSaved ? JSON.parse(accountsDbSaved) : {};
          db[userSession.email] = {
            name: userSession.name,
            profile: completedAnswers,
            tasks: [] // App.tsx will handle generation and saving tasks
          };
          localStorage.setItem('settlefy_accounts_db', JSON.stringify(db));

          setIsLoading(false);
          onComplete(completedAnswers);
        }
      }
    }, 800);
  };

  return (
    <div id="onboarding-view" className="max-w-2xl mx-auto px-4 py-8 sm:py-12 text-[#2D3748]">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-150 text-center flex flex-col items-center justify-center min-h-[450px] animate-fade-in">
          <div className="relative mb-8">
            <div className="w-16 h-16 rounded-full border-4 border-gray-100 border-t-[#028090] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#028090] animate-pulse" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#2D3748]">Generating Your Settlement Guide</h3>
          <p className="text-[#028090] font-medium text-sm animate-pulse max-w-sm mx-auto h-12">
            {loadingText}
          </p>
          <div className="mt-8 flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F2] border border-gray-100 text-xs text-gray-500">
            <Info className="w-3.5 h-3.5 text-[#C4972F]" />
            <span>Plan: <b>{selectedTier === 'free' ? 'Free Essentials' : selectedTier === 'confident' ? 'Confident Start' : 'White Glove'}</b></span>
          </div>
        </div>
      )}

      {/* Generation Error State */}
      {!isLoading && generationError && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-red-200 text-center animate-fade-in">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-red-650 mb-2">Sync Service Interrupted</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            {generationError}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={triggerSubmitWithSimulation}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#028090] text-white font-bold hover:bg-[#028090]/90 transition duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md"
            >
              <RefreshCw className="w-4 h-4 animate-spin-reverse" /> Retry Generation
            </button>
            <button
              onClick={() => setGenerationError('')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-50 text-gray-600 font-semibold hover:bg-gray-100 border border-gray-200 transition text-sm cursor-pointer"
            >
              Go Back & Review Answers
            </button>
          </div>
        </div>
      )}

      {/* STEP -1: Auth / Sign Up screen */}
      {!isLoading && !generationError && step === -1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-150 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#028090]/5 rounded-bl-full pointer-events-none"></div>
          
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-[#C4972F] bg-[#C4972F]/10 mb-4 uppercase">
              🇨🇦 Step 1 of Onboarding
            </span>
            <h2 className="text-3xl font-extrabold text-[#2D3748] tracking-tight">
              Create your Settlefy account
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Settlefy syncs your checklists automatically so you never lose track of documents or deadlines on any device.
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-150 text-xs text-red-600 font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Google Authentication Option */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-3.5 px-5 rounded-xl border border-gray-200 hover:bg-gray-50/80 transition duration-150 font-bold text-sm text-[#2D3748] flex items-center justify-center gap-3 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#028090]" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.67 0 3.16.58 4.34 1.71l3.24-3.24C17.6 1.83 14.97 1 12 1 7.35 1 3.39 3.67 1.44 7.56l3.8 2.94C6.18 7.37 8.86 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.45h6.45c-.28 1.47-1.11 2.72-2.35 3.56l3.65 2.83c2.14-1.97 3.39-4.88 3.39-8.49z" />
                  <path fill="#FBBC05" d="M5.24 14.6c-.24-.71-.38-1.47-.38-2.27s.14-1.56.38-2.27L1.44 7.12C.52 8.96 0 11.02 0 13.2s.52 4.24 1.44 6.08l3.8-2.68z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.96-1.07 7.95-2.91l-3.65-2.83c-1.01.68-2.31 1.09-3.9 1.09-3.14 0-5.82-2.33-6.76-5.46L.84 15.56C2.79 19.45 6.75 22 12 23z" />
                </svg>
              )}
              {isGoogleLoading ? 'Connecting securely...' : 'Continue with Google in 1-Click'}
            </button>

            <div className="flex items-center justify-between text-xs text-gray-300 font-bold uppercase tracking-widest my-4">
              <div className="w-full h-[1px] bg-gray-150"></div>
              <span className="px-3 bg-white shrink-0">Or use email</span>
              <div className="w-full h-[1px] bg-gray-150"></div>
            </div>

            {/* Email form option */}
            <form onSubmit={handleEmailAuthSubmit} className="space-y-4">
              {!isEmailLogin && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">My Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Maria Moreno"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-[#2D3748] font-medium text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#028090]"
                    />
                    <User className="w-4 h-4 text-gray-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-[#2D3748] font-medium text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#028090]"
                  />
                  <Mail className="w-4 h-4 text-gray-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-[#2D3748] font-medium text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#028090]"
                  />
                  <Lock className="w-4 h-4 text-gray-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-4 rounded-xl bg-[#028090] text-white font-bold hover:bg-[#028090]/90 transition duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {isEmailLogin ? 'Log In Securely' : 'Create Account & Continue'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setAuthError('');
                  setIsEmailLogin(!isEmailLogin);
                }}
                className="text-xs font-bold text-[#028090] hover:underline cursor-pointer"
              >
                {isEmailLogin ? "Don't have an account? Sign up here" : "Already have an account? Log in here"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 0: Prompt to Resume Midway */}
      {!isLoading && !generationError && step === 0 && userSession && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-150 text-center animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4972F]/5 rounded-bl-full pointer-events-none"></div>
          
          <div className="w-14 h-14 bg-[#C4972F]/10 text-[#C4972F] rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="text-2xl font-bold text-[#2D3748] mb-2">Incomplete Onboarding Found</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
            Welcome back, <b>{userSession.name}</b>! Settlefy detected a previous onboarding session that was left unfinished. Would you like to resume where you left off or start fresh?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleResume}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#028090] hover:bg-[#028090]/90 text-white font-bold transition duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Resume Previous Session <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleStartFresh}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-50 text-gray-600 font-semibold hover:bg-gray-100 border border-gray-200 transition duration-150 cursor-pointer text-sm"
            >
              Start Fresh Session
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE QUESTION PANEL (Steps 1, 2, 3) */}
      {!isLoading && !generationError && step >= 1 && step <= 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-150">
          
          {/* Header Progress Counter */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
              <span>Roadmap Onboarding</span>
              <span className="text-[#028090]">Question {step} of 3</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#028090] h-full transition-all duration-300 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question 1: Visa Type */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <span className="text-xs font-bold text-[#028090] uppercase tracking-widest bg-[#028090]/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                  Question 1
                </span>
                <h3 className="text-2xl font-bold text-[#2D3748]">What is your Canadian visa or status?</h3>
                <p className="text-sm text-gray-400 mt-1">Different immigration classes have unique payroll rules, healthcare wait times, and benefit access.</p>
              </div>

              <div className="space-y-4">
                {[
                  { value: 'PR holder', title: 'Permanent Resident (PR) Holder', desc: 'Direct provincial medical cards access, federal settlement support' },
                  { value: 'Work permit', title: 'Work Permit Holder', desc: 'Arriving for a firm job or open permit; unique local work compliance' },
                  { value: 'Student', title: 'Study Permit Holder (Student)', desc: 'Enrolled in a designated institution; specific student insurance criteria' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setVisaType(item.value as ImmigrationStatus)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition duration-150 cursor-pointer flex items-start gap-4 ${
                      visaType === item.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-300 hover:bg-gray-50/30'
                    }`}
                  >
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${visaType === item.value ? 'border-[#028090]' : 'border-gray-200'}`}>
                      {visaType === item.value && <div className="w-2.5 h-2.5 rounded-full bg-[#028090]"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2D3748] text-sm sm:text-base">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Province */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <span className="text-xs font-bold text-[#028090] uppercase tracking-widest bg-[#028090]/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                  Question 2
                </span>
                <h3 className="text-2xl font-bold text-[#2D3748]">Which province are you settling in?</h3>
                <p className="text-sm text-gray-400 mt-1">Canada governs medical registration, driving regulations, and schooling provincially.</p>
              </div>

              <div className="space-y-4">
                {[
                  { value: 'Ontario', name: 'Ontario', tag: 'ON', desc: 'Toronto, Ottawa, Mississauga, London' },
                  { value: 'BC', name: 'British Columbia', tag: 'BC', desc: 'Vancouver, Victoria, Surrey, Kelowna' },
                  { value: 'Alberta', name: 'Alberta', tag: 'AB', desc: 'Calgary, Edmonton, Banff, Lethbridge' },
                  { value: 'Quebec', name: 'Quebec', tag: 'QC', desc: 'Montreal, Quebec City, Sherbrooke (RAMQ & French regulations)' },
                  { value: 'Other', name: 'Other Territory / Province', tag: 'CA', desc: 'Nova Scotia, Manitoba, Saskatchewan, PEI, etc.' }
                ].map((prov) => (
                  <button
                    key={prov.value}
                    onClick={() => setProvince(prov.value as Province)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition duration-150 cursor-pointer flex items-center justify-between ${
                      province === prov.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-300 hover:bg-gray-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center font-black text-[#028090] text-xs">
                        {prov.tag}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2D3748] text-sm sm:text-base">{prov.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{prov.desc}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${province === prov.value ? 'border-[#028090]' : 'border-gray-200'}`}>
                      {province === prov.value && <div className="w-2.5 h-2.5 rounded-full bg-[#028090]"></div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Arrival Date */}
          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <div>
                <span className="text-xs font-bold text-[#028090] uppercase tracking-widest bg-[#028090]/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                  Question 3
                </span>
                <h3 className="text-2xl font-bold text-[#2D3748]">When did you arrive or plan to arrive?</h3>
                <p className="text-sm text-gray-400 mt-1">Settlefy uses this date to automatically compute precise, chronological week-by-week deadlines for your files.</p>
              </div>

              <div className="max-w-md mx-auto p-6 bg-[#FAF7F2] rounded-2xl border border-gray-150">
                <div className="flex items-center gap-3 mb-4 text-[#028090]">
                  <Calendar className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Date of Arrival in Canada</span>
                </div>

                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#2D3748] font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#028090] bg-white cursor-pointer"
                />

                <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
                  Provide your estimated date if you haven't landed yet. You can always change this later in your workspace.
                </p>
              </div>
            </div>
          )}

          {/* Controls Footer */}
          <div className="border-t border-gray-100 mt-10 pt-6 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-[#2D3748] hover:bg-[#FAF7F2] transition duration-150 flex items-center gap-2 cursor-pointer text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-[#028090] text-white font-bold hover:bg-[#028090]/90 transition duration-150 shadow-md flex items-center gap-2 cursor-pointer text-xs"
            >
              {step === 3 ? 'Generate My Settlement Guide' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
