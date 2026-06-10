"use strict";

/**
 * One-shot + idempotent maintenance: stamp `metadata.last_updated` on every
 * SKILL.md using each skill's real last-content-change date from git history,
 * and convert any legacy `metadata.version: <date>` field to `last_updated`.
 *
 * Re-runnable any time. Run: node scripts/backfill-last-updated.cjs
 */

const { readFileSync, writeFileSync, existsSync, readdirSync } = require("node:fs");
const { join, dirname } = require("node:path");
const { execFileSync } = require("node:child_process");
const { setSkillLastUpdated, parseFrontmatter } = require("./lib/doc-frontmatter.cjs");

const ROOT = join(__dirname, "..");
const SKILLS_DIR = join(ROOT, "skills");

function gitLastDate(relPath) {
  const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", relPath], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
  return out || null;
}

function stripVersion(skillMdPath) {
  const content = readFileSync(skillMdPath, "utf8");
  const fm = parseFrontmatter(content);
  if (!fm) return null;
  // Remove an indented `version: <date>` line living under metadata.
  const kept = fm.block.split("\n").filter((l) => !/^\s+version:\s*[\d.]+\s*$/.test(l));
  const block = kept.join("\n");
  if (block === fm.block) return null;
  const updated = `---\n${block}\n---\n${fm.rest}`;
  writeFileSync(skillMdPath, updated, "utf8");
  return true;
}

const skills = readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const today = new Date().toISOString().slice(0, 10);
const rows = [];

for (const name of skills) {
  const dir = join(SKILLS_DIR, name);
  let skillMd = join(dir, "SKILL.md");
  if (!existsSync(skillMd)) skillMd = join(dir, "skill.md");
  if (!existsSync(skillMd)) {
    rows.push([name, "—", "no SKILL.md"]);
    continue;
  }
  const stripped = stripVersion(skillMd);
  const date = gitLastDate(`skills/${name}`) || today;
  const changed = setSkillLastUpdated(skillMd, date);
  rows.push([name, date, [stripped ? "version→last_updated" : null, changed ? "stamped" : "unchanged"].filter(Boolean).join(", ")]);
}

const w = Math.max(...rows.map((r) => r[0].length));
for (const [name, date, note] of rows) {
  console.log(`${name.padEnd(w)}  ${date}  ${note}`);
}
console.log(`\nBackfilled ${rows.length} skills.`);
