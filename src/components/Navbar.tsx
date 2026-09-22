import React from 'react';
import Link from 'next/link';
import { Sparkles, FileText, Cpu, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white">AIハック</span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-wider">AI×副業の実践メディア</span>
          </div>
        </Link>

        {/* User Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link href="/tools" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI無料ツール</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>最新ナレッジ記事</span>
          </Link>
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-105"
          >
            <span>AIツールを試す</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

      </div>
    </header>
  );
};
