import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the hero and both project cards', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('名刺アプリ')).toBeInTheDocument();
    expect(
      screen.getByText('キャッシュレス決済最適化アプリ')
    ).toBeInTheDocument();
  });
});
