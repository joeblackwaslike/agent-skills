# agent-skills — Skill Catalog

The full catalog of skills bundled in this plugin. Invoke with `skill("name")` (Codex syntax) or via the Skill tool in Claude Code. **Register new skills here** (and in `README.md`).

For repo conventions and the curated entry points, see [AGENTS.md](AGENTS.md) — its **Common Workflows** section.

> Gemini CLI / Antigravity users: instruction files use `skill()` (Codex syntax). See `GEMINI.md` for `activate_skill()` syntax.

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
| `solid-principles` | Designing/refactoring classes, modules, or interfaces with SOLID — SRP, OCP, LSP, ISP, DIP. Triggers explicitly on those names AND on the smells they target (god class, growing type-`switch`, refused-bequest subclass, fat interface, `new`-ing a concrete DB/mailer inside a service). Bad→good examples in TypeScript and Python, a cross-cutting anti-pattern catalog (including over-applying SOLID), and one notification-dispatcher system refactored to honor all five. Skip for throwaway scripts and simple CRUD/glue where an interface per dependency is ceremony. The per-class companion to `domain-driven-design`'s architecture-level guidance |
| `working-with-vercel-ai-sdk` | Working with the Vercel AI SDK (`ai` package) — generateText/streamText, generateObject, embeddings, tools, agents (ToolLoopAgent), UI hooks (useChat), RSC, providers, migrations; comprehensive offline docs from ai-sdk.dev |
| `authoring-agent-skills` | Creating/maintaining a skill in this repo — naming taxonomy (working-with-X / developing-X / topic), SKILL.md frontmatter, the doc-fetching cookbook (llms.txt / sitemap / curated-list), the `doc-frontmatter.cjs` freshness helpers, Makefile/CI auto-discovery, and the registration checklist |
| `working-with-beads` | Working with the beads CLI (`bd`) — offline CLI reference generated from the pinned binary (`bd <cmd> --help`, `bd prime`) plus upstream repo docs, pinned to a known version. Use for any `bd` command/flag/concept lookup |
| `beads-operations` | Running/maintaining/troubleshooting beads day-to-day — bd vs TodoWrite, Joe's shared-server conventions (port 3308, `--skip-agents`), the ready→claim→note→close loop, compaction recovery, and broken-state recovery |
| `beadboard-operations` | Operating/troubleshooting the **BeadBoard** dashboard + its macOS launchd services (`com.beadboard.dashboard` :3000, `com.beadboard.daemon`), install/uninstall, the dashboard HTTP API, the Dolt↔JSONL sync (`export.auto`, JSONL file-watcher), `verify-sync.sh`, env/paths, and the operating/maintenance runbooks. Mirrors the `beadboard-ops` repo docs. The ops/infra layer — agent contract is `beadboard-driver` |
| `working-with-dolt` | Working with Dolt — version-controlled "Git for data" SQL DB (branch/diff/merge over MySQL wire). Offline `dolt` CLI reference from the pinned binary + dolthub.com docs, plus the shared `dolt sql-server` runbook (port 3308). Any `dolt` command/concept lookup |
| `working-with-vercel` | Vercel **hosting platform** — the `vercel` CLI, hosted MCP server (mcp.vercel.com), and platform concepts (deploys, domains, DNS, env, functions, edge config, blob, firewall). Offline vercel.com/docs. REST API → `working-with-vercel-api`; `ai` pkg → `working-with-vercel-ai-sdk` |
| `working-with-vercel-api` | Vercel **REST API** + `@vercel/sdk` — the complete OpenAPI spec (every endpoint/param/schema) plus auth (bearer/`VERCEL_TOKEN`), team scoping, versioning, pagination, errors. CLI/MCP/platform → `working-with-vercel` |
| `working-with-zsh` | Working with Zsh — any command/builtin/option/glob/expansion lookup, Bash→Zsh migration, startup-file config, completion (`compinit`/`zstyle`) & ZLE. The complete manual generated verbatim from the pinned `zsh` man pages, plus snapshot-fetched ecosystem docs (Oh My Zsh, Prezto, zinit/antidote/sheldon, Powerlevel10k/Starship/Oh My Posh, plugins) and hand-written migration/comparison/cookbook guides |
| `working-with-bash` | Working with Bash — any command/builtin/option (`shopt`/`set -o`)/parameter-expansion/`[[ ]]`/glob lookup, `.bashrc`/`.inputrc` config, POSIX-sh portability & Bash↔Zsh differences, strict mode & quoting/word-splitting bugs, completion, Readline/history. Version-exact `man bash` (pinned bash 5.3.9) + fetched GNU Bash Reference/Readline/History manuals, ecosystem docs (oh-my-bash, bash-it, basher/bpkg, ble.sh, Starship/Oh My Posh, ShellCheck/shfmt/bats), a community corpus (pure-bash-bible, Google style guide, POSIX spec, BashPitfalls), and hand-written guides incl. a pitfalls/safety guide |
| `working-with-release-please` | Release automation with **release-please** (Google) — Conventional Commits → version bump + `CHANGELOG.md` + GitHub Release via an always-up-to-date "release PR". Covers config/manifest/monorepo mode, all `release-type` strategies, and `release-please-action@v5` CI wiring (`release_created`/`releases_created` outputs gating downstream publish jobs). Upstream README/docs/JSON-schemas fetched at pinned tags (release-please 17.9.0, action 5.0.0) + hand-written guides and npm/pip/VS Code cookbooks. Two gotchas: the action is `@v5` (tutorials show stale `@v4`), and release-please only versions+changelogs+tags — **publishing is a separate, gated CI job** |
| `working-with-serena` | Working with **Serena** — the MCP toolkit (github.com/oraios/serena) wrapping Language Servers for **symbol-level** code work. **MANDATORY before reading/editing any code file:** prefer `find_symbol`/`get_symbols_overview`/`replace_symbol_body`/`rename_symbol`/`search_for_pattern` over native `Read`/`Edit`/`Grep`/`Glob`. Covers the `serena`/`serena-hooks` CLIs, MCP setup (`--context claude-code`, contexts/modes), the tool set, a Serena↔native mapping with fallbacks, agent flows + cookbook, and the **compliance problem** (newer Claude/Opus models drift off Serena toward native tools → Serena Hooks + a vendored config-file hook enforce it). Supersedes `using-serena` |

