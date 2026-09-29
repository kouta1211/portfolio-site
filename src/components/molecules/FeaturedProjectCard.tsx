import NextLink from 'next/link';
import Image from 'next/image';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { TechBadge } from '@/components/atoms/TechBadge';
import { Card } from '@/components/atoms/Card';
import type { Project } from '@/lib/projects';

/** 代表作だけを、スクリーンショット付きの全幅カードで出す */
export function FeaturedProjectCard({ project }: { project: Project }) {
  const cover = project.screenshots?.[0];

  return (
    <Card
      interactive
      overflow="hidden"
      borderColor="brand.400"
      borderWidth="2px"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        {cover && (
          /* 横並びのときは、文の側の高さまで伸ばす（下に空きを作らない） */
          <Box
            position="relative"
            aspectRatio={{ base: 16 / 10, md: 'auto' }}
            minH={{ md: 'full' }}
            bg="bg.muted"
          >
            <Image
              src={cover}
              alt={`${project.name}の画面`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </Box>
        )}
        <Stack p="6" gap="3">
          <Flex align="center" gap="2">
            <Badge colorPalette="brand" variant="solid">
              代表作
            </Badge>
            <Heading size="xl">{project.name}</Heading>
          </Flex>
          <Text color="fg.muted">{project.tagline}</Text>
          {project.highlights && (
            <Box
              as="ul"
              listStyleType="disc"
              pl="5"
              display="flex"
              flexDirection="column"
              gap="1"
              fontSize="sm"
            >
              {project.highlights.map((line) => (
                <Box as="li" key={line}>
                  {line}
                </Box>
              ))}
            </Box>
          )}
          <Wrap gap="2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
          </Wrap>
          <Wrap gap="4" mt="2">
            <Link asChild fontWeight="medium">
              <NextLink href={`/projects/${project.slug}`}>詳細を見る</NextLink>
            </Link>
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                fontWeight="medium"
              >
                サイトを開く
              </Link>
            )}
          </Wrap>
        </Stack>
      </SimpleGrid>
    </Card>
  );
}
