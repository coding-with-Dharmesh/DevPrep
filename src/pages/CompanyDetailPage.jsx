import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COMPANIES } from '../data/mockCompanies';
import { useToast } from '../context/ToastContext';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Circle,
  Clock,
  Layers,
  Sparkles,
  MapPin,
  ExternalLink,
  HelpCircle,
  ShieldAlert,
  Award
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const CompanyDetailPage = () => {
  const { id } = useParams();
  const { success } = useToast();
  const company = MOCK_COMPANIES.find((c) => c.id === id);

  const [completedChecklist, setCompletedChecklist] = useState([]);

  if (!company) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Company Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested company guide does not exist.</p>
        <Link to="/app/companies">
          <Button variant="primary" className="mt-4">
            Back to Companies
          </Button>
        </Link>
      </div>
    );
  }

  const toggleChecklistItem = (itemText) => {
    setCompletedChecklist((prev) =>
      prev.includes(itemText)
        ? prev.filter((t) => t !== itemText)
        : [...prev, itemText]
    );
    success('Checklist updated.');
  };

  return (
    <div className="space-y-6">
      {/* Header and Back link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/app/companies"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${company.logoColor} flex items-center justify-center text-white font-bold text-lg shadow-md`}
            >
              {company.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {company.name} Interview Guide
                </h1>
                <Badge variant={company.difficulty === 'Very High' ? 'Hard' : 'Medium'} size="xs">
                  {company.difficulty} Difficulty
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {company.headquarters} • Typical Timeline: {company.hiringProcessDuration} • Acceptance Rate: {company.acceptanceRate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <Card className="p-5 bg-gradient-to-r from-brand-500/5 via-accent-500/5 to-transparent border-brand-500/20">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          Hiring Philosophy & Expectations
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
          {company.summary}
        </p>
      </Card>

      {/* Main Grid: Rounds & Cultural Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interview Rounds Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-500" />
              Round-by-Round Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {company.interviewRounds.length} Rounds
            </span>
          </div>

          <div className="space-y-3">
            {company.interviewRounds.map((r, idx) => (
              <Card key={idx} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {r.round}
                  </h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {r.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {r.focus}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Cultural Principles & Sample Questions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cultural Principles */}
          <Card className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-accent-500" />
              Core Cultural Principles
            </h3>
            <div className="space-y-2.5">
              {company.culturalPrinciples.map((prin, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800"
                >
                  <h4 className="text-xs font-bold text-brand-600 dark:text-brand-400">
                    {prin.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {prin.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Curated Questions */}
          <Card className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Curated {company.name} Questions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Frequently asked algorithmic questions directly linked to DevPrep's DSA sandbox:
            </p>
            <div className="space-y-2">
              {company.sampleQuestions.map((q) => (
                <Link
                  key={q.id}
                  to={`/app/dsa/${q.id}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white transition-colors group"
                >
                  <span>{q.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Interview Day Checklist */}
          <Card className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Pre-Interview Checklist
            </h3>
            <div className="space-y-2">
              {company.interviewChecklist.map((item) => {
                const isChecked = completedChecklist.includes(item.text);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.text)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer select-none text-xs"
                  >
                    <button type="button" className="mt-0.5 focus:outline-none">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <span
                      className={`leading-snug ${
                        isChecked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
