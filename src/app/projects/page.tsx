import { Heading, SimpleGrid } from '@chakra-ui/react';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { PageContainer } from '@/components/atoms/PageContainer';
import { Reveal } from '@/components/atoms/Reveal';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <PageContainer gap="8">
      <Reveal>
        <Heading as="h1" size="2xl">
          Projects
        </Heading>
      </Reveal>
      <Reveal delay={0.1}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </SimpleGrid>
      </Reveal>
    </PageContainer>
  );
}
