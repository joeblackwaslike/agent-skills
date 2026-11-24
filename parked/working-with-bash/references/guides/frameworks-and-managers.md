# Bash frameworks, plugin/package managers & readline enhancers

Bash's "framework" scene is smaller and quieter than zsh's, because much of what people
want frameworks for (autosuggestions, syntax highlighting, rich prompts) is either a
single dedicated tool (ble.sh, Starship) or simply not native to bash's Readline. Pick the
**smallest** thing that solves your problem — full frameworks add startup latency.

## Decision guide (start here)

| You want… | Use | Why |
| --- | --- | --- |
| Aliases + completions + a curated theme, batteries-included | **oh-my-bash** or **bash-it** | Oh-My-Zsh-style frameworks for bash |
| Zsh-like autosuggestions + syntax highlighting in bash | **ble.sh** | The only mature option; replaces Readline |
| Just a great prompt | **Starship** / **Oh My Posh** | See [`prompts.md`](prompts.md); no framework needed |
| Install shell utilities/plugins like packages | **basher** or **bpkg** | Git-based package managers |
| Better tab-completion for real commands (git, docker, …) | **bash-completion** | The canonical completion database |
| `preexec`/`precmd` hooks (run code before/after each command) | **bash-preexec** | Powers many prompt tools; zsh has this natively |
| Nothing — just a tidy `~/.bashrc` | (no framework) | Frameworks cost startup time; hand-roll for speed |

## Frameworks

### oh-my-bash (`ohmybash/oh-my-bash`)
The most direct Oh-My-Zsh analog: themes, aliases, completions, plugins, installed to
`~/.oh-my-bash`. Configured via `OSH_THEME`, `plugins=(...)`, `completions=(...)`,
`aliases=(...)` in `~/.bashrc`. Has a wiki-listed **theme gallery** (~127 themes —
see [`../ecosystem/oh-my-bash__themes.md`](../ecosystem/oh-my-bash__themes.md)). Good
default if you want the OMZ experience on bash. Read: [`../ecosystem/oh-my-bash__readme.md`](../ecosystem/oh-my-bash__readme.md).

### bash-it (`Bash-it/bash-it`)
Older, broader collection of aliases/completions/plugins/themes under `~/.bash_it`.
Enable pieces with `bash-it enable plugin <name>` etc. Docs live on ReadTheDocs
(https://bash-it.readthedocs.io) — there's **no GitHub wiki**; themes are listed in
[`../ecosystem/bash-it__themes.md`](../ecosystem/bash-it__themes.md) and the repo's
`themes/` dir. Read: [`../ecosystem/bash-it__readme.md`](../ecosystem/bash-it__readme.md).

**oh-my-bash vs bash-it:** oh-my-bash is the closer OMZ clone with a slicker default and
more active theme set; bash-it is more of an à-la-carte toolbox. Both add measurable
startup latency — profile with `time bash -ic 'exit'` before committing.

## Package / plugin managers

### basher (`basherpm/basher`)
A package manager for shell **scripts/libraries** (think "npm for bash"): `basher install
owner/repo`, adds bins to `PATH`, and lets you `include` library functions. Best when you
want to depend on reusable bash libraries.

### bpkg (`bpkg/bpkg`)
Similar git-based package manager (`bpkg install owner/repo`), oriented to installing
small bash utilities. Lighter than basher's library model.

> These manage **packages**, not prompt/theme frameworks. They don't compete with
> oh-my-bash; they complement it.

## Readline enhancers (the "make bash feel like zsh" tier)

### ble.sh (`akinomyoga/ble.sh`)
A from-scratch **Readline replacement** written in bash that brings **autosuggestions,
syntax highlighting, better completion menus, and vim mode** to interactive bash —
the single most impactful upgrade for a zsh-refugee. Source it at the top of `~/.bashrc`
and call `ble-attach` at the end. Some startup cost; very actively maintained. Read:
[`../ecosystem/blesh__readme.md`](../ecosystem/blesh__readme.md).

### bash-preexec (`rcaloras/bash-preexec`)
Provides the `preexec` (before a command runs) and `precmd` (before each prompt) hooks
that zsh has natively. Many prompt tools (and Starship, optionally) build on it. Source it
and append functions to the `preexec_functions` / `precmd_functions` arrays. Read:
[`../ecosystem/bash-preexec__readme.md`](../ecosystem/bash-preexec__readme.md).

## Completion

### bash-completion (`scop/bash-completion`)
The canonical programmable-completion project — completion functions for hundreds of
commands (git, ssh, systemctl, …). Installed via your package manager; source the loader
in `~/.bashrc`:
```bash
[[ -r /usr/share/bash-completion/bash_completion ]] && . /usr/share/bash-completion/bash_completion
# Homebrew:  [[ -r "$(brew --prefix)/etc/profile.d/bash_completion.sh" ]] && . "$(brew --prefix)/etc/profile.d/bash_completion.sh"
```
Roll your own with `complete`/`compgen` — see [`cookbook.md`](cookbook.md). Read:
[`../ecosystem/bash-completion__readme.md`](../ecosystem/bash-completion__readme.md).

## Navigation & dir tools (shell-agnostic, common with bash)

| Tool | Repo | What |
| --- | --- | --- |
| **fzf** | `junegunn/fzf` | Fuzzy finder; `Ctrl-R` history, `Ctrl-T` files, `**<Tab>` completion |
| **zoxide** | `ajeetdsouza/zoxide` | `z`-style smart `cd` (Rust; the modern pick) |
| **z** | `rupa/z` | Original pure-bash frecency `cd` |
| **autojump** | `wting/autojump` | Older `j`-style jumper (maintenance mode) |
| **direnv** | `direnv/direnv` | Per-directory env via `.envrc` (hook into bash) |

READMEs are in `references/ecosystem/`.

## ⚠️ Dead / moved sources (don't chase the old URLs)

- **wiki.bash-hackers.org died (April 2023, DNS lapsed).** The content lives on as the
  **`flokoe/bash-hackers-wiki`** mirror — see [`../learn/bash-hackers-wiki.md`](../learn/bash-hackers-wiki.md).
- **liquidprompt** moved from `nojhan/liquidprompt` to **`liquidprompt/liquidprompt`** (the
  old URL redirects).
- **No canonical bash "pure" prompt** — `sindresorhus/pure` is zsh-only; bash ports are
  fragmented. Use Starship/Oh My Posh for a minimalist async prompt instead.
