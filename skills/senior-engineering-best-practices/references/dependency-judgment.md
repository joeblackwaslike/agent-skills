# Dependency Judgment

## The instinct

Before deciding *which* library to use, decide *whether* to add a dependency at all. Every
dependency is a piece of code you didn't write, don't fully control, and are now responsible for
keeping working, secure, and compatible — indefinitely. That cost is easy to underweight against
the immediate convenience of `npm install`/`pip install`/`uv add`.

## What it looks like when missing

A new dependency gets added for something that would have been 15-30 lines of straightforward
code, without weighing what's actually being taken on: an ongoing maintenance burden, a new
attack surface, a license to track, and a future migration cost if the package is abandoned or
needs to be removed.

## What to do instead — weigh before picking

Before reaching for a package, ask:

1. **How much code would this actually replace?** A single well-scoped utility function is often
   cheaper to own than a dependency, its transitive tree, and its update cadence — especially for
   something narrow and stable (a date formatter for one format, a small validation check).
2. **Maintenance signal.** Recent commits? Open issues actually getting triaged, or an
   accumulating backlog? A single-maintainer package with no activity in a year is a bus-factor
   risk even if it works fine today.
3. **License.** Does it fit the project's license and any distribution constraints? Don't assume
   permissive — check.
4. **Security surface.** What does it pull in transitively? A dependency for one function that
   drags in twenty transitive packages is a bigger attack surface than the function justifies.
5. **Cost of removing it later.** If this dependency turns out to be wrong, or gets abandoned, how
   deeply is it woven into the codebase? Prefer dependencies that stay at the edges (behind a thin
   wrapper/interface) over ones that get called directly from everywhere — this is the same
   dependency-inversion instinct `solid-principles`' DIP formalizes, applied at the
   package-boundary level instead of the class level.

If the answer to "how much code would this replace" is "not much, and it's stable," write the
code. If it's "a lot, and it's a solved problem with real edge cases" (date/timezone handling,
crypto, parsing a real file format), use the dependency — reinventing those is its own footgun.

## Relationship to other guidance

This runbook answers "should we add a dependency at all." `joe-stack-preferences` answers "which
library" once that decision is already made — the two are sequential, not overlapping: judgment
first, then the preferred choice within whichever category applies.
