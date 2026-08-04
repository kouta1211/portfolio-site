export type Project = {
  slug: string;
  name: string;
  tagline: string;
  techStack: string[];
  // 実スクリーンショットを用意したら public/screenshots/ に配置しここに指定する(例: '/screenshots/meishi-app.png')
  screenshotSrc?: string;
};

export const projects: Project[] = [
  {
    slug: 'meishi-app',
    name: '名刺アプリ',
    tagline: '名前・自己紹介・得意技術を1つのURLで共有できるデジタル名刺アプリ',
    techStack: [
      'Vite',
      'React',
      'TypeScript',
      'Chakra UI',
      'React Router',
      'TanStack Query',
      'Supabase',
    ],
  },
  {
    slug: 'payment-optimizer',
    name: 'キャッシュレス決済最適化アプリ',
    tagline:
      '支出ごとに最適な決済手段だったかを判定し、機会損失を可視化するアプリ',
    techStack: [
      'Vite',
      'React',
      'TypeScript',
      'Chakra UI',
      'React Router',
      'TanStack Query',
      'Supabase',
    ],
  },
];
