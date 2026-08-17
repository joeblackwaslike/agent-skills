# Blast-Radius Judgment

## The instinct

Not every action deserves the same amount of caution. Scale the ceremony — double-checking,
confirmation-seeking, staging, rollback planning — to how reversible the action is and how far
its effects reach, not uniformly. Treating a typo fix with the same ritual as a schema migration
wastes effort; treating a schema migration with the same casualness as a typo fix is how outages
happen.

## What it looks like when missing

Either extreme is the failure mode:

- **Under-caution:** a hard-to-reverse or shared-state action (force-push to a shared branch,
  `DROP TABLE`, deleting a branch, overwriting uncommitted work, a production config change) gets
  executed with the same confidence as a local, reversible edit — no pause to consider "what if
  this is wrong."
- **Over-caution:** a fully local, reversible, single-file change gets wrapped in confirmation
  dialogs, staged rollouts, and review gates meant for infrastructure-level risk — the ceremony
  itself becomes the bottleneck, and it teaches people to skim past caution signals because most
  of them are noise.

## What to do instead

Before acting, classify the action along two axes:

1. **Reversibility** — can this be undone cheaply (a file edit, a local commit) or is it
   effectively permanent (a force-push that overwrites shared history, a deleted database row
   with no backup, a merged PR that's already been built on)?
2. **Blast radius** — does this affect only your local state, or does it touch shared systems,
   other people's in-progress work, or things visible externally (a push, a sent message, a
   published release)?

Match the amount of double-checking to where the action lands on both axes — not a fixed
checklist applied everywhere. A change that's both hard-to-reverse and wide-blast-radius (a
force-push to `main`, dropping a production table) warrants pausing to confirm; a change that's
easy-to-reverse and narrow-blast-radius (editing a local file, running a read-only query) doesn't
need the same weight.

## Worked example (already-adopted rule, generalized here)

Joe's own global AGENTS.md ("Executing actions with care") already states this instinct for
git/file operations specifically: destructive operations (deleting branches, `rm -rf`,
overwriting uncommitted changes), hard-to-reverse operations (force-pushing, `git reset --hard`,
amending published commits, removing dependencies), and actions visible to others (pushing code,
opening PRs, sending messages, posting to external services) all warrant a pause to confirm —
while purely local, reversible actions (editing files, running tests) don't. This runbook
generalizes that same reversibility/blast-radius classification beyond git and files: it applies
equally to infrastructure changes, data migrations, dependency removals, and any other action
where "can I take this back, and who else does it touch" determines how much caution it deserves.

## Applying this to infrastructure/architecture planning

When designing a system with broad blast radius (a new service other teams will depend on, a
schema other consumers will read, a shared library), apply this instinct up front, at design
time, not just at execution time: which decisions are reversible later (can swap the
implementation, can add a field) and which aren't (a public API's shape, a database's primary
key strategy)? Spend the design effort where reversibility is low — that's where a wrong call is
expensive to undo.
