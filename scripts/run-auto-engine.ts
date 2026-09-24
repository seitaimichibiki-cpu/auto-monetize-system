/**
 * メイン全自動パイプライン実行スクリプト
 * 実行コマンド: npm run auto-engine
 */

import { collectLatestTrends } from '../src/lib/auto-engine/collector';
import { generateContentForTopic } from '../src/lib/auto-engine/generator';
import { attachMonetizationOffers } from '../src/lib/auto-engine/monetizer';
import { publishPost } from '../src/lib/auto-engine/publisher';
import { analyzePerformanceWithGSC } from '../src/lib/auto-engine/gsc-analytics';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('====================================================');
  console.log('🚀 AI全自動マネタイズエンジン - 無人パイプライン起動');
  console.log(`[実行日時]: ${new Date().toISOString()}`);
  console.log('====================================================\n');

  try {
    // Phase 1: 人的リソース0のデータ収集
    const topic = await collectLatestTrends();

    // Phase 2: 法的リスク0のAIコンテンツ生成
    const rawPost = await generateContentForTopic(topic);

    // Phase 3: 景表法(PR)・アフィリエイト・マネタイズ最適化
    const finalPost = await attachMonetizationOffers(rawPost);

    // Phase 4: 自動パブリッシュ＆ステータス更新
    await publishPost(finalPost);

    // Phase 5: パフォーマンス解析＆リライト候補の自動判定
    const postsPath = path.join(process.cwd(), 'src/data/posts.json');
    if (fs.existsSync(postsPath)) {
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
      await analyzePerformanceWithGSC(posts);
    }

    console.log('\n====================================================');
    console.log('✨ 無人パイプライン正常完了: 新規記事と収益導線・アナリティクス解析が更新されました。');
    console.log('====================================================');
  } catch (error) {
    console.error('❌ パイプライン実行中にエラーが発生しました:', error);
    process.exit(1);
  }
}

main();

