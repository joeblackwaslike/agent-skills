# Shell: Bash and zsh

Shell is the right tool for glue: running commands, moving files, short pipelines. KISS cuts both ways here. A ten-line script beats a Python program for the same job, but past roughly a hundred lines, or once a script needs data structures, JSON beyond `jq` one-liners, or careful error recovery, it should become Python or TypeScript. The shell scripts playbook is the review pass; this file is the reference.

## Tooling

- **ShellCheck** for Bash and POSIX sh. Each disabled check (`# shellcheck disable=SC2086`) has a reason next to it. ShellCheck doesn't support zsh.
- **shfmt** for consistent formatting of Bash and sh.
- **Bats** for tests of non-trivial scripts.
- **`bash -n` and `zsh -n`** parse a script without running it; useful in CI for zsh, which has no linter of ShellCheck's depth.

## Bash and zsh differences

The two look alike and behave differently in ways that bite. A script's shebang decides which rules apply, so review it against the right column.

| Behavior | Bash | zsh |
| --- | --- | --- |
| Unquoted `$var` | Split on whitespace and glob-expanded | Not split and not globbed by default (`SH_WORD_SPLIT` and `GLOB_SUBST` are off) |
| Array indexes | Start at 0 | Start at 1 by default |
| Glob with no matches | Passed through literally (unless `nullglob` or `failglob`) | Error: "no matches found" (`NOMATCH` is on) |
| `echo "a\nb"` | Prints the backslash literally | Interprets the escape |
| Strict mode | `set -euo pipefail` | `set -euo pipefail` works too; functions use `emulate -L zsh` to get predictable local options |
| Version on macOS | `/bin/bash` is 3.2, without many modern features; Homebrew bash is current | Current, and the default login shell |
| Linting | ShellCheck | No ShellCheck support; `zsh -n` and careful review |

Practical rules that hold in both: always quote expansions, use `printf` instead of `echo` for anything but fixed text, and don't write a script for one shell and run it with the other.

## Idioms

| Non-idiomatic | Idiomatic | Why it matters |
| --- | --- | --- |
| `$var`, `$@` unquoted | `"$var"`, `"$@"`, `"${arr[@]}"` | Spaces and globs in values break commands, sometimes destructively |
| `for f in $(ls *.txt)` | `for f in *.txt` (with `nullglob` in Bash) | Parsing `ls` breaks on spaces and newlines |
| `` `cmd` `` | `$(cmd)` | Nests and reads clearly |
| `[ $a == $b ]` | `[[ $a == "$b" ]]` in Bash and zsh | No word splitting inside `[[ ]]`, and fewer quoting traps |
| `echo "$data"` | `printf '%s\n' "$data"` | `echo` treats some values as options or escapes |
| `cat file \| grep x` | `grep x file` | One process, same result |
| `grep`, `sed` or `awk` over JSON | `jq` | JSON isn't line-oriented |
| `cd dir` then work | `cd dir \|\| exit 1`, or `( cd dir && ... )` | Otherwise the work runs in the wrong directory |
| Fixed temp paths (`/tmp/out.txt`) | `tmp=$(mktemp)` with `trap 'rm -f "$tmp"' EXIT` | No collisions, always cleaned up |
| `which cmd` | `command -v cmd` | Built in and reliable |
| `read line` | `IFS= read -r line` | Keeps backslashes and leading whitespace |
| `rm -rf $dir/` | `rm -rf -- "${dir:?}/"` | An empty variable no longer means `rm -rf /` |
| `local out=$(cmd)` | `local out` then `out=$(cmd)` | Combined, the exit status of `cmd` is lost |

## Shell-specific smells

- **No strict mode**, or strict mode trusted where it doesn't apply: `set -e` is ignored inside a function called from `if`, `&&` or `||`, and a pipeline without `pipefail` reports only its last command.
- **Secrets on the command line** (`curl -H "Authorization: Bearer $TOKEN"`), visible to anyone running `ps`. Pass them through files, stdin or environment variables.
- **`curl ... | sh`** without a checksum or signature check.
- **Assumed environment.** Scripts run by cron, launchd or CI get a minimal `PATH` and may not have `HOME` or your dotfiles; set what the script needs explicitly.
- **`sudo` inside a script** rather than documenting that the script needs root and failing clearly without it.
- **Long scripts without functions**, a `main`, or `--help`.

