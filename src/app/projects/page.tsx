import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <Box
      maxW="3xl"
      mx="auto"
      w="full"
      px="6"
      py="16"
      display="flex"
      flexDirection="column"
      gap="8"
    >
      <Heading as="h1" size="2xl">
        Projects
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
