import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  HelpCircle, 
  AlertTriangle, 
  Lock, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Bookmark,
  TrendingUp,
  FileCheck2,
  BellRing
} from 'lucide-react';
import { Task, OnboardingAnswers } from '../types';

interface DashboardViewProps {
  answers: OnboardingAnswers;
  tasks: Task[];
  onToggleTaskComplete: (taskId: string) => void;
  onNavigate: (hash: string) => void;
  onUpgradeTier: () => void;
}

export default function DashboardView({ 
  answers, 
  tasks, 
  onToggleTaskComplete, 
  onNavigate,
  onUpgradeTier 
}: DashboardViewProps) {
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [simulatedDay, setSimulatedDay] = useState<number>(4); // Default to Day 4

  const isFree = answers.tier === 'free';

  // Calculate statistics
  const totalTasksCount = tasks.length;
  // If free, count only the unlocked ones or all? Let's count total tasks completed out of total tasks.
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const completedCount = completedTasks.length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : 0;
  
  // Urgent items: priority === 'Critical' & not completed
  const urgentTasks = tasks.filter(t => t.priority === 'Critical' && t.status !== 'completed' && !t.lockedOnFree);
  const urgentCount = urgentTasks.length;

  // Filtered tasks display
  const filteredTasks = tasks.filter(t => {
    const matchesWeek = selectedWeekFilter === 'all' || t.week === selectedWeekFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesWeek && matchesCategory;
  });

  // Calculate next upcoming urgent deadline reminder
  const nextDeadlineTask = tasks
    .filter(t => t.status !== 'completed' && !t.lockedOnFree)
    .sort((a, b) => a.dueDateDays - b.dueDateDays)[0];

  // Unique categories for filtering
  const categories = Array.from(new Set(tasks.map(t => t.category)));

  return (
    <div id="dashboard-view" className="text-[#2D3748]">
      {/* Free Plan Upgrade Banner */}
      {isFree && (
        <div className="mb-8 bg-gradient-to-r from-[#028090] to-[#02c0b0] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl mt-1">
              <Sparkles className="w-6 h-6 text-[#C4972F]" />
            </div>
            <div>
              <span className="bg-white/20 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Currently on Free Essentials Suite
              </span>
              <h4 className="text-lg font-bold mt-1">Unlock your complete 90-day settlement roadmap!</h4>
              <p className="text-white/85 text-sm mt-0.5 max-w-xl">
                You only see 3 core tasks. Upgrade to <b>Confident Start</b> to unlock all 12 tasks, documents checklists, agency locations, and deadline notifications.
              </p>
            </div>
          </div>
          <button
            id="dashboard-upgrade-btn"
            onClick={onUpgradeTier}
            className="bg-white text-[#028090] hover:bg-[#FAF7F2] transition font-bold px-5 py-2.5 rounded-xl text-sm whitespace-nowrap self-stretch md:self-auto text-center cursor-pointer shadow-sm"
          >
            Upgrade to Confident Start ($39)
          </button>
        </div>
      )}

      {/* Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#028090] uppercase tracking-widest block mb-1">
            Settlement Workspace • {answers.province} Province
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, <span className="text-[#028090]">{answers.name}</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            You are currently on <span className="font-bold text-[#2D3748]">Day {simulatedDay} of 90</span> (Week {Math.ceil(simulatedDay / 7)}).
          </p>
        </div>

        {/* Change day simulation slider */}
        <div className="bg-white py-2.5 px-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Simulate Day:</span>
          <input 
            type="range" 
            min="1" 
            max="90" 
            value={simulatedDay} 
            onChange={(e) => setSimulatedDay(Number(e.target.value))}
            className="w-24 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#028090]"
          />
          <span className="text-xs font-bold bg-[#FAF7F2] text-[#028090] py-0.5 px-2 rounded border border-gray-150">
            Day {simulatedDay}
          </span>
        </div>
      </div>

      {/* 3 Stat Cards in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Overall Progress</span>
            <TrendingUp className="w-5 h-5 text-[#028090]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-black text-[#2D3748]">{progressPercent}%</span>
              <span className="text-xs text-gray-400">completed</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#028090] h-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tasks Completed Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Tasks Completed</span>
            <FileCheck2 className="w-5 h-5 text-[#C4972F]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#2D3748]">{completedCount}</span>
              <span className="text-sm text-gray-400 font-medium">/ {totalTasksCount} tasks complete</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {isFree ? 'Upgrade to unlock remaining 9 premium tasks' : 'Keep checking off items to increase your score'}
            </p>
          </div>
        </div>

        {/* Urgent Items Card */}
        <div className={`bg-white p-6 rounded-2xl border shadow-sm transition-all flex flex-col justify-between ${
          urgentCount > 0 ? 'border-l-4 border-l-[#D85A30] border-gray-150/50' : 'border-gray-150/60'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Urgent Milestones</span>
            <AlertTriangle className={`w-5 h-5 ${urgentCount > 0 ? 'text-[#D85A30]' : 'text-gray-300'}`} />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black ${urgentCount > 0 ? 'text-[#D85A30]' : 'text-gray-400'}`}>
                {urgentCount}
              </span>
              <span className="text-sm text-gray-400 font-medium">unresolved criticals</span>
            </div>
            <p className={`text-xs mt-2 ${urgentCount > 0 ? 'text-[#D85A30]/80 font-medium' : 'text-gray-400'}`}>
              {urgentCount > 0 ? 'Address week 1 tasks to avoid delays' : 'All urgent milestone files on schedule'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Section Filter & Lists */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150/60 shadow-sm">
        {/* Filters Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#2D3748]">Roadmap Milestones</h3>
            <p className="text-xs text-gray-400 mt-1">View customized tasks sequenced based on timeline and priority weightings.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Week selector */}
            <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-gray-150/50">
              <button
                onClick={() => setSelectedWeekFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedWeekFilter === 'all' 
                    ? 'bg-[#028090] text-white' 
                    : 'text-[#2D3748]/70 hover:bg-gray-100'
                }`}
              >
                All Weeks
              </button>
              {[1, 2, 3, 5].map((wk) => (
                <button
                  key={wk}
                  onClick={() => setSelectedWeekFilter(wk)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedWeekFilter === wk 
                      ? 'bg-[#028090] text-white' 
                      : 'text-[#2D3748]/70 hover:bg-gray-100'
                  }`}
                >
                  W{wk}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs font-bold bg-[#FAF7F2] border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#028090] cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div id="dashboard-tasks-list" className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p className="text-sm font-medium">No tasks match your chosen filters.</p>
              <button 
                onClick={() => { setSelectedWeekFilter('all'); setCategoryFilter('all'); }}
                className="text-[#028090] font-bold text-xs mt-2 underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const matchesConcern = task.applicableConcern === answers.concern || task.category === answers.concern;
              
              if (task.lockedOnFree) {
                // Blurred Locked Task Representation for Free Plan
                return (
                  <div 
                    key={task.id} 
                    className="relative group p-6 rounded-2xl border border-gray-100/70 bg-[#FAF7F2]/20 select-none overflow-hidden"
                  >
                    {/* Locked content blur */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center p-4">
                      <div className="text-center max-w-sm bg-white p-4 sm:p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-[#C4972F] mb-2">
                          <Lock className="w-4 h-4" />
                        </div>
                        <h5 className="font-bold text-xs text-[#2D3748]">Locked Task: {task.title.substring(0, 15)}...</h5>
                        <p className="text-[10px] text-gray-400 mt-1 mb-3">Upgrade to Confident Start for guides, checklist & maps.</p>
                        <button
                          onClick={onUpgradeTier}
                          className="bg-[#028090] text-white hover:bg-[#028090]/90 text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          Unlock All Tasks
                        </button>
                      </div>
                    </div>

                    {/* Background blurred list representation */}
                    <div className="opacity-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Circle className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase">Week {task.week}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Important</span>
                          </div>
                          <h4 className="font-bold text-gray-400 leading-tight">{task.title}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Active interactable Task
              return (
                <div 
                  key={task.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:shadow-md ${
                    task.status === 'completed'
                      ? 'border-emerald-100 bg-emerald-50/10'
                      : 'border-gray-150/70 bg-white hover:border-[#028090]/40'
                  }`}
                  onClick={() => onNavigate(`#/task/${task.id}`)}
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Status Circle checkbox handler */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // don't open task detail
                        onToggleTaskComplete(task.id);
                      }}
                      className="mt-1 flex-shrink-0 text-gray-450 hover:text-[#028090] transition focus:outline-none cursor-pointer"
                    >
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 group-hover:border-gray-400" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Week {task.week}
                        </span>
                        
                        {/* Priority Badge */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          task.priority === 'Critical'
                            ? 'bg-[#D85A30]/10 text-[#D85A30]'
                            : task.priority === 'Important'
                            ? 'bg-[#028090]/10 text-[#028090]'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {task.priority}
                        </span>

                        {/* Category Badge */}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-gray-50 text-[#2D3748]/60 font-semibold uppercase">
                          {task.category}
                        </span>

                        {/* Concern Booster Indicator */}
                        {matchesConcern && (
                          <span className="text-[10px] font-bold text-[#C4972F] bg-[#C4972F]/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Sparkles className="w-3" /> Focus Alert
                          </span>
                        )}
                      </div>

                      <h4 className={`font-bold text-base tracking-tight leading-snug ${
                        task.status === 'completed' ? 'text-gray-400 line-through' : 'text-[#2D3748]'
                      }`}>
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 lines-clamp-1 truncate max-w-xl">
                        {task.whatAndWhy}
                      </p>
                    </div>
                  </div>

                  {/* Due Date Indicator or Chevron */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-gray-50 pt-3 sm:pt-0">
                    <div className="text-right flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">Due around</span>
                      <span className="text-xs font-bold text-[#2D3748]">
                        Day {task.dueDateDays}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 hidden sm:block" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Persistent Bottom Deadline Reminder Banner */}
      {nextDeadlineTask && (
        <div className="mt-8 bg-[#FAF7F2] rounded-2xl p-4 sm:px-6 sm:py-5 border border-l-4 border-l-[#D85A30] border-gray-150/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in text-[#2D3748]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D85A30]/10 flex items-center justify-center text-[#D85A30] flex-shrink-0">
              <BellRing className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Next Upcoming Deadline</span>
              <p className="text-sm font-bold text-[#2D3748] mt-0.5">
                {nextDeadlineTask.title} — <span className="text-[#D85A30]">Due around Day {nextDeadlineTask.dueDateDays}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate(`#/task/${nextDeadlineTask.id}`)}
            className="text-xs font-bold text-[#028090] bg-[#028090]/10 hover:bg-[#028090]/15 transition px-3.5 py-2 rounded-lg flex items-center gap-1 cursor-pointer self-stretch sm:self-auto text-center justify-center"
          >
            Open Step Guide <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
