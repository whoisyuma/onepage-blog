import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnePage Blog",
  description: "日常の出来事や、日本各地・世界の旅の思い出を綴るOnePage Blog。旅行の計画や思い出を共有します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      {/* ヘッダー */}
      <header className="bg-white w-full shadow z-50 fixed top-0">
        <nav className="flex items-center justify-around p-4">
          <h1 className="font-extrabold text-2xl">OnePage</h1>
          <div className="flex gap-x-8">
            <Link href='/' className="flex flex-col items-center">
              <div className="flex items-center space-x-1">
                <img src="/home-icon.svg" alt="ホームアイコン" className="w-4 h-4"/>
                <p className="text-base font-semibold text-gray-800">Home</p>
              </div>
              <p className="text-[10px] text-gray-500">ホーム</p>
            </Link>

            {/* <Link href='/' className="flex flex-col items-center">
              <div className="flex items-center space-x-1">
                <img src="/contact-icon.svg" alt="海外旅行アイコン" className="w-4 h-4"/>
                <p className="text-base font-semibold text-gray-800">Contact</p>
              </div>
              <p className="text-[10px] text-gray-500">お問い合わせ</p>
            </Link> */}
          </div>
        </nav>
      </header>

      {/* メイン部分 */}
        {children}

      {/* フッター */}
      <footer className="bg-white w-full border-t border-gray-200">
        <nav>
          <Link href='/sitemap' className="mx-3 text-xs text-gray-600 hover:text-black">
            サイトマップ
          </Link>
          {/* <Link href='/sitemap' className="mx-3 text-xs text-gray-600 hover:text-black">
            サイトマップ
          </Link>
          <Link href='/sitemap' className="mx-3 text-xs text-gray-600 hover:text-black">
            サイトマップ
          </Link> */}
        </nav>
        <p className="text-xs md:text-sm flex justify-center mt-1 pb-3">
          Copyright &copy; OnePage Blog All Rights Reserved.
        </p>
      </footer>
      </body>
    </html>
  );
}
