import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import PaymentOptimizerPage from './page';

describe('PaymentOptimizerPage', () => {
  it('renders the title and all section headings', () => {
    render(
      <Provider>
        <PaymentOptimizerPage />
      </Provider>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'キャッシュレス決済最適化アプリ',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('概要')).toBeInTheDocument();
    expect(screen.getByText('工夫した点')).toBeInTheDocument();
    expect(screen.getByText('つまずいた点と解決策')).toBeInTheDocument();
  });
});
