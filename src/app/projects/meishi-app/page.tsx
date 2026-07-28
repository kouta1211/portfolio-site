import { TechBadge } from '@/components/TechBadge';
import { ScreenshotPlaceholder } from '@/components/ScreenshotPlaceholder';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'meishi-app')!;

export default function MeishiAppPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </div>

      <ScreenshotPlaceholder label={project.name} />

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">概要</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          名前・自己紹介・得意技術(複数選択)・GitHubやX等のSNSリンクを登録し、
          1つのURLで共有できるデジタル名刺アプリ。React学習を目的に、
          Supabaseを使った実運用に近い構成で作成した。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">工夫した点</h2>
        <ul className="list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>
            自己紹介文はユーザーが自由入力するリッチテキストのため、DOMPurifyで
            サニタイズしてからレンダリングし、XSSを防止した
          </li>
          <li>
            <code>router</code> / <code>domain</code> / <code>lib</code> /{' '}
            <code>hooks</code> にレイヤーを分け、画面・ビジネスロジック・
            データアクセスの責務を分離した
          </li>
          <li>ID重複チェックや必須項目チェックを含むフォームバリデーション</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">つまずいた点と解決策</h2>
        <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>
            SupabaseはRLSポリシーを設定するだけではAPIアクセスが通らず、
            テーブルへの<code>GRANT</code>も別途必要だと判明した。以降は
            テーブル作成・変更のたびにGRANTとRLS両方を確認するようにした
          </li>
          <li>
            PostgRESTの埋め込みselect構文(リレーション先テーブルの同時取得)は
            外部キー制約に依存しており、スキーマ変更後に反映されないことが
            あった。<code>NOTIFY pgrst, &apos;reload schema&apos;</code>{' '}
            を実行してPostgRESTにスキーマの再読み込みを促すことで解決した
          </li>
        </ul>
      </section>
    </div>
  );
}
