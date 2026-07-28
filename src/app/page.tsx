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
import { TechBadge } from '@/components/atoms/TechBadge';
import { projects } from '@/lib/projects';

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

export default function Home() {
  return (
    <Box
      maxW="3xl"
      mx="auto"
      w="full"
      px="6"
      pb="20"
      display="flex"
      flexDirection="column"
      gap="20"
    >
      <Hero />

      <Stack gap="4">
        <Heading size="xl">About</Heading>
        {/* TODO: 実際の学習経緯・アピールポイントに差し替える(現状はプレースホルダー) */}
        <Text color="fg.muted">
          学習経緯(仮):
          ここにこれまでの学習経緯や、どんな案件で力になれるかを書く。
        </Text>
        <Wrap gap="2">
          {techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </Wrap>
      </Stack>

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
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
