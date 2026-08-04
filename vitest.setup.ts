import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// globals: true を使っていないため、@testing-library/reactの自動cleanupが
// 効かない。明示的にafterEachで呼び出し、テスト間でDOMが残らないようにする
afterEach(() => {
  cleanup();
});

// Chakra UIのcolor-mode(next-themes)がmatchMediaを参照するため、jsdom用にモックする
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// motion(Framer Motion)のwhileInViewが内部でIntersectionObserverを使うため、jsdom用にモックする
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
});
