import { Box, Code, Heading, Link, Stack, Text, Wrap } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { ProjectScreenshot } from '@/components/atoms/ProjectScreenshot';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'payment-optimizer')!;
const liveUrl = 'https://payment-optimizer-snowy.vercel.app/login';

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
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            w="fit-content"
            fontWeight="medium"
          >
            公開URLを見る
          </Link>
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
            クレジットカード・電子マネー・QR決済など複数のキャッシュレス決済手段を
            使い分けている人向けのアプリ。支出ごとに実際に使った決済方法が最適
            だったかを判定し、次に使うべきカードを提案する。過去の支出から生じた
            機会損失額もダッシュボードで可視化する。
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
              還元率は将来変わり得るため、支出記録時点の還元率(
              <Code>reward_rate_applied</Code>)をスナップショットとして保存し、
              実質支払額(<Code>effective_amount</Code>)はPostgresの生成列
              (Generated Column)として自動算出する設計にした
            </Box>
            <Box as="li">
              支出とカードの「得意カテゴリ」がどちらも自由入力だと表記ゆれ
              (例:「ネット」と「ネットショッピング」)が発生し、最適カード判定を
              誤らせていた。カテゴリをマスタテーブル化し選択式にすることで解消した
            </Box>
            <Box as="li">
              支出履歴のある決済方法は<Code>ON DELETE RESTRICT</Code>制約で
              削除できないようにし、DBのエラーはアプリ側でユーザー向けの分かり
              やすいメッセージに変換して表示する
            </Box>
            <Box as="li">
              還元額・機会損失の計算ロジックはSupabase/Reactに依存しない純粋関数
              として切り出し、Vitestで単体テストを書いた
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">つまずいた点と解決策</Heading>
          <Text color="fg.muted">
            Supabaseは<Code>public</Code>スキーマに新規テーブルを作ると、
            <Code>anon</Code>ロールにSELECT/INSERT/UPDATE/DELETEの権限が
            デフォルトで自動付与される設定になっていることに気づかず、個人データ
            のテーブルにも意図せず<Code>anon</Code>権限が残っていた。以降は
            テーブルを作成・変更するたびにGRANTとRLSポリシーの両方を確認し、
            個人データのテーブルからは<Code>anon</Code>権限を明示的に剥奪する、
            というルールを徹底することにした。
          </Text>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
