'use client';

import React, { useState, useEffect } from 'react';
import { Check, Copy, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`${title} #AIハック`);
  const shareUrlEnc = encodeURIComponent(currentUrl);

  const xShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEnc}`;
  const hatenaShareUrl = `https://b.hatena.ne.jp/entry/panel/?url=${shareUrlEnc}&title=${shareText}`;
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${shareUrlEnc}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* X (Twitter) */}
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-slate-200 bg-black/60 hover:bg-black/80 border border-slate-700/60 rounded-xl backdrop-blur-md transition-all shadow-sm"
        aria-label="X（Twitter）でシェア"
      >
        <Twitter className="w-4 h-4 text-slate-200" fill="currentColor" />
        <span>Post</span>
      </a>

      {/* はてなブックマーク */}
      <a
        href={hatenaShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-[#00A4DE] bg-[#00A4DE]/10 hover:bg-[#00A4DE]/20 border border-[#00A4DE]/30 rounded-xl backdrop-blur-md transition-all shadow-sm"
        aria-label="はてなブックマークでシェア"
      >
        <span className="font-extrabold text-[#00A4DE] leading-none">B!</span>
        <span>Hatena</span>
      </a>

      {/* LINE */}
      <a
        href={lineShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-[#06C755] bg-[#06C755]/10 hover:bg-[#06C755]/20 border border-[#06C755]/30 rounded-xl backdrop-blur-md transition-all shadow-sm"
        aria-label="LINEでシェア"
      >
        <span className="font-extrabold text-[#06C755] leading-none">LINE</span>
      </a>

      {/* URL Copy */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-slate-300 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl backdrop-blur-md transition-all shadow-sm"
        aria-label="URLをコピー"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400">コピーしました！</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-slate-400" />
            <span>URLをコピー</span>
          </>
        )}
      </button>
    </div>
  );
}
