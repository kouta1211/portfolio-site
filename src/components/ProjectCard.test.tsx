import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/projects';

const project: Project = {
  slug: 'sample-project',
  name: 'サンプルプロジェクト',
  tagline: 'テスト用のタグライン',
  techStack: ['Next.js', 'TypeScript'],
};

describe('ProjectCard', () => {
  it('renders the project name, tech badges, and detail link', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('サンプルプロジェクト')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '詳細を見る' })).toHaveAttribute(
      'href',
      '/projects/sample-project'
    );
  });
});
