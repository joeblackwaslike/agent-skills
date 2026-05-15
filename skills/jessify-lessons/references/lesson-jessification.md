# Lesson Jessification Reference

Per-lesson workflow for improving lesson quality using the Jesse/Superpowers methodology.

## Target Lesson Shape

Every lesson should satisfy:

| Field | Target |
|-------|--------|
| `summary` | ≤80 chars, states the risk in one line |
| `problem` | Root cause and failure mode (not symptoms). Should answer "why does this happen?" |
| `solution` | Concrete gate or action the agent can apply immediately. "Before X, do Y" not "be careful with X" |
| `toolNames` | Exact tool name(s) — required for hint/guard or lesson never fires |
| `commandPatterns` | Regex array targeting the specific risky command, not the tool category |
| `pathPatterns` | Glob array for file-path-triggered lessons |
| `type` | `hint` (inject context), `guard` (block + warn), `protocol` (session-start once), `directive` (always-on session-start) |
| `priority` | Reflects consequence × frequency. Data-loss/irreversible = 8-10, high-frequency = 7-8, situational = 4-6 |
| `tags` | At minimum: `tool:<name>`, `topic:<area>`, `severity:<level>` where applicable |

Valid `toolNames` (exact casing): `Bash`, `Read`, `Edit`, `Write`, `Glob`, `Grep`, `Agent`, `TodoWrite`, `WebFetch`, `WebSearch`

## Recommended Injected Message Pattern

```markdown
## Lesson: <short risk statement>
<root cause and failure mode>
**Fix**: Before <risky action>, <objective gate or concrete correction>.
```

For lessons where agents rationalize away the risk:

```markdown
Do not treat "just this once" or "I already know the state" as an exception.
```

## Per-Lesson Improvement Workflow

### Step 1: Inspect

```bash
node scripts/lessons.mjs list | grep <slug-fragment>
# get the id, then check manifest:
cat data/lesson-manifest.json | node -e "
  const m=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  console.log(JSON.stringify(m.lessons.find(l=>l.slug.includes(process.argv[1])),null,2));
" -- <slug-fragment>
```

Run the audit first for a quick issues list:

```bash
node scripts/jessify/audit-lessons.mjs --id <id>
```

### Step 2: State the Behavior

Write one sentence before touching any fields:

> "When the agent is about to `<tool + trigger>`, it should `<observable action>`, even if `<common rationalization>`."

Example:
> "When the agent is about to run `git stash`, it should check whether untracked files exist first, even if it thinks it only modified tracked files."

### Step 3: Classify the Weakness

| Issue Code | What it means | Fix |
|------------|--------------|-----|
| `summary-too-long` | summary > 80 chars | Shorten — cut to the core risk |
| `missing-trigger` | hint/guard with no commandPatterns or pathPatterns | Add regex targeting the specific risky command |
| `tool-only-trigger` | toolNames set but no command/path narrowing | Either add patterns or justify why every invocation of this tool is risky |
| `protocol-has-toolnames` | directive/protocol with non-empty toolNames | toolNames is ignored at session start — remove or change type |
| `weak-solution` | solution is advice ("be careful") not a gate | Rewrite with "Before X, do Y and verify Z" |
| `root-cause-missing` | problem describes symptom not cause | Rewrite to explain why/when this happens |
| `no-eval` | no scenario covers this lesson | Create TC scenario (see eval-workflow.md) |
| `overbroad-regex` | commandPattern matches unintended commands | Narrow the regex or add negative lookahead |
| `version-sensitive` | solution references specific version/date | Remove version claims or make them non-load-bearing |

### Step 4: Patch Fields

Use the CLI — never edit `lessons.db` or `lesson-manifest.json` directly:

```bash
node scripts/lessons.mjs edit --id <id> --patch '{"summary": "Shorter risk statement ≤80 chars"}'
node scripts/lessons.mjs edit --id <id> --patch '{"solution": "Before X, run Y to verify Z."}'
node scripts/lessons.mjs edit --id <id> --patch '{"commandPatterns": ["git\\s+stash(?!\\s+-u)"]}'
node scripts/lessons.mjs edit --id <id> --patch '{"commandMatchTarget": "executable"}'
```

Patchable fields: `summary`, `problem`, `solution`, `type`, `scope`, `toolNames`, `commandPatterns`, `commandMatchTarget`, `pathPatterns`, `priority`, `confidence`, `tags`

### Step 5: Rebuild and Check

```bash
node scripts/lessons.mjs build
node scripts/lessons.mjs doctor
```

Doctor should show no new issues. If it reports `directive/protocol has toolNames`, remove `toolNames` or change the lesson `type` to `hint`.

### Step 6: Verify Trigger Fires Correctly

Check the compiled manifest to confirm regex compiled and pathPatterns look right:

```bash
cat data/lesson-manifest.json | node -e "
  const m=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const l=m.lessons.find(l=>l.id==='<id>');
  console.log('toolNames:', l.toolNames);
  console.log('commandRegexSources:', l.commandRegexSources);
  console.log('pathPatterns:', l.pathPatterns);
"
```

### Step 7: Eval

For any behavior-changing rewrite, one of:
- Run or update an existing scenario (see `references/eval-workflow.md`)
- Create a new scenario (see `references/eval-workflow.md`)
- Document why no eval is needed (mechanical fix, no agent behavior involved)

## Common Lesson Patterns

### Dangerous-default command (e.g., git stash without -u)

```json
{
  "type": "hint",
  "toolNames": ["Bash"],
  "commandPatterns": ["\\bgit\\s+stash(?!\\s+-u|\\s+pop|\\s+list|\\s+drop|\\s+show|\\s+apply)"],
  "commandMatchTarget": "executable",
  "solution": "Before running git stash, check git status for untracked files. Use git stash -u to include them."
}
```

### File-path-scoped hint (fires only on certain file types)

```json
{
  "type": "hint",
  "toolNames": ["Read"],
  "pathPatterns": ["**/*.mjs", "**/*.ts", "**/*.py"],
  "solution": "Use get_symbols_overview first to avoid reading the whole file."
}
```

### Session-start directive (no narrow trigger exists)

```json
{
  "type": "directive",
  "toolNames": [],
  "commandPatterns": [],
  "solution": "At session start, activate the Serena project before reading or editing code."
}
```

## Batch Processing Order

When working through the corpus:

1. Doctor failures that are mechanical (summary length, ignored toolNames on session-start lessons)
2. Overbroad injections (hint/guard with no command or path patterns)
3. High-priority lessons (priority 8-10) — data-loss and irreversible first
4. Session-start protocols/directives — convert to trigger-scoped hints where possible
5. Stale/version-sensitive lessons
6. Low-priority/situational lessons
