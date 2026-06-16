# Bash → Zsh: differences & migration

Zsh is *mostly* a superset of Bash for interactive use, but there are real behavioral
differences that break scripts and surprise switchers. The authoritative concise source is
the Zsh FAQ chapter 2 (`references/ecosystem/faq.md`); this is the practical distillation.

> **Golden rule for portability:** if a script must run under both, put `#!/usr/bin/env bash`
> and run it with bash. To run an existing sh/bash script under zsh, use `emulate -L sh` (or
> `emulate -L bash`) at the top of a function/script — it flips the relevant options locally.

## The differences that bite first

### 1. Arrays are 1-indexed, and `$arr` is not all elements
```zsh
arr=(a b c)
echo $arr[1]        # a   (NOT b — zsh arrays start at 1)
echo $arr[-1]       # c   (negative indexing)
echo ${arr[@]}      # works, but zsh-native is: echo $arr  -> a b c
echo ${#arr}        # 3   (count)
echo $arr[2,3]      # b c (slice)
```
Bash: `${arr[0]}` is the first element; `$arr` is `${arr[0]}`. In zsh `$arr` is the **whole
array**. Set `setopt KSH_ARRAYS` to get Bash/ksh 0-indexed semantics (and required `${ }`).

### 2. No word-splitting on unquoted parameter expansion (the big one)
```zsh
files="a.txt b.txt"
for f in $files; do echo "$f"; done   # zsh: ONE iteration "a.txt b.txt"
                                      # bash: TWO iterations
```
Zsh does **not** split scalar `$var` on whitespace by default — a feature that prevents a whole
class of bugs. To get Bash behavior: `setopt SH_WORD_SPLIT`, or split explicitly with the `(s)`
flag / `=` :
```zsh
for f in ${(s: :)files}; do ... done   # explicit split on space (preferred)
for f in ${=files}; do ... done        # = forces sh-style splitting for this expansion
```

### 3. Globbing is stricter and far more powerful
- **No-match is an error by default.** `ls *.foo` with no matches → `zsh: no matches found`.
  Bash silently passes the literal `*.foo`. Options: `setopt NULL_GLOB` (expand to nothing),
  `setopt NOMATCH` off via `unsetopt NOMATCH`, or per-glob `*.foo(N)` qualifier.
- **Extended globbing** (`setopt EXTENDED_GLOB`) adds `^`, `~`, `#`, `(#i)`, `**/` recursive,
  and **glob qualifiers** like `*(.)` (regular files), `*(/)` (dirs), `*(.om[1])` (newest file),
  `**/*(.)` (all files recursively). See `manual/zshexpn.md`.
- `**/` recursive glob is built in (no `globstar` needed).

### 4. `[[ ... ]]` and regex
Both support `[[ ]]`. Zsh's `=~` uses the regex flavor of the `zsh/regex` module (ERE), and the
match groups land in `$MATCH`/`$match` (array), not Bash's `$BASH_REMATCH`.

### 5. Prompt expansion uses `%` escapes, not `\`
Zsh prompts use `%n` (user), `%m` (host), `%~` (cwd), `%#` (#/%), `%F{red}…%f` (color),
`%B…%b` (bold). Bash uses `\u`, `\h`, `\w`, `\[\]`. Enable substitution in prompts with
`setopt PROMPT_SUBST`. See the PROMPT section of `manual/zshmisc.md`.

## Quick equivalence table

| Concept | Bash | Zsh |
| --- | --- | --- |
| First array element | `${arr[0]}` | `$arr[1]` |
| All elements | `${arr[@]}` | `$arr` (or `${arr[@]}`) |
| Array length | `${#arr[@]}` | `${#arr}` or `$#arr` |
| Assoc array declare | `declare -A m` | `typeset -A m` (same) |
| Split string on IFS | automatic on `$var` | `${(s: :)var}` or `${=var}` |
| Recursive glob | `shopt -s globstar; **` | `**/` (built in) |
| Case-insensitive glob | `shopt -s nocaseglob` | `setopt NO_CASE_GLOB` or `(#i)pattern` |
| Nullglob | `shopt -s nullglob` | `setopt NULL_GLOB` or `(N)` qualifier |
| Regex match var | `${BASH_REMATCH[1]}` | `$match[1]` (and `$MATCH`) |
| `\` prompt escapes | `\u@\h:\w` | `%n@%m:%~` |
| Last bg pid | `$!` | `$!` (same) |
| Run sh-compatibly | `bash script.sh` | `emulate -L sh` then run |
| Loadable completion | `complete -F` | `compdef` / completion system |

## Startup file order — also different

Zsh reads (for the matching shell type) in this order:
`/etc/zshenv` → `~/.zshenv` → (login) `/etc/zprofile` → `~/.zprofile` →
(interactive) `/etc/zshrc` → `~/.zshrc` → (login) `/etc/zlogin` → `~/.zlogin`.

- `~/.zshenv` — **always** sourced (even non-interactive scripts) → put `$PATH`/env exports here,
  but keep it minimal and fast.
- `~/.zprofile` — login shells, before `.zshrc` (analogous to `.bash_profile`).
- `~/.zshrc` — interactive shells → aliases, prompt, completion, keybindings, plugins.
- `~/.zlogin` — login shells, after `.zshrc`.

Bash's single `.bashrc`/`.bash_profile` split maps roughly to `.zshrc`/`.zprofile`.

## Migration checklist

1. `cp ~/.bash_aliases`-style aliases into `~/.zshrc` (alias syntax is identical).
2. Move `export PATH=...` and env vars to `~/.zshenv` (or `.zprofile` if login-only).
3. Replace `PS1='\u@\h \w \$ '` with `PROMPT='%n@%m %~ %# '`.
4. Re-test any script relying on word-splitting; add `setopt SH_WORD_SPLIT` only if you must,
   otherwise fix with `${(s)...}`/`${=...}`.
5. Enable completion: `autoload -Uz compinit && compinit` (see `cookbook.md`).
6. For scripts that must stay bash-compatible, keep the bash shebang — don't run them with zsh.

## Common "it broke under zsh" causes

- **`for x in $var` looping once** → word-splitting (see §2).
- **`no matches found`** → unmatched glob (see §3); add `(N)` or `setopt NULL_GLOB`.
- **Off-by-one array bugs** → 1-indexing (see §1).
- **`$0` differs / function name issues** → set `setopt FUNCTION_ARGZERO` behavior; in functions
  `$0` is the function name unless `POSIX_ARGZERO`.
- **`read` differences** → zsh `read` doesn't split into multiple vars the same way; use `read -A`
  for arrays, `read -r`.
