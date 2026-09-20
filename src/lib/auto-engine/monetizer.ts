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
    title: '【公式】お名前.com 高速レンタルサーバー（月額利用無料枠あり）',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+7LVF1U+50+35CAFM',
    sponsor: 'GMOインターネットグループ（お名前.com）',
    priceInfo: '初期費用0円・超高速SSDサーバー'
  },
  {
    title: '【初心者対応】Webサイト・AI自動化専用おすすめサーバー',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+7LVF1U+50+35CAFM',
    sponsor: 'GMOインターネットグループ',
    priceInfo: 'ドメイン実質無料・即時開設'
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
