import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import GameExplorerPage from './page';

describe('GameExplorerPage', () => {
  it('renders the title and section headings', () => {
    render(
      <Provider>
        <GameExplorerPage />
      </Provider>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'ゲーム解析ビューア',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('概要')).toBeInTheDocument();
    expect(screen.getByText('工夫した点')).toBeInTheDocument();
  });

  it('does not link to the private source', () => {
    render(
      <Provider>
        <GameExplorerPage />
      </Provider>
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
