#!/usr/bin/env bun
/**
 * Mechanical gate for a skill directory. No LLM tokens.
 *
 * Usage: bun skill-check.ts <skill-dir> [--json] [--repo <path>] [--no-blocks]
 * Exit 0 when no check is red (fail), 1 otherwise, 2 on bad usage.
 *
 * Skill kind, which decides whether the advisory heuristics run:
 *   1. `metadata.kind` in the frontmatter wins (discipline, workflow, doc-wrapper, catalog, router, ...).
 *   2. Otherwise a name starting `working-with-` or `developing-` is a doc-wrapper.
 *   3. Otherwise 3+ numbered-step lines or a Procedure/Steps/Workflow heading is a workflow.
 *   4. Otherwise MUST/NEVER/ALWAYS/Iron Law in the body is a discipline.
 *   5. Otherwise "other".
 * The diagram and defense heuristics run only for discipline and workflow skills.
 *
 * A code checker that is missing yields status "skipped" and an entry in `gaps`;
 * it never fails the gate and never counts as a pass.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { parseArgs } from "node:util";

export type Check = { id: string; status: "pass" | "fail" | "warn" | "skipped"; detail: string };
export type Report = { checks: Check[]; gaps: string[] };
export type Lang = "python" | "typescript" | "bash" | "json";
export type BlockResult = { status: "ok" | "error" | "missing"; detail: string };
export type BlockChecker = (lang: Lang, codes: string[]) => BlockResult[];
export type Options = { repo?: string; blocks?: boolean; runBlocks?: BlockChecker };

const ALLOWED_KEYS = new Set([
  "name", "description", "metadata", "license", "compatibility", "allowed-tools", "when_to_use", "argument-hint",
  "arguments", "disable-model-invocation", "user-invocable", "model", "effort", "context", "agent", "hooks", "paths", "shell",
]);
const SIZE_LIMIT = 20_000;
const OVERLAP_THRESHOLD = 0.4;
const STOPWORDS = new Set("a an and are as at be by for from has have how in is it its not of on or the this that to use used using when with you your into than then them they their will can per via only any all out".split(" "));
const LANG_TAGS: Record<string, Lang> = { python: "python", py: "python", typescript: "typescript", ts: "typescript", bash: "bash", sh: "bash", shell: "bash", json: "json" };
const LINT_SCRIPT = "scripts/lint-descriptions.py";

const add = (checks: Check[], id: string, status: Check["status"], detail: string) => checks.push({ id, status, detail });

function mdFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? mdFiles(p) : e.name.endsWith(".md") ? [p] : [];
  });
}

function findRepo(dir: string): string | undefined {
  for (let d = dir; ; d = dirname(d)) {
    if (existsSync(join(d, ".claude-plugin")) || existsSync(join(d, ".git"))) return d;
    if (dirname(d) === d) return undefined;
  }
}

function splitFrontmatter(text: string): { fm: string | undefined; body: string } {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return m ? { fm: m[1], body: text.slice(m[0].length) } : { fm: undefined, body: text };
}

function descriptionOf(fm: string): string | undefined {
  const lines = fm.split("\n");
  const i = lines.findIndex((l) => l.startsWith("description:"));
  if (i < 0) return undefined;
  const parts = [lines[i].slice("description:".length).trim()];
  for (let j = i + 1; j < lines.length && /^\s+\S/.test(lines[j]); j++) parts.push(lines[j].trim());
  return parts.join(" ").replace(/^(>-?|\|-?)\s*/, "").replace(/^["']|["']$/g, "").trim();
}

const tokens = (s: string) => new Set((s.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((t) => t.length > 2 && !STOPWORDS.has(t)));

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = [...a].filter((t) => b.has(t)).length;
  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
}

const stripFences = (text: string) => text.replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*$/gm, "");

