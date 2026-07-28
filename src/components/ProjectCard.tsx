import Link from 'next/link';
import { TechBadge } from '@/components/TechBadge';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <h3 className="text-xl font-semibold">{project.name}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{project.tagline}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-2 font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
      >
        詳細を見る
      </Link>
    </div>
  );
}
