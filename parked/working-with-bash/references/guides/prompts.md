# Bash prompts — choosing & configuring

Bash builds the prompt from `PS1` (and `PS2`/`PS3`/`PS4`), optionally regenerated each
command via `PROMPT_COMMAND`. You can hand-roll `PS1`, or use a dedicated prompt engine.

## Decision guide

| You want… | Use |
| --- | --- |
| Fast, modern, cross-shell, minimal config | **Starship** |
| Cross-shell with deep theming / Windows-friendly | **Oh My Posh** |
| Git status baked into the prompt, bash-native | **bash-git-prompt** |
| Powerline-style segments, Python-based, tmux/vim too | **powerline** |
| Lightweight, feature-toggled, pure-bash | **liquidprompt** |
| A theme that ships with your framework | oh-my-bash / bash-it themes |
| Zero dependencies | hand-rolled `PS1` (below) |

## Cross-shell engines (recommended default)

### Starship (`starship/starship`)
Single Rust binary, config in `~/.config/starship.toml`, identical across bash/zsh/fish.
Fast, async-ish, sensible defaults. Setup:
```bash
eval "$(starship init bash)"
```
The richest, lowest-friction choice for most people. Config reference:
[`../ecosystem/starship__config.md`](../ecosystem/starship__config.md).

### Oh My Posh (`JanDeDobbeleer/oh-my-posh`)
Theme-engine with JSON/YAML/TOML "themes" and a large gallery; strong on Windows/PowerShell
too but works in bash:
```bash
eval "$(oh-my-posh init bash)"
```
Pick Oh My Posh over Starship when you want elaborate, swappable visual themes. Read:
[`../ecosystem/oh-my-posh__readme.md`](../ecosystem/oh-my-posh__readme.md).

## Bash-native prompt tools

### bash-git-prompt (`magicmonty/bash-git-prompt`)
Focused on a clear git status in the prompt (ahead/behind, staged/unstaged, stashes).
Source `gitprompt.sh`; many themes. Good if git context is the only thing you want and you
prefer no external binary. Read: [`../ecosystem/bash-git-prompt__readme.md`](../ecosystem/bash-git-prompt__readme.md).

### powerline (`powerline/powerline`)
Python daemon rendering segmented "powerline" prompts (also statuslines for tmux, vim).
Heavier (Python runtime + a patched/Nerd font for glyphs). Choose it if you already run
powerline in tmux/vim and want a unified look. Note: its README is **`README.rst`** on the
`develop` branch. Read: [`../ecosystem/powerline__readme.md`](../ecosystem/powerline__readme.md).

### liquidprompt (`liquidprompt/liquidprompt`)
Adaptive pure-bash/zsh prompt that shows only relevant info (battery, load, git, venv) and
hides the rest. No binary, feature-toggled. (Owner moved from `nojhan/` →
`liquidprompt/`.) Read: [`../ecosystem/liquidprompt__readme.md`](../ecosystem/liquidprompt__readme.md).

## Hand-rolling `PS1` (no dependencies)

```bash
# Always wrap non-printing (color) sequences in \[ ... \] so bash computes line width
# correctly — omitting them corrupts line wrapping and history editing.
PS1='\[\e[32m\]\u@\h\[\e[0m\]:\[\e[34m\]\w\[\e[0m\]\$ '
```

Common `PS1` escapes (full list in [`../manual/bash.md`](../manual/bash.md), "PROMPTING"):

| Escape | Meaning | Escape | Meaning |
| --- | --- | --- | --- |
| `\u` | username | `\w` | cwd (full, `~`-abbreviated) |
| `\h` / `\H` | hostname short/full | `\W` | cwd basename |
| `\$` | `#` if root else `$` | `\t`/`\T`/`\@` | time 24h/12h/am-pm |
| `\d` | date | `\n` | newline |
| `\j` | background jobs | `\!` / `\#` | history / command number |
| `\[` … `\]` | wrap non-printing chars | `\e` | ESC (for ANSI color) |

Dynamic prompts (e.g. exit status, git branch) via `PROMPT_COMMAND`:
```bash
__set_prompt() {
  local ec=$?                      # capture FIRST, before anything else clobbers $?
  local branch; branch=$(git branch --show-current 2>/dev/null)
  PS1="\u@\h:\w${branch:+ ($branch)} "
  ((ec)) && PS1+="[!$ec] "
  PS1+='\$ '
}
PROMPT_COMMAND=__set_prompt
```

## Gotchas

- **`$?` first.** In `PROMPT_COMMAND`/prompt functions, capture `$?` on the very first
  line — every later command overwrites it.
- **Color line-wrap corruption** is almost always missing `\[ \]` (in `PS1`) or `%{ %}`
  (zsh). If your long command lines wrap weirdly or backspace eats the prompt, that's it.
- **Nerd Font required** for powerline/most Oh My Posh/Starship themes that use glyphs.
- **Startup cost:** prompt engines run per-prompt. If your prompt feels laggy in big git
  repos, disable git scanning or switch to Starship (it's the fastest mainstream option).
