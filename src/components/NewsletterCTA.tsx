'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // 将来的にAPI連携予定
    }
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-gradient-to-br from-emerald-900/40 to-slate-900 text-center space-y-3">
        <div className="mx-auto w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2">
          <span className="text-2xl">✅</span>
        </div>
        <h3 className="text-lg font-bold text-emerald-400">登録ありがとうございます！</h3>
        <p className="text-sm text-slate-300">
          スタートガイドをご入力いただいたメールアドレスへ送信しました。（※将来API連携用ダミー成功画面）
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-blue-500/30 bg-gradient-to-br from-blue-900/40 via-slate-900 to-purple-900/40 relative overflow-hidden shadow-2xl">
      {/* 装飾用背景グラデーション */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🎁</span>
          無料AI副業スタートガイド
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          AIを活用して副業で月10万円を稼ぐための完全ロードマップを無料でお届けします。
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力"
              className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            無料で受け取る
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-400 text-center">
          ※ いつでも解除可能です。スパムは一切送りません。
        </p>
      </div>
    </div>
  );
};
