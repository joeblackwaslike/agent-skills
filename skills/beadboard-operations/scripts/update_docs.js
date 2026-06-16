#!/usr/bin/env node
/**
 * update_docs.js — beadboard-operations
 *
 * Mirrors the operational docs from the beadboard-ops repo
 * (github.com/joeblackwaslike/beadboard-ops, `website/docs/`) into references/,
 * freshness-stamped via the shared doc-frontmatter helper.
 *
 * beadboard-ops is a PRIVATE repo, so we read from a LOCAL checkout rather than
 * the GitHub API (an unauthenticated CI fetch would 404). The checkout path is
 * `BEADBOARD_OPS_DIR` or the default below. When the checkout is absent (CI,
 * other machines) the script SKIPS gracefully and exits 0 — the same posture as
 * working-with-dolt skipping CLI generation when the pinned binary is missing.
 * Re-sync runs whenever Joe runs `make update-beadboard-operations` locally.
 *
 * These are doc SNAPSHOTS (no version pin) — change is tracked by fetched_at/
 * sha256, so unchanged content does not churn timestamps. Discovery is dynamic
 * (every `website/docs/**.md` is mirrored), so new docs are picked up
 * automatically. `source` frontmatter points to the canonical GitHub blob URL
 * for provenance even though bytes are read locally.
 *
 * Upstream docs carry Docusaurus frontmatter (`title`, `sidebar_position`); we
 * strip it and pass only `title` through, so our source/fetched_at/sha256 block
 * is the sole frontmatter on each mirrored file.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { withFrontmatter, setSkillLastUpdated, parseFrontmatter } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');

const REPO = 'joeblackwaslike/beadboard-ops';
const BRANCH = 'main';
const OPS_DIR = process.env.BEADBOARD_OPS_DIR
  || path.join(os.homedir(), 'github', 'joeblackwaslike', 'beadboard-ops');
const DOCS_DIR = path.join(OPS_DIR, 'website', 'docs');
const BLOB_BASE = `https://github.com/${REPO}/blob/${BRANCH}/website/docs/`;

const RUN_NOW = new Date().toISOString();
let docsChanged = false;

// ---------- pure helpers ----------

// Recursively list relative paths of every .md file under `dir`.
function listMarkdown(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdown(abs, base));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(path.relative(base, abs));
  }
  return out.sort((a, b) => a.localeCompare(b));
}

// Strip a leading Docusaurus frontmatter block, returning { title, body }.
function stripDocusaurusFrontmatter(raw) {
  const fm = parseFrontmatter(raw);
  if (!fm) return { title: null, body: raw };
  const tm = fm.block.match(/^title:\s*"?([^"\n]+?)"?\s*$/m);
  return { title: tm ? tm[1] : null, body: fm.rest };
}

// ---------- write ----------

function writeRef(filepath, body, source, title) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, title, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

// ---------- main ----------

function main() {
  console.log(`🚀 beadboard-operations updater (${REPO}@${BRANCH})`);
  if (!fs.existsSync(DOCS_DIR)) {
    console.log(`⏭  ${DOCS_DIR} not found — skipping (set BEADBOARD_OPS_DIR to override). Nothing to do.`);
    return;
  }

  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  const slugs = listMarkdown(DOCS_DIR);
  console.log(`📥 ${slugs.length} doc files found under ${DOCS_DIR}`);

  for (const slug of slugs) {
    const raw = fs.readFileSync(path.join(DOCS_DIR, slug), 'utf8');
    const { title, body } = stripDocusaurusFrontmatter(raw);
    // POSIX-style slug for the source URL regardless of host separator.
    const posixSlug = slug.split(path.sep).join('/');
    writeRef(path.join(REFERENCES_DIR, slug), body, BLOB_BASE + posixSlug, title);
  }

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  } else {
    console.log('↔  No content changes.');
  }
  console.log(`✅ Done (${slugs.length} docs mirrored).`);
}

if (require.main === module) {
  try {
    main();
  } catch (e) {
    console.error('❌', e.message);
    process.exit(1);
  }
}

module.exports = { listMarkdown, stripDocusaurusFrontmatter };
