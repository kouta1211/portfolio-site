import { Badge, Box, Code, Heading, Stack, Text, Wrap } from '@chakra-ui/react';
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
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <ProjectScreenshot
          label={project.name}
          src={project.screenshotSrc}
          alt={`${project.name}の画面`}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">概要</Heading>
          <Text color="fg.muted">
            現在開発中のプロジェクトで、まだGitHubリポジトリの公開・デプロイは
            行っていない。QiitaとmicroCMS(ヘッドレスCMS)の2つの外部コンテンツ
            ソースの記事をまとめて表示する個人テックブログ。トップページでは
            両方のソースを並行して取得し表示する。
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
              Qiita APIのアクセストークンをクライアントに露出させないため、
              Next.jsのRoute Handler(<Code>app/api/qiita/route.ts</Code>)
              を経由してサーバー側から呼び出す構成にした
            </Box>
            <Box as="li">
              Qiitaの記事にはサムネイル画像が無いため、記事本文(HTML)から 最初の
              <Code>img</Code>
              タグを正規表現で抽出してサムネイルとして使い、見つからない場合は
              投稿者のアイコン画像にフォールバックするようにした
            </Box>
            <Box as="li">
              ブログ詳細ページはNext.jsの<Code>&quot;use cache&quot;</Code>
              ディレクティブでキャッシュしつつ、Server Action(
              <Code>revalidatePath</Code>
              )を使った「再読み込み」ボタンでMicroCMS側の更新を手動で
              反映できるようにした
            </Box>
            <Box as="li">
              トップページはQiita・microCMSそれぞれをasync Server Component +
              Suspenseで並行取得し、個別にスケルトン表示することで、片方の
              取得が遅くてももう片方の表示をブロックしないようにした
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">つまずいた点と解決策</Heading>
          <Text color="fg.muted">
            <Code>next/image</Code>
            は許可していない外部ドメインの画像を表示しようとするとエラーに
            なる。Qiita・microCMS・GitHubアバターの3つの外部ドメインから
            画像を読み込む必要があったため、<Code>next.config.ts</Code>の
            <Code>images.remotePatterns</Code>
            に該当ドメインを明示的に登録することで解決した。
          </Text>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
