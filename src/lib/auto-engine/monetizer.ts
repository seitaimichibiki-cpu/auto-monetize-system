/**
 * マネタイズ・全自動ハイブリッド最適化モジュール (Monetizer)
 * テキストリンク + 公式画像バナー(300x250) + ボタン付きカード の3刀流ハイブリッド
 */

import { GeneratedPostContent } from './generator';

export interface FinalMonetizedPost extends GeneratedPostContent {
  affiliateOffer: {
    title: string;
    url: string;
    sponsor: string;
    priceInfo: string;
    bannerImgUrl?: string;
    trackingImgUrl?: string;
  };
  prDisclaimer: string;
}

const AFFILIATE_OFFER_POOL = [
  {
    title: '【公式】お名前.com 高速レンタルサーバー',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+7LVF1U+50+35UAKX',
    sponsor: 'GMOインターネットグループ（お名前.com）',
    priceInfo: '初期費用0円・超高速SSDサーバー',
    bannerImgUrl: 'https://www28.a8.net/svt/bgt?aid=260920645460&wid=001&eno=01&mid=s00000000018019121000&mc=1',
    trackingImgUrl: 'https://www10.a8.net/0.gif?a8mat=4BCFNP+7LVF1U+50+35UAKX'
  },
  {
    title: '【話題のAIデバイス】PLAUD NOTE - AIボイスレコーダー',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+AMTQR6+5J4W+5ZEMP',
    sponsor: 'PLAUD NOTE Japan',
    priceInfo: 'AI自動文字起こし＆要約機能搭載',
    bannerImgUrl: 'https://www28.a8.net/svt/bgt?aid=260920645643&wid=001&eno=01&mid=s00000025808001005000&mc=1',
    trackingImgUrl: 'https://www12.a8.net/0.gif?a8mat=4BCFNP+AMTQR6+5J4W+5ZEMP'
  },
  {
    title: '【最新AI画像編集】Aiarty Image Enhancer - 高画質化ツール',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+ANF6CY+428G+HVV0H',
    sponsor: 'Aiarty Software',
    priceInfo: 'AIノイズ除去・4K/8K高画質化',
    bannerImgUrl: 'https://www26.a8.net/svt/bgt?aid=260920645644&wid=001&eno=01&mid=s00000018952003004000&mc=1',
    trackingImgUrl: 'https://www16.a8.net/0.gif?a8mat=4BCFNP+ANF6CY+428G+HVV0H'
  },
  {
    title: '【安全・高速通信】ExpressVPN - 高速セキュリティVPN',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+AO0LYQ+5JSS+5YZ75',
    sponsor: 'ExpressVPN International',
    priceInfo: '30日間返金保証あり',
    bannerImgUrl: 'https://www23.a8.net/svt/bgt?aid=260920645645&wid=001&eno=01&mid=s00000025894001003000&mc=1',
    trackingImgUrl: 'https://www15.a8.net/0.gif?a8mat=4BCFNP+AO0LYQ+5JSS+5YZ75'
  },
  {
    title: '【AI・IT就職】Neuro Dive - AI・データサイエンス特化支援',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+BBTY5U+47GS+HVNAP',
    sponsor: 'Neuro Dive（IT・AI特化支援）',
    priceInfo: '最新AIスキル習得・キャリアサポート',
    bannerImgUrl: 'https://www27.a8.net/svt/bgt?aid=260920645685&wid=001&eno=01&mid=s00000019630003003000&mc=1',
    trackingImgUrl: 'https://www13.a8.net/0.gif?a8mat=4BCFNP+BBTY5U+47GS+HVNAP'
  },
  {
    title: '【TVCMで話題】スキルマーケット ココナラ（coconala）',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+B8US4Y+2PEO+1HSASH',
    sponsor: '株式会社ココナラ',
    priceInfo: 'イラスト・記事執筆・Web制作をオンライン発注',
    bannerImgUrl: 'https://www29.a8.net/svt/bgt?aid=260920645680&wid=001&eno=01&mid=s00000012624009034000&mc=1',
    trackingImgUrl: 'https://www10.a8.net/0.gif?a8mat=4BCFNP+B8US4Y+2PEO+1HSASH'
  },
  {
    title: '【ドメイン活用】お名前.com 公式ドメイン登録',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+70FT9U+50+2HOYA9',
    sponsor: 'GMOインターネットグループ',
    priceInfo: 'ドメイン取得・ブランディング最適化',
    bannerImgUrl: 'https://www28.a8.net/svt/bgt?aid=260920645424&wid=001&eno=01&mid=s00000000018015065000&mc=1',
    trackingImgUrl: 'https://www12.a8.net/0.gif?a8mat=4BCFNP+70FT9U+50+2HOYA9'
  },
  {
    title: '【国内最速】ConoHa WING - 高性能レンタルサーバー',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+7LVF1U+50+35UAKX',
    sponsor: 'GMOインターネットグループ（ConoHa）',
    priceInfo: '月額678円〜・初期費用無料'
  },
  {
    title: '【未経験からプロへ】TechAcademy - オンラインプログラミングスクール',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+B8US4Y+2PEO+1HSASH',
    sponsor: 'キラメックス株式会社',
    priceInfo: '最短4週間・現役エンジニアのメンター制度'
  },
  {
    title: '【クラウド会計シェアNo.1】freee - 確定申告・経理自動化',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+B8US4Y+2PEO+1HSASH',
    sponsor: 'freee株式会社',
    priceInfo: '確定申告・経理をAIで自動化'
  },
  {
    title: '【生成AI学び放題】DMM 生成AI CAMP - 最新AI技術を実践習得',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BCFNP+BA1NCI+5VEK+5YRHE',
    sponsor: 'DMM.com（生成AI CAMP）',
    priceInfo: '生成AIスキルが学び放題・実践型カリキュラム',
    bannerImgUrl: 'https://www29.a8.net/svt/bgt?aid=260920645682&wid=001&eno=01&mid=s00000027398001003000&mc=1',
    trackingImgUrl: 'https://www12.a8.net/0.gif?a8mat=4BCFNP+BA1NCI+5VEK+5YRHE'
  }
];

const CATEGORY_OFFER_MAP: Record<string, number[]> = {
  'AI副業・自動化': [10, 8, 0, 5],
  'AIガジェット': [1, 2],
  'AIテクノロジー': [10, 2, 1],
  'プログラミング': [10, 4, 5],
  'セキュリティ': [3, 0],
  'SaaS・Webツール': [0, 6],
  'コンプライアンス': [6, 0],
  '生産性・ツール': [5, 1],
  'Webマーケティング': [7],
  'フリーランス': [9],
};

export async function attachMonetizationOffers(post: GeneratedPostContent): Promise<FinalMonetizedPost> {
  console.log(`[AutoEngine:Monetizer] "${post.title}" に3刀流ハイブリッドオファーを結合中...`);

  let selectedOffer = AFFILIATE_OFFER_POOL[Math.floor(Math.random() * AFFILIATE_OFFER_POOL.length)];
  if (post.category && CATEGORY_OFFER_MAP[post.category]) {
    const offerIndices = CATEGORY_OFFER_MAP[post.category];
    if (offerIndices.length > 0) {
      selectedOffer = AFFILIATE_OFFER_POOL[offerIndices[0]];
    }
  }

  const prDisclaimer = '※ 本ページにはアフィリエイト広告およびプロモーションが含まれています。';

  console.log(`[AutoEngine:Monetizer] 3刀流ハイブリッドオファー "${selectedOffer.title}" の自動結合が完了しました。`);

  return {
    ...post,
    affiliateOffer: selectedOffer,
    prDisclaimer
  };
}
