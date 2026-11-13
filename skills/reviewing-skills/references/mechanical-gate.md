# Mechanical gate

Step 2 of the [reviewing-skills procedure](../SKILL.md) runs `skill-check.ts` on the skill directory before any reviewer reads it. The script uses no LLM tokens. It checks form, and it cannot tell whether a rule is worded at the right strength. A green gate means the review can start.

```sh
bun <base directory>/scripts/skill-check.ts <skill-dir> [--json] [--repo <path>] [--no-blocks]
```

`<base directory>` is the directory shown when this skill loaded. Exit 0 means no check is red, 1 means at least one FAIL, 2 means bad usage. Each result line starts with PASS, FAIL, WARN or SKIPPED.

## What it runs

| Check id | Result it can give | Meaning |
|---|---|---|
| `frontmatter` | FAIL | Frontmatter missing, or a key outside the allowed set. |
| `name` | FAIL | `name` differs from the directory name. |
| `size` | FAIL | `SKILL.md` is over 20,000 bytes. |
| `description` | FAIL, WARN, SKIPPED | Run through the repo's `scripts/lint-descriptions.py`, so the thresholds are the repo's, not a second copy. A WARN is over the 400-character target. SKIPPED when python3, PyYAML or `lint-descriptions.py` is unavailable; count it as a gate gap. |
| `link:*` | FAIL | A relative link in a doc does not resolve. The checker only follows inline `[text](target)` links, so it skips links with a title after the target, angle-bracket targets and reference-style definitions. |
| `orphan:*` | WARN | A file under `references/` that nothing routes to. |
| `registry:*` | FAIL | No row for the skill in `SKILLS.md` or `README.md`. |
| `overlap` | WARN | Another skill's description has a Jaccard score of 0.4 or more against this one. Advisory. |
| `block:*` | FAIL, SKIPPED | A fenced code block failed its check, or the checker for its language is missing. |
| `heuristic:diagram` | WARN | Three or more branching lines (`if`, `otherwise`, `repeat`, `until`) in the `SKILL.md` body and no `mermaid` or `dot` block. Advisory. |
| `heuristic:defense` | WARN | A discipline or workflow skill with no heading containing `Red Flags`, `Rationalization` or `Excuse`. Advisory. |
| `fetched` | PASS | Reference files carrying `source` and `fetched_at` frontmatter are exempt from the link and orphan checks, because they are fetched docs. |

Which kind of skill it is decides whether the two heuristics run. `metadata.kind` in the frontmatter wins. Otherwise a `working-with-` or `developing-` name is a doc-wrapper, and the script infers a workflow or discipline from the body. The diagram heuristic is off for doc-wrappers and reference catalogs, and the defense heuristic runs only for discipline and workflow kinds.

## Code blocks

Fenced blocks are extracted and checked.

- `python` and `py` blocks are type-checked with pyright in non-strict mode.
- `typescript` and `ts` blocks are type-checked with `tsc`.
- `bash`, `sh` and `shell` blocks get `bash -n`.
- `json` blocks are parsed.
- A block with an unknown language tag, or none, is ignored and never fails.
- A block whose first line is `# fragment` or `// fragment` is a deliberately partial snippet and is skipped. The marker works only on the first line. Anywhere else the block is checked.

When a checker is missing (pyright, tsc, bash), the block prints `SKIPPED (not checked)`. It never fails the gate and never counts as green. `bunx` needs the network the first time it runs, and the output says so when it is offline. Pass `--no-blocks` to skip the code step while editing prose.

## Reading the result

1. Fix every FAIL before reading further. A FAIL for a link or registry row is cheap and a reviewer should not spend a finding on it.
2. A WARN is a prompt to look, not an order. Open the file and judge it. A missing-diagram WARN on a skill whose steps are linear is declined with that reason. A missing-defense WARN on a discipline skill is usually a real finding for the instruction-quality reviewer.
3. Count SKIPPED results. Pass the count to `report.ts --gate-skipped` and name each one in `--gate-gaps`. READY with a skipped check needs the gap explained.
4. A link FAIL for a file the change itself says arrives later in the same PR is expected; do not report READY until it resolves.
5. Outside a git repo or plugin the script cannot find the registry. It then prints `SKIPPED` for the registry and overlap checks and states why. Those are gate gaps too.

## What the gate cannot see

- A rule worded as a suggestion that should be a gate.
- A table row missing for an excuse agents actually use.
- A threshold that disagrees between two files, when each reads fine alone.
- A claim about a library that is wrong.
- An example that runs but does not do what the prose promises.

That is the reviewers' work. Do not treat a green gate as a verdict.

## Report

Pass each command you ran as `--check "<command>=<exit code>"`, for example `--check "bun skill-check.ts skills/foo=0"`. Put SKIPPED counts in `--gate-skipped` and the reasons in `--gate-gaps`. When there is nothing to report, pass `--gate-gaps "none"`. `report.ts` accepts READY without `--gate-gaps` only when the `--check` list includes both `just check` and `just test`; other checks may sit beside them.
