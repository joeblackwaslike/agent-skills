# Locating and Reconstructing Sessions

## Finding this project's transcripts

Claude Code stores one `.jsonl` per session under `~/.claude/projects/<slug>/`, where the slug is
the working directory with `/` replaced by `-` and the leading slash dropped:

```bash
PROJECT_DIR=$(pwd | sed 's|^/||; s|/|-|g')
ls -t ~/.claude/projects/"$PROJECT_DIR"/*.jsonl 2>/dev/null | head -1    # resume: newest only
ls -t ~/.claude/projects/"$PROJECT_DIR"/*.jsonl 2>/dev/null | head -10   # audit: recent N
```

`ls -t` sorts by mtime, so the newest session is first. For an audit, bound by the lookback window
rather than a fixed count — `-mtime -3` for three days:

```bash
find ~/.claude/projects/"$PROJECT_DIR" -name '*.jsonl' -mtime -3 2>/dev/null | sort
```

If nothing matches, say so plainly and ask where things left off. Do not guess from the working
tree — a dirty tree tells you what changed, not what was intended or discussed.

**Other tools:** Codex and Gemini keep their own session history for the current cwd; use each
tool's history mechanism rather than assuming the Claude path exists. The reconstruction and
analysis below are tool-agnostic once you have readable turns.

**Home-directory renames matter.** A slug is derived from an absolute path, so a renamed home
directory silently orphans every prior transcript into a dead slug. If a project that should have
history returns nothing, check for a stale slug from the old path before concluding the sessions
never existed.

## Reconstructing the conversation

Extract user and assistant turns as readable prose. Tool calls and results are usually noise for
this purpose — the exception is `TodoWrite`, handled below.

```bash
jq -r '
  if .type == "human" then
    "USER: " + (.message.content
      | if type == "string" then . else (map(select(.type == "text") | .text) | join(" ")) end)
  elif .type == "assistant" then
    "CLAUDE: " + (.message.content // [] | map(select(.type == "text") | .text) | join(" "))
  else empty
  end
' <session>.jsonl 2>/dev/null
```

For **resume**, read the tail — the last stretch is where the interruption lives. For **audit**,
read each session's flow; head-limit only if a transcript is genuinely enormous, and say so if you
truncate. Silently analyzing the first 500 lines of a 5,000-line session and reporting "nothing
outstanding" is a false all-clear.

## Extracting incomplete todos

Any `TodoWrite` entry not marked `completed` is an explicit, machine-readable commitment the
session made and did not finish. This is the highest-signal, lowest-effort item in the whole scan:

```bash
jq -r '
  select(.type == "assistant")
  | .message.content[]?
  | select(.type == "tool_use" and .name == "TodoWrite")
  | .input.todos[]?
  | select(.status != "completed")
  | "TODO[\(.status)]: \(.content)"
' <session>.jsonl 2>/dev/null
```

Todo lists are rewritten wholesale on each call, so the **last** `TodoWrite` in a session is the
authoritative final state. Earlier ones show intermediate progress and will list items that were
finished later — reporting those as outstanding is a false positive. Take the final list, and use
the earlier ones only to see what got dropped from the list entirely without being completed.

## Verify before reporting

The transcript records what was *said*, not what is *true now*. Before presenting a finding, check
it against the current state: a file the session promised to write may exist, a test it never ran
may now pass, a question it left open may have been settled in a later session. Reporting stale
items as open costs the reader more than missing a marginal one.
