import React from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Map,
  Building2,
  Briefcase,
  Mic,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

export const Sidebar = ({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) => {
  const { dailyGoals, solvedProblems, dsaProblems, jobApplications } = useData();

  const navItems = [
    { to: '/app', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    {
      to: '/app/dsa',
      label: 'DSA Practice',
      icon: Code2,
      badge: `${solvedProblems.length}/${dsaProblems.length}`
    },
    { to: '/app/interview', label: 'Interview Library', icon: BookOpen, badge: '50+ Topics' },
    { to: '/app/roadmaps', label: 'Roadmaps', icon: Map, badge: '5 Tracks' },
    { to: '/app/companies', label: 'Company Prep', icon: Building2 },
    {
      to: '/app/tracker',
      label: 'Job Tracker',
      icon: Briefcase,
      badge: `${jobApplications.length}`
    },
    { to: '/app/mock', label: 'Mock Interviews', icon: Mic, badge: 'Simulator' },
    { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/app/settings', label: 'Settings', icon: Settings }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#0B0F19] border-r border-slate-200/80 dark:border-slate-800/80 select-none">
      {/* Top Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              Dev<span className="text-brand-500">Prep</span>
            </span>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors ml-auto"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/25 dark:shadow-brand-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              } ${isCollapsed ? 'justify-center px-2' : ''}`
            }
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Target Card (when expanded) */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-brand-500/5 via-accent-500/5 to-transparent border border-brand-500/20 dark:border-brand-500/10">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              Today's Goal
            </span>
            <span className="text-brand-600 dark:text-brand-400">
              {dailyGoals.completedToday?.problems || 2}/{dailyGoals.problemsTarget || 3} Solved
            </span>
          </div>
          <ProgressBar
            value={dailyGoals.completedToday?.problems || 2}
            max={dailyGoals.problemsTarget || 3}
            size="sm"
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block transition-all duration-300 h-screen sticky top-0 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-white dark:bg-[#0B0F19] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
