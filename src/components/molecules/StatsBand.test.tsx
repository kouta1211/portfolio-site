import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { StatsBand } from './StatsBand';

describe('StatsBand', () => {
  it('代表作の数字と、掲載している作品の数を出す', () => {
    render(
      <Provider>
        <StatsBand
          stats={[
            { value: '1,234', label: 'テスト' },
            { value: '56', label: 'コミット' },
          ]}
          projectCount={7}
        />
      </Provider>
    );

    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('テスト')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.getByText('コミット')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('掲載している作品')).toBeInTheDocument();
  });

  it('代表作の数字が無くても、作品の数だけは出す', () => {
    render(
      <Provider>
        <StatsBand stats={[]} projectCount={3} />
      </Provider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
