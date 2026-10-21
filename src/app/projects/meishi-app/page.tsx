import { Box, Code, Heading, Link, Stack, Text, Wrap } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ProjectScreenshot } from '@/components/atoms/ProjectScreenshot';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'meishi-app')!;

export default function MeishiAppPage() {
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
            名前・自己紹介・得意技術・SNS のリンクを登録して、URL
            1本で共有できるデジタル名刺。React の学習用に、Supabase
            を使って実運用に近い構成で作った。
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
              自己紹介は自由入力のリッチテキストなので、DOMPurify
              で無害化してから表示し、XSS を防いだ
            </Box>
            <Box as="li">
              <Code>router</Code> / <Code>domain</Code> / <Code>lib</Code> /{' '}
              <Code>hooks</Code> に分け、画面・ロジック・データ取得を切り離した
            </Box>
            <Box as="li">ID の重複と必須項目をフォームで検証する</Box>
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
              Supabase は RLS ポリシーを作るだけでは API が通らず、テーブルへの
              <Code>GRANT</Code>
              も要った。以降、テーブルを作るたびに GRANT と RLS
              の両方を確認している
            </Box>
            <Box as="li">
              関連テーブルを一緒に取る PostgREST の埋め込み select
              は外部キーに頼っていて、スキーマを変えた後に反映されないことがあった。
              <Code>NOTIFY pgrst, &apos;reload schema&apos;</Code>{' '}
              でスキーマを読み直させて解決した
            </Box>
          </Box>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
