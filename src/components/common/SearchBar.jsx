import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search by keyword, topic, or tag...',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'py-1.5 pl-8 pr-7 text-xs',
    md: 'py-2.5 pl-10 pr-9 text-sm',
    lg: 'py-3.5 pl-12 pr-11 text-base'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4'
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        className={`absolute text-slate-400 pointer-events-none ${
          iconSizes[size] || iconSizes.md
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all ${
          sizeClasses[size] || sizeClasses.md
        }`}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
