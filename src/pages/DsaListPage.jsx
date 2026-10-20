import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { DSA_CATEGORIES, COMPANIES_LIST } from '../data/mockDsaProblems';
import {
  Code2,
  CheckCircle2,
  Circle,
  Star,
  Search,
  Filter,
  Sparkles,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SearchBar } from '../components/common/SearchBar';

export const DsaListPage = () => {
  const {
    dsaProblems,
    solvedProblems,
    bookmarkedProblems,
    toggleSolveProblem,
    toggleBookmarkProblem
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Solved' | 'Bookmarked' | 'Unsolved'

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return dsaProblems.filter((p) => {
      // Search
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

      // Company
      const matchesCompany =
        selectedCompany === 'All' || p.companies.includes(selectedCompany);

      // Status
      let matchesStatus = true;
      const isSolved = solvedProblems.includes(p.id);
      const isBookmarked = bookmarkedProblems.includes(p.id);

      if (statusFilter === 'Solved') matchesStatus = isSolved;
      else if (statusFilter === 'Unsolved') matchesStatus = !isSolved;
      else if (statusFilter === 'Bookmarked') matchesStatus = isBookmarked;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany && matchesStatus;
    });
  }, [
    dsaProblems,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedCompany,
    statusFilter,
    solvedProblems,
    bookmarkedProblems
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Code2 className="w-7 h-7 text-brand-500" />
            DSA Problem Library
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Master {dsaProblems.length} foundational algorithmic challenges tested by top tech companies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-700 dark:text-brand-300">
            {solvedProblems.length} of {dsaProblems.length} Solved ({Math.round((solvedProblems.length / dsaProblems.length) * 100)}%)
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <Card className="p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Search problems by name, company, or topic..."
            className="flex-1"
          />

          {/* Quick Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold overflow-x-auto">
            {['All', 'Solved', 'Unsolved', 'Bookmarked'].map((tab) => (
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
                {tab === 'Bookmarked' && bookmarkedProblems.length > 0 && (
                  <span className="ml-1 text-[10px] text-amber-500">
                    ({bookmarkedProblems.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap mr-1">
            Topic:
          </span>
          {DSA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Difficulty and Company dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              Difficulty:
            </span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              Company Tag:
            </span>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              {COMPANIES_LIST.map((comp) => (
                <option key={comp} value={comp}>
                  {comp === 'All' ? 'All Companies' : comp}
                </option>
              ))}
            </select>
          </div>

          {(selectedCategory !== 'All' ||
            selectedDifficulty !== 'All' ||
            selectedCompany !== 'All' ||
            statusFilter !== 'All' ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedCompany('All');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="ml-auto text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </Card>

      {/* Problems Table / List */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-3.5 pl-4 pr-2 w-12 text-center">Status</th>
                <th className="py-3.5 px-3">Title</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Difficulty</th>
                <th className="py-3.5 px-3 hidden md:table-cell">Acceptance</th>
                <th className="py-3.5 px-3 hidden lg:table-cell">Top Companies</th>
                <th className="py-3.5 pr-4 pl-2 w-16 text-center">Bookmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <p className="text-sm font-semibold">No problems match your current filters.</p>
                    <p className="text-xs mt-1">Try relaxing your search query or company filters.</p>
                  </td>
                </tr>
              ) : (
                filteredProblems.map((problem) => {
                  const isSolved = solvedProblems.includes(problem.id);
                  const isBookmarked = bookmarkedProblems.includes(problem.id);

                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Solved Toggle */}
                      <td className="py-3.5 pl-4 pr-2 text-center">
                        <button
                          onClick={() => toggleSolveProblem(problem.id)}
                          className="focus:outline-none transition-transform active:scale-90"
                          title={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                        >
                          {isSolved ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-400" />
                          )}
                        </button>
                      </td>

                      {/* Problem Title */}
                      <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white">
                        <Link
                          to={`/app/dsa/${problem.id}`}
                          className="hover:text-brand-500 dark:hover:text-brand-400 flex items-center gap-1.5"
                        >
                          <span>{problem.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-500" />
                        </Link>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {problem.category}
                      </td>

                      {/* Difficulty Badge */}
                      <td className="py-3.5 px-3">
                        <Badge variant={problem.difficulty} size="xs">
                          {problem.difficulty}
                        </Badge>
                      </td>

                      {/* Acceptance */}
                      <td className="py-3.5 px-3 text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell">
                        {problem.acceptance}
                      </td>

                      {/* Companies */}
                      <td className="py-3.5 px-3 hidden lg:table-cell">
                        <div className="flex flex-wrap items-center gap-1">
                          {problem.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            >
                              {comp}
                            </span>
                          ))}
                          {problem.companies.length > 3 && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              +{problem.companies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Bookmark Toggle */}
                      <td className="py-3.5 pr-4 pl-2 text-center">
                        <button
                          onClick={() => toggleBookmarkProblem(problem.id)}
                          className="focus:outline-none transition-transform active:scale-90"
                          title={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isBookmarked
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
