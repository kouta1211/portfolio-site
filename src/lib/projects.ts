export type Project = {
  slug: string;
  name: string;
  tagline: string;
  techStack: string[];
  // 実スクリーンショットを用意したら public/screenshots/ に配置しここに指定する(例: ['/screenshots/meishi-app-1.png'])
  screenshots?: string[];
  // 開発中でGitHub未公開・未デプロイのプロジェクトに付ける
  inProgress?: boolean;
  repoUrl?: string;
  // 本番で触れるURL。あれば詳細ページに「サイトを開く」を出す
  liveUrl?: string;
  // 代表作。一覧の先頭に全幅のカードで出す（付けるのは1件だけ）
  featured?: boolean;
  // 代表作のカードに出す要点（2〜3行）
  highlights?: string[];
};

/** 代表作と、それ以外に分ける。代表作が無ければ featured は null */
export function splitFeatured(list: Project[]): {
  featured: Project | null;
  others: Project[];
} {
  const featured = list.find((p) => p.featured) ?? null;
  return {
    featured,
    others: list.filter((p) => p !== featured),
  };
}

export const projects: Project[] = [
  {
    slug: 'choreon',
    name: 'Choreon',
    tagline:
      '振付師はPCで隊形を組み、踊る人はスマホでURLを開くだけで自分の道順を曲に合わせて確かめられるWebアプリ',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Supabase',
      'dnd-kit',
      'Vitest',
      'PWA',
    ],
    screenshots: ['/screenshots/choreon-1.png', '/screenshots/choreon-2.png'],
    repoUrl: 'https://github.com/kouta1211/choreon',
    liveUrl: 'https://choreon.vercel.app',
    featured: true,
    highlights: [
      '「作る人は少なく、見る人は多い」から、作る画面（PC）と見る画面（スマホ・URL1本）を分けた',
      'テスト1936件・独自のlintルール・文書の検査・DB側の権限設計で、品質を仕組みで守った',
      'Claude Codeを主力にしつつ、規約と学びの記録でAIの出力を統制した',
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
    screenshots: [
      '/screenshots/payment-optimizer-6.png',
      '/screenshots/payment-optimizer-7.png',
      '/screenshots/payment-optimizer-1.png',
      '/screenshots/payment-optimizer-2.png',
      '/screenshots/payment-optimizer-3.png',
      '/screenshots/payment-optimizer-5.png',
    ],
    repoUrl: 'https://github.com/kouta1211/payment-optimizer',
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
    screenshots: ['/screenshots/study-record-app-1.png'],
    repoUrl: 'https://github.com/kouta1211/studyRecord-application',
  },
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
    screenshots: [
      '/screenshots/meishi-app-1.png',
      '/screenshots/meishi-app-2.png',
      '/screenshots/meishi-app-3.png',
    ],
    repoUrl: 'https://github.com/kouta1211/meishi-application',
  },

  {
    slug: 'tech-blog',
    name: 'Tech Blog',
    tagline: 'QiitaとmicroCMSの記事をまとめて表示する個人テックブログ(開発中)',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'axios'],
    inProgress: true,
    screenshots: [
      '/screenshots/tech-blog-1.png',
      '/screenshots/tech-blog-2.png',
    ],
    repoUrl: 'https://github.com/kouta1211/tech_blog',
  },
];
