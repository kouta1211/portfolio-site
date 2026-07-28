import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Chakra UI CLIが生成するsnippetなので編集しない。生成コードそのままのルールで通す。
  {
    files: ['src/components/ui/**'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  // Prettierと競合するスタイルルールを無効化するため、必ず最後に置く。
  eslintConfigPrettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
