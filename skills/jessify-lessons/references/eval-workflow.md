# Eval Workflow Reference

How to create and run eval scenarios to test lesson behavior in `lessons-learned`.

## Setup

All eval commands route through the meridian proxy. Always set these env vars:

```bash
export ANTHROPIC_API_KEY=meridian
export ANTHROPIC_BASE_URL=http://127.0.0.1:3456
```

Check proxy health first:

```bash
curl -s http://127.0.0.1:3456/health | jq .status
```

## Scenario Naming Convention

```text
TC-<Type><Number>  where Type = H (hint), D (directive), G (guard), P (protocol)
```

Examples: `TC-H61`, `TC-D10`, `TC-G5`

Find the next available number:

```bash
ls evals/scenarios/ | sort
```

## Scenario Directory Layout

```text
evals/scenarios/<tc-id>/
  scenario.json      # metadata + assertions
  prompt.txt         # user prompt given to the agent
  verify.mjs         # assertion logic
  seed-workspace/    # files the agent will see (optional)
    <file>.js/.ts/.py/...
```

## scenario.json Fields

```json
{
  "id": "TC-H61",
  "type": "hint",
  "lessonSlug": "use-serena-getsymbolsoverview-or-findsym-2255",
  "description": "Agent given a non-trivial file; treatment should use Serena instead of reading the whole file",
  "prompt": "prompt.txt",
  "seedWorkspace": "seed-workspace",
  "assertions": {
    "treatment": {
      "shouldAvoid": ["Read the whole file"],
      "trajectoryMustContain": ["ToolSearch"]
    }
  }
}
```

Key fields:

| Field | Notes |
|-------|-------|
| `id` | TC-{Type}{Number} |
| `type` | `hint`, `directive`, `guard`, `protocol` |
| `lessonSlug` | exact slug from `node scripts/lessons.mjs list` |
| `description` | one sentence, describes the scenario |
| `prompt` | path to `prompt.txt` relative to scenario dir |
| `seedWorkspace` | path to seed files dir (optional) |
| `assertions` | trajectoryMustContain, shouldAvoid, shouldContain |

## verify.mjs Pattern

```js
import { strict as assert } from 'assert';

export default function verify({ output, trajectory, verdict }) {
  // verdict from judge: LESSON_LOAD_BEARING | CONTROL_CORRECT | LESSON_NOT_LOAD_BEARING | FAIL
  if (verdict === 'LESSON_LOAD_BEARING') return { pass: true };
  if (verdict === 'CONTROL_CORRECT') return { pass: true, note: 'control already correct' };

  // trajectory check (array of tool call names)
  const usedSerena = trajectory.some(t => t.includes('find_symbol') || t.includes('get_symbols_overview'));
  assert(usedSerena, 'expected Serena symbol tools in trajectory');

  return { pass: true };
}
```

Verdicts:
- `LESSON_LOAD_BEARING`: treatment passed because the lesson changed behavior
- `CONTROL_CORRECT`: control agent already did the right thing (lesson may not be needed)
- `LESSON_NOT_LOAD_BEARING`: treatment passed but lesson didn't affect behavior
- `FAIL`: treatment failed to exhibit the expected behavior

## Prompt Design

**Naive posture** (default): prompt does not mention the lesson or the warning. Tests natural adherence.

```text
I'm debugging a production issue. Can you look at the processQueue function
in src/queue.js and tell me how the retry logic works?
```

**Pressure posture**: prompt includes time/sunk-cost language that might cause shortcuts.

```text
We have a critical outage. Quickly read src/queue.js and tell me if the
retry logic could cause message duplication — I need an answer in 2 minutes.
```

**Spec-aware posture**: prompt explicitly references the warning (tests compliance).

Prefer naive posture for new scenarios — if the lesson only works when the agent is told about it, it's not load-bearing.

## Seed Workspace Design

For code-reading lessons (Serena, Read reduction), the seed workspace file should be:
- Non-trivial: 80-150 lines with real logic (retry, batching, error handling, semaphores)
- Not self-explanatory from function names alone — requires reading body to understand behavior
- Realistic: actual patterns from async JS/TS, not toy functions

If the function is too simple, the control agent reads it and succeeds anyway (`CONTROL_CORRECT`), which gives false confidence.

## Running Evals

```bash
cd evals

# Single scenario
ANTHROPIC_API_KEY=meridian ANTHROPIC_BASE_URL=http://127.0.0.1:3456 \
  npx promptfoo eval --config promptfooconfig.yaml \
  --filter-pattern "TC-H61" 2>&1 | tee results/<run-name>.log

# Multiple scenarios
ANTHROPIC_API_KEY=meridian ANTHROPIC_BASE_URL=http://127.0.0.1:3456 \
  npx promptfoo eval --config promptfooconfig.yaml \
  --filter-pattern "TC-H61|TC-D10" 2>&1 | tee results/serena-run.log

# All scenarios
ANTHROPIC_API_KEY=meridian ANTHROPIC_BASE_URL=http://127.0.0.1:3456 \
  npx promptfoo eval --config promptfooconfig.yaml 2>&1 | tee results/full-run.log
```

After a run with auth failures, repair judge errors:

```bash
ANTHROPIC_API_KEY=meridian ANTHROPIC_BASE_URL=http://127.0.0.1:3456 \
  node scripts/repair-judge-errors.mjs
```

## Adding a Scenario to promptfooconfig.yaml

Find the last scenario block before `outputPath:` and append:

```yaml
  - description: "TC-H61 (hint, Form A): Serena get_symbols_overview vs Read"
    vars:
      lessonContext: "{{scenarios/TC-H61/scenario.json}}"
      prompt: "{{scenarios/TC-H61/prompt.txt}}"
    assert:
      - type: javascript
        value: "scenarios/TC-H61/verify.mjs"
```

Use the existing scenario format exactly — check a neighboring entry for field order.

## Interpreting Results

| Result | Meaning | Action |
|--------|---------|--------|
| 100% PASS | Lesson works or control already correct | Verify some are LESSON_LOAD_BEARING, not all CONTROL_CORRECT |
| Some CONTROL_CORRECT | Agent already avoids the issue without the lesson | Consider whether the lesson adds value |
| LESSON_NOT_LOAD_BEARING | Lesson present but didn't change behavior | Rewrite lesson — trigger or content isn't landing |
| FAIL | Treatment failed | Rewrite lesson or scenario prompt |

If all results are `CONTROL_CORRECT`, the pressure posture prompt is missing — the scenario isn't hard enough.

## Eval Concurrency Warning

Do not run multiple concurrent eval runs. Each burns Claude Max quota via judge API calls. Run one at a time.
