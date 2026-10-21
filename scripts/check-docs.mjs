// Markdown が「実在するもの」だけを指しているかを検査する。
// 正しいことが書いてあるかは見ない。リンク切れ・消えたファイル・消えた識別子を拾う。
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const tracked = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard'],
  {
    encoding: 'utf8',
  }
)
  .split('\n')
  .filter(Boolean);

// 実在の判定は「git で追跡しているか」で行う。ディスクにあるかで見ると、手元にだけある
// ビルド成果物（.next/ など）で通ってしまい、CI では落ちる（2026-10-21 に実際に起きた）
const trackedSet = new Set(tracked);
const trackedDirs = new Set(
  tracked.flatMap((f) => {
    const parts = f.split('/').slice(0, -1);
    return parts.map((_, i) => parts.slice(0, i + 1).join('/'));
  })
);
const inRepo = (absPath) => {
  const rel = path.relative(root, absPath).split(path.sep).join('/');
  return trackedSet.has(rel) || trackedDirs.has(rel);
};

const mdFiles = tracked.filter((f) => f.endsWith('.md'));
const codeFiles = tracked.filter((f) => /\.(ts|tsx|mjs|js|json|yml)$/.test(f));
const codeText = codeFiles.map((f) => readFileSync(f, 'utf8')).join('\n');

// 例として書いた、実在しないものの除外。追加するときは理由を必ず書く
const ALLOW = new Map([
  ['YYYY-MM-DD', '日付の書式の例'],
  ['NNNN', 'ADR 番号の書式の例'],
  ['my_project', 'ユーザーのローカルの親ディレクトリ名'],
  ['FleetView', '無関係（誤検出防止）'],
  ['Pictures\\Screenshots', 'Windows の標準の保存先'],
  ['EnterPlanMode', 'Claude Code のツール名'],
  ['feature/add-', 'git のブランチ名の例'],
  [
    '.next/',
    'Next.js のビルド成果物。git で追跡せず、CI では検査の時点でまだ無い',
  ],
]);

// 手順書の bash ブロックに入れてはいけないコマンド（終わらない）
const FORBIDDEN_IN_BASH = [
  {
    re: /^\s*npm run test\s*$/m,
    why: 'watch モードで終わらない。npm run test:run を使う',
  },
  {
    re: /^\s*npx vitest\s*$/m,
    why: 'watch モードで終わらない。npx vitest run を使う',
  },
];

const errors = [];
const report = (file, msg) => errors.push(`${file}: ${msg}`);

// <slug> や * を含むパスは、追跡ファイルに1つでも当てはまれば良しとする
const toRegex = (p) =>
  new RegExp(
    '^' +
      p
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/<[^>]+>/g, '[^/]+')
        .replace(/\*/g, '.*') +
      '$'
  );

function pathExists(p, fromFile) {
  const clean = p.replace(/\/$/, '');
  if (/[<*]/.test(clean)) {
    const re = toRegex(clean);
    return tracked.some(
      (f) =>
        re.test(f) ||
        re.test(path.basename(f)) ||
        re.test(f.split('/').slice(0, -1).join('/'))
    );
  }
  if (
    inRepo(path.join(root, clean)) ||
    inRepo(path.join(path.dirname(path.join(root, fromFile)), clean))
  )
    return true;
  // node_modules だけはディスクで見る（CI でも npm ci の後にある）
  if (clean === 'node_modules' || clean.startsWith('node_modules/'))
    return existsSync(path.join(root, clean));
  // import 先（next/image など）は拡張子なしで書くので、.js も試す
  const inNodeModules = [
    path.join(root, 'node_modules', clean),
    path.join(root, 'node_modules', clean + '.js'),
  ];
  if (inNodeModules.some((c) => existsSync(c))) return true;
  // 見つからないときはベース名で探す（ファイル名でもディレクトリ名でもよい）
  const base = path.basename(clean);
  return tracked.some((f) => f.split('/').includes(base));
}

const looksLikePath = (t) =>
  !t.includes(' ') &&
  !t.startsWith('/') && // URL のルート（/projects など）
  !t.startsWith('@') && // import の別名・パッケージ名
  !/^https?:/.test(t) &&
  (t.includes('/') || /\.(md|ts|tsx|mjs|js|json|yml|png|css)$/.test(t)) &&
  /^[\w.\-<>*/]+$/.test(t);

const looksLikeIdentifier = (t) =>
  /^[A-Za-z_$][\w$]*(\(\))?$/.test(t) &&
  (t.endsWith('()') || /^[a-z]+[A-Z]/.test(t) || /^[A-Z][a-z]+[A-Z]/.test(t));

for (const file of mdFiles) {
  const text = readFileSync(file, 'utf8');
  const withoutFences = text.replace(/```[\s\S]*?```/g, '');

  // 1. Markdown のリンク
  for (const m of withoutFences.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = m[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    const abs = path.join(
      path.dirname(path.join(root, file)),
      decodeURIComponent(target)
    );
    if (!inRepo(abs)) report(file, `リンク先が無い: ${m[1]}`);
  }

  // 2・3. バッククォートの中身
  for (const m of withoutFences.matchAll(/`([^`\n]+)`/g)) {
    const token = m[1].trim();
    if ([...ALLOW.keys()].some((k) => token.includes(k))) continue;
    if (looksLikePath(token)) {
      if (!pathExists(token, file)) report(file, `パスが無い: ${token}`);
    } else if (looksLikeIdentifier(token)) {
      const name = token.replace(/\(\)$/, '');
      if (!new RegExp(`\\b${name}\\b`).test(codeText))
        report(file, `識別子がコードに無い: ${token}`);
    }
  }

  // 4. bash ブロックの危ないコマンド
  for (const m of text.matchAll(/```(?:bash|sh)\n([\s\S]*?)```/g)) {
    for (const { re, why } of FORBIDDEN_IN_BASH) {
      if (re.test(m[1]))
        report(file, `bash ブロックに ${re.source} がある（${why}）`);
    }
  }
}

if (errors.length) {
  console.error(
    `check-docs: ${errors.length} 件\n` +
      errors.map((e) => `  - ${e}`).join('\n')
  );
  process.exit(1);
}
console.log(`check-docs: OK（${mdFiles.length} ファイル）`);
