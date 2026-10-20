import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { MOCK_ROADMAPS } from '../data/mockRoadmaps';
import {
  Map,
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';

export const RoadmapsPage = () => {
  const { roadmapProgress } = useData();

  // Helper to compute completion percentage for a given roadmap
  const getRoadmapStats = (roadmap) => {
    let totalItems = 0;
    roadmap.milestones.forEach((m) => {
      totalItems += m.items.length;
    });

    const completedList = roadmapProgress[roadmap.id] || [];
    const completedCount = completedList.length;
    const percentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    return { totalItems, completedCount, percentage };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-brand-500" />
            Developer Learning Roadmaps
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Structured step-by-step career tracks with milestones and interactive completion checklists.
          </p>
        </div>
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ROADMAPS.map((roadmap) => {
          const { totalItems, completedCount, percentage } = getRoadmapStats(roadmap);

          return (
            <Card
              key={roadmap.id}
              hover
              className="flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="primary" size="xs">
                    {roadmap.level}
                  </Badge>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {roadmap.estimatedWeeks}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  {roadmap.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {roadmap.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <Layers className="w-4 h-4 text-brand-500" />
                  <span>{roadmap.milestones.length} Phases • {totalItems} Milestones</span>
                </div>
              </div>

              {/* Progress Bar & CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700 dark:text-slate-300">Track Progress</span>
                  <span className="text-brand-600 dark:text-brand-400">
                    {completedCount} / {totalItems} ({percentage}%)
                  </span>
                </div>
                <ProgressBar value={completedCount} max={totalItems} size="sm" />

                <Link to={`/app/roadmaps/${roadmap.id}`} className="mt-4 block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between group-hover:bg-brand-50 dark:group-hover:bg-brand-950/40 group-hover:border-brand-500/40 group-hover:text-brand-600 dark:group-hover:text-brand-400"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Roadmap Details
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
