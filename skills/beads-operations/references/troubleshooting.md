# Troubleshooting — the runbook

Symptom-first. Each entry: **Symptom → Diagnosis (exact command) → Recovery (exact steps).** All commands verified against `bd 1.0.5` (Homebrew). Where a recovery step could not be verified live without mutating Joe's state, it's flagged **[unverified]**.

> First move for almost anything: `bd doctor` (and `bd doctor --agent` for prose explanations + remediation commands). It checks `.beads/` presence, schema, server reachability, git hooks, and circular deps. `bd doctor --fix` repairs many issues with confirmation.

---

### Dolt server won't start: "not in a git repository"

Dolt uses git for commit history, so it refuses to start outside a repo.

**Diagnosis:**
```sh
git rev-parse --is-inside-work-tree
# in a repo:        true
# not in a repo:    fatal: not a git repository (or any of the parent directories): .git
```

**Recovery:**
```sh
git init
bd init --shared-server --skip-agents   # or: bd dolt start, if already init'd
```

---

### Stale port / orphan or duplicate Dolt server on 3308

Symptom: `bd` hangs, times out, or reports it can't reach the server; or you suspect more than one `dolt sql-server` is fighting over the shared data dir.

**Diagnosis:**
```sh
lsof -iTCP:3308 -sTCP:LISTEN
# Expect EXACTLY ONE dolt process:
# COMMAND   PID USER   FD   TYPE  ... NODE NAME
# dolt    66320  joe  157u  IPv4  ...  TCP localhost:tns-server (LISTEN)

pgrep -fl 'dolt sql-server'
# Expect ONE line, bound to the shared dir on port 3308:
# 66320 /opt/homebrew/bin/dolt sql-server -H 127.0.0.1 -P 3308 --loglevel=warning

cat ~/.beads/shared-server/dolt-server.pid    # canonical PID (e.g. 66320)
cat ~/.beads/shared-server/dolt-server.port   # 3308
tail -n 40 ~/.beads/shared-server/dolt-server.log
```
(`tns-server` is lsof's IANA name for port 3308.) Trouble = **more than one** `dolt sql-server` process, or a listener on 3308 whose PID doesn't match `dolt-server.pid`.

**Recovery:**
```sh
bd dolt killall   # kills orphan dolt sql-server procs NOT tracked by the canonical PID file
```
`bd dolt killall` preserves the canonical/shared server and only reaps orphans using the same data dir. If the *canonical* server itself is wedged:
```sh
bd dolt stop          # graceful; --force to hard-stop
bd dolt start         # restart the shared server
bd dolt status        # confirm reachable, version, port, database
```
Then re-run the `lsof` check and confirm a single listener on 3308. If launchd manages it, `bd dolt stop` may be immediately restarted by `KeepAlive` — that's expected and fine.

---

### Per-project vs shared-server drift / db-name mismatch

Symptom: a project that should have issues shows an **empty or wrong** issue set (`bd ready` / `bd list` empty, or unfamiliar IDs), or its writes don't appear in the shared DB. Usually means it was init'd *without* `--shared-server` and is talking to its own per-project DB/server.

**Diagnosis:**
```sh
bd dolt show          # shows host, port, database, and a connection test
# Healthy: host 127.0.0.1, port 3308, database = this project's name
# Drift:   port != 3308, or database name doesn't match, or a separate per-project server

cat .beads/config.yaml 2>/dev/null    # inspect the project's recorded dolt settings
ls -la .beads/                        # a per-project dolt/ data dir here is a red flag
bd doctor --agent                     # prose diagnosis of config drift
```

**Recovery:**
```sh
# Point this project at the shared server (verified config keys):
bd dolt set host 127.0.0.1
bd dolt set port 3308
bd dolt set database <project-db-name>   # match the shared DB for this project
bd dolt test                             # confirm connectivity
```
If the project has real data only in the stray per-project DB, export it first and re-import into the shared one (see "weird/nasty state" below). **[unverified]** — the exact re-point vs. re-init choice depends on which DB holds the truth; inspect both with `bd dolt show` and `bd list` before destroying anything.

---

### `--shared-server` omitted → a silent per-project server appears

Symptom: after a plain `bd init`, `lsof` shows a `dolt` listener on a port **other than 3308**, and the project's data lives under `.beads/dolt/` instead of `~/.beads/shared-server/`.

**Detect:**
```sh
bd dolt show                          # port != 3308 / local data-dir → per-project server
lsof -iTCP -sTCP:LISTEN | grep dolt   # a second dolt listener on a non-3308 port
ls .beads/dolt 2>/dev/null            # local per-project data dir present
```

**Migrate to the shared server:**
```sh
bd export -o /tmp/<project>-issues.jsonl   # snapshot the per-project issues first
bd dolt stop                               # stop the stray per-project server
# Re-point at the shared server:
bd dolt set host 127.0.0.1
bd dolt set port 3308
bd dolt set database <project-db-name>
bd dolt test
# If the shared DB is empty for this project, import the snapshot:
bd import /tmp/<project>-issues.jsonl      # [unverified flag form — see bd import --help]
```
**[unverified]** — the import step's exact invocation (`bd import` flags / `bd init --from-jsonl`) wasn't run live to avoid creating state; confirm with `bd import --help` before running. The export step is verified (`bd export -o <file>`).

---

### "database is locked" / `disk I/O error (522)` on cloud-synced dirs

Symptom: `bd` commands fail with `database is locked` or `disk I/O error (522)` and the repo lives under iCloud Drive, Dropbox, OneDrive, or Google Drive. Cloud-sync filesystems don't honor POSIX file locking or atomic writes, which the embedded Dolt engine needs.

> Note: bd 1.x removed the legacy SQLite backend (Dolt is the only backend). The old SQLite-specific "locked" advice no longer applies, but cloud-sync dirs still break the Dolt engine the same way.

**Diagnosis:**
```sh
pwd        # is the repo under a synced path? e.g. ~/Library/Mobile Documents/... (iCloud), ~/Dropbox, ~/OneDrive
bd doctor  # surfaces I/O / lock errors
```

**Recovery:** move the repo (and its `.beads/`) to a **local** path:
```sh
mv "~/Library/Mobile Documents/.../project" ~/github/.../project
cd ~/github/.../project
bd dolt test    # confirm it works on local disk
```
Keep code/`.beads/` on local disk; sync only final deliverables to the cloud.

---

### Database not initialized

Symptom: `bd create` / `bd ready` errors with database not found, and there's no `.beads/` in the repo.

**Diagnosis:**
```sh
ls -la .beads/            # missing → not initialized
git rev-parse --is-inside-work-tree   # must be true first (Dolt needs git)
```

**Recovery:**
```sh
git init   # only if not already a git repo
bd init --shared-server --skip-agents
bd config set export.auto true   # REQUIRED: off by default; enables .beads/issues.jsonl auto-export
bd hooks install
```

---

### BeadBoard dashboard shows stale data / `.beads/issues.jsonl` drift

Symptom: the BeadBoard dashboard (or any consumer of `.beads/issues.jsonl`) shows an outdated
issue set, but `bd list`/`bd ready` in the terminal are correct. The Dolt DB is the source of
truth and is fine; the JSONL export it feeds the dashboard is stale. Root cause is almost always
`export.auto` left at its **`false` default** — `bd` only rewrites the JSONL on a manual `bd export`.

**Diagnosis:**
```sh
bd config get export.auto         # false (or empty) → auto-export is OFF; this is the cause
```

**Recovery:**
```sh
bd config set export.auto true    # auto-export after writes (throttled 60s)
bd export                         # force one immediate export to un-stale the JSONL now
```
Setting `export.auto true` is idempotent; do it on every project. Confirm with
`bd config get export.auto | grep -q true || bd config set export.auto true`.

---

### Embedded vs server mode confusion (updates not visible for 3–5s)

Symptom: `bd update <id> --claim` then `bd show <id>` still shows the old status; the change "shows up" a few seconds later. This is embedded-mode read/write sync lag, not data loss.

**Diagnosis:**
```sh
bd dolt status   # "embedded engine (in-process)" = embedded; reachable host:port = server mode
lsof -iTCP:3308 -sTCP:LISTEN   # is the shared server actually up?
```

**Recovery:** ensure the shared server is running so all reads/writes go through it (immediate consistency):
```sh
bd dolt start
bd dolt status   # confirm server mode on 3308
```
If you must stay embedded (CI, batch import), just wait ~3–5s before re-reading, or run `bd export -o /dev/null` to force a flush.

---

### Beads got into a weird/nasty state mid-session — general recovery checklist

When something is wrong and you're not sure what, work this checklist top to bottom. Do **not** improvise schema or server surgery.

```sh
# 1. Snapshot first — never destroy before you've exported.
bd export -o /tmp/beads-rescue.jsonl

# 2. Reap orphans, confirm a single shared server on 3308.
bd dolt killall
lsof -iTCP:3308 -sTCP:LISTEN          # expect exactly one dolt listener
pgrep -fl 'dolt sql-server'           # expect one process on -P 3308

# 3. If the canonical server is wedged, cycle it.
bd dolt stop && bd dolt start
bd dolt status                        # reachable? right port/db?

# 4. Diagnose data + config integrity.
bd doctor --agent                     # prose diagnosis + remediation commands
bd doctor --fix                       # apply safe fixes (confirms each)
bd prime                              # re-anchor the agent's workflow context

# 5. Confirm the project sees its data, and that auto-export is on (JSONL/dashboard freshness).
bd status
bd ready
bd config get export.auto | grep -q true || bd config set export.auto true

# 6. Last resort — rebuild from the JSONL snapshot (DESTRUCTIVE; have the export).
bd doctor --fix --source=jsonl        # rebuild database from a JSONL export  [verify path]
# or re-init over local data (authorizes local data loss; see bd help init-safety):
#   bd init --shared-server --skip-agents --reinit-local
```
**[unverified]** — steps 6's destructive forms (`--fix --source=jsonl`, `--reinit-local`) were not executed live to avoid mutating Joe's databases. They appear in `bd doctor --help` / `bd init --help` for `1.0.5`, but confirm the exact JSONL path argument and read `bd help init-safety` before running either. Everything in steps 1–5 is non-destructive and safe to run live.
