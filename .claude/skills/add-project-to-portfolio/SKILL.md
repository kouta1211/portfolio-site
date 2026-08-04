---
name: add-project-to-portfolio
description: 新しく作った個人開発プロジェクトを、このportfolio-siteの一覧・詳細ページに追加する。「新しいプロジェクトをポートフォリオに追加して」「〇〇を掲載して」のような依頼で使う。掲載内容は必ず対象プロジェクトの実際のREADME/コードから確認した事実のみで書き、憶測や一般論での穴埋めはしない。
---

# portfolio-site: プロジェクトの追加

新規プロジェクト(例: `my_project`直下の別ディレクトリ)を、このportfolio-siteに
掲載するための一連の作業を毎回手作業でやらずに済ませるためのスキル。
2026-08-04にmeishi-app/payment-optimizer/study-record-app/tech-blogの4件を
実際に追加した際の手順・つまずいた点をベースにしている。

## 進め方の原則

1. **コードを書く前にPlan Modeで方針を確認する**(ユーザーのグローバルルール)。
   対象プロジェクトの調査が終わり、掲載文言の下書きができた時点で一度
   `EnterPlanMode`し、以下の「1〜3. 調査」で分かった事実と下書き文言を
   ユーザーに提示してから実装に入る。
2. **事実に基づかない記述は一切書かない**。「工夫した点」「つまずいた点と解決策」
   は、対象プロジェクトの実際のREADME・コード・コミット履歴・(あれば)会話内で
   ユーザーから聞いた内容からのみ書く。それらしい一般論で埋めない。証拠が無い
   項目(特に「つまずいた点」)は**セクションごと省略してよい**(study-record-app
   は当初これで、後日ユーザー自身が実体験を書き足した)。
3. `main`ブランチはブランチ保護がかかっているため、直接pushしない。
   `feature/add-<slug>`のようなブランチを切って作業し、push後にユーザーへ
   PR作成・マージを依頼する。

## 1. 対象プロジェクトの場所を確認する

`args`でパスが渡されていなければユーザーに確認する。だいたい`my_project`直下の
兄弟ディレクトリになっている想定
(`c:\Users\owner\Documents\my_project\<project-dir>`)。

## 2. 対象プロジェクトを調査する(事実収集。憶測禁止)

- `README.md`を読む(無い/薄い場合はソースコードから直接読み取る)
- `package.json`の`dependencies`/`devDependencies`から実際の技術スタックを
  確認する(READMEの記載が古い可能性があるため、package.jsonと突き合わせる)
- 主要なソースファイルを実際に読み、機能・設計上の工夫・実際に発生した不具合とその
  解決を確認する(推測で書かない)
- `git log --oneline -20`でおおよその開発期間・コミット傾向を把握する(参考情報。
  文章には必須ではない)
- GitHubリモートの状態を確認する:
  ```bash
  cd <project-dir>
  git remote -v
  git rev-parse --show-toplevel
  ```
  **重要**: `git rev-parse --show-toplevel`の出力が対象プロジェクトのディレクトリ
  自身になっているか必ず確認する。ホームディレクトリなど想定外の場所を指している
  場合(2026-08-04にtech-blogで実際に発生した「ホームディレクトリgit汚染」と同種の
  問題)、**そのプロジェクトに対するgit操作は一切行わず**、状況をユーザーに報告して
  対応方針を確認する(退避して作り直す/ユーザー自身が対応する、等)。
  リモートが無い/publicでない場合は、GitHubリンクを貼ってよいか・貼る場合は
  リンク先が実際に開けるかをユーザーに確認する(privateリポジトリだと外部から
  404になるため)。

## 3. スクリーンショットを確認する

ユーザーが画像を用意している場合、通常`public/screenshots/`に直接貼り付けて
もらう(Windows標準の`スクリーンショット YYYY-MM-DD HHMMSS.png`という名前で
複数枚まとめて来ることが多い)。

- 各ファイルをReadツールで実際に開いて内容を目視確認し、どの画面のスクショかを
  判断する(ファイル名だけでは分からない)
- 採用する画像を`<slug>-1.png`, `<slug>-2.png`, ... にリネームする
  (`git mv`ではなく素の`mv`でよい。この時点ではまだgit管理下に無いため)
- 同じ画面の重複カット(スクリーンショットツールの通知が写り込んでいる等)が
  あれば、**削除はせず**ユーザーに確認してからどちらを採用するか決める
  (2026-08-04に不要と判断したスクリーンショットを`rm`で完全削除してしまい、
  Windows標準の保存先`Pictures\Screenshots`から復旧した経緯があるため、
  以後スクリーンショットや他プロジェクトのファイルを削除する判断は必ず
  ユーザー確認を挟む。取捨選択はしても削除は原則しない)
- スクリーンショットが無い/後で用意する場合は`screenshots`を省略してよい
  (`ProjectScreenshot`コンポーネントが自動でプレースホルダー表示にする)

## 4. `src/lib/projects.ts`にエントリを追加する

