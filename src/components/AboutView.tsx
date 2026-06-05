import React from 'react';
import { Mail, Compass, Shield, Users, Heart } from 'lucide-react';

export default function AboutView() {
  const team = [
    {
      name: "Andriy Markiv",
      role: "Co-Founder & Tech Lead",
      origin: "Ukraine • Arrived 2021",
      bio: "Missed the standard 90-day provincial health card sign-up grace period, paying $1,200 out-of-pocket for routine dental/clinical visits. Vowed to write code to prevent this happening to anyone else.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Elena Rostova",
      role: "Co-Founder & Community Lead",
      origin: "Kazakhstan • Arrived 2022",
      bio: "Navigated Ontario newcomer services alone with two school-age children. Spent 40+ hours researching immunization records translations. Now designs Settlefy's family dependency roadmaps.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Marcus Lin",
      role: "Advisor & Financial Strategy",
      origin: "Singapore • Arrived 2019",
      bio: "Help newcomers open optimized credit scoring cards and access federally-backed homebuyer loans. Advises on newcomer packages across Canada's big five financial centers.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <div id="about-view" className="text-[#2D3748] max-w-4xl mx-auto px-4 py-12">
      {/* Story Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-150/60 shadow-sm mb-12">
        <span className="text-xs font-bold text-[#028090] uppercase tracking-widest bg-[#028090]/10 px-3 py-1 rounded-full mb-6 inline-block">
          Our Backstory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D3748] tracking-tight mb-6">
          We built Settlefy because <span className="text-[#028090]">we lived it</span>.
        </h1>
        <p className="text-[#2D3748]/95 text-base sm:text-lg leading-relaxed mb-6">
          "We built Settlefy because we lived it. As newcomers to Canada ourselves, we experienced the confusion, the missed deadlines, and the anxiety of not knowing what to do next. Settlefy is the tool we wished we had on Day 1."
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Moving your entire life to a new country represents one of the most courageously monumental blocks in a lifetime. Yet upon landing, newcomers are often greeted with outdated forum advice, confusing registry forms, and high-pressure fees. We set out to replace that anxiety with clear guidance.
        </p>

        {/* Brand Promise Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          {[
            {
              title: "Calm Mentorship",
              desc: "A warm, trustworthy approach that mimics a friendly local guiding you step-by-step.",
              icon: Compass
            },
            {
              title: "Absolute Accuracy",
              desc: "We monitor provincial agencies constantly to secure accurate paperwork checklists.",
              icon: Shield
            },
            {
              title: "Family Focused",
              desc: "Dedicated school and daycare pipelines because children represent our highest priority.",
              icon: Heart
            }
          ].map((prom, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#028090] mb-3">
                <prom.icon className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#2D3748] mb-1">{prom.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{prom.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Profiles Grid */}
      <section className="mb-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight">The Settlefy Team</h2>
          <p className="text-sm text-gray-450 mt-1">We are immigrants, engineers, parents, and Canadians.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-150/60 shadow-sm flex flex-col justify-between items-center text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 mb-4 bg-gray-50">
                  <img
                    referrerPolicy="no-referrer"
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-base text-[#2D3748]">{member.name}</h3>
                <p className="text-xs text-[#028090] font-semibold">{member.role}</p>
                <p className="text-[10px] text-gray-400 font-bold bg-[#FAF7F2] px-2 py-0.5 rounded mt-1.5">{member.origin}</p>
                
                <p className="text-xs text-gray-400 leading-relaxed mt-4">
                  "{member.bio}"
                </p>
              </div>

              <div className="border-t border-gray-100 w-full mt-6 pt-4">
                <a
                  href="mailto:team@settlefy.ca" 
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#028090] font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" /> Contact Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signoff Banner */}
      <div className="text-center py-6 border-t border-gray-150/60">
        <p className="text-xs text-gray-400">
          Settlefy Canada © 2026 • Toronto | Vancouver. Made with ❤️ by Canada's newcomer community.
        </p>
      </div>
    </div>
  );
}
