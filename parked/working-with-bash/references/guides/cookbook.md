# Bash cookbook

Copy-paste recipes for the things people actually do in bash. All examples assume
**bash 4+** (macOS `/bin/bash` is 3.2 — use Homebrew bash for `declare -A`, `${var^^}`,
`mapfile`, `globstar`). Verify scripts with `shellcheck`. For why these patterns are safe,
see [`pitfalls-and-safety.md`](pitfalls-and-safety.md).

## Strict mode & script skeleton

```bash
#!/usr/bin/env bash
set -Eeuo pipefail        # -E: ERR trap inherited; -e: exit on error; -u: unset = error; pipefail
IFS=$'\n\t'               # safer word-splitting (no spaces)
trap 'echo "error on line $LINENO" >&2' ERR

main() {
  ...
}
main "$@"
```
Caveats on `set -e` are real — see the pitfalls guide before relying on it.

## Variables & parameter expansion

```bash
${var:-default}      # use default if unset/empty
${var:=default}      # assign default if unset/empty
${var:?msg}          # error+exit if unset/empty
${var:+alt}          # use alt only if var IS set
${#var}              # length
${var:offset:len}    # substring (0-based)
${var#pat}  ${var##pat}   # strip shortest/longest prefix
${var%pat}  ${var%%pat}   # strip shortest/longest suffix
${var/pat/rep}  ${var//pat/rep}   # replace first / all
${var/#pat/rep} ${var/%pat/rep}   # anchored to start / end
${var^}  ${var^^}    # uppercase first / all (bash 4+)
${var,}  ${var,,}    # lowercase first / all
${var@Q}             # quoted form, safe to re-eval (bash 4.4+)
${!prefix*}          # names of vars starting with prefix (indirect)
${!ref}              # indirect: value of the var named by $ref
```

Path manipulation without `dirname`/`basename`:
```bash
path=/a/b/c.txt
echo "${path##*/}"   # c.txt   (basename)
echo "${path%/*}"    # /a/b    (dirname)
echo "${path##*.}"   # txt     (extension)
echo "${path%.*}"    # /a/b/c  (drop extension)
```

## Arrays

```bash
arr=(a b c)                 # index 0-based
arr+=(d)                    # append
echo "${arr[1]}"            # b
echo "${arr[@]}"            # all elements (always quote: "${arr[@]}")
echo "${#arr[@]}"           # count
echo "${!arr[@]}"           # indices
for x in "${arr[@]}"; do ...; done
unset 'arr[1]'              # remove element (leaves a sparse array)
printf '%s\n' "${arr[@]}"   # one per line

# Associative (bash 4+)
declare -A m
m[host]=localhost; m[port]=8080
for k in "${!m[@]}"; do echo "$k=${m[$k]}"; done
```

Read a file/command into an array:
```bash
mapfile -t lines < file.txt              # bash 4+; -t strips newlines
readarray -t lines < <(some-command)     # same thing, alias
# pre-4 / portable:
while IFS= read -r line; do lines+=("$line"); done < file.txt
```

## Loops, reading input

**Read a file line by line (the only correct way):**
```bash
while IFS= read -r line || [[ -n $line ]]; do   # || handles a missing final newline
  printf '%s\n' "$line"
done < file.txt
```

**Iterate files safely (handles spaces/newlines):**
```bash
shopt -s nullglob                # so an empty match yields nothing, not a literal '*'
for f in ./*.log; do echo "$f"; done

# Arbitrary depth + filenames with any character → find -print0:
while IFS= read -r -d '' f; do echo "$f"; done < <(find . -name '*.log' -print0)
```

**C-style and ranges:**
```bash
for ((i=0; i<5; i++)); do echo "$i"; done
for i in {1..10}; do :; done           # brace range (literal — not for variables!)
for i in {0..20..2}; do echo "$i"; done # step
n=10; for i in $(seq 1 "$n"); do :; done # variable upper bound (braces won't expand vars)
```

## Conditionals & tests

```bash
[[ -f $f ]]            # file exists & regular     [[ -d $d ]] dir   [[ -e $p ]] exists
[[ -r/-w/-x $p ]]      # readable/writable/executable
[[ -s $f ]]            # non-empty                  [[ -L $p ]] symlink
[[ -z $s ]] / [[ -n $s ]]   # empty / non-empty string
[[ $a == "$b" ]]       # string equal (RHS quoted = literal; unquoted = pattern match!)
[[ $s == *.txt ]]      # glob match
[[ $s =~ ^[0-9]+$ ]]   # regex match; captures in ${BASH_REMATCH[@]}
[[ $a -eq $b ]]        # numeric (or use (( a == b )))
(( a > b && c ))       # arithmetic context: bare names, C operators, no $ needed
[[ cond1 && cond2 ]]   # && || inside [[ ]]; group with ( )
```
Prefer `[[ ]]` over `[ ]` in bash (no word-splitting/glob surprises, supports `=~`, `&&`).
Use `(( ))` for arithmetic.

