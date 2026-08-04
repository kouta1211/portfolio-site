import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the current year and a link to GitHub', () => {
    render(
      <Provider>
        <Footer />
      </Provider>
    );

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/kouta1211'
    );
  });
});
