# Long-term maintenance

Keeping beads, the pinned CLI docs, the third-party plugin, and the databases healthy over time. Commands verified against `bd 1.0.5` (Homebrew).

## Version pin workflow

The `working-with-beads` skill regenerates its CLI reference from a **pinned** `bd` binary so docs match a known version. The pin lives in [`../../working-with-beads/PINNED_VERSION`](../../working-with-beads/PINNED_VERSION):

```
bd=1.0.5
plugin=1.0.4
tag=v1.0.5
```

`beads` is held by `brew pin` so routine `brew upgrade` won't move it out from under the docs. Confirm with `brew list --pinned | grep beads`.

### Bumping the pin

```sh
# 1. Edit the pin file to the new version.
$EDITOR skills/working-with-beads/PINNED_VERSION   # bd=, plugin=, tag=

# 2. Upgrade the actual binary (it's pinned, so unpin → upgrade → re-pin).
brew unpin beads && brew upgrade beads && brew pin beads
bd version   # confirm it matches the new bd= line

# 3. Regenerate the CLI reference from the new binary.
make update-working-with-beads

# 4. Review the diff — flag/subcommand changes, removed commands, new behavior.
git diff skills/working-with-beads/references/

# 5. Commit with signoff.
git add skills/working-with-beads
git commit -s -m "chore(beads): bump pinned bd to <new-version>"
```

Always sign off (`-s` / `git commit --signoff`). After committing this repo, also refresh the installed plugin cache (Joe's convention): `/plugin update agent-skills@agent-marketplace`.

## Keeping the third-party plugin in lockstep

The bundled `beads` plugin (hooks, commands, task-agent) tracks the `plugin=` line in `PINNED_VERSION`. When you bump it, update the installed plugin too:

```sh
/plugin update beads@beads-marketplace
```

This skill **supersedes** that plugin's convention guidance (especially server setup) — the plugin is kept for its lifecycle hooks and agent, not its docs.

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
