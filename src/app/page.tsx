import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { TechBadge } from '@/components/TechBadge';
import { projects } from '@/lib/projects';

const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'Supabase',
  'Chakra UI',
  'React Router',
  'TanStack Query',
  'GitHub Actions',
  'Vercel',
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 px-6 pb-20">
      <Hero />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">About</h2>
        {/* TODO: 実際の学習経緯・アピールポイントに差し替える(現状はプレースホルダー) */}
        <p className="text-zinc-600 dark:text-zinc-400">
          学習経緯(仮):
          ここにこれまでの学習経緯や、どんな案件で力になれるかを書く。
        </p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <Link
            href="/projects"
            className="text-sm underline underline-offset-4"
          >
            すべて見る
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
