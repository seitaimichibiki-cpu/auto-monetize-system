import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Lock } from 'lucide-react';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  usageCount: number;
  isPremium: boolean;
  inputLabel: string;
  placeholder: string;
}

export const ToolCard: React.FC<{ tool: ToolItem }> = ({ tool }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
      
      {/* Premium Badge */}
      {tool.isPremium && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
          <Lock className="w-3 h-3" />
          <span>Stripe Subscribable</span>
        </div>
      )}

      <div>
        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
            {tool.icon === 'Sparkles' && <Sparkles className="w-6 h-6" />}
            {tool.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
            {tool.icon === 'Zap' && <Zap className="w-6 h-6 text-amber-400" />}
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">{tool.name}</h3>
            <span className="text-[11px] text-slate-400 font-mono">累計利用数: {tool.usageCount.toLocaleString()} 回</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          {tool.description}
        </p>
      </div>

      {/* Action Button */}
      <Link
        href={`/tools/${tool.id}`}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-between transition-all group-hover:border group-hover:border-purple-500/30"
      >
        <span>{tool.isPremium ? 'AIマネタイズツールを試す (Pro)' : '無料AIツールを即時実行'}</span>
        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
