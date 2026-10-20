import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowLeft, Home, Compass } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-brand-500/25 mb-6">
          <Code2 className="w-8 h-8" />
        </div>

        <h1 className="text-6xl font-extrabold text-brand-600 dark:text-brand-400 font-mono tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
          Page Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          The page or route you are attempting to visit does not exist or has moved. Return to the dashboard to continue your preparation.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/app">
            <Button variant="gradient" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Landing Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
