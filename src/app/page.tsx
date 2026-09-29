import NextLink from 'next/link';
import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { Hero } from '@/components/organisms/Hero';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { FeaturedProjectCard } from '@/components/molecules/FeaturedProjectCard';
import { TechBadge } from '@/components/atoms/TechBadge';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects, splitFeatured } from '@/lib/projects';

const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Chakra UI',
  'Vite',
  'Supabase',
  'React Router',
  'TanStack Query',
  'GitHub Actions',
  'Vercel',
];

const { featured, others } = splitFeatured(projects);

export default function Home() {
  return (
    <>
      <Hero />
      <PageContainer pb="20" gap="20">
        <Reveal>
          <Stack gap="4">
            <Heading size="xl">About</Heading>
            <Text color="fg.muted">
              【プログラミング学習の経緯と目的】
              <br />
              学生時代、大学の複雑な単位管理に苦労した経験から、「身の回りの不便をテクノロジーで解決したい」と強く感じたことがフロントエンド開発を志した原点です。
              <br />
              ユーザーにとって本当に使いやすい画面（UI/UX）を追求するため、モダンな技術であるNext.js（React）を学習し、Webアプリケーション開発のスキルを習得しました。現在は、最新のAIツール（Claude
              Code等）を開発フローに組み込むことで、アイデアからプロトタイプ完成までの圧倒的なスピード開発を実現しています。
              <br />
              将来的には、自身が所属する名古屋のダンスコミュニティに向けた支援ツールの開発も予定しており、「誰かの課題を、モダンな技術とスピードで解決する」ことを軸に活動しています。
            </Text>
            <Wrap gap="2">
              {techStack.map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
            </Wrap>
          </Stack>
        </Reveal>

        <Reveal delay={0.1}>
          <Stack gap="4">
            <Box
              display="flex"
              alignItems="baseline"
              justifyContent="space-between"
            >
              <Heading size="xl">Projects</Heading>
              <Link asChild fontSize="sm">
                <NextLink href="/projects">すべて見る</NextLink>
              </Link>
            </Box>
            {featured && <FeaturedProjectCard project={featured} />}
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
              {others.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </SimpleGrid>
          </Stack>
        </Reveal>
      </PageContainer>
    </>
  );
}
