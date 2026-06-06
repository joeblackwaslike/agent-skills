# Cookbook: TypeScript Project

**For:** Project-level `CLAUDE.md` or `AGENTS.md`  
**Covers:** Next.js apps, REST/GraphQL APIs, CLI tools, agents, MCP servers  
**Target size:** 30–70 lines  

---

## Template

```markdown
# [Project Name]

[One-sentence description: what this project does and its primary tech stack.]

## Commands

\`\`\`bash
# Development
npm run dev         # or: pnpm dev / yarn dev

# Testing
npm test            # or: vitest / jest
npm run test:watch  # interactive

# Build
npm run build       # or: tsc / tsup / next build

# Lint / type check
npm run lint        # eslint + prettier (or biome)
npm run typecheck   # tsc --noEmit
\`\`\`

## Project Structure

[Only if non-obvious — skip for standard Next.js app-router or Express layouts]
\`\`\`
src/
  app/           # Next.js App Router pages and layouts
  components/    # Shared React components
  lib/           # Utility functions and configs
  server/        # Server actions / tRPC routers
  types/         # Shared TypeScript types
\`\`\`

## Architecture

[1–3 sentences on non-obvious design decisions. Examples:]
- Server Components by default; Client Components only when interactivity requires it
- Data fetching via tRPC — no raw `fetch()` calls in components
- All shared state lives in [Zustand / Jotai / Context] — no prop drilling past 2 levels

## Coding Conventions

- [Async stance: "Fully async — all handlers and service functions are async"]
- [Type safety: "No `any` types — use `unknown` and narrow it"]
- [Import style: "Absolute imports via `@/` alias; no relative imports past 2 levels"]
- [Component style: "Functional components only, no class components"]
- [Error handling: "Throw typed errors from `src/errors.ts`; catch only at API boundaries"]

## Testing

- [Framework: "Vitest for unit/integration, Playwright for E2E"]
- [Mocking stance: "No mocking of DB layer in integration tests — use test DB"]
- [Coverage target: "New features need unit tests; E2E for critical user flows only"]

## Key Dependencies

[Only if there are surprising choices or constraints:]
- Uses [library X] instead of [standard Y] because [reason]
- [library Z] is pinned at [version] — upgrading breaks [thing]
```

---

## Section Guide

**Commands** — the most important section. TypeScript projects vary enormously in their
`package.json` scripts. Don't make Claude guess whether it's `npm test`, `vitest`, `jest`,
or `nx test`. Include the exact commands and any important flags.

**Project Structure** — include for non-standard layouts. Standard Next.js App Router or
a simple Express server don't need this. But a monorepo package, a custom domain-driven
layout, or a project that diverges from the framework's conventions does.

**Architecture** — the decisions that determine what layer Claude should write code in.
Data fetching patterns (tRPC vs. fetch, server actions vs. API routes), state management
approach, and component boundaries are the most consequential for TypeScript projects.

**Coding Conventions** — focus on TypeScript-specific rules that can't be inferred from
`tsconfig.json` or ESLint config. Type strictness stance, error handling patterns, and
import organization are the highest-value conventions to document.

**Testing** — state the testing philosophy. "Never mock the database" or "integration tests
use real Postgres" prevents Claude from adding mocks that would defeat the purpose of the
tests.

---

## Variants

**Next.js App Router:**
Add: Server vs. Client Component decision rules, data fetching pattern (server actions,
Route Handlers, tRPC), caching strategy, Tailwind conventions.

**REST API (Express, Fastify, Hono):**
Add: Route organization, middleware order, request/response type patterns,
OpenAPI/schema-first stance.

**CLI tool:**
Add: Entry point, argument parsing library (Commander, oclif, yargs), output format
conventions, exit code policy.

**Agent / LLM application:**
Add: Model/provider abstraction (if any), tool/function naming conventions, streaming
vs. non-streaming stance. Also consider using `references/cookbook/agent-mcp-project.md`.

**MCP server:**
Use `references/cookbook/agent-mcp-project.md` instead — it covers the MCP-specific
patterns in more depth.

---

## Common Pitfalls

- **Not stating the React Server Components stance:** With Next.js App Router, "should this
  be a Server Component?" is the most common decision point. State your default.
- **Forgetting `pnpm` vs `npm`:** If the project uses `pnpm` and Claude runs `npm install`,
  it creates a `package-lock.json` that conflicts with `pnpm-lock.yaml`. State the package
  manager explicitly.
- **Omitting the type strictness level:** `strict: true` in tsconfig doesn't tell Claude
  whether `any` is acceptable in pragmatic situations. State your stance.
- **Not mentioning monorepo tooling:** If this is a Turborepo/Nx workspace, say so.
  Commands like `turbo build` or `nx run web:dev` differ from bare `npm run build`.
