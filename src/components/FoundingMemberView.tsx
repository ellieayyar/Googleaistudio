import React from 'react';
import { 
  Sparkles, 
  Check, 
  Gift, 
  MessageSquare, 
  Award, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

export default function FoundingMemberView() {
  return (
    <div id="founding-member-view" className="text-[#2D3748] max-w-5xl mx-auto px-4 py-8">
      
      {/* Urgency Ribbon / Top Notification */}
      <div className="bg-[#C4972F] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-2xl shadow-sm text-center mb-8 flex items-center justify-center gap-2 animate-pulse">
        <Clock className="w-4 h-4" />
        <span>Only 30 spots — closes July 15th or when full</span>
      </div>

      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-150/70 shadow-sm mb-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#028090]/5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C4972F]/5 rounded-tr-full pointer-events-none"></div>

        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-[#C4972F] bg-[#C4972F]/10 mb-6 uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Founding Member Invitation
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D3748] tracking-tight mb-6 max-w-4xl mx-auto leading-[1.15]">
          Stop wasting your first 30 days in Canada figuring out what <span className="text-[#028090]">we've already figured out</span> for you.
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          Join as a Founding Member before July 15th — only 30 spots available.
        </p>
      </section>

      {/* Bento Grid / Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* WHAT YOU GET Section */}
        <div className="bg-white rounded-3xl p-8 border border-gray-150/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#028090]/10 text-[#028090] flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#2D3748]">What You Get as a Founder</h2>
            </div>

            <ul className="space-y-5">
              {[
                {
                  title: "Lifetime Price Lock ($5 Forever)",
                  desc: "Get full Settlefy access locked in forever at just $5 (standard public price is $15). Never pay more.",
                  icon: DollarSign
                },
                {
                  title: "Direct Founder Access",
                  desc: "Enjoy direct messaging/support lines with the founders to help navigate your settlement steps smoothly.",
                  icon: MessageSquare
                },
                {
                  title: "Shape Settlefy's Roadmap",
                  desc: "Your questions and feedback will directly shape what features, integrations, and tools Settlefy builds next.",
                  icon: Sparkles
                },
                {
                  title: "Exclusive Founding Badge",
                  desc: "Get a proud Founding Member status badge on your portal that no future user can ever claim.",
                  icon: Award
                }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#028090] flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D3748]">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WHAT SETTLEFY DOES FOR YOU Section */}
        <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-gray-150/50 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#028090] text-white flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#2D3748]">What Settlefy Does For You</h2>
          </div>

          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Your interactive timeline makes your first weeks in Canada a simple checklist:
          </p>

          <div className="space-y-4">
            {[
              "Apply for your SIN without missing the window",
              "Open a no-fee Canadian bank account within your first week",
              "Register for provincial health coverage",
              "Know what documents you need and in what order",
              "Avoid the expensive mistakes most newcomers make in year one"
            ].map((text, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150/40 shadow-xs flex items-center gap-3">
                <Check className="w-5 h-5 text-[#028090] shrink-0" />
                <span className="text-xs font-bold text-[#2D3748]">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pricing Block & Guarantee Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-12">
        
        {/* Pricing Block (Col Span 7) */}
        <div className="md:col-span-7 bg-white rounded-3xl p-8 border-2 border-[#028090] shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#028090] text-white text-[10px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-xl">
            Limited Founding Offer
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#2D3748]">Founding Member Spot</h3>
            <p className="text-xs text-gray-500 mt-1">Lock in the lowest rate we will ever offer.</p>

            <div className="flex items-baseline gap-4 my-8">
              <span className="text-5xl font-black text-[#2D3748]">$5</span>
              <span className="text-gray-400 text-sm line-through font-bold">$15 Original</span>
              <span className="text-[#028090] bg-[#028090]/10 text-xs font-bold px-2 py-1 rounded">Save 66%</span>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              You will be redirected to Ko-fi to claim your slot safely. Upon claiming, we will immediately unlock your lifetime access credential for your custom Settlefy profile.
            </p>
          </div>

          <a
            href="https://ko-fi.com/s/cac235f046"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-[#028090] hover:bg-[#028090]/90 text-white font-bold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-center text-sm cursor-pointer"
          >
            Claim my founding member spot <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Guarantee Card (Col Span 5) */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-3xl p-8 border border-gray-150/60 shadow-sm flex flex-col justify-center text-center space-y-6 relative">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          
          <h3 className="text-lg font-bold text-[#2D3748]">Double-Clarity Guarantee</h3>
          
          <p className="text-xs text-gray-500 leading-relaxed italic">
            "30-day full refund guarantee — if Settlefy doesn't save you at least 10 hours of confusion in your first 30 days, you get every dollar back. No questions asked."
          </p>

          <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
            No risk • 100% money back promise
          </p>
        </div>

      </div>

    </div>
  );
}
