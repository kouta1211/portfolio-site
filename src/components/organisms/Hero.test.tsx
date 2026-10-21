import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import type { Project } from '@/lib/projects';
import { Hero } from './Hero';

const featured: Project = {
  slug: 'sample',
  name: 'サンプル',
  tagline: 'テスト用のタグライン',
  techStack: ['Next.js'],
  screenshots: ['/screenshots/sample-1.png'],
  featured: true,
};

describe('Hero', () => {
  it('見出し・名前・代表作の画面と、代表作 / 一覧へのリンクを出す', () => {
    render(
      <Provider>
        <Hero featured={featured} />
      </Provider>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: '踊る人のスマホに、隊形を届ける。',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('松本 昂大')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'サンプルの画面' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'サンプル を見る' })
    ).toHaveAttribute('href', '/projects/sample');
    expect(screen.getByRole('link', { name: 'ほかの作品' })).toHaveAttribute(
      'href',
      '/projects'
    );
  });

  it('代表作が無ければ、画面を出さず一覧へのリンクだけにする', () => {
    render(
      <Provider>
        <Hero featured={null} />
      </Provider>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '作ったものを見る' })
    ).toHaveAttribute('href', '/projects');
    expect(
      screen.queryByRole('link', { name: 'ほかの作品' })
    ).not.toBeInTheDocument();
  });
});
