# Conventions — the mandatory setup

How Joe runs beads. These are not suggestions; deviating is the root cause of most "beads is broken" sessions. All commands verified against `bd 1.0.5` (Homebrew).

## The one rule: always `--shared-server --skip-agents`

```sh
bd init --shared-server --skip-agents
```

Never plain `bd init`. Plain init creates a **per-project** Dolt server with a port derived from the project path. That model drifts and recurs:

- **stale ports** — the per-project port gets reused or moves; later `bd` calls can't find the server,
- **orphan servers** — old `dolt sql-server` processes outlive the project and pile up,
- **db-name mismatch** — a fresh per-project DB shadows the real shared one, so the project "sees" an empty/wrong issue set.

`--shared-server` puts every project on **one** server (see below). `--skip-agents` suppresses `AGENTS.md`/Claude/Codex setup generation — Joe manages instruction files himself.

> The `--shared-server` flag enables shared mode; the `BEADS_DOLT_SHARED_SERVER=1` env var (below) makes it the default. Passing both is belt-and-suspenders and harmless.

## The shared Dolt server

One server, one data directory, shared across all projects:

- **Path:** `~/.beads/shared-server/`
- **Port:** `3308` (verified live: `cat ~/.beads/shared-server/dolt-server.port` → `3308`)
- **Storage:** `~/.beads/shared-server/dolt/` — one subdirectory per project DB (`agency_agents/`, `agent_marketplace/`, …) plus `beads_global` and `config.yaml`.
- **Runtime files:** `dolt-server.pid`, `dolt-server.port`, `dolt-server.lock`, `dolt-server.log` in `~/.beads/shared-server/`.

Confirm it's up:

```sh
lsof -iTCP:3308 -sTCP:LISTEN
# COMMAND   PID USER   FD   TYPE  ... NODE NAME
# dolt    66320  joe  157u  IPv4  ...  TCP localhost:tns-server (LISTEN)
```

`tns-server` is just lsof's IANA name for port **3308** — that single `dolt` process is the shared server.

A launchd job (`~/.beads/start-shared-server.sh`) starts it via `bd dolt start` from a known project that has a `.beads/` dir, then blocks on the PID so launchd's `KeepAlive` restarts it cleanly if it dies.

## Environment (`~/.zshenv`, verbatim)

These live in `.zshenv` (not `.zshrc`) so **non-interactive** shells — Claude Code hooks, agent subshells, git hooks, scripts — inherit them too. Without that, `bd` silently falls back to per-project servers.

```sh
export BEADS_DOLT_SHARED_SERVER=1
# Pin the shared server's port. `bd dolt start` runs it on 3308, but `bd init`'s
# --server-port defaults to 3307, so fresh inits miss the running server unless
# this is set. Existing repos read the live port; only `bd init` needs this.
export BEADS_DOLT_SERVER_PORT=3308
```

The `BEADS_DOLT_SERVER_PORT=3308` pin matters: `bd init`'s `--server-port` flag defaults to **3307**, so a fresh init in a new repo would point at the wrong port without it.

## The `bd()` shell wrapper (`~/.zshrc`, verbatim)

A function auto-adds `--skip-agents` on every `init`, so you can't forget it interactively:

```sh
bd() {
  if [[ "$1" == "init" ]]; then
    command bd "$@" --skip-agents
  else
    command bd "$@"
  fi
}
```

Note: this wrapper only adds `--skip-agents` — **you still type `--shared-server` yourself**, and non-interactive shells (which don't source `.zshrc`) don't get the wrapper at all. Always write the full `bd init --shared-server --skip-agents`.

## Correct first run in a new repo

Dolt needs a git repo (it uses git for commit history). So:

```sh
git init                              # Dolt requires a git repository
bd init --shared-server --skip-agents # join the shared server on 3308
bd config set export.auto true        # REQUIRED: auto-export to .beads/issues.jsonl
bd hooks install                      # REQUIRED: init does NOT install them
```

If you skip `git init`, server startup fails with "not in a git repository" — see [`troubleshooting.md`](troubleshooting.md).

### Always set `export.auto=true` immediately after init

`export.auto` is **`false` by default** in every fresh `bd init`. It controls whether `bd`
auto-exports issues to `.beads/issues.jsonl` after writes (throttled to once per 60s). With it
off, the JSONL is only refreshed on a manual `bd export` — so the **BeadBoard dashboard (and any
other consumer of `.beads/issues.jsonl`) shows stale data**, and the tracked JSONL drifts out of
sync with the live Dolt DB. This was the single root cause of JSONL drift across all of Joe's repos.

```sh
bd config set export.auto true
```

Set it on **every** project right after `bd init`, before any issue writes. It's idempotent — safe
to re-run. To confirm: `bd config get export.auto` → `true`.

### Always run `bd hooks install` after init

`bd init` in this shared-server flow does **not** install the git sync hooks
(`post-checkout`/`post-merge`/`pre-commit`/`pre-push`/`prepare-commit-msg`). Without
them, the Dolt DB and the tracked `interactions.jsonl` drift across branches and never
auto-sync — every branch switch becomes a "commit the `.beads/` churn first" chore.
`bd hooks install` is idempotent; run it once per repo after init. Verify with `bd hooks list`.

### Husky repos: hooks land in a gitignored dir — make them durable

If the repo uses **Husky** (e.g. anything scaffolded by create-ts-project — check
`git config core.hooksPath`, usually `.husky/_`), `bd hooks install` writes its
integration into `.husky/_/<hook>`. That directory is **husky-generated and gitignored**,
so husky **regenerates it on every `pnpm install`/`prepare`, wiping the beads block** —
the hooks silently stop firing. Husky's runner already execs the *tracked* `.husky/<hook>`
files, so put the beads call there instead (durable + committed):

```sh
# .husky/post-merge, .husky/post-checkout, .husky/pre-push, .husky/prepare-commit-msg
command -v bd >/dev/null 2>&1 && bd hooks run <hookname> "$@" || true
# .husky/pre-commit: keep the existing gate, then add the beads line (non-fatal)
#   pnpm lint-staged
#   command -v bd >/dev/null 2>&1 && bd hooks run pre-commit "$@" || true
```

Non-fatal (`|| true`) so a beads hiccup never blocks a commit/merge/checkout; keep the
real lint/test gate (`lint-staged`) fatal.

## See also

See [`../../working-with-beads/references/cli/init.md`](../../working-with-beads/references/cli/init.md) for the full `bd init` flag list (including the EXPERIMENTAL proxied-server flags, which Joe does not use).
