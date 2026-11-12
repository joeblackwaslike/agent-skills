import { afterAll, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { type BlockChecker, type Report, checkSkill } from "./skill-check";

const roots: string[] = [];
afterAll(() => roots.forEach((r) => rmSync(r, { recursive: true, force: true })));

const GOOD_DESC = "Use when testing the checker. Not for real work (use something else).";

type Opts = { name?: string; fm?: string; body?: string; files?: Record<string, string>; repo?: boolean; registered?: boolean };

function make(o: Opts = {}): { dir: string; root: string } {
  const root = mkdtempSync(join(tmpdir(), "skill-check-"));
  roots.push(root);
  const name = o.name ?? "demo";
  const dir = join(root, "skills", name);
  mkdirSync(dir, { recursive: true });
  const fm = o.fm ?? `name: ${name}\ndescription: ${GOOD_DESC}\nmetadata:\n  last_updated: "2026-11-11"`;
  writeFileSync(join(dir, "SKILL.md"), `---\n${fm}\n---\n\n# Demo\n\n${o.body ?? "Plain body.\n"}`);
  for (const [p, c] of Object.entries(o.files ?? {})) {
    mkdirSync(dirname(join(dir, p)), { recursive: true });
    writeFileSync(join(dir, p), c);
  }
  if (o.repo) {
    mkdirSync(join(root, ".claude-plugin"));
    writeFileSync(join(root, "SKILLS.md"), o.registered === false ? "| `other` | x |\n" : `| \`${name}\` | x |\n`);
    writeFileSync(join(root, "README.md"), o.registered === false ? "| `other` | x |\n" : `| \`${name}\` | x |\n`);
  }
  return { dir, root };
}

const find = (r: Report, id: string) => r.checks.find((c) => c.id === id || c.id.startsWith(`${id}:`));
const all = (r: Report, id: string) => r.checks.filter((c) => c.id === id || c.id.startsWith(`${id}:`));

const okChecker: BlockChecker = (_lang, codes) => codes.map(() => ({ status: "ok", detail: "" }));
const errChecker: BlockChecker = (_lang, codes) => codes.map(() => ({ status: "error", detail: "type error" }));
const missingChecker: BlockChecker = (_lang, codes) => codes.map(() => ({ status: "missing", detail: "pyright not found" }));
const opts = (extra: object = {}) => ({ blocks: false, ...extra });

test("clean skill in a repo has no fail", () => {
  const { dir, root } = make({ repo: true });
  const r = checkSkill(dir, opts({ repo: root }));
  expect(r.checks.filter((c) => c.status === "fail")).toEqual([]);
});

test("bad frontmatter key fails", () => {
  const { dir } = make({ fm: `name: demo\ndescription: ${GOOD_DESC}\nbogus: 1` });
  expect(find(checkSkill(dir, opts()), "frontmatter")?.status).toBe("fail");
});

test("name differing from the directory fails", () => {
  const { dir } = make({ fm: `name: other\ndescription: ${GOOD_DESC}` });
  expect(find(checkSkill(dir, opts()), "name")?.status).toBe("fail");
});

test("broken relative link fails, good link passes", () => {
  const { dir } = make({ body: "[ok](references/a.md) [bad](references/missing.md)\n", files: { "references/a.md": "# a\n" } });
  const links = all(checkSkill(dir, opts()), "link");
  expect(links.some((c) => c.status === "fail" && c.detail.includes("missing.md"))).toBe(true);
  expect(links.some((c) => c.detail.includes("a.md") && c.status === "fail")).toBe(false);
});

test("orphan reference warns", () => {
  const { dir } = make({ body: "[a](references/a.md)\n", files: { "references/a.md": "# a\n", "references/lonely.md": "# l\n" } });
  const orphan = all(checkSkill(dir, opts()), "orphan");
  expect(orphan.map((c) => c.detail).join()).toContain("lonely.md");
  expect(orphan.every((c) => c.status === "warn")).toBe(true);
  expect(orphan.map((c) => c.detail).join()).not.toContain("a.md\n");
});

test("SKILL.md over 20,000 bytes fails", () => {
  const { dir } = make({ body: "x".repeat(20_100) });
  expect(find(checkSkill(dir, opts()), "size")?.status).toBe("fail");
});

test("description over 400 characters warns", () => {
  const long = `Use when testing. ${"word ".repeat(90)}`;
  const { dir } = make({ fm: `name: demo\ndescription: ${long}` });
  expect(find(checkSkill(dir, opts()), "description")?.status).toBe("warn");
});

test("missing SKILLS.md row fails when a repo is found", () => {
  const { dir, root } = make({ repo: true, registered: false });
  const r = checkSkill(dir, opts({ repo: root }));
  expect(find(r, "registry:SKILLS.md")?.status).toBe("fail");
});

test("skill outside a repo skips registry and overlap with a reason", () => {
  const { dir } = make();
  const r = checkSkill(dir, opts());
  for (const id of ["registry", "overlap"]) {
    const c = find(r, id);
    expect(c?.status).toBe("skipped");
    expect(c?.detail).toContain("no repo");
  }
  expect(r.checks.some((c) => c.status === "fail")).toBe(false);
});

test("overlapping sibling description warns", () => {
  const { dir, root } = make({ repo: true });
  mkdirSync(join(root, "skills", "twin"));
  writeFileSync(join(root, "skills", "twin", "SKILL.md"), `---\nname: twin\ndescription: ${GOOD_DESC}\n---\n`);
  expect(find(checkSkill(dir, opts({ repo: root })), "overlap")?.status).toBe("warn");
});

test("no references directory does not crash", () => {
  const { dir } = make();
  expect(() => checkSkill(dir, opts())).not.toThrow();
});

const fence = (lang: string, body: string) => `\`\`\`${lang}\n${body}\n\`\`\`\n`;

test("a python block with a type error fails", () => {
  const { dir } = make({ body: fence("python", "x: int = 'a'") });
  const r = checkSkill(dir, { blocks: true, runBlocks: errChecker });
  expect(r.checks.some((c) => c.id.startsWith("block:") && c.status === "fail")).toBe(true);
});

test("a first-line fragment marker skips the block", () => {
  const { dir } = make({ body: fence("python", "# fragment\nx: int = 'a'") });
  const r = checkSkill(dir, { blocks: true, runBlocks: errChecker });
  expect(r.checks.some((c) => c.status === "fail")).toBe(false);
});

test("a fragment marker on line 2 is still checked", () => {
  const { dir } = make({ body: fence("python", "x = 1\n# fragment\ny: int = 'a'") });
  const r = checkSkill(dir, { blocks: true, runBlocks: errChecker });
  expect(r.checks.some((c) => c.id.startsWith("block:") && c.status === "fail")).toBe(true);
});

test("unknown and untagged fences are ignored", () => {
  const { dir } = make({ body: fence("", "garbage {{") + fence("klingon", "qapla") });
  const r = checkSkill(dir, { blocks: true, runBlocks: errChecker });
  expect(r.checks.some((c) => c.status === "fail")).toBe(false);
});

test("a missing checker is skipped, listed in gaps, never fail or pass", () => {
  const { dir } = make({ body: fence("python", "x = 1") });
  const r = checkSkill(dir, { blocks: true, runBlocks: missingChecker });
  const c = find(r, "block:python");
  expect(c?.status).toBe("skipped");
  expect(c?.detail).toContain("SKIPPED (not checked)");
  expect(r.gaps.join()).toContain("python");
  expect(r.checks.some((x) => x.id.startsWith("block") && x.status === "pass")).toBe(false);
});

test("bash blocks use bash -n and JSON blocks are parsed by default", () => {
  const bad = make({ body: fence("bash", "if then fi") + fence("json", "{oops") });
  const r = checkSkill(bad.dir, { blocks: true });
  expect(r.checks.filter((c) => c.id.startsWith("block:") && c.status === "fail")).toHaveLength(2);
  const good = make({ body: fence("bash", "echo hi") + fence("json", '{"a":1}') });
  expect(checkSkill(good.dir, { blocks: true }).checks.some((c) => c.status === "fail")).toBe(false);
});

test("--no-blocks style option skips all block checks", () => {
  const { dir } = make({ body: fence("json", "{oops") });
  expect(checkSkill(dir, { blocks: false }).checks.some((c) => c.id.startsWith("block"))).toBe(false);
});

const BRANCHY = "if a, do x.\nOtherwise do y.\nRepeat until done.\n";
const KINDS = (kind: string) => `name: demo\ndescription: ${GOOD_DESC}\nmetadata:\n  kind: ${kind}`;

test("diagram and defense heuristics fire for discipline and workflow skills", () => {
  for (const kind of ["discipline", "workflow"]) {
    const { dir } = make({ fm: KINDS(kind), body: BRANCHY });
    const r = checkSkill(dir, opts());
    expect(find(r, "heuristic:diagram")?.status).toBe("warn");
    expect(find(r, "heuristic:defense")?.status).toBe("warn");
  }
});

test("heuristics stay silent for doc-wrappers and catalogs", () => {
  for (const kind of ["doc-wrapper", "catalog"]) {
    const { dir } = make({ fm: KINDS(kind), body: BRANCHY });
    expect(all(checkSkill(dir, opts()), "heuristic")).toEqual([]);
  }
});

test("a diagram and a Red Flags heading satisfy the heuristics", () => {
  const { dir } = make({ fm: KINDS("workflow"), body: `${BRANCHY}\n${fence("mermaid", "graph TD; A-->B")}\n## Red Flags\n` });
  expect(all(checkSkill(dir, opts()), "heuristic")).toEqual([]);
});

test("CLI exits 1 on a fail, 0 otherwise, and emits JSON", () => {
  const bad = make({ fm: "name: nope\ndescription: x" });
  const run = (d: string, ...a: string[]) => Bun.spawnSync([process.execPath, "run", `${import.meta.dir}/skill-check.ts`, d, "--no-blocks", ...a]);
  expect(run(bad.dir).exitCode).toBe(1);
  const good = make();
  const p = run(good.dir, "--json");
  expect(p.exitCode).toBe(0);
  expect(JSON.parse(p.stdout.toString()).checks.length).toBeGreaterThan(0);
});

test("okChecker passes blocks", () => {
  const { dir } = make({ body: fence("python", "x = 1") });
  const r = checkSkill(dir, { blocks: true, runBlocks: okChecker });
  expect(find(r, "blocks")?.status).toBe("pass");
});
