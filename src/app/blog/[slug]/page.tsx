import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
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

      {/* 広告表示バナー */}
      <PRBanner />

      {/* Header Article Info */}
      <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            {post.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {new Date(post.createdAt).toLocaleDateString('ja-JP')} 公開
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
          {post.summary}
        </p>

      </div>

      {/* Article Body Content */}
      <article className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 text-sm text-slate-200 leading-relaxed">
        <div className="prose prose-invert max-w-none space-y-4">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-lg font-bold text-white border-b border-slate-800 pb-2 mt-6">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-base font-bold text-blue-300 mt-4">{paragraph.replace('### ', '')}</h3>;
            }
            return <p key={idx} className="text-slate-300 leading-relaxed">{paragraph}</p>;
          })}
        </div>
      </article>

      {/* High Converting Affiliate Offer Box (Sales Funnel CTA) */}
      {post.affiliateOffer && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/30 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20 space-y-4 shadow-xl">
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30">
              PR おすすめ公式ソリューション
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
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all hover:scale-[1.01]"
          >
            <span>公式サイトで詳細・限定特典を確認する</span>
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>
      )}

    </div>
  );
}
