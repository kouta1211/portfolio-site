import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  it('renders an internal link without target/rel', () => {
    render(
      <Provider>
        <LinkButton href="/projects">プロジェクトを見る</LinkButton>
      </Provider>
    );

    const link = screen.getByRole('link', { name: 'プロジェクトを見る' });
    expect(link).toHaveAttribute('href', '/projects');
    expect(link).not.toHaveAttribute('target');
  });

  it('renders an external link with target=_blank and rel=noopener noreferrer', () => {
    render(
      <Provider>
        <LinkButton href="https://github.com/kouta1211">GitHub</LinkButton>
      </Provider>
    );

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/kouta1211');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
