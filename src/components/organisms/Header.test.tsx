import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { Header } from './Header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/projects',
}));

describe('Header', () => {
  it('renders nav links and highlights the active page', () => {
    render(
      <Provider>
        <Header />
      </Provider>
    );

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const projectsLink = screen.getByRole('link', { name: 'Projects' });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(projectsLink).toHaveAttribute('aria-current', 'page');
    expect(homeLink).not.toHaveAttribute('aria-current');
    expect(
      screen.getByRole('button', { name: 'Toggle color mode' })
    ).toBeInTheDocument();
  });
});
