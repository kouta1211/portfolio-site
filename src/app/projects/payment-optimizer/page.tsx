import { TechBadge } from '@/components/TechBadge';
import { ScreenshotPlaceholder } from '@/components/ScreenshotPlaceholder';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'payment-optimizer')!;
const liveUrl = 'https://payment-optimizer-snowy.vercel.app/login';

export default function PaymentOptimizerPage() {
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
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit font-medium underline underline-offset-4"
        >
          公開URLを見る
        </a>
      </div>

      <ScreenshotPlaceholder label={project.name} />

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">概要</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          クレジットカード・電子マネー・QR決済など複数のキャッシュレス決済手段を
          使い分けている人向けのアプリ。支出ごとに実際に使った決済方法が最適
          だったかを判定し、次に使うべきカードを提案する。過去の支出から生じた
          機会損失額もダッシュボードで可視化する。
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">工夫した点</h2>
        <ul className="list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>
            還元率は将来変わり得るため、支出記録時点の還元率(
            <code>reward_rate_applied</code>)をスナップショットとして保存し、
            実質支払額(<code>effective_amount</code>)はPostgresの生成列
            (Generated Column)として自動算出する設計にした
          </li>
          <li>
            支出とカードの「得意カテゴリ」がどちらも自由入力だと表記ゆれ
            (例:「ネット」と「ネットショッピング」)が発生し、最適カード判定を
            誤らせていた。カテゴリをマスタテーブル化し選択式にすることで解消した
          </li>
          <li>
            支出履歴のある決済方法は<code>ON DELETE RESTRICT</code>制約で
            削除できないようにし、DBのエラーはアプリ側でユーザー向けの分かり
            やすいメッセージに変換して表示する
          </li>
          <li>
            還元額・機会損失の計算ロジックはSupabase/Reactに依存しない純粋関数
            として切り出し、Vitestで単体テストを書いた
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">つまずいた点と解決策</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Supabaseは<code>public</code>スキーマに新規テーブルを作ると、
          <code>anon</code>ロールにSELECT/INSERT/UPDATE/DELETEの権限が
          デフォルトで自動付与される設定になっていることに気づかず、個人データ
          のテーブルにも意図せず<code>anon</code>権限が残っていた。以降は
          テーブルを作成・変更するたびにGRANTとRLSポリシーの両方を確認し、
          個人データのテーブルからは<code>anon</code>権限を明示的に剥奪する、
          というルールを徹底することにした。
        </p>
      </section>
    </div>
  );
}
