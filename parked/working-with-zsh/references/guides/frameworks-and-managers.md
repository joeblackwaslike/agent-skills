# Frameworks, plugin managers & how to choose

Two distinct categories that people conflate:

- **Configuration frameworks** bundle a curated set of plugins, themes, completions, and sane
  defaults behind one install. You adopt their conventions. (Oh My Zsh, Prezto, Zim.)
- **Plugin managers** are thin loaders: *you* declare plugins in `.zshrc`, they clone/source/cache
  them. No opinions, maximum control + speed. (zinit, antidote, sheldon, antigen, zplug.)

You can also use **neither** — zsh sources plugin files directly; for a handful of plugins, manual
`source ~/path/plugin.zsh` plus the native completion system is the fastest, most transparent setup.

## Decision guide

| You want… | Use |
| --- | --- |
| Batteries-included, huge community, copy-paste configs, don't care about ~50–150ms startup | **Oh My Zsh** |
| Framework feel but faster & cleaner module system | **Prezto** or **Zim** |
| Minimal startup time + full control, declarative plugin list | **antidote** (simple) or **zinit** (powerful) |
| Cross-shell, single TOML config, Rust binary | **sheldon** |
| Fewest moving parts, a few plugins only | **no manager** — `source` them manually |
| Legacy repo you're maintaining | whatever it already uses (but see "abandoned" below) |

## Configuration frameworks

### Oh My Zsh — `ecosystem/oh-my-zsh__readme.md`, `oh-my-zsh__plugins.md`, `oh-my-zsh__themes.md`
The default for most people. 300+ bundled plugins, 140+ themes, an upgrade mechanism. Configure via
`plugins=(git docker ...)` and `ZSH_THEME=...` in `.zshrc`. Downsides: startup cost grows with
plugin count; it sources a lot you may not use. Still the best-documented on-ramp. The plugins/themes
lists are the two large reference files — grep them for what's available.

### Prezto — `ecosystem/prezto__readme.md`
A leaner, faster reimagining of OMZ by Sorin Ionescu. Module-based (`zstyle ':prezto:load' pmodule ...`
in `.zpreztorc`). Ships excellent defaults and the `powerlevel10k`/`sorin` prompts. Good middle ground.

### Zim (zimfw) — `ecosystem/zim__readme.md`
Focuses on **speed** — compiles modules and lazy-loads aggressively; consistently benchmarks among the
fastest frameworks. Config in `.zimrc` (`zmodule ...`) + `zimfw install`. Great if you like a framework
but care about startup time.

## Plugin managers

### zinit (zdharma-continuum) — `ecosystem/zinit__readme.md`
The most powerful: **turbo mode** (`wait` lazy-loading) defers plugins until after the prompt paints,
giving near-instant startup even with many plugins. Ice modifiers (`zinit ice ...`) control how each
plugin loads (as-snippet, from-gh-release, atclone hooks, etc.). Steeper learning curve. **Use the
`zdharma-continuum/zinit` repo** — the original `zdharma/zinit` org was deleted in Nov 2021. Avoid the
separate `z-shell/zi` rebrand fork.

### antidote — `ecosystem/antidote__readme.md`
Successor to antibody/antigen lineage by mattmc3. Plugins listed in a plain `~/.zsh_plugins.txt`,
"bundled" into a single static file for fast loading. Simple, fast, well-maintained — the best
"modern, no-magic" choice. Docs: getantidote.github.io.

### sheldon — `ecosystem/sheldon__readme.md`
Rust binary, **shell-agnostic**, single `plugins.toml` config, templating for how plugins load.
Great if you want one tool across zsh/bash or like declarative TOML. Docs: sheldon.cli.rs.

### antigen — `ecosystem/antigen__readme.md` (legacy)
The original-era manager (`antigen bundle ...`). **Effectively legacy / low activity.** Works, but for
new setups prefer antidote (its spiritual successor) or zinit. Repo: `zsh-users/antigen`, branch
`develop`.

### zplug — `ecosystem/zplug__readme.md` (largely dormant)
vim-plug-inspired, feature-rich but **mostly unmaintained** now and slower. Don't start new configs
with it; migrate off if you can.

## Performance note

Startup time roughly: manual-source ≈ zinit-turbo ≈ Zim < antidote ≈ sheldon < Prezto < Oh My Zsh
(loaded with many plugins). If startup feels slow, profile it:
```zsh
zmodload zsh/zprof   # at top of .zshrc
# ... rest of .zshrc ...
zprof                # at bottom — prints a function time breakdown
```
or time a fresh shell: `for i in {1..10}; do time zsh -i -c exit; done`.

## Trust / org warnings (important)

- **zdharma → zdharma-continuum**: the original `zdharma` GitHub org (zinit, fast-syntax-highlighting)
  was deleted in 2021. The community-maintained continuation is **`zdharma-continuum`** — use it.
- Prefer `zsh-users/*` for the canonical plugins (autosuggestions, syntax-highlighting, completions).
- Powerlevel10k is in maintenance mode (author has signaled a possible successor) but the repo remains
  the canonical, rock-solid choice today — see [`prompts.md`](prompts.md).
