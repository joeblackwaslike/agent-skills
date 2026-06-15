# Dolt as the beads backend — operating the data engine

How Joe's beads (`bd`) issue tracker runs on Dolt, and how to maintain, troubleshoot, and cleanly bootstrap the **Dolt side** of it. This is the Dolt-native layer; for the `bd`-command-level workflow and recovery checklist, use the **`beads-operations`** skill (it owns `bd doctor`, the ready→claim→close loop, and compaction recovery). Don't duplicate that here — cross-reference it.

> Verified against `dolt 2.1.7` (Homebrew, pinned) and `bd 1.0.5` (Homebrew) on macOS.

## 1. How beads uses Dolt

Beads stores every issue, dependency, and comment in a **Dolt database** and talks to it over the **MySQL wire protocol** via a `dolt sql-server`. Joe runs **one shared server for all projects**:

- **One `dolt sql-server`** listens on **port 3308**, rooted at `~/.beads/shared-server/` (its data dir is `~/.beads/shared-server/dolt/`). Each project is a **separate Dolt database** inside that one server — not a separate server.
- The server is **auto-started transparently** by `bd` when needed; you rarely start it by hand.
- Shared mode is **enforced by env** in `~/.zshenv`:
  ```sh
  export BEADS_DOLT_SHARED_SERVER=1
  export BEADS_DOLT_SERVER_PORT=3308
  ```
  Always pass `--shared-server` to `bd init` as belt-and-suspenders. Plain `bd init` spawns a **per-project** server on a different port that drifts and breaks intermittently (stale ports, orphan servers, db-name mismatch).

**Why Dolt (not SQLite/MySQL):** every `bd` write can be committed, diffed, and reverted. An agent that corrupts the issue DB hasn't destroyed anything — the change is a Dolt commit you can `dolt diff`/`dolt revert`. That branch-and-commit safety is the whole reason beads sits on Dolt. (bd 1.x removed the legacy SQLite backend; Dolt is the only backend now.)

### The shared-server directory

```
~/.beads/shared-server/
├── dolt/                  # the Dolt data dir — one subdir per project database
├── dolt-server.pid        # canonical server PID (e.g. 13887)
├── dolt-server.port       # 3308
├── dolt-server.lock       # lock guarding single-owner startup
└── dolt-server.log        # server log — first stop for "why won't it start"
```

`bd` connects each repo to a database named after the project (issue prefix, or `beads`). One server, many databases.

## 2. Maintaining the Dolt server

Day-to-day you drive the server through `bd dolt …` (it knows the shared-server paths); drop to raw `dolt` only for inspection or surgery.

**Inspect the running server:**
```sh
bd dolt status          # server status (running? port? db?)
bd dolt show            # full config + a live connection test
lsof -iTCP:3308 -sTCP:LISTEN     # expect EXACTLY ONE dolt listener (lsof names 3308 "tns-server")
pgrep -fl 'dolt sql-server'      # expect ONE process on -P 3308
cat ~/.beads/shared-server/dolt-server.pid    # canonical PID — must match the lsof PID
tail -n 40 ~/.beads/shared-server/dolt-server.log
```

**Lifecycle (graceful):**
```sh
bd dolt stop            # stop the shared server
bd dolt start           # start it
bd dolt test            # confirm connectivity
```
If launchd/`KeepAlive` manages it, `bd dolt stop` may be restarted immediately — that's expected. `beads-operations` documents `bd dolt killall` for reaping orphan `dolt sql-server` processes that aren't the canonical PID — use that for the "more than one listener" case.

**Reclaim disk / keep it fast — `dolt gc`.** Dolt keeps history, so the store grows. The `sql-server` auto-GCs by default (`auto_gc_behavior.enable: true`, see `references/cli/sql-server.md`). To force a manual collection on the shared data dir, stop the server first, then run `dolt gc` against the data dir, then restart:
```sh
bd dolt stop
dolt --data-dir ~/.beads/shared-server/dolt gc      # repack/drop unreferenced chunks
bd dolt start
```

**Verify integrity — `dolt fsck`.** If you suspect corruption (after a crash, a force-kill, or a cloud-sync incident):
```sh
dolt --data-dir ~/.beads/shared-server/dolt fsck     # verifies chunks; repairs where possible
```

**Server config knobs** live in the `sql-server` YAML (`log_level`, `listener.port`, `behavior.auto_gc_behavior`, `max_connections`, timeouts). See `references/cli/sql-server.md` for the full annotated default config. beads manages this for the shared server; only touch it if you're deliberately changing the shared-server behavior.

## 3. Troubleshooting Dolt (Dolt-native symptoms)

