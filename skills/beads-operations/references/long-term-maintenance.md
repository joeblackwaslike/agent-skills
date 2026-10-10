# Long-term maintenance

Keeping beads, the pinned CLI docs, and the databases healthy over time. Commands verified against `bd 1.3.1` (Homebrew).

## Version pin workflow

The `working-with-beads` skill regenerates its CLI reference from a **pinned** `bd` binary so docs match a known version. The pin lives in [`../../working-with-beads/PINNED_VERSION`](../../working-with-beads/PINNED_VERSION):

```
bd=1.3.1
plugin=1.0.4
tag=v1.3.1
```

Both `beads` and its dependency `dolt` are held by `brew pin` so routine `brew upgrade` won't move them. Confirm with `brew list --pinned | grep -E 'beads|dolt'`.

> **Note:** The third-party `beads` plugin is currently installed-but-disabled (`enabledPlugins` in `~/.claude/settings.json` has no entry for it). The `plugin=` line is kept for reference. The beads workflow context is injected via user-level `bd prime` hooks in `~/.claude/settings.json` instead.

### Bumping the pin

```sh
# 1. Edit the pin file to the new version.
$EDITOR skills/working-with-beads/PINNED_VERSION   # bd=, tag= (plugin= is informational)

# 2. Upgrade the actual binary (it's pinned, so unpin → upgrade → re-pin).
#    beads depends on dolt; if dolt is also pinned, unpin it first.
brew unpin dolt beads && brew upgrade beads && brew pin beads dolt
bd --version   # confirm it matches the new bd= line
dolt version   # note the new dolt version

# 3. If dolt was upgraded, update its PINNED_VERSION too.
$EDITOR skills/working-with-dolt/PINNED_VERSION   # dolt=

# 4. Run the database migration (required on first run of the new binary).
bd migrate --dry-run        # preview: "Would update Dolt version: X → Y"
bd migrate --force          # force-migrate (you are the designated migrator)
bd dolt push                # publish migrated schema to remote

# 5. Regenerate the CLI reference from the new binary.
make update-working-with-beads
make update-working-with-dolt   # if dolt was also bumped

# 6. Review the diff — flag/subcommand changes, removed commands, new behavior.
git diff skills/working-with-beads/references/
git status skills/working-with-beads/references/cli/ | grep "^?"   # new command files

# 7. Update beads-operations references for any new/changed commands.
# 8. Commit with signoff.
git add skills/working-with-beads skills/working-with-dolt skills/beads-operations
git commit -s -m "chore(beads): bump pinned bd to <new-version>"
```

After committing, refresh the installed plugin cache: `claude plugin update agent-skills@agent-marketplace`.

## Agent lease management — reclaim + heartbeat

For multi-agent setups where an agent can die mid-task:

- **`bd heartbeat <id>`** — keeps a claim lease alive for long-running tasks. A claim TTL expires after a fixed duration; heartbeat pushes `lease_expires_at` forward so the work isn't reclaimed while the agent is legitimately busy.
- **`bd reclaim`** — scans for `in_progress` issues whose lease has expired (died without closing), clears the assignee, and resets status to `ready`. Run periodically from a supervisor:

  ```sh
  bd reclaim --older-than 10m    # reclaim leases expired 10+ min ago
  ```

  The `--older-than` window is a grace period past expiry — prevents reclaiming a briefly paused but live agent.

## Single-command full sync

`bd sync` replaces the hand-rolled pull → conflict-check → recompute-blocked → push loop:

```sh
bd sync     # pull, check conflicts, recompute is_blocked, push (with retry on race)
```

Use for routine multi-machine sync. For interactive conflict resolution, step through manually (`bd dolt pull` → `bd conflicts list` → `bd conflicts resolve` → `bd dolt push`).

## Shared Dolt server lifecycle

Verified subcommands (`bd dolt --help`):

```sh
bd dolt status      # PID, port, data dir, reachability (or "embedded engine in-process")
bd dolt start       # start the shared server (rarely needed — auto-starts on demand)
bd dolt stop        # graceful shutdown (--force to hard-stop)
bd dolt killall     # reap orphan dolt sql-server procs, preserve the canonical one
bd dolt test        # connection test
bd dolt show        # full config + connection status
```

On Joe's machine the shared server is launchd-managed (`~/.beads/start-shared-server.sh` with `KeepAlive`), so `bd dolt stop` may be immediately restarted — expected.

## Backup / export hygiene

Two different things — don't confuse them:

- **`bd export`** → JSONL snapshot for interchange / issue-level migration / viewers. **Not a backup.**
  ```sh
  bd export -o issues.jsonl              # snapshot to file (default: stdout)
  bd export --all -o full.jsonl          # include infra, templates, gates, memories
  bd export --include-memories -o m.jsonl
  bd export --scrub -o clean.jsonl       # drop test/pollution records
  ```
- **`bd backup`** → real Dolt-level backup/restore (the actual durability mechanism). Verified subcommands (`bd backup --help`):
  ```sh
  bd backup init <path>    # set up a backup destination (alias: add)
  bd backup sync           # push the database to the configured destination
  bd backup status         # last backup status
  bd backup restore        # restore from a Dolt backup
  bd backup remove         # remove the configured destination
  ```

Keep a `bd export` snapshot before any destructive recovery (see [`troubleshooting.md`](troubleshooting.md)), and a real `bd backup` destination for actual durability. Cross-machine sync uses Dolt remotes (`bd dolt push`/`pull`), not JSONL.

## Compaction of old issues — two distinct commands

These are easy to mix up; they do different things:

- **`bd compact`** squashes old **Dolt commits** (storage/history overhead from auto-commit), preserving recent commits. It does **not** summarize issues.
  ```sh
  bd compact --dry-run            # preview commit breakdown
  bd compact --days 90 --force    # squash commits older than 90 days
  ```
- **`bd admin compact`** does **semantic issue compaction** — summarizing old *closed* issues to shrink the DB (permanent graceful decay).
  ```sh
  bd admin compact --stats                  # what's eligible
  bd admin compact --analyze --json         # export candidates for agent review
  bd admin compact --apply --id <id> --summary summary.txt
  bd admin compact --dolt --dry-run         # Dolt GC preview
  ```
- **`bd gc`** runs the full lifecycle in one shot: DECAY (delete old closed issues) → COMPACT (squash commits) → GC (reclaim disk). Always preview first.
  ```sh
  bd gc --dry-run                 # preview all three phases
  bd gc --older-than 30           # decay issues closed 30+ days ago, then compact + GC
  ```

Run `--dry-run` before any of these. They're destructive (DECAY/admin-compact discard content permanently); have a `bd backup`/`bd export` snapshot first.
