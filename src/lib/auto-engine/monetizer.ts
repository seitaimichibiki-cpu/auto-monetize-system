/**
 * マネタイズ・最適化モジュール (Monetizer)
 * 景表法（PR標記）の自動挿入および最適なアフィリエイト・Stripe決済オファーを紐付けます。
 */

import { GeneratedPostContent } from './generator';

export interface FinalMonetizedPost extends GeneratedPostContent {
  affiliateOffer: {
    title: string;
    url: string;
    sponsor: string;
    priceInfo: string;
  };
  prDisclaimer: string;
}

const AFFILIATE_OFFER_POOL = [
  {
    title: '【完全放置対応】AI自動化クラウドAPI 30日間無料体験',
    url: 'https://example.com/affiliate-ai-cloud',
    sponsor: 'Global AI Cloud Solutions',
    priceInfo: '初期費用0円・無料枠あり'
  },
  {
    title: '【開発者向け】NoCode / Codeレス自動化サーバー割引クーポン',
    url: 'https://example.com/affiliate-nocode-server',
    sponsor: 'Serverless Automation Inc.',
    priceInfo: '初月実質0円〜'
  },
  {
    title: '【収益最大化】AIマイクロスーSaaS構築スターターキット',
    url: 'https://example.com/affiliate-saas-kit',
    sponsor: 'SaaS Creator Lab',
    priceInfo: '特別オファー中'
  }
];

export async function attachMonetizationOffers(post: GeneratedPostContent): Promise<FinalMonetizedPost> {
  console.log(`[AutoEngine:Monetizer] "${post.title}" に収益化リンクとPR表記を自動接続中...`);

  // カテゴリやキーワードに応じて最適なオファーをランダム選定
  const offerIndex = Math.floor(Math.random() * AFFILIATE_OFFER_POOL.length);
  const selectedOffer = AFFILIATE_OFFER_POOL[offerIndex];

  // 景表法（ステマ規制対応）の必須PR表記
  const prDisclaimer = '【PR】本記事にはアフィリエイト広告およびプロモーションが含まれています。';

  console.log(`[AutoEngine:Monetizer] PR表記およびオファー "${selectedOffer.title}" の自動結合が完了しました。`);

  return {
    ...post,
    affiliateOffer: selectedOffer,
    prDisclaimer
  };
}
