import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { MOCK_ROADMAPS } from '../data/mockRoadmaps';
import {
  ArrowLeft,
  Compass,
  CheckCircle2,
  Circle,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
  Share2
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import confetti from 'canvas-confetti';

export const RoadmapDetailPage = () => {
  const { id } = useParams();
  const { roadmapProgress, toggleRoadmapItem } = useData();
  const { success } = useToast();

  const roadmap = MOCK_ROADMAPS.find((r) => r.id === id);

  if (!roadmap) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Roadmap Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested roadmap does not exist.</p>
        <Link to="/app/roadmaps">
          <Button variant="primary" className="mt-4">
            Back to All Roadmaps
          </Button>
        </Link>
      </div>
    );
  }

  const completedItems = roadmapProgress[roadmap.id] || [];

  let totalItemsCount = 0;
  roadmap.milestones.forEach((m) => {
    totalItemsCount += m.items.length;
  });

  const percentage =
    totalItemsCount > 0
      ? Math.round((completedItems.length / totalItemsCount) * 100)
      : 0;

  const handleToggle = (itemId) => {
    const willComplete = !completedItems.includes(itemId);
    toggleRoadmapItem(roadmap.id, itemId);

    if (willComplete) {
      if (completedItems.length + 1 === totalItemsCount) {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {}
        success(`🎉 Congratulations! You have fully completed the ${roadmap.title}!`);
      } else {
        success('Milestone completed! Keep going! 🚀');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/app/roadmaps"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {roadmap.title}
              </h1>
              <Badge variant="primary" size="xs">
                {roadmap.level}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Estimated Duration: {roadmap.estimatedWeeks} • {roadmap.milestones.length} Phases
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
            {completedItems.length} of {totalItemsCount} Completed ({percentage}%)
          </div>
        </div>
      </div>

      {/* Overview Card with Progress Bar */}
      <Card className="p-6">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          {roadmap.description}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Overall Track Completion</span>
            <span className="text-brand-600 dark:text-brand-400 font-bold">{percentage}%</span>
          </div>
          <ProgressBar value={completedItems.length} max={totalItemsCount} size="md" />
        </div>
      </Card>

      {/* Milestones Phases List */}
      <div className="space-y-6">
        {roadmap.milestones.map((milestone, idx) => {
          const milestoneCompletedCount = milestone.items.filter((item) =>
            completedItems.includes(item.id)
          ).length;
          const isPhaseDone = milestoneCompletedCount === milestone.items.length;

          return (
            <Card
              key={milestone.id}
              className={`overflow-hidden transition-all duration-200 ${
                isPhaseDone ? 'border-emerald-500/30 dark:border-emerald-500/20' : ''
              }`}
            >
              {/* Milestone Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                      {milestone.duration}
                    </span>
                    {isPhaseDone && (
                      <Badge variant="success" size="xs">
                        Phase Complete
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {milestone.description}
                  </p>
                </div>

                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 self-start sm:self-auto">
                  {milestoneCompletedCount} / {milestone.items.length} done
                </div>
              </div>

              {/* Checklist Items */}
              <div className="mt-4 space-y-2.5">
                {milestone.items.map((item) => {
                  const isChecked = completedItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-slate-900 dark:text-white'
                          : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 focus:outline-none flex-shrink-0"
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-400" />
                        )}
                      </button>

                      <span
                        className={`text-xs sm:text-sm font-medium leading-relaxed ${
                          isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
