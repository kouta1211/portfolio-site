import NextLink from 'next/link';
import { Badge, Flex, Heading, Link, Text, Wrap } from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { Card } from '@/components/atoms/Card';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive p="6" display="flex" flexDirection="column" gap="3">
      <Flex align="center" gap="2">
        <Heading size="lg">{project.name}</Heading>
        {project.inProgress && (
          <Badge colorPalette="orange" variant="subtle">
            開発中
          </Badge>
        )}
      </Flex>
      <Text color="fg.muted">{project.tagline}</Text>
      <Wrap gap="2">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </Wrap>
      <Link asChild mt="2" fontWeight="medium">
        <NextLink href={`/projects/${project.slug}`}>詳細を見る</NextLink>
      </Link>
    </Card>
  );
}
