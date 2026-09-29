import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import Home from './page';

describe('Home', () => {
  it('renders the hero and both project cards', () => {
    render(
      <Provider>
        <Home />
      </Provider>
    );
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('名刺アプリ')).toBeInTheDocument();
    expect(
      screen.getByText('キャッシュレス決済最適化アプリ')
    ).toBeInTheDocument();
  });

  it('Choreon を代表作として先頭に1回だけ出す', () => {
    render(
      <Provider>
        <Home />
      </Provider>
    );
    expect(screen.getByText('代表作')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Choreon' })).toHaveLength(1);
  });
});
