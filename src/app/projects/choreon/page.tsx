import { Box, Code, Heading, Link, Stack, Text, Wrap } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ProjectScreenshot } from '@/components/atoms/ProjectScreenshot';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'choreon')!;

const listProps = {
  as: 'ul',
  listStyleType: 'disc',
  pl: '5',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  color: 'fg.muted',
} as const;

export default function ChoreonPage() {
  return (
    <PageContainer>
      <Reveal>
        <Stack gap="4">
          <Heading as="h1" size="2xl">
            {project.name}
          </Heading>
          <Text color="fg.muted">{project.tagline}</Text>
          <Wrap gap="2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </Wrap>
          <Wrap gap="4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                w="fit-content"
                fontWeight="medium"
              >
                サイトを開く（登録なしで触れます）
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                w="fit-content"
                fontWeight="medium"
              >
                GitHubで見る
              </Link>
            )}
          </Wrap>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <ProjectScreenshot
          label={project.name}
          images={project.screenshots}
          alt={`${project.name}の画面`}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">概要</Heading>
          <Text color="fg.muted">
            ダンスの隊形は、いまも紙やスライドで配られることが多いです。紙では「どこに立つか」は書けても、「何カウントでどう動くか」までは書けません。
          </Text>
          <Text color="fg.muted">
            Choreon では、振付師が PC
            で隊形を組んで曲に載せます。踊る人は共有された URL
            をスマホで開くだけで、自分の動きを「下手前へ
            約6歩」のような言葉で読みながら、曲に合わせて確かめられます。
          </Text>
          <Text color="fg.muted">
            企画から運用まで1人で行い、2026年8月5日〜9月29日で564コミット。作品を1本作って配り、実際に使うところまで通して
            v1.0 としました。
          </Text>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">課題から決めた設計</Heading>
          <Box {...listProps}>
            <Box as="li">
              作る人は1〜2人、見る人は十数人。見る人にアプリを入れる理由は無いので、
              <strong>見る側はインストール不要の URL 1本</strong>にした
            </Box>
            <Box as="li">
              React Native（Expo）版は、実機で動かせる環境が無くなった時点で
              <strong>やめた</strong>
              。確かめられないまま土台を書き換えるより、Web（PWA）を本体にする方を選んだ
            </Box>
            <Box as="li">
              スマホでの編集を磨くのをやめ、
              <strong>作るのは PC、見るのはスマホ</strong>
              と役割を分けた。スマホだけで完結する競合と、同じ土俵で戦わないため
            </Box>
            <Box as="li">
              踊る人は秒ではなくカウントで数える。そこで
              <strong>振付はカウントで持ち、曲との対応は別のデータ</strong>
              にした。曲の頭出しや速さを変えても、振付は崩れない
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">品質を、注意ではなく仕組みで守る</Heading>
          <Box {...listProps}>
            <Box as="li">
              テスト1936件（Vitest、2026年9月29日時点）。座標・時間・並び替えの計算は純粋関数にして、境界値までテストした。バグを直したときは、
              <strong>修正を一度戻してテストが落ちるのを確かめてから</strong>
              追加した
            </Box>
            <Box as="li">
              ESLint に独自ルールを追加した。<Code>await</Code>
              の付け忘れ（保存が黙って失敗する）と、JSX
              への日本語の直書き（英語・韓国語の画面に日本語が残る）をエラーにした
            </Box>
            <Box as="li">
              README
              や手順書が、実在するファイルや識別子だけを指しているかを検査するスクリプトを書き、CI
              で回した
            </Box>
            <Box as="li">
              権限は DB 側で守った。全テーブルに RLS を掛けて<Code>anon</Code>
              の権限を外し、共有リンクは<Code>security definer</Code>
              の関数経由だけにした。共有した曲は非公開ストレージに置き、共有中の作品の分だけ読める
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">AIとの開発の進め方</Heading>
          <Text color="fg.muted">
            実装の大半は Claude Code
            と書きました。自分の担当は、何を作り何をやめるかの判断、AI
            に守らせる規約と検査の仕組み、実機での最終確認です。
          </Text>
          <Box {...listProps}>
            <Box as="li">
              AI が毎回読む規約を、画面・DB・状態・テストの層ごとに分けた
            </Box>
            <Box as="li">
              不具合の教訓を記録し、
              <strong>同じ教訓が2回出たら規約に格上げ</strong>
              する。防げなかったものだけを、規約・lint・テストに変えた
            </Box>
            <Box as="li">
              画面に見える変更は、実機確認用のチェックリストに項目を足してから出す。AI
              の「直しました」を自分の目で確かめるため
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">つまずいた点と解決策</Heading>
          <Text color="fg.muted">
            「元に戻す」が画面だけを戻していて、サーバーには間違えて動かした位置が残っていました。次に開くと元に戻っていて、履歴も消えているので気づけません。
          </Text>
          <Text color="fg.muted">
            原因は、周りの操作は保存するようになったのに、ここだけ「まだ保存しない」前提のまま残っていたことです。以降、編集はすべて「画面を先に変える
            → 保存 → 失敗したら戻して知らせる →
            成功したら履歴に積む」の1つの流れにまとめ、テストで固定しました。
          </Text>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
