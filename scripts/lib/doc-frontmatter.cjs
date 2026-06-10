"use strict";

/**
 * Shared freshness helpers for skill doc-update scripts.
 *
 * Two conventions live here:
 *
 *   1. Per fetched doc (in a skill's references/): YAML frontmatter carrying
 *      `source`, `fetched_at` (ISO timestamp), and `sha256` (hash of the fetched
 *      body). The sha enables change-detection so `fetched_at` only moves when the
 *      upstream content actually changes — no weekly git churn.
 *
 *   2. Per skill (SKILL.md): `metadata.last_updated` (YYYY-MM-DD) — a coarse
 *      "how fresh is this skill" signal an agent sees the moment it loads the skill.
 *
 * Importable from both CommonJS (`require`) and ESM (`import { ... }`) update
 * scripts because it is authored as CommonJS with a flat `module.exports`.
 */

const { createHash } = require("node:crypto");
const { readFileSync, writeFileSync, existsSync } = require("node:fs");

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n/;

function sha256(body) {
  return createHash("sha256").update(body, "utf8").digest("hex");
}

function parseFrontmatter(content) {
  const m = content.match(FRONTMATTER_RE);
  if (!m) return null;
  return { block: m[1], raw: m[0], rest: content.slice(m[0].length) };
}

function fieldValue(block, key) {
  const m = block.match(new RegExp(`^${key}:\\s*"?([^"\\n]+?)"?\\s*$`, "m"));
  return m ? m[1] : null;
}

/**
 * Wrap a freshly-fetched doc body with (or merge into) freshness frontmatter.
 *
 * Change-detection: if a file already exists at `filePath` and its stored
 * sha256 equals the hash of the new `body`, the previous `fetched_at` is
 * preserved and `changed` is false. Otherwise `fetched_at` is set to `now`.
 *
 * If `body` already starts with its own frontmatter (e.g. raw docs from a repo),
 * the freshness keys are merged into that block instead of stacking a second one.
 *
 * @returns {{ content: string, changed: boolean, sha256: string, fetched_at: string }}
 */
function withFrontmatter({ filePath, body, source, title, now }) {
  if (typeof now !== "string" || !now) {
    throw new Error("withFrontmatter requires `now` as an ISO string");
  }
  const hash = sha256(body);

  let fetchedAt = now;
  if (filePath && existsSync(filePath)) {
    const prev = parseFrontmatter(readFileSync(filePath, "utf8"));
    if (prev) {
      const prevSha = fieldValue(prev.block, "sha256");
      const prevFetched = fieldValue(prev.block, "fetched_at");
      if (prevSha === hash && prevFetched) fetchedAt = prevFetched;
    }
  }
  const changed = fetchedAt === now;
  const keys = { source, fetched_at: fetchedAt, sha256: hash };

  const bodyFm = parseFrontmatter(body);
  let content;
  if (bodyFm) {
    // Merge our keys into the doc's existing frontmatter block.
    let block = bodyFm.block;
    for (const [k, v] of Object.entries(keys)) {
      const line = `${k}: "${v}"`;
      const re = new RegExp(`^${k}:.*$`, "m");
      block = re.test(block) ? block.replace(re, line) : `${block}\n${line}`;
    }
    content = `---\n${block}\n---\n${bodyFm.rest}`;
  } else {
    const lines = ["---"];
    if (title) lines.push(`title: ${JSON.stringify(title)}`);
    lines.push(`source: ${JSON.stringify(source)}`);
    lines.push(`fetched_at: "${fetchedAt}"`);
    lines.push(`sha256: "${hash}"`);
    lines.push("---", "", "");
    content = lines.join("\n") + body.replace(/^\n+/, "");
  }
  return { content, changed, sha256: hash, fetched_at: fetchedAt };
}

/**
 * Set `metadata.last_updated` in a SKILL.md, adding the metadata block or the
 * field if absent. Returns true if the file content changed.
 */
function setSkillLastUpdated(skillMdPath, date) {
  const original = readFileSync(skillMdPath, "utf8");
  const fm = parseFrontmatter(original);
  if (!fm) throw new Error(`No frontmatter in ${skillMdPath}`);

  const value = `last_updated: "${date}"`;
  const lines = fm.block.split("\n");
  const metaIdx = lines.findIndex((l) => /^metadata:\s*$/.test(l));

  let newBlock;
  if (metaIdx === -1) {
    newBlock = `${fm.block}\nmetadata:\n  ${value}`;
  } else {
    // Determine indent from the first child line, default two spaces.
    const child = lines[metaIdx + 1];
    const indent = child && /^(\s+)\S/.test(child) ? child.match(/^(\s+)/)[1] : "  ";
    const luIdx = lines.findIndex((l, i) => i > metaIdx && new RegExp(`^${indent}last_updated:`).test(l));
    if (luIdx !== -1) {
      lines[luIdx] = `${indent}${value}`;
    } else {
      lines.splice(metaIdx + 1, 0, `${indent}${value}`);
    }
    newBlock = lines.join("\n");
  }

  const updated = `---\n${newBlock}\n---\n${fm.rest}`;
  if (updated !== original) writeFileSync(skillMdPath, updated, "utf8");
  return updated !== original;
}

module.exports = { sha256, withFrontmatter, setSkillLastUpdated, parseFrontmatter };
