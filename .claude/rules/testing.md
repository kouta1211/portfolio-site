# テスト

- テストは対象の隣に `*.test.tsx` / `*.test.ts` で置く（例: `src/components/organisms/Hero.test.tsx`）
- Chakra の部品を描画するときは、必ず `<Provider>`（`src/components/ui/provider.tsx`）で包む。包まないと落ちる
- `matchMedia` と `IntersectionObserver` は `vitest.setup.ts` でモック済み。テストごとに書き足さない
- `globals: true` を使っていないので、`describe` / `it` / `expect` は `vitest` から import する
- 文言を変えたら、その文言で要素を探しているテストも直す（例: ボタン名を `getByRole('link', { name })` で探している）
- 1回だけ回すときは `npm run test:run`。`npm run test` は watch モードで終わらない
