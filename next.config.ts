import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ホームディレクトリ直下に無関係な package-lock.json があり、
  // Turbopackがそちらをワークスペースルートと誤検出するため明示的に固定する。
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
