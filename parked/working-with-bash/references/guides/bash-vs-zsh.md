# Bash ↔ Zsh, and Bash → POSIX `sh`

Two migration axes in one place: moving scripts/config **between bash and zsh**, and
**hardening a bash script to portable POSIX `sh`**. For the zsh side in depth, pair with
the `working-with-zsh` skill.

## Part 1 — Bash vs Zsh

Both are ksh-derived, so 90% overlaps. The differences that actually bite:

### Arrays are indexed differently (the #1 gotcha)

| | Bash | Zsh |
| --- | --- | --- |
| First index | `0` | `1` |
| `${a[@]}` unquoted splitting | splits | does **not** word-split by default |
| All elements | `"${a[@]}"` | `$a` already gives all (no `[@]` needed) |
| Length | `${#a[@]}` | `${#a}` |

```bash
a=(x y z)
echo "${a[0]}"   # bash: x     zsh: (empty — index starts at 1)
echo "${a[1]}"   # bash: y     zsh: x
```

A script that indexes arrays will silently produce off-by-one results when run under the
wrong shell. Zsh can emulate bash's 0-based behavior with `setopt KSH_ARRAYS`.

### Word splitting

Bash word-splits unquoted parameter expansions; **zsh does not** (a defining difference).
In zsh you opt in with `setopt SH_WORD_SPLIT` or `${=var}`. This is why bash scripts that
rely on `for x in $unquoted_list` break under zsh — and why those scripts are fragile in
bash too (quote properly; iterate arrays).

### Globbing

- Zsh globbing is far richer: **glob qualifiers** (`*(.)` = regular files, `*(/)` = dirs,
  `*(.om[1])` = newest file) and recursive `**/` are built in.
- Bash needs `shopt -s globstar` for `**`, `shopt -s extglob` for `@(a|b)`, `!(x)`,
  `+(x)`, `*(x)`, `?(x)`, and `shopt -s nullglob`/`failglob`/`dotglob` for edge behavior.
- **No-match behavior:** bash leaves the unmatched glob as a literal by default (POSIX);
  zsh errors. Set `shopt -s nullglob` in bash to get zsh-like "expands to nothing."

### Startup files (different names & order)

| Shell | Login | Interactive non-login | Every shell |
| --- | --- | --- | --- |
| Bash | `/etc/profile` → first of `~/.bash_profile`, `~/.bash_login`, `~/.profile` | `~/.bashrc` | `$BASH_ENV` (non-interactive) |
| Zsh | `~/.zprofile` then `~/.zlogin` | `~/.zshrc` | `~/.zshenv` (always) |

Common bash idiom: `~/.bash_profile` sources `~/.bashrc` so login shells get interactive
config. Zsh has no equivalent need — `~/.zshrc` runs for all interactive shells.

### Prompt & expansion syntax

- Prompt escapes differ: bash `\u@\h:\w\$`, zsh `%n@%m:%~%#`. Bash also supports
  `\[...\]` to mark non-printing sequences (essential for color so line-wrap works);
  zsh uses `%{...%}`.
- `${(...)}` parameter flags (e.g. `${(U)var}` uppercase, `${(j:,:)arr}` join) are
  **zsh-only**. Bash uses `${var^^}`, `${var,,}`, and `IFS=,` + `"${arr[*]}"` to join.
- `=(...)` and `<(...)` — both have process substitution `<(...)`; zsh's `=(...)`
  (tempfile) has no bash equivalent.

### Associative arrays

Both support them, but declaration differs slightly and bash requires `declare -A` first:
```bash
declare -A m; m[foo]=1            # bash 4+
typeset -A m; m[foo]=1            # zsh
```

### `emulate` / compatibility

Zsh can run in a bash-ish mode with `emulate sh` / `emulate ksh` (or per-function
`emulate -L sh`). Bash has no "emulate zsh." To run a bash script reliably, invoke it with
`bash script.sh` rather than relying on the interactive shell.

## Part 2 — Bash → POSIX `sh` (portability)

When a script must run under `dash`, `busybox sh`, or `/bin/sh` on minimal systems, these
**bashisms** must go. Run `shellcheck -s sh script.sh` to flag them automatically.

| Bashism | POSIX replacement |
| --- | --- |
| `[[ cond ]]` | `[ cond ]` (and quote everything) |
| `(( a > b ))`, `$(( ))` arithmetic `for` | `[ "$a" -gt "$b" ]`; `while`-based loops; `$(( ))` for math is POSIX |
| Arrays `a=(x y)` | positional params `set -- x y`; `"$@"`; or whitespace lists |
| `${var,,}` / `${var^^}` (case) | `tr '[:upper:]' '[:lower:]'` |
| `${var/a/b}` substitution | `sed`/`printf` (substitution is non-POSIX) |
| `local` | non-POSIX but supported by dash/busybox; avoid in strict POSIX |
| `echo -e` / `echo -n` | `printf` (portable; `echo` flags vary) |
| `function name {` | `name() {` |
| `source file` | `. file` |
| `&>` redirect | `>file 2>&1` |
| `read -r` | POSIX ✓ (always use `-r`); `read -p`/`-a`/`-n` are not POSIX |
| `mapfile`/`readarray` | a `while IFS= read -r line` loop |
| `$'\n'` ANSI-C quoting | `printf '\n'` into a var |
| `trap ... ERR`, `set -o pipefail` | not POSIX — restructure error handling |

Rules of thumb:
- Put `#!/usr/bin/env bash` (not `#!/bin/sh`) if you use **any** bashism — declaring intent
  prevents `/bin/sh`→`dash` from silently breaking the script.
- For genuinely portable scripts, target POSIX and verify with `shellcheck -s sh` and a run
  under `dash`.
- macOS ships **bash 3.2** (2007, GPLv2) as `/bin/bash`. Anything needing bash 4+
  (`declare -A`, `${var^^}`, `mapfile`, `&>>`, `globstar`) must install a newer bash
  (Homebrew) and use `#!/usr/bin/env bash`, or avoid those features.

See also: [`pitfalls-and-safety.md`](pitfalls-and-safety.md) for quoting and strict mode,
[`../manual/bash-reference-manual.md`](../manual/bash-reference-manual.md) §"Major
Differences From The Bourne Shell," and [`../learn/posix-shell-spec.md`](../learn/posix-shell-spec.md).
