import { afterAll, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { type BlockChecker, type Report, checkSkill, deps } from "./skill-check";

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

test("orphan detection matches link targets, not substrings", () => {
  const { dir } = make({ body: "[d](references/data.md)\n", files: { "references/a.md": "# a\n", "references/data.md": "# d\n" } });
  const orphan = all(checkSkill(dir, opts()), "orphan");
  expect(orphan.map((c) => [c.id, c.status])).toEqual([["orphan:references/a.md", "warn"]]);
});

test("a reference linked from another reference is not an orphan", () => {
  const { dir } = make({ body: "[a](references/a.md)\n", files: { "references/a.md": "[b](b.md)\n", "references/b.md": "# b\n" } });
  expect(find(checkSkill(dir, opts()), "orphan")?.status).toBe("pass");
});

test("SKILL.md over 20,000 bytes fails", () => {
  const { dir } = make({ body: "x".repeat(20_100) });
  expect(find(checkSkill(dir, opts()), "size")?.status).toBe("fail");
});

const hasYaml = Bun.spawnSync(["python3", "-c", "import yaml"]).exitCode === 0;

test.skipIf(!hasYaml)("description over 400 characters warns", () => {
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

test("heuristics stay silent for doc-wrappers and reference catalogs", () => {
  for (const kind of ["doc-wrapper", "reference-catalog"]) {
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

const cli = (...args: string[]) => {
  const p = Bun.spawnSync([process.execPath, "run", `${import.meta.dir}/skill-check.ts`, ...args]);
  return { code: p.exitCode, out: p.stdout.toString(), err: p.stderr.toString() };
};

test("nonexistent skill dir and unknown flag exit 2 with one line", () => {
  for (const args of [[join(tmpdir(), "no-such-skill-dir")], [make().dir, "--bogus"], []]) {
    const r = cli(...args);
    expect(r.code).toBe(2);
    expect(r.err.trim().split("\n")).toHaveLength(1);
  }
});

test("a symlinked skill is checked under the link name; trailing slash is harmless", () => {
  const { dir, root } = make();
  const link = join(root, "skills", "linked");
  symlinkSync(dir, link);
  expect(find(checkSkill(link, opts()), "name")?.detail).toContain("linked");
  expect(find(checkSkill(`${dir}/`, opts()), "name")?.status).toBe("pass");
});

test("links are percent-decoded; code spans and fences are ignored", () => {
  const { dir } = make({
    body: "[sp](references/my%20file.md) `[x](nope.md)`\n\n```md\n[y](nope2.md)\n```\n",
    files: { "references/my file.md": "# m\n" },
  });
  expect(all(checkSkill(dir, opts()), "link").filter((c) => c.status === "fail")).toEqual([]);
});

test("registry counts only the first table cell, backticked or plain", () => {
  const { dir, root } = make({ repo: true });
  writeFileSync(join(root, "SKILLS.md"), "| other | mentions `demo` here |\n");
  writeFileSync(join(root, "README.md"), "| demo | plain |\n");
  const r = checkSkill(dir, opts({ repo: root }));
  expect(find(r, "registry:SKILLS.md")?.status).toBe("fail");
  expect(find(r, "registry:README.md")?.status).toBe("pass");
});

test("a repo with no SKILLS.md or README.md skips the registry with a reason", () => {
  const { dir } = make();
  const empty = mkdtempSync(join(tmpdir(), "skill-check-empty-"));
  roots.push(empty);
  const c = find(checkSkill(dir, opts({ repo: empty })), "registry");
  expect(c?.status).toBe("skipped");
  expect(c?.detail).toContain("SKILLS.md");
});

test("diagram heuristic runs for other kinds; defense heuristic does not", () => {
  const { dir } = make({ body: BRANCHY });
  const r = checkSkill(dir, opts());
  expect(find(r, "heuristic:diagram")?.status).toBe("warn");
  expect(find(r, "heuristic:defense")).toBeUndefined();
});

test("kind is inferred from numbered steps, MUST/NEVER and a working-with- name", () => {
  const steps = make({ body: `1. if a\n2. otherwise b\n3. repeat until done\n` });
  const sr = checkSkill(steps.dir, opts());
  expect(find(sr, "heuristic:defense")?.status).toBe("warn");
  const must = make({ body: `You MUST obey. If a, then b. Otherwise c. Repeat.\n` });
  expect(find(checkSkill(must.dir, opts()), "heuristic:defense")?.status).toBe("warn");
  const wrapper = make({ name: "working-with-x", body: `1. if a\n2. otherwise b\n3. repeat until done\n` });
  expect(all(checkSkill(wrapper.dir, opts()), "heuristic")).toEqual([]);
});

test.skipIf(!hasYaml)("a description over 1000 characters fails", () => {
  const { dir } = make({ fm: `name: demo\ndescription: Use when testing. ${"word ".repeat(210)}` });
  expect(find(checkSkill(dir, opts()), "description")?.status).toBe("fail");
});

function withEmptyPath<T>(fn: () => T): T {
  const empty = mkdtempSync(join(tmpdir(), "skill-check-path-"));
  roots.push(empty);
  const saved = process.env.PATH;
  process.env.PATH = empty;
  try {
    return fn();
  } finally {
    process.env.PATH = saved;
  }
}

test("with no tools on PATH every checker is skipped and listed in gaps", () => {
  const { dir } = make({ body: fence("python", "x = 1") + fence("typescript", "const a = 1;") + fence("bash", "echo hi") });
  const r = withEmptyPath(() => checkSkill(dir, { blocks: true }));
  for (const id of ["block:python", "block:typescript", "block:bash"]) expect(find(r, id)?.status).toBe("skipped");
  expect(find(r, "description")?.status).toBe("skipped");
  expect(r.checks.some((c) => c.status === "pass" && c.id.startsWith("block"))).toBe(false);
  expect(r.checks.some((c) => c.status === "fail")).toBe(false);
  expect(r.gaps.length).toBeGreaterThanOrEqual(4);
});

test("overlap fires at exactly Jaccard 0.4 and not below", () => {
  const sibling = (root: string, desc: string) => {
    mkdirSync(join(root, "skills", "twin"), { recursive: true });
    writeFileSync(join(root, "skills", "twin", "SKILL.md"), `---\nname: twin\ndescription: ${desc}\n---\n`);
  };
  const at = make({ repo: true, fm: "name: demo\ndescription: alpha bravo charlie delta" });
  sibling(at.root, "alpha bravo echo");
  expect(find(checkSkill(at.dir, opts({ repo: at.root })), "overlap")?.status).toBe("warn");
  const below = make({ repo: true, fm: "name: demo\ndescription: alpha bravo charlie delta" });
  sibling(below.root, "alpha bravo echo foxtrot");
  expect(find(checkSkill(below.dir, opts({ repo: below.root })), "overlap")?.status).toBe("pass");
});

test("a fence nested in a longer outer fence is not extracted; later blocks keep their line", () => {
  const body = "````markdown\n```python\nx: int = 'a'\n```\n````\n\n" + fence("python", "y = 1");
  const { dir } = make({ body });
  const seen: string[][] = [];
  const spy: BlockChecker = (_l, codes) => {
    seen.push(codes);
    return codes.map(() => ({ status: "ok", detail: "" }));
  };
  checkSkill(dir, { blocks: true, runBlocks: spy });
  expect(seen).toEqual([["y = 1\n"]]);
});

test("a checker returning the wrong number of results is skipped, not a crash", () => {
  const { dir } = make({ body: fence("python", "x = 1") });
  const r = checkSkill(dir, { blocks: true, runBlocks: () => [] });
  expect(find(r, "block:python")?.status).toBe("skipped");
});

test("a timed-out tool is skipped with a timeout detail and listed in gaps", () => {
  const { dir } = make({ body: fence("bash", "echo hi") });
  const real = deps.spawn;
  deps.spawn = (() => ({ error: Object.assign(new Error("spawnSync timed out"), { code: "ETIMEDOUT" }), status: null, stdout: "", stderr: "" })) as unknown as typeof real;
  try {
    const r = checkSkill(dir, { blocks: true });
    expect(find(r, "block:bash")?.status).toBe("skipped");
    expect(find(r, "block:bash")?.detail).toContain("timed out after 120s");
    expect(find(r, "description")?.detail).toContain("timed out after 120s");
    expect(r.gaps.join()).toContain("timed out after 120s");
  } finally {
    deps.spawn = real;
  }
});

test("block ids use the opening fence line", () => {
  const { dir } = make({ body: fence("python", "x = 1") });
  const open = readFileSync(join(dir, "SKILL.md"), "utf8").split("\n").findIndex((l) => l.startsWith("```python")) + 1;
  const r = checkSkill(dir, { blocks: true, runBlocks: errChecker });
  expect(r.checks.some((c) => c.id === `block:SKILL.md:${open}`)).toBe(true);
});

test("a backtick line with a backtick in its info string does not open a fence", () => {
  const { dir } = make({ body: "```foo```\n[bad](nope.md)\n" });
  expect(all(checkSkill(dir, opts()), "link").some((c) => c.status === "fail" && c.detail.includes("nope.md"))).toBe(true);
});

test("site-absolute links are not checked but are counted", () => {
  const { dir } = make({ body: "[a](/docs/foo) [b](/x/y) [c](references/z.md)\n", files: { "references/z.md": "# z\n" } });
  const r = checkSkill(dir, opts());
  expect(all(r, "link").filter((c) => c.status === "fail")).toEqual([]);
  expect(find(r, "links")?.detail).toContain("2 site-absolute links not checked");
});

test("fetched reference files are exempt from link and orphan checks and counted", () => {
  const fetched = "---\nsource: https://example.com/a\nfetched_at: 2026-01-01\nsha256: abc\n---\n[img](../missing.png)\n";
  const { dir } = make({ body: "[h](references/hand.md)\n", files: { "references/hand.md": "[img](../missing.png)\n", "references/fetched.md": fetched, "references/fetched2.md": fetched } });
  const r = checkSkill(dir, opts());
  const fails = r.checks.filter((c) => c.status === "fail").map((c) => c.id);
  expect(fails).toEqual(["link:references/hand.md:../missing.png"]);
  expect(r.checks.some((c) => c.status === "warn" && c.id.includes("fetched"))).toBe(false);
  expect(find(r, "fetched")?.detail).toBe("2 fetched reference files exempt from link/orphan checks");
});

test("a hand-written unlinked reference still warns as an orphan", () => {
  const { dir } = make({ body: "x\n", files: { "references/hand.md": "# h\n" } });
  expect(find(checkSkill(dir, opts()), "orphan:references/hand.md")?.status).toBe("warn");
});
