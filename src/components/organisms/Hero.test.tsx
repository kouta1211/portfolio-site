import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the heading and both CTA links', () => {
    render(
      <Provider>
        <Hero />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: '松本 昂大' })
    ).toBeInTheDocument();

    const projectsLink = screen.getByRole('link', {
      name: 'プロジェクトを見る',
    });
    expect(projectsLink).toHaveAttribute('href', '/projects');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/kouta1211');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
