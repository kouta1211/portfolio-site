# 画面・部品・テーマ

## 部品の置き場所（Atomic Design）

- `src/components/atoms/` … 1つの役目だけの部品（`Card`, `LinkButton`, `TechBadge`, `Reveal` など）
- `src/components/molecules/` … atoms を組み合わせたカード類（`ProjectCard`, `FeaturedProjectCard`）
- `src/components/organisms/` … ページの大きな区画（`Header`, `Hero`, `Footer`）
- `src/app/**/page.tsx` … organisms / molecules を並べるだけにする。ページに見た目の細かい指定を溜めない

同じ見た目を2回書きそうになったら、atoms に部品を足す。

## 色

- ブランド色は `src/components/ui/theme.ts` の `brand` トークン。コードに16進の色を直書きしない
- ライト / ダークの両方がある（`ColorModeButton`）。色を足したら、両方の見た目を確かめる
- `brand.fg` などの semantic token はダーク用の値を `_dark` に持っている。新しい色も同じ形で足す

## 動き

- 動きは `motion/react` を使う。`useReducedMotion()` を見て、動きを減らす設定の人には動かさない（`Hero`・`Reveal` がこの形）
- `Reveal` は `whileInView` で、画面に入るまで `opacity: 0`。ページの最初に見せたい中身を `Reveal` で包まない

## 'use client'

`motion` や `usePathname` を使う部品だけに付ける（`Hero`, `Header`, `Reveal`, `ProjectScreenshot`）。
ページ全体に付けない。
