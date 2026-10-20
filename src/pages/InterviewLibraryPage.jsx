import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { INTERVIEW_TOPICS, MOCK_INTERVIEW_QUESTIONS } from '../data/mockInterviewQuestions';
import {
  BookOpen,
  Search,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Tag,
  Sparkles,
  Bookmark,
  Share2
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SearchBar } from '../components/common/SearchBar';

export const InterviewLibraryPage = () => {
  const {
    bookmarkedQuestions,
    masteredQuestions,
    toggleQuestionBookmark,
    toggleQuestionMastered
  } = useData();

  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Mastered' | 'Bookmarked'
  const [expandedQuestions, setExpandedQuestions] = useState(['js-event-loop']);

  // Toggle card expansion
  const toggleExpand = (id) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Expand or collapse all
  const handleToggleAll = (expand) => {
    if (expand) {
      setExpandedQuestions(MOCK_INTERVIEW_QUESTIONS.map((q) => q.id));
    } else {
      setExpandedQuestions([]);
    }
  };

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return MOCK_INTERVIEW_QUESTIONS.filter((q) => {
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesStatus = true;
      if (statusFilter === 'Mastered') matchesStatus = masteredQuestions.includes(q.id);
      else if (statusFilter === 'Bookmarked') matchesStatus = bookmarkedQuestions.includes(q.id);

      return matchesTopic && matchesSearch && matchesStatus;
    });
  }, [selectedTopic, searchQuery, statusFilter, masteredQuestions, bookmarkedQuestions]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-brand-500" />
            Interview Preparation Library
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master high-frequency conceptual questions for Java, JavaScript, OOP, DBMS, OS, Networks, System Design, and Behavioral rounds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-purple-700 dark:text-purple-300">
            {masteredQuestions.length} Mastered • {bookmarkedQuestions.length} Bookmarked
          </div>
        </div>
      </div>

      {/* Controls: Search, Status & Topic Filters */}
      <Card className="p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Search concepts, algorithms, frameworks, or keywords..."
            className="flex-1"
          />

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold overflow-x-auto">
            {['All', 'Mastered', 'Bookmarked'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap mr-1">
            Domain:
          </span>
          {INTERVIEW_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTopic === topic
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Showing {filteredQuestions.length} of {MOCK_INTERVIEW_QUESTIONS.length} questions
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleToggleAll(true)}
              className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              Expand All
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={() => handleToggleAll(false)}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:underline"
            >
              Collapse All
            </button>
          </div>
        </div>
      </Card>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <Card className="py-12 text-center text-slate-500 dark:text-slate-400">
            <p className="text-sm font-semibold">No interview questions match your filter.</p>
            <p className="text-xs mt-1">Try selecting "All" topics or clearing your search query.</p>
          </Card>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedQuestions.includes(q.id);
            const isMastered = masteredQuestions.includes(q.id);
            const isBookmarked = bookmarkedQuestions.includes(q.id);

            return (
              <Card
                key={q.id}
                className={`transition-all duration-200 overflow-hidden ${
                  isMastered ? 'border-l-4 border-l-emerald-500' : ''
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    onClick={() => toggleExpand(q.id)}
                    className="flex-1 cursor-pointer select-none"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <Badge variant="purple" size="xs">
                        {q.topic}
                      </Badge>
                      <Badge variant={q.difficulty} size="xs">
                        {q.difficulty}
                      </Badge>
                      {isMastered && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mastered
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                      {q.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {q.summary}
                    </p>
                  </div>

                  {/* Actions: Bookmark, Mastered, Expand Toggle */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 pt-0.5">
                    <button
                      onClick={() => toggleQuestionBookmark(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => toggleQuestionMastered(q.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isMastered
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isMastered ? 'Mark as learning' : 'Mark as mastered'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Toggle expansion"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in duration-150">
                    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                      {q.answer}
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
                      {q.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
