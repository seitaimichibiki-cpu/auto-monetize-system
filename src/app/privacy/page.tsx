import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | AIハック',
  description: 'AIハックのプライバシーポリシー（個人情報保護方針）について。',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          トップに戻る
        </Link>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">プライバシーポリシー</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              収集する情報
            </h2>
            <p>
              当サイト「AIハック」では、利用者のアクセス解析や広告配信のために、Cookie（クッキー）等の技術を使用して情報を収集する場合があります。
              収集する情報には、IPアドレス、ブラウザの種類、アクセス日時などが含まれますが、これらは個人を特定できる情報ではありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              アクセス解析ツールについて
            </h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。<br />
              このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p className="mt-2 text-sm text-gray-400">
              ※この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              広告配信について
            </h2>
            <p>
              当サイトは、第三者配信の広告サービスを利用しています。
              このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報（Cookie）を使用することがあります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              Cookie（クッキー）の使用について
            </h2>
            <p>
              当サイトでは、一部のコンテンツにおいてCookieを利用しています。<br />
              Cookieとは、ウェブサイトを訪問した際に、ブラウザとサーバーとの間で送受信される小さなデータファイルです。<br />
              利用者は、ブラウザの設定によりCookieの受け取りを拒否することができます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              お問い合わせ
            </h2>
            <p>
              当サイトの個人情報の取扱に関するお問い合わせは、お問い合わせフォームよりご連絡ください。<br />
              また、本プライバシーポリシーは、事前の予告なく変更される場合があります。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
