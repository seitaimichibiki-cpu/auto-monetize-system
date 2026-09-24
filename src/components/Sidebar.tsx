import React from 'react';
import Link from 'next/link';
import { FolderOpen, ExternalLink, Sparkles } from 'lucide-react';
import postsData from '@/data/posts.json';
import { NewsletterCTA } from '@/components/NewsletterCTA';

interface SidebarAd {
  title: string;
  url: string;
  bannerImgUrl: string;
  trackingImgUrl: string;
  sponsor: string;
}

const SIDEBAR_ADS: SidebarAd[] = [
  {
    title: 'お名前.com 高速レンタルサーバー',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+7LVF1U+50+35UAKX',
    bannerImgUrl: 'https://www28.a8.net/svt/bgt?aid=260920645460&wid=001&eno=01&mid=s00000000018019121000&mc=1',
    trackingImgUrl: 'https://www10.a8.net/0.gif?a8mat=4BCFNP+7LVF1U+50+35UAKX',
    sponsor: 'GMOインターネットグループ'
  },
  {
    title: 'PLAUD NOTE - AIボイスレコーダー',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+AMTQR6+5J4W+5ZEMP',
    bannerImgUrl: 'https://www28.a8.net/svt/bgt?aid=260920645643&wid=001&eno=01&mid=s00000025808001005000&mc=1',
    trackingImgUrl: 'https://www12.a8.net/0.gif?a8mat=4BCFNP+AMTQR6+5J4W+5ZEMP',
    sponsor: 'PLAUD NOTE Japan'
  },
  {
    title: 'ExpressVPN - 高速セキュリティVPN',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+AO0LYQ+5JSS+5YZ75',
    bannerImgUrl: 'https://www23.a8.net/svt/bgt?aid=260920645645&wid=001&eno=01&mid=s00000025894001003000&mc=1',
    trackingImgUrl: 'https://www15.a8.net/0.gif?a8mat=4BCFNP+AO0LYQ+5JSS+5YZ75',
    sponsor: 'ExpressVPN International'
  }
];

interface CategoryInfo {
  name: string;
  count: number;
  slugs: string[];
}

function getCategories(): CategoryInfo[] {
  const map = new Map<string, { count: number; slugs: string[] }>();
  postsData.forEach((post: any) => {
    const existing = map.get(post.category);
    if (existing) {
      existing.count++;
      existing.slugs.push(post.slug);
    } else {
      map.set(post.category, { count: 1, slugs: [post.slug] });
    }
  });
  return Array.from(map.entries()).map(([name, data]) => ({
    name,
    count: data.count,
    slugs: data.slugs,
  }));
}

export const Sidebar: React.FC<{ currentCategory?: string }> = ({ currentCategory }) => {
  const categories = getCategories();
  const adIndex = Math.floor(Date.now() / 86400000) % SIDEBAR_ADS.length;
  const primaryAd = SIDEBAR_ADS[adIndex];
  const secondaryAd = SIDEBAR_ADS[(adIndex + 1) % SIDEBAR_ADS.length];

  return (
    <aside className="space-y-6 sticky top-8">

      {/* カテゴリ一覧 */}
      <div className="glass-card rounded-2xl p-5 border border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <FolderOpen className="w-4 h-4 text-blue-400" />
          カテゴリ
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={`/blog?category=${encodeURIComponent(cat.name)}`}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                  currentCategory === cat.name
                    ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                !currentCategory
                  ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>すべての記事</span>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                {postsData.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* 広告スロット 1 */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PR</span>
        <a href={primaryAd.url} target="_blank" rel="noopener noreferrer" className="block">
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-white/5 flex items-center justify-center">
            <img
              src={primaryAd.bannerImgUrl}
              alt={primaryAd.title}
              className="hover:scale-105 transition-transform duration-300 w-full"
            />
          </div>
          <img src={primaryAd.trackingImgUrl} style={{border: 0}} width="1" height="1" alt="" />
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{primaryAd.title}</p>
        </a>
      </div>

      {/* おすすめ記事 */}
      <div className="glass-card rounded-2xl p-5 border border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          おすすめ記事
        </h3>
        <ul className="space-y-3">
          {postsData
            .filter((p: any) => p.type === 'pillar')
            .slice(0, 3)
            .map((post: any) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-slate-300 hover:text-blue-300 transition-colors leading-snug block"
                >
                  📋 {post.title}
                </Link>
              </li>
            ))}
          {postsData
            .filter((p: any) => p.type !== 'pillar')
            .slice(0, 3)
            .map((post: any) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-slate-300 hover:text-blue-300 transition-colors leading-snug block"
                >
                  {post.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* ニュースレター CTA */}
      <NewsletterCTA />

      {/* 広告スロット 2 */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PR</span>
        <a href={secondaryAd.url} target="_blank" rel="noopener noreferrer" className="block">
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-white/5 flex items-center justify-center">
            <img
              src={secondaryAd.bannerImgUrl}
              alt={secondaryAd.title}
              className="hover:scale-105 transition-transform duration-300 w-full"
            />
          </div>
          <img src={secondaryAd.trackingImgUrl} style={{border: 0}} width="1" height="1" alt="" />
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{secondaryAd.title}</p>
        </a>
      </div>

    </aside>
  );
};
