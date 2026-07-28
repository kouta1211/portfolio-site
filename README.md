# portfolio-site

個人ポートフォリオサイト。Next.js (App Router) + TypeScript + Tailwind CSSで構築。

## 技術スタック

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- ESLint (`eslint-config-next`)
- Prettier
- Vitest + Testing Library
- Husky + lint-staged

## セットアップ

Node.jsのバージョンは `.nvmrc` を参照(`nvm use` などで切り替え)。

```bash
npm install
```

## 開発サーバー

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く。

## 利用可能なnpm scripts

- `npm run dev` — 開発サーバー起動
- `npm run build` — 本番ビルド
- `npm run start` — 本番ビルドの起動
- `npm run lint` — ESLint実行
- `npm run format` — Prettierでフォーマット
- `npm run format:check` — フォーマット崩れがないかチェックのみ
- `npm run test` — Vitestをwatchモードで実行
- `npm run test:run` — Vitestを1回実行

## デプロイ

[Vercel](https://vercel.com)へのデプロイを前提とした構成。追加設定なしでNext.js
プロジェクトとして自動検出される。
