# Reference catalogs

*Leans on principles 3, 4, 5, 7 and 10. Does not apply: 1, 2, 8 and 9 for the catalog content. Principle 6 does not apply either, because reference material and lookup tables do not need a diagram.*

A reference catalog is authored material, one file per topic, picked from a table: patterns, principles, runbooks, language notes. It differs from a doc-wrapper because nobody fetches it, so there is no upstream to age against, and the author is the only source of truth. It differs from a router because the destinations are content, not other skills. Its failure modes are loading too much, picking the wrong entry, and examples that rot. The principles are in [principles.md](../../../skill-principles/references/principles.md).

## What to check

- **The body routes by situation.** An agent will read the whole catalog if the table is organized by the author's taxonomy and not by the question the agent has. Rows should start with what the reader is doing ("Wrapping one call with logging or caching"), not the catalog's own term.
- **Each entry says when not to use it.** A catalog tempts agents to apply an entry because it exists. A good entry has an early "do you need this?" section naming the plain alternative and the signal that tips you over. An entry with no such section invites over-application.
- **Entries have a consistent shape.** The same sections in the same order let an agent skim. Find the entry that deviates and ask whether the deviation earns its place.
- **Examples run.** Principle 7. Fenced code is checked by the gate; read the report. A deliberately partial snippet carries the `fragment` marker on its first line. One checked example in the language the reader uses beats the same example in four languages.
- **No overlap between entries.** Two entries answering the same question with different advice is the catalog version of a contradiction (principle 3). Grep for the shared noun across entries.
- **Size limits are by need.** Do not flag a long entry for length alone. Flag one whose sections an agent will never reach because the entry is not routed internally.
- **The catalog's index matches its files.** Every file in `references/` is in the table or the index, and every row points at a file that exists. The gate checks links, but a row can point at the wrong existing file.
- **Cross-skill boundaries are drawn.** The description's "Not for" names where neighboring topics live. A catalog that covers class design next to a sibling that covers class design gives agents a coin flip.
- **A verification path exists** for claims the catalog makes about behavior (principle 10): a command, a test, or a stated way to check a complexity or a default.

## What the files cannot show

- **Whether the advice is still right.** There is no `fetched_at`. Pick two or three entries with the most time-sensitive claims (library defaults, language version assumptions, API names) and check them against current docs or the installed version. Report what you checked.
- **Whether the catalog is complete for its stated scope.** Compare the description's claims against the entries. Missing entries are findings only if the description promises them.
- **Which entry agents actually open.** Give a fresh agent three realistic tasks and the router table only. If it opens the wrong entry twice, the table is the defect.
- **Sibling catalogs.** Another catalog may cover half of this scope. Read its description and index, and check that the split is stated.

## Example from this repo

`skills/design-patterns/SKILL.md` opens its body with a "Default to no pattern" section and gives numbers:

> With fewer than three, write the plain version and say so in one line.

It separates entries triggered by a count from those triggered by a failure mode or a coupling boundary, and says "If you cannot point at that signal, skip the pattern." That is the pattern to look for. The catalog argues against its own contents until the situation earns them. Most rows in its table start with the reader's situation (for example "Tempted by a global instance") and not the pattern name.

The weakness to look for is the description. It is a colon-led list of thirteen pattern names. Principle 4 calls a colon-led list inside a description the same defect as an outline. The counter-argument is that the names are exactly what a user types, so they are trigger vocabulary and not contents. A reviewer should decide which side it falls on by testing whether the list adds a trigger the first clause lacks, and say the reasoning in the finding.

## Stronger wording

```text
Wrong: Use a lookup helper whenever behavior varies.

Right: Use a lookup helper when three or more callers pick a variant at runtime.
  With fewer, pass a function. If you cannot name the third caller, skip it.
```

The right version gives a count the agent can evaluate and a plain alternative, so the entry stops itself from being applied by default.
