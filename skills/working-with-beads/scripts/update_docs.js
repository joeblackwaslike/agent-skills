#!/usr/bin/env node
/**
 * update_docs.js — working-with-beads
 *
 * Generates the CLI reference from the locally pinned `bd` binary and fetches
 * the beads repo docs/ at the pinned tag. Every file is freshness-stamped via
 * the shared doc-frontmatter helper. CLI generation gracefully skips when `bd`
 * is absent or its version != the pin (e.g. in CI).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');
const CLI_DIR = path.join(REFERENCES_DIR, 'cli');
const DOCS_DIR = path.join(REFERENCES_DIR, 'docs');
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');
const REPO = 'gastownhall/beads';
const RUN_NOW = new Date().toISOString();
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

// ---------- pure helpers (unit-tested in update_docs.test.js) ----------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

function normalizeVersion(v) {
  const m = String(v).match(/(\d+\.\d+\.\d+)/);
  return m ? m[1] : null;
}

function parseCommandTree(helpText) {
  const cmds = new Set();
  let inCommands = false;
  for (const line of helpText.split('\n')) {
    if (/^[A-Z][A-Za-z &]+:\s*$/.test(line)) { inCommands = true; continue; }
    if (/^(Flags|Global Flags|Additional help topics):/.test(line)) { inCommands = false; continue; }
    if (inCommands) {
      const m = line.match(/^\s{2,}([a-z][a-z0-9-]*)\s+\S/);
      if (m) cmds.add(m[1]);
    }
  }
  return [...cmds].sort();
}

function parseSubcommands(helpText) {
  const subs = new Set();
  let inAvail = false;
  for (const line of helpText.split('\n')) {
    if (/^Available Commands:\s*$/.test(line)) { inAvail = true; continue; }
    if (inAvail && /^\S/.test(line)) { inAvail = false; continue; }
    if (inAvail) {
      const m = line.match(/^\s{2,}([a-z][a-z0-9-]*)\s{2,}\S/);
      if (m && !['help', 'completion'].includes(m[1])) subs.add(m[1]);
    }
  }
  return [...subs].sort();
}

function filenameForCommand(cmdPath) {
  return cmdPath.join('__') + '.md';
}

// ---------- CLI generation (needs the pinned `bd`) ----------

function runBd(args) {
  return execFileSync('bd', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

function bdMatchesPin(pin) {
  try {
    return normalizeVersion(runBd(['version'])) === normalizeVersion(pin.bd);
  } catch {
    return false;
  }
}

function generateCliRef(pin) {
  if (!bdMatchesPin(pin)) {
    console.log(`⏭  bd absent or != pinned ${pin.bd}; skipping CLI generation`);
    return false;
  }
  console.log('🔧 Generating CLI reference from pinned bd...');
  const helpText = runBd(['help']);
  writeRef(path.join(CLI_DIR, '_index.md'), helpText, `bd help @ ${pin.bd}`);

  try {
    writeRef(path.join(REFERENCES_DIR, 'prime.md'), runBd(['prime']), `bd prime @ ${pin.bd}`);
  } catch (e) {
    console.error(`  ⚠ bd prime failed: ${e.message}`);
  }

  for (const cmd of parseCommandTree(helpText)) {
    let cmdHelp;
    try {
      cmdHelp = runBd([cmd, '--help']);
    } catch (e) {
      console.error(`  ⚠ bd ${cmd} --help failed: ${e.message}`);
      continue;
    }
    writeRef(path.join(CLI_DIR, filenameForCommand([cmd])), cmdHelp, `bd ${cmd} --help @ ${pin.bd}`);
    for (const sub of parseSubcommands(cmdHelp)) {
      try {
        const subHelp = runBd([cmd, sub, '--help']);
        writeRef(path.join(CLI_DIR, filenameForCommand([cmd, sub])), subHelp, `bd ${cmd} ${sub} --help @ ${pin.bd}`);
      } catch (e) {
        console.error(`  ⚠ bd ${cmd} ${sub} --help failed: ${e.message}`);
      }
    }
  }
  return true;
}

module.exports = {
  parsePinnedVersion, normalizeVersion, parseCommandTree, parseSubcommands, filenameForCommand,
};
