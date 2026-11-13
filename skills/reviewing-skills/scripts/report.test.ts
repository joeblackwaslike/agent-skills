import { existsSync } from "node:fs";
import { expect, test } from "bun:test";

const run = (...args: string[]) => {
  const p = Bun.spawnSync([process.execPath, "run", `${import.meta.dir}/report.ts`, ...args]);
  return { code: p.exitCode, out: p.stdout.toString(), err: p.stderr.toString() };
};

const ok = ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=0", "--behavior-skipped", "docs only", "--open-major", "0"];

test("prints every line for a READY with all optional flags", () => {
  const r = run(
    ...ok,
    "--gate-gaps", "no e2e recipe",
    "--findings", "3", "--fixed", "1",
    "--declined", "F2=matches git blame (a:1)",
    "--deferred", "F3=bd-9",
    "--rereviews", "1", "--last-rereview-findings", "0",
    "--follow-ups", "one nit",
    "--surface", "new flag",
    "--disagreements", "2",
  );
  expect(r.code).toBe(0);
  expect(r.out).toBe(
    [
      "Self-review: READY",
      "Intent: x",
      "Checks: just check exit 0, just test exit 0",
      "Gate gaps: no e2e recipe",
      "Gate checks skipped: 0",
      "Scenarios: off",
      "Behavior: skipped, docs only",
      "Review: 3 findings -> 1 fixed, 1 declined, 1 deferred",
      "Re-reviews: 1, last one 0 findings",
      "Declined: F2 matches git blame (a:1)",
      "Deferred: F3 -> bd-9",
      "Known follow-ups: one nit",
      "New public surface: new flag",
      "Unresolved disagreements: 2",
      "",
    ].join("\n"),
  );
});

test("prints behavior command and indented multi-line output", () => {
  const r = run("--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=0", "--behavior-cmd", "mdlink a", "--behavior-out", "l1\nl2", "--open-major", "0");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Behavior: mdlink a\n          -> l1\n             l2\n");
});

test("a check command may contain =", () => {
  const r = run("--verdict", "ready", "--intent", "x", "--check", "CI=1 just check=0", "--check", "just test=0", "--gate-gaps", "env prefix", "--behavior-skipped", "docs only", "--open-major", "0");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Checks: CI=1 just check exit 0, just test exit 0");
});

test("re-review and no-re-review lines", () => {
  const none = run(...ok, "--findings", "1", "--fixed", "1", "--no-rereview-reason", "minor-only fixes without behavior change");
  expect(none.out).toContain("Re-reviews: 0, none: minor-only fixes without behavior change");
  const clean = run(...ok);
  expect(clean.out).toContain("Re-reviews: 0, none: no fixes applied");
});

test("not-ready may carry a failing check and no behavior", () => {
  const r = run("--verdict", "not-ready", "--intent", "x", "--check", "just test=1");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Self-review: NOT READY");
  expect(r.out).toContain("Behavior: none");
});

test("blank optional text prints none", () => {
  const r = run("--verdict", "not-ready", "--intent", "x", "--check", "a=1", "--surface", " ", "--follow-ups", "", "--gate-gaps", " ");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Gate gaps: none\n");
  expect(r.out).toContain("Known follow-ups: none\n");
  expect(r.out).toContain("New public surface: none\n");
});

test("--scenarios and --gate-skipped appear in the report", () => {
  const r = run(...ok, "--gate-gaps", "skill-check SKIPPED: no bun", "--gate-skipped", "2", "--scenarios", "S1 | baseline | FAIL | \"skipped step\"\nS2 | skill | PASS | \"ran it\"");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Gate checks skipped: 2\n");
  expect(r.out).toContain("Scenarios: S1 | baseline | FAIL | \"skipped step\"\n           S2 | skill | PASS | \"ran it\"\n");
});

test("--scenarios off prints as off in any case", () => {
  for (const raw of ["OFF", " Off "]) {
    expect(run(...ok, "--scenarios", raw).out).toContain("Scenarios: off\n");
  }
});

test("--help prints usage and exits 0", () => {
  const r = run("--help");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Usage:");
});

