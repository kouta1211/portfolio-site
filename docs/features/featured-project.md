# 代表作

## 何をするか

作品のうち1件を、一覧の先頭にスクリーンショット付きの大きなカードで出す。
トップ（`/`）と一覧（`/projects`）の両方に出る。

トップではさらに、Hero の右に代表作の画面を傾けて出し、Hero の下に代表作の実績の数字の帯を出す。

## 入口のファイル

- `src/lib/projects.ts` … 代表作にする作品に `featured: true` と `highlights`（カードに出す要点）を付ける
- `splitFeatured()`（同じファイル）… 代表作と残りに分ける
- `src/components/molecules/FeaturedProjectCard.tsx` … カードの見た目。画像は `screenshots` の1枚目
- `src/components/organisms/Hero.tsx` … 代表作を `featured` で受け取る。画像は `screenshots` の1枚目、ボタンは詳細ページへ
- `src/components/molecules/StatsBand.tsx` … 代表作の `stats` と作品の数を並べる

## 決まりごと（壊しやすい所）

- `featured: true` は1件だけに付ける。2件以上に付けると、`splitFeatured()` は配列で先に出てきた方だけを代表作にし、もう1件は普通のカードに回る
- 代表作が無ければ、代表作のカードは出ず、全部が普通のカードになる
- 「サイトを開く」は `liveUrl` があるときだけ出る
- 代表作が無いと、Hero は画面を出さず「作ったものを見る」ボタンだけになる。数字の帯は作品の数だけになる
- Hero の見出しの文言は Choreon 向け。代表作を替えたら書き直す（`.claude/rules/content.md`）

## テスト

- `src/lib/projects.test.ts` … `splitFeatured()` の分け方
- `src/components/molecules/FeaturedProjectCard.test.tsx` … カードの表示
- `src/app/page.test.tsx` … トップで代表作が1回だけ出ること・作品の数
- `src/components/organisms/Hero.test.tsx` … 代表作がある / 無いときの Hero
- `src/components/molecules/StatsBand.test.tsx` … 数字の帯
