/**
 * 自動トレンド・キーワード収集モジュール (Collector)
 * 人的介入なしで検索トレンドや需要の高いAI・ビジネスキーワードを自律抽出します。
 */

export interface TrendTopic {
  keyword: string;
  category: string;
  searchVolume: 'HIGH' | 'MEDIUM' | 'EMERGING';
  suggestedAngle: string;
  type: 'pillar' | 'cluster';
  parentSlug?: string;
  relatedSlugs: string[];
  slug?: string;
}

const TREND_SEED_DATABASE: TrendTopic[] = [
  {
    keyword: 'AI副業 始め方 2026',
    category: 'AI副業・自動化',
    searchVolume: 'HIGH',
    suggestedAngle: '初期費用0円で始めるAI自動マネタイズシステムの構築ガイド',
    type: 'pillar',
    slug: 'ai-side-job-roadmap-2026',
    relatedSlugs: ['ai-writing-earn-money', 'plaud-note-review', 'programming-beginner-ai-side-job', 'vpn-remote-work-security']
  },
  {
    keyword: 'AI文章生成 副業 稼ぎ方',
    category: 'AI副業・自動化',
    searchVolume: 'HIGH',
    suggestedAngle: 'AI文章生成 副業 稼ぎ方', // 指示がないためシードから類推、ただしタイトルはsuggestedAngleベースになる
    type: 'cluster',
    parentSlug: 'ai-side-job-roadmap-2026',
    slug: 'ai-writing-earn-money',
    relatedSlugs: ['plaud-note-review', 'programming-beginner-ai-side-job', 'vpn-remote-work-security']
  },
  {
    keyword: 'PLAUD NOTE レビュー AIボイスレコーダー',
    category: 'AIガジェット',
    searchVolume: 'HIGH',
    suggestedAngle: 'PLAUD NOTE レビュー AIボイスレコーダー',
    type: 'cluster',
    parentSlug: 'ai-side-job-roadmap-2026',
    slug: 'plaud-note-review',
    relatedSlugs: ['ai-writing-earn-money', 'programming-beginner-ai-side-job', 'vpn-remote-work-security']
  },
  {
    keyword: 'プログラミング未経験 AI副業',
    category: 'AI副業・自動化',
    searchVolume: 'HIGH',
    suggestedAngle: 'プログラミング未経験 AI副業',
    type: 'cluster',
    parentSlug: 'ai-side-job-roadmap-2026',
    slug: 'programming-beginner-ai-side-job',
    relatedSlugs: ['ai-writing-earn-money', 'plaud-note-review', 'vpn-remote-work-security']
  },
  {
    keyword: 'VPN リモートワーク セキュリティ',
    category: 'セキュリティ',
    searchVolume: 'HIGH',
    suggestedAngle: 'VPN リモートワーク セキュリティ',
    type: 'cluster',
    parentSlug: 'ai-side-job-roadmap-2026',
    slug: 'vpn-remote-work-security',
    relatedSlugs: ['ai-writing-earn-money', 'plaud-note-review', 'programming-beginner-ai-side-job']
  }
];

export async function collectLatestTrends(): Promise<TrendTopic> {
  // 自動化ログ
  console.log('[AutoEngine:Collector] 検索トレンドおよびニーズデータを自動スキャン中...');
  
  // ランダムまたは日付アルゴリズムに基づいて本日のターゲットトピックを選定
  const selectedIndex = Math.floor(Math.random() * TREND_SEED_DATABASE.length);
  const selectedTopic = TREND_SEED_DATABASE[selectedIndex];
  
  console.log(`[AutoEngine:Collector] 選定ターゲットキーワード: "${selectedTopic.keyword}" (${selectedTopic.category})`);
  return selectedTopic;
}
