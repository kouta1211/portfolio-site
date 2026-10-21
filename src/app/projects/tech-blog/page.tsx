import {
  Badge,
  Box,
  Code,
  Heading,
  Link,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ProjectScreenshot } from '@/components/atoms/ProjectScreenshot';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'tech-blog')!;

export default function TechBlogPage() {
  return (
    <PageContainer>
      <Reveal>
        <Stack gap="4">
          <Stack direction="row" align="center" gap="3">
            <Heading as="h1" size="2xl">
              {project.name}
            </Heading>
            <Badge colorPalette="orange" variant="subtle">
              開発中
            </Badge>
          </Stack>
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
            Qiita と microCMS（ヘッドレス
            CMS）の記事を、1か所にまとめて読める個人ブログ。開発中で、まだデプロイしていない。
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
              Qiita API のトークンをブラウザに出さないよう、Route Handler（
              <Code>app/api/qiita/route.ts</Code>）を通してサーバーから呼ぶ
            </Box>
            <Box as="li">
              Qiita の記事にはサムネイルが無いので、本文の最初の
              <Code>img</Code>
              を抜き出して使う。無ければ投稿者のアイコンを出す
            </Box>
            <Box as="li">
              記事ページは<Code>&quot;use cache&quot;</Code>
              でキャッシュし、Server Action（<Code>revalidatePath</Code>
              ）の「再読み込み」ボタンで microCMS の更新を反映できる
            </Box>
            <Box as="li">
              トップは Qiita と microCMS を別々の Suspense
              で並行して取得する。片方が遅くても、もう片方は先に表示される
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">つまずいた点と解決策</Heading>
          <Text color="fg.muted">
            <Code>next/image</Code>
            は、許可していない外部ドメインの画像を表示できません。Qiita・microCMS・GitHub
            アバターの3つのドメインを<Code>next.config.ts</Code>の
            <Code>images.remotePatterns</Code>に登録して解決しました。
          </Text>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
