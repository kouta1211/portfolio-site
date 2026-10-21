# 機能の地図

1機能1行。詳しい説明は、触った機能の分だけ `features/` に足す（雛形は [_template.md](_template.md)）。

| 機能 | 入口のファイル | 説明 |
| --- | --- | --- |
| 代表作 | `src/components/molecules/FeaturedProjectCard.tsx` | [featured-project.md](featured-project.md) |
| トップの Hero（代表作の画面つき） | `src/components/organisms/Hero.tsx` | [featured-project.md](featured-project.md) |
| 作品カード | `src/components/molecules/ProjectCard.tsx` | — |
| 作品の詳細ページ | `src/app/projects/<slug>/page.tsx` | 作品の追加は `add-project-to-portfolio` スキル |
| スクショと拡大表示 | `src/components/atoms/ProjectScreenshot.tsx` | — |
| スクロールで出てくる動き | `src/components/atoms/Reveal.tsx` | — |
| ヘッダーのナビと現在地 | `src/components/organisms/Header.tsx` | — |
| ライト / ダーク切り替え | `src/components/ui/color-mode.tsx`（生成物） | 初めて開いた人にはダーク（`src/app/layout.tsx` の `defaultTheme`）。色は `src/components/ui/theme.ts` |