`Project`型:
```ts
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  techStack: string[];
  screenshots?: string[]; // ['/screenshots/<slug>-1.png', ...]
  inProgress?: boolean; // GitHub未公開・未デプロイの場合のみ
  repoUrl?: string; // 'https://github.com/kouta1211/<repo>'
};
```
`projects`配列に追記する。表示順はユーザーに確認する(過去に「並び順を変えて」と
後から依頼された実績があるため、初回に一度確認しておくと手戻りが少ない)。

## 5. 詳細ページを作成する

`src/app/projects/<slug>/page.tsx`を、既存ページ(例:
[src/app/projects/meishi-app/page.tsx](../../../src/app/projects/meishi-app/page.tsx))
と同じ構造で作る:

```tsx
import { Heading, Link, Stack, Text, Wrap /* Box, Code, Badge は必要に応じて */ } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ProjectScreenshot } from '@/components/atoms/ProjectScreenshot';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === '<slug>')!;

export default function <Slug>Page() {
  return (
    <PageContainer>
      <Reveal>
        <Stack gap="4">
          <Heading as="h1" size="2xl">{project.name}</Heading>
          <Wrap gap="2">
            {project.techStack.map((tech) => <TechBadge key={tech} label={tech} />)}
          </Wrap>
          {project.repoUrl && (
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" w="fit-content" fontWeight="medium">
              GitHubで見る
            </Link>
          )}
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <ProjectScreenshot label={project.name} images={project.screenshots} alt={`${project.name}の画面`} />
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">概要</Heading>
          <Text color="fg.muted">{/* 実際の内容 */}</Text>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">工夫した点</Heading>
          {/* Box as="ul" でリスト、または Text。既存ページ参照 */}
        </Stack>
      </Reveal>

      {/* つまずいた点と解決策: 証拠がある場合のみ追加。無ければセクションごと省略 */}
    </PageContainer>
  );
}
```

`project.repoUrl`が無い(未公開)場合はリンクを出さない(上記のように条件分岐する。
`tech-blog`は当初これだった)。`inProgress`の場合はタイトル横に
`<Badge colorPalette="orange" variant="subtle">開発中</Badge>`を付ける
(`src/app/projects/tech-blog/page.tsx`参照)。

`ProjectScreenshot`は`images`配列の枚数に応じて自動で単一表示/2列グリッド+
クリック拡大(Dialog)を切り替えるので、呼び出し側は`images={project.screenshots}`
を渡すだけでよい(追加実装不要)。

## 6. テストを追加する

`src/app/projects/<slug>/page.test.tsx`を既存ページのテスト(例:
[src/app/projects/meishi-app/page.test.tsx](../../../src/app/projects/meishi-app/page.test.tsx))
と同じパターンで作る: `<Provider>`でラップして`render()`し、`h1`の見出しテキストと
各セクション見出し(「概要」「工夫した点」、あれば「つまずいた点と解決策」)が
描画されることを確認する。

## 7. `ProjectCard`の`inProgress`バッジ

`src/components/molecules/ProjectCard.tsx`は既に`project.inProgress`を見て
バッジ表示する実装になっている(追加実装不要。一覧ページ・ホーム両方に自動反映)。

## 8. portfolio-site自身の`README.md`を更新する

「掲載しているプロジェクト」セクション(存在しなければ新設)に、GitHubリンク付き
(公開URLが無ければ「開発中のため未公開」等と明記)で1行追加する。

## 9. 検証する

```bash
npm run lint
npm run test:run
npm run build
```
すべて成功すること。`npm run dev`を起動し、chrome-devtools MCPで:
- `/`と`/projects`に新規プロジェクトが表示されること
- 新規詳細ページが表示され、スクリーンショットのクリック拡大・GitHubリンクの
  遷移先が正しいこと
- ライト/ダーク両方で見た目に問題が無いこと
- コンソールエラーが無いこと(`list_console_messages`で確認)

## 10. コミット・push

```bash
git checkout main && git pull origin main --quiet
git checkout -b feature/add-<slug>
```
ステージ前に`git status --short`で意図しないファイル(CRLF化のみのフォーマット
ノイズ等)が混ざっていないか確認し、混ざっていれば`git diff --stat`で実質的な差分
が無いことを確認してから`git restore <file>`で除外する。コミット後、
`git push -u origin feature/add-<slug>`し、PR作成リンクをユーザーに伝える
(PRの作成・マージ自体はユーザーに依頼する)。

## 補足: 元プロジェクト側のREADME更新について

対象プロジェクト自身のREADMEが薄い/テンプレートのままの場合、書き直しを提案して
よいが、**このスキルの主対象ではない**(portfolio-site側の掲載作業とは別リポジトリ
への変更のため)。着手する場合は上記「2. 調査」で確認した`git rev-parse
--show-toplevel`が正常であることを前提に、`main`直pushではなくfeatureブランチ
経由にする(`nextjs-project-setup`/`vite-project-setup`スキルの「GitHub
リポジトリ作成・push」節と同じ配慮)。
