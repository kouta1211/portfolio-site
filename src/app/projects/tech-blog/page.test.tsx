import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import TechBlogPage from './page';

describe('TechBlogPage', () => {
  it('renders the title, in-progress badge, and section headings', () => {
    render(
      <Provider>
        <TechBlogPage />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Tech Blog' })
    ).toBeInTheDocument();
    expect(screen.getByText('開発中')).toBeInTheDocument();
    expect(screen.getByText('概要')).toBeInTheDocument();
    expect(screen.getByText('工夫した点')).toBeInTheDocument();
    expect(screen.getByText('つまずいた点と解決策')).toBeInTheDocument();
  });
});
