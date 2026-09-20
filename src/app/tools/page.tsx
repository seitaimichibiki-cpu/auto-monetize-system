import React from 'react';
import { Sparkles } from 'lucide-react';
import { ToolCard, ToolItem } from '@/components/ToolCard';
import toolsData from '@/data/tools.json';

export default function ToolsListPage() {
  const tools: ToolItem[] = toolsData;

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MICRO-SAAS TOOLBOX</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">AIマイクロSaaSツール一覧</h1>
        <p className="text-xs text-slate-400 mt-2">
          ユーザーの集客と滞在時間を最大化し、高機能版（Stripe決済）への移行を全自動化するマイクロWebツール群。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
