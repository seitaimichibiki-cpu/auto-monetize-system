import React from 'react';

export const PRBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <span className="text-[10px] font-medium text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
        PR
      </span>
    );
  }

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between mb-6">
      <span>※ 本ページにはアフィリエイト広告およびプロモーションが含まれています。</span>
      <span className="text-[10px] text-slate-500 font-mono">広告開示</span>
    </div>
  );
};
