import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import type { Project } from '@/lib/projects';

const project: Project = {
  slug: 'sample',
  name: 'サンプル',
  tagline: 'テスト用のタグライン',
  techStack: ['Next.js'],
  screenshots: ['/screenshots/sample-1.png'],
  liveUrl: 'https://example.com',
  featured: true,
  highlights: ['要点その1', '要点その2'],
};

describe('FeaturedProjectCard', () => {
  it('代表作の印・要点・詳細とサイトへのリンクを出す', () => {
    render(
      <Provider>
        <FeaturedProjectCard project={project} />
      </Provider>
    );

    expect(screen.getByText('代表作')).toBeInTheDocument();
    expect(screen.getByText('要点その1')).toBeInTheDocument();
    expect(screen.getByText('要点その2')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'サンプルの画面' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '詳細を見る' })).toHaveAttribute(
      'href',
      '/projects/sample'
    );
    expect(screen.getByRole('link', { name: 'サイトを開く' })).toHaveAttribute(
      'href',
      'https://example.com'
    );
  });

  it('本番URLが無ければ、サイトへのリンクは出さない', () => {
    render(
      <Provider>
        <FeaturedProjectCard project={{ ...project, liveUrl: undefined }} />
      </Provider>
    );

    expect(screen.queryByRole('link', { name: 'サイトを開く' })).toBeNull();
  });

  it('coverIndex で表紙の画像を選べる。その画像が無ければ1枚目に戻す', () => {
    const twoShots = {
      ...project,
      screenshots: ['/screenshots/sample-1.png', '/screenshots/sample-2.png'],
    };
    const { unmount } = render(
      <Provider>
        <FeaturedProjectCard project={twoShots} coverIndex={1} />
      </Provider>
    );
    expect(
      screen.getByRole('img', { name: 'サンプルの画面' }).getAttribute('src')
    ).toContain(encodeURIComponent('/screenshots/sample-2.png'));
    unmount();

    render(
      <Provider>
        <FeaturedProjectCard project={project} coverIndex={1} />
      </Provider>
    );
    expect(
      screen.getByRole('img', { name: 'サンプルの画面' }).getAttribute('src')
    ).toContain(encodeURIComponent('/screenshots/sample-1.png'));
  });
});
