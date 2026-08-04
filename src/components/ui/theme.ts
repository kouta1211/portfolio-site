import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// indigo→violet系のブランドカラー。Hero等のグラデーション演出にも使う
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#eef1ff' },
          100: { value: '#e0e4ff' },
          200: { value: '#c6ccff' },
          300: { value: '#a5abff' },
          400: { value: '#8b83fb' },
          500: { value: '#7c6ef2' },
          600: { value: '#6d55e0' },
          700: { value: '#5c44c2' },
          800: { value: '#4a379c' },
          900: { value: '#3d2f7d' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.600}' },
          contrast: { value: 'white' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.50}' },
          emphasized: { value: '{colors.brand.300}' },
          focusRing: { value: '{colors.brand.500}' },
          _dark: {
            fg: { value: '{colors.brand.300}' },
            muted: { value: '{colors.brand.900}' },
            subtle: { value: '{colors.brand.800}' },
            emphasized: { value: '{colors.brand.700}' },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
