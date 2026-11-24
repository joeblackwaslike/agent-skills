# Zsh cookbook — practical recipes

Recipes you reach for constantly. For the exhaustive reference behind each, see the linked
manual chapter. For a huge one-liner collection, also see `ecosystem/zsh-lovers.md`.

## Globbing & glob qualifiers (`manual/zshexpn.md`)
Requires `setopt EXTENDED_GLOB` for `^`/`~`/`#` operators (qualifiers in `(...)` work without it).
```zsh
ls **/*.js                 # recursive (no globstar needed)
ls *(.)                    # regular files only
ls *(/)                    # directories only
ls *(.om[1])               # newest regular file (o=order, m=mtime, [1]=first)
ls *(.OL[1,3])             # 3 largest files (O=reverse order, L=size)
ls *(.m-7)                 # files modified within last 7 days
ls **/*(.x)                # recursively, executable files
ls *.txt(.N)               # NULL_GLOB for this glob — no error if none match
print -l *(D)              # include dotfiles
ls ^*.bak                  # everything EXCEPT *.bak  (EXTENDED_GLOB)
ls *.(jpg|png)             # alternation
ls (#i)readme*             # case-insensitive
cp file.txt{,.bak}         # brace expansion -> cp file.txt file.txt.bak
```

## Parameter expansion & flags (`manual/zshexpn.md`)
```zsh
name=/path/to/file.tar.gz
echo ${name:h}    # /path/to        (head/dirname)
echo ${name:t}    # file.tar.gz     (tail/basename)
echo ${name:r}    # /path/to/file.tar (root — strip last ext)
echo ${name:e}    # gz              (extension)
echo ${name:t:r} # file.tar         (chain modifiers)

arr=(foo bar baz)
echo ${(j:,:)arr}      # foo,bar,baz   (join with ,)
echo ${(s:,:)str}      # split on ,
echo ${(o)arr}         # sort ascending; (O) descending; (u) unique
echo ${(U)arr}         # uppercase; (L) lower; (C) Capitalize
echo ${(k)assoc}       # keys; ${(v)assoc} values; ${(kv)assoc} both
echo ${var:-default}   # default if unset/empty
echo ${var:=default}   # assign default
echo ${(P)varname}     # indirect — value of the var NAMED by $varname
echo ${#arr}           # length
echo ${arr:#bar}       # remove elements matching pattern 'bar'
```

## Aliases, functions, suffix aliases, global aliases
```zsh
alias ll='ls -lAh'
alias -g G='| grep'          # global alias: ls G foo  ->  ls | grep foo
alias -s md=glow             # suffix alias: running ./notes.md opens it in glow
myfunc() { print "args: $@"; }
autoload -Uz myfunc          # lazy-load a function from $fpath
```

## History — sane defaults for `.zshrc` (`manual/zshoptions.md`)
```zsh
HISTFILE=~/.zsh_history
HISTSIZE=50000
SAVEHIST=50000
setopt SHARE_HISTORY        # share across running shells live
setopt HIST_IGNORE_ALL_DUPS # drop older duplicate entries
setopt HIST_IGNORE_SPACE    # commands starting with space aren't recorded
setopt HIST_REDUCE_BLANKS
setopt EXTENDED_HISTORY     # timestamp + duration
setopt INC_APPEND_HISTORY   # write immediately (alternative to SHARE_HISTORY)
```
History search keybinds (incremental up/down on what you've typed):
```zsh
autoload -Uz up-line-or-beginning-search down-line-or-beginning-search
zle -N up-line-or-beginning-search
zle -N down-line-or-beginning-search
bindkey '^[[A' up-line-or-beginning-search    # Up
bindkey '^[[B' down-line-or-beginning-search  # Down
```

## Completion system — minimal robust setup (`manual/zshcompsys.md`)
```zsh
autoload -Uz compinit && compinit          # initialize (once, in .zshrc)
zstyle ':completion:*' menu select         # arrow-key menu
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'  # case-insensitive
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}      # colorize matches
zstyle ':completion:*' group-name ''       # group by category
zstyle ':completion:*:descriptions' format '%B%d%b'
```
Speed tip: `compinit -C` skips the security audit (faster startup) once you trust your `$fpath`.
Add custom completion dirs **before** `compinit`: `fpath=(~/.zsh/completions $fpath)`.

## Keybindings & ZLE (`manual/zshzle.md`)
```zsh
bindkey -e                    # emacs keymap (default-ish); bindkey -v for vi mode
bindkey '^[[1;5C' forward-word   # Ctrl-Right
bindkey '^[[1;5D' backward-word  # Ctrl-Left
bindkey '^U' backward-kill-line
# custom widget:
my-widget() { LBUFFER+="hello"; }
zle -N my-widget
bindkey '^G' my-widget
# find a key's escape sequence: run `cat -v` (or Ctrl-V then the key) and read the output
```

## Renaming with zmv (`manual/zshcontrib.md`)
```zsh
autoload -Uz zmv
zmv '(*).txt' '$1.md'              # rename *.txt -> *.md
zmv -n '(*).jpeg' '$1.jpg'         # -n = dry run (always test first!)
zmv '(**/)(*).JPG' '$1$2.jpg'      # recursive, lowercase extension
zmv -C '*.log' 'archive/$f'        # -C copy, -L hardlink, -M move (default)
```

## Directory navigation
```zsh
setopt AUTO_CD                     # type a dir name to cd into it
setopt AUTO_PUSHD                  # cd pushes onto the dir stack
setopt PUSHD_IGNORE_DUPS
dirs -v                            # show numbered stack;  cd -2  to jump
hash -d proj=~/code/myproject      # named dir:  cd ~proj
```

## Hooks (`manual/zshcontrib.md`)
```zsh
autoload -Uz add-zsh-hook
precmd_show_time() { print -P '%F{8}%D{%H:%M:%S}%f' }
add-zsh-hook precmd precmd_show_time     # before each prompt
add-zsh-hook chpwd () { ls }             # after every cd
add-zsh-hook preexec () { ... }          # before each command runs
```

## Reading input & arrays
```zsh
read -r line                  # read one line (no backslash mangling)
read -A words                 # read into array, split on $IFS
read "?Continue? " ans        # prompt then read (the ?... is the prompt)
typeset -A map; map[key]=val; echo $map[key]   # associative array
```

## Math
```zsh
echo $(( 2 ** 10 ))           # 1024
zmodload zsh/mathfunc; echo $(( sqrt(2) ))     # float functions
(( count++ ))                 # arithmetic command
autoload -Uz zcalc; zcalc     # interactive calculator
```

## Profiling startup
```zsh
zmodload zsh/zprof   # top of .zshrc ... then `zprof` at the bottom
for i in {1..10}; do time zsh -i -c exit; done   # rough startup benchmark
```

## Run an sh/bash snippet safely under zsh
```zsh
emulate -L sh -c 'for f in $unsplit_var; do echo $f; done'   # sh word-splitting, locally
```

For deep dives: expansion → `manual/zshexpn.md`; options → `manual/zshoptions.md`;
builtins → `manual/zshbuiltins.md`; completion → `manual/zshcompsys.md`; ZLE → `manual/zshzle.md`.
