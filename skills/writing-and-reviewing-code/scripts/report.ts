#!/usr/bin/env bun
import { parseArgs } from "node:util";

const USAGE = `Usage: bun run scripts/report.ts [OPTIONS]

Print the /self-review report block to stdout. Prints nothing and exits 2 if
the inputs are invalid or inconsistent; stderr says which flag to fix.

Options:
  --verdict ready|not-ready        Required.
  --intent TEXT                    Required. One sentence.
  --check "CMD=EXIT"               Required, repeatable. Example: --check "just check=0"
  --gate-gaps TEXT                 Checks the repo lacks. Required for READY unless
                                   --check covers both "just check" and "just test".
  --behavior-cmd CMD               The command that exercised the change.
  --behavior-out TEXT              What it printed. Required with --behavior-cmd.
  --behavior-skipped REASON        Use instead of the two above (example: "docs only").
  --findings N                     Total findings from the reviewers (default: 0). Any not fixed,
                                   declined or deferred count as open, which only not-ready allows.
  --fixed N                        Findings fixed (default: 0).
  --declined "ID=REASON"           Repeatable. Example: --declined "F3=matches git blame (src/x:41)"
  --deferred "ID=ISSUE"            Repeatable. Example: --deferred "F5=bd-123"
  --rereviews N                    Re-reviews run, 0-2 (default: 0).
  --last-rereview-findings N       Findings in the last re-review.
  --no-rereview-reason TEXT        Why there was none, when fixes were applied and --rereviews is 0.
  --open-major N                   Blocker or major findings still open. Required for READY.
  --follow-ups TEXT                Remaining minors and nits (default: none).
  --surface TEXT                   New public surface (default: none).
  --disagreements N                Unresolved disagreements (default: 0).

Every text flag except --behavior-out must be a single line.

Exit codes: 0 report printed, 2 invalid or inconsistent input.

Example:
  bun run scripts/report.ts --verdict ready --intent "mdlink accepts ranges" \\
    --check "just check=0" --check "just test=0" \\
    --behavior-cmd "mdlink a.md:1-2" --behavior-out "[a.md:1-2](a.md#L1-L2)" \\
    --findings 2 --fixed 2 --rereviews 1 --last-rereview-findings 0 --open-major 0`;

const die = (msg: string): never => {
  console.error(`Error: ${msg}\nRun with --help for usage.`);
  process.exit(2);
};

