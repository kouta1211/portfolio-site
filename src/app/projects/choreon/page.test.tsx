import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import ChoreonPage from './page';

describe('ChoreonPage', () => {
  it('renders the title and all section headings', () => {
    render(
      <Provider>
        <ChoreonPage />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Choreon' })
    ).toBeInTheDocument();
    expect(screen.getByText('概要')).toBeInTheDocument();
    expect(screen.getByText('課題から決めた設計')).toBeInTheDocument();
    expect(
      screen.getByText('品質を、注意ではなく仕組みで守る')
    ).toBeInTheDocument();
    expect(screen.getByText('AIとの開発の進め方')).toBeInTheDocument();
    expect(screen.getByText('つまずいた点と解決策')).toBeInTheDocument();
  });

  it('links to the live site and the repository', () => {
    render(
      <Provider>
        <ChoreonPage />
      </Provider>
    );

    expect(screen.getByRole('link', { name: /サイトを開く/ })).toHaveAttribute(
      'href',
      'https://choreon.vercel.app'
    );
    expect(screen.getByRole('link', { name: 'GitHubで見る' })).toHaveAttribute(
      'href',
      'https://github.com/kouta1211/choreon'
    );
  });
});
