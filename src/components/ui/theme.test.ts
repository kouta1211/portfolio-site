import { describe, expect, it } from 'vitest';
import { system } from './theme';

type VarBlock = Record<string, string>;

// getTokenCss() は { '@layer tokens': { [selector]: { [cssVar]: value } } } の形
function tokenBlocks(): Record<string, VarBlock> {
  const css = system.getTokenCss() as Record<string, Record<string, VarBlock>>;
  return css['@layer tokens'];
}

function varIn(selectorStart: string, name: string): string | undefined {
  const entry = Object.entries(tokenBlocks()).find(([selector]) =>
    selector.startsWith(selectorStart)
  );
  return entry?.[1][name];
}

describe('theme', () => {
  it('brand の文字色はダークで明るい色に切り替わる', () => {
    const light = varIn(':root', '--chakra-colors-brand-fg');
    const dark = varIn('.dark', '--chakra-colors-brand-fg');

    expect(light).toBe('var(--chakra-colors-brand-700)');
    expect(dark).toBe('var(--chakra-colors-brand-300)');
  });

  it('_dark / _light が条件ではなくトークン名として作られていない', () => {
    const names = Object.values(tokenBlocks()).flatMap((block) =>
      Object.keys(block)
    );
    expect(names.filter((n) => /-_(dark|light)-/.test(n))).toEqual([]);
  });
});
