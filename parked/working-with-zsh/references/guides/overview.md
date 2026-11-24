# Zsh skill — orientation & reference map

Start here to find the right doc fast. Three buckets:

## 1. `references/manual/` — the canonical manual (version-exact)

Generated verbatim from the pinned `zsh`'s own man pages. This is **ground truth**
for syntax, options, builtins, and behavior. `grep` it freely.

| Chapter | Covers |
| --- | --- |
| `zsh.md` | Invocation, command-line options, startup files & their order, overall description |
| `zshroadmap.md` | A guided tour — where each topic lives in the manual |
| `zshmisc.md` | Shell grammar, control flow, redirection (incl. `<()`/`>()`/`<<<`), functions, jobs & signals, **prompt `%` escapes**, precommand modifiers |
| `zshexpn.md` | **Expansion** — history (`!!`), brace, parameter (`${...}`), command/arithmetic subst, filename **globbing + glob qualifiers**, modifiers (`:h`,`:t`,`:r`,`:e`) |
| `zshparam.md` | Parameters, special variables (`$PATH`/`$path`, `$fpath`, `$ZSH_VERSION`, hash arrays), array/assoc syntax |
| `zshoptions.md` | Every `setopt`/`unsetopt` option, grouped — incl. `SH_WORD_SPLIT`, `KSH_ARRAYS`, `EXTENDED_GLOB`, history options |
| `zshbuiltins.md` | Builtin commands — `setopt`, `autoload`, `zstyle`, `bindkey`, `zle`, `print`, `read`, `typeset`/`declare`, `zmodload`, `vared`, `fc` |
| `zshzle.md` | The Zsh Line Editor — `bindkey`, widgets, keymaps, writing custom ZLE widgets |
| `zshcompwid.md` | Low-level completion widgets (`compadd`, `compset`) — for writing completers |
| `zshcompsys.md` | The **modern completion system** — `compinit`, `zstyle ':completion:*'`, completer functions, `_arguments` |
| `zshmodules.md` | Loadable modules — `zsh/mathfunc`, `zsh/zpty`, `zsh/datetime`, `zsh/net/tcp`, `zsh/pcre`, `zsh/system`, `zsh/zselect` |
| `zshcontrib.md` | User contributions — `vcs_info` (git prompt info), `zmv`, `zcalc`, `promptinit`, `add-zsh-hook`, `zargs`, `colors` |
| `zshcalsys.md` | Calendar function system |
| `zshtcpsys.md` | TCP function system (`ztcp`) |
| `zshzftpsys.md` | zftp function system |

> Tip: the giant combined `man zshall` is intentionally **not** included here — it is just
> the concatenation of the chapters above and would duplicate everything.

## 2. `references/ecosystem/` — upstream docs (snapshot)

Fetched from source, refreshed weekly by CI. Not version-pinned.

- **Official extras**: `faq.md` (incl. the authoritative "how zsh differs from other shells"),
  `user-guide__*.md` (Peter Stephenson's User Guide, chapters 01–08), `zsh-lovers.md`
  (a huge tips/one-liner cookbook), `awesome-zsh-plugins.md` (curated index of the whole ecosystem).
- **Frameworks**: `oh-my-zsh__readme.md` + `oh-my-zsh__plugins.md` + `oh-my-zsh__themes.md`,
  `prezto__readme.md`, `zim__readme.md`.
- **Plugin managers**: `zinit__readme.md`, `antidote__readme.md`, `sheldon__readme.md`,
  `antigen__readme.md`, `zplug__readme.md`.
- **Prompts**: `powerlevel10k__readme.md`, `starship__config.md`, `oh-my-posh__readme.md`.
- **Popular plugins**: `zsh-autosuggestions__readme.md`, `zsh-syntax-highlighting__readme.md`,
  `fast-syntax-highlighting__readme.md`, `zsh-completions__readme.md`, `fzf__readme.md`, `zoxide__readme.md`.

## 3. `references/guides/` — hand-written value-add

- [`bash-vs-zsh.md`](bash-vs-zsh.md) — migration & behavioral differences. **Read this first**
  when a Bash script breaks under zsh or you're switching shells.
- [`frameworks-and-managers.md`](frameworks-and-managers.md) — what each framework/manager is,
  how they differ, and a decision guide (and which projects are abandoned / which org to trust).
- [`prompts.md`](prompts.md) — Powerlevel10k vs Starship vs Oh My Posh, with setup and tradeoffs.
- [`cookbook.md`](cookbook.md) — practical recipes you'll reach for constantly.

## Routing cheatsheet

| Question | Go to |
| --- | --- |
| "What does `${(j:,:)arr}` / `${name:h}` / `*(.om[1])` mean?" | `manual/zshexpn.md` |
| "How do I bind a key / make a widget?" | `manual/zshzle.md`, `cookbook.md` |
| "Why does my `for`/word-splitting behave differently?" | `guides/bash-vs-zsh.md`, `manual/zshoptions.md` |
| "Set up tab completion with menu + colors" | `manual/zshcompsys.md`, `cookbook.md` |
| "Which plugin manager should I use in 2025?" | `guides/frameworks-and-managers.md` |
| "Fast git-aware prompt" | `guides/prompts.md` |
| "Startup file order (`.zshenv` vs `.zshrc` vs `.zprofile`)" | `manual/zsh.md`, `cookbook.md` |
