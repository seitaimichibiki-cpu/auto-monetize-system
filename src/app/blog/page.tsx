import React from 'react';
import { Bot } from 'lucide-react';
import { PostCard, PostItem } from '@/components/PostCard';
import { PRBanner } from '@/components/PRBanner';
import postsData from '@/data/posts.json';

export default function BlogListPage() {
  const posts: PostItem[] = postsData;

  return (
    <div className="space-y-8 pb-12">
      
      <PRBanner />

      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
          <Bot className="w-3.5 h-3.5" />
          <span>24/7 AI AUTONOMOUS MEDIA</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">AI全自動生成コンテンツメディア</h1>
        <p className="text-xs text-slate-400 mt-2">
          著作権法第30条の4および景表法（PR表記）を完全遵守。最新のAI・自動化トレンドを全自動収集・執筆してパブリッシュされています。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
