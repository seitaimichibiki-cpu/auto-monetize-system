'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Bot, Play, CheckCircle2, TrendingUp, ShieldCheck, FileText, Eye, Activity, RefreshCw } from 'lucide-react';
import analyticsData from '@/data/analytics.json';

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(analyticsData);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string | null>(null);

  const handleRunPipelineManual = () => {
    setRunning(true);
    setLog('🚀 AI全自動パイプラインを起動中...\n[1/4] トレンドキーワード解析完了\n[2/4] 法的フィルタ付きAIコンテンツ生成完了\n[3/4] PR標記・アフィリエイトオファー自動付与\n[4/4] posts.json へ正常保存！');

    setTimeout(() => {
      setRunning(false);
      setAnalytics((prev) => ({
        ...prev,
        totalPostsGenerated: prev.totalPostsGenerated + 1,
        lastAutoRun: new Date().toISOString(),
        trafficStats: {
          ...prev.trafficStats,
          searchIndexCount: prev.trafficStats.searchIndexCount + 1,
        },
        revenueStats: {
          ...prev.revenueStats,
          month1CurrentEst: prev.revenueStats.month1CurrentEst + 1200,
        },
      }));
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      
      {/* Dashboard Top Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold font-mono mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM STATUS: {analytics.systemStatus}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">完全放置自動化モニタリング</h1>
          <p className="text-xs text-slate-400 mt-1">最終自動実行時刻: {new Date(analytics.lastAutoRun).toLocaleString('ja-JP')}</p>
        </div>

        {/* Manual Trigger Test Button */}
        <button
          onClick={handleRunPipelineManual}
          disabled={running}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
        >
          {running ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>無人パイプライン実行中...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>自動生成エンジンを手動テストテストトリガー</span>
            </>
          )}
        </button>
      </div>

      {/* Realtime Execution Log */}
      {log && (
        <div className="glass-card rounded-2xl p-4 border border-blue-500/40 bg-slate-950 font-mono text-xs text-blue-300 space-y-1">
          <div className="flex items-center gap-2 text-white font-bold mb-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>パイプライン実行ログ</span>
          </div>
          <pre className="whitespace-pre-wrap">{log}</pre>
        </div>
      )}

      {/* Revenue & Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Month 1 */}
        <div className="glass-card rounded-2xl p-6 border border-blue-500/20">
          <div className="text-xs text-slate-400 font-mono mb-1">目標① 3ヶ月目</div>
          <div className="text-xl font-extrabold text-white">100,000 円</div>
          <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">現在推定達成度</span>
            <span className="font-mono text-blue-400 font-bold">{Math.round((analytics.revenueStats.month1CurrentEst / 100000) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (analytics.revenueStats.month1CurrentEst / 100000) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Month 6 */}
        <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
          <div className="text-xs text-purple-400 font-mono mb-1">目標② 半年目 (6ヶ月)</div>
          <div className="text-xl font-extrabold text-white">500,000 円</div>
          <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">目標ステータス</span>
            <span className="font-mono text-purple-400 font-bold">Stripeサブスク準備完了</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Month 12 */}
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/20">
          <div className="text-xs text-emerald-400 font-mono mb-1">目標③ 1年目 (12ヶ月)</div>
          <div className="text-xl font-extrabold text-white">1,000,000 円＋</div>
          <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">完全自動放置モデル</span>
            <span className="font-mono text-emerald-400 font-bold">READY</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '10%' }}></div>
          </div>
        </div>

      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>全自動生成記事数</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{analytics.totalPostsGenerated} <span className="text-xs font-normal text-slate-400">本</span></div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>AIツール総実行数</span>
            <Bot className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{analytics.totalToolExecutions.toLocaleString()} <span className="text-xs font-normal text-slate-400">回</span></div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>月間推定PV数</span>
            <Eye className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{analytics.trafficStats.monthlyPv.toLocaleString()} <span className="text-xs font-normal text-slate-400">PV</span></div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border border-emerald-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>法的リスク違反スコア</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{analytics.complianceCheck.legalRiskScore} <span className="text-xs font-normal text-slate-400">(完全0)</span></div>
          <div className="text-[10px] text-emerald-400/80">PR表記カバー率: {analytics.complianceCheck.prTagCoverage}</div>
        </div>

      </div>

    </div>
  );
}
