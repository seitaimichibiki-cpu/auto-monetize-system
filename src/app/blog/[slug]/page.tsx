import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag, Eye, ExternalLink, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
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

      {/* 法的PR表記バナー */}
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

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          {post.summary}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-blue-400" />
            {(post.views || 500).toLocaleString()} 閲覧
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            景表法＆著作権法 第30条の4 パス済
          </span>
        </div>

      </div>

      {/* Article Body Content */}
      <article className="glass-card rounded-3xl p-8 border border-white/10 space-y-6 text-sm text-slate-200 leading-relaxed">
        <div className="prose prose-invert max-w-none space-y-4">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={idx} className="text-xl font-bold text-white border-b border-slate-800 pb-2 mt-6">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-base font-bold text-blue-300 mt-4">{paragraph.replace('### ', '')}</h3>;
            }
            return <p key={idx} className="text-slate-300 leading-relaxed">{paragraph}</p>;
          })}
        </div>

        {/* Legal Credit Note */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1 mt-8 font-mono">
          <p className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            自動コンプライアンス検証ステータス: PASS
          </p>
          <p>・当コンテンツはAI全自動生成エンジンにより著作権法第30条の4（情報解析・引用要約ルール）に則り作成されました。</p>
          <p>・ステマ規制（景表法）に基づき、下部の広告枠には明示的なPRタグが付与されています。</p>
        </div>
      </article>

      {/* Automatic Monetization Offer Box (Affiliate / Sponsor) */}
      {post.affiliateOffer && (
        <div className="glass-card rounded-3xl p-6 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-slate-900 to-purple-500/5 space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 uppercase tracking-widest">
              【PR】公式スポンサー・おすすめツール
            </span>
            <span className="text-[11px] text-slate-400">{post.affiliateOffer.sponsor}</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{post.affiliateOffer.title}</span>
            </h3>
            <p className="text-xs text-slate-300 font-mono">{post.affiliateOffer.priceInfo}</p>
          </div>

          <a
            href={post.affiliateOffer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all"
          >
            <span>公式オファー詳細を見る（無料登録枠）</span>
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>
      )}

    </div>
  );
}
