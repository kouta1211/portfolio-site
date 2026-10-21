export type ProjectStat = {
  // 表示する数字。桁区切りを含めた見た目のまま書く（例: '1,936'）
  value: string;
  label: string;
};

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
  // 代表作の実績の数字。トップの数字の帯に出す（作品の数は自動で足される）
  stats?: ProjectStat[];
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
      '振付師が PC で組んだ隊形を、踊る人はスマホの URL 1本で、曲に合わせて確かめられる Web アプリ',
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
      '作る人は1〜2人、見る人は十数人。だから作る画面は PC、見る画面はスマホの URL 1本に分けた',
      'テスト1936件と独自の lint ルールで、品質を注意ではなく仕組みで守った',
      '実装は Claude Code と。規約と教訓の記録で、AI の書くコードを揃えた',
    ],
    // 2026-09-29 時点（詳細ページの「品質」「概要」と同じ時点の数字）
    stats: [
      { value: '1,936', label: 'テスト（Vitest）' },
      { value: '564', label: 'コミット / 8週間' },
    ],
  },
  {
    slug: 'payment-optimizer',
    name: 'キャッシュレス決済最適化アプリ',
    tagline:
      '支出ごとに一番得だった決済手段を判定し、取り逃した還元額を見せるアプリ',
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
      '学習内容と時間を記録するアプリ。Supabase を使って最初に作ったもの',
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
    tagline: '自己紹介と得意技術を、URL 1本で渡せるデジタル名刺',
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
    tagline: 'Qiita と microCMS の記事を、1か所にまとめて読める個人ブログ',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'axios'],
    inProgress: true,
    screenshots: [
      '/screenshots/tech-blog-1.png',
      '/screenshots/tech-blog-2.png',
    ],
    repoUrl: 'https://github.com/kouta1211/tech_blog',
  },
];
