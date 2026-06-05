import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Briefcase, 
  Calendar, 
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { OnboardingAnswers, ImmigrationStatus, Province, FamilySituation, EmploymentStatus, ArrivalTimeline, BiggestConcern } from '../types';

interface OnboardingViewProps {
  onComplete: (answers: OnboardingAnswers) => void;
  selectedTier: 'free' | 'confident' | 'whiteglove';
}

export default function OnboardingView({ onComplete, selectedTier }: OnboardingViewProps) {
  // We have a preliminary "Step 0" for Name, followed by the 6 core questions, making it perfectly cohesive
  const [step, setStep] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<ImmigrationStatus>('PR holder');
  const [province, setProvince] = useState<Province>('Ontario');
  const [family, setFamily] = useState<FamilySituation>('Single');
  const [employment, setEmployment] = useState<EmploymentStatus>('Looking for work');
  const [arrival, setArrival] = useState<ArrivalTimeline>('Within 1 month');
  const [concern, setConcern] = useState<BiggestConcern>('Documentation');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('Processing your choices...');

  const handleNext = () => {
    if (step === 0 && !name.trim()) {
      return; // force entering name to personalize
    }
    if (step < 6) {
      setStep(step + 1);
    } else {
      triggerLoading();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const triggerLoading = () => {
    setIsLoading(true);
    const steps = [
      'Tailoring checklists for your immigration status...',
      `Analyzing registry frameworks for ${province}...`,
      'Structuring health coverage and SIN milestones...',
      'Customizing checklist based on family size...',
      'Mapping final 90-day stress-free plan...'
    ];

    let currentLoadingStep = 0;
    setLoadingText(steps[0]);

    const interval = setInterval(() => {
      currentLoadingStep += 1;
      if (currentLoadingStep < steps.length) {
        setLoadingText(steps[currentLoadingStep]);
      } else {
        clearInterval(interval);
        onComplete({
          name: name.trim() || 'Newcomer',
          status,
          province,
          family,
          employment,
          arrival,
          concern,
          hasPaid: selectedTier !== 'free',
          tier: selectedTier
        });
      }
    }, 900);
  };

  return (
    <div id="onboarding-view" className="max-w-2xl mx-auto px-4 py-12 text-[#2D3748]">
      {isLoading ? (
        /* Loading Screen */
        <div className="bg-white rounded-3xl p-12 shadow-md border border-gray-150/60 text-center flex flex-col items-center justify-center min-h-[450px]">
          <div className="relative mb-8">
            <div className="w-16 h-16 rounded-full border-4 border-gray-150 border-t-[#028090] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#028090] animate-pulse" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Building your personalized plan...</h3>
          <p className="text-[#028090] font-medium text-sm animate-pulse max-w-sm mx-auto h-12">
            {loadingText}
          </p>
          <div className="mt-8 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-gray-100 text-xs text-gray-500">
            <Info className="w-3.5 h-3.5 text-[#C4972F]" />
            <span>Configuring premium features: <b>{selectedTier === 'free' ? 'Free Essentials' : selectedTier === 'confident' ? 'Confident Start' : 'White Glove'}</b></span>
          </div>
        </div>
      ) : (
        /* Active Wizard Step Panel */
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
          {/* Header Progress Counter */}
          {step > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                <span>Your Roadmap Progress</span>
                <span className="text-[#028090]">Step {step} of 6</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#028090] h-full transition-all duration-300 ease-out" 
                  style={{ width: `${(step / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Wizard Content Slots */}
          
          {/* Step 0: User Name Input */}
          {step === 0 && (
            <div className="animate-fade-in text-center py-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-[#C4972F] bg-[#C4972F]/10 mb-5 uppercase">
                🇨🇦 Welcome to Settlefy
              </span>
              <h2 className="text-3xl font-extrabold text-[#2D3748] tracking-tight mb-3">
                Let's customize your Canada guide.
              </h2>
              <p className="text-gray-500 text-base max-w-md mx-auto mb-8 leading-relaxed">
                Before we begin the 6 questions, what is your preferred name so we can personalize your workspace files?
              </p>
              
              <div className="max-w-md mx-auto">
                <label className="block text-left text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">My First Name</label>
                <input
                  id="user-name-input"
                  type="text"
                  placeholder="e.g. Maria"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNext();
                  }}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 text-[#2D3748] font-medium text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028090] focus:border-transparent transition"
                  autoFocus
                />
                
                <button
                  id="onboarding-step0-next"
                  onClick={handleNext}
                  disabled={!name.trim()}
                  className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
                    name.trim() 
                      ? 'bg-[#028090] text-white hover:bg-[#028090]/90 shadow-md' 
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Start Onboarding Questions <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Question 1: Immigration Status */}
          {step === 1 && (
            <div className="animate-fade-in">
              <span className="text-xs font-bold text-[#028090]/80 uppercase tracking-widest bg-[#028090]/10 px-2 py-0.5 rounded-md mb-2 inline-block">Question 1</span>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-1">What's your Canadian immigration status?</h3>
              <p className="text-gray-400 text-sm mb-6">Each visa category grants different privileges, medical wait periods, and support plans.</p>
              
              <div className="space-y-4">
                {[
                  { value: 'PR holder', title: 'Permanent Resident (PR) Holder', desc: 'Direct access to provincial coverage, federal integration schemes' },
                  { value: 'Work permit', title: 'Work Permit Holder', desc: 'Arriving for employment or open visa; specific work rules' },
                  { value: 'Student', title: 'Study Permit Holder (Student)', desc: 'Enrolled in designated learning institution; unique student insurance requirements' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setStatus(item.value as ImmigrationStatus)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition transition-all cursor-pointer flex items-start gap-4 ${
                      status === item.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-350 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${status === item.value ? 'border-[#028090]' : 'border-gray-200'}`}>
                      {status === item.value && <div className="w-2.5 h-2.5 rounded-full bg-[#028090]"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2D3748]">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Settling Province */}
          {step === 2 && (
            <div className="animate-fade-in">
              <span className="text-xs font-bold text-[#028090]/80 uppercase tracking-widest bg-[#028090]/10 px-2 py-0.5 rounded-md mb-2 inline-block">Question 2</span>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-1">Which province are you settling in?</h3>
              <p className="text-gray-400 text-sm mb-6">Canada manages health, drivers laws, and schooling provincially. Essential files vary.</p>
              
              <div className="space-y-4">
                {[
                  { value: 'Ontario', name: 'Ontario', tag: 'ON', desc: 'Toronto, Ottawa, Mississauga, London' },
                  { value: 'BC', name: 'British Columbia', tag: 'BC', desc: 'Vancouver, Victoria, Burnaby, Kelowna' },
                  { value: 'Alberta', name: 'Alberta', tag: 'AB', desc: 'Calgary, Edmonton, Red Deer, Lethbridge' },
                  { value: 'Quebec', name: 'Quebec', tag: 'QC', desc: 'Montreal, Quebec City, Laval (RAMQ / French rules)' },
                  { value: 'Other', name: 'Other Territory / Province', tag: 'CA', desc: 'Nova Scotia, Manitoba, Saskatchewan, etc.' }
                ].map((prov) => (
                  <button
                    key={prov.value}
                    onClick={() => setProvince(prov.value as Province)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                      province === prov.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-350 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-[#028090] text-sm">
                        {prov.tag}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2D3748]">{prov.name}</h4>
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

          {/* Question 3: Family Situation */}
          {step === 3 && (
            <div className="animate-fade-in">
              <span className="text-xs font-bold text-[#028090]/80 uppercase tracking-widest bg-[#028090]/10 px-2 py-0.5 rounded-md mb-2 inline-block">Question 3</span>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-1">What's your family situation?</h3>
              <p className="text-gray-400 text-sm mb-6">Dependents require registering for schools and child medical insurance cards.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'Single', title: 'Single & Solo', icon: '👤', desc: 'Individual roadmap focus' },
                  { value: 'With partner', title: 'With Partner', icon: '👥', desc: 'Double account / joint ID plans' },
                  { value: 'With dependents', title: 'With Dependents', icon: '👨‍👩‍👧', desc: 'Includes children school, childcare, immunizations' }
                ].map((fam) => (
                  <button
                    key={fam.value}
                    onClick={() => setFamily(fam.value as FamilySituation)}
                    className={`text-left p-6 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between min-h-[160px] ${
                      family === fam.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-350 hover:bg-gray-50/50'
                    }`}
                  >
                    <span className="text-3xl mb-4">{fam.icon}</span>
                    <div>
                      <h4 className="font-bold text-[#2D3748] leading-tight">{fam.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-1">{fam.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4: Employment Status */}
          {step === 4 && (
            <div className="animate-fade-in">
              <span className="text-xs font-bold text-[#028090]/80 uppercase tracking-widest bg-[#028090]/10 px-2 py-0.5 rounded-md mb-2 inline-block">Question 4</span>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-1">What's your employment status in Canada?</h3>
              <p className="text-gray-400 text-sm mb-6">Securing local employment has unique milestones like re-formatting resumes.</p>
              
              <div className="space-y-4">
                {[
                  { value: 'Have a job offer', title: 'I have a job offer already', desc: 'Great! Focus is on work payroll forms, setting up SIN, tax declarations' },
                  { value: 'Looking for work', title: 'I am actively looking for work', desc: 'Priority on standard resume formatting, networking networks, LINC' },
                  { value: 'Other', title: 'Other / Retired / Student focus', desc: 'Basic documentation registries and financial bank buffers setups' }
                ].map((emp) => (
                  <button
                    key={emp.value}
                    onClick={() => setEmployment(emp.value as EmploymentStatus)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-4 ${
                      employment === emp.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-350 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${employment === emp.value ? 'border-[#028090]' : 'border-gray-200'}`}>
                      {employment === emp.value && <div className="w-2.5 h-2.5 rounded-full bg-[#028090]"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2D3748]">{emp.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{emp.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 5: Plan to Arrive */}
          {step === 5 && (
            <div className="animate-fade-in">
              <span className="text-xs font-bold text-[#028090]/80 uppercase tracking-widest bg-[#028090]/10 px-2 py-0.5 rounded-md mb-2 inline-block">Question 5</span>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-1">When did you arrive or plan to arrive?</h3>
              <p className="text-gray-400 text-sm mb-6">Timings help Settlefy calculate realistic countdown alerts for each file.</p>
              
              <div className="space-y-4">
                {[
                  { value: 'Already here', title: 'I have already arrived in Canada', desc: 'Immediate countdown sequence begins. Let\'s get you files completed!' },
                  { value: 'Within 1 month', title: 'Within the next 30 days', desc: 'Prep your document packages now before flying or landing' },
                  { value: 'In 3+ months', title: 'In 3 months or more', desc: 'Early awareness mode. Begin general overseas finance applications' }
                ].map((arr) => (
                  <button
                    key={arr.value}
                    onClick={() => setArrival(arr.value as ArrivalTimeline)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-4 ${
                      arrival === arr.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-350 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${arrival === arr.value ? 'border-[#028090]' : 'border-gray-200'}`}>
                      {arrival === arr.value && <div className="w-2.5 h-2.5 rounded-full bg-[#028090]"></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2D3748]">{arr.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{arr.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 6: Biggest Concern */}
          {step === 6 && (
            <div className="animate-fade-in">
              <span className="text-xs font-bold text-[#028090]/80 uppercase tracking-widest bg-[#028090]/10 px-2 py-0.5 rounded-md mb-2 inline-block">Question 6</span>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-1">What's your biggest concern right now?</h3>
              <p className="text-gray-400 text-sm mb-6">Settlefy will move tasks matching this category to absolute top priority.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'Documentation', title: 'Documentation & ID Card', icon: '📝', desc: 'Getting SIN, health card, provincial driver conversion' },
                  { value: 'Healthcare', title: 'Accessing Medical Services', icon: '🏥', desc: 'Provincial eligibility rules, family doctor clinic search' },
                  { value: 'Housing', title: 'Securing Safe Housing', icon: '🏠', desc: 'Rental platforms tips, fraud prevention, signing a lease' },
                  { value: 'Employment', title: 'Finding Professional Work', icon: '💼', desc: 'Resume restructuring checklists, newcomer employment centers' }
                ].map((con) => (
                  <button
                    key={con.value}
                    onClick={() => setConcern(con.value as BiggestConcern)}
                    className={`text-left p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between min-h-[140px] ${
                      concern === con.value 
                        ? 'border-[#028090] bg-[#028090]/5' 
                        : 'border-gray-150 hover:border-gray-350 hover:bg-gray-50/50'
                    }`}
                  >
                    <span className="text-2xl mb-3">{con.icon}</span>
                    <div>
                      <h4 className="font-bold text-[#2D3748] text-sm leading-tight">{con.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-1">{con.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Controls: Back & Next Buttons */}
          <div className="border-t border-gray-100/80 mt-10 pt-6 flex items-center justify-between">
            {step > 0 ? (
              <button
                id="onboarding-back"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-[#2D3748] font-medium hover:bg-[#FAF7F2] transition flex items-center gap-1.5 cursor-pointer text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step > 0 && (
              <button
                id="onboarding-next"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-[#028090] text-white font-bold hover:bg-[#028090]/90 transition shadow-sm flex items-center gap-1.5 cursor-pointer text-sm"
              >
                {step === 6 ? 'Generate Settlement Guide' : 'Continue'} <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
