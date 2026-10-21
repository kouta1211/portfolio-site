# AI 用コンテキストの目次

いま触る所の分だけ開く。全部を読まない。

| 開くもの | いつ |
| --- | --- |
| [.claude/rules/README.md](.claude/rules/README.md) | 最初に1回。地雷の一覧と、規約ファイルの索引 |
| [docs/README.md](docs/README.md) | 何をどこに書くか迷ったとき |
| [docs/architecture/overview.md](docs/architecture/overview.md) | ページとデータのつながりを知りたいとき |
| [docs/features/README.md](docs/features/README.md) | 機能の入口のファイルを探すとき |

## このプロジェクト固有のこと

- 地雷（Next.js 16・webpack 指定・Chakra v3・掲載作品が3箇所・生成物の `src/components/ui/`・
  スクロールで出てくる `Reveal`）は [.claude/rules/README.md](.claude/rules/README.md) にまとめてある
- 説明の量・自律の範囲・品質の原則・学びの記録の作法は、グローバルの `~/.claude/CLAUDE.md` が正。ここへ写さない

### いま機械で守られていること

ここが下がったら（チェックを外した・CI から消えた）直す。

| 何が | どこで |
| --- | --- |
| ESLint（`eslint-config-next` の core-web-vitals と typescript） | `eslint.config.mjs`、CI、コミット前（lint-staged） |
| Prettier | `.prettierrc`、コミット前（lint-staged） |
| TypeScript の `strict` | `tsconfig.json`、`npm run verify` |
| テスト（Vitest） | `npm run test:run`、CI |
| docs が実在するものだけを指しているか | `scripts/check-docs.mjs`（`npm run check:docs`）、CI |
| ビルドが通るか | CI の `npm run build` |

手元でまとめて確かめるときは `npm run verify`。

### 記録の置き場所

- 失敗から学んだこと … [docs/lessons_learned.md](docs/lessons_learned.md)
- 2回出た教訓の昇格先 … [.claude/rules/](.claude/rules/README.md) の該当ファイル

---

@AGENTS.md
