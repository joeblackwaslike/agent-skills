# Prior Art and Code Smells

## The instinct

Two related reflexes: before writing new code, check whether the codebase already has something
that does this (or most of this); while writing or reading code, recognize the shapes that signal
"this needs restructuring" before piling more code onto them.

## Part 1: search before you write

**What it looks like when missing:** a new utility function gets written that duplicates one that
already exists three files away, under a slightly different name, because nobody searched for it
first. Over time this produces multiple near-identical implementations of the same thing, each
drifting slightly, none of them the obvious canonical one.

**What to do instead:** before writing a new function, class, or pattern, grep the codebase for
existing utilities, helpers, and conventions that already solve this or something close to it.
Prefer extending or reusing what's there — even if it's not a perfect fit — over writing a
parallel implementation, unless the existing one is genuinely wrong for the job (and if so, that's
often a signal to fix or generalize it rather than route around it).

This is already an explicit instruction in this repo's own plan-mode workflow ("Actively search
for existing functions, utilities, and patterns that can be reused — avoid proposing new code
when suitable implementations already exist"). This runbook generalizes it into a standing
instinct for all code-writing, not just plan-mode exploration.

## Part 2: recognize smells on sight

A code smell is a surface signal of a deeper structural problem — not a bug by itself, but a
pattern that predicts one. Senior engineers pattern-match on these before naming the formal
principle they violate:

- **Duplicated logic** — the same few lines, or the same conditional structure, appearing in
  multiple places. Predicts: a bug fixed in one copy and not the others.
- **A function/class doing three unrelated things** — often named `*Manager`, `*Util`, `*Helper`.
  Predicts: every unrelated change touches the same file, and tests can't isolate one concern.
- **Long parameter lists** — a function taking five-plus positional arguments, especially several
  of the same type. Predicts: callers passing arguments in the wrong order silently.
- **A growing `switch`/`if-isinstance` chain** — reopened every time a new variant is added.
  Predicts: the chain becomes the bottleneck for every future feature.
- **Shotgun surgery** — a single conceptual change requires touching many unrelated files.
  Predicts: someone will eventually miss one of the spots.

**What to do instead:** treat recognizing one of these as the trigger to stop and consider
restructuring *before* adding more code on top — not a lint warning to silence. Once a smell is
identified, `solid-principles` has the formal treatment for fixing it (SRP for the god
function/class, OCP for the growing switch, ISP for the fat interface, DIP for the hard-wired
dependency) — this runbook's job is only the "notice it" half; that skill's job is the "fix it"
half.

## Why both parts belong together

Searching for prior art and recognizing smells are the same underlying discipline: reading the
existing shape of the code before adding to it, rather than defaulting to writing something new
in isolation. Skipping the search produces duplication; skipping smell-recognition lets
duplication and other structural problems compound instead of getting caught early.
