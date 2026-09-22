import React from 'react';
import { Bot } from 'lucide-react';
import { PostCard, PostItem } from '@/components/PostCard';
import { PRBanner } from '@/components/PRBanner';
import { Sidebar } from '@/components/Sidebar';
import postsData from '@/data/posts.json';

export default function BlogListPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams?.category;
  const allPosts: PostItem[] = postsData;
  const filteredPosts = selectedCategory
    ? allPosts.filter((p) => p.category === selectedCategory)
    : allPosts;

  return (
    <div className="space-y-8 pb-12">
      
      <PRBanner />

      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
          <Bot className="w-3.5 h-3.5" />
          <span>24/7 AI AUTONOMOUS MEDIA</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          {selectedCategory ? selectedCategory : 'AI全自動生成コンテンツメディア'}
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          {selectedCategory
            ? `「${selectedCategory}」カテゴリの記事一覧（${filteredPosts.length}件）`
            : '著作権法第30条の4および景表法（PR表記）を完全遵守。最新のAI・自動化トレンドを全自動収集・執筆してパブリッシュされています。'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* メインコンテンツ */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm">該当するカテゴリの記事はまだありません。</p>
            </div>
          )}
        </div>

        {/* サイドバー */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0">
          <Sidebar currentCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}
