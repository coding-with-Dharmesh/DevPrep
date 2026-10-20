import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Star,
  Play,
  Check,
  RotateCcw,
  Lightbulb,
  FileCode,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Terminal,
  Clock,
  Cpu,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const DsaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    dsaProblems,
    solvedProblems,
    bookmarkedProblems,
    toggleSolveProblem,
    toggleBookmarkProblem
  } = useData();
  const { success, info } = useToast();

  const problem = dsaProblems.find((p) => p.id === id);

  // States
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'solution'
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [revealedHints, setRevealedHints] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResults, setRunResults] = useState(null);

  // Initialize starter code when problem or language changes
  useEffect(() => {
    if (problem && problem.starterCode) {
      setCode(problem.starterCode[selectedLanguage] || problem.starterCode.javascript || '');
      setRunResults(null);
    }
  }, [problem, selectedLanguage]);

  if (!problem) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Problem Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested problem could not be located.</p>
        <Link to="/app/dsa">
          <Button variant="primary" className="mt-4">
            Back to Problems List
          </Button>
        </Link>
      </div>
    );
  }

  const isSolved = solvedProblems.includes(problem.id);
  const isBookmarked = bookmarkedProblems.includes(problem.id);

  // Toggle reveal for individual hint
  const toggleHint = (index) => {
    setRevealedHints((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Reset code to default starter
  const handleResetCode = () => {
    setCode(problem.starterCode[selectedLanguage] || '');
    setRunResults(null);
    info('Code reset to template.');
  };

  // Run Testcases Simulation
  const handleRunCode = () => {
    setIsRunning(true);
    setRunResults(null);

    setTimeout(() => {
      setIsRunning(false);
      setRunResults({
        status: 'Accepted',
        runtime: `${Math.floor(Math.random() * 30) + 45} ms`,
        memory: `${(Math.random() * 4 + 40).toFixed(1)} MB`,
        testCasesPassed: problem.testCases ? problem.testCases.length : 2,
        totalTestCases: problem.testCases ? problem.testCases.length : 2,
        output: problem.testCases && problem.testCases.length > 0
          ? `Input: ${problem.testCases[0].input}\nExpected: ${problem.testCases[0].expected}\nYour Output: ${problem.testCases[0].expected}`
          : 'All sample test cases executed successfully without errors.'
      });
      success('Sample test cases passed successfully!');
    }, 700);
  };

  // Submit Solution Simulation
  const handleSubmitCode = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (!isSolved) {
        toggleSolveProblem(problem.id);
      }
      setRunResults({
        status: 'Accepted',
        runtime: '52 ms (Beats 89.4% of submissions)',
        memory: '42.6 MB (Beats 82.1% of submissions)',
        testCasesPassed: 45,
        totalTestCases: 45,
        output: 'Success: All 45 test cases passed!'
      });
    }, 850);
  };

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/app/dsa"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {problem.title}
              </h1>
              <Badge variant={problem.difficulty} size="xs">
                {problem.difficulty}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Category: {problem.category} • Acceptance: {problem.acceptance}
            </p>
          </div>
        </div>

        {/* Action buttons: Solved & Bookmark */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant={isSolved ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => toggleSolveProblem(problem.id)}
            leftIcon={
              isSolved ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Circle className="w-4 h-4" />
              )
            }
          >
            {isSolved ? 'Solved' : 'Mark Solved'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleBookmarkProblem(problem.id)}
            leftIcon={
              <Star
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                }`}
              />
            }
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </div>
      </div>

      {/* Main Grid: Description (Left) + Sandbox Editor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Description / Official Solution Tabs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-0 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex items-center border-b border-slate-200/80 dark:border-slate-800 px-4 bg-slate-50/50 dark:bg-slate-900/50">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'description'
                    ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileCode className="w-4 h-4" />
                Description
              </button>
              <button
                onClick={() => setActiveTab('solution')}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'solution'
                    ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Official Solution
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {activeTab === 'description' ? (
                <>
                  {/* Company Tags */}
                  {problem.companies && problem.companies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                      <span className="text-xs font-semibold text-slate-400 mr-1">
                        Companies:
                      </span>
                      {problem.companies.map((comp) => (
                        <span
                          key={comp}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Problem Description */}
                  <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {problem.description}
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Examples
                    </h4>
                    {problem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5 font-mono"
                      >
                        <p className="font-semibold text-slate-900 dark:text-white">
                          Example {idx + 1}:
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          <span className="font-bold text-slate-700 dark:text-slate-300">Input: </span>
                          {ex.input}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          <span className="font-bold text-slate-700 dark:text-slate-300">Output: </span>
                          {ex.output}
                        </p>
                        {ex.explanation && (
                          <p className="text-slate-500 font-sans text-[11px] pt-1">
                            <strong>Explanation: </strong> {ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  {problem.constraints && (
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        Constraints:
                      </h4>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                        {problem.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Progressive Hints */}
                  {problem.hints && problem.hints.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Hints & Strategy
                      </h4>
                      {problem.hints.map((hint, idx) => {
                        const isRevealed = revealedHints.includes(idx);
                        return (
                          <div
                            key={idx}
                            className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                          >
                            <button
                              onClick={() => toggleHint(idx)}
                              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left"
                            >
                              <span>Hint {idx + 1}</span>
                              {isRevealed ? (
                                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </button>
                            {isRevealed && (
                              <div className="p-3 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
                                {hint}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* Official Solution Tab */
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Approach: </span>
                        <strong className="text-brand-600 dark:text-brand-400">
                          {problem.solution.approach}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Time Complexity: </span>
                        <strong className="text-slate-900 dark:text-white font-mono">
                          {problem.solution.timeComplexity}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Space Complexity: </span>
                        <strong className="text-slate-900 dark:text-white font-mono">
                          {problem.solution.spaceComplexity}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      Optimal Code Solution
                    </h4>
                    <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                      <code>{problem.solution.code}</code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      Complexity Analysis & Walkthrough
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {problem.solution.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Code Sandbox Editor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-0 overflow-hidden border border-slate-200 dark:border-slate-800">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-500" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python 3</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <button
                onClick={handleResetCode}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-medium transition-colors"
                title="Reset code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Code Textarea */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                rows={16}
                className="w-full p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-y selection:bg-brand-500"
              />
            </div>

            {/* Execution Buttons */}
            <div className="p-3 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunCode}
                isLoading={isRunning}
                leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
              >
                Run Code
              </Button>

              <Button
                variant="gradient"
                size="sm"
                onClick={handleSubmitCode}
                isLoading={isSubmitting}
                leftIcon={<Check className="w-3.5 h-3.5" />}
              >
                Submit Solution
              </Button>
            </div>
          </Card>

          {/* Testcase / Run Output Console */}
          {runResults && (
            <Card className="p-4 border-l-4 border-l-emerald-500 animate-in fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {runResults.status}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {runResults.runtime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    {runResults.memory}
                  </span>
                </div>
              </div>

              <div className="mt-2 p-2.5 rounded-lg bg-slate-900 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                {runResults.output}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
