import { describe, expect, it } from 'vitest';
import { projects, splitFeatured, type Project } from './projects';

const make = (slug: string, featured?: boolean): Project => ({
  slug,
  name: slug,
  tagline: '',
  techStack: [],
  featured,
});

describe('splitFeatured', () => {
  it('代表作を1件取り出し、残りを元の順で返す', () => {
    const list = [make('a'), make('b', true), make('c')];
    const { featured, others } = splitFeatured(list);

    expect(featured?.slug).toBe('b');
    expect(others.map((p) => p.slug)).toEqual(['a', 'c']);
  });

  it('代表作が無ければ null で、全件が残りに入る', () => {
    const { featured, others } = splitFeatured([make('a'), make('b')]);

    expect(featured).toBeNull();
    expect(others).toHaveLength(2);
  });

  it('掲載データの代表作は Choreon の1件だけ', () => {
    expect(projects.filter((p) => p.featured).map((p) => p.slug)).toEqual([
      'choreon',
    ]);
  });
});
