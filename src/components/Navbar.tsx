import React from 'react';
import Link from 'next/link';
import { Bot, Sparkles, LayoutDashboard, FileText, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight gradient-text">AutoMonetize AI</span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">Autonomous SaaS Engine</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/tools" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI無料ツール</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>AI自動メディア</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>完全自動モニタリング</span>
          </Link>
        </nav>

        {/* System Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">AUTONOMOUS ACTIVE</span>
            <span className="sm:hidden">稼働中</span>
          </div>

          <Link href="/dashboard" className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
            稼働ログ確認
          </Link>
        </div>

      </div>
    </header>
  );
};
