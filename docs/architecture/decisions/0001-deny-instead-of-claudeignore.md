# 0001. 読ませないファイルは `.claudeignore` ではなく `permissions.deny` で弾く

- 日付: 2026-10-21

## 何に困っていたか

`package-lock.json`（約350KB）や `tsconfig.tsbuildinfo`（約500KB）を AI が開くと、
それだけで context を大きく使う。`.env*` は開かせたくない。

## 決めたこと

`.claude/settings.json` の `permissions.deny` に `Read(...)` で並べる。一覧はそこにだけ置く。

## 選ばなかった案と、その理由

- **`.claudeignore`** … 2026-10-21 に、いま使っている `claude` CLI の本体を
  `grep -c "claudeignore"` で調べたところ 0 件だった。書いても効かない
- **両方に書く** … 一覧が2つあると必ずずれて、効いていない方を信じて事故る

## 弾かないもの

- `node_modules/` … `node_modules/next/dist/docs/` を読んで Next.js 16 の作法を確かめる必要がある
- `public/screenshots/` … `add-project-to-portfolio` スキルが画像を開いて中身を確かめる

## これで変わること

読ませたくないファイルが増えたら、`.claude/settings.json` の `permissions.deny` に足す。
