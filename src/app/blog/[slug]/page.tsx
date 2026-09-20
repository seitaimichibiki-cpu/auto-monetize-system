import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PRBanner } from '@/components/PRBanner';
import postsData from '@/data/posts.json';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = postsData.find((p) => p.slug === params.slug) || postsData[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>記事一覧に戻る</span>
      </Link>

      <PRBanner />

      {/* Header Article Title & Meta */}
      <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            {post.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {new Date(post.createdAt).toLocaleDateString('ja-JP')} 更新
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {post.summary}
        </p>

        {/* 冒頭 第1段階 CTA (トップアフィリエイター必須: 結論直後の自然なテキストリンク) */}
        {post.affiliateOffer && (
          <div className="pt-2">
            <a
              href={post.affiliateOffer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              <span>👉 【公式】{post.affiliateOffer.title} の詳細・限定特典をチェックする</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Article Body Content (4,000字級 プロ構成) */}
      <article className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 text-sm text-slate-200 leading-relaxed">
        <div className="prose prose-invert max-w-none space-y-5">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-lg sm:text-xl font-bold text-white border-b border-slate-800 pb-2 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-base font-bold text-blue-300 mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
            }
            return <p key={idx} className="text-slate-300 leading-relaxed">{paragraph}</p>;
          })}
        </div>
      </article>

      {/* 中盤＆末尾 第2・第3段階 CTA (最高コンバージョン率のオファーカード) */}
      {post.affiliateOffer && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/40 bg-gradient-to-br from-blue-950/30 via-slate-900 to-purple-950/30 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30">
              PR 当サイトおすすめ公式ソリューション
            </span>
            <span className="text-[11px] text-slate-400">{post.affiliateOffer.sponsor}</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
              <span>{post.affiliateOffer.title}</span>
            </h3>
            <p className="text-xs text-slate-300 font-mono mt-1">{post.affiliateOffer.priceInfo}</p>
          </div>

          <a
            href={post.affiliateOffer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all hover:scale-[1.01]"
          >
            <span>公式ページで限定キャンペーンを確認する</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

    </div>
  );
}
