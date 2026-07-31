# What Counts as Unresolved

Four categories. Scan for all four on every pass — each has a different signature, and looking for
only the obvious one (unfinished work) misses the ones that cost the most.

## 1. Questions that went unanswered

- The user asked something and the conversation moved on before it was fully answered.
- **The agent asked the user a question that was never replied to.** This is the most-missed
  category by a wide margin: the agent asked, the user's next message went somewhere else, and
  nothing marked the question as abandoned. Scan the agent's own turns for question marks.
- A clarifying question was posed and the thread drifted past it.

## 2. Work mentioned but not done

Phrase triggers, all of them followed by nothing:

- "I'll also…", "let me also…", "one more thing…", "we should…"
- "I'll follow up on…", "let me check…", "I'll look into…"
- Features or changes discussed in detail where implementation never started.
- Bugs or issues identified in passing but never fixed.

Grep-able openers get you candidates fast, but read around each hit — plenty are followed
immediately by the thing actually being done.

## 3. Topics introduced and dropped

- An idea raised in passing that deserved attention and got buried under later context.
- A concern flagged and never addressed.
- A decision that needed making and was never made.
- Something the user said they wanted, which never got scheduled.

## 4. Partial completions

The most dangerous category, because it looks finished:

- Files modified but tests never run.
- Implementation done, docs or config not updated.
- A plan agreed and only partly executed.
- A multi-part task where the easy parts landed and one part was quietly skipped.

Cross-check partial work against the repo rather than trusting the narrative — "all tests pass"
in a transcript is a claim, not a result.

## Presenting: resume mode

Scale to what you found. Simple interrupted task:

```
## Picking up — [session date/time]

**Was working on:** [one sentence]
**Last action:** [what was done last]
**Next:** [what comes next]
```

Several threads in flight:

```
## Picking up — [session date/time]

**In progress:**
- [thread 1]
- [thread 2]

**Unanswered / dropped:**
- [question or topic needing resolution]

**Next:** [most logical immediate step]
```

Then do the next step. Do not ask whether to continue.

## Presenting: audit mode

Group by project, then by category. Bullets must be specific enough to act on without re-reading
the transcript:

```
## Outstanding Threads — [date range]

### [Project]
**Unanswered questions:**
- [ ] [Who asked what, when, and what is still undecided]

**Promised but not done:**
- [ ] [The work item, with enough context to execute]

**Dropped threads:**
- [ ] [Topic raised, why it matters, what follow-up looks like]

**Partial work:**
- [ ] [What landed, what remains]
```

## Synthesizing across sessions

Single-session findings undersell the real problem. After analyzing each session, look across them:

- **Recurring deferrals** — the same item surfacing in several sessions is not a loose end, it is
  something being actively avoided, and it should be named as such.
- **Mentioned once, never revisited** — high risk of being genuinely forgotten rather than
  consciously deprioritized.
- **Projects with no recent activity** — work that stalled without a decision to stop.

## Handing off to tracking

For anything worth keeping beyond the conversation, propose a bead — include the source session so
the item stays traceable to its origin:

```bash
bd create "<title>" --description "<detail + source session>"
```

Then offer, and execute the choice without further confirmation:

> a) Create all as beads tasks
> b) Track specific ones — say which
> c) Start the highest-priority item now
> d) Summary only

Do not create tracking items unilaterally in audit mode. A scan that generates twenty beads from a
casual "what's outstanding?" turns a question into a chore.
