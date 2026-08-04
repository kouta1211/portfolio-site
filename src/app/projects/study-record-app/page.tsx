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
            タイトルと学習時間から成る学習記録を、一覧表示・新規登録・編集・
            削除できるシンプルな学習記録管理アプリ。Supabase連携アプリとして
            最初に作成したプロジェクトで、Chakra UIのDialogによるモーダル、
            react-hook-formによるバリデーション、Toastでの結果通知を実装した。
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
              Supabaseへのクエリを<Code>lib/records.ts</Code>
              に集約し、コンポーネント側は<Code>useAllRecords</Code>
              などのhooks経由でのみデータを取得する構成にした。テストでは
              <Code>lib</Code>層を<Code>vi.mock</Code>
              で丸ごと差し替えることで、Supabase固有のメソッドチェーンを
              気にせずコンポーネントの振る舞いをテストできるようにした
            </Box>
            <Box as="li">
              react-hook-formで必須項目・数値の下限(1以上)をクライアント側で
              検証し、登録・削除・編集の成否はToast通知でフィードバックする
              ようにした
            </Box>
            <Box as="li">
              Vitest + Testing Library + user-eventで、ローディング表示・
              一覧表示・新規登録・バリデーションエラー・削除・編集まで
              カバーするテストを作成した
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
              デモで新規登録・一覧表示が突然反応しなくなり、原因調査の結果
              Supabaseの無料プランは一定期間APIアクセスがないとプロジェクトが
              自動的に一時停止され、URLごとDNS解決できなくなる仕様だと判明した
            </Box>
            <Box as="li">
              調査中、一覧取得のエラーハンドリングが<Code>console.error</Code>
              に握りつぶすだけの実装だったため、失敗しているのに「0件の
              空リスト」に見えてしまい原因特定を難しくしていた。この経験から、
              失敗を握りつぶさずユーザーに通知することの重要性を学んだ
            </Box>
          </Box>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
