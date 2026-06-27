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

The full skill catalog — one row per skill with when-to-invoke triggers — lives in **[SKILLS.md](SKILLS.md)**; register new skills there. The curated entry points are summarized in **Common Workflows** below.

## Common Workflows

> **Gemini CLI / Antigravity users:** Instruction files use `skill()` (Codex syntax). See `GEMINI.md` for `activate_skill()` syntax.

**Starting agentic/plugin work:** Load `best-practices-for-agentic-development` first.

**Plugin development (any platform):** pair `working-with-<platform>` (official docs) with `developing-<platform>` (workflow) — for Claude Code, Codex, Gemini/Antigravity, OpenCode, or Cursor. Cross-platform: `multi-provider-plugins`.

**GitHub Actions CI/CD:** `working-with-github-actions` for workflow syntax, cookbooks, action versions, and OIDC deployments.

**Git & GitHub:** start at `git-github-workflows` (router). It routes to `working-with-git` (git commands, history rewriting, bisect, conflicts, git servers), `working-with-github` (gh CLI, REST/GraphQL, tokens, PRs, code review, issues, releases, branch protection, Dependabot/CodeQL config), `developing-for-github` (GitHub Apps, OAuth, webhooks, Octokit), and `working-with-github-actions` (CI/workflow YAML).

**Release automation:** `working-with-release-please` for setting up release-please (new or existing repo), changelog/version/GitHub-release mechanics, the `release-please-action@v5` CI wiring, and cookbooks for shipping npm/pip/VS Code releases. Pairs with `working-with-github` (raw release/asset commands) and `working-with-github-actions` (general CI YAML).

**Domain modeling / backend architecture:** `domain-driven-design` for strategic + tactical DDD, CQRS, event sourcing — with complete TypeScript and Python examples.

**Object-oriented design principles:** `solid-principles` for SRP/OCP/LSP/ISP/DIP with bad→good TypeScript + Python examples, an anti-pattern catalog, and one notification-dispatcher refactored to honor all five — the per-class companion to `domain-driven-design`'s architecture-level guidance. **Use when** designing or refactoring classes/modules/interfaces, taming a god class or a growing type-`switch`, breaking up a fat interface, or deciding where a dependency seam belongs. **Skip for** throwaway scripts, genuinely simple CRUD paths, and one-off glue where adding an interface per dependency is pure ceremony — misapplied SOLID is needless indirection.

**Authoring a new skill in this repo:** `authoring-agent-skills` for the naming taxonomy, doc-fetching cookbook (llms.txt/sitemap), freshness-metadata conventions, and registration checklist — then `skill-creator` for generic description/triggering quality.

**Beads task management:** `beads-operations` for setup conventions, the core workflow, and the troubleshooting runbook; `working-with-beads` for the exact CLI reference at the pinned version. These supersede the third-party `beads` plugin's guidance.

**Dolt / the data engine under beads:** `working-with-dolt` for the `dolt` CLI reference + dolthub.com docs and the shared `dolt sql-server` runbook (port 3308).

**BeadBoard (multi-agent dashboard on top of beads):** `beadboard-operations` for operating its macOS launchd services (the `:3000` dashboard, the daemon), the dashboard HTTP API, the Dolt↔JSONL sync, and the operating/maintenance runbooks (mirrors the `beadboard-ops` repo docs). The agent-side coordination contract — the Iron Law, session lifecycle, mail, evidence — is the `beadboard-driver` skill.
