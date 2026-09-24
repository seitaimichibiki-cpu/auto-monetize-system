import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PostNavigationProps {
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
}

export function ArticleNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="glass-card flex flex-col p-5 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:scale-[1.02] transition-all group"
        >
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            <span>前の記事</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
            {prevPost.title}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="glass-card flex flex-col p-5 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:scale-[1.02] transition-all group text-right items-end"
        >
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <span>次の記事</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
            {nextPost.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
