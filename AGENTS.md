# agent-skills

A Claude Code plugin that bundles all of my custom developed skills for easy installation in any agent environment.

## Plugin Development

When working on or developing this plugin (modifying hooks, commands, skills, or plugin.json), load these before making any structural changes:

- `plugin-dev@claude-plugins-official` — canonical directory layout, manifest spec, hook wiring format, command frontmatter rules
- `skill-creator@claude-plugins-official` — skill description quality, progressive disclosure, trigger reliability, writing style

## Auto-generated docs convention

Doc-wrapping skills keep `references/` current via `skills/<name>/scripts/update*.{js,sh}` (exit non-zero on failure; generated files are committed, not gitignored). `Makefile` + CI auto-discover the glob — no registration needed. Run `make update-all` / `make update-<name>` / `make list-update-scripts`. A weekly GitHub Action (`.github/workflows/update-docs.yml`, Mon 4am UTC) runs them and commits changes.

Fetched docs carry `source`/`fetched_at`/`sha256` frontmatter (the sha drives change-detection, so unchanged content doesn't churn timestamps); each `SKILL.md` carries `metadata.last_updated`. Both flow through `scripts/lib/doc-frontmatter.cjs`. See `authoring-agent-skills` for the full doc-fetching + freshness cookbook (`withFrontmatter`/`setSkillLastUpdated`, `node scripts/backfill-last-updated.cjs`).

## Agent Instruction Files (CLAUDE.md / AGENTS.md)

**CLAUDE.md is the source of truth.** Key cross-tool differences to remember when creating or editing instruction files:

- **Claude Code** reads `CLAUDE.md`. Supports `@filename` import syntax (e.g. `@AGENTS.md` pulls that file inline).
- **Codex CLI** reads `AGENTS.md` as plain Markdown — **no `@file` import/include syntax exists**. Writing `@CLAUDE.md` in AGENTS.md does nothing; Codex just sees it as a broken line.
- **Best pattern:** Write everything in `AGENTS.md`. Add `project_doc_fallback_filenames = ["CLAUDE.md"]` to `~/.codex/config.toml` so Codex reads CLAUDE.md when AGENTS.md is absent. Delete or omit CLAUDE.md.
- **Codex plugin commands:** `codex plugin marketplace add/upgrade/remove` only. There is **no `codex plugin install`** subcommand.

## Available Skills

Invoke with `skill("name")` (Codex syntax) or via the Skill tool in Claude Code:

| Skill | When to Invoke |
| --- | --- |
| `best-practices-for-agentic-development` | Before designing agents, MCP servers, multi-step workflows, or skill systems |
| `working-with-claude-code` | Working with Claude Code CLI, plugins, hooks, MCP, skills, or any Claude Code feature |
| `developing-claude-code-plugins` | Creating, modifying, testing, or releasing Claude Code plugins |
| `working-with-codex` | Working with the Codex CLI, plugins, skills, hooks, configuration, or any Codex feature |
| `developing-codex-plugins` | Creating, modifying, testing, or releasing Codex plugins |
| `working-with-gemini` | Working with Gemini CLI or Antigravity CLI — extensions, skills, hooks, configuration |
| `developing-gemini-plugins` | Creating, modifying, testing, or releasing Gemini CLI extensions or Antigravity plugins |
| `working-with-opencode` | Working with OpenCode CLI — skills, plugins, configuration, commands, agents |
| `developing-opencode-plugins` | Creating, modifying, testing, or releasing OpenCode skills or npm/Bun plugins |
| `working-with-cursor` | Working with Cursor IDE rules, skills, plugins, MCP servers, or any Cursor feature |
| `developing-cursor-plugins` | Creating, modifying, testing, or releasing Cursor plugins |
| `working-with-pieces` | Working with Pieces OS, Desktop, CLI, IDE/browser/Obsidian plugins, MCP server, long-term memory, TypeScript or Python SDKs |
| `multi-provider-plugins` | Making a plugin compatible with multiple AI coding assistants (Claude Code, Codex, Gemini, OpenCode, etc.) |
| `web-research` | Any web search, URL fetching, or multi-source research task |
| `working-with-github-actions` | Building, configuring, debugging, or optimizing GitHub Actions CI/CD workflows — syntax, triggers, runners, caching, matrix, OIDC deployments, release-please, CodeQL, dependabot |
| `working-with-git` | Any git command/flag, rewriting history, bisect, conflicts, reflog recovery, git servers — AsciiDoc reference pinned to a Homebrew-resolved Git version + the Pro Git book + how-to playbooks |
| `working-with-github` | GitHub the platform — gh CLI (pinned), REST + GraphQL APIs, rate limits/efficiency, tokens, PRs, code review, issues, releases & assets, branch protection/rulesets, GitHub flow, multi-branch release, Dependabot/CodeQL config |
| `developing-for-github` | Building on GitHub — GitHub Apps, OAuth apps, webhooks (signature verification), and the Octokit JS/TS SDKs (app auth: JWT → installation token) |
| `git-github-workflows` | Git/GitHub router — selects the right action or reference skill for any git/GitHub task; invoke at the start of any git/GitHub operation |
| `devcontainers` | Building, using, modifying, developing, or distributing dev containers |
| `docusaurus-docs-builder` | Building or updating Docusaurus documentation sites |
| `github-readme-overhaul` | Writing or overhauling a GitHub README |
| `interactive-system-docs` | Creating self-contained interactive HTML system visualizations |
| `vscode-extension-builder-lawvable` | Building VS Code extensions |
| `agent-instructions` | Creating CLAUDE.md, AGENTS.md, GEMINI.md, or other AI instruction files at any scope level (user/global, project, subdirectory) — includes cookbook templates for Python, TypeScript, monorepo, and agent/MCP projects |
| `domain-driven-design` | Modeling a business domain or backend architecture — DDD (strategic + tactical), CQRS, event sourcing, aggregates, value objects, bounded contexts, hexagonal/clean architecture; framework-agnostic examples in TypeScript and Python |
| `working-with-vercel-ai-sdk` | Working with the Vercel AI SDK (`ai` package) — generateText/streamText, generateObject, embeddings, tools, agents (ToolLoopAgent), UI hooks (useChat), RSC, providers, migrations; comprehensive offline docs from ai-sdk.dev |
| `authoring-agent-skills` | Creating/maintaining a skill in this repo — naming taxonomy (working-with-X / developing-X / topic), SKILL.md frontmatter, the doc-fetching cookbook (llms.txt / sitemap / curated-list), the `doc-frontmatter.cjs` freshness helpers, Makefile/CI auto-discovery, and the registration checklist |
| `working-with-beads` | Working with the beads CLI (`bd`) — offline CLI reference generated from the pinned binary (`bd <cmd> --help`, `bd prime`) plus upstream repo docs, pinned to a known version. Use for any `bd` command/flag/concept lookup |
| `beads-operations` | Running/maintaining/troubleshooting beads day-to-day — bd vs TodoWrite, Joe's shared-server conventions (port 3308, `--skip-agents`), the ready→claim→note→close loop, compaction recovery, and broken-state recovery |
| `working-with-dolt` | Working with Dolt — version-controlled "Git for data" SQL DB (branch/diff/merge over MySQL wire). Offline `dolt` CLI reference from the pinned binary + dolthub.com docs, plus the shared `dolt sql-server` runbook (port 3308). Any `dolt` command/concept lookup |
| `working-with-vercel` | Vercel **hosting platform** — the `vercel` CLI, hosted MCP server (mcp.vercel.com), and platform concepts (deploys, domains, DNS, env, functions, edge config, blob, firewall). Offline vercel.com/docs. REST API → `working-with-vercel-api`; `ai` pkg → `working-with-vercel-ai-sdk` |
| `working-with-vercel-api` | Vercel **REST API** + `@vercel/sdk` — the complete OpenAPI spec (every endpoint/param/schema) plus auth (bearer/`VERCEL_TOKEN`), team scoping, versioning, pagination, errors. CLI/MCP/platform → `working-with-vercel` |
| `working-with-zsh` | Working with Zsh — any command/builtin/option/glob/expansion lookup, Bash→Zsh migration, startup-file config, completion (`compinit`/`zstyle`) & ZLE. The complete manual generated verbatim from the pinned `zsh` man pages, plus snapshot-fetched ecosystem docs (Oh My Zsh, Prezto, zinit/antidote/sheldon, Powerlevel10k/Starship/Oh My Posh, plugins) and hand-written migration/comparison/cookbook guides |
| `working-with-bash` | Working with Bash — any command/builtin/option (`shopt`/`set -o`)/parameter-expansion/`[[ ]]`/glob lookup, `.bashrc`/`.inputrc` config, POSIX-sh portability & Bash↔Zsh differences, strict mode & quoting/word-splitting bugs, completion, Readline/history. Version-exact `man bash` (pinned bash 5.3.9) + the fetched GNU Bash Reference/Readline/History manuals, snapshot-fetched ecosystem docs (oh-my-bash, bash-it, basher/bpkg, ble.sh, Starship/Oh My Posh/Powerline, ShellCheck/shfmt/bats), a community corpus (pure-bash-bible, Google style guide, POSIX spec, BashPitfalls), and hand-written guides incl. a pitfalls/safety guide |
| `working-with-release-please` | Release automation with **release-please** (Google) — Conventional Commits → version bump + `CHANGELOG.md` + GitHub Release via an always-up-to-date "release PR". Covers `release-please-config.json`/`.release-please-manifest.json`, manifest/monorepo mode, all `release-type` strategies, and `release-please-action@v5` CI wiring (permissions, `release_created`/`releases_created` outputs, gating downstream publish jobs). Upstream README/docs/JSON-schemas fetched at the pinned tag (release-please 17.9.0, action 5.0.0) + hand-written integration/changelogs/GitHub-Actions/advanced/troubleshooting guides and cookbooks for npm, pip/PyPI, and VS Code extension releases. Two gotchas baked in: the action is `@v5` (tutorials show stale `@v4`), and release-please only versions+changelogs+tags — **publishing is a separate, gated CI job**. Raw `gh`/REST → `working-with-github`; CI YAML → `working-with-github-actions` |

## Common Workflows

> **Gemini CLI / Antigravity users:** Instruction files use `skill()` (Codex syntax). See `GEMINI.md` for `activate_skill()` syntax.

**Starting agentic/plugin work:** Load `best-practices-for-agentic-development` first.

**Plugin development (any platform):** pair `working-with-<platform>` (official docs) with `developing-<platform>` (workflow) — for Claude Code, Codex, Gemini/Antigravity, OpenCode, or Cursor. Cross-platform: `multi-provider-plugins`.

**GitHub Actions CI/CD:** `working-with-github-actions` for workflow syntax, cookbooks, action versions, and OIDC deployments.

**Git & GitHub:** start at `git-github-workflows` (router). It routes to `working-with-git` (git commands, history rewriting, bisect, conflicts, git servers), `working-with-github` (gh CLI, REST/GraphQL, tokens, PRs, code review, issues, releases, branch protection, Dependabot/CodeQL config), `developing-for-github` (GitHub Apps, OAuth, webhooks, Octokit), and `working-with-github-actions` (CI/workflow YAML).

**Release automation:** `working-with-release-please` for setting up release-please (new or existing repo), changelog/version/GitHub-release mechanics, the `release-please-action@v5` CI wiring, and cookbooks for shipping npm/pip/VS Code releases. Pairs with `working-with-github` (raw release/asset commands) and `working-with-github-actions` (general CI YAML).

**Domain modeling / backend architecture:** `domain-driven-design` for strategic + tactical DDD, CQRS, event sourcing — with complete TypeScript and Python examples.

**Authoring a new skill in this repo:** `authoring-agent-skills` for the naming taxonomy, doc-fetching cookbook (llms.txt/sitemap), freshness-metadata conventions, and registration checklist — then `skill-creator` for generic description/triggering quality.

**Beads task management:** `beads-operations` for setup conventions, the core workflow, and the troubleshooting runbook; `working-with-beads` for the exact CLI reference at the pinned version. These supersede the third-party `beads` plugin's guidance.

**Dolt / the data engine under beads:** `working-with-dolt` for the `dolt` CLI reference + dolthub.com docs and the shared `dolt sql-server` runbook (port 3308).
