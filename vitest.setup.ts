import '@testing-library/jest-dom/vitest';

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
