import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, ArrowUpRight } from 'lucide-react';
import { PRBanner } from './PRBanner';

export interface PostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  createdAt: string;
  tags: string[];
  imageUrl?: string;
  type?: string;
  affiliateOffer?: {
    title: string;
    url: string;
    sponsor: string;
    priceInfo: string;
  };
}

export const PostCard: React.FC<{ post: PostItem }> = ({ post }) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer block"
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <Image
            src={post.imageUrl || fallbackImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md shadow-md">
              {post.category}
            </span>
            {post.type === 'pillar' && (
              <span className="text-xs font-bold text-amber-300 px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30">
                📋 まとめ
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 z-10">
            <PRBanner compact={true} />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
            {post.summary}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-800">
                <Tag className="w-3 h-3 text-blue-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-white/5 mt-4">
        <span className="text-slate-400 text-xs font-mono">
          {new Date(post.createdAt).toLocaleDateString('ja-JP')}
        </span>

        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
          <span>詳細を読む</span>
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};
