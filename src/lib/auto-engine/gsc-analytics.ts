/**
 * Google Search Console API 連携モジュール
 * 実際の検索パフォーマンスデータ（インプレッション、クリック、CTR、掲載順位）を取得し、
 * 記事のリライト候補を自動特定する。
 * 
 * 認証: Google Cloud サービスアカウント (JSON キーファイル)
 * 環境変数:
 *   - GSC_SERVICE_ACCOUNT_KEY: サービスアカウントJSONキーのBase64エンコード文字列
 *   - GSC_SITE_URL: Search Console に登録したサイトURL (例: https://auto-monetize-system.vercel.app)
 */

import { ArticleMetrics, AnalyticsSummary } from './analytics';

interface GSCRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GSCResponse {
  rows?: GSCRow[];
  responseAggregationType?: string;
}

/**
 * Google Search Console API からページ別パフォーマンスデータを取得
 */
async function fetchSearchConsoleData(accessToken: string, siteUrl: string, startDate: string, endDate: string): Promise<GSCRow[]> {
  const apiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[GSC API] Error ${response.status}: ${errorText}`);
    throw new Error(`Search Console API error: ${response.status}`);
  }

  const data: GSCResponse = await response.json();
  return data.rows || [];
}

/**
 * サービスアカウントの認証情報からアクセストークンを取得
 * JWT (JSON Web Token) を生成して Google OAuth2 トークンエンドポイントに送信
 */
async function getAccessToken(serviceAccountKey: string): Promise<string> {
  // Base64デコードしてJSONパース
  const keyData = JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf-8'));

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: keyData.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');

  // Node.js の crypto で RS256 署名
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(keyData.private_key, 'base64url');

  const jwt = `${header}.${payload}.${signature}`;

  // アクセストークン取得
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error(`[GSC Auth] Token error: ${errorText}`);
    throw new Error(`OAuth2 token error: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * Search Console 実データで記事パフォーマンスを解析
 * 環境変数が未設定の場合はモックデータにフォールバック
 */
export async function analyzePerformanceWithGSC(
  posts: Array<{ slug: string; category: string; content: string }>
): Promise<AnalyticsSummary> {
  const serviceAccountKey = process.env.GSC_SERVICE_ACCOUNT_KEY;
  const siteUrl = process.env.GSC_SITE_URL || 'https://auto-monetize-system.vercel.app';

  if (!serviceAccountKey) {
    console.log('[AutoEngine:GSC] GSC_SERVICE_ACCOUNT_KEY が未設定のため、モックデータで解析します。');
    console.log('[AutoEngine:GSC] 実データ連携するには以下の手順を実行してください:');
    console.log('  1. Google Cloud Console でプロジェクトを作成');
    console.log('  2. Search Console API を有効化');
    console.log('  3. サービスアカウントを作成し、JSONキーをダウンロード');
    console.log('  4. Search Console でサービスアカウントのメールアドレスをユーザーとして追加');
    console.log('  5. JSONキーをBase64エンコードして環境変数 GSC_SERVICE_ACCOUNT_KEY に設定');
    console.log('  6. 環境変数 GSC_SITE_URL にサイトURLを設定');
    
    // フォールバック: 既存のモック解析を使用
    const { analyzePerformance } = await import('./analytics');
    return analyzePerformance(posts);
  }

  console.log('[AutoEngine:GSC] Google Search Console API から実データを取得中...');

  try {
    const accessToken = await getAccessToken(serviceAccountKey);

    // 過去28日間のデータを取得
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const gscData = await fetchSearchConsoleData(accessToken, siteUrl, startDate, endDate);

    console.log(`[AutoEngine:GSC] ${gscData.length} ページ分のデータを取得`);

    // posts.json のスラグとマッチング
    const metricsList: ArticleMetrics[] = posts.map(post => {
      const pageUrl = `${siteUrl}/blog/${post.slug}`;
      const gscRow = gscData.find(row => row.keys[0] === pageUrl || row.keys[0].includes(post.slug));

      const wordCount = post.content.replace(/\s+/g, '').length;

      if (gscRow) {
        let needsRewrite = false;
        let rewriteReason = '';

        // リライト判定ロジック
        if (wordCount < 3000) {
          needsRewrite = true;
          rewriteReason = `文字数不足 (${wordCount}文字 / 目標4000文字以上)`;
        } else if (gscRow.ctr < 0.025 && gscRow.impressions > 100) {
          needsRewrite = true;
          rewriteReason = `CTR低迷 (${(gscRow.ctr * 100).toFixed(1)}% / タイトル・メタタグ改善推奨)`;
        } else if (gscRow.position > 20) {
          needsRewrite = true;
          rewriteReason = `掲載順位低迷 (平均${gscRow.position.toFixed(1)}位 / コンテンツ拡充推奨)`;
        }

        return {
          slug: post.slug,
          pageViews: gscRow.clicks * 3, // クリック数からPV推定（平均3PV/セッション）
          impressions: gscRow.impressions,
          clicks: gscRow.clicks,
          ctr: parseFloat((gscRow.ctr * 100).toFixed(2)),
          avgPosition: parseFloat(gscRow.position.toFixed(1)),
          conversionCount: Math.floor(gscRow.clicks * 0.03), // 推定コンバージョン率3%
          needsRewrite,
          rewriteReason,
        };
      }

      // GSCにデータがない場合（新規記事等）
      return {
        slug: post.slug,
        pageViews: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0,
        avgPosition: 0,
        conversionCount: 0,
        needsRewrite: wordCount < 3000,
        rewriteReason: wordCount < 3000 ? `文字数不足 (${wordCount}文字)` : undefined,
      };
    });

    const totalPageViews = metricsList.reduce((acc, cur) => acc + cur.pageViews, 0);
    const totalClicks = metricsList.reduce((acc, cur) => acc + cur.clicks, 0);
    const rewriteCandidates = metricsList.filter(m => m.needsRewrite);

    // カテゴリ別集計
    const categoryClicks: Record<string, number> = {};
    posts.forEach((p, idx) => {
      categoryClicks[p.category] = (categoryClicks[p.category] || 0) + metricsList[idx].clicks;
    });

    let topCategory = 'AI副業・自動化';
    let maxClicks = 0;
    Object.entries(categoryClicks).forEach(([cat, clicks]) => {
      if (clicks > maxClicks) {
        maxClicks = clicks;
        topCategory = cat;
      }
    });

    console.log(`[AutoEngine:GSC] 実データ解析完了:`);
    console.log(`  総クリック数: ${totalClicks}`);
    console.log(`  推定総PV数: ${totalPageViews}`);
    console.log(`  最優先カテゴリ: "${topCategory}" (${maxClicks} clicks)`);
    console.log(`  要リライト記事: ${rewriteCandidates.length}件`);

    return {
      totalPageViews,
      totalClicks,
      topPerformingCategory: topCategory,
      rewriteCandidates,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[AutoEngine:GSC] API接続エラー。モックデータにフォールバックします:', error);
    const { analyzePerformance } = await import('./analytics');
    return analyzePerformance(posts);
  }
}
