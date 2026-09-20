import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, Lock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2">
            <span className="text-base font-bold gradient-text">AutoMonetize AI Platform</span>
            <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
              人的リソース0・法的リスク0・初期経費0を達成するために設計された完全自律型マイクロSaaS＆情報プラットフォーム。24時間365日無人で自動運用されています。
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>景表法・著作権法（第30条の4）・特商法 完全準拠</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">サービス</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools" className="hover:text-white transition-colors">無料AIマイクロツール</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">AIトレンド自動メディア</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">自動化モニタリング</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">リーガル・コンプライアンス</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1"><Scale className="w-3 h-3" /><span className="hover:text-white cursor-pointer">特定商取引法に基づく表記</span></li>
              <li className="flex items-center gap-1"><Lock className="w-3 h-3" /><span className="hover:text-white cursor-pointer">プライバシーポリシー</span></li>
              <li className="text-[11px] text-slate-500 mt-2">PR表記自動プログラム組み込み済</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 AutoMonetize AI. Built for 100% Autonomous Monetization.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0 font-mono text-[10px]">
            Powered by Next.js & Gemini 3.6 API
          </p>
        </div>
      </div>
    </footer>
  );
};
