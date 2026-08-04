import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { ProjectScreenshot } from './ProjectScreenshot';

describe('ProjectScreenshot', () => {
  it('shows placeholder text when no src is given', () => {
    render(
      <Provider>
        <ProjectScreenshot label="名刺アプリ" />
      </Provider>
    );

    expect(
      screen.getByText('名刺アプリのスクリーンショット(準備中)')
    ).toBeInTheDocument();
  });

  it('renders an image with the given alt text when src is given', () => {
    render(
      <Provider>
        <ProjectScreenshot
          label="名刺アプリ"
          src="/screenshots/meishi-app.png"
          alt="名刺アプリの画面"
        />
      </Provider>
    );

    expect(
      screen.getByRole('img', { name: '名刺アプリの画面' })
    ).toBeInTheDocument();
    expect(
      screen.queryByText('名刺アプリのスクリーンショット(準備中)')
    ).not.toBeInTheDocument();
  });
});
