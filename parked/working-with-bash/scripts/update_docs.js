#!/usr/bin/env node
/**
 * update_docs.js — working-with-bash
 *
 * Four reference buckets, all freshness-stamped via the shared doc-frontmatter helper:
 *
 *   references/manual/    — OFFICIAL bash docs. Two provenance models in one dir:
 *                           (a) `man bash` / `man bashbug` generated VERBATIM from the
 *                               locally pinned bash (version-EXACT; gracefully skipped
 *                               when bash is absent or != the pin, e.g. in CI), and
 *                           (b) the GNU Bash Reference Manual + Readline + History
 *                               manuals, fetched (a SNAPSHOT, recorded by fetched_at).
 *                           Bash ships ONE monolithic man page (unlike zsh's 15
 *                           chapters), so the fetched GNU manuals add the readable,
 *                           chapter-organized view.
 *   references/ecosystem/ — third-party tooling READMEs (frameworks, managers, prompts,
 *                           completion, readline-enhancers, nav tools, lint/format/test).
 *                           Fetched SNAPSHOT, not version-pinned.
 *   references/learn/     — community learning corpus (BashFAQ/Guide/Pitfalls, Chet's
 *                           FAQ, Google style guide, pure-bash-bible, POSIX sh spec).
 *                           Fetched SNAPSHOT.
 *
 * The hand-written references/guides/* are NOT touched by this script.
 *
 * GitHub default branches differ across repos (master for most, main/develop for some),
 * so READMEs are fetched by resolving `default_branch` via the API first, then falling
 * back to trying main/master — hardcoding a branch 404s silently.
 *
 * Source quirks baked in (live-verified 2026-06-16):
 *   - gnu.org/software/readline/* 302-redirects away; use tiswww.cwru.edu/php/chet/...
 *     readline.html / history.html (HTML→text). No .txt form of either exists.
 *   - gnu.org returns 429 under burst → fetchUrl retries with backoff.
 *   - powerline README is README.rst on the `develop` branch; rupa/z ships a bare
 *     `README` (no extension); mvdan/sh is the `shfmt` tool.
 *   - Greg's Wiki (mywiki.wooledge.org) serves clean MoinMoin markup via ?action=raw,
 *     but the BashFAQ/BashGuide INDEX pages are stubs — their subpages are enumerated
 *     and concatenated into one file each.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync, execSync } = require('child_process');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');
const MANUAL_DIR = path.join(REFERENCES_DIR, 'manual');
const ECOSYSTEM_DIR = path.join(REFERENCES_DIR, 'ecosystem');
const LEARN_DIR = path.join(REFERENCES_DIR, 'learn');
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');

const RUN_NOW = new Date().toISOString();
const FAILURE_THRESHOLD = 0.30; // community sources are flakier than zsh's; allow a bit more slack
let docsChanged = false;

// Local man pages generated VERBATIM from the pinned bash. Bash's reference is one
// giant `man bash`; `bashbug` is the small companion page.
const MANUAL_PAGES = [
  'bash',    // the complete shell reference (grammar, expansion, builtins, variables, ...)
  'bashbug', // the bug-reporting companion
];

// GNU official manuals fetched at fixed URLs (always run; written to manual/).
// `html: true` runs the body through htmlToText first.
const GNU_MANUALS = [
  // The Bash Reference Manual — single plain text (bash.txt == bashref.txt; use bash.txt).
  { slug: 'bash-reference-manual', url: 'https://www.gnu.org/software/bash/manual/bash.txt' },
  // Readline + History — Chet Ramey's canonical HTML (gnu.org/software/readline/* redirects away).
  { slug: 'readline', url: 'https://tiswww.cwru.edu/php/chet/readline/readline.html', html: true },
  { slug: 'history', url: 'https://tiswww.cwru.edu/php/chet/readline/history.html', html: true },
];

// Single-file ecosystem sources fetched at a fixed URL → ecosystem/.
const ECOSYSTEM_DIRECT = [
  // oh-my-bash themes list (git-backed raw wiki markdown, oh-my-zsh pattern).
  { slug: 'oh-my-bash__themes', url: 'https://raw.githubusercontent.com/wiki/ohmybash/oh-my-bash/Themes.md' },
];

// GitHub repo docs → ecosystem/. Default branch resolved via the API
// (path defaults to README.md); only non-standard file paths are declared.
const REPO_SOURCES = [
  // frameworks
  { slug: 'oh-my-bash__readme', owner: 'ohmybash', repo: 'oh-my-bash' },
  // bash-it has no root README (docs live under docs/ → ReadTheDocs).
  { slug: 'bash-it__readme', owner: 'Bash-it', repo: 'bash-it', filePath: 'docs/README.md' },
  { slug: 'bash-it__themes', owner: 'Bash-it', repo: 'bash-it', filePath: 'docs/themes.rst' },
  // package / plugin managers
  { slug: 'basher__readme', owner: 'basherpm', repo: 'basher' },
  { slug: 'bpkg__readme', owner: 'bpkg', repo: 'bpkg' },
  // completion + readline enhancers (zsh-like UX in bash)
  { slug: 'bash-completion__readme', owner: 'scop', repo: 'bash-completion' },
  { slug: 'blesh__readme', owner: 'akinomyoga', repo: 'ble.sh' },
  { slug: 'bash-preexec__readme', owner: 'rcaloras', repo: 'bash-preexec' },
  // prompts
  { slug: 'starship__config', owner: 'starship', repo: 'starship' },
  { slug: 'oh-my-posh__readme', owner: 'JanDeDobbeleer', repo: 'oh-my-posh' },
  { slug: 'powerline__readme', owner: 'powerline', repo: 'powerline', filePath: 'README.rst' },
  { slug: 'bash-git-prompt__readme', owner: 'magicmonty', repo: 'bash-git-prompt' },
  { slug: 'liquidprompt__readme', owner: 'liquidprompt', repo: 'liquidprompt' },
  // navigation / dir tools
  { slug: 'fzf__readme', owner: 'junegunn', repo: 'fzf' },
  { slug: 'zoxide__readme', owner: 'ajeetdsouza', repo: 'zoxide' },
  { slug: 'z__readme', owner: 'rupa', repo: 'z', filePath: 'README' },
  { slug: 'autojump__readme', owner: 'wting', repo: 'autojump' },
  { slug: 'direnv__readme', owner: 'direnv', repo: 'direnv' },
  // quality tooling
  { slug: 'shellcheck__readme', owner: 'koalaman', repo: 'shellcheck' },
  { slug: 'shfmt__readme', owner: 'mvdan', repo: 'sh' },
  { slug: 'bats-core__readme', owner: 'bats-core', repo: 'bats-core' },
  // awesome list
  { slug: 'awesome-bash', owner: 'awesome-lists', repo: 'awesome-bash' },
];

// Repo docs that belong in learn/ (community books, not tooling).
const LEARN_REPOS = [
  { slug: 'pure-bash-bible', owner: 'dylanaraps', repo: 'pure-bash-bible' },
  { slug: 'bash-handbook', owner: 'denysdovhan', repo: 'bash-handbook' },
  { slug: 'bash-hackers-wiki', owner: 'flokoe', repo: 'bash-hackers-wiki' }, // original wiki died Apr 2023
];

// Single-file learning sources → learn/.
const LEARN_DIRECT = [
  { slug: 'bashpitfalls', url: 'https://mywiki.wooledge.org/BashPitfalls?action=raw' },
  { slug: 'chet-bash-faq', url: 'https://tiswww.case.edu/php/chet/bash/FAQ' },
  { slug: 'google-shell-style-guide', url: 'https://google.github.io/styleguide/shellguide.html', html: true },
  { slug: 'posix-shell-spec', url: 'https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html', html: true },
];

// NOTE on Greg's Wiki (mywiki.wooledge.org): it's a small MoinMoin server that
// 503-throttles aggressively and IP-blocks after light bursts. We fetch ONLY the
// single high-value BashPitfalls page (LEARN_DIRECT, one request/run) and keep a
// committed copy as the floor — a failed weekly fetch just preserves it. The
// multi-page BashGuide (11 chapters) and BashFAQ (~120 pages) are deliberately NOT
// fetched (hammering the wiki weekly is antisocial and unreliable); they're linked
// as external URLs from references/guides/ instead.

// ---------- pure helpers ----------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

// bash versions are 3-part (5.3.9) — but accept 2-part too.
function normalizeVersion(v) {
  const m = String(v).match(/(\d+\.\d+(?:\.\d+)?)/);
  return m ? m[1] : null;
}

function rawUrl(owner, repo, branch, filePath) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

// Minimal HTML→text for static doc pages. Drops script/style, turns block-closing
// tags into newlines, strips remaining tags, decodes common entities, collapses
// runaway blank lines.
function htmlToText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<(?:br|\/p|\/div|\/li|\/h[1-6]|\/tr|\/pre|hr)\b[^>]*>/gi, '\n')
    .replace(/<\/?(?:p|div|ul|ol|table|h[1-6]|pre)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- writing ----------

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

// ---------- manual generation (needs the pinned `bash` + its man pages) ----------

function bashMatchesPin(pin) {
  try {
    const out = execFileSync('bash', ['--version'], { encoding: 'utf8' });
    return normalizeVersion(out) === normalizeVersion(pin.bash);
  } catch {
    return false;
  }
}

function renderManPage(page) {
  // MANWIDTH fixes wrap width so sha256 is stable across machines/terminals.
  // col -bx strips backspace-overstrike (bold/underline) and tabs. MANPAGER/PAGER
  // = cat and GROFF_NO_SGR=1 keep ANSI escapes out of the output.
  return execSync(`man ${page} | col -bx`, {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, MANWIDTH: '80', MANPAGER: 'cat', PAGER: 'cat', GROFF_NO_SGR: '1' },
  });
}

function generateManual(pin) {
  if (!bashMatchesPin(pin)) {
    console.log(`⏭  bash absent or != pinned ${pin.bash}; skipping local man-page generation`);
    return;
  }
  console.log('🔧 Generating manual from pinned bash man pages...');
  for (const page of MANUAL_PAGES) {
    try {
      const body = renderManPage(page);
      if (!body.trim()) {
        console.error(`  ⚠ man ${page} produced empty output; skipping`);
        continue;
      }
      writeRef(path.join(MANUAL_DIR, `${page}.md`), body, `man ${page} @ bash ${pin.bash}`);
    } catch (e) {
      console.error(`  ⚠ man ${page} failed: ${e.message}`);
    }
  }
}

// ---------- fetch (no `bash` needed) ----------

// Buffer chunks and decode once at the end — `data += chunk` corrupts multi-byte
// UTF-8 characters that straddle a chunk boundary. Follows redirects. Retries on
// 429/5xx/network errors with backoff (gnu.org rate-limits under burst).
function fetchUrl(url, headers = {}, attempt = 0) {
  const MAX_ATTEMPTS = 5;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'agent-skills', ...headers } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).toString();
        return resolve(fetchUrl(next, headers, attempt));
      }
      if ((res.statusCode === 429 || res.statusCode >= 500) && attempt < MAX_ATTEMPTS) {
        res.resume();
        const backoff = 800 * 2 ** attempt;
        return sleep(backoff).then(() => resolve(fetchUrl(url, headers, attempt + 1)));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () =>
        res.statusCode >= 200 && res.statusCode < 300
          ? resolve(Buffer.concat(chunks).toString('utf8'))
          : reject(new Error(`HTTP ${res.statusCode} for ${url}`)));
    }).on('error', (err) => {
      if (attempt < MAX_ATTEMPTS) {
        return sleep(500 * 2 ** attempt).then(() => resolve(fetchUrl(url, headers, attempt + 1)));
      }
      reject(err);
    });
  });
}

function ghHeaders() {
  const h = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function resolveDefaultBranch(owner, repo) {
  try {
    const json = await fetchUrl(`https://api.github.com/repos/${owner}/${repo}`, ghHeaders());
    const branch = JSON.parse(json).default_branch;
    return typeof branch === 'string' && branch ? branch : null;
  } catch {
    return null;
  }
}

// Try the resolved default branch, then main, then master.
async function fetchRepoDoc({ owner, repo, filePath = 'README.md' }) {
  const resolved = await resolveDefaultBranch(owner, repo);
  const candidates = [...new Set([resolved, 'main', 'master', 'develop'].filter(Boolean))];
  let lastErr;
  for (const branch of candidates) {
    try {
      const url = rawUrl(owner, repo, branch, filePath);
      const body = await fetchUrl(url);
      return { body, url };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error(`no branch found for ${owner}/${repo}`);
}

async function fetchDirect(sources, destDir, results) {
  for (const { slug, url, html } of sources) {
    try {
      const raw = await fetchUrl(url);
      const body = html ? htmlToText(raw) : raw;
      writeRef(path.join(destDir, `${slug}.md`), body, url);
      results.push(true);
    } catch (e) {
      console.error(`  ⚠ ${slug}: ${e.message}`);
      results.push(false);
    }
    await sleep(150);
  }
}

async function fetchRepos(sources, destDir, results) {
  for (const src of sources) {
    try {
      const { body, url } = await fetchRepoDoc(src);
      writeRef(path.join(destDir, `${src.slug}.md`), body, url);
      results.push(true);
    } catch (e) {
      console.error(`  ⚠ ${src.slug}: ${e.message}`);
      results.push(false);
    }
    await sleep(150);
  }
}

async function fetchGnuManuals(results) {
  console.log('📥 Fetching GNU manuals (Bash Reference, Readline, History)...');
  await fetchDirect(GNU_MANUALS, MANUAL_DIR, results);
}

async function fetchEcosystem(results) {
  fs.mkdirSync(ECOSYSTEM_DIR, { recursive: true });
  console.log('📥 Fetching ecosystem (direct + GitHub repos)...');
  await fetchDirect(ECOSYSTEM_DIRECT, ECOSYSTEM_DIR, results);
  await fetchRepos(REPO_SOURCES, ECOSYSTEM_DIR, results);
}

async function fetchLearn(results) {
  fs.mkdirSync(LEARN_DIR, { recursive: true });
  console.log('📥 Fetching learning corpus (FAQ/Guide/Pitfalls/style/spec)...');
  await fetchDirect(LEARN_DIRECT, LEARN_DIR, results);
  await fetchRepos(LEARN_REPOS, LEARN_DIR, results);
}

// ---------- main ----------

async function main() {
  if (!fs.existsSync(PINNED_VERSION_FILE)) throw new Error(`Missing ${PINNED_VERSION_FILE}`);
  const pin = parsePinnedVersion(fs.readFileSync(PINNED_VERSION_FILE, 'utf8'));
  if (!pin.bash) throw new Error('PINNED_VERSION must define bash=');
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  console.log(`🚀 working-with-bash updater (bash=${pin.bash})`);

  generateManual(pin); // graceful skip handled inside

  const results = [];
  await fetchGnuManuals(results);
  await fetchEcosystem(results);
  await fetchLearn(results);

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  const failed = results.filter((r) => !r).length;
  const ratio = results.length ? failed / results.length : 1;
  if (results.length === 0 || ratio > FAILURE_THRESHOLD) {
    console.error(`❌ fetch failure ratio ${(ratio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
  console.log(`✅ Done (${results.length - failed}/${results.length} fetched ok).`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}

module.exports = { parsePinnedVersion, normalizeVersion, rawUrl };
