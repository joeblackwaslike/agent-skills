#!/usr/bin/env node
/**
 * update_docs.js — working-with-zsh
 *
 * Two outputs, both freshness-stamped via the shared doc-frontmatter helper:
 *
 *   references/manual/    — generated VERBATIM from the locally pinned `zsh`'s own
 *                           man pages (`man zshexpn | col -bx`, etc.). Version-EXACT.
 *                           Gracefully skipped when `zsh` is absent or != the pin
 *                           (e.g. in CI). The manual is the canonical Zsh reference.
 *   references/ecosystem/ — fetched upstream docs for the fast-moving ecosystem
 *                           (frameworks, plugin managers, prompts, plugins, FAQ,
 *                           user guide, zsh-lovers). NOT version-pinned — a SNAPSHOT
 *                           at fetch time (recorded by fetched_at/sha256).
 *
 * The hand-written references/guides/* are NOT touched by this script.
 *
 * GitHub default branches differ across repos (master for most, main for a few),
 * so READMEs are fetched by resolving `default_branch` via the API first, then
 * falling back to trying main/master — hardcoding a branch 404s silently.
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
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');

const RUN_NOW = new Date().toISOString();
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

// Canonical zsh man-page chapters. `zshall` is intentionally excluded — it is the
// concatenation of every chapter below and would duplicate the whole manual.
const MANUAL_PAGES = [
  'zsh',         // intro, invocation, startup files, description
  'zshroadmap',  // a guided tour of the manual
  'zshmisc',     // shell grammar, redirection, functions, jobs, prompt expansion
  'zshexpn',     // expansion (history, glob, parameter, brace, ...)
  'zshparam',    // parameters / special variables
  'zshoptions',  // setopt/unsetopt options (incl. SH_*/KSH_* emulation)
  'zshbuiltins', // builtin commands
  'zshzle',      // the Zsh Line Editor (ZLE), bindkey, widgets
  'zshcompwid',  // completion widgets (low-level)
  'zshcompsys',  // the new completion system (compinit, zstyle, ...)
  'zshmodules',  // loadable modules (zsh/mathfunc, zsh/zpty, ...)
  'zshcontrib',  // user contributions (vcs_info, zmv, zcalc, promptinit, ...)
  'zshcalsys',   // calendar function system
  'zshtcpsys',   // TCP function system
  'zshzftpsys',  // zftp function system
];

// Single-file ecosystem sources fetched at a fixed URL (no branch resolution).
// `html: true` runs the body through htmlToText first. GitHub wiki pages are
// git-backed: their raw markdown lives under raw.githubusercontent.com/wiki/...
// (clean + deterministic), NOT the rendered /wiki/ HTML (full GitHub chrome +
// per-request nonces that would churn sha256 on every fetch).
const DIRECT_SOURCES = [
  { slug: 'faq', url: 'https://zsh.sourceforge.io/FAQ/zshfaq.txt' },
  { slug: 'zsh-lovers', url: 'https://raw.githubusercontent.com/grml/zsh-lovers/master/zsh-lovers.1.txt' },
  { slug: 'oh-my-zsh__plugins', url: 'https://raw.githubusercontent.com/wiki/ohmyzsh/ohmyzsh/Plugins.md' },
  { slug: 'oh-my-zsh__themes', url: 'https://raw.githubusercontent.com/wiki/ohmyzsh/ohmyzsh/Themes.md' },
  // Peter Stephenson's "A User's Guide to the Z-Shell" — frozen (2003), static HTML
  // per chapter (zshguide.html is only the TOC). Chapters 01–08 exist; static files
  // → deterministic, no churn. Any future 404 is skipped by the fetch loop.
  { slug: 'user-guide__00-toc', url: 'https://zsh.sourceforge.io/Guide/zshguide.html', html: true },
  ...Array.from({ length: 8 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { slug: `user-guide__${n}`, url: `https://zsh.sourceforge.io/Guide/zshguide${n}.html`, html: true };
  }),
];

// GitHub repo docs — default branch resolved via the API (path defaults to README.md).
const REPO_SOURCES = [
  { slug: 'oh-my-zsh__readme', owner: 'ohmyzsh', repo: 'ohmyzsh' },
  { slug: 'awesome-zsh-plugins', owner: 'unixorn', repo: 'awesome-zsh-plugins' },
  // frameworks
  { slug: 'prezto__readme', owner: 'sorin-ionescu', repo: 'prezto' },
  { slug: 'zim__readme', owner: 'zimfw', repo: 'zimfw' },
  // plugin managers
  { slug: 'zinit__readme', owner: 'zdharma-continuum', repo: 'zinit' },
  { slug: 'antidote__readme', owner: 'mattmc3', repo: 'antidote' },
  { slug: 'antigen__readme', owner: 'zsh-users', repo: 'antigen', filePath: 'README.mkd' },
  { slug: 'zplug__readme', owner: 'zplug', repo: 'zplug' },
  { slug: 'sheldon__readme', owner: 'rossmacarthur', repo: 'sheldon' },
  // prompts
  { slug: 'powerlevel10k__readme', owner: 'romkatv', repo: 'powerlevel10k' },
  { slug: 'starship__config', owner: 'starship', repo: 'starship', filePath: 'docs/config/README.md' },
  { slug: 'oh-my-posh__readme', owner: 'JanDeDobbeleer', repo: 'oh-my-posh' },
  // popular plugins / tools
  { slug: 'zsh-autosuggestions__readme', owner: 'zsh-users', repo: 'zsh-autosuggestions' },
  { slug: 'zsh-syntax-highlighting__readme', owner: 'zsh-users', repo: 'zsh-syntax-highlighting' },
  { slug: 'fast-syntax-highlighting__readme', owner: 'zdharma-continuum', repo: 'fast-syntax-highlighting' },
  { slug: 'zsh-completions__readme', owner: 'zsh-users', repo: 'zsh-completions' },
  { slug: 'fzf__readme', owner: 'junegunn', repo: 'fzf' },
  { slug: 'zoxide__readme', owner: 'ajeetdsouza', repo: 'zoxide' },
];

