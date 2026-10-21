import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// ライト / ダークで値を変えるときは、必ず value: { _light, _dark } の形で書く。
// キーに _dark を置くと条件ではなく「_dark という名前のトークン」になり、黙って効かない
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // 青系のブランド色。Hero の光のにじみ（dancer.blue）と揃える
        brand: {
          50: { value: '#eef4ff' },
          100: { value: '#dbe7ff' },
          200: { value: '#bcd3ff' },
          300: { value: '#8fb5ff' },
          400: { value: '#5f91fb' },
          500: { value: '#3b72f0' },
          600: { value: '#2a5bd9' },
          700: { value: '#2348b0' },
          800: { value: '#213e8c' },
          900: { value: '#1f356d' },
          950: { value: '#141f42' },
        },
        // Choreon の踊り手の色（choreon リポジトリの src/features/dancer/constants.ts の先頭4色）
        dancer: {
          blue: { value: '#3b82f6' },
          red: { value: '#ef4444' },
          green: { value: '#10b981' },
          amber: { value: '#f59e0b' },
        },
        // ダークの背景に使う、黒に近い紺
        ink: {
          950: { value: '#0a0c11' },
          900: { value: '#0e1117' },
          850: { value: '#12151c' },
          800: { value: '#181c25' },
          700: { value: '#22262f' },
          600: { value: '#2d323d' },
        },
      },
      fonts: {
        heading: {
          value:
            'var(--font-zen-kaku), var(--font-geist-sans), "Hiragino Sans", "Yu Gothic UI", sans-serif',
        },
        body: {
          value:
            'var(--font-geist-sans), "Hiragino Sans", "Yu Gothic UI", "Meiryo", sans-serif',
        },
        mono: {
          value: 'var(--font-geist-mono), ui-monospace, Consolas, monospace',
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: {
              _light: '{colors.brand.600}',
              _dark: '{colors.brand.500}',
            },
          },
          contrast: { value: 'white' },
          fg: {
            value: {
              _light: '{colors.brand.700}',
              _dark: '{colors.brand.300}',
            },
          },
          muted: {
            value: {
              _light: '{colors.brand.100}',
              _dark: '{colors.brand.900}',
            },
          },
          subtle: {
            value: { _light: '{colors.brand.50}', _dark: '{colors.brand.950}' },
          },
          emphasized: {
            value: {
              _light: '{colors.brand.300}',
              _dark: '{colors.brand.700}',
            },
          },
          focusRing: { value: '{colors.brand.500}' },
          border: {
            value: {
              _light: '{colors.brand.500}',
              _dark: '{colors.brand.400}',
            },
          },
        },
        bg: {
          DEFAULT: {
            value: { _light: '{colors.white}', _dark: '{colors.ink.950}' },
          },
          subtle: {
            value: { _light: '{colors.gray.50}', _dark: '{colors.ink.900}' },
          },
          muted: {
            value: { _light: '{colors.gray.100}', _dark: '{colors.ink.800}' },
          },
          panel: {
            value: { _light: '{colors.white}', _dark: '{colors.ink.850}' },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: '{colors.gray.200}', _dark: '{colors.ink.700}' },
          },
          emphasized: {
            value: { _light: '{colors.gray.300}', _dark: '{colors.ink.600}' },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
