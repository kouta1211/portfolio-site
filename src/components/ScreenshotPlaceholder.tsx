// 実スクリーンショットを用意したら、このコンポーネントの代わりに next/image で差し替える
export function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
      {label}のスクリーンショット(準備中)
    </div>
  );
}
