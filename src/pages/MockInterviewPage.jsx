import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { MOCK_INTERVIEW_QUESTIONS_POOL } from '../data/mockMockInterviews';
import {
  Mic,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sparkles,
  CheckCircle2,
  Star,
  Award,
  AlertCircle,
  FileText,
  HelpCircle,
  ChevronRight,
  History
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const MockInterviewPage = () => {
  const { mockHistory, addMockSession } = useData();

  // Mode: 'lobby' | 'active'
  const [sessionState, setSessionState] = useState('lobby');
  const [selectedQuestion, setSelectedQuestion] = useState(MOCK_INTERVIEW_QUESTIONS_POOL[0]);

  // Timer states
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Candidate notes/code
  const [candidateNotes, setCandidateNotes] = useState('');

  // Assessment Modal
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [ratings, setRatings] = useState({
    problemSolving: 4,
    communication: 4,
    codeQuality: 4,
    timeManagement: 4
  });
  const [feedbackText, setFeedbackText] = useState('');

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (sessionState === 'active' && isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [sessionState, isTimerRunning, secondsRemaining]);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  // Start interview session
  const startInterview = (q = selectedQuestion) => {
    setSelectedQuestion(q);
    setSecondsRemaining((q.timeLimitMinutes || 30) * 60);
    setIsTimerRunning(true);
    setCandidateNotes('');
    setSessionState('active');
  };

  // Pick random question
  const pickRandomQuestion = () => {
    const rand = MOCK_INTERVIEW_QUESTIONS_POOL[Math.floor(Math.random() * MOCK_INTERVIEW_QUESTIONS_POOL.length)];
    startInterview(rand);
  };

  // Finish session
  const handleOpenAssessment = () => {
    setIsTimerRunning(false);
    setIsAssessmentOpen(true);
  };

  // Save session to history
  const handleSaveAssessment = () => {
    const totalScore = Math.round(
      ((ratings.problemSolving + ratings.communication + ratings.codeQuality + ratings.timeManagement) / 20) * 100
    );

    const timeSpentMins = Math.max(
      1,
      Math.round(((selectedQuestion.timeLimitMinutes || 30) * 60 - secondsRemaining) / 60)
    );

    addMockSession({
      questionTitle: selectedQuestion.title,
      category: selectedQuestion.category,
      durationMinutes: timeSpentMins,
      ratings,
      overallScore: totalScore,
      feedbackNotes: feedbackText || 'Good composure and structured approach.'
    });

    setIsAssessmentOpen(false);
    setSessionState('lobby');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Mic className="w-7 h-7 text-brand-500" />
            Mock Interview Simulator
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Practice real technical coding & system design questions under timed, high-stakes pressure with self-assessment rubrics.
          </p>
        </div>

        {sessionState === 'lobby' && (
          <Button
            variant="gradient"
            size="md"
            onClick={pickRandomQuestion}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Quick Random Interview
          </Button>
        )}
      </div>

      {sessionState === 'active' ? (
        /* LIVE INTERVIEW ACTIVE SIMULATOR VIEW */
        <div className="space-y-4">
          {/* Active Status Bar with Timer */}
          <Card className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-brand-500/30">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                  Live Mock Session
                </span>
                <h3 className="text-base font-bold truncate max-w-md">
                  {selectedQuestion.title}
                </h3>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xl font-bold tracking-widest ${
                  secondsRemaining < 300
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-100 border border-slate-700'
                }`}
              >
                <Clock className="w-5 h-5 text-brand-400" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                title={isTimerRunning ? 'Pause' : 'Resume'}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setSecondsRemaining((selectedQuestion.timeLimitMinutes || 30) * 60)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <Button
                variant="gradient"
                size="sm"
                onClick={handleOpenAssessment}
                className="bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Finish & Evaluate
              </Button>
            </div>
          </Card>

          {/* Question & Draft Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Prompt & Rubric (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <Card className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="purple" size="xs">
                    {selectedQuestion.category}
                  </Badge>
                  <Badge variant={selectedQuestion.difficulty === 'Senior / Hard' ? 'Hard' : 'Medium'} size="xs">
                    {selectedQuestion.difficulty}
                  </Badge>
                </div>

                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {selectedQuestion.prompt}
                </div>

                {/* Rubric evaluation criteria */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-500" />
                    Interviewer Evaluation Signals
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedQuestion.rubric.map((r, i) => (
                      <li
                        key={i}
                        className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2"
                      >
                        <span className="text-brand-500 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>

            {/* Answer Draft / Solution Notepad (7 cols) */}
            <div className="lg:col-span-7">
              <Card className="p-4 flex flex-col h-full border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-500" />
                    Candidate Notepad & Scratchpad
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Draft code, estimations, architectural diagrams, or bullet notes
                  </span>
                </div>

                <textarea
                  value={candidateNotes}
                  onChange={(e) => setCandidateNotes(e.target.value)}
                  placeholder="// Outline your thoughts, time complexity, and working solution here...&#10;&#10;1. Assumptions & Constraints&#10;2. High Level Approach&#10;3. Implementation"
                  rows={18}
                  className="w-full flex-1 p-3.5 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed rounded-xl focus:outline-none resize-y selection:bg-brand-500"
                />
              </Card>
            </div>
          </div>
        </div>
      ) : (
        /* LOBBY VIEW: Question Selection & Historical Log */
        <div className="space-y-6">
          {/* Question Pool Cards */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Select an Interview Assessment Topic
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_INTERVIEW_QUESTIONS_POOL.map((q) => (
                <Card
                  key={q.id}
                  hover
                  onClick={() => startInterview(q)}
                  className="flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="purple" size="xs">
                        {q.category}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {q.timeLimitMinutes} min
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                      {q.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {q.prompt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-semibold">
                    <span>Start Mock Simulator</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Mock History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <History className="w-5 h-5 text-brand-500" />
                Completed Interview History & Feedback
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {mockHistory.length} Sessions Logged
              </span>
            </div>

            <Card className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-3">Question Title</th>
                      <th className="py-3.5 px-3">Domain</th>
                      <th className="py-3.5 px-3">Score</th>
                      <th className="py-3.5 px-3">Duration</th>
                      <th className="py-3.5 px-3 hidden lg:table-cell">Feedback Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {mockHistory.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-xs font-mono text-slate-500">
                          {item.date}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white text-xs">
                          {item.questionTitle}
                        </td>
                        <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-400">
                          {item.category}
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${
                              item.overallScore >= 85
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                            }`}
                          >
                            {item.overallScore}%
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-xs text-slate-500 font-mono">
                          {item.durationMinutes} mins
                        </td>
                        <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-400 hidden lg:table-cell line-clamp-1">
                          {item.feedbackNotes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Self-Assessment Modal */}
      <Modal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        title="Interview Self-Assessment & Scoring"
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAssessmentOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={handleSaveAssessment}
            >
              Save to Performance History
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Rate your performance across the 4 core interview evaluation criteria (1 to 5 stars):
          </p>

          <div className="space-y-3">
            {[
              { key: 'problemSolving', label: '1. Problem Solving & Technical Logic' },
              { key: 'communication', label: '2. Verbal Communication & Clarity' },
              { key: 'codeQuality', label: '3. Code Cleanliness & Edge Cases' },
              { key: 'timeManagement', label: '4. Time Management & Pacing' }
            ].map(({ key, label }) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800"
              >
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {label}
                </span>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatings({ ...ratings, [key]: star })}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= ratings[key]
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Personal Feedback & Takeaways
            </label>
            <textarea
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="What went well? What would you do differently under pressure next time?"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
