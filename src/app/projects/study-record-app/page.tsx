import { Box, Code, Heading, Link, Stack, Text, Wrap } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ProjectScreenshot } from '@/components/atoms/ProjectScreenshot';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'study-record-app')!;

export default function StudyRecordAppPage() {
  return (
    <PageContainer>
      <Reveal>
        <Stack gap="4">
          <Heading as="h1" size="2xl">
            {project.name}
          </Heading>
          <Wrap gap="2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </Wrap>
          <Link
            href={project.repoUrl!}
            target="_blank"
            rel="noopener noreferrer"
            w="fit-content"
            fontWeight="medium"
          >
            GitHubで見る
          </Link>
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
            学習内容と時間を記録し、一覧・登録・編集・削除ができるアプリ。Supabase
            を使って最初に作ったもので、Chakra UI の Dialog、react-hook-form
            のバリデーション、Toast の通知を組み込んだ。
          </Text>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">工夫した点</Heading>
          <Box
            as="ul"
            listStyleType="disc"
            pl="5"
            display="flex"
            flexDirection="column"
            gap="1"
            color="fg.muted"
          >
            <Box as="li">
              Supabase へのクエリは<Code>lib/records.ts</Code>
              にまとめ、画面は<Code>useAllRecords</Code>
              などの hooks からだけデータを取る。テストでは<Code>lib</Code>を
              <Code>vi.mock</Code>
              で差し替え、Supabase
              の書き方に引きずられずに画面の動きを確かめられる
            </Box>
            <Box as="li">
              react-hook-form
              で必須項目と数値の下限（1以上）を検証し、登録・編集・削除の結果は
              Toast で知らせる
            </Box>
            <Box as="li">
              Vitest・Testing Library・user-event
              で、読み込み中・一覧・登録・入力エラー・編集・削除までテストした
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">つまずいた点と解決策</Heading>
          <Box
            as="ul"
            listStyleType="disc"
            pl="5"
            display="flex"
            flexDirection="column"
            gap="2"
            color="fg.muted"
          >
            <Box as="li">
              デモ中に登録も一覧も急に動かなくなった。調べると、Supabase
              の無料プランは一定期間アクセスが無いとプロジェクトが止まり、URL
              ごと名前解決できなくなる仕様だった
            </Box>
            <Box as="li">
              一覧取得のエラーが<Code>console.error</Code>
              で握りつぶされていて、失敗しているのに「0件」に見えていた。そのせいで原因の特定が遅れた。以来、失敗は隠さず画面に出している
            </Box>
          </Box>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