function detectKind(fm: string, name: string, body: string): string {
  const explicit = fm.match(/^\s+kind:\s*["']?([\w-]+)/m)?.[1];
  if (explicit) return explicit;
  if (/^(working-with|developing)-/.test(name)) return "doc-wrapper";
  const prose = stripFences(body);
  if ((prose.match(/^\s*\d+\.\s/gm) ?? []).length >= 3 || /^#+\s.*\b(Procedure|Steps|Workflow)\b/im.test(prose)) return "workflow";
  if (/\b(MUST|NEVER|ALWAYS|Iron Law)\b/.test(prose)) return "discipline";
  return "other";
}

function checkLinks(dir: string, files: string[], checks: Check[]) {
  let total = 0;
  let broken = 0;
  for (const f of files) {
    for (const m of stripFences(readFileSync(f, "utf8")).matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const target = m[1].split("#")[0];
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      total++;
      if (!existsSync(resolve(dirname(f), target))) {
        broken++;
        add(checks, `link:${relative(dir, f)}:${target}`, "fail", `${relative(dir, f)} links to ${target}, which does not exist`);
      }
    }
  }
  if (!broken) add(checks, "links", "pass", `${total} relative links resolve`);
}

function checkOrphans(dir: string, files: string[], checks: Check[]) {
  const refs = files.filter((f) => relative(dir, f).startsWith("references"));
  const orphans = refs.filter((r) => {
    const base = basename(r);
    return !files.some((f) => f !== r && readFileSync(f, "utf8").includes(base));
  });
  if (!orphans.length) return add(checks, "orphan", "pass", "every reference is routed to");
  for (const o of orphans) add(checks, `orphan:${relative(dir, o)}`, "warn", `${relative(dir, o)} is not linked from SKILL.md or any other doc`);
}

function checkDescription(dir: string, repo: string | undefined, checks: Check[], gaps: string[]) {
  const candidates = [repo && join(repo, LINT_SCRIPT), join(import.meta.dir, "../../..", LINT_SCRIPT)].filter((p): p is string => !!p && existsSync(p));
  if (!candidates.length) {
    gaps.push("description thresholds (lint-descriptions.py not found)");
    return add(checks, "description", "skipped", "SKIPPED (not checked): lint-descriptions.py not found");
  }
  const tmp = mkdtempSync(join(tmpdir(), "skill-lint-"));
  try {
    symlinkSync(dir, join(tmp, basename(dir)));
    const r = spawnSync("python3", ["-I", candidates[0], "--skills-dir", tmp], { encoding: "utf8" });
    const lines = (r.stdout ?? "").split("\n");
    const fails = lines.filter((l) => l.startsWith("FAIL "));
    const warns = lines.filter((l) => l.startsWith("WARN "));
    if (r.error || (!fails.length && !warns.length && r.status !== 0)) {
      gaps.push("description thresholds (python3 or pyyaml unavailable)");
      return add(checks, "description", "skipped", `SKIPPED (not checked): ${r.error?.message ?? (r.stderr || "lint failed").trim().split("\n").pop()}`);
    }
    if (fails.length) return add(checks, "description", "fail", fails.map((l) => l.slice(5)).join("; "));
    if (warns.length) return add(checks, "description", "warn", warns.map((l) => l.slice(5)).join("; "));
    add(checks, "description", "pass", "within thresholds");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function checkRegistry(name: string, repo: string | undefined, checks: Check[]) {
  if (!repo) return add(checks, "registry", "skipped", "no repo found; registry rows not checked");
  for (const file of ["SKILLS.md", "README.md"]) {
    const p = join(repo, file);
    if (!existsSync(p)) continue;
    const row = readFileSync(p, "utf8").split("\n").some((l) => l.startsWith("|") && l.includes(`\`${name}\``));
    add(checks, `registry:${file}`, row ? "pass" : "fail", row ? `row found in ${file}` : `no row for \`${name}\` in ${file}`);
  }
}

function checkOverlap(name: string, description: string | undefined, repo: string | undefined, checks: Check[]) {
  if (!repo) return add(checks, "overlap", "skipped", "no repo found; sibling overlap not checked");
  const skillsDir = join(repo, "skills");
  if (!description || !existsSync(skillsDir)) return add(checks, "overlap", "skipped", "no sibling skills to compare");
  const mine = tokens(description);
  const hits = readdirSync(skillsDir)
    .filter((s) => s !== name && existsSync(join(skillsDir, s, "SKILL.md")))
    .flatMap((s) => {
      const fm = splitFrontmatter(readFileSync(join(skillsDir, s, "SKILL.md"), "utf8")).fm;
      const d = fm && descriptionOf(fm);
      const score = d ? jaccard(mine, tokens(d)) : 0;
      return score >= OVERLAP_THRESHOLD ? [`${s} (${score.toFixed(2)})`] : [];
    });
  if (hits.length) add(checks, "overlap", "warn", `description overlaps ${hits.join(", ")} (Jaccard >= ${OVERLAP_THRESHOLD}, advisory)`);
  else add(checks, "overlap", "pass", "no sibling description overlaps");
}

function checkHeuristics(kind: string, body: string, checks: Check[]) {
  if (kind !== "discipline" && kind !== "workflow") return;
  const prose = stripFences(body);
  const branching = prose.split("\n").filter((l) => /\b(if|otherwise|repeat|until)\b/i.test(l)).length;
  if (branching >= 3 && !/^```(mermaid|dot)\b/m.test(body)) {
    add(checks, "heuristic:diagram", "warn", `${branching} branching lines and no mermaid or dot block (advisory)`);
  }
  if (!/^#+\s.*(Red Flags|Rationalization|Excuse)/im.test(prose)) {
    add(checks, "heuristic:defense", "warn", "no Red Flags, Rationalization or Excuse heading (advisory)");
  }
}

type Block = { file: string; line: number; lang: Lang; code: string };

function extractBlocks(dir: string, files: string[]): { blocks: Block[]; fragments: number } {
  const blocks: Block[] = [];
  let fragments = 0;
  for (const f of files) {
    const lines = readFileSync(f, "utf8").split("\n");
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^```(\w+)\s*$/);
      if (!m) continue;
      const lang = LANG_TAGS[m[1].toLowerCase()];
      const start = i + 1;
      const body: string[] = [];
      for (i = start; i < lines.length && !lines[i].startsWith("```"); i++) body.push(lines[i]);
      if (!lang) continue;
      if (/^\s*(#|\/\/)\s*fragment\b/.test(body[0] ?? "")) {
        fragments++;
        continue;
      }
      blocks.push({ file: relative(dir, f), line: start, lang, code: `${body.join("\n")}\n` });
    }
  }
  return { blocks, fragments };
}

const OFFLINE_HINT = "bunx needs the network on first use; are you offline?";

function runTool(cmd: string[], cwd: string) {
  const r = spawnSync(cmd[0], cmd.slice(1), { cwd, encoding: "utf8" });
  return { ...r, text: `${r.stdout ?? ""}${r.stderr ?? ""}` };
}

function pyright(codes: string[]): BlockResult[] {
  const dir = mkdtempSync(join(tmpdir(), "skill-pyright-"));
  try {
    writeFileSync(join(dir, "pyrightconfig.json"), JSON.stringify({ pythonVersion: "3.12", typeCheckingMode: "basic", include: ["*.py"] }));
    codes.forEach((c, n) => writeFileSync(join(dir, `b${n}.py`), c));
    const cmd = Bun.which("pyright") ? ["pyright"] : ["bunx", "pyright"];
    const r = runTool([...cmd, "--outputjson"], dir);
    let parsed: { generalDiagnostics: { file: string; severity: string; message: string; range: { start: { line: number } } }[] };
    try {
      parsed = JSON.parse(r.stdout);
    } catch {
      return codes.map(() => ({ status: "missing", detail: `pyright unavailable (${OFFLINE_HINT})` }));
    }
    return codes.map((_, n) => {
      const errs = parsed.generalDiagnostics.filter((d) => basename(d.file) === `b${n}.py` && d.severity === "error");
      return errs.length ? { status: "error", detail: errs.map((d) => `line ${d.range.start.line + 1}: ${d.message}`).join("; ") } : { status: "ok", detail: "" };
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function tsc(codes: string[]): BlockResult[] {
  const missing = (why: string): BlockResult[] => codes.map(() => ({ status: "missing", detail: `tsc unavailable (${why})` }));
  const dir = mkdtempSync(join(tmpdir(), "skill-tsc-"));
  try {
    writeFileSync(join(dir, "package.json"), "{}");
    writeFileSync(join(dir, "tsconfig.json"), JSON.stringify({
      compilerOptions: { strict: true, target: "ES2022", module: "ES2022", moduleResolution: "bundler", lib: ["ES2022", "DOM"], noEmit: true, skipLibCheck: true, types: ["node"] },
      include: ["*.ts"],
    }));
    codes.forEach((c, n) => writeFileSync(join(dir, `b${n}.ts`), `${c}export {};\n`));
    const install = runTool(["bun", "add", "-d", "typescript", "@types/node"], dir);
    if (install.status !== 0) return missing(OFFLINE_HINT);
    const r = runTool([join(dir, "node_modules/.bin/tsc"), "--noEmit", "-p", "."], dir);
    const errors = r.text.split("\n").flatMap((l) => {
      const m = l.match(/^(b\d+)\.ts\((\d+),\d+\): error (.*)$/);
      return m ? [{ n: Number(m[1].slice(1)), msg: `line ${m[2]}: ${m[3]}` }] : [];
    });
    if (r.status !== 0 && !errors.length) return missing(r.text.trim().split("\n")[0] ?? "tsc failed");
    return codes.map((_, n) => {
      const mine = errors.filter((e) => e.n === n);
      return mine.length ? { status: "error", detail: mine.map((e) => e.msg).join("; ") } : { status: "ok", detail: "" };
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function bashSyntax(codes: string[]): BlockResult[] {
  return codes.map((c) => {
    const r = spawnSync("bash", ["-n"], { input: c, encoding: "utf8" });
    if (r.error) return { status: "missing", detail: "bash not found" };
    return r.status === 0 ? { status: "ok", detail: "" } : { status: "error", detail: r.stderr.trim().split("\n")[0] };
  });
}

function jsonSyntax(codes: string[]): BlockResult[] {
  return codes.map((c) => {
    try {
      JSON.parse(c);
      return { status: "ok", detail: "" };
    } catch (e) {
      return { status: "error", detail: (e as Error).message };
    }
  });
}

export const defaultBlockChecker: BlockChecker = (lang, codes) =>
  ({ python: pyright, typescript: tsc, bash: bashSyntax, json: jsonSyntax })[lang](codes);

function checkBlocks(dir: string, files: string[], run: BlockChecker, checks: Check[], gaps: string[]) {
  const { blocks, fragments } = extractBlocks(dir, files);
  let ok = 0;
  for (const lang of ["python", "typescript", "bash", "json"] as const) {
    const mine = blocks.filter((b) => b.lang === lang);
    if (!mine.length) continue;
    const results = run(lang, mine.map((b) => b.code));
    const skipped = results.filter((r) => r.status === "missing");
    mine.forEach((b, i) => {
      const r = results[i];
      if (r.status === "error") add(checks, `block:${b.file}:${b.line}`, "fail", `${lang} block at ${b.file}:${b.line}: ${r.detail}`);
      if (r.status === "ok") ok++;
    });
    if (skipped.length) {
      gaps.push(`${lang} blocks (${skipped[0].detail})`);
      add(checks, `block:${lang}`, "skipped", `SKIPPED (not checked): ${skipped.length} ${lang} block(s); ${skipped[0].detail}`);
    }
  }
  if (ok) add(checks, "blocks", "pass", `${ok} code block(s) checked clean${fragments ? `, ${fragments} fragment(s) skipped` : ""}`);
}

export function checkSkill(skillDir: string, opts: Options = {}): Report {
  const checks: Check[] = [];
  const gaps: string[] = [];
  const dir = realpathSync(resolve(skillDir));
  const name = basename(dir);
  const skillMd = join(dir, "SKILL.md");
  if (!existsSync(skillMd)) {
    add(checks, "frontmatter", "fail", "SKILL.md not found (the filename must be uppercase)");
    return { checks, gaps };
  }
  const text = readFileSync(skillMd, "utf8");
  const { fm, body } = splitFrontmatter(text);
  const repo = opts.repo ? resolve(opts.repo) : findRepo(dir);

  if (fm === undefined) {
    add(checks, "frontmatter", "fail", "no frontmatter block");
  } else {
    const keys = [...fm.matchAll(/^([A-Za-z0-9_-]+):/gm)].map((m) => m[1]);
    const unknown = keys.filter((k) => !ALLOWED_KEYS.has(k));
    const lacking = ["name", "description"].filter((k) => !keys.includes(k));
    if (unknown.length || lacking.length) {
      add(checks, "frontmatter", "fail", [unknown.length && `unknown key(s): ${unknown.join(", ")}`, lacking.length && `missing key(s): ${lacking.join(", ")}`].filter(Boolean).join("; "));
    } else {
      add(checks, "frontmatter", "pass", "keys are valid");
    }
    const declared = fm.match(/^name:\s*["']?([^"'\n]+?)["']?\s*$/m)?.[1];
    if (declared !== undefined) add(checks, "name", declared === name ? "pass" : "fail", declared === name ? "name matches directory" : `name "${declared}" differs from directory "${name}"`);
  }

  const size = statSync(skillMd).size;
  add(checks, "size", size > SIZE_LIMIT ? "fail" : "pass", `SKILL.md is ${size} bytes (limit ${SIZE_LIMIT})`);

  checkDescription(dir, repo, checks, gaps);
  const files = [skillMd, ...mdFiles(join(dir, "references"))];
  checkLinks(dir, files, checks);
  checkOrphans(dir, files, checks);
  checkRegistry(name, repo, checks);
  checkOverlap(name, fm && descriptionOf(fm), repo, checks);
  checkHeuristics(detectKind(fm ?? "", name, body), body, checks);
  if (opts.blocks !== false) checkBlocks(dir, files, opts.runBlocks ?? defaultBlockChecker, checks, gaps);
  return { checks, gaps };
}

function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { json: { type: "boolean" }, repo: { type: "string" }, "no-blocks": { type: "boolean" } },
  });
  if (positionals.length !== 1) {
    console.error("usage: bun skill-check.ts <skill-dir> [--json] [--repo <path>] [--no-blocks]");
    process.exit(2);
  }
  const report = checkSkill(positionals[0], { repo: values.repo, blocks: !values["no-blocks"] });
  if (values.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    const label = { pass: "PASS", fail: "FAIL", warn: "WARN", skipped: "SKIPPED" } as const;
    for (const c of report.checks) console.log(`${label[c.status]} ${c.id}: ${c.detail}`);
    if (report.gaps.length) console.log(`gate gaps: ${report.gaps.join("; ")}`);
  }
  process.exit(report.checks.some((c) => c.status === "fail") ? 1 : 0);
}

if (import.meta.main) main();
