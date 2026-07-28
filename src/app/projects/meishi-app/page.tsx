import { Box, Code, Heading, Stack, Text, Wrap } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ScreenshotPlaceholder } from '@/components/atoms/ScreenshotPlaceholder';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'meishi-app')!;

export default function MeishiAppPage() {
  return (
    <Box
      maxW="3xl"
      mx="auto"
      w="full"
      px="6"
      py="16"
      display="flex"
      flexDirection="column"
      gap="10"
    >
      <Stack gap="4">
        <Heading as="h1" size="2xl">
          {project.name}
        </Heading>
        <Wrap gap="2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </Wrap>
      </Stack>

      <ScreenshotPlaceholder label={project.name} />

      <Stack gap="2">
        <Heading size="lg">概要</Heading>
        <Text color="fg.muted">
          名前・自己紹介・得意技術(複数選択)・GitHubやX等のSNSリンクを登録し、
          1つのURLで共有できるデジタル名刺アプリ。React学習を目的に、
          Supabaseを使った実運用に近い構成で作成した。
        </Text>
      </Stack>

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
            自己紹介文はユーザーが自由入力するリッチテキストのため、DOMPurifyで
            サニタイズしてからレンダリングし、XSSを防止した
          </Box>
          <Box as="li">
            <Code>router</Code> / <Code>domain</Code> / <Code>lib</Code> /{' '}
            <Code>hooks</Code> にレイヤーを分け、画面・ビジネスロジック・
            データアクセスの責務を分離した
          </Box>
          <Box as="li">
            ID重複チェックや必須項目チェックを含むフォームバリデーション
          </Box>
        </Box>
      </Stack>

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
            SupabaseはRLSポリシーを設定するだけではAPIアクセスが通らず、
            テーブルへの<Code>GRANT</Code>も別途必要だと判明した。以降は
            テーブル作成・変更のたびにGRANTとRLS両方を確認するようにした
          </Box>
          <Box as="li">
            PostgRESTの埋め込みselect構文(リレーション先テーブルの同時取得)は
            外部キー制約に依存しており、スキーマ変更後に反映されないことが
            あった。<Code>NOTIFY pgrst, &apos;reload schema&apos;</Code>{' '}
            を実行してPostgRESTにスキーマの再読み込みを促すことで解決した
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
