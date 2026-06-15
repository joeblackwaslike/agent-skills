---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/.gemini/skills/behavioral-evals/references/running.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "7a6203d9d546b95ceec5b40d14c4ba47d1db4886ac97fcdadf31aa933a8af2ed"
---

# Running & Promoting Evals

## 🛠️ Prerequisites

Behavioral evals run against the compiled binary. You **must** build and bundle
the project first after making changes:

```bash
npm run build && npm run bundle
```

---

## 🏃‍♂️ Running Tests

### 1. Configure Environment Variables

Evals require a standard API key. If your `.env` file has multiple keys or
comments, use this precise extraction setup:

```bash
export GEMINI_API_KEY=$(grep '^GEMINI_API_KEY=' .env | cut -d '=' -f2) && RUN_EVALS=1 npx vitest run --config evals/vitest.config.ts <file_name>
```

### 2. Commands

| Command                             | Scope           | Description                                        |
| :---------------------------------- | :-------------- | :------------------------------------------------- |
| `npm run test:always_passing_evals` | `ALWAYS_PASSES` | Fast feedback, runs in CI.                         |
| `npm run test:all_evals`            | All             | Runs nightly incubation tests. Sets `RUN_EVALS=1`. |

### Target Specific File

_Note: `RUN_EVALS=1` is required for incubated (`USUALLY_PASSES`) tests._

```bash
RUN_EVALS=1 npx vitest run --config evals/vitest.config.ts my_feature.eval.ts
```

---

## 🐞 Debugging and Logs

If a test fails, verify:

- **Tool Trajectory Logs**:序列 of calls in `evals/logs/<test_name>.log`.
- **Verbose Reasoning**: Capture raw buffer traces by setting
  `GEMINI_DEBUG_LOG_FILE`:
  ```bash
  export GEMINI_DEBUG_LOG_FILE="debug.log"
  ```

---

### 🎯 Verify Model Targeting

- **Tip:** Standard evals benchmark against model variations. If a test passes
  on Flash but fails on Pro (or vice versa), the issue is usually in the **tool
  description**, not the prompt definition. Flash is sensitive to "instruction
  bloat," while Pro is sensitive to "ambiguous intent."

---

## 🚥 deflaking & Promotion

To maintain CI stability, all new evals follow a strict incubation period.

### 1. Incubation (`USUALLY_PASSES`)

New tests must be created with the `USUALLY_PASSES` policy.

```typescript
evalTest('USUALLY_PASSES', { ... })
```

They run in **Evals: Nightly** workflows and do not block PR merges.

### 2. Investigate Failures

If a nightly eval regresses, investigate via agent:

```bash
gemini /fix-behavioral-eval [optional-run-uri]
```

### 3. Promotion (`ALWAYS_PASSES`)

Once a test scores 100% consistency over multiple nightly cycles:

```bash
gemini /promote-behavioral-eval
```

_Do not promote manually._ The command verifies trajectory logs before updating
the file policy.
