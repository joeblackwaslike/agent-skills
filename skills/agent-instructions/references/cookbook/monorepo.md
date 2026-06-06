# Cookbook: Monorepo

**For:** Monorepos with distinct packages, teams, or language layers  
**Covers:** Turborepo, Nx, pnpm workspaces, Python multi-package repos  
**Target size:** Root 30–60 lines + per-package 10–30 lines each  

Monorepos need a two-level instruction strategy: a root file that establishes shared
conventions, and per-package (or per-path) files that capture package-specific rules.
Avoid putting package-specific content in the root — it creates noise for work that
never touches that package.

---

## Root File Template (`CLAUDE.md` at repo root)

```markdown
# [Monorepo Name]

[One sentence on what this monorepo contains and who maintains it.]

## Packages

| Package | Path | Purpose |
| --- | --- | --- |
| `@org/api` | `packages/api/` | FastAPI backend service |
| `@org/web` | `packages/web/` | Next.js frontend |
| `@org/shared` | `packages/shared/` | Shared types and utilities |
| `@org/workers` | `packages/workers/` | Background jobs |

## Commands

\`\`\`bash
# Run across all packages
pnpm dev                      # or: turbo dev / nx run-many -t dev

# Run in a specific package
pnpm --filter @org/api test
cd packages/api && [command]

# Build everything
pnpm build                    # or: turbo build

# Install dependencies (always from root)
pnpm install
\`\`\`

## Shared Conventions

[Only conventions that span ALL packages:]
- Commit format: Conventional Commits (`feat:`, `fix:`, `chore:`)
- PRs require 2 approvals; squash-merge only
- [Shared linting/formatting config location, if any]
- [Shared CI pipeline notes, if non-obvious]

## Package-Specific Instructions

Each package has its own `CLAUDE.md` (or `.claude/rules/`) with build commands,
architecture notes, and conventions specific to that package. Read those when
working in a package.

@packages/api/CLAUDE.md
@packages/web/CLAUDE.md
@packages/shared/CLAUDE.md
```

---

## Per-Package File Template

Place at `packages/[name]/CLAUDE.md` (or use `.claude/rules/` with paths frontmatter):

```markdown
# [Package Name]

[One-sentence purpose and primary tech.]

## Commands

\`\`\`bash
# Run from package dir, or prefix with: pnpm --filter @org/[name]
[build command]
[test command]
[dev command]
\`\`\`

## Architecture

[1–3 sentences on non-obvious design decisions specific to this package.]

## Conventions

[Non-obvious rules specific to this package:]
- [async stance, error handling, layer boundaries, etc.]
```

---

## Path-Scoped Rules via `.claude/rules/`

Instead of per-package `CLAUDE.md` files, you can use `.claude/rules/` for path-scoped
instructions. This keeps all rules in one place but still loads them selectively.

```
.claude/
  rules/
    api-conventions.md     ← loads for src/api/**
    web-conventions.md     ← loads for src/web/**
    shared-types.md        ← loads for packages/shared/**
```

Each rule file needs a `paths` frontmatter:

```markdown
---
paths:
  - "packages/api/**"
  - "src/api/**"
---

## API Package Conventions

- All database access through repository classes in `src/repositories/`
- No ORM methods in route handlers — delegate to services
- All responses are Pydantic models — no bare dicts
```

---

## When to Use Which Approach

| Approach | Best when |
| --- | --- |
| Nested `CLAUDE.md` per package | Packages are large enough for their own context; different teams own them |
| `.claude/rules/` with paths | Smaller rule sets; prefer rules in one location; cross-cutting path patterns |
| Both | Root `CLAUDE.md` + `@import` per package for large team monorepos |

---

## Cross-Package Import Pattern

For shared conventions that multiple packages need, write them once and import:

```markdown
<!-- packages/api/CLAUDE.md -->
@docs/shared-conventions.md

## API-Specific Conventions
...
```

```markdown
<!-- packages/web/CLAUDE.md -->
@docs/shared-conventions.md

## Web-Specific Conventions
...
```

This prevents shared content from diverging across package files.

---

## Common Pitfalls

- **Root file too large:** The root file loads on every session in the monorepo,
  even when working only in `packages/api/`. Keep it to shared-only content.
- **Duplicate conventions:** If the same rule appears in both the root file and a
  package file, it will diverge. Use `@import` to share a single source.
- **Missing package table:** Listing packages with their paths and purpose in the root
  file is the highest-value addition — it lets Claude know what's in the repo before
  navigating it.
- **Build command confusion:** In pnpm workspaces, running `npm test` in a package
  directory uses the wrong lock file. Document the correct invocation pattern clearly.
