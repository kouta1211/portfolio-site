# 全体の構造

静的なポートフォリオサイト。DB や API は持たない。データは `src/lib/projects.ts` の配列だけ。

## ページ

| URL | ファイル | 中身 |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | `Hero` → About → 作品（代表作 + 残り） |
| `/projects` | `src/app/projects/page.tsx` | 作品の一覧（代表作 + 残り） |
| `/projects/<slug>` | `src/app/projects/<slug>/page.tsx` | 作品ごとに1ファイル。動的ルートではない |

全ページ共通の枠は `src/app/layout.tsx`（`Header` / `Footer` / `Provider`）。

## データの流れ

```
src/lib/projects.ts（projects 配列）
  ├─ splitFeatured() → 代表作 1件 + 残り
  │     ├─ FeaturedProjectCard（代表作）
  │     └─ ProjectCard（残り）
  └─ 詳細ページ: projects.find((p) => p.slug === '<slug>')
```

詳細ページの本文（概要・工夫した点など）は `projects.ts` ではなく、各 `page.tsx` に直書きしている。

## 見た目の土台

- Chakra UI v3。テーマは `src/components/ui/theme.ts`（`brand` 色）
- `src/components/ui/provider.tsx` が Chakra とライト / ダーク切り替え（next-themes）をまとめて包む
- 画像は `public/screenshots/<slug>-<n>.png`。`next/image` で出す
