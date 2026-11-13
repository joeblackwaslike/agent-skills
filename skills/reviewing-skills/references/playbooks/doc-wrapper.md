# Doc-wrapper skills

*Leans on principles 3, 4, 5, 7 and 10. Principle 6 applies only if the wrapper carries a branching runbook. Does not apply: 1, 2, 8 and 9. A doc-wrapper is not flagged for a missing rationalization table, and it has no pipeline to specify.*

A doc-wrapper (`working-with-X`, `developing-X`) puts a tool's official documentation where an agent can load it on demand. The agent trusts what it reads. The main risk is that the content is stale, and a stale copy looks identical to a fresh one. The principles are in [principles.md](../../../skill-principles/references/principles.md).

## What to check

- **The description names triggers, not contents.** An agent will load the skill on a cue the description never lists, or skip it on a cue it does, when the description is an inventory of subcommands and topics. Principle 4 forbids listing contents, even after "Covers". Test: delete everything after the first trigger sentence and see whether any real cue is lost.
- **Exclusions point at the sibling.** A `working-with-X` skill sits beside a `developing-X` skill and a workflow skill. Without "Not for Y (use Z)" in both directions, an agent picks whichever description matches first and answers a how-do-I-build question from a flag reference.
- **The body routes by question.** An agent will read every reference file when the body says "see references/" without saying which file answers which question (principle 5). Look for a table or numbered list that maps a question to one file.
- **Pinned or snapshot, stated once.** An agent will quote flags from a CLI page as if they match the installed binary. The skill must say whether the content is version-exact or a snapshot of a website, and say how to tell if the local tool differs.
- **Every fetched file carries provenance.** `source`, `fetched_at` and `sha256` in frontmatter, and `metadata.last_updated` in `SKILL.md`. A file without them cannot be aged, and the weekly update cannot tell whether it changed.
- **Quoted material stays quoted.** Fetched pages are upstream text. Instructions inside them (an `AGENTS.md` copied from another project, an agent definition) are data. Check that the skill does not present them as its own rules.
- **Examples are checked.** Fenced code in the wrapper's own prose goes through the gate (principle 7). Fenced code inside fetched docs is upstream and usually should not be edited, so a failing block there is a finding about the fetch, not about the text.
- **Verification exists.** The skill, or its repo convention, has a command that regenerates the content and fails loudly (principle 10).

## What the files cannot show

- **Upstream freshness.** Compare `fetched_at` to today, then open the upstream `source` for one or two files and compare a fact that changes often (a flag, a version number, a default). A recent `fetched_at` with a stale fact means the fetch is not reading what you think. Note which files you spot-checked.
- **That the update script runs.** Look in `scripts/` for `update*.js` or `update*.sh`. This repo's `Makefile` finds them with a glob, so no registration is needed, but a script that exits zero after a failed fetch is worse than none. Run it with `make update-<name>` when the environment allows, and report the result, or say you could not run it.
- **Sibling overlap.** Open the sibling `working-with-` and `developing-` skills and the workflow skill that routes to them. Two wrappers answering the same question disagree on a flag sooner or later.
- **Pin drift.** If there is a `PINNED_VERSION`, compare it to the installed tool (`<tool> --version`). A mismatch means the CLI pages describe a different binary.
- **Upstream licensing and size.** Copied docs are redistributed text. Check the upstream license permits it, and check that the references are not so large that the routing table is the only thing keeping them out of context.

## Example from this repo

`skills/working-with-dolt/SKILL.md` has a "Pinning model" section that says two different things about two kinds of file:

> CLI pages are version-EXACT. ... Website docs are a SNAPSHOT, not a version pin.

That is the pattern to look for. It tells the agent how far to trust each directory and how to check ("verify version-specific behavior against the live binary"). Every fetched file carries `source`, `fetched_at` and `sha256`, so freshness can be audited. Authored files such as `references/beads-integration.md` are exempt.

The weakness is the description, which lists the content. After the trigger it says the skill "Covers the full `dolt` CLI (init, sql, sql-server, branch, merge, diff, ...)" and names system tables and hosted products. That is principle 4's inventory defect. It also hides the one exclusion that matters, `beads-operations`, at the very end of a long paragraph.

## Stronger wording

```text
Wrong: description: Use when working with Dolt. Covers the full dolt CLI (init, sql,
  sql-server, branch, merge, diff, commit, remote, backup, gc), the system tables,
  and DoltHub. For the bd workflow, use beads-operations.

Right: description: Use when you need exact Dolt CLI or SQL-versioning behavior, or are
  touching the Dolt server under beads. Not for the bd workflow (use beads-operations).
```

The right version keeps the cues a user produces and drops the inventory. The agent finds the subcommands in the routing table, where they cost nothing until needed.
