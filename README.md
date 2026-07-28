# portfolio-site

個人ポートフォリオサイト。Next.js (App Router) + TypeScript + Chakra UIで構築。

## 技術スタック

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- TypeScript
- [Chakra UI](https://chakra-ui.com) v3
- ESLint (`eslint-config-next`)
- Prettier
- Vitest + Testing Library
- Husky + lint-staged

## ディレクトリ構成

`src/components/`はAtomic Designで構成:

- `atoms/` — 最小単位の部品(`TechBadge`, `ScreenshotPlaceholder`)
- `molecules/` — atomsを組み合わせた部品(`ProjectCard`)
- `organisms/` — 業務ロジックを持つ複合的な部品(`Header`, `Footer`, `Hero`)
- `ui/` — Chakra CLIが生成したスニペット(`provider`, `color-mode`)。編集しない

ページ(`src/app/**/page.tsx`)はorganisms/moleculesを組み立てるだけの薄い実装
にする。

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

## 開発フロー

`main`ブランチはブランチ保護により直接pushできない。変更はfeatureブランチを
切ってpush → Pull Request作成 → GitHub Actions(lint/test/build)通過後にマージ
する。
