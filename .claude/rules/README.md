# .claude/rules — 索引

いま触る所の分だけ開く。全部を読む必要はない。

| ファイル | 開くとき |
| --- | --- |
| [frontend.md](frontend.md) | 画面・部品・テーマを触る |
| [content.md](content.md) | 掲載作品・自己紹介などの文章を書く・直す |
| [testing.md](testing.md) | テストを書く・直す |

## 最初に踏む地雷

1. **Next.js 16 / React 19 は記憶と違う。** 書く前に `node_modules/next/dist/docs/` の
   該当ページを読む（`AGENTS.md` の指示）
2. **Next.js 16 の既定は Turbopack だが、ここは webpack。** `package.json` の scripts で
   `--webpack` を指定している。Turbopack 前提の設定や記事をそのまま当てない
3. **Chakra UI は v3。** `colorScheme` ではなく `colorPalette`、`Modal` ではなく
   `Dialog*`、`as` より `asChild`。迷ったら既存の部品を grep して書き方を合わせる
4. **掲載作品の情報は3箇所にある**（`src/lib/projects.ts`・`src/app/projects/<slug>/page.tsx`・
   `README.md` の一覧）。1つ直したら残り2つも見る。詳しくは [content.md](content.md)
5. **`src/components/ui/` は Chakra CLI の生成物で、手で直さない。** ただし
   `src/components/ui/theme.ts` だけは手書きのテーマで、ここは直してよい
6. **`Reveal` で包んだ中身は、スクロールするまで透明。** スクショで中身が無いように
   見えても、壊れているとは限らない。撮る前にページを一番下までスクロールする
7. **大きいファイルを開かない。** `package-lock.json`・`*.tsbuildinfo`・`.next/` は
   `.claude/settings.json` の `permissions.deny` で読めないようにしてある
   （理由は [ADR 0001](../../docs/architecture/decisions/0001-deny-instead-of-claudeignore.md)）
