import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3">
            <span className="text-base font-bold text-white">AIハック</span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              AI副業・ツール活用・フリーランス独立・Webマーケティングの実践ノウハウを発信する専門メディアです。
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>特定商取引法・景表法（PR表記方針）準拠</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">ナビゲーション</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tools" className="hover:text-white transition-colors">AI無料Webツール</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">最新技術・解説記事</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">リーガル情報</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><Link href="/legal" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
              <li>利用規約 / 免責事項</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 AIハック. All rights reserved.</p>
          <p className="text-[11px] text-slate-600">※ 当メディアのコンテンツには一部PR広告が含まれる場合があります。</p>
        </div>
      </div>
    </footer>
  );
};
