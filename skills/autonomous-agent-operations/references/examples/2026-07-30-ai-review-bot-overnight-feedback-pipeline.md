# 2026-07-30 — ai-review-bot: overnight feedback pipeline, genuinely unattended

**Source:** `agent-marketplace/private-content/drafts/articles/2026-08-08-writing-the-plot.md`
— an unpublished first-person draft essay, not an internal record. Cited facts below are
corroborated two ways (the article's own timestamps + this repo's independent commit
history); the one uncorroborated claim is flagged explicitly.

**Scenario:** An agent built a ~6,500-line, nine-PR feedback-capture pipeline in this
repo, unattended, overnight. Merges land 3:41am–8:41am UTC per the article, which
converts exactly to the 23:41–04:41 EDT window of PRs #32–#42 found independently by
commit timestamp.

**The handoff** (given as the general template now used, not necessarily verbatim that
specific night):

> I won't be around. Work autonomously and use your best judgement. If you hit a genuine
> blocker, pick the most reasonable option, document the decision and your reasoning, and
> file a beads issue for it. When I'm back, we'll review them one at a time. Hard stop on
> anything involving permanent data loss.

**What forked:** 8 of the 9 PRs merged with a standing `CHANGES_REQUESTED` from the
required reviewer still attached. The agent read the review bodies, judged the reviewer
stuck and recycling false positives, and invoked the pre-existing dismiss-and-merge
override policy — the same one this environment's `AGENTS.md` still documents, and the
same one this skill's own first worked example (above) also invoked twice.

**Why this is the contract's "ticket when unreachable" branch, not "ask when
reachable":** no live check-in happened; the decision was made and merged on the spot.

**Caveat, stated as plainly as the source states it:** the article's claim to have
verified the merged work afterward ("I've read the diffs since; the work is good") is
self-reported in an unpublished draft, not shown with diffs or PR links — recorded as
the account given, not as independently confirmed fact.
