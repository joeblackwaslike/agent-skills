# Bash pitfalls & writing safe scripts

The failure modes that cause real bugs and real outages, and how to avoid them. The
canonical exhaustive list is [`../learn/bashpitfalls.md`](../learn/bashpitfalls.md) (Greg
Wooledge's BashPitfalls); this guide is the high-leverage subset plus the tooling that
catches the rest. **Run [ShellCheck](https://www.shellcheck.net) on everything** — it flags
the majority of what follows automatically.

## The cardinal rule: quote your expansions

```bash
rm -rf $dir/         # ☠️  if dir is empty or has spaces, catastrophe
rm -rf "$dir"/       # ✅  quoted

cp $file $dest       # breaks on spaces, globs, and word-splitting
cp -- "$file" "$dest"  # ✅  quoted + `--` ends option parsing
```
**Unquoted `$var` undergoes word-splitting AND glob expansion.** Quote every expansion
unless you have a specific, understood reason not to. `"$@"` (not `$@` or `$*`) to forward
args. `"${arr[@]}"` (not `${arr[@]}`) for arrays.

## `[ ]` vs `[[ ]]`

```bash
[ $x == $y ]            # ☠️  word-splits; empty x → syntax error; == is non-POSIX in [ ]
[ "$x" = "$y" ]         # ✅  POSIX-correct (single = , quoted)
[[ $x == "$y" ]]        # ✅  bash: no splitting; quote RHS or it's a PATTERN not a literal
```
In bash prefer `[[ ]]` (safer, supports `=~`, `&&`, `<`). Remember: **inside `[[ ]]` the
right side of `==`/`!=` is a glob pattern unless quoted.** `[[ $f == *.txt ]]` matches;
`[[ $f == "*.txt" ]]` is literal.

## `set -e` / `set -u` / `pipefail` — use them, know the holes

`set -euo pipefail` is the standard strict mode, but `set -e` is famously surprising:

- `set -e` does **not** trigger inside a command used in a condition (`if`, `&&`, `||`,
  `while`), nor for any command except the *last* in a pipeline (that's what `pipefail`
  fixes), nor inside command substitution in older bash.
- `cmd_that_may_fail` swallowed by `|| true` is fine; but `foo=$(maybe_fails)` may not exit.
- A function called in a conditional disables `-e` for its *entire* body.

```bash
set -Eeuo pipefail
# -E makes ERR traps fire in functions/subshells; pair with:
trap 'echo "FAIL line $LINENO: $BASH_COMMAND (exit $?)" >&2' ERR
```
For critical scripts, don't rely on `-e` alone — check return codes explicitly where it
matters: `cmd || { echo "cmd failed" >&2; exit 1; }`.

`set -u` (error on unset var) bites with arrays/`$@` in old bash and unset-but-intended
vars — use `"${var:-}"` to read a maybe-unset var safely.

## Parsing `ls` — don't

```bash
for f in $(ls *.txt); do ...; done     # ☠️  breaks on spaces, newlines, globs, set -u
for f in *.txt; do ...; done           # ✅  let the glob do it (+ shopt -s nullglob)
```
Never `for x in $(cmd)` over filenames. Use a glob, or `find -print0` + `read -d ''`
(see [`cookbook.md`](cookbook.md)).

## The `cmd | while read` subshell trap

```bash
count=0
printf 'a\nb\n' | while read -r l; do (( count++ )); done
echo "$count"      # ☠️  0 — the while ran in a subshell; changes are lost
# ✅ use process substitution so the loop runs in the current shell:
while read -r l; do (( count++ )); done < <(printf 'a\nb\n')
echo "$count"      # 2
```

## `read` without `-r`

```bash
read line          # ☠️  mangles backslashes
IFS= read -r line  # ✅  -r = raw (no backslash processing); IFS= preserves leading/trailing space
```

## Command substitution strips trailing newlines

`x=$(cat file)` drops trailing newlines — fine usually, but don't rely on
`$(...)` to preserve exact bytes. For binary or exact data, read into a file.

## Arithmetic with `set -e` and `(( ))`

```bash
set -e
(( count++ ))      # ☠️  when count goes 0→1 the expression result is 0 → exit status 1 → script exits!
((  count++  )) || true       # or use:  count=$(( count + 1 ))
```
`(( expr ))` returns exit status 1 when `expr` evaluates to 0. Combined with `set -e`,
`(( x++ ))` where x is 0 will kill your script. Use `count=$((count+1))` or append `|| true`.

## Globs that don't match

By default an unmatched glob stays as the **literal pattern string**:
```bash
for f in *.nope; do echo "$f"; done    # prints  *.nope  once if nothing matches
shopt -s nullglob                       # ✅  now it iterates zero times
```

## `echo` is not portable; use `printf`

```bash
echo "-n"          # behavior varies (flag vs literal) across shells/builds
echo "a\tb"        # -e handling varies
printf '%s\n' "$x" # ✅  predictable everywhere; %s stops format-string injection
printf '%s\n' "$untrusted"   # NEVER: printf "$untrusted"  (format-string bug)
```

## Subtle ones worth knowing

- **`$?` is volatile** — capture it on the first line of any handler; the next command resets it.
- **`local` masks exit status:** `local x=$(cmd)` always returns 0 (the `local` succeeds),
  hiding `cmd`'s failure. Split: `local x; x=$(cmd) || return`.
- **`cd` can fail silently:** `cd "$d" || exit 1` before doing destructive work in `$d`.
- **`trap ... EXIT` + `set -e`:** the EXIT trap still runs on error — good for cleanup.
- **Reserved-word vs builtin:** `time`, `[[`, `{` are keywords; `[`, `test`, `:` are builtins.
- **`mapfile` needs bash 4** (macOS stock bash 3.2 lacks it).
- **`$RANDOM` is not cryptographic.** Use `/dev/urandom`/`openssl rand` for secrets.

## Secrets & injection

- Don't pass secrets as command-line args (visible in `ps`/`/proc`). Use env vars or stdin.
- Quote everything that touches user/file input; treat all input as hostile.
- `eval` is almost never necessary — it's an injection vector. Prefer arrays for building
  command lines: `cmd=(rsync -a "$src" "$dst"); "${cmd[@]}"`.
- Set a safe `IFS` and avoid relying on the caller's `PATH` in privileged scripts.

## Tooling that enforces all this

| Tool | Use | Repo/README |
| --- | --- | --- |
| **ShellCheck** | Static analysis — catches most pitfalls here; `shellcheck -s bash script.sh` | [`../ecosystem/shellcheck__readme.md`](../ecosystem/shellcheck__readme.md) |
| **shfmt** (`mvdan/sh`) | Format/canonicalize; `shfmt -w -i 2 -ci script.sh` | [`../ecosystem/shfmt__readme.md`](../ecosystem/shfmt__readme.md) |
| **bats-core** | Unit-test bash; `@test` blocks | [`../ecosystem/bats-core__readme.md`](../ecosystem/bats-core__readme.md) |
| `bash -n script.sh` | Syntax check without running | (built in) |
| `bash -x script.sh` / `set -x` | Trace execution; tune with `PS4='+ ${BASH_SOURCE}:${LINENO}: '` | (built in) |

Wire ShellCheck + shfmt into pre-commit/CI. A green ShellCheck run eliminates the large
majority of the bugs in this guide before they ship.

## Going deeper

- **BashPitfalls (full list):** [`../learn/bashpitfalls.md`](../learn/bashpitfalls.md)
- **BashFAQ:** https://mywiki.wooledge.org/BashFAQ
- **Per-check explanations:** https://www.shellcheck.net/wiki/ (e.g. `SC2086` = unquoted var)
- **Style:** [`../learn/google-shell-style-guide.md`](../learn/google-shell-style-guide.md)
