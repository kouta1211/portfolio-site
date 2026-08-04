import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import ProjectsPage from './page';

describe('ProjectsPage', () => {
  it('renders the page heading and both project cards', () => {
    render(
      <Provider>
        <ProjectsPage />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Projects' })
    ).toBeInTheDocument();
    expect(screen.getByText('名刺アプリ')).toBeInTheDocument();
    expect(
      screen.getByText('キャッシュレス決済最適化アプリ')
    ).toBeInTheDocument();
  });
});
