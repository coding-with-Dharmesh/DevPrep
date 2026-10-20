import React from 'react';
import { useData } from '../context/DataContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  Code2,
  Clock,
  Target,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { StatCard } from '../components/common/StatCard';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { MOCK_ROADMAPS } from '../data/mockRoadmaps';

export const AnalyticsPage = () => {
  const {
    solvedProblems,
    dsaProblems,
    mockHistory,
    roadmapProgress,
    analyticsData,
    dailyGoals
  } = useData();

  // Difficulty stats
  const easyCount = solvedProblems.filter(id => {
    const p = dsaProblems.find(item => item.id === id);
    return p && p.difficulty === 'Easy';
  }).length + 24;

  const mediumCount = solvedProblems.filter(id => {
    const p = dsaProblems.find(item => item.id === id);
    return p && p.difficulty === 'Medium';
  }).length + 38;

  const hardCount = solvedProblems.filter(id => {
    const p = dsaProblems.find(item => item.id === id);
    return p && p.difficulty === 'Hard';
  }).length + 12;

  const totalSolved = easyCount + mediumCount + hardCount;

  const pieData = [
    { name: 'Easy', value: easyCount, color: '#10b981' },
    { name: 'Medium', value: mediumCount, color: '#f59e0b' },
    { name: 'Hard', value: hardCount, color: '#ef4444' }
  ];

  // Mock performance data for chart
  const mockChartData = mockHistory.map((m, i) => ({
    session: `Mock #${mockHistory.length - i}`,
    score: m.overallScore,
    duration: m.durationMinutes
  })).reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-brand-500" />
            Performance & Preparation Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Quantify your readiness across algorithmic mastery, core engineering domains, and mock interview performance.
          </p>
        </div>

        <Badge variant="primary" size="md">
          Live Tracking Data
        </Badge>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Solved"
          value={totalSolved}
          subtitle="Across 10 DSA categories"
          icon={Code2}
          accentColor="indigo"
          trend="+15%"
          trendPositive={true}
        />
        <StatCard
          title="Overall Interview Score"
          value="88%"
          subtitle="Top 12% benchmark percentile"
          icon={Award}
          accentColor="emerald"
          trend="+6 pts"
          trendPositive={true}
        />
        <StatCard
          title="Active Study Streak"
          value={`${dailyGoals.streakDays} Days`}
          subtitle="Longest: 28 days"
          icon={TrendingUp}
          accentColor="amber"
          trend="+3 days"
          trendPositive={true}
        />
        <StatCard
          title="Hours Logged (14d)"
          value="42.5 hrs"
          subtitle="3.0 hours daily average"
          icon={Clock}
          accentColor="purple"
          trend="+4.2 hrs"
          trendPositive={true}
        />
      </div>

      {/* First Chart Row: Study Activity Area Chart & Difficulty Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Activity (2 cols) */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Study Velocity & Problem Output
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Two-week daily breakdown of problems completed and study hours
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-indigo-500">
                <span className="w-3 h-3 rounded-full bg-indigo-500" /> Problems
              </span>
              <span className="flex items-center gap-1.5 text-purple-500">
                <span className="w-3 h-3 rounded-full bg-purple-500" /> Hours
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.studyActivity}>
                <defs>
                  <linearGradient id="anProblems" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="anHours" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#anProblems)"
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  name="Study Hours"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fill="url(#anHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Difficulty Pie Chart (1 col) */}
        <Card className="flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Difficulty Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Solved questions categorized by challenge level
            </p>
          </div>

          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
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
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                {totalSolved}
              </span>
              <span className="text-[10px] text-slate-400">Total</span>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.value} ({Math.round((item.value / totalSolved) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Second Row: Topic Proficiency Bar Chart & Mock Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Proficiency Horizontal Bars */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Topic Mastery Proficiency (%)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluation based on solved problems and mastered questions
              </p>
            </div>
            <Sparkles className="w-4 h-4 text-brand-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.topicProficiency}
                layout="vertical"
                margin={{ left: 20, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis dataKey="topic" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderColor: '#374151',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="mastered" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Mock Interview Progression */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Mock Interview Performance Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Self-assessed scoring progression across simulated rounds
              </p>
            </div>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData} margin={{ top: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="session" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    borderColor: '#374151',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="score" name="Interview Score (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Third Row: Career Roadmap Progress Summary */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Career Roadmaps Completion Summary
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live checklist completion percentages across all 5 career tracks
            </p>
          </div>
          <Layers className="w-4 h-4 text-brand-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOCK_ROADMAPS.map((r) => {
            let total = 0;
            r.milestones.forEach((m) => {
              total += m.items.length;
            });
            const done = (roadmapProgress[r.id] || []).length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <div
                key={r.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span className="truncate">{r.title.split(' ')[0]} Track</span>
                  <span className="text-brand-600 dark:text-brand-400">{pct}%</span>
                </div>
                <ProgressBar value={done} max={total} size="xs" />
                <span className="text-[10px] text-slate-400 block">
                  {done} of {total} milestones
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
