export type Project = {
  slug: string;
  name: string;
  tagline: string;
  techStack: string[];
  // 実スクリーンショットを用意したら public/screenshots/ に配置しここに指定する(例: '/screenshots/meishi-app.png')
  screenshotSrc?: string;
  // 開発中でGitHub未公開・未デプロイのプロジェクトに付ける
  inProgress?: boolean;
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
  {
    slug: 'study-record-app',
    name: '学習記録アプリ',
    tagline:
      'タイトルと学習時間を記録し、一覧・登録・編集・削除ができる学習記録管理アプリ',
    techStack: [
      'Vite',
      'React',
      'TypeScript',
      'Chakra UI',
      'Supabase',
      'React Hook Form',
      'Vitest',
    ],
  },
  {
    slug: 'tech-blog',
    name: 'Tech Blog',
    tagline: 'QiitaとmicroCMSの記事をまとめて表示する個人テックブログ(開発中)',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'axios'],
    inProgress: true,
  },
];
