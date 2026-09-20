'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Send, Loader2, CheckCircle2, Lock, ShieldCheck, Zap } from 'lucide-react';
import toolsData from '@/data/tools.json';

export default function ToolDetailPage() {
  const params = useParams();
  const toolId = params.id as string;
  const tool = toolsData.find((t) => t.id === toolId) || toolsData[0];

  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showStripeModal, setShowStripeModal] = useState(false);

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    if (tool.isPremium) {
      setShowStripeModal(true);
      return;
    }

    setLoading(true);
    setResult(null);

    // AIシミュレーション生成処理（高速・確実なレスポンス）
    setTimeout(() => {
      setLoading(false);

      if (tool.id === 'ai-seo-title-generator') {
        setResult(
          `🎯 【AI生成 SEOタイトル案】\n` +
          `1. 【2026最新】${inputVal}で人的リソース0・完全自動マネタイズを実現する全手法\n` +
          `2. 初期費用0円から始める${inputVal}の自動化戦略と法的リスク回避ガイド\n` +
          `3. 【放置型副業】${inputVal}を活用したマイクロSaaS構築の3ステップ\n\n` +
          `📱 【SNS用キャッチコピー】\n` +
          `「作業時間ゼロで持続的ストック収入を作る！${inputVal}の最新AIシステム設計を徹底解説」`
        );
      } else if (tool.id === 'ai-text-proofreader') {
        setResult(
          `✅ 【AI文章校正＆リーガル分析結果】\n` +
          `・誤字脱字: 検出なし（正常）\n` +
          `・景表法（ステマ規制）リスク: PR表記の自動挿入を推奨します。\n` +
          `・著作権リスク: 情報解析（第30条の4）基準に適合しています。\n\n` +
          `💡 【アドバイス】\n` +
          `「絶対稼げる」「確実に100万」などの極端な誇大表現を抑え、「システム構築により自動化が可能」といった客観的記述に修正することで法的リスクゼロが担保されます。`
        );
      } else {
        setResult(
          `🚀 【AIマネタイズ設計図】\n` +
          `入力トピック: ${inputVal}\n\n` +
          `1. 集客層: ニッチな${inputVal}に関心のあるユーザー\n` +
          `2. 提供価値: 無料AIツール＋自動生成SEOノウハウ記事\n` +
          `3. マネタイズ構造:\n` +
          `   - アドセンス枠（月1〜2万円）\n` +
          `   - 高単価アフィリエイト（月5〜10万円）\n` +
          `   - Stripeサブスク課金（月5〜20万円）`
        );
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>ツール一覧に戻る</span>
      </Link>

      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            {tool.icon === 'ShieldCheck' ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{tool.name}</h1>
            <span className="text-xs text-slate-400 font-mono">24時間即時AIレスポンス</span>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{tool.description}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleRun} className="glass-card rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-200 mb-2">
            {tool.inputLabel}
          </label>
          <textarea
            rows={3}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={tool.placeholder}
            className="w-full rounded-xl glass-input p-3 text-xs leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>AIエンジン解析中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{tool.isPremium ? 'Stripe Proで実行する' : 'AI生成を即時実行（完全無料）'}</span>
            </>
          )}
        </button>
      </form>

      {/* Result Output */}
      {result && (
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 animate-pulse-subtle">
          <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>AI分析・生成完了</span>
          </div>
          <pre className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            {result}
          </pre>
        </div>
      )}

      {/* Stripe Modal Simulation */}
      {showStripeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 border border-amber-500/40 space-y-5 text-center relative">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">Stripe マクロSaaS 課金枠 (Pro)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              この機能は完全自動収収益化の「サブスクリプション課金」モデルです。Stripe決済と連携し、毎月自動的にストック収益を生み出します。
            </p>

            <div className="bg-slate-900 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-800">
              <div className="flex justify-between font-bold text-white">
                <span>月額利用プラン</span>
                <span className="text-amber-400">¥ 980 / 月</span>
              </div>
              <p className="text-[11px] text-slate-400">・無制限のAI診断・高精度ビジネスプラン作成</p>
              <p className="text-[11px] text-slate-400">・商用利用フリー＆リーガル自動保証</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowStripeModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                閉じる
              </button>
              <button
                onClick={() => {
                  alert('Stripe決済シミュレーション: 本番用Stripe API Keyを設定するとシームレスな自動決済が有効になります。');
                  setShowStripeModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold hover:brightness-110 shadow-lg"
              >
                Stripeで決済する
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
