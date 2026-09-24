import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AIハック | AI副業・ツール活用・フリーランスの実践ノウハウ',
  description: 'AIを使って副業で稼ぐ方法、最新AIツールの活用術、フリーランス独立ガイド、Webマーケティングのノウハウを発信。実践的で再現性の高い情報だけを厳選。',
  keywords: ['AI副業', 'AIツール', 'フリーランス', 'Webマーケティング', 'ChatGPT', 'Gemini', '副業 稼ぎ方'],
  verification: {
    google: 'x89LtN9kuODV5znXVQhbHRcqfyfYNnmk7AUeQti55d0',
  },
  openGraph: {
    title: 'AIハック | AI×副業の実践メディア',
    description: 'AIを活用した副業・フリーランス・Webマーケティングの実践ノウハウを発信',
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FH979JLSXE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FH979JLSXE');
          `}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4110182836435824"
          crossOrigin="anonymous"
        />
      </head>
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

