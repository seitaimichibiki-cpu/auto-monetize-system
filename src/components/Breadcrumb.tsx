import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  category: string;
  title: string;
}

export function Breadcrumb({ category, title }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: 'https://auto-monetize-system.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category,
        item: `https://auto-monetize-system.vercel.app/blog?category=${encodeURIComponent(category)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="my-4">
        <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 font-medium">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-blue-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>ホーム</span>
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          </li>
          <li>
            <Link
              href={`/blog?category=${encodeURIComponent(category)}`}
              className="hover:text-blue-400 transition-colors"
            >
              {category}
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          </li>
          <li className="text-slate-200 truncate max-w-[200px] sm:max-w-[400px]" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
    </>
  );
}
