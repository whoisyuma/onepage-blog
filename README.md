# Next.js × microCMS ブログサイト
> You can find the English version of this README below.
> この README の英語版は下の方にあります。

## プロジェクト概要

このプロジェクトは、**Next.js（App Router）** と **microCMS** を使って構築したブログサイトです。  
ブログ記事一覧ページと記事詳細ページを実装し、**SSG（静的サイト生成）＋ ISR（増分静的再生成）** によって高速かつ最新のコンテンツ表示を実現しています。

## 使用技術

- **フレームワーク：** Next.js(App Router)
- **ヘッドレスCMS：** microCMS
- **言語：** Typescript
- **スタイル：** Tailwind CSS / CSS

## 主な機能

- ブログ記事の一覧表示（トップページ）
- ブログ記事の詳細ページ（動的ルーティング対応）
- microCMS からのコンテンツ取得
- SSG + ISR によるパフォーマンス最適化
- レスポンシブ対応デザイン
- カテゴリ別の絞り込み表示
- タグ別の絞り込み表示
- 画像の最適化

## 学んだこと・工夫したこと
- ISRを活用し、microCMSで記事を更新してもサイトが自動更新されるようにした。
- App Routerを採用し、最新のNext.js構成に対応した。
- ファイル構成をシンプルかつ再利用性を意識して設計した。
- microCMSのAPI設計・データ構造の考え方について学んだ。
- Next.js 15.1.6 以降の App Routerにおいて、動的ルートの params が非同期仕様になったことを学んだ。
- microCMSの構成などについて理解しながらブログ構築できた。
- より良いUI/UXを意識したデザインに気を付けた。

## 追加したい機能
- 人気記事の取得。
- ~~前の記事、次の記事をすぐに見れるボタンの追加~~ (2025-08-10実装)
- ログイン機能の実装でいいねやコメント機能の追加
- SNS共有ボタンの配置
- お問い合わせページの追加
- プライバシーポリシーの追加
- Google Adsenseに登録
- microCMSから埋め込みリンクを取得できるようにする
- OGPの設定と検索エンジン向けのメタデータの設定
- 投稿内の画像の最適化
- notfoundやloadingページの設定

## セットアップ方法
```bash
# 依存パッケージのインストール
npm install

# .env.localを作成
MICROCMS_API_KEY=your-microcms-api-key
MICROCMS_SERVICE_DOMAIN=your-microcms-service-domain

# 開発サーバー起動
npm run dev
```

## 公開サイト
こちらからデプロイ後のサイトをご覧いただけます：
[https://onepage-blog.vercel.app/](https://onepage-blog.vercel.app/)

## デザイン

### モバイル版
![モバイル版のデザイン例](/public/readme/mockup1.png)

### デスクトップ版
![デスクトップ版のデザイン例](/public/readme/mockup2.png)

## 連絡先
以下から気軽にご連絡ください：
- E-mail: [whoisyuma.0913@gmail.com](whoisyuma.0913@gmail.com)

## 備考
このアプリは学習用として作成しました。

# Next.js × microCMS Blog Site

## Project Overview

This project is a **blog site built with Next.js (App Router) and microCMS**.  
It includes a blog post list page and individual post detail pages, utilizing **SSG (Static Site Generation) + ISR (Incremental Static Regeneration)** to deliver fast and up-to-date content.

## Technologies Used

- **Framework:** Next.js (App Router)
- **Headless CMS:** microCMS
- **Language:** TypeScript
- **Styling:** Tailwind CSS / CSS

## Main Features

- Blog post listing (homepage)
- Blog post detail pages (supports dynamic routing)
- Fetch content from microCMS
- Performance optimization with SSG + ISR
- Responsive design
- Filter posts by category
- Filter posts by tag
- Image optimization

## Highlights / Learnings

- Utilized ISR to automatically update the site when articles are updated in microCMS.
- Adopted the App Router to follow the latest Next.js architecture.
- Designed the file structure to be simple and reusable.
- Learned how to design APIs and structure data in microCMS.
- Understood that starting from Next.js 15.1.6, dynamic route `params` became asynchronous in the App Router.
- Built the blog while gaining deeper understanding of microCMS configurations.
- Focused on creating a better UI/UX design.

## Planned Features

- Displaying popular articles
- Buttons to navigate to previous/next posts
- Login functionality, with like and comment features
- Social media share buttons
- Contact page
- Privacy policy page
- Registering with Google Adsense
- Ability to embed links from microCMS
- Set up OGP and SEO metadata
- Optimize images within posts
- Implement `notFound` and `loading` pages

## Setup Instructions

```bash
# Install dependencies
npm install

# Create .env.local
MICROCMS_API_KEY=your-microcms-api-key
MICROCMS_SERVICE_DOMAIN=your-microcms-service-domain

# Start the development server
npm run dev
```

## Live Site

You can view the deployed site here:  
[https://onepage-blog.vercel.app/](https://onepage-blog.vercel.app/)

## Design Previews

### Mobile Version  
![List Page](/public/readme/mockup1.png)

### Desktop Version  
![Detail Page](/public/readme/mockup2.png)

## Contact

Feel free to reach out:  
- E-mail: [whoisyuma.0913@gmail.com](mailto:whoisyuma.0913@gmail.com)

## Notes

This app was built for learning purposes.
