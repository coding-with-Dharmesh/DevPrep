import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import {
  Settings,
  User,
  Target,
  Moon,
  Sun,
  Download,
  RotateCcw,
  ShieldCheck,
  Check,
  Sparkles,
  Building2,
  Trash2
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const { dailyGoals, updateGoals, exportAllData, resetAllData } = useData();
  const { success, info } = useToast();

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    targetRole: user?.targetRole || '',
    experience: user?.experience || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  // Goals Form State
  const [goalsForm, setGoalsForm] = useState({
    problemsTarget: dailyGoals.problemsTarget || 3,
    hoursTarget: dailyGoals.hoursTarget || 2,
    interviewsTarget: dailyGoals.interviewsTarget || 1
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    success('Profile updated successfully! ✨');
  };

  const handleGoalsSave = (e) => {
    e.preventDefault();
    updateGoals(goalsForm);
  };

  const handleExport = () => {
    exportAllData();
    success('Exported your study progress backup JSON! 📦');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all demo study data, bookmarks, and tracker applications?')) {
      resetAllData();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-brand-500" />
          Settings & Study Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your profile, daily study targets, visual theme, and data storage.
        </p>
      </div>

      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <User className="w-5 h-5 text-brand-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Personal Profile & Career Targets
          </h2>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={profileForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
              alt={profileForm.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/40"
            />
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Avatar Image URL
              </label>
              <input
                type="url"
                value={profileForm.avatar}
                onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Role
              </label>
              <input
                type="text"
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={profileForm.targetRole}
                onChange={(e) => setProfileForm({ ...profileForm, targetRole: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Experience
              </label>
              <input
                type="text"
                value={profileForm.experience}
                onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Bio / Elevator Pitch
            </label>
            <textarea
              rows={3}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="gradient" size="sm" leftIcon={<Check className="w-4 h-4" />}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Daily Study Goals Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Target className="w-5 h-5 text-brand-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Daily Study Goals & Habits
          </h2>
        </div>

        <form onSubmit={handleGoalsSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily DSA Target (Problems)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={goalsForm.problemsTarget}
                onChange={(e) => setGoalsForm({ ...goalsForm, problemsTarget: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Study Target (Hours)
              </label>
              <input
                type="number"
                min="0.5"
                max="12"
                step="0.5"
                value={goalsForm.hoursTarget}
                onChange={(e) => setGoalsForm({ ...goalsForm, hoursTarget: parseFloat(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Mock Assessments
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={goalsForm.interviewsTarget}
                onChange={(e) => setGoalsForm({ ...goalsForm, interviewsTarget: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="sm">
              Update Goals
            </Button>
          </div>
        </form>
      </Card>

      {/* Visual Theme Mode */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {isDark ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              Appearance & Theme
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Current mode: <strong className="capitalize">{theme}</strong>. Saved persistently to your device.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            leftIcon={isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          >
            Switch to {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
      </Card>

      {/* Data Management & Backup */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Data Backup & Privacy
          </h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          All your progress, completed algorithmic problems, mock interview logs, bookmarks, and job applications are securely saved locally on this browser using HTML5 LocalStorage. Never any passwords or credentials.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export All Data (JSON)
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={handleReset}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Reset Demo Data
          </Button>
        </div>
      </Card>
    </div>
  );
};
