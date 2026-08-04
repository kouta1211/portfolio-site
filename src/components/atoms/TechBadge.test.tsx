import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from '@/components/ui/provider';
import { TechBadge } from './TechBadge';

describe('TechBadge', () => {
  it('renders the given label', () => {
    render(
      <Provider>
        <TechBadge label="TypeScript" />
      </Provider>
    );

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
