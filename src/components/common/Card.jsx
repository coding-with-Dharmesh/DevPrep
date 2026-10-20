import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  glow = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 transition-all duration-200 ${
        hover
          ? 'hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/5 dark:hover:border-brand-500/40 cursor-pointer'
          : 'shadow-sm shadow-slate-900/5'
      } ${
        glow ? 'border-brand-500/40 dark:shadow-glow-indigo' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
