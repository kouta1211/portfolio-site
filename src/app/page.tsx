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
      <Hero featured={featured} />
      <PageContainer maxW="6xl" pb="20" gap="20">
        <Reveal>
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
            {featured && (
              <FeaturedProjectCard project={featured} coverIndex={1} />
            )}
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
              {others.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </SimpleGrid>
          </Stack>
        </Reveal>

        <Reveal delay={0.1}>
          {/* 6xl 幅いっぱいだと1行が長すぎて読みにくいので、文章の幅だけ絞る */}
          <Stack gap="4" maxW="3xl">
            <Heading size="xl">About</Heading>
            <Text color="fg.muted">
              大学で単位の管理に苦労したのがきっかけで、身の回りの不便をコードで減らしたいと思うようになりました。
            </Text>
            <Text color="fg.muted">
              いまは React と Next.js で Web アプリを作っています。実装には
              Claude Code
              を使い、何を作るか・何をやめるかの判断と、品質を守る仕組みづくりは自分で持っています。
            </Text>
            <Wrap gap="2">
              {techStack.map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
            </Wrap>
          </Stack>
        </Reveal>
      </PageContainer>
    </>
  );
}
