# Bash skill — orientation & routing

This skill bundles the official Bash manual, the tooling ecosystem, a community learning
corpus, and hand-written guides. Use this page to jump to the right file fast.

## The four reference buckets

| Bucket | Provenance | What's in it |
| --- | --- | --- |
| `references/manual/` | `man bash` is **verbatim, version-exact** to [`PINNED_VERSION`](../../PINNED_VERSION) (bash 5.3.9); the GNU manuals are **fetched snapshots** | `bash.md`, `bashbug.md`, `bash-reference-manual.md`, `readline.md`, `history.md` |
| `references/ecosystem/` | fetched snapshots (weekly CI) | framework/manager/prompt/plugin/tool READMEs |
| `references/learn/` | fetched snapshots | pure-bash-bible, bash-handbook, bash-hackers-wiki mirror, Google style guide, POSIX spec, BashPitfalls, Chet's FAQ |
| `references/guides/` | hand-written (this dir) | overview, bash-vs-zsh, frameworks-and-managers, prompts, cookbook, pitfalls-and-safety |

## "I need to…" cheatsheet

| Goal | Go to |
| --- | --- |
| Look up exact syntax / a builtin / an option | [`../manual/bash.md`](../manual/bash.md) (grep it) |
| Read the same material as organized prose | [`../manual/bash-reference-manual.md`](../manual/bash-reference-manual.md) |
| Key bindings, vi/emacs mode, `.inputrc` | [`../manual/readline.md`](../manual/readline.md) |
| History expansion (`!!`, `!$`, `!:gs/a/b/`) | [`../manual/history.md`](../manual/history.md) |
| A working recipe for a common task | [`cookbook.md`](cookbook.md) |
| Why my script misbehaves / quoting bugs | [`pitfalls-and-safety.md`](pitfalls-and-safety.md) + [`../learn/bashpitfalls.md`](../learn/bashpitfalls.md) |
| Make a script POSIX-portable, or move to/from zsh | [`bash-vs-zsh.md`](bash-vs-zsh.md) |
| Pick a framework / plugin manager | [`frameworks-and-managers.md`](frameworks-and-managers.md) |
| Pick a prompt | [`prompts.md`](prompts.md) |
| Pure-bash idioms (no `sed`/`awk`/`cut`) | [`../learn/pure-bash-bible.md`](../learn/pure-bash-bible.md) |
| Style conventions for a team | [`../learn/google-shell-style-guide.md`](../learn/google-shell-style-guide.md) |

## Authority ladder (when sources disagree)

1. **`man bash`** for the version you run (here, [`../manual/bash.md`](../manual/bash.md) @ 5.3.9) — ground truth.
2. **GNU Bash Reference Manual** ([`../manual/bash-reference-manual.md`](../manual/bash-reference-manual.md)) — same content, prose form; may describe a newer release.
3. **POSIX spec** ([`../learn/posix-shell-spec.md`](../learn/posix-shell-spec.md)) — the portability floor (what `sh` guarantees).
4. Community docs (BashPitfalls, pure-bash-bible, Greg's wiki) — excellent practice, not normative.

## External resources not vendored here

The wooledge.org wiki rate-limits hard, so only the single **BashPitfalls** page is mirrored.
The rest are best read live:

- **BashFAQ** — https://mywiki.wooledge.org/BashFAQ (the canonical "how do I…" Q&A)
- **BashGuide** — https://mywiki.wooledge.org/BashGuide (the canonical tutorial)
- **ShellCheck wiki** — https://www.shellcheck.net/wiki/ (one page per `SCxxxx` code, e.g. https://www.shellcheck.net/wiki/SC2086)
- **Advanced Bash-Scripting Guide** — https://tldp.org/LDP/abs/html/ (encyclopedic but frozen ~2014; cross-check against `man bash`)
- **explainshell** — https://explainshell.com (annotates any command line; runtime tool, not a doc)
