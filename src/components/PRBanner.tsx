import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const PRBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
        <Info className="w-3.5 h-3.5" />
        <span>PR / 広告掲載ページ</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center justify-between mb-6 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>【景表法・ステマ規制遵守ガイドライン】当サイトは透明性を保つため、アフィリエイト広告およびプロモーションリンクを含むコンテンツにPR表記を行っています。</span>
      </div>
      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">法的表示適用済</span>
    </div>
  );
};
