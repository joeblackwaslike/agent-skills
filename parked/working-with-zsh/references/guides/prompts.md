# Prompts: Powerlevel10k vs Starship vs Oh My Posh

A **prompt** sets what your command line looks like (git status, dirs, exit code, time, etc.).
This is independent of your framework/manager — you can run any of these with OMZ, a plain manager,
or no manager at all. All three want a **Nerd Font** installed for icons (e.g. MesloLGS NF for P10k).

## TL;DR decision

| You want… | Use |
| --- | --- |
| Fastest possible zsh prompt, guided setup wizard, zero perceptible lag | **Powerlevel10k** |
| One prompt across zsh/bash/fish/pwsh, simple TOML, big module ecosystem | **Starship** |
| Cross-shell with rich theming/segments, JSON/YAML/TOML themes, Windows-friendly | **Oh My Posh** |

## Powerlevel10k — `ecosystem/powerlevel10k__readme.md`
Zsh-only theme (`romkatv/powerlevel10k`). The performance king: asynchronous segment rendering and
**Instant Prompt** (prompt appears before `.zshrc` finishes loading). First run launches `p10k
configure`, an interactive wizard that writes `~/.p10k.zsh`.

Install (manual):
```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.config}/powerlevel10k
echo 'source ~/.config/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```
With OMZ: `ZSH_THEME="powerlevel10k/powerlevel10k"`. Tradeoff: zsh-only; in maintenance mode (author
has hinted at a successor), but stable and unmatched on speed today.

## Starship — `ecosystem/starship__config.md`
Cross-shell prompt (Rust binary, `starship/starship`). One config at `~/.config/starship.toml` works
across every shell. Huge set of language/tool modules (auto-shows node/python/rust/aws/k8s context).
The reference file is the **complete config doc** — every module and option.

Install + enable:
```zsh
curl -sS https://starship.rs/install.sh | sh
echo 'eval "$(starship init zsh)"' >>~/.zshrc
```
Tradeoff: slightly slower than P10k (still fast); themable but less zsh-specialized.

## Oh My Posh — `ecosystem/oh-my-posh__readme.md`
Cross-shell prompt engine (Go, `JanDeDobbeleer/oh-my-posh`). Originated in PowerShell, now shell-agnostic.
Rich "segments + blocks" theme model with many prebuilt themes (JSON/YAML/TOML).

Install + enable:
```zsh
eval "$(oh-my-posh init zsh)"
eval "$(oh-my-posh init zsh --config ~/.config/ohmyposh/zen.toml)"   # with a theme
```
Tradeoff: heaviest of the three for pure-zsh use; shines if you live across Windows/macOS/Linux shells.

## Rolling your own (no dependency)
Zsh's native prompt is powerful. Minimal git-aware prompt with built-in `vcs_info`:
```zsh
autoload -Uz vcs_info
precmd() { vcs_info }
zstyle ':vcs_info:git:*' formats ' (%b)'
setopt PROMPT_SUBST
PROMPT='%F{cyan}%~%f%F{yellow}${vcs_info_msg_0_}%f %# '
```
See the PROMPT EXPANSION section of `manual/zshmisc.md` for every `%` escape, and `manual/zshcontrib.md`
for full `vcs_info` configuration.

## Font note
Install a Nerd Font and select it in your terminal, or icons render as boxes. P10k's wizard offers to
install **MesloLGS NF** for you; Starship/Oh My Posh recommend any Nerd Font.
