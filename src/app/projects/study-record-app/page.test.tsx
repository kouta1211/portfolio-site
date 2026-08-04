import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import StudyRecordAppPage from './page';

describe('StudyRecordAppPage', () => {
  it('renders the title and section headings', () => {
    render(
      <Provider>
        <StudyRecordAppPage />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: '学習記録アプリ' })
    ).toBeInTheDocument();
    expect(screen.getByText('概要')).toBeInTheDocument();
    expect(screen.getByText('工夫した点')).toBeInTheDocument();
  });
});
