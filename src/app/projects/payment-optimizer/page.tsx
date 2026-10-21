import { Box, Code, Heading, Link, Stack, Text, Wrap } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ProjectScreenshot } from '@/components/atoms/ProjectScreenshot';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'payment-optimizer')!;

export default function PaymentOptimizerPage() {
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
            クレジットカード・電子マネー・QR
            決済を使い分けている人向けのアプリ。支出ごとに、使った決済手段が一番得だったかを判定し、次に使うべきカードを提案する。取り逃した還元額はダッシュボードで確認できる。
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
              還元率は後から変わるので、記録した時点の還元率（
              <Code>reward_rate_applied</Code>）を保存し、実質支払額（
              <Code>effective_amount</Code>）は Postgres の生成列で自動計算する
            </Box>
            <Box as="li">
              カテゴリが自由入力だと「ネット」と「ネットショッピング」のような表記ゆれで判定を誤っていた。マスタテーブルにして選択式にした
            </Box>
            <Box as="li">
              支出履歴がある決済手段は<Code>ON DELETE RESTRICT</Code>
              で削除できないようにし、DB
              のエラーは分かりやすいメッセージに変えて表示する
            </Box>
            <Box as="li">
              還元額と機会損失の計算は、Supabase にも React
              にも依存しない純粋関数にして、Vitest でテストした
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">つまずいた点と解決策</Heading>
          <Text color="fg.muted">
            Supabase は<Code>public</Code>
            スキーマに新しいテーブルを作ると、<Code>anon</Code>
            ロールに読み書きの権限が自動で付きます。これに気づかず、個人データのテーブルに
            <Code>anon</Code>
            の権限が残っていました。以降、テーブルを作るたびに GRANT と RLS
            を確認し、個人データからは<Code>anon</Code>の権限を外しています。
          </Text>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
