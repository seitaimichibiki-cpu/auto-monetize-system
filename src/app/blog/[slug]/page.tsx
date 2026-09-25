import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles, Clock, FileText, List, ChevronRight } from 'lucide-react';
import { PRBanner } from '@/components/PRBanner';
import { Sidebar } from '@/components/Sidebar';
import { NewsletterCTA } from '@/components/NewsletterCTA';
import { ShareButtons } from '@/components/ShareButtons';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ArticleNavigation } from '@/components/ArticleNavigation';
import postsData from '@/data/posts.json';
import type { Metadata } from 'next';
import Image from 'next/image';

const BASE_URL = 'https://auto-monetize-system.vercel.app';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = postsData.find((p) => p.slug === params.slug);
  if (!post) return { title: '記事が見つかりません | AIハック' };
  
  const fallbackImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  const ogImageUrl = post.imageUrl || fallbackImage;

  return {
    title: `${post.title} | AIハック`,
    description: post.summary || post.content.replace(/\s+/g, ' ').slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.summary || post.content.replace(/\s+/g, ' ').slice(0, 160),
      type: 'article',
      url: `${BASE_URL}/blog/${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || post.content.replace(/\s+/g, ' ').slice(0, 160),
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

function ArticleJsonLd({ post }: { post: any }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary || '',
    image: post.imageUrl || '',
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: { '@type': 'Organization', name: 'AIハック' },
    publisher: {
      '@type': 'Organization',
      name: 'AIハック',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function parseInline(text: string) {
  let parsed = text;
  // **bold**
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  
  // [text](URL)
  parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer">$1</a>');

  // » 参考：... (Make it look like an internal link)
  parsed = parsed.replace(/(»\s*参考：.*?)(<a|<br|$)/g, (match, p1, p2) => {
    return `<span class="inline-block mt-2 mb-2 p-3 bg-slate-800/80 border-l-4 border-blue-500 rounded-r-lg text-sm font-bold text-slate-200">${p1}</span>${p2}`;
  });

  return parsed;
}

function renderManablogContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentList: string[] = [];
  let currentParagraph: string[] = [];
  let currentTable: string[] = [];
  let keyIdx = 0;
  let h2Count = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={keyIdx++} className="list-disc list-inside space-y-2 my-5 text-slate-200 text-base leading-relaxed bg-slate-900/50 p-4 sm:p-6 rounded-xl border border-slate-800/80">
          {currentList.map((item, iIdx) => (
            <li key={`li-${keyIdx}-${iIdx}`} dangerouslySetInnerHTML={{ __html: parseInline(item.replace(/^[-*]|\d+\.\s*/, '').trim()) }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(
        <p key={keyIdx++} className="text-slate-200 text-base leading-loose my-5" dangerouslySetInnerHTML={{ __html: parseInline(currentParagraph.join('<br />')) }} />
      );
      currentParagraph = [];
    }
  };

  const flushTable = () => {
    if (currentTable.length > 0) {
      const headerCols = currentTable[0].split('|').map(c => c.trim()).filter(Boolean);
      const rowLines = currentTable.slice(1).filter(l => !l.includes('---'));
      
      elements.push(
        <div key={keyIdx++} className="my-8 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <table className="w-full text-left border-collapse text-base min-w-[600px]">
            <thead>
              <tr className="bg-slate-800 text-blue-300 font-bold border-b border-slate-700">
                {headerCols.map((col, cIdx) => (
                  <th key={`th-${keyIdx}-${cIdx}`} className="p-4 border-r border-slate-700/50 last:border-0" dangerouslySetInnerHTML={{ __html: parseInline(col) }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {rowLines.map((rLine, rIdx) => {
                const cols = rLine.split('|').map((c) => c.trim()).filter(Boolean);
                return (
                  <tr key={`tr-${keyIdx}-${rIdx}`} className="border-b border-slate-800/80 hover:bg-slate-800/40 transition-colors">
                    {cols.map((col, cIdx) => (
                      <td key={`td-${keyIdx}-${rIdx}-${cIdx}`} className="p-4 text-slate-200 border-r border-slate-800/50 last:border-0" dangerouslySetInnerHTML={{ __html: parseInline(col) }} />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      currentTable = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      flushList();
      flushParagraph();
      flushTable();
      continue;
    }

    if (trimmed.startsWith('|')) {
      flushList();
      flushParagraph();
      currentTable.push(line);
      continue;
    } else {
      flushTable();
    }

    if (trimmed.startsWith('<a ') || trimmed.startsWith('<img ') || trimmed.startsWith('<div ') || trimmed.startsWith('<h2 ') || trimmed.startsWith('</div') || trimmed.startsWith('</h2')) {
      flushList();
      flushParagraph();
      // If it's a rich H2 card with id, track heading ID
      if (trimmed.includes('class="rich-h2-card"') || trimmed.includes('class="section-header-img"')) {
        elements.push(<div key={keyIdx++} id={`heading-${h2Count++}`} dangerouslySetInnerHTML={{ __html: line }} className="scroll-mt-24" />);
      } else {
        elements.push(<div key={keyIdx++} dangerouslySetInnerHTML={{ __html: line }} />);
      }
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      flushParagraph();
      const title = line.replace('## ', '');
      elements.push(<h2 key={keyIdx++} id={`heading-${h2Count++}`} className="text-xl sm:text-2xl font-bold text-white border-l-4 border-blue-500 pl-3 my-8 pt-2 scroll-mt-24" dangerouslySetInnerHTML={{ __html: parseInline(title) }} />);
      continue;
    }
    
    if (line.startsWith('### ')) {
      flushList();
      flushParagraph();
      elements.push(<h3 key={keyIdx++} className="text-lg font-bold text-blue-300 my-5" dangerouslySetInnerHTML={{ __html: parseInline(line.replace('### ', '')) }} />);
      continue;
    }

    if (line.startsWith('![')) {
      flushList();
      flushParagraph();
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        const alt = match[1];
        const url = match[2];
        if (url.includes('a8.net')) {
          elements.push(<img key={keyIdx++} src={url} alt={alt} className="w-full rounded-2xl shadow-xl my-6" />);
        } else {
          elements.push(<Image key={keyIdx++} src={url} alt={alt} width={1200} height={630} sizes="100vw" className="w-full h-auto rounded-2xl shadow-xl my-6" />);
        }
      }
      continue;
    }

    if (trimmed === '---') {
      flushList();
      flushParagraph();
      elements.push(<hr key={keyIdx++} className="my-8 border-slate-700/50" />);
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('1. ')) {
      flushParagraph();
      currentList.push(line);
      continue;
    }

    // Default Paragraph
    flushList();
    currentParagraph.push(line);
  }

  flushList();
  flushParagraph();
  flushTable();

  return elements;
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = postsData.find((p) => p.slug === params.slug) || postsData[0];
  const fallbackImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  // 目次（TOC）の抽出
  const lines = post.content.split('\n');
  const toc: { title: string, id: string }[] = [];
  let h2Count = 0;
  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    if (line.startsWith('## ')) {
      toc.push({
        title: line.replace('## ', '').replace(/\*\*(.*?)\*\*/g, '$1'),
        id: `heading-${h2Count++}`
      });
    } else if (line.includes('rich-h2-title')) {
      const match = line.match(/class="rich-h2-title">(.*?)<\/div>/) || line.match(/<span class="section-title"[^>]*>(.*?)<\/span>/);
      const extractedTitle = match ? match[1] : `章 ${h2Count + 1}`;
      toc.push({
        title: extractedTitle.replace(/<[^>]+>/g, ''),
        id: `heading-${h2Count++}`
      });
    }
  }

  // 関連記事の抽出（同じカテゴリ、現在の記事を除く、最大4件）
  const relatedPosts = postsData
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 4);

  // 前後の記事の抽出
  const categoryPosts = postsData.filter(p => p.category === post.category);
  const catCurrentIndex = categoryPosts.findIndex(p => p.slug === post.slug);
  
  let prevPost = null;
  let nextPost = null;

  if (catCurrentIndex > 0) {
    prevPost = { slug: categoryPosts[catCurrentIndex - 1].slug, title: categoryPosts[catCurrentIndex - 1].title };
  } else {
    const currentIndex = postsData.findIndex(p => p.slug === post.slug);
    if (currentIndex > 0) {
      prevPost = { slug: postsData[currentIndex - 1].slug, title: postsData[currentIndex - 1].title };
    }
  }

  if (catCurrentIndex >= 0 && catCurrentIndex < categoryPosts.length - 1) {
    nextPost = { slug: categoryPosts[catCurrentIndex + 1].slug, title: categoryPosts[catCurrentIndex + 1].title };
  } else {
    const currentIndex = postsData.findIndex(p => p.slug === post.slug);
    if (currentIndex >= 0 && currentIndex < postsData.length - 1) {
      nextPost = { slug: postsData[currentIndex + 1].slug, title: postsData[currentIndex + 1].title };
    }
  }

  // 文字数と読了目安
  const wordCount = post.content.replace(/\s+/g, '').length;
  const readTime = Math.ceil(wordCount / 500) || 1;

  return (
    <>
      <ArticleJsonLd post={post} />
      <div className="flex gap-8 pb-16 px-4 sm:px-0">
        {/* メインコンテンツ */}
        <div className="flex-1 min-w-0 max-w-4xl space-y-8">

      <div className="flex flex-col gap-2">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span>記事一覧に戻る</span>
        </Link>
        <Breadcrumb category={post.category} title={post.title} />
      </div>

      <PRBanner />

      {/* Title & Eyecatch Section */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/10 space-y-6">
        
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <Image
            src={post.imageUrl || fallbackImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md shadow-lg">
              {post.category}
            </span>
            {/* 記事タイプバッジ */}
            {(post as any).type === 'pillar' && (
              <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md shadow-lg flex items-center gap-1">
                <FileText className="w-3 h-3" />
                📋 まとめ記事
              </span>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4 pt-2">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <span>{new Date(post.createdAt).toLocaleDateString('ja-JP')} 更新</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>約{wordCount.toLocaleString()}文字 / 読了目安 {readTime}分</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            {post.summary}
          </p>

          <div className="pt-2">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

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
      <article className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10">
        
        {/* 目次（TOC） */}
        {toc.length > 0 && (
          <div className="mb-10 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 text-white font-bold text-lg border-b border-slate-700/50 pb-3">
              <List className="w-5 h-5 text-blue-400" />
              <h2>目次</h2>
            </div>
            <ul className="space-y-3">
              {toc.map((item, i) => (
                <li key={i}>
                  <a 
                    href={`#${item.id}`}
                    className="flex items-start gap-2 text-sm sm:text-base text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-invert max-w-none text-slate-200">
          {renderManablogContent(post.content)}
        </div>
      </article>

      {/* 前後の記事ナビゲーション */}
      <ArticleNavigation prevPost={prevPost} nextPost={nextPost} />

      {/* 関連記事セクション */}
      {relatedPosts.length > 0 && (
        <div className="space-y-6 pt-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📚 この記事を読んだ人はこちらも読んでいます</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <Link key={rPost.slug} href={`/blog/${rPost.slug}`} className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-1 group flex flex-col">
                <div className="h-32 bg-slate-800 overflow-hidden relative">
                  <Image src={rPost.imageUrl || fallbackImage} alt={rPost.title} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-2 group-hover:text-blue-300 transition-colors">
                    {rPost.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(rPost.createdAt).toLocaleDateString('ja-JP')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3刀流ハイブリッド CTA BOX */}
      {post.affiliateOffer && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-slate-900 to-purple-950/40 space-y-6 shadow-2xl">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
              PR 公式おすすめソリューション
            </span>
            <span className="text-xs text-slate-400">{post.affiliateOffer.sponsor}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {post.affiliateOffer.bannerImgUrl && (
              <div className="shrink-0 rounded-2xl overflow-hidden border border-white/10 p-2 bg-slate-950 flex items-center justify-center">
                <a href={post.affiliateOffer.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={post.affiliateOffer.bannerImgUrl}
                    alt={post.affiliateOffer.title}
                    className="hover:scale-105 transition-transform duration-300 rounded-xl"
                  />
                  {post.affiliateOffer.trackingImgUrl && (
                    <img src={post.affiliateOffer.trackingImgUrl} style={{border: 0}} width="1" height="1" alt="" />
                  )}
                </a>
              </div>
            )}

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

      {/* Newsletter CTA */}
      <div className="mt-12">
        <NewsletterCTA />
      </div>

        </div>

        {/* サイドバー */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}

