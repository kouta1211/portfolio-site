# docs — どこに何を書くか

| 書きたいこと | 置き場所 |
| --- | --- |
| 全体の構造・ページと部品のつながり | [architecture/overview.md](architecture/overview.md) |
| 決めたことと、その理由 | [architecture/decisions/](architecture/decisions/README.md)（ADR） |
| 機能ごとの説明 | [features/](features/README.md)（触った機能の分だけ増やす） |
| 失敗から学んだ「次はどうするか」 | [lessons_learned.md](lessons_learned.md) |
| AI が守る書き方・作り方 | [../.claude/rules/](../.claude/rules/README.md) |
| セットアップ・npm scripts・開発フロー | [../README.md](../README.md) |

しきい値や既定値の数字は docs に写さない。定数の名前と置き場所を書く。

書いたものは `npm run check:docs` で検査する（CI でも回る）。
存在しないファイルや識別子を指していると落ちる。
