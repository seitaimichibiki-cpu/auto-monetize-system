import React from 'react';
import Link from 'next/link';
import { Sparkles, FileText, ArrowRight, Shield, Zap, CheckCircle } from 'lucide-react';
import { ToolCard, ToolItem } from '@/components/ToolCard';
import { PostCard, PostItem } from '@/components/PostCard';
import { PRBanner } from '@/components/PRBanner';
import { NewsletterCTA } from '@/components/NewsletterCTA';

import toolsData from '@/data/tools.json';
import postsData from '@/data/posts.json';

export default function HomePage() {
  const tools: ToolItem[] = toolsData;
  const posts: PostItem[] = postsData;

  return (
    <div className="space-y-16 pb-16">
      
      {/* 広告開示バナー */}
      <PRBanner />

      {/* Hero Section */}
      <section className="relative text-center space-y-6 pt-4 pb-8">
        
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>次世代AIテクノロジー & Webプロダクティビティ</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-white">
          AIと自動化の力で、<br />
          <span className="gradient-text">ビジネスと個人の生産性を最大化する</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          最新のAIツール活用法、開発効率化テクニック、厳選されたWebテクノロジーソリューションをリアルタイムでお届けします。
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/tools"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI無料ツールを試す</span>
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs transition-all hover:scale-105 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>解説記事を読む</span>
          </Link>
        </div>

      </section>

      {/* Value Proposition Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="glass-card rounded-2xl p-5 border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">即効性のあるAIツール</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">登録不要で即座に試せる実用的なAIツールで作業時間を劇的に短縮。</p>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">実践的な検証済みノウハウ</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">実際の導入ステップ、費用対効果、活用比較を分かりやすく徹底解説。</p>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">厳選された公式ソリューション</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">セキュリティ、信頼性、コストパフォーマンスに優れた公式製品のみを案内。</p>
          </div>
        </div>
      </section>

      {/* Free AI Micro-SaaS Tools Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>おすすめAI Webツール</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">日々のコンテンツ作成・校正・アイデア出しを自動化する無料ツール群</p>
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

      {/* AI Articles Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>最新AIナレッジ＆トレンド記事</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">導入手順、ツール比較、最新AIテクノロジーの解説記事</p>
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

      {/* Newsletter CTA Section */}
      <section className="max-w-3xl mx-auto pt-8">
        <NewsletterCTA />
      </section>

    </div>
  );
}
