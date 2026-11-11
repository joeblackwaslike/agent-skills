# Giving Feedback on AI Reviews

How to rate a finding from an AI code reviewer so the rating is usable, and what happens to it afterwards. Written for the agent or engineer answering a review — the reviewer only improves if the feedback distinguishes *wrong* from *unhelpful*, and most of it does not.

Applies to the first-party reviewers `anthropicreviewbot` and `codexreviewbot`. Third-party bots (`coderabbitai`, `sourcery-ai`, `chatgpt-codex-connector`) have their own feedback channels; reactions left on them do not reach this pipeline.

---

## The three reactions

| Reaction | Meaning | When |
|---|---|---|
| 👍 | The finding helped | It was real and worth raising, whether or not you changed the code |
| 👎 | The finding was **factually wrong** | The claim does not hold against the code |
| 😕 | The finding **did not land** | Technically accurate but not useful here — out of scope, already handled, misread intent, or noise |

**😕 is not a softer 👎.** They mean opposite things about the reviewer: 👎 says it was wrong, 😕 says it was right but the finding was not worth raising. Those need different fixes — one is a correctness problem in the prompt, the other is a calibration problem in what the reviewer chooses to report. Collapsing them loses the distinction entirely.

**😕 is also the one that carries the most signal.** Across one sampled PR the split was 51 👍 / 41 😕 / 7 👎. If you only ever use 👍 and 👎, roughly 85% of the negative signal never arrives.

## 😕 must carry a reply

A bare 😕 is uninterpretable. The reaction says the finding missed; only the reply says *how*, and the classifier reads the reply, not the reaction. The same 😕 can resolve to:

- **the reviewer was factually wrong** — it misread the code or reviewed a stale commit
- **right, but not worth raising** — trivial, deliberate, or out of scope
- **right finding, bad explanation** — the substance was fine and the framing buried it

Those are three different fixes. Without the reply, the rating is discarded as ambiguous.

```bash
# React, then explain — both, on the same thread.
gh api -X POST repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions \
  -f content=confused
gh api -X POST repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies \
  -f body='**No change — the guard is deliberate.** `process.exit(1)` truncates
pending stdout, which is exactly wrong for a handler whose job is to emit a
diagnostic.'
```

Reaction `content` values are `+1`, `-1`, and `confused`.

### Openers that read cleanly

Replies here are parsed for their leading verdict phrase before any model is consulted, which is both cheaper and more reliable than inferring intent from prose. Starting a reply with one of these makes the rating unambiguous:

| Opener | Read as |
|---|---|
| `**Fixed** in <sha>` | the finding was right |
| `**Correct**` / `**Verified**` / `**Agreed**` / `**Fair**` | the finding was right |
| `**Stale —**` / `**Already fixed in <sha>**` | the reviewer reviewed an old commit |
| `**False positive**` / `**Incorrect**` | the reviewer was wrong |
| `**No change —**` / `**Acknowledged**` / `**Working as intended**` | right, but not worth acting on |
| `**Minor**` / `**Out of scope**` / `**Leaving as-is**` | right, but not worth acting on |

Anything else still works — it just costs a model call to classify.

## Rate everything actionable, not a sample

Rating only the findings you found notable biases the corpus toward whatever caught your attention, which is the opposite of what it is for. A reviewer looks worse than it is if you only rate the bad findings, and better than it is if you only rate the ones you fixed.

## Rating the review as a whole

PR **reviews** are not reactable — GitHub has no endpoint for it. The reviewer works around this by posting a **carrier comment** containing the review summary. React on that comment to rate the review overall:

```bash
# The carrier is an ISSUE comment, so it uses the issues route, not pulls.
gh api -X POST repos/{owner}/{repo}/issues/comments/{comment_id}/reactions \
  -f content=+1
```

There is one carrier per PR and it is updated in place across review rounds, so reactions accumulate rather than scattering.

## Reporting a reviewer bug

If the reviewer is wrong in a way that is not specific to one finding — it reviewed the wrong commit, it hallucinated a function, it filed the same claim five times — say so in the reply and mark it 👎. Repeated identical claims are detected automatically, but a reply naming the pattern is what makes the underlying cause obvious.

## Where it goes

```
your 👍 / 😕 / 👎  ──▶  Upstash KV (daily buffer)
your reply         ──▶  scraped from the thread
                            │
                            ▼
                   Neon Postgres corpus
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
      classified      matched to      per-skill and
      into intent     the finding     per-severity trends
                            │
                            ▼
              a GitHub issue when a signal crosses
              threshold — discussion first, never a PR
```

A daily cron drains reactions; a weekly cycle classifies, detects trends, and files at most one issue per signal. The cycle never opens a PR: a proposal is a discussion to have, not a change to accept.

Nothing you write here is read by the reviewer during a review. It changes the reviewer only by changing its prompts or skills, which a human decides.

## What good feedback changes

Real examples of signals this produced:

- **Severity calibration.** Findings marked 🔴 turned out to be worth acting on 8% of the time, against 58% for 🟡 — the band the reader trusts most was the least reliable. Visible only because both good and bad findings were rated.
- **Duplicate claims.** One rejected claim restated four times in a single file, three times in another. Detected by clustering findings on a shared code identifier plus title similarity.

Neither is visible from a single rating. Both come from rating consistently over time.
