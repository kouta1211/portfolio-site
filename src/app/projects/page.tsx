import { Heading, SimpleGrid } from '@chakra-ui/react';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { FeaturedProjectCard } from '@/components/molecules/FeaturedProjectCard';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects, splitFeatured } from '@/lib/projects';

const { featured, others } = splitFeatured(projects);

export default function ProjectsPage() {
  return (
    <PageContainer gap="8">
      <Reveal>
        <Heading as="h1" size="2xl">
          Projects
        </Heading>
      </Reveal>
      {featured && (
        <Reveal delay={0.1}>
          <FeaturedProjectCard project={featured} />
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </SimpleGrid>
      </Reveal>
    </PageContainer>
  );
}
