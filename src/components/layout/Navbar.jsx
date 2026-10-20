import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Sun,
  Moon,
  Flame,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Sparkles,
  CheckCircle2,
  Code2,
  ChevronDown
} from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout, loginAsDemo } = useAuth();
  const { dailyGoals } = useData();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Section: Mobile toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/app" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Dev<span className="text-brand-500">Prep</span>
              </span>
              <span className="ml-1.5 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                PRO
              </span>
            </div>
          </Link>
        </div>

        {/* Right Section: Streak, Goals, Theme, User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Study Streak Badge */}
          <div
            title={`${dailyGoals.streakDays} Day Study Streak`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold cursor-pointer select-none"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="hidden xs:inline">{dailyGoals.streakDays} Days</span>
            <span className="xs:hidden">{dailyGoals.streakDays}d</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-dark-bg" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-3 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h4>
                  <span className="text-[11px] font-medium text-brand-500 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">🎯 Daily Goal Progress</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      You solved {dailyGoals.completedToday?.problems || 2} / {dailyGoals.problemsTarget || 3} problems today!
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">💼 Stripe Technical Round</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Follow-up reminder set for Oct 22. Review API systems notes.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">5 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                alt={user?.name || 'User'}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/40"
              />
              <span className="hidden md:block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                {user?.name || 'Alex Rivera'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
                    {user?.targetRole || 'Software Engineer'}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    to="/app/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings & Goals
                  </Link>

                  <button
                    onClick={() => {
                      loginAsDemo(user?.experience?.includes('5') ? 'junior' : 'senior');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors text-left"
                  >
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    Switch Demo Profile
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
