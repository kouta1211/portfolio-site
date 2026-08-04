import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { ProjectScreenshot } from './ProjectScreenshot';

describe('ProjectScreenshot', () => {
  it('shows placeholder text when no images are given', () => {
    render(
      <Provider>
        <ProjectScreenshot label="名刺アプリ" />
      </Provider>
    );

    expect(
      screen.getByText('名刺アプリのスクリーンショット(準備中)')
    ).toBeInTheDocument();
  });

  it('renders a single image with the given alt text when one image is given', () => {
    render(
      <Provider>
        <ProjectScreenshot
          label="名刺アプリ"
          images={['/screenshots/meishi-app-1.png']}
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

  it('renders one image per entry when multiple images are given', () => {
    render(
      <Provider>
        <ProjectScreenshot
          label="名刺アプリ"
          images={[
            '/screenshots/meishi-app-1.png',
            '/screenshots/meishi-app-2.png',
            '/screenshots/meishi-app-3.png',
          ]}
          alt="名刺アプリの画面"
        />
      </Provider>
    );

    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(
      screen.getByRole('img', { name: '名刺アプリの画面 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: '名刺アプリの画面 3' })
    ).toBeInTheDocument();
  });

  it('opens an enlarged view of the clicked screenshot', async () => {
    const user = userEvent.setup();
    render(
      <Provider>
        <ProjectScreenshot
          label="名刺アプリ"
          images={[
            '/screenshots/meishi-app-1.png',
            '/screenshots/meishi-app-2.png',
          ]}
          alt="名刺アプリの画面"
        />
      </Provider>
    );

    await user.click(screen.getByRole('img', { name: '名刺アプリの画面 2' }));

    // ダイアログが開くと背景コンテンツは aria-hidden になるため、
    // クリックしたサムネイルと同じ alt を持つ拡大画像が見えるようになる
    expect(
      await screen.findByRole('button', { name: '閉じる' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: '名刺アプリの画面 2' })
    ).toBeInTheDocument();
  });
});