Symptom → Diagnose → Recover. For `bd`-level repair (`bd doctor --agent`, `bd doctor --fix`, JSONL rebuild), see **`beads-operations` → `references/troubleshooting.md`** — that's the authoritative recovery checklist. Below is the Dolt-engine slice.

**"not in a git repository" on start.** Dolt uses git for commit history and refuses to start outside a repo.
```sh
git rev-parse --is-inside-work-tree     # must print: true
# fix:
git init && bd init --shared-server --skip-agents
```

**Stale port / duplicate server on 3308.** `bd` hangs or can't reach the server; or two `dolt sql-server` fight over the data dir.
```sh
lsof -iTCP:3308 -sTCP:LISTEN     # trouble = >1 listener, or a PID != dolt-server.pid
pgrep -fl 'dolt sql-server'
# recover (preserves canonical, reaps orphans), then cycle if the canonical is wedged:
bd dolt killall ; bd dolt stop && bd dolt start ; bd dolt status
```

**Per-project vs shared drift / db-name mismatch.** A project shows an empty/wrong issue set, or its writes don't appear in the shared DB — usually init'd without `--shared-server`.
```sh
bd dolt show     # healthy: host 127.0.0.1, port 3308, database = this project; drift: port != 3308 or wrong db
# re-point at the shared server:
bd dolt set host 127.0.0.1 ; bd dolt set port 3308 ; bd dolt set database <project-db> ; bd dolt test
```
If real data lives only in a stray per-project DB, `bd export -o /tmp/rescue.jsonl` it **before** re-pointing, then re-import after. (See `beads-operations` for the exact import form.)

**"database is locked" / `disk I/O error (522)` on cloud-synced dirs.** iCloud/Dropbox/OneDrive/Google Drive don't honor POSIX locking or atomic writes, which the Dolt engine needs.
```sh
pwd     # under ~/Library/Mobile Documents/... (iCloud), ~/Dropbox, etc.? → that's the cause
# fix: move the repo (and its .beads/) to LOCAL disk:
mv "~/Library/Mobile Documents/.../project" ~/github/.../project && cd $_ && bd dolt test
```

**Updates not visible for 3–5s (embedded vs server mode).** `bd update --claim` then `bd show` still shows old status. That's embedded-mode read/write lag, not data loss.
```sh
bd dolt status     # "embedded engine (in-process)" = embedded; reachable host:port = server mode
bd dolt start      # ensure the shared server is up so all reads/writes are immediately consistent
```

**Corruption after a crash / force-kill.** Run `dolt fsck` (§2) against the shared data dir; if unrecoverable, rebuild from a JSONL export per `beads-operations` (always `bd export` first).

## 4. Bootstrapping a new beads + Dolt project (no drift)

The golden path — produces a project wired to the shared server with git-sync hooks, no per-project server:

```sh
git init                                   # Dolt needs a git repo
bd init --shared-server --skip-agents      # shared server on 3308; skip agent scaffolding
bd hooks install                           # REQUIRED — init does NOT install git-sync hooks
bd dolt show                               # confirm: host 127.0.0.1, port 3308, database = <project>
bd ready                                   # smoke test: lists ready issues (empty is fine)
```

Critical gotchas:

- **`bd hooks install` is separate from `bd init`.** Without the hooks, the Dolt DB and the tracked `interactions.jsonl` drift across branches and every checkout becomes a "commit the `.beads/` churn first" chore.
- **Husky repos** (`git config core.hooksPath` = `.husky/_`, e.g. create-ts-project scaffolds): `bd hooks install` writes to the gitignored, husky-regenerated `.husky/_` and gets wiped on `pnpm install`. Instead, add to each tracked `.husky/<hook>` file:
  ```sh
  command -v bd >/dev/null 2>&1 && bd hooks run <hook> "$@" || true
  ```
- **Always `--shared-server`.** Plain `bd init` creates a per-project Dolt server that drifts and breaks. The env vars in `~/.zshenv` default to shared mode; the flag is belt-and-suspenders.

After bootstrap, verify exactly one shared listener serves the new database:
```sh
lsof -iTCP:3308 -sTCP:LISTEN     # one dolt process
bd dolt show                     # database == new project's name, port 3308
```

## See also

- **`beads-operations`** — `bd` conventions, the ready→claim→note→close loop, `bd doctor`, compaction recovery, and the full symptom-first troubleshooting runbook.
- **`working-with-beads`** — the `bd` CLI reference at its pinned version.
- `references/cli/sql-server.md` — the annotated `dolt sql-server` config (GC, listener, timeouts).
- `references/cli/gc.md`, `references/cli/fsck.md` — maintenance commands used above.
- `references/docs/introduction__installation__application-server.md` — running Dolt as a long-lived server.
