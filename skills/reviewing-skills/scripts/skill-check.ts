#!/usr/bin/env bun
/**
 * Mechanical gate for a skill directory. No LLM tokens.
 *
 * Usage: bun skill-check.ts <skill-dir> [--json] [--repo <path>] [--no-blocks]
 * Exit 0 when no check is red (fail), 1 otherwise, 2 on bad usage.
 *
 * Skill kind, which decides whether the advisory heuristics run:
 *   1. `metadata.kind` in the frontmatter wins (discipline, workflow, doc-wrapper, reference-catalog, router, ...).
 *   2. Otherwise a name starting `working-with-` or `developing-` is a doc-wrapper.
 *   3. Otherwise 3+ numbered-step lines or a Procedure/Steps/Workflow heading is a workflow.
 *   4. Otherwise MUST/NEVER/ALWAYS/Iron Law in the body is a discipline.
 *   5. Otherwise "other".
 * The diagram heuristic is off only for doc-wrapper and reference-catalog kinds.
 * The defense (rationalization) heuristic fires only for discipline and workflow kinds.
 *
 * A code checker that is missing yields status "skipped" and an entry in `gaps`;
 * it never fails the gate and never counts as a pass.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
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
const TIMEOUT_MS = 120_000;
const TIMED_OUT = `timed out after ${TIMEOUT_MS / 1000}s`;
const timedOut = (r: { error?: Error }) => (r.error as NodeJS.ErrnoException | undefined)?.code === "ETIMEDOUT";

export const deps = { spawn: spawnSync };

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

type Fence = { info: string; body: string[]; line: number };

function scanFences(text: string): { prose: string; fences: Fence[] } {
  const lines = text.split("\n");
  const prose: string[] = [];
  const fences: Fence[] = [];
  for (let i = 0; i < lines.length; i++) {
    const open = lines[i].match(/^\s*(?:(`{3,})([^`]*)|(~{3,})(.*))$/);
    if (!open) {
      prose.push(lines[i]);
      continue;
    }
    const marker = open[1] ?? open[3];
    const [ch, len] = [marker[0], marker.length];
    const body: string[] = [];
    const start = i + 1;
    prose.push("");
    for (i = start; i < lines.length; i++) {
      const close = lines[i].match(/^\s*(`+|~+)\s*$/);
      if (close && close[1][0] === ch && close[1].length >= len) break;
      body.push(lines[i]);
    }
    fences.push({ info: (open[2] ?? open[4]).trim().split(/\s+/)[0] ?? "", body, line: start });
  }
  return { prose: prose.join("\n"), fences };
}

const stripFences = (text: string) => scanFences(text).prose;

function detectKind(fm: string, name: string, body: string): string {
  const explicit = fm.match(/^\s+kind:\s*["']?([\w-]+)/m)?.[1];
  if (explicit) return explicit;
  if (/^(working-with|developing)-/.test(name)) return "doc-wrapper";
  const prose = stripFences(body);
  if ((prose.match(/^\s*\d+\.\s/gm) ?? []).length >= 3 || /^#+\s.*\b(Procedure|Steps|Workflow)\b/im.test(prose)) return "workflow";
  if (/\b(MUST|NEVER|ALWAYS|Iron Law)\b/.test(prose)) return "discipline";
  return "other";
}

function linkTargets(file: string): string[] {
  const prose = stripFences(readFileSync(file, "utf8")).replace(/`[^`\n]*`/g, "");
  return [...prose.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)].flatMap((m) => {
    const raw = m[1].split("#")[0];
    if (!raw || /^[a-z][a-z0-9+.-]*:/i.test(raw)) return [];
    try {
      return [decodeURIComponent(raw)];
    } catch {
      return [raw];
    }
  });
}

const isFetched = (file: string) => {
  const fm = splitFrontmatter(readFileSync(file, "utf8")).fm;
  return fm !== undefined && /^source:/m.test(fm) && /^fetched_at:/m.test(fm);
};

function checkLinks(dir: string, files: string[], checks: Check[]) {
  let total = 0;
  let broken = 0;
  let absolute = 0;
  for (const f of files) {
    for (const target of linkTargets(f)) {
      if (target.startsWith("/")) {
        absolute++;
        continue;
      }
      total++;
      if (!existsSync(resolve(dirname(f), target))) {
        broken++;
        add(checks, `link:${relative(dir, f)}:${target}`, "fail", `${relative(dir, f)} links to ${target}, which does not exist`);
      }
    }
  }
  if (!broken) add(checks, "links", "pass", `${total} relative links resolve${absolute ? `; ${absolute} site-absolute links not checked` : ""}`);
}

function checkOrphans(dir: string, files: string[], checks: Check[], exempt: string[]) {
  const refs = files.filter((f) => relative(dir, f).startsWith("references") && !exempt.includes(f));
  const linked = new Set(files.flatMap((f) => linkTargets(f).filter((t) => !t.startsWith("/")).map((t) => resolve(dirname(f), t))));
  const mentioned = (r: string) => {
    const path = new RegExp(`(^|[^\\w./-])${relative(dir, r).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^\\w-])`);
    return files.some((f) => f !== r && path.test(stripFences(readFileSync(f, "utf8"))));
  };
  const orphans = refs.filter((r) => !linked.has(r) && !mentioned(r));
  if (!orphans.length) return add(checks, "orphan", "pass", "every reference is routed to");
  for (const o of orphans) add(checks, `orphan:${relative(dir, o)}`, "warn", `${relative(dir, o)} is not linked from SKILL.md or any other doc`);
}

function checkDescription(dir: string, name: string, repo: string | undefined, checks: Check[], gaps: string[]) {
  const candidates = [repo && join(repo, LINT_SCRIPT), join(import.meta.dir, "../../..", LINT_SCRIPT)].filter((p): p is string => !!p && existsSync(p));
  if (!candidates.length) {
    gaps.push("description thresholds (lint-descriptions.py not found)");
    return add(checks, "description", "skipped", "SKIPPED (not checked): lint-descriptions.py not found");
  }
  const tmp = mkdtempSync(join(tmpdir(), "skill-lint-"));
  try {
    symlinkSync(dir, join(tmp, name));
    const r = deps.spawn("python3", ["-I", candidates[0], "--skills-dir", tmp], { encoding: "utf8", timeout: TIMEOUT_MS, env: process.env });
    const lines = (r.stdout ?? "").split("\n");
    const fails = lines.filter((l) => l.startsWith("FAIL "));
    const warns = lines.filter((l) => l.startsWith("WARN "));
    if (timedOut(r)) {
      gaps.push(`description thresholds (${TIMED_OUT})`);
      return add(checks, "description", "skipped", `SKIPPED (not checked): python3 ${TIMED_OUT}`);
    }
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
  const present = ["SKILLS.md", "README.md"].filter((f) => existsSync(join(repo, f)));
  if (!present.length) return add(checks, "registry", "skipped", `no SKILLS.md or README.md in ${repo}; registry rows not checked`);
  for (const file of present) {
    const row = readFileSync(join(repo, file), "utf8").split("\n").some((l) => l.startsWith("|") && l.split("|")[1]?.replace(/`/g, "").trim() === name);
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
  const prose = stripFences(body);
  const branching = prose.split("\n").filter((l) => /\b(if|otherwise|repeat|until)\b/i.test(l)).length;
  if (kind !== "doc-wrapper" && kind !== "reference-catalog" && branching >= 3 && !/^\s*(`{3,}|~{3,})(mermaid|dot)\b/m.test(body)) {
    add(checks, "heuristic:diagram", "warn", `${branching} branching lines and no mermaid or dot block (advisory)`);
  }
  if ((kind === "discipline" || kind === "workflow") && !/^#+\s.*(Red Flags|Rationalization|Excuse)/im.test(prose)) {
    add(checks, "heuristic:defense", "warn", "no Red Flags, Rationalization or Excuse heading (advisory)");
  }
}

type Block = { file: string; line: number; lang: Lang; code: string };

function extractBlocks(dir: string, files: string[]): { blocks: Block[]; fragments: number } {
  const blocks: Block[] = [];
  let fragments = 0;
  for (const f of files) {
    for (const fence of scanFences(readFileSync(f, "utf8")).fences) {
      const lang = LANG_TAGS[fence.info.toLowerCase()];
      if (!lang) continue;
      if (/^\s*(#|\/\/)\s*fragment\b/.test(fence.body[0] ?? "")) {
        fragments++;
        continue;
      }
      blocks.push({ file: relative(dir, f), line: fence.line, lang, code: `${fence.body.join("\n")}\n` });
    }
  }
  return { blocks, fragments };
}

const OFFLINE_HINT = "bunx needs the network on first use; are you offline?";

function runTool(cmd: string[], cwd: string) {
  const r = deps.spawn(cmd[0], cmd.slice(1), { cwd, encoding: "utf8", timeout: TIMEOUT_MS, env: process.env });
  return { ...r, text: `${r.stdout ?? ""}${r.stderr ?? ""}` };
}

function pyright(codes: string[]): BlockResult[] {
  const dir = mkdtempSync(join(tmpdir(), "skill-pyright-"));
  try {
    writeFileSync(join(dir, "pyrightconfig.json"), JSON.stringify({ pythonVersion: "3.12", typeCheckingMode: "basic", include: ["*.py"] }));
    codes.forEach((c, n) => writeFileSync(join(dir, `b${n}.py`), c));
    const cmd = Bun.which("pyright", { PATH: process.env.PATH }) ? ["pyright"] : ["bunx", "pyright"];
    const r = runTool([...cmd, "--outputjson"], dir);
    let parsed: { generalDiagnostics: { file: string; severity: string; message: string; range: { start: { line: number } } }[] };
    try {
      parsed = JSON.parse(r.stdout ?? "");
      if (!parsed?.generalDiagnostics) throw new Error("no diagnostics");
    } catch {
      if (timedOut(r)) return codes.map(() => ({ status: "missing", detail: `pyright ${TIMED_OUT}` }));
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
    if (timedOut(install)) return missing(TIMED_OUT);
    if (install.status !== 0) return missing(OFFLINE_HINT);
    const r = runTool([join(dir, "node_modules/.bin/tsc"), "--noEmit", "-p", "."], dir);
    const errors = r.text.split("\n").flatMap((l) => {
      const m = l.match(/^(b\d+)\.ts\((\d+),\d+\): error (.*)$/);
      return m ? [{ n: Number(m[1].slice(1)), msg: `line ${m[2]}: ${m[3]}` }] : [];
    });
    if (timedOut(r)) return missing(TIMED_OUT);
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
    const r = deps.spawn("bash", ["-n"], { input: c, encoding: "utf8", timeout: TIMEOUT_MS, env: process.env });
    if (timedOut(r)) return { status: "missing", detail: `bash ${TIMED_OUT}` };
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
    const returned = run(lang, mine.map((b) => b.code));
    const results: BlockResult[] = returned.length === mine.length
      ? returned
      : mine.map(() => ({ status: "missing", detail: `checker returned ${returned.length} results for ${mine.length} blocks` }));
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
  const name = basename(resolve(skillDir));
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

  checkDescription(dir, name, repo, checks, gaps);
  const files = [skillMd, ...mdFiles(join(dir, "references"))];
  const fetched = files.filter((f) => f !== skillMd && isFetched(f));
  if (fetched.length) add(checks, "fetched", "pass", `${fetched.length} fetched reference files exempt from link/orphan checks`);
  checkLinks(dir, files.filter((f) => !fetched.includes(f)), checks);
  checkOrphans(dir, files, checks, fetched);
  checkRegistry(name, repo, checks);
  checkOverlap(name, fm && descriptionOf(fm), repo, checks);
  checkHeuristics(detectKind(fm ?? "", name, body), body, checks);
  if (opts.blocks !== false) checkBlocks(dir, files, opts.runBlocks ?? defaultBlockChecker, checks, gaps);
  return { checks, gaps };
}

function usage(msg: string): never {
  console.error(`${msg}; usage: bun skill-check.ts <skill-dir> [--json] [--repo <path>] [--no-blocks]`);
  process.exit(2);
}

function main() {
  let parsed: ReturnType<typeof parseArgs<{ allowPositionals: true; options: { json: { type: "boolean" }; repo: { type: "string" }; "no-blocks": { type: "boolean" } } }>>;
  try {
    parsed = parseArgs({ allowPositionals: true, options: { json: { type: "boolean" }, repo: { type: "string" }, "no-blocks": { type: "boolean" } } });
  } catch (e) {
    usage((e as Error).message.split("\n")[0]);
  }
  const { values, positionals } = parsed;
  if (positionals.length !== 1) usage("expected exactly one skill directory");
  if (!existsSync(positionals[0]) || !statSync(positionals[0]).isDirectory()) usage(`not a directory: ${positionals[0]}`);
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