// ---------- pure helpers ----------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

// zsh versions may be two-part (5.9) or three-part (5.9.0) — accept both.
function normalizeVersion(v) {
  const m = String(v).match(/(\d+\.\d+(?:\.\d+)?)/);
  return m ? m[1] : null;
}

function rawUrl(owner, repo, branch, filePath) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

// Minimal HTML→text for static doc pages (the sourceforge User Guide). Drops
// script/style, turns block-closing tags into newlines, strips remaining tags,
// decodes the common entities, and collapses runaway blank lines.
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

// ---------- writing ----------

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

// ---------- manual generation (needs the pinned `zsh` + its man pages) ----------

function zshMatchesPin(pin) {
  try {
    const out = execFileSync('zsh', ['--version'], { encoding: 'utf8' });
    return normalizeVersion(out) === normalizeVersion(pin.zsh);
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
  if (!zshMatchesPin(pin)) {
    console.log(`⏭  zsh absent or != pinned ${pin.zsh}; skipping manual generation`);
    return;
  }
  console.log('🔧 Generating manual from pinned zsh man pages...');
  for (const page of MANUAL_PAGES) {
    try {
      const body = renderManPage(page);
      if (!body.trim()) {
        console.error(`  ⚠ man ${page} produced empty output; skipping`);
        continue;
      }
      writeRef(path.join(MANUAL_DIR, `${page}.md`), body, `man ${page} @ zsh ${pin.zsh}`);
    } catch (e) {
      console.error(`  ⚠ man ${page} failed: ${e.message}`);
    }
  }
}

// ---------- ecosystem fetch (no `zsh` needed) ----------

// Buffer chunks and decode once at the end — `data += chunk` corrupts multi-byte
// UTF-8 characters that straddle a chunk boundary. Follows redirects.
function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'agent-skills', ...headers } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).toString();
        return resolve(fetchUrl(next, headers));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () =>
        res.statusCode >= 200 && res.statusCode < 300
          ? resolve(Buffer.concat(chunks).toString('utf8'))
          : reject(new Error(`HTTP ${res.statusCode} for ${url}`)));
    }).on('error', reject);
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
  const candidates = [...new Set([resolved, 'main', 'master'].filter(Boolean))];
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

async function fetchEcosystem() {
  fs.mkdirSync(ECOSYSTEM_DIR, { recursive: true });
  const results = [];

  console.log('📥 Fetching direct ecosystem sources...');
  for (const { slug, url, html } of DIRECT_SOURCES) {
    try {
      const raw = await fetchUrl(url);
      const body = html ? htmlToText(raw) : raw;
      writeRef(path.join(ECOSYSTEM_DIR, `${slug}.md`), body, url);
      results.push(true);
    } catch (e) {
      console.error(`  ⚠ ${slug}: ${e.message}`);
      results.push(false);
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log('📥 Fetching GitHub repo docs (resolving default branches)...');
  for (const src of REPO_SOURCES) {
    try {
      const { body, url } = await fetchRepoDoc(src);
      writeRef(path.join(ECOSYSTEM_DIR, `${src.slug}.md`), body, url);
      results.push(true);
    } catch (e) {
      console.error(`  ⚠ ${src.slug}: ${e.message}`);
      results.push(false);
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  return results;
}

// ---------- main ----------

async function main() {
  if (!fs.existsSync(PINNED_VERSION_FILE)) throw new Error(`Missing ${PINNED_VERSION_FILE}`);
  const pin = parsePinnedVersion(fs.readFileSync(PINNED_VERSION_FILE, 'utf8'));
  if (!pin.zsh) throw new Error('PINNED_VERSION must define zsh=');
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  console.log(`🚀 working-with-zsh updater (zsh=${pin.zsh})`);

  generateManual(pin); // graceful skip handled inside
  const ecoResults = await fetchEcosystem();

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  const failed = ecoResults.filter((r) => !r).length;
  const ratio = ecoResults.length ? failed / ecoResults.length : 1;
  if (ecoResults.length === 0 || ratio > FAILURE_THRESHOLD) {
    console.error(`❌ ecosystem-fetch failure ratio ${(ratio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
  console.log('✅ Done.');
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}

module.exports = { parsePinnedVersion, normalizeVersion, rawUrl };
