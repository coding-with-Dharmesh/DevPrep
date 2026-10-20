import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  accentColor = 'indigo'
}) => {
  const accentGradients = {
    indigo: 'from-brand-500/10 to-brand-500/5 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-900/50',
    purple: 'from-accent-500/10 to-accent-500/5 text-accent-600 dark:text-accent-400 border-accent-200 dark:border-accent-900/50',
    emerald: 'from-emerald-500/10 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
    amber: 'from-amber-500/10 to-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
    rose: 'from-rose-500/10 to-rose-500/5 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50',
  };

  return (
    <Card hover className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {value}
          </h4>
          {subtitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              accentGradients[accentColor] || accentGradients.indigo
            } border transition-transform duration-200 group-hover:scale-110`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium">
          {trendPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
          )}
          <span className={trendPositive ? 'text-emerald-500' : 'text-rose-500'}>
            {trend}
          </span>
          <span className="text-slate-400 dark:text-slate-500">vs last week</span>
        </div>
      )}
    </Card>
  );
};
