import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AutoMonetize AI - 完全自律型マイクロSaaS＆情報プラットフォーム',
  description: '人的リソース0・法的リスク0・初期経費0で完全自動化された収益化システム。無料AIマイクロツールと最新AI自動生成メディアを公開中。',
  keywords: ['AI自動化', '完全自動マネタイズ', 'マイクロSaaS', '副業', '景表法遵守', 'Gemini API'],
  openGraph: {
    title: 'AutoMonetize AI - 完全自律型マネタイズプラットフォーム',
    description: '人的0・リスク0・経費0の完全無人収益化システム',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <div className="bg-orb-1"></div>
        <div className="bg-orb-2"></div>
        
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
