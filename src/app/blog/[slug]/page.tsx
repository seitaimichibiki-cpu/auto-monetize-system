import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { PRBanner } from '@/components/PRBanner';
import postsData from '@/data/posts.json';

function renderManablogContent(content: string) {
  const blocks = content.split('\n\n');

  return blocks.map((block, idx) => {
    // Headers
    if (block.startsWith('## ')) {
      return <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white border-l-4 border-blue-500 pl-3 my-8 pt-2">{block.replace('## ', '')}</h2>;
    }
    if (block.startsWith('### ')) {
      return <h3 key={idx} className="text-lg font-bold text-blue-300 my-5">{block.replace('### ', '')}</h3>;
    }

    // Images
    if (block.startsWith('![')) {
      const match = block.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        return <img key={idx} src={match[2]} alt={match[1]} className="w-full rounded-2xl shadow-xl my-6" />;
      }
    }

    // Comparison Table
    if (block.includes('|') && block.includes('---')) {
      const lines = block.split('\n').filter((l) => l.trim().startsWith('|'));
      if (lines.length >= 2) {
        const headerCols = lines[0].split('|').map((c) => c.trim()).filter(Boolean);
        const rowLines = lines.slice(2);

        return (
          <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
            <table className="w-full text-left border-collapse text-base">
              <thead>
                <tr className="bg-slate-800 text-blue-300 font-bold border-b border-slate-700">
                  {headerCols.map((col, cIdx) => (
                    <th key={cIdx} className="p-4 border-r border-slate-700/50 last:border-0">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowLines.map((rLine, rIdx) => {
                  const cols = rLine.split('|').map((c) => c.trim()).filter(Boolean);
                  return (
                    <tr key={rIdx} className="border-b border-slate-800/80 hover:bg-slate-800/40 transition-colors">
                      {cols.map((col, cIdx) => (
                        <td key={cIdx} className="p-4 text-slate-200 border-r border-slate-800/50 last:border-0">{col}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
    }

    // Lists
    if (block.startsWith('- ') || block.startsWith('1. ')) {
      const items = block.split('\n');
      return (
        <ul key={idx} className="list-disc list-inside space-y-2 my-5 text-slate-200 text-base leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
          {items.map((item, iIdx) => (
            <li key={iIdx}>
              {item.replace(/^[-*]|\d+\.\s*/, '').trim()}
            </li>
          ))}
        </ul>
      );
    }

    // Default Paragraph
    return <p key={idx} className="text-slate-200 text-base leading-loose my-5">{block}</p>;
  });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = postsData.find((p) => p.slug === params.slug) || postsData[0];
  const fallbackImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>記事一覧に戻る</span>
      </Link>

      <PRBanner />

      {/* Title & Eyecatch Section */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/10 space-y-6">
        
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={post.imageUrl || fallbackImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md shadow-lg">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-4 pt-2">
          <span className="text-xs text-slate-400 font-mono">
            {new Date(post.createdAt).toLocaleDateString('ja-JP')} 更新
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            {post.summary}
          </p>

          {/* 冒頭 1. テキストリンク導線 */}
          {post.affiliateOffer && (
            <div className="pt-3 pb-1 border-t border-slate-800/80">
              <a
                href={post.affiliateOffer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                <span>👉 ※【公式】{post.affiliateOffer.title} の詳細・キャンペーン情報はこちら</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

      </div>

      {/* Article Body Content */}
      <article className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10">
        <div className="prose prose-invert max-w-none">
          {renderManablogContent(post.content)}
        </div>
      </article>

      {/* 3刀流ハイブリッド CTA BOX (2. 公式画像バナー + 3. 大型ボタン付きカード) */}
      {post.affiliateOffer && (
        <div className="glass-card rounded-3xl p-8 border border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-slate-900 to-purple-950/40 space-y-6 shadow-2xl">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              PR 公式おすすめソリューション
            </span>
            <span className="text-xs text-slate-400">{post.affiliateOffer.sponsor}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* 2. 公式画像バナー枠 */}
            {post.affiliateOffer.bannerImgUrl && (
              <div className="shrink-0 rounded-2xl overflow-hidden border border-white/10 p-2 bg-slate-950 flex items-center justify-center">
                <a href={post.affiliateOffer.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={post.affiliateOffer.bannerImgUrl}
                    alt={post.affiliateOffer.title}
                    className="hover:scale-105 transition-transform duration-300 rounded-xl"
                  />
                  {post.affiliateOffer.trackingImgUrl && (
                    <img src={post.affiliateOffer.trackingImgUrl} border="0" width="1" height="1" alt="" />
                  )}
                </a>
              </div>
            )}

            {/* 3. 詳細説明 & 大型ボタン */}
            <div className="space-y-3 flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">
                {post.affiliateOffer.title}
              </h3>
              <p className="text-sm text-slate-300 font-mono">{post.affiliateOffer.priceInfo}</p>
              
              <a
                href={post.affiliateOffer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 hover:brightness-110 transition-all hover:scale-[1.01]"
              >
                <span>公式ページで限定特典・詳細を確認する</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
