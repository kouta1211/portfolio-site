// TODO: 実際の名前・肩書き・一言メッセージに差し替える(現状はプレースホルダー)
export function Hero() {
  return (
    <section className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight">氏名(仮)</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        肩書き(仮) — 一言メッセージ(仮)
      </p>
    </section>
  );
}