const rejected: [string, string[], string][] = [
  ["failing check on READY", ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=1", "--behavior-skipped", "d"], "just test exit 1"],
  ["READY without behavior evidence", ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=0"], "--behavior-cmd"],
  ["READY without both just recipes or gate gaps", ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--behavior-skipped", "d"], "--gate-gaps"],
  ["READY with findings that have no disposition", [...ok, "--findings", "3", "--fixed", "1"], "no disposition"],
  ["more dispositions than findings", [...ok, "--findings", "1", "--fixed", "2"], "less than"],
  ["open major finding on READY", [...ok, "--open-major", "1"], "blocker or major"],
  ["READY without --open-major", ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=0", "--behavior-skipped", "docs only"], "--open-major"],
  ["re-review without last findings", [...ok, "--rereviews", "1"], "--last-rereview-findings"],
  ["more than two re-reviews", [...ok, "--rereviews", "3", "--last-rereview-findings", "0"], "from 0 to 2"],
  ["fixes with no re-review and no reason", [...ok, "--findings", "1", "--fixed", "1"], "--no-rereview-reason"],
  ["behavior-skipped with behavior-cmd", [...ok, "--behavior-cmd", "c", "--behavior-out", "o"], "not both"],
  ["behavior-cmd without behavior-out", ["--verdict", "not-ready", "--intent", "x", "--check", "just test=1", "--behavior-cmd", "c"], "go together"],
  ["blank behavior-skipped on READY", ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=0", "--behavior-skipped", " "], "--behavior-cmd"],
  ["blank behavior-cmd and behavior-out on READY", ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=0", "--behavior-cmd", "", "--behavior-out", ""], "--behavior-cmd"],
  ["blank behavior-out", ["--verdict", "not-ready", "--intent", "x", "--check", "a=0", "--behavior-cmd", "c", "--behavior-out", " "], "go together"],
  ["blank gate-gaps does not satisfy READY", ["--verdict", "ready", "--intent", "x", "--check", "pytest=0", "--gate-gaps", " ", "--behavior-skipped", "d"], "--gate-gaps"],
  ["blank intent", ["--verdict", "not-ready", "--intent", "  ", "--check", "a=0"], "--intent"],
  ["blank declined reason", [...ok, "--findings", "1", "--declined", "F1= "], "--declined"],
  ["blank check command", ["--verdict", "not-ready", "--intent", "x", "--check", " =0"], "--check"],
  ["READY with skipped gate checks and no gate gaps", [...ok, "--gate-skipped", "1"], "--gate-gaps"],
  ["blank scenarios", [...ok, "--scenarios", " "], "--scenarios"],
  ["non-numeric gate-skipped", [...ok, "--gate-skipped", "x"], "--gate-skipped"],
  ["bad verdict", ["--verdict", "maybe", "--intent", "x", "--check", "a=0"], "--verdict"],
  ["missing intent", ["--verdict", "not-ready", "--check", "a=0"], "--intent"],
  ["missing check", ["--verdict", "not-ready", "--intent", "x"], "--check"],
  ["negative number", [...ok, "--findings", "-1"], "--findings"],
  ["fractional number", [...ok, "--findings", "1.5"], "--findings"],
  ["empty number", [...ok, "--findings", ""], "--findings"],
  ["hex exit code", ["--verdict", "not-ready", "--intent", "x", "--check", "a=0x1"], "--check"],
  ["check without exit code", ["--verdict", "not-ready", "--intent", "x", "--check", "nocode"], "--check"],
  ["declined without id", [...ok, "--findings", "1", "--declined", "=why"], "--declined"],
  ["declined without reason", [...ok, "--findings", "1", "--declined", "F1="], "--declined"],
  ["newline in a single-line field", [...ok, "--surface", "a\nVerdict: forged"], "single line"],
  ["unknown flag", [...ok, "--bogus"], "bogus"],
  ["flag with no value", ["--verdict"], "verdict"],
  ["last-rereview-findings with no re-reviews", [...ok, "--last-rereview-findings", "0"], "--last-rereview-findings"],
  ["no-rereview-reason with re-reviews", [...ok, "--rereviews", "1", "--last-rereview-findings", "0", "--no-rereview-reason", "why"], "--no-rereview-reason"],
  ["last-rereview-findings above findings", [...ok, "--findings", "1", "--fixed", "1", "--rereviews", "1", "--last-rereview-findings", "2"], "--last-rereview-findings"],
  ["same id declined and deferred", [...ok, "--findings", "2", "--declined", "F1=why", "--deferred", "F1=bd-1"], "F1"],
];

test.each(rejected)("exit 2 and empty stdout: %s", (_name, args, needle) => {
  const r = run(...args);
  expect(r.code).toBe(2);
  expect(r.out).toBe("");
  expect(r.err).toContain(needle);
});

test("not-ready reports findings that are still open", () => {
  const r = run("--verdict", "not-ready", "--intent", "x", "--check", "just check=0", "--findings", "2", "--fixed", "1", "--open-major", "1", "--no-rereview-reason", "none");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Review: 2 findings -> 1 fixed, 0 declined, 0 deferred, 1 open");
});

test("exit 2: more open blockers or majors than undispositioned findings", () => {
  const r = run("--verdict", "not-ready", "--intent", "x", "--check", "just check=0", "--findings", "1", "--fixed", "1", "--open-major", "1", "--no-rereview-reason", "none");
  expect(r.code).toBe(2);
  expect(r.err).toContain("open-major");
});

test("two --declined entries are joined by a semicolon", () => {
  const r = run(...ok, "--findings", "2", "--declined", "F1=a", "--declined", "F2=b");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Declined: F1 a; F2 b\n");
});

test("--rereviews 2 is accepted at the boundary", () => {
  const r = run(...ok, "--rereviews", "2", "--last-rereview-findings", "0");
  expect(r.code).toBe(0);
  expect(r.out).toContain("Re-reviews: 2, last one 0 findings");
});

const sibling = `${import.meta.dir}/../../reviewing-code/scripts/report.ts`;
const runSibling = (...args: string[]) => Bun.spawnSync([process.execPath, "run", sibling, ...args]).exitCode;

test("exit codes match the reviewing-code copy on the shared flag set", () => {
  expect(existsSync(sibling)).toBe(true);
  const cases = [
    ok,
    ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=1", "--behavior-skipped", "d"],
    ["--verdict", "ready", "--intent", "x", "--check", "just check=0", "--check", "just test=0"],
    ["--verdict", "maybe", "--intent", "x", "--check", "a=0"],
  ];
  const results = cases.map((args) => [run(...args).code, runSibling(...args)]);
  expect(results).toEqual([[0, 0], [2, 2], [2, 2], [2, 2]]);
});
