import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  HelpCircle, 
  ListOrdered, 
  FileText, 
  ExternalLink, 
  Check, 
  Clock, 
  AlertCircle,
  Building,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { Task, Province } from '../types';

interface TaskDetailViewProps {
  task: Task;
  userProvince: Province;
  onToggleComplete: () => void;
  onToggleDocCheck: (docText: string) => void;
  onNavigate: (hash: string) => void;
}

export default function TaskDetailView({ 
  task, 
  userProvince,
  onToggleComplete, 
  onToggleDocCheck, 
  onNavigate 
}: TaskDetailViewProps) {
  
  const isCompleted = task.status === 'completed';

  return (
    <div id={`task-detail-${task.id}`} className="max-w-3xl mx-auto px-4 py-8 text-[#2D3748]">
      {/* Back Link Row */}
      <button
        onClick={() => onNavigate('#/dashboard')}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#028090] hover:text-[#028090]/80 mb-6 transition cursor-pointer"
        id="task-detail-back"
      >
        <ArrowLeft className="w-4 h-4" /> Back to settlement dashboard
      </button>

      {/* Header Hero Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150/60 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Priority Badge */}
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              task.priority === 'Critical'
                ? 'bg-[#D85A30]/10 text-[#D85A30]'
                : task.priority === 'Important'
                ? 'bg-[#028090]/10 text-[#028090]'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {task.priority} Priority
            </span>

            {/* Week Badge */}
            <span className="text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
              Week {task.week} Milestone
            </span>

            {/* Category tag */}
            <span className="text-xs font-bold text-[#C4972F] bg-[#C4972F]/10 px-2 py-0.5 rounded">
              {task.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#2D3748] tracking-tight leading-tight">
            {task.title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-2">
            <CalendarDays className="w-4 h-4 text-gray-300" />
            <span>Target completion: Around <b>Day {task.dueDateDays}</b> of landing</span>
          </div>
        </div>

        {/* Action Toggle complete button */}
        <button
          id="task-toggle-complete-btn"
          onClick={onToggleComplete}
          className={`px-6 py-3.5 rounded-xl font-bold transition duration-150 shadow-sm self-stretch md:self-auto text-center cursor-pointer text-sm flex items-center justify-center gap-2 ${
            isCompleted 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
              : 'bg-[#028090] hover:bg-[#028090]/90 text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4 stroke-[3px]" /> Completed (Click to Reopen)
            </>
          ) : (
            'Mark Task Complete'
          )}
        </button>
      </div>

      {/* Grid for Cards */}
      <div className="space-y-6">
        
        {/* Card 1: What & Why */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150/60 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#028090]/10 flex items-center justify-center text-[#028090]">
              <HelpCircle className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-lg font-bold text-[#2D3748]">What & Why it matters</h3>
          </div>
          <p className="text-[#2D3748]/80 text-base leading-relaxed">
            {task.whatAndWhy}
          </p>
        </div>

        {/* Card 2: Where & When */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150/60 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#C4972F]/10 flex items-center justify-center text-[#C4972F]">
              <Building className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-lg font-bold text-[#2D3748]">Where to file / go</h3>
          </div>
          <p className="text-[#2D3748]/80 text-base leading-relaxed mb-4">
            {task.whereText}
          </p>

          {task.whereLink && (
            <a
              href={task.whereLink}
              target="_blank"
              rel="noopener noreferrer referrerPolicy"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#028090] bg-[#028090]/5 hover:bg-[#028090]/10 px-3.5 py-2 rounded-lg transition"
            >
              Access Official Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Card 3: Required Identity / Paperwork checklist */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150/60 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-lg font-bold text-[#2D3748]">Required Documents Checklist</h3>
          </div>
          <p className="text-xs text-gray-400 mb-6">Government officers are highly strict. Check off each physically printed document before heading out.</p>

          <div className="space-y-3">
            {task.requiredDocs.map((doc, idx) => (
              <button
                key={idx}
                onClick={() => onToggleDocCheck(doc.text)}
                className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 cursor-pointer ${
                  doc.checked 
                    ? 'border-emerald-100 bg-emerald-50/10' 
                    : 'border-gray-150 hover:bg-gray-50/50'
                }`}
              >
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center ${
                  doc.checked ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 bg-white'
                }`}>
                  {doc.checked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                </div>
                <span className={`text-sm font-medium leading-normal ${
                  doc.checked ? 'text-gray-400 line-through font-normal' : 'text-[#2D3748]'
                }`}>
                  {doc.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card 4: How Steps */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150/60 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#D85A30]">
              <ListOrdered className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-lg font-bold text-[#2D3748]">Step-by-step Instructions</h3>
          </div>

          <div className="space-y-6 relative border-l-2 border-dashed border-gray-150 pl-5 ml-4">
            {task.howSteps.map((stepStr, idx) => (
              <div key={idx} className="relative">
                {/* Step counter node */}
                <div className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-[#FAF7F2] border-2 border-[#028090] text-[#028090] flex items-center justify-center text-xs font-bold shadow-sm">
                  {idx + 1}
                </div>
                <p className="text-sm text-[#2D3748]/85 leading-relaxed font-medium">
                  {stepStr}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Nav Link */}
      <div className="border-t border-gray-100 mt-10 pt-6 flex justify-between items-center text-xs text-gray-400">
        <span>Settlefy 90-Day Newcomer Framework</span>
        <button
          onClick={() => onNavigate('#/dashboard')}
          className="text-[#028090] font-bold hover:underline cursor-pointer"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
