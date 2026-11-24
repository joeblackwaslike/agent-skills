# Cursor Rules Guide

Cursor Rules are the primary mechanism for injecting persistent, structured context into the AI's understanding of your project. They live in `.cursor/rules/` as `.mdc` files and are the most powerful tool in a Cursor plugin for shaping AI behavior.

## File Format

Rules use a `.mdc` extension (Markdown with YAML frontmatter). Plain `.md` files in `.cursor/rules/` are **silently ignored**.

```yaml
---
description: Brief description of when/what this rule covers
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---
# Rule Title

Rule body in standard Markdown...
```

### Frontmatter Fields

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `description` | string | No | Used by Agent Requested mode — the AI reads this to decide relevance |
| `globs` | string[] | No | File patterns — rule auto-attaches when matching files are in context |
| `alwaysApply` | boolean | No (default: false) | If true, loads the rule in every single request |

**You can combine fields**: A rule can have both `globs` (auto-attach) and a `description` (agent requested as a fallback).

## Activation Modes

### 1. Always Apply (`alwaysApply: true`)

Rule is injected into **every request** regardless of files or topic.

```yaml
---
alwaysApply: true
---
This is the TurboSaaS monorepo. Stack: TypeScript, Next.js 15, Drizzle ORM, Supabase.
- Do not use `any` type
- Prefer `const` over `let`
- All async functions must handle errors
```

**Token budget**: Keep under 200 words. Every request pays this cost.

**Use for**: Project identity, universal coding standards, non-negotiable constraints.

### 2. Auto Attached (via `globs`)

Rule injects automatically when files matching the glob pattern appear in the conversation context.

```yaml
---
globs: ["**/*.test.ts", "**/*.spec.ts", "**/test/**"]
alwaysApply: false
---
# Testing Standards

Use Vitest. Write `describe`/`it` blocks. Avoid `beforeAll` — prefer `beforeEach`.
Mock at module level with `vi.mock('module-path')`.
```

**Use for**: Framework-specific guidance, file-type conventions, domain-specific rules.

### 3. Agent Requested (via `description` only)

The AI reads the `description` field and decides whether to load the rule based on relevance to the user's request.

```yaml
---
description: REST API design patterns, endpoint naming conventions, and HTTP status codes for this project
alwaysApply: false
---
# API Design Reference
[detailed reference content — can be long since it only loads when relevant]
```

**Writing effective descriptions**: Write them like a semantic search query. "REST API design patterns and endpoint naming" is better than "Use for API stuff".

**Use for**: Reference material, domain knowledge, heavy docs that shouldn't always load.

### 4. Manual (no fields set)

Rule only loads when user explicitly mentions it in chat with `@rule-name`.

```yaml
---
# No frontmatter fields — manual invocation only
---
# Full Database Schema
[Complete schema dump — too large for automatic injection]
```

**Use for**: Heavy reference content, one-off lookups, content users explicitly request.

## Glob Syntax

Cursor uses standard glob patterns. Common mistakes:

```yaml
# ✅ Recursive — matches src/components/Button.tsx
globs: ["src/**/*.tsx"]

# ❌ Non-recursive — only matches src/Button.tsx (direct children)
globs: ["src/*.tsx"]

# ✅ Multiple extensions
globs: ["**/*.{ts,tsx}"]

# ✅ Multiple patterns
globs: ["**/*.ts", "**/*.tsx", "!**/*.d.ts"]

# ✅ Path segment matching
globs: ["**/api/**"]   # any path containing /api/
```

## Writing Good Rules

### Be Actionable, Not Descriptive

```yaml
# ❌ Descriptive (tells the AI what exists, not what to do)
We use TypeScript and have a strict tsconfig.

# ✅ Actionable (tells the AI what to do)
Always use strict TypeScript. Never use `any`. Prefer `unknown` for external data.
Enable `strict: true` — do not add `// @ts-ignore` without explaining why.
```

### Token Efficiency for Always-On Rules

```yaml
# ❌ Verbose always-on rule
This project is called TurboSaaS and it was founded in 2023. We are building
a SaaS platform for small businesses. Our main technology choices include
TypeScript for type safety, Next.js for the frontend framework, and we use
Drizzle ORM for database access with Supabase as our Postgres host...

# ✅ Dense always-on rule (same information, fraction of the tokens)
TurboSaaS monorepo: Next.js 15 (app router), Drizzle ORM, Supabase Postgres.
No `any`. Prefer `unknown`. Use `server actions` not API routes for mutations.
Tests: Vitest + Playwright. CI: GitHub Actions.
```

### Optimal Rule Count

- 1 always-on base context rule
- 3-4 auto-attached file-type rules
- 1-2 agent-requested reference rules
- As many manual rules as needed (they're free until invoked)

Total: 5-8 rules per project. More dilutes effectiveness.

## Team Sharing

Commit `.cursor/rules/` to version control:

```bash
git add .cursor/rules/
git commit -m "feat: add cursor rules for team consistency"
```

All team members who open the repo in Cursor will automatically get the rules.

**Tip**: Add a brief comment in each rule's body explaining its purpose and last-updated date, so teammates know what they're inheriting.

## Rules vs Skills vs System Prompts

| | Rules | Skills | System Prompt |
|---|---|---|---|
| **Persistence** | Per-request (conditional or always) | On-demand | Always |
| **Scope** | Project or global | Plugin or global | Global |
| **Content** | Context/guidance | Workflow instructions | Core behavior |
| **Activation** | Automatic or manual | Manual (`/skill`) | Always |
| **Token cost** | Conditional | Only when invoked | Always |

**Choose Rules when**: You want context injected automatically based on what files or topics are relevant.

**Choose Skills when**: You have a complex multi-step workflow the agent executes on demand.

## Migrating from `.cursorrules`

The old single `.cursorrules` file at the project root is deprecated in favor of `.cursor/rules/*.mdc`. Migration:

```bash
# Create rules directory
mkdir -p .cursor/rules

# Move content into an always-on .mdc file
cat > .cursor/rules/base.mdc << 'EOF'
---
alwaysApply: true
---
[paste your .cursorrules content here]
EOF

# Remove old file (optional — both still work for now)
rm .cursorrules
```

Then refactor by splitting into multiple targeted rules where appropriate.