## Functions, args, return values

```bash
greet() {
  local name=${1:?name required}      # local! and required-arg check
  local greeting=${2:-Hello}
  printf '%s, %s\n' "$greeting" "$name"   # "return" data by printing
}
result=$(greet World)                  # capture
greet World Hi
echo "$#"            # arg count        "$@"  all args (quoted!)   "$1".."$9" "${10}"
shift 2              # drop first 2 args
```
`return` only sets an exit status (0–255), not a value. Return data via stdout + `$(...)`.

## Here-docs & here-strings

```bash
cat <<EOF            # expands $vars and `cmds`
user=$USER
EOF

cat <<'EOF'          # quoted delimiter → NO expansion (literal)
$nothing is expanded
EOF

cat <<-EOF           # <<- strips leading TABS (only tabs) for indentation
	indented with tabs
	EOF

grep foo <<< "$multiline_var"   # here-string: feed a var as stdin
```

## Command substitution & process substitution

```bash
now=$(date +%F)                       # $(...) nests cleanly; prefer over backticks
diff <(sort a.txt) <(sort b.txt)      # process substitution: cmd output as a file
while read -r l; do :; done < <(cmd)  # avoid the subshell that `cmd | while` creates
```

## Traps, cleanup, signals

```bash
tmp=$(mktemp)
cleanup() { rm -f "$tmp"; }
trap cleanup EXIT          # runs on any exit (normal, error, signal)
trap 'echo interrupted >&2; exit 130' INT TERM
```

## Arithmetic

```bash
(( x = 3 * (a + 1) ))      # assignment in arithmetic context
echo $(( 2**10 ))          # 1024
(( i++ )); (( total += n ))
n=$(( RANDOM % 100 ))      # 0..99
printf '%d\n' "$((16#FF))" # base conversion: hex FF -> 255
```
Bash arithmetic is **integer only**. For floats use `awk`, `bc`, or `printf`:
```bash
echo "scale=2; 22/7" | bc        # 3.14
awk 'BEGIN{printf "%.2f\n", 22/7}'
```

## Programmable completion

```bash
_mytool() {
  local cur=${COMP_WORDS[COMP_CWORD]}
  local opts="start stop status --help"
  COMPREPLY=( $(compgen -W "$opts" -- "$cur") )
}
complete -F _mytool mytool
# Simple cases without a function:
complete -W "start stop restart" mytool      # word list
complete -f -X '!*.@(jpg|png)' viewpic       # files filtered by pattern (extglob)
```
For real completion suites, lean on **bash-completion** (see
[`frameworks-and-managers.md`](frameworks-and-managers.md)). Full API:
[`../manual/bash.md`](../manual/bash.md) "Programmable Completion."

## History & Readline (`.inputrc`)

```bash
# ~/.bashrc history hygiene
HISTSIZE=100000; HISTFILESIZE=200000
HISTCONTROL=ignoreboth:erasedups        # no dups, no leading-space cmds
shopt -s histappend                     # append, don't overwrite
PROMPT_COMMAND='history -a'             # write each command immediately
```
History expansion: `!!` last cmd, `!$` last arg, `!^` first arg, `!:2` 2nd word,
`!foo` last cmd starting foo, `^old^new` quick-sub on last cmd, `!!:gs/a/b/` global sub.

```bash
# ~/.inputrc (Readline) — affects every readline app, not just bash
set completion-ignore-case on
set show-all-if-ambiguous on
"\e[A": history-search-backward         # Up = prefix-search history
"\e[B": history-search-forward
set editing-mode vi                     # or emacs (default)
```
Reload without restarting: `bind -f ~/.inputrc`. Details:
[`../manual/readline.md`](../manual/readline.md) and [`../manual/history.md`](../manual/history.md).

## Globbing toggles (`shopt`)

```bash
shopt -s globstar     # ** matches across directories:  ls **/*.js
shopt -s extglob      # @(a|b) !(x) +(x) *(x) ?(x)
shopt -s nullglob     # no match -> expands to nothing (not the literal pattern)
shopt -s failglob     # no match -> error (interactive convenience)
shopt -s dotglob      # globs include dotfiles
shopt -s nocaseglob   # case-insensitive globbing
```

## Strings

```bash
s="Hello World"
echo "${s,,}"                 # hello world
echo "${s// /_}"              # Hello_World
[[ $s == *World* ]] && echo contains
IFS=',' read -ra parts <<< "a,b,c"      # split on comma into array
joined=$(IFS=,; echo "${parts[*]}")     # join array with comma
printf -v padded '%05d' 42              # zero-pad -> 00042 (printf into a var)
trim() { local s=$1; s=${s#"${s%%[![:space:]]*}"}; s=${s%"${s##*[![:space:]]}"}; printf '%s' "$s"; }
```

More pure-bash string/array tricks (no external processes):
[`../learn/pure-bash-bible.md`](../learn/pure-bash-bible.md).
