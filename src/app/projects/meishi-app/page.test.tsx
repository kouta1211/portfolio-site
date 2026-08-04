import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import MeishiAppPage from './page';

describe('MeishiAppPage', () => {
  it('renders the title and all section headings', () => {
    render(
      <Provider>
        <MeishiAppPage />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: '名刺アプリ' })
    ).toBeInTheDocument();
    expect(screen.getByText('概要')).toBeInTheDocument();
    expect(screen.getByText('工夫した点')).toBeInTheDocument();
    expect(screen.getByText('つまずいた点と解決策')).toBeInTheDocument();
  });
});
