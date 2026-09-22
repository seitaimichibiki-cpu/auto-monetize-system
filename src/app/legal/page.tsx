import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | AIハック',
  description: 'AIハックの特定商取引法に基づく表記ページです。',
};

export default function LegalPage() {
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
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">特定商取引法に基づく表記</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              運営者情報
            </h2>
            <div className="bg-gray-950/50 rounded-xl p-5 border border-gray-800/50">
              <p className="mb-2"><strong>サイト名：</strong> AIハック</p>
              <p className="mb-2"><strong>運営責任者：</strong> 個人運営のため、請求次第開示いたします。</p>
              <p className="mb-2"><strong>所在地：</strong> 個人運営のため、請求次第開示いたします。</p>
              <p><strong>連絡先：</strong> お問い合わせフォームよりご連絡ください。ご請求いただいた場合、遅滞なく開示いたします。</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              広告について
            </h2>
            <p>
              当サイト「AIハック」は、Amazonアソシエイト・プログラム、A8.net、もしもアフィリエイトなどのアフィリエイトプログラムを利用しています。<br />
              リンク先の商品は当サイトが販売しているものではなく、各リンク先店舗での販売となります。<br />
              商品に関するお問い合わせは、各店舗へ直接ご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              免責事項
            </h2>
            <p className="mb-4">
              当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
            </p>
            <p>
              また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。<br />
              当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></span>
              著作権について
            </h2>
            <p>
              当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。<br />
              当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
