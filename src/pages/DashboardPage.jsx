import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  Code2,
  Flame,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Mic,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const DashboardPage = () => {
  const { user } = useAuth();
  const {
    dailyGoals,
    solvedProblems,
    dsaProblems,
    jobApplications,
    mockHistory,
    analyticsData,
    roadmapProgress
  } = useData();

  // Difficulty counts calculation
  const easySolved = solvedProblems.filter(id => {
    const p = dsaProblems.find(item => item.id === id);
    return p && p.difficulty === 'Easy';
  }).length;

  const mediumSolved = solvedProblems.filter(id => {
    const p = dsaProblems.find(item => item.id === id);
    return p && p.difficulty === 'Medium';
  }).length;

  const hardSolved = solvedProblems.filter(id => {
    const p = dsaProblems.find(item => item.id === id);
    return p && p.difficulty === 'Hard';
  }).length;

  const difficultyPieData = [
    { name: 'Easy', value: easySolved + 24, color: '#10b981' },
    { name: 'Medium', value: mediumSolved + 38, color: '#f59e0b' },
    { name: 'Hard', value: hardSolved + 12, color: '#ef4444' }
  ];

  const totalCalculatedSolved = easySolved + mediumSolved + hardSolved + 74;

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 p-6 sm:p-8 text-white shadow-xl shadow-brand-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target Role: {user?.targetRole || 'Senior Software Engineer'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Engineer'}! 👋
            </h1>
            <p className="mt-2 text-white/90 text-sm max-w-xl">
              You are currently on a <strong className="text-amber-300 font-bold">{dailyGoals.streakDays}-day study streak</strong>. Keep solving algorithmic problems and refining your system design skills!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/app/dsa">
              <Button
                variant="secondary"
                size="md"
                className="bg-white text-brand-700 hover:bg-slate-100 font-semibold shadow-md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Practice Problems
              </Button>
            </Link>
            <Link to="/app/mock">
              <Button
                variant="outline"
                size="md"
                className="border-white/40 text-white hover:bg-white/15"
                leftIcon={<Mic className="w-4 h-4" />}
              >
                Start Mock
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Problems Solved"
          value={totalCalculatedSolved}
          subtitle={`${solvedProblems.length} solved this session`}
          icon={Code2}
          accentColor="indigo"
          trend="+12%"
          trendPositive={true}
        />
        <StatCard
          title="Study Streak"
          value={`${dailyGoals.streakDays} Days`}
          subtitle="Consistent daily habit"
          icon={Flame}
          accentColor="amber"
          trend="+3 days"
          trendPositive={true}
        />
        <StatCard
          title="Active Job Pipeline"
          value={jobApplications.length}
          subtitle={`${jobApplications.filter(j => j.status.includes('Interview')).length} in interview stages`}
          icon={Briefcase}
          accentColor="purple"
          trend="2 upcoming"
          trendPositive={true}
        />
        <StatCard
          title="Mock Interviews"
          value={mockHistory.length}
          subtitle="Average score: 88%"
          icon={Mic}
          accentColor="emerald"
          trend="Top 15%"
          trendPositive={true}
        />
      </div>

      {/* Daily Study Goals Widget */}
      <Card className="relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-500" />
              Today's Preparation Goals
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Consistent daily practice builds long-term recall and interview endurance.
            </p>
          </div>
          <Link to="/app/settings">
            <Button variant="ghost" size="sm" className="text-xs">
              Adjust Targets
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-700 dark:text-slate-300">DSA Problems</span>
              <span className="text-brand-600 dark:text-brand-400">
                {dailyGoals.completedToday?.problems || 2} / {dailyGoals.problemsTarget || 3}
              </span>
            </div>
            <ProgressBar
              value={dailyGoals.completedToday?.problems || 2}
              max={dailyGoals.problemsTarget || 3}
              colorClass="from-brand-500 to-indigo-600"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-700 dark:text-slate-300">Study Time</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {dailyGoals.completedToday?.hours || 1.5}h / {dailyGoals.hoursTarget || 2}h
              </span>
            </div>
            <ProgressBar
              value={dailyGoals.completedToday?.hours || 1.5}
              max={dailyGoals.hoursTarget || 2}
              colorClass="from-emerald-500 to-teal-600"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-700 dark:text-slate-300">Mock Assessments</span>
              <span className="text-purple-600 dark:text-purple-400">
                {dailyGoals.completedToday?.interviews || 0} / {dailyGoals.interviewsTarget || 1}
              </span>
            </div>
            <ProgressBar
              value={dailyGoals.completedToday?.interviews || 0}
              max={dailyGoals.interviewsTarget || 1}
              colorClass="from-accent-500 to-purple-600"
            />
          </div>
        </div>
      </Card>

      {/* Main Charts Grid: 14-day Study Trend & Difficulty Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Trend (2 cols) */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Study Activity & Problem Volume (Last 14 Days)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daily hours logged and algorithmic questions completed
              </p>
            </div>
            <Badge variant="primary" size="xs">
              Daily Tracking
            </Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.studyActivity}>
                <defs>
                  <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderColor: '#374151',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="problems"
                  name="Problems Solved"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProblems)"
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  name="Hours Studied"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Difficulty Breakdown (1 col) */}
        <Card className="flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Solved Problem Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Difficulty spread across categories
            </p>
          </div>

          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {difficultyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderColor: '#374151',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {totalCalculatedSolved}
              </span>
              <span className="text-[10px] text-slate-400">Total Solved</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
            {difficultyPieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.value} solved
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section: Quick Resume Modules & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Launch Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Continue Your Journey
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quick DSA Card */}
            <Card hover className="group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="Hard" size="xs">
                    Recommended DSA
                  </Badge>
                  <span className="text-xs text-slate-400">Google, Amazon</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  Trapping Rain Water
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Compute how much water an elevation map traps after raining using Two Pointers.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                  Solve in Sandbox
                </span>
                <Link to="/app/dsa/trapping-rain-water">
                  <Button variant="ghost" size="sm" className="p-1 h-auto text-brand-500">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Quick Interview Concept Card */}
            <Card hover className="group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="purple" size="xs">
                    System Design
                  </Badge>
                  <span className="text-xs text-slate-400">Architecture</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-accent-500 transition-colors">
                  Design a Distributed Rate Limiter
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  Token Bucket vs Sliding Window Counter algorithms with Redis atomic transactions.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-accent-600 dark:text-accent-400 font-semibold">
                  Read Study Notes
                </span>
                <Link to="/app/interview">
                  <Button variant="ghost" size="sm" className="p-1 h-auto text-accent-500">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity Feed (1 col) */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h3>
            <span className="text-xs text-brand-500 font-semibold cursor-pointer">Live</span>
          </div>

          <div className="space-y-3">
            {analyticsData.recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-xs"
              >
                <div className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white leading-tight">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-1">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
