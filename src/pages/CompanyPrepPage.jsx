import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_COMPANIES } from '../data/mockCompanies';
import {
  Building2,
  ArrowRight,
  Clock,
  Layers,
  MapPin,
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const CompanyPrepPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-brand-500" />
            Company-Specific Interview Prep
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Deep dive into hiring rubrics, round breakdowns, leadership principles, and top questions for premier tech employers.
          </p>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COMPANIES.map((company) => (
          <Card
            key={company.id}
            hover
            className="flex flex-col justify-between h-full group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${company.logoColor} flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform`}
                >
                  {company.name[0]}
                </div>

                <Badge variant={company.difficulty === 'Very High' ? 'Hard' : 'Medium'} size="xs">
                  {company.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  {company.name}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  ({company.ticker})
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{company.headquarters}</span>
                <span>•</span>
                <span>{company.hiringProcessDuration}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                {company.summary}
              </p>

              {/* Rounds count & Top Topics */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                  Top Interview Focus:
                </span>
                <div className="flex flex-wrap gap-1">
                  {company.topTopics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Link to detail */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link to={`/app/companies/${company.id}`} className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between group-hover:bg-brand-50 dark:group-hover:bg-brand-950/40 group-hover:border-brand-500/40 group-hover:text-brand-600 dark:group-hover:text-brand-400"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View Interview Guide & Checklist
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
