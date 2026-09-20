import React from 'react';
import Link from 'next/link';
import { FileText, Eye, Tag, ArrowUpRight } from 'lucide-react';
import { PRBanner } from './PRBanner';

export interface PostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  views?: number;
  createdAt: string;
  tags: string[];
  affiliateOffer?: {
    title: string;
    url: string;
    sponsor: string;
    priceInfo: string;
  };
}

export const PostCard: React.FC<{ post: PostItem }> = ({ post }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group">
      <div>
        {/* Top Meta & PR tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            {post.category}
          </span>
          <PRBanner compact={true} />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
          {post.summary}
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {(post.views || 100).toLocaleString()} PV
          </span>
          <span>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>全自動記事を読む</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
