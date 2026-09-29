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
            ダンスの隊形は、いまも紙やスライドで配られることが多く、「誰がどこに立つか」は書けても「そこへ何カウントでどう動くか」は書けません。Choreonでは、振付師がPCで隊形を組んで曲に載せ、踊る人は共有されたURLをスマホで開くだけで、自分の道順を「下手前へ
            約6歩」のように言葉で読みながら、曲に合わせて確かめられます。
          </Text>
          <Text color="fg.muted">
            個人で企画から運用まで行い、2026年8月5日から9月29日までで564コミット。作品を1本作って配り、実際に使うところまで通した時点でv1.0として完成としました。
          </Text>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">課題から決めた設計</Heading>
          <Box {...listProps}>
            <Box as="li">
              振付を作る人は1〜2人、見る人は十数人。見る人にはアプリを入れる動機が無いので、
              <strong>作る画面と見る画面を最初から分け</strong>
              、見る側はインストール不要のURL1本にした
            </Box>
            <Box as="li">
              React
              Native（Expo）版は、手元の実機で動かせる環境が無くなった時点で
              <strong>止めた</strong>
              。SDKを下げる案は「下げた結果を実機で確かめられないまま土台を書き換えることになる」として却下し、Web（PWA）を本体として仕上げた
            </Box>
            <Box as="li">
              スマホでの編集を磨き続けるのをやめ、
              <strong>作る＝PC／見る＝スマホ</strong>
              に役割を割った。直せるかどうかではなく、スマホ完結の競合と戦わずに済む場所かどうかで決めた
            </Box>
            <Box as="li">
              踊る側は秒ではなくカウントで数えるので、振付の中身を
              <strong>カウントで持ち、曲への載せ方を別のデータ</strong>
              にした。曲の頭出しや速さを変えても、組んだ振付は1つも動かない
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">品質を、注意ではなく仕組みで守る</Heading>
          <Box {...listProps}>
            <Box as="li">
              テスト1936件（Vitest・2026年9月29日時点）。座標・時間・並び替えの計算は純粋関数へ出し、境目まで書いた。直したバグには、
              <strong>
                直した側を一度戻してテストが落ちることを確かめてから
              </strong>
              テストを足した
            </Box>
            <Box as="li">
              ESLintに独自のルールを足した。<Code>await</Code>
              の付け忘れ（保存されずに黙って失敗する）と、JSXへの日本語の直書き（英語・韓国語で開いた人にだけ日本語が出る）をどちらもエラーにした
            </Box>
            <Box as="li">
              READMEや手順書が実在するファイル・識別子だけを指しているかを検査するスクリプトを書き、CIで回した。文章はlintもテストも見てくれないため
            </Box>
            <Box as="li">
              権限はDB側で守った。全テーブルにRLSを掛けて<Code>anon</Code>
              からは剥奪し、共有リンクは<Code>security definer</Code>
              の関数だけを通す。共有した曲は非公開のストレージに置き、「いま共有中の作品のものだけ」読めるようにした
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">AIとの開発の進め方</Heading>
          <Text color="fg.muted">
            実装の大半はClaude
            Codeと書きました。自分が持ったのは、何を作るか・何をやめるかの判断、AIに守らせる規約と検査の仕組み、そして実機での受け入れ確認です。
          </Text>
          <Box {...listProps}>
            <Box as="li">
              AIが毎回読む規約を、画面・DB・状態・テストの層ごとに分けて置いた
            </Box>
            <Box as="li">
              不具合から得た教訓を記録に残し、
              <strong>同じ教訓が2回出たら規約へ昇格</strong>
              させる流れを作った。「気をつける」を増やすのではなく、防げなかったものだけを規約かlint・テストに変えた
            </Box>
            <Box as="li">
              画面に見える変更は、実機で自分が確かめるための台本へ必ず項目を足してから出す決まりにした。AIの「直しました」を、自分の目で受け入れるための仕組み
            </Box>
          </Box>
        </Stack>
      </Reveal>

      <Reveal delay={0.1}>
        <Stack gap="2">
          <Heading size="lg">つまずいた点と解決策</Heading>
          <Text color="fg.muted">
            「元に戻す」が画面だけを戻していて、サーバーには間違えて動かした位置の方が残っていました。次に開くと戻っていて、そのときには履歴も消えているので、動かしていても気づけない壊れ方です。周りの操作が保存するようになったのに、そこだけ「まだ保存していないので失敗しようがない」という前提のまま取り残されていました。以降、編集はすべて「画面を先に変える
            → 保存する → 失敗したら戻して知らせる →
            保存が通ってから履歴に積む」の1つの型に通し、テストで固定しました。
          </Text>
        </Stack>
      </Reveal>
    </PageContainer>
  );
}
