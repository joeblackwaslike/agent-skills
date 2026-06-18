# Taming `bd prime`

`bd prime` is what injects the "Beads Workflow Context / SESSION CLOSE PROTOCOL / Core Rules" block at the top of a session. Out of the box it's verbose and ships an opinionated *conservative* git policy ("do not commit, push, or run dolt remote sync without explicit authority"). This doc explains exactly what it does, how it gets into your session, and how to control or neutralize it. Pinned to `bd 1.0.5` (Homebrew).

## What `bd prime` actually does

It is a **pure read-only context emitter** — `Short: "Output AI-optimized workflow context."` It **mutates nothing**: no DB writes, no file writes, no issue changes. Its only data access is a single read (`store.GetAllConfig`) to pull your `bd remember` memories. It just prints markdown to stdout.

What it assembles:

1. **Mode detection** — MCP vs CLI (`--full`/`--mcp`/auto), stealth (`--stealth` or config `no-git-ops`), and git state (ephemeral branch? has remote? `no-push`?). These pick which git-policy lines to emit.
2. **A static workflow template** — context-recovery note, the 🚨 SESSION CLOSE PROTOCOL checklist, Core Rules, an Essential Commands reference, and Common Workflows. (The command list is static text, not live queries.)
3. **Your memories** — appended as a "Persistent Memories" section if you have any `bd remember` entries.

If `bd prime` is run **outside a beads project** it exits silently with no output (this is why the auto-captured `working-with-beads/references/prime.md` is empty).

## How it gets into your session (hook injection)

The injection is a **SessionStart hook** (and a **PreCompact** hook for post-compaction recovery) whose command is `bd prime`. Claude Code runs `bd prime` on those events and injects its stdout as `additionalContext`.

Those hook entries are written into `settings.json` by **`bd setup claude`** (the "Setup integration with AI editors" installer):

- `bd setup claude --global` → writes to **`~/.claude/settings.json`** (fires in every project)
- `bd setup claude` (project) → writes to **`.claude/settings.json`** (this repo)

Gotchas:

- It is **NOT** `bd hooks install` — that only manages *git* hooks (pre-commit, pre-push, …), never `settings.json`. `bd init` *without* `--skip-agents` also runs this Claude setup.
- The third-party **beads plugin** *also* ships a SessionStart hook (`bd codex-hook SessionStart`) that emits the **same** prime text — but only if that plugin is *enabled* (check `enabledPlugins` in `~/.claude/settings.json`).
- If `bd prime` is wired in more than one place (e.g. project **and** global settings, or settings + enabled plugin), the block is **injected multiple times** per session — pure bloat. Dedupe to one.

## Flags & config that change the output

| Lever | Effect |
|-------|--------|
| *(none, in a terminal)* | auto-detect: MCP server active → MCP mode (~50 tok); else full CLI (~1–2k tok) |
| `--export` | dump the **default** content, **ignoring any PRIME.md** — use this to get a base to customize |
| `--full` | force full CLI output (ignore MCP auto-detect) |
| `--mcp` | force minimal MCP-mode output |
| `--stealth` *or* `bd config set no-git-ops true` | stealth: strips git commands from the close protocol ("no git operations") |
| `bd config set no-push true` | keeps git but close-protocol step 4 → "report handoff; push disabled" |
| `--memories-only` | output **only** your `bd remember` memories (no template) — handy as a slim companion hook |
| `--hook-json` | wrap output in the SessionStart `{"hookSpecificOutput":{"additionalContext":…}}` envelope |
| **a `PRIME.md` file is present** | **overrides everything above** (except `--export`) — emitted verbatim |

There is **no** config flag for a "push-by-default / team-maintainer" mode — `no-git-ops` and `no-push` are the *only* config keys `bd prime` reads, and both make it *more* restrictive. To get anything other than the conservative default you must use a `PRIME.md`.

## PRIME.md — full content override

Unless `--export` is set, `bd prime` looks for a `PRIME.md` in three places, **first match wins**, and emits it **verbatim** (then returns):

| Order | Path | Scope |
|-------|------|-------|
| 1 | `.beads/PRIME.md` (relative to cwd) | this clone/project |
| 2 | `<beadsDir>/PRIME.md` (resolved/redirected `.beads`) | shared/redirected workspace |
| 3 | `os.UserConfigDir()/beads/PRIME.md` → macOS **`~/Library/Application Support/beads/PRIME.md`**, Linux `~/.config/beads/PRIME.md` | global, all projects |

**The override is all-or-nothing static.** It short-circuits `bd prime` entirely, so it **drops the dynamic memories** *and* the git-state adaptation below. If you want both a custom template *and* live memories, you need two hooks: `bd prime` (emits PRIME.md) + a second `bd prime --memories-only`.

Get a starting point with `bd prime --export --full`.

## git-state auto-adaptation (only when there is no PRIME.md)

| Mode | When | Emits |
|------|------|-------|
| **default** | branch has an upstream remote, normal repo | the standard conservative text |
| **ephemeral branch** | current branch has **no upstream** | "conservative on ephemeral branches"; "do not push unless explicitly told" |
| **local-only** | repo has **no git remote** | "Git workflow: local-only"; drops `bd dolt push` |
| **stealth** (`--stealth`/`no-git-ops`) | you set it | strips git commands from the close protocol |
| **no-push** (`no-push`) | you set it | keeps git, disables push |

A static PRIME.md gives all of this up — fine if your PRIME.md text is already correct in every state (e.g. "commit/push per the task and repo conventions").

## Joe's setup (the clean state)

After de-gunkifying:

- **One** SessionStart `bd prime` hook, at the **user level** (`~/.claude/settings.json`). All project-level `bd prime` SessionStart/PreCompact hooks were removed (the redundant copies `bd setup claude` had scattered across repos).
- A **user-level `PRIME.md`** at `~/Library/Application Support/beads/PRIME.md` with a **neutral git policy** — *not* the conservative "don't push" default, and *not* a "standing authority to push" order either. It stays flexible: *"commit, push, and `bd dolt push` per the task and repo conventions."*
- **Memories off** for now. When `bd remember` starts getting used, add a companion `bd prime --memories-only` SessionStart hook (a static PRIME.md can't carry live memories).

The neutral policy lines (replacing the conservative defaults in the export):

```
[ ] 4. commit / push / bd dolt push as the task and repo call for
...
- **Git & sync**: Commit, push, and `bd dolt push` per the task and repo conventions — follow the current instructions; no fixed conservative default.
```

## Un-gunkify runbook (new repo or machine)

1. **Find where it's wired:** grep `~/.claude/settings.json` and each project `.claude/settings.json` for `bd prime`; check `enabledPlugins` for an enabled `beads` plugin (its hook emits the same text).
2. **Dedupe to one hook:** keep a single user-level SessionStart `bd prime`; remove project-level copies (delete the `.claude/settings.json` if it contained *only* bd prime hooks, else edit out just those entries; mind any non-prime hooks you want to keep).
3. **Set the content once:** `bd prime --export --full` → save as the user-level `PRIME.md`, neutralize the conservative blocks (close-protocol step 4, the `**Policy:** Conservative is the default` line, the two "do not commit/push" Core Rules bullets, and the conservative comments in the "Completing work" snippet).
4. **Verify:** `bd prime --full` — confirm it emits your PRIME.md and the conservative lines are gone.

For the underlying `bd prime` CLI flags/output capture, see the `working-with-beads` skill.
