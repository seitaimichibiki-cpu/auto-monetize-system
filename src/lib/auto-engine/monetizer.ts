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
    title: '【話題のAIデバイス】PLAUD NOTE - 6ヶ月で5万ユーザー突破のAIボイスレコーダー',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+AMTQR6+5J4W+5YRHE',
    sponsor: 'PLAUD NOTE Japan',
    priceInfo: 'AI自動文字起こし＆要約機能搭載'
  },
  {
    title: '【最新AI画像編集】Aiarty Image Enhancer - 超高速AI高画質化ツール',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+ANF6CY+428G+HVFKY',
    sponsor: 'Aiarty Software',
    priceInfo: 'AIノイズ除去・4K/8K高画質化'
  },
  {
    title: '【安全・高速通信】ExpressVPN - AI自動化・開発専用高速セキュリティVPN',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+AO0LYQ+5JSS+5YRHE',
    sponsor: 'ExpressVPN International',
    priceInfo: '30日間返金保証・高速セキュリティ'
  },
  {
    title: '【AI・IT就職】Neuro Dive - AI・データサイエンス特化の専門支援',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+BBTY5U+47GS+HV7V6',
    sponsor: 'Neuro Dive（IT・AI特化支援）',
    priceInfo: '最新AIスキル習得・就職サポート'
  },
  {
    title: '【無料登録】注目の最新AI＆ITプラットフォーム無料体験枠',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+B8US4Y+2PEO+1HMAQQ',
    sponsor: 'IT・AIパートナーズ',
    priceInfo: '完全無料登録・限定特典付き'
  },
  {
    title: '【ドメイン短縮】お名前.com ドメイン・スリム化公式サービス',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+70FT9U+50+2HDT1U',
    sponsor: 'GMOインターネットグループ',
    priceInfo: '短縮ドメイン・ブランディング最適化'
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
