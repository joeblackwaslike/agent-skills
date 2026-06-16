# Vercel platform: the four interfaces

This is a hand-written orientation aid. The authoritative, auto-fetched docs live
flat in this `references/` directory (the `vercel.com/docs` tree, minus the REST
API). Grep them for specifics; use this page to decide *which* interface to reach
for.

> **REST API & OpenAPI spec live in the sibling skill `working-with-vercel-api`** —
> this skill (`working-with-vercel`) covers the CLI, the MCP server, and the
> platform concepts.

## 1. The CLI — `vercel` / `vc`

Interactive and CI use: deploy, run a local replica, manage env vars, domains, DNS,
storage, and project config from a terminal.

- **Install:** `npm i -g vercel` (or `pnpm`/`yarn`/`bun`). Experimental native binary:
  `pnpm i -g @vercel/vc-native -f`.
- **Auth:** `vercel login` interactively; in CI set `VERCEL_TOKEN` (preferred) or pass
  `--token`. `--token` beats the env var when both are set, but it leaks into process
  lists/logs — use the env var in CI.
- **Everyday commands:** `vercel` / `vercel deploy [--prod]`, `vercel dev`,
  `vercel build`, `vercel env pull/add/ls`, `vercel link`, `vercel pull`,
  `vercel domains`, `vercel dns`, `vercel alias`, `vercel logs`, `vercel redeploy`,
  `vercel rollback`, `vercel promote`, `vercel inspect`.
- **Newer surface:** `vercel blob`, `vercel edge-config`, `vercel firewall`,
  `vercel rolling-release`, `vercel crons`, `vercel mcp` (writes MCP client config),
  `vercel api` (authenticated raw REST calls), `vercel agent` (writes an `AGENTS.md`).
- Full command index: [`docs__cli.md`](docs__cli.md); global flags:
  `docs__cli__global-options.md`; per-command pages: `docs__cli__<cmd>.md`.

## 2. The MCP server — `https://mcp.vercel.com`

Official **hosted, remote** MCP server (OAuth, not a static token) that lets AI agents
operate against a live Vercel account. Add it with `npx add-mcp https://mcp.vercel.com`
or `vercel mcp`. Supported by Claude Code, Claude.ai, ChatGPT, Codex, Cursor, VS Code
Copilot, Windsurf, Gemini CLI, and more.

Representative tools: `search_documentation`, `list_teams`, `list_projects`,
`get_project`, `list_deployments`, `get_deployment`, `get_deployment_build_logs`,
`get_runtime_logs`, `deploy_to_vercel`, `use_vercel_cli`,
`check_domain_availability_and_price`, `buy_domain`, plus toolbar/comment tools.

Reach for the MCP server when an agent needs **live** account access (deploy, read
build/runtime logs, inspect projects) or the freshest docs. Docs:
[`docs__agent-resources__vercel-mcp.md`](docs__agent-resources__vercel-mcp.md) and
`docs__agent-resources__vercel-mcp__tools.md`.

## 3. The REST API — `https://api.vercel.com`  → sibling skill

Programmatic platform control. Bearer-token auth (`Authorization: Bearer $VERCEL_TOKEN`),
versioned per-endpoint (`/v1/`, `/v8/`, `/v9/`, …), team-scoped via a `teamId`/`slug`
param. The exact endpoint shapes (paths, params, schemas) and the `@vercel/sdk`
TypeScript client live in **`working-with-vercel-api`** (the OpenAPI spec + REST
reference).

## 4. The `@vercel/sdk` (TypeScript)  → sibling skill

A typed, generated client wrapping the REST API. Prefer it over hand-rolled `fetch`
when writing TS automation. Covered in **`working-with-vercel-api`**.

## Shared auth model

| Interface | Auth |
| --- | --- |
| CLI | `vercel login`, or `VERCEL_TOKEN` / `--token` in CI |
| REST API | `Authorization: Bearer <token>` |
| `@vercel/sdk` | token passed to the client |
| MCP server | OAuth (browser flow), no static token |

Create tokens at the account **Tokens** page. Tokens can be personal or team-scoped;
team-scoped REST calls also need the `teamId`/`slug` param.

## When to use which

- **One-off / local dev / shell scripts** → CLI.
- **Programmatic automation, CI orchestration, dashboards** → REST API / `@vercel/sdk`
  (`working-with-vercel-api`).
- **An AI agent acting on a live account** → MCP server.
