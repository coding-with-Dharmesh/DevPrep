import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Flame,
  Terminal,
  BookOpen,
  Briefcase,
  Mic,
  BarChart3,
  ShieldCheck,
  Star,
  Users,
  Compass
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const LandingPage = () => {
  const { loginAsDemo, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = (tier) => {
    loginAsDemo(tier);
    navigate('/app');
  };

  const featureCards = [
    {
      icon: Terminal,
      title: 'Curated DSA Library',
      description: '40+ hand-picked LeetCode-style algorithmic challenges across Arrays, Dynamic Programming, Graphs, and Trees with runnable code simulator.',
      badge: '40+ Problems'
    },
    {
      icon: BookOpen,
      title: 'Interview Knowledge Base',
      description: 'Deep-dive conceptual notes on Java, JavaScript, System Design, DBMS, OS, Networks, and STAR behavioral answers.',
      badge: '50+ Topics'
    },
    {
      icon: Compass,
      title: 'Engineering Roadmaps',
      description: 'Step-by-step career tracks for Frontend, Backend, Full-Stack, DSA, and Beginner with persistent milestone checklists.',
      badge: '5 Tracks'
    },
    {
      icon: Briefcase,
      title: 'Kanban Job Application Tracker',
      description: 'Track your tech job pipeline from application to screening, technical rounds, and multiple job offers with follow-up alerts.',
      badge: 'Interactive'
    },
    {
      icon: Mic,
      title: 'Mock Interview Simulator',
      description: 'Simulate high-pressure FAANG interviews with countdown timer, rubrics, note taking, and self-assessment scoring.',
      badge: 'Timed Mode'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analytics',
      description: 'Visualize your daily study streak, topic proficiency radar, problem difficulty breakdown, and mock interview trends.',
      badge: 'Real-time'
    }
  ];

  const companies = ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Meta', 'Apple', 'Netflix', 'Stripe'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Header Navigation */}
      <nav className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#0B0F19]/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dev<span className="text-brand-500">Prep</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/app">
                <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 dark:bg-brand-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-accent-500/10 dark:bg-accent-500/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>The All-In-One Developer Interview Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Land Your Dream Software Engineering Role at{' '}
            <span className="gradient-text">Top Tech Companies</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Master Data Structures & Algorithms, System Design, Core CS Fundamentals, and Behavioral Interviews. Track your job applications and simulate high-stakes interviews in one unified workspace.
          </p>

          {/* Call to Actions & Demo Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => handleDemoLogin('senior')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Live Demo (Senior SDE)
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleDemoLogin('junior')}
            >
              Demo as Associate Dev
            </Button>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">40+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Curated DSA Problems</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">50+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Core Technical Topics</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">5 Tracks</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Career Roadmaps</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">100% Free</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Local Storage Persistence</p>
            </div>
          </div>
        </div>

        {/* Company Logos Banner */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-6">
            Engineers using DevPrep prepare for interviews at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70">
            {companies.map((c) => (
              <span
                key={c}
                className="text-base sm:text-lg font-bold tracking-tight text-slate-700 dark:text-slate-300"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0B0F19]/50 border-t border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" size="md">
              Complete Preparation Suite
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-3 tracking-tight">
              Everything You Need from Day 1 to Offer Letter
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
              No fragmented tools or lost notes. DevPrep keeps your coding, concepts, applications, and mock history organized in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Card key={idx} hover className="flex flex-col h-full group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900/50 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="default" size="xs">
                      {feat.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed flex-1">
                    {feat.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-600 to-accent-600 p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Accelerate Your Engineering Career?
            </h2>
            <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
              Join thousands of developers leveling up their DSA, system design, and interview confidence. No credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleDemoLogin('senior')}
                className="bg-white text-brand-700 hover:bg-slate-100 shadow-lg"
              >
                Launch Demo Portal
              </Button>
              <Link to="/signup">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
