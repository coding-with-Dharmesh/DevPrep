import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 py-6 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-[#0B0F19]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-brand-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            DevPrep
          </span>
          <span>— Full-Stack Developer Job Preparation Platform</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Password Storage Guarantee</span>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            © 2026 DevPrep. Built for ambitious software engineers.
          </div>
        </div>
      </div>
    </footer>
  );
};
