import React from 'react';
import SenderForm from './SenderForm';
import { 
  ClipboardCheck, 
  Map, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (hash: string) => void;
  onSelectTier: (tier: 'free' | 'confident' | 'whiteglove') => void;
}

export default function HomeView({ onNavigate, onSelectTier }: HomeViewProps) {
  
  const handleStartOnboarding = (tier: 'free' | 'confident' | 'whiteglove') => {
    onSelectTier(tier);
    onNavigate('#/get-started');
  };

  return (
    <div id="home-view" className="text-[#2D3748]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="absolute inset-0 bg-[radial-gradient(#028090_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#028090] bg-[#028090]/10 mb-6 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#028090]" /> Free Download · No Credit Card
          </span>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2D3748] mb-6 leading-[1.12]">
            Your First 30 Days in Canada. <span className="text-[#028090]">Sorted.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#2D3748]/80 leading-relaxed max-w-2xl mx-auto mb-10">
            A step-by-step checklist of every admin task, document, and deadline — organized by week so nothing falls through the cracks.
          </p>

          {/* Centered Form Container */}
          <div className="w-full max-w-lg mx-auto mb-14 text-left">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm">
              <h3 className="text-lg font-semibold text-[#2D3748] mb-4 text-center sm:text-left">
                Send the free checklist to my inbox
              </h3>
              
              <SenderForm formId="dPNoZ1" />
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                No spam, ever. Unsubscribe in one click.
              </p>
            </div>
          </div>

          <div className="mt-16 p-1 rounded-2xl bg-gradient-to-tr from-[#028090]/10 to-[#C4972F]/10 max-w-3xl mx-auto border border-white/40 shadow-md overflow-hidden">
            <div className="bg-white rounded-[14px] p-6 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase text-[#028090] tracking-wider mb-1">Interactive roadmap sample</p>
                <h4 className="text-base font-bold text-[#2D3748]">Register for Health Card (OHIP/MSP/AHCIP)</h4>
                <p className="text-sm text-gray-500 mt-1">Personalized guide with office locations, paperwork checklists, and submission steps based on your settling province.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 bg-[#FAF7F2] py-2 px-3.5 rounded-lg border border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D85A30]"></span>
                <span className="text-xs font-bold text-[#D85A30] uppercase tracking-wide">Critical week 1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#2D3748]">How It Works</h2>
            <p className="text-gray-500 mt-3 text-base">We have condensed hundreds of hours of bureaucratic research into four clear, stress-free stages.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Answer 6 quick questions',
                desc: 'Select your province, visa category, immediate worries, and family status in under 2 minutes.',
                icon: ClipboardCheck,
                color: 'bg-emerald-50 text-emerald-600'
              },
              {
                step: '2',
                title: 'Get your roadmap',
                desc: 'Our dynamic engine structures your custom checklist ranging from Day 1 to Day 90.',
                icon: Map,
                color: 'bg-cyan-50 text-[#028090]'
              },
              {
                step: '3',
                title: 'Follow weekly tasks',
                desc: 'Access step-by-step instructions, official service links, and accurate documents requirements.',
                icon: Calendar,
                color: 'bg-[#FAF7F2] text-[#C4972F]'
              },
              {
                step: '4',
                title: 'Track your progress',
                desc: 'Check off steps as you go, see your progress grow, and hit critical deadlines without penalty.',
                icon: CheckCircle2,
                color: 'bg-rose-50 text-[#D85A30]'
              }
            ].map((item, id) => (
              <div key={id} className="relative flex flex-col items-start p-6 rounded-2xl bg-[#FAF7F2]/50 border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-lg transition duration-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color} mb-6`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="absolute top-6 right-6 text-5xl font-mono font-bold text-gray-200/50 leading-none">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#2D3748] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Settlefy Section */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#2D3748]">Why Settlefy?</h2>
            <p className="text-gray-500 mt-3 text-base">Moving countries is highly taxing. We substitute panic with quiet confidence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Proactive Guidance',
                badge: 'Before consequences, not after',
                desc: 'Most newcomers learn they missed critical registries Only when they receive unexpected fines or get rejected at walk-in clinics. Settlefy flags milestones weeks before they affect your family.',
                icon: ShieldCheck,
                borderColor: 'border-l-4 border-l-[#D85A30]'
              },
              {
                title: 'Truly Personalized',
                badge: 'Tailored to your status & family',
                desc: 'General Facebook groups offer chaotic, outdated advice. Settlefy generates different lists depending on whether you land in Ontario with school kids, or BC as a single student.',
                icon: Users,
                borderColor: 'border-l-4 border-l-[#028090]'
              },
              {
                title: 'Exceptional Value',
                badge: '$39 vs $200+/hr Consultants',
                desc: 'Hire professional immigration consultants if you must, but avoid paying high hourly rates just to ask where to register a social insurance number. Get fully accurate answers for the cost of one lunch.',
                icon: DollarSign,
                borderColor: 'border-l-4 border-l-[#C4972F]'
              }
            ].map((card, idx) => (
              <div key={idx} className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ${card.borderColor} flex flex-col justify-between`}>
                <div>
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[#2D3748] mb-6">
                    <card.icon className="w-5 h-5 text-[#028090]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D3748] mb-1">{card.title}</h3>
                  <span className="text-xs font-semibold text-[#028090] bg-[#028090]/10 px-2 py-0.5 rounded-md mb-4 inline-block">{card.badge}</span>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof (Testimonials) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#2D3748]">From Those Who Lived It</h2>
            <p className="text-gray-500 mt-2">Authentic feedback from newcomers who navigated the Canadian settlement system.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Nobody told me these health cards, local address proofs, and banking packages existed in an exact sequence until I needed them urgently. Settlefy puts everything in one calm place.",
                author: "Mikhail K.",
                origin: "Ukraine • Settled in Toronto, ON",
                role: "PR Holder"
              },
              {
                quote: "The mental load of shifting countries is so devastating it's worth paying just to get rid of the stress. Following the Settlefy week-by-week dashboard made my first 90 days actually exciting.",
                author: "Priya M.",
                origin: "India • Settled in Vancouver, BC",
                role: "Work Permit"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#FAF7F2] p-8 rounded-2xl relative border border-gray-100 flex flex-col justify-between">
                <span className="text-6xl font-serif text-[#C4972F]/20 absolute top-4 left-4 leading-none select-none">“</span>
                <p className="text-[#2D3748] text-base italic leading-relaxed relative z-10 mb-6">
                  {item.quote}
                </p>
                <div className="border-t border-gray-200/60 pt-4 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-[#2D3748]">{item.author}</h5>
                    <p className="text-xs text-gray-400">{item.origin}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#028090] bg-[#028090]/10 px-2 py-1 rounded">
                    {item.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Lead Magnet Signup Section */}
      <section className="py-20 bg-white border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lead Magnet Details (Left Side) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#028090] bg-[#028090]/10 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#028090]" /> Free Settlement Resource
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D3748]">
                Get Your Free 90-Day Canadian Newcomer Checklist
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Unlock our comprehensive, interactive checklist covering housing, banking, job search secrets, tax setup, and provincial registry timelines. Ready to print or use digitally.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: "45 Actionable Steps", desc: "Divided week-by-week" },
                  { title: "Direct Registry Links", desc: "No more searching for hours" },
                  { title: "Newcomer Tax Advice", desc: "Save on your first filing" },
                  { title: "Printable PDF Format", desc: "Offline reference anywhere" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#028090] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-[#2D3748]">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Container (Right Side) */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden text-center space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#028090]/5 rounded-bl-full pointer-events-none"></div>
                <div className="w-12 h-12 rounded-full bg-[#028090]/10 text-[#028090] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#2D3748]">Download Free Checklist</h3>
                <p className="text-sm text-gray-500">Get the full checklist delivered instantly to your email address.</p>
                
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full py-4 px-6 rounded-xl font-bold bg-[#028090] hover:bg-[#028090]/90 text-white shadow-md transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Get Your Copy For Free <ArrowRight className="w-4 h-4" />
                </button>
                
                <p className="text-[11px] text-gray-400">
                  Secure instant access above inside our layout.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#2D3748]">Clear, Honest Pricing</h2>
            <p className="text-gray-500 mt-3 text-base">Select the plan that aligns with your timeline. Change or upgrade anytime.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Essentials */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col justify-between relative shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#2D3748]">Free Essentials</h3>
                <p className="text-xs text-gray-400 mt-1">Get an overview of key steps</p>
                <div className="my-6">
                  <span className="text-4xl font-bold text-[#2D3748]">$0</span>
                  <span className="text-sm text-gray-400 font-normal"> / 90 days</span>
                </div>
                <div className="border-t border-gray-100 my-4"></div>
                <ul className="space-y-3.5 mb-8">
                  {[
                    'Preview 3 critical priority tasks',
                    'Basic settlement overview dashboard',
                    'General resource links list',
                    'Self-paced checking'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2D3748]/90">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {[
                    'Full 90-day custom roadmap tasks',
                    'Specific agency maps & hours lists',
                    'Personalized document checker items',
                    'Weekly countdown reminders',
                    '1:1 professional consultation'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <span className="text-lg leading-none mt-0.5 flex-shrink-0 text-gray-300">×</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="pricing-free-cta"
                onClick={() => handleStartOnboarding('free')}
                className="w-full py-3 px-4 rounded-xl font-medium border border-gray-200 text-[#2D3748] hover:bg-[#FAF7F2] transition duration-150 cursor-pointer text-center"
              >
                Start free plan
              </button>
            </div>

            {/* Confident Start (Most Popular) */}
            <div className="bg-white p-8 rounded-2xl border-2 border-[#028090] flex flex-col justify-between relative shadow-md">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#028090] text-white text-[11px] font-bold tracking-widest uppercase py-1 px-4 rounded-full">
                Most Popular
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#2D3748]">Confident Start</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C4972F] bg-[#C4972F]/10 px-2 py-0.5 rounded">Highly Recommended</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Our complete digital guidebook</p>
                <div className="my-6">
                  <span className="text-4xl font-bold text-[#2D3748]">$39</span>
                  <span className="text-sm text-gray-400 font-normal"> / 90 days</span>
                </div>
                <div className="border-t border-gray-100 my-4"></div>
                <ul className="space-y-3.5 mb-8">
                  {[
                    'Full interactive 90-day timeline',
                    'Province-specific task templates (OHIP, RAMQ, etc.)',
                    'Interactive, state-persisted document lists',
                    'Local office addresses & operating timetables',
                    'Prioritized roadmap tailored to family size',
                    'Weekly deadline indicators to protect priorities',
                    'Step-by-step immigration reporting guidelines'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2D3748]/90">
                      <Check className="w-4 h-4 text-[#028090] mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {[
                    '1:1 professional consultation call'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <span className="text-lg leading-none mt-0.5 flex-shrink-0 text-gray-300">×</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="pricing-premium-cta"
                onClick={() => handleStartOnboarding('confident')}
                className="w-full py-3.5 px-4 rounded-xl font-medium bg-[#028090] text-white hover:bg-[#028090]/90 transition duration-150 hover:shadow-lg cursor-pointer text-center"
              >
                Start confident plan
              </button>
            </div>

            {/* White Glove */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col justify-between relative shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#2D3748]">White Glove</h3>
                <p className="text-xs text-gray-400 mt-1">Full service with human guidance</p>
                <div className="my-6">
                  <span className="text-4xl font-bold text-[#2D3748]">$199</span>
                  <span className="text-sm text-gray-400 font-normal"> / 90 days</span>
                </div>
                <div className="border-t border-gray-100 my-4"></div>
                <ul className="space-y-3.5 mb-8">
                  {[
                    'Everything in the Confident Start plan',
                    '1:1 initial consultation call (45 mins)',
                    'Custom application file reviews',
                    'Priority support responses (verified under 3h)',
                    'Private newcomer checklist reviews & help',
                    'Translated materials references assistance'
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2D3748]/90">
                      <Check className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="pricing-whiteglove-cta"
                onClick={() => handleStartOnboarding('whiteglove')}
                className="w-full py-3 px-4 rounded-xl font-medium border border-[#C4972F]/50 text-[#C4972F] hover:bg-[#C4972F]/5 transition duration-150 cursor-pointer text-center"
              >
                Start white glove plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[#028090] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you ready to enjoy your transition?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Avoid missed timelines, costly insurance waiting periods, or bank service charges. Get Settlefy now to organize your entire Canadian move.
          </p>
          <button
            id="pricing-banner-start"
            onClick={() => handleStartOnboarding('confident')}
            className="px-8 py-3.5 rounded-xl bg-white text-[#028090] font-semibold hover:bg-gray-100 transition duration-150 shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            Settle Confidently Now
          </button>
        </div>
      </section>
    </div>
  );
}
