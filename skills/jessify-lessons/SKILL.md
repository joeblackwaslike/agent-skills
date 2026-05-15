---
name: jessify-lessons
description: Use when auditing, rewriting, improving, evaluating, or adding lessons to the lessons-learned plugin corpus. Covers lesson quality standards, trigger precision, the per-lesson improvement workflow, and eval scenario creation.
---

# Jessify Lessons

Use this skill when working with the lesson corpus in `joeblackwaslike/lessons-learned`. It encodes the Jesse Vincent / Superpowers methodology: treat lessons as behavioral code, require pressure testing, prefer gates over advice.

Core principle: **A lesson is only valuable if it fires at the moment of risk and produces an observable behavior change.**

## Route First

| Task | Read |
|------|------|
| Auditing a lesson for quality issues, rewriting fields, improving trigger precision | `references/lesson-jessification.md` |
| Creating or running an eval scenario to test a lesson | `references/eval-workflow.md` |
| Both (improving a high-priority lesson end-to-end) | Read jessification first, then eval-workflow |

## Universal Principles

1. **State the behavior.** Every lesson improvement must start with: "When the agent is about to `<trigger>`, it should `<observable action>`, even if `<pressure>`."
2. **Gates over advice.** Prefer "Before X, do Y and verify Z" over "Be careful with X."
3. **Trigger before reminder.** A lesson that fires too broadly trains agents to ignore it. A lesson that fires too narrowly never helps.
4. **Eval before confidence.** For any behavior-changing rewrite, require a passing eval or a documented RED/GREEN transcript.
5. **Manifest is generated.** Never hand-edit `data/lesson-manifest.json`. All changes go through `node scripts/lessons.mjs edit` then `build`.

## Repo Quick Reference

```text
Repo root:   /Users/joe/github/joeblackwaslike/lessons-learned
DB:          data/lessons.db
Manifest:    data/lesson-manifest.json
CLI:         node scripts/lessons.mjs <subcommand>
Audit:       node scripts/jessify/audit-lessons.mjs
Evals:       evals/promptfooconfig.yaml
Scenarios:   evals/scenarios/<tc-id>/
```

Key CLI commands:

```bash
node scripts/lessons.mjs list                        # all active lessons
node scripts/lessons.mjs edit --id <id> --patch '{}' # patch fields
node scripts/lessons.mjs build                       # rebuild manifest
node scripts/lessons.mjs doctor                      # check quality issues
node scripts/lessons.mjs review                      # review candidates
node scripts/jessify/audit-lessons.mjs               # jessify audit
```

## Completion Criteria

Before calling any lesson improvement complete:

- Behavior is stated in observable terms.
- Trigger is tool + command/path pattern (not tool-only unless justified).
- Solution is a concrete gate or action, not general advice.
- `doctor` reports no new issues.
- Eval scenario exists or absence is documented with reason.
