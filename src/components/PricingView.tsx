import React, { useState } from 'react';
import { Check, HelpCircle, ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react';

interface PricingViewProps {
  onNavigate: (hash: string) => void;
  onSelectTier: (tier: 'free' | 'confident' | 'whiteglove') => void;
}

export default function PricingView({ onNavigate, onSelectTier }: PricingViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSelect = (tier: 'free' | 'confident' | 'whiteglove') => {
    onSelectTier(tier);
    onNavigate('#/get-started');
  };

  const faqs = [
    {
      q: "When is the best time to purchase Settlefy?",
      a: "The ideal window is 30 days before arrival up to your first 15 days in Canada. However, if you are already here, Settlefy immediately recalibrates tasks to match your current day, catching any milestones you might have accidentally missed."
    },
    {
      q: "What makes this different from immigration consultancies?",
      a: "Consultants charge $150–$300/hour to handle physical visa applications. Settlefy does not handle visas—we handle your practical checklist *after* arrival (opening banks, getting health cards, local driver licenses, finding rentals). We prevent you from paying high hourly consult rates just to receive basic address lines."
    },
    {
      q: "Can I change my settling province midway?",
      a: "Yes! If your plans change from Ontario to BC or Alberta, you can instantly reconfigure your settling province under settings. Your document tasks will regenerate instantly matching your new province's rules."
    },
    {
      q: "Is there a recurring subscription?",
      a: "No. Settlefy is a one-time fixed purchase ($39 for Confident Start or $199 for White Glove) for 90 days. We do not store credit card files for auto-renewal loop bills."
    },
    {
      q: "Does Settlefy assist with job search?",
      a: "Under Confident Start, we provide step-by-step guidelines to reformat your resume to Canadian standards, set up professional networking channels, and provide links to government-funded employment bureaus. We do not directly apply to jobs on your behalf."
    }
  ];

  return (
    <div id="pricing-view" className="text-[#2D3748] max-w-6xl mx-auto px-4 py-12">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold text-[#028090] uppercase tracking-widest bg-[#028090]/10 px-3 py-1 rounded-full">
          One-Time Payment • Instant Access
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2D3748] tracking-tight mt-4 mb-4">
          Invest in a stress-free landing.
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Save weeks of administrative delays, insurance coverage gaps, and hidden newcomer banking fees.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto mb-20">
        
        {/* Tier 1: Free Essentials */}
        <div className="bg-white rounded-3xl p-8 border border-gray-150 shadow-sm flex flex-col justify-between relative">
          <div>
            <h3 className="text-xl font-bold">Free Essentials</h3>
            <p className="text-gray-400 text-xs mt-1">Get an overview of key steps</p>
            
            <div className="my-8">
              <span className="text-5xl font-black">$0</span>
              <span className="text-gray-400 text-sm"> / one-time</span>
            </div>
            
            <div className="border-t border-gray-150/60 my-6"></div>
            
            <ul className="space-y-4 mb-8">
              {[
                { text: 'Preview 3 critical priority tasks', available: true },
                { text: 'Basic settlement overview dashboard', available: true },
                { text: 'General resource links list', available: true },
                { text: 'Self-paced checking tracking', available: true },
                { text: 'Full 90-day timeline checklists', available: false },
                { text: 'Interactive document checklist builders', available: false },
                { text: 'Province-specific templates (e.g. OHIP)', available: false },
                { text: 'CRA and Tax setup support', available: false },
                { text: '1:1 onboarding consultation call', available: false },
              ].map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  {feat.available ? (
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <span className="text-sm leading-none text-gray-300 mt-0.5 select-none flex-shrink-0">×</span>
                  )}
                  <span className={feat.available ? 'text-gray-600' : 'text-gray-300'}>
                    {feat.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            id="pricing-full-free"
            onClick={() => handleSelect('free')}
            className="w-full py-4 rounded-xl border border-gray-200 text-[#2D3748] font-bold hover:bg-gray-50 transition cursor-pointer text-center text-sm"
          >
            Start free
          </button>
        </div>

        {/* Tier 2: Confident Start */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#028090] shadow-md flex flex-col justify-between relative">
          <div className="absolute -top-3.5 right-12 bg-gradient-to-r from-[#028090] to-[#C4972F] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Star className="w-3" /> Recommended Choice
          </div>

          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">Confident Start</h3>
                <p className="text-[#028090] text-xs font-semibold mt-1">Our complete digital guidebook</p>
              </div>
              <span className="bg-[#028090]/10 text-[#028090] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Most Popular</span>
            </div>

            <div className="my-8">
              <span className="text-5xl font-black">$39</span>
              <span className="text-gray-400 text-sm"> / one-time</span>
            </div>

            <div className="border-t border-gray-150/60 my-6"></div>

            <ul className="space-y-4 mb-8">
              {[
                { text: 'Preview 3 critical priority tasks', available: true },
                { text: 'Basic settlement overview dashboard', available: true },
                { text: 'General resource links list', available: true },
                { text: 'Self-paced checking tracking', available: true },
                { text: 'Full 90-day timeline (12 tailored tasks)', available: true, highlight: true },
                { text: 'Interactive document checklist builders', available: true },
                { text: 'Province-specific templates (OHIP/MSP/RAMQ)', available: true, highlight: true },
                { text: 'CRA and Tax setup support', available: true },
                { text: 'Weekly countdown alerts & reminders', available: true },
                { text: '1:1 onboarding consultation call', available: false },
              ].map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  {feat.available ? (
                    <Check className="w-4 h-4 text-[#028090] mt-0.5 flex-shrink-0" />
                  ) : (
                    <span className="text-sm leading-none text-gray-300 mt-0.5 select-none flex-shrink-0">×</span>
                  )}
                  <span className={`
                    ${feat.available ? 'text-[#2D3748]/90' : 'text-gray-300'}
                    ${feat.highlight ? 'font-semibold text-[#028090]' : ''}
                  `}>
                    {feat.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            id="pricing-full-premium"
            onClick={() => handleSelect('confident')}
            className="w-full py-4 rounded-xl bg-[#028090] hover:bg-[#028090]/90 text-white font-bold transition shadow-md hover:shadow-lg cursor-pointer text-center text-sm"
          >
            Get your plan
          </button>
        </div>

        {/* Tier 3: White Glove */}
        <div className="bg-white rounded-3xl p-8 border border-gray-150 shadow-sm flex flex-col justify-between relative">
          <div>
            <h3 className="text-xl font-bold text-[#C4972F]">White Glove</h3>
            <p className="text-gray-400 text-xs mt-1">Full service with direct human assistance</p>

            <div className="my-8">
              <span className="text-5xl font-black">$199</span>
              <span className="text-gray-400 text-sm"> / one-time</span>
            </div>

            <div className="border-t border-gray-150/60 my-6"></div>

            <ul className="space-y-4 mb-8">
              {[
                { text: 'Preview 3 critical priority tasks', available: true },
                { text: 'Basic settlement overview dashboard', available: true },
                { text: 'General resource links list', available: true },
                { text: 'Self-paced checking tracking', available: true },
                { text: 'Full 90-day timeline (12 tailored tasks)', available: true },
                { text: 'Interactive document checklist builders', available: true },
                { text: 'Province-specific templates', available: true },
                { text: 'CRA and Tax setup support', available: true },
                { text: '1:1 onboarding consultation call (45 mins)', available: true, highlight: true },
                { text: 'Priority email & portal support (<3h responses)', available: true },
                { text: 'Custom application document filing checks', available: true }
              ].map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  {feat.available ? (
                    <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <span className="text-sm leading-none text-gray-300 mt-0.5 select-none flex-shrink-0">×</span>
                  )}
                  <span className={`
                    ${feat.available ? 'text-gray-600' : 'text-gray-200'}
                    ${feat.highlight ? 'font-semibold text-[#C4972F]' : ''}
                  `}>
                    {feat.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            id="pricing-full-whiteglove"
            onClick={() => handleSelect('whiteglove')}
            className="w-full py-4 rounded-xl border border-[#C4972F]/50 text-[#C4972F] font-bold hover:bg-[#C4972F]/5 transition cursor-pointer text-center text-sm"
          >
            Get white glove
          </button>
        </div>

      </div>

      {/* FAQs Section */}
      <div className="max-w-3xl mx-auto border-t border-gray-150/80 pt-16 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-[#2D3748] tracking-tight">Have questions? We have answers.</h2>
          <p className="text-gray-400 text-xs mt-1">Get the clarity you need before settling.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-gray-150/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-[#2D3748] hover:bg-[#FAF7F2]/40 transition focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-sm text-gray-500 leading-relaxed border-t border-gray-50 bg-[#FAF7F2]/10 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