const parsed = (() => {
  try {
    return parseArgs({
      options: {
        verdict: { type: "string" },
        intent: { type: "string" },
        check: { type: "string", multiple: true },
        "gate-gaps": { type: "string" },
        "behavior-cmd": { type: "string" },
        "behavior-out": { type: "string" },
        "behavior-skipped": { type: "string" },
        findings: { type: "string" },
        fixed: { type: "string" },
        declined: { type: "string", multiple: true },
        deferred: { type: "string", multiple: true },
        rereviews: { type: "string" },
        "last-rereview-findings": { type: "string" },
        "no-rereview-reason": { type: "string" },
        "open-major": { type: "string" },
        "follow-ups": { type: "string" },
        surface: { type: "string" },
        disagreements: { type: "string" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    });
  } catch (e) {
    return die(e instanceof Error ? e.message : String(e));
  }
})();
const v = parsed.values;

if (v.help) {
  console.log(USAGE);
  process.exit(0);
}

const num = (name: string, raw: string | undefined, max?: number): number => {
  if (raw === undefined) return 0;
  const n = /^\d+$/.test(raw) ? Number(raw) : NaN;
  if (!Number.isSafeInteger(n) || (max !== undefined && n > max)) {
    die(`--${name} must be an integer from 0${max === undefined ? " up" : ` to ${max}`}, got "${raw}".`);
  }
  return n;
};

const line = (name: string, raw: string | undefined): string | undefined => {
  if (raw === undefined) return undefined;
  if (/[\r\n]/.test(raw)) die(`--${name} must be a single line.`);
  return raw.trim() || undefined;
};

const pair = (name: string, raw: string, split: "first" | "last" = "first"): [string, string] => {
  line(name, raw);
  const i = split === "first" ? raw.indexOf("=") : raw.lastIndexOf("=");
  const left = raw.slice(0, i).trim();
  const right = raw.slice(i + 1).trim();
  if (i < 0 || !left || !right) die(`--${name} needs LEFT=RIGHT, got "${raw}".`);
  return [left, right];
};

if (v.verdict !== "ready" && v.verdict !== "not-ready") die(`--verdict must be ready or not-ready, got "${v.verdict}".`);
const intent = line("intent", v.intent);
if (!intent) die("--intent is required.");
const ready = v.verdict === "ready";

const checks = (v.check ?? []).map((c) => {
  const [cmd, exit] = pair("check", c, "last");
  return { cmd, exit: num("check", exit) };
});
if (checks.length === 0) die('--check is required, for example --check "just check=0".');

const gateGaps = line("gate-gaps", v["gate-gaps"]);
const covered = ["just check", "just test"].every((c) => checks.some((x) => x.cmd === c));
if (ready && !covered && !gateGaps) die('READY needs --check for both "just check" and "just test", or --gate-gaps saying what is missing.');

const behaviorCmd = line("behavior-cmd", v["behavior-cmd"]);
const behaviorOut = v["behavior-out"]?.trim() || undefined;
const behaviorSkipped = line("behavior-skipped", v["behavior-skipped"]);
if (!behaviorCmd !== !behaviorOut) die("--behavior-cmd and --behavior-out go together, and neither may be blank.");
if (behaviorSkipped && behaviorCmd) die("Use --behavior-skipped or --behavior-cmd/--behavior-out, not both.");
let behavior = "none";
if (behaviorSkipped) {
  behavior = `skipped, ${behaviorSkipped}`;
} else if (behaviorCmd && behaviorOut) {
  behavior = `${behaviorCmd}\n          -> ${behaviorOut.replaceAll("\n", "\n             ")}`;
} else if (ready) {
  die("READY needs --behavior-cmd and --behavior-out, or --behavior-skipped REASON.");
}

const findings = num("findings", v.findings);
const fixed = num("fixed", v.fixed);
const declined = (v.declined ?? []).map((d) => pair("declined", d));
const deferred = (v.deferred ?? []).map((d) => pair("deferred", d));
const open = findings - (fixed + declined.length + deferred.length);
if (open < 0) {
  die(`findings (${findings}) is less than fixed (${fixed}) + declined (${declined.length}) + deferred (${deferred.length}).`);
}

const rereviews = num("rereviews", v.rereviews, 2);
const openMajor = num("open-major", v["open-major"]);
if (!ready && open < openMajor) die(`open-major (${openMajor}) is more than the findings with no disposition (${open}).`);
const disagreements = num("disagreements", v.disagreements);

if (ready) {
  const failed = checks.filter((c) => c.exit !== 0);
  if (failed.length) die(`READY with a failing check: ${failed.map((c) => `${c.cmd} exit ${c.exit}`).join(", ")}. Fix it or report not-ready.`);
  if (open > 0) die(`findings (${findings}) has ${open} with no disposition. READY needs each one fixed, declined or deferred; otherwise report not-ready.`);
  if (v["open-major"] === undefined) die("READY needs --open-major N: the number of blocker or major findings still open (0 if none).");
  if (openMajor > 0) die(`READY with ${openMajor} blocker or major finding(s) still open. Fix them or report not-ready.`);
}

let rereviewLine: string;
if (rereviews > 0) {
  if (v["last-rereview-findings"] === undefined) die("--last-rereview-findings is required when --rereviews is above 0.");
  rereviewLine = `${rereviews}, last one ${num("last-rereview-findings", v["last-rereview-findings"])} findings`;
} else {
  const reason = line("no-rereview-reason", v["no-rereview-reason"]);
  if (!reason && fixed > 0) die('--no-rereview-reason is required when fixes were applied and --rereviews is 0 (example: "minor-only fixes without behavior change").');
  rereviewLine = `0, none: ${reason ?? "no fixes applied"}`;
}

const list = (items: [string, string][], sep: string): string => (items.length ? items.map(([id, x]) => `${id} ${sep}${x}`).join("; ") : "none");

console.log(
  [
    `Self-review: ${ready ? "READY" : "NOT READY"}`,
    `Intent: ${intent}`,
    `Checks: ${checks.map((c) => `${c.cmd} exit ${c.exit}`).join(", ")}`,
    `Gate gaps: ${gateGaps ?? "none"}`,
    `Behavior: ${behavior}`,
    `Review: ${findings} findings -> ${fixed} fixed, ${declined.length} declined, ${deferred.length} deferred${open > 0 ? `, ${open} open` : ""}`,
    `Re-reviews: ${rereviewLine}`,
    `Declined: ${list(declined, "")}`,
    `Deferred: ${list(deferred, "-> ")}`,
    `Known follow-ups: ${line("follow-ups", v["follow-ups"]) ?? "none"}`,
    `New public surface: ${line("surface", v.surface) ?? "none"}`,
    `Unresolved disagreements: ${disagreements}`,
  ].join("\n"),
);
