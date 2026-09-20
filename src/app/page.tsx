import React from 'react';
import Link from 'next/link';
import { Sparkles, Bot, ShieldCheck, Zap, TrendingUp, CheckCircle2, ArrowRight, DollarSign, Activity } from 'lucide-react';
import { ToolCard, ToolItem } from '@/components/ToolCard';
import { PostCard, PostItem } from '@/components/PostCard';
import { PRBanner } from '@/components/PRBanner';

import toolsData from '@/data/tools.json';
import postsData from '@/data/posts.json';
import analyticsData from '@/data/analytics.json';

export default function HomePage() {
  const tools: ToolItem[] = toolsData;
  const posts: PostItem[] = postsData;

  return (
    <div className="space-y-16 pb-12">
      
      {/* 法的遵守 PRバナー */}
      <PRBanner />

      {/* Hero Section */}
      <section className="relative text-center space-y-6 pt-6 pb-10">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold font-mono">
          <Bot className="w-4 h-4 text-blue-400 animate-bounce" />
          <span>100% Fully Autonomous Engine Activated</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
          人的リソース <span className="gradient-text">0</span> ・ 法的リスク <span className="gradient-text-emerald">0</span><br />
          初期経費 <span className="text-amber-400">0円</span> の完全自動マネタイズ
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          AIがトレンド収集・SEO記事作成・マイクロSaaSツール提供・マネタイズ導線の最適化まで全自動で実行。24時間365日無人で収益を生み出し続けます。
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/tools"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI無料ツールを体感する</span>
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:scale-105 flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>自動モニタリングダッシュボード</span>
          </Link>
        </div>

        {/* 3 Core Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8">
          <div className="glass-card rounded-xl p-4 text-left flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">人的リソース 0</h3>
              <p className="text-xs text-slate-400 mt-1">CronタスクとAIパイプラインで投稿・ツール提供・修正まで完全放置。</p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-left flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">法的リスク 0</h3>
              <p className="text-xs text-slate-400 mt-1">景表法(PR表記)・著作権法第30条の4・特商法準拠フィルタを標準装備。</p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4 text-left flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">初期経費 0円</h3>
              <p className="text-xs text-slate-400 mt-1">GitHub Actions・Vercel無料枠・Gemini API無料範囲でゼロコストスタート。</p>
            </div>
          </div>
        </div>

      </section>

      {/* Target Revenue Milestone Section */}
      <section className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest">
          <TrendingUp className="w-4 h-4" />
          <span>REVENUE ROADMAP MILESTONE</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-6">目標収益ロードマップ（自動達成予測）</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
            <div className="text-xs text-slate-400 font-mono mb-1">STAGE 1: 3ヶ月目</div>
            <div className="text-2xl font-black text-blue-400">10 万円 <span className="text-xs font-normal text-slate-400">/ 累計</span></div>
            <p className="text-xs text-slate-300 mt-2">SEO記事インデックスの定着、アドセンス＋初期アフィリエイト流入。</p>
          </div>
          <div className="bg-slate-900/80 rounded-2xl p-5 border border-purple-500/30">
            <div className="text-xs text-purple-400 font-mono mb-1">STAGE 2: 半年目 (6ヶ月)</div>
            <div className="text-2xl font-black text-purple-400">50 万円 <span className="text-xs font-normal text-slate-400">/ 累計</span></div>
            <p className="text-xs text-slate-300 mt-2">AIツールのStripe月額課金導入＋高単価アフィリエイト成約。</p>
          </div>
          <div className="bg-slate-900/80 rounded-2xl p-5 border border-emerald-500/30">
            <div className="text-xs text-emerald-400 font-mono mb-1">STAGE 3: 1年目 (12ヶ月)</div>
            <div className="text-2xl font-black text-emerald-400">100 万円＋ <span className="text-xs font-normal text-slate-400">/ 累計</span></div>
            <p className="text-xs text-slate-300 mt-2">完全放置での継続的ストック収入＆自動メディアからの毎月入金。</p>
          </div>
        </div>
      </section>

      {/* Free AI Micro-SaaS Tools Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span>AIマイクロSaaSツール（集客＆課金エンジン）</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">ユーザーが無料で使え、高付加価値機能はStripe決済に接続される自動システム</p>
          </div>
          <Link href="/tools" className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            <span>すべて見る</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Auto-Generated SEO Articles Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-400" />
              <span>AI全自動生成メディア（完全法的クリア）</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">著作権法第30条の4・景表法PR表記を完全遵守して毎日自動更新</p>
          </div>
          <Link href="/blog" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <span>記事一覧</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

    </div>
  );
}
