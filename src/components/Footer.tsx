export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
        <span>&copy; {year}</span>
        <a
          href="https://github.com/kouta1211"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
