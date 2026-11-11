# Tuning the AI Reviewer

Maintainer-facing counterpart to [`giving-feedback-on-ai-reviews.md`](./giving-feedback-on-ai-reviews.md). That one covers producing the signal; this one covers reading it and acting on it.

Assumes the `ai-review-bot` deployment with `IMPROVE_ENABLED=true` and `DATABASE_URL` pointing at the corpus.

---

## Reading the signal

```bash
ai-review trends           # severity reliability, duplicate claims, per-skill
ai-review trends --json    # same, machine-readable
```

Three things it reports, in the order they are usually worth acting on.

### Severity reliability

```
high    useful=1  low_value=1  wrong=10  (8% useful,  n=12)
medium  useful=38 low_value=15 wrong=12  (58% useful, n=65)
low     useful=67 low_value=58 wrong=11  (49% useful, n=136)
```

`wrong` and `low_value` are deliberately separate. **Wrong** means the reviewer misread the code; **low-value** means it read the code correctly and the finding was not worth raising. The first is a correctness problem, the second a calibration problem, and they have different fixes.

A band that is confidently wrong costs more than a missing finding, because severity is the signal a reader trusts most. Watch for the ordering being *inverted* — the highest band performing worst — which means the reviewer's confidence is anti-correlated with its accuracy.

### Duplicate claims

```
x4  #18 src/github-app.ts — `buildReview`
      Critical: Missing `finally` — claim is never released on `buildReview`
      Critical: claim not released when buildReview throws
      ...
```

Only *negatively rated* findings cluster. Raising one real bug from several angles is thorough; restating one **rejected** claim is what crowds out other reviewers.

Clustering uses a shared code identifier as a blocking key plus a title-similarity threshold. The threshold matters: several findings mentioning `atomicWrite` while saying entirely different things are not one claim, and identifier-matching alone would group them.

### Per-skill signal

Reports nothing until enough **live-captured** findings accumulate. Backfilled findings carry no skills — which skill raised a finding lived only in memory at post time and is not recoverable from GitHub — so they are excluded rather than counted as skill-less.

## Acting on it

```bash
ai-review propose --dry-run   # what would be filed, and whether an issue is already open
ai-review propose             # file it
```

Output distinguishes `would_create` from `would_comment`, so a dry run tells you whether this opens a new discussion or adds to one.

Each signal produces at most **one open issue**, keyed on a signature marker in the issue body. A recurrence comments on the existing discussion rather than opening a second — the weekly cron depends on this to be safe unattended.

### Fix surfaces

| Signal | Where the fix usually goes |
|---|---|
| A severity band is unreliable | `src/prompt.ts` — raise the bar for that band, or drop it |
| One claim restated repeatedly | `mergeReviews` in `src/review.ts` — dedup keys on `path:line` plus an exact title, which cannot catch one root cause surfacing at several locations under different wording |
| A skill's findings are mostly rejected | `skills/<name>.md` — tighten what it asks for, or narrow when it runs |
| Findings assert behaviour from diff absence | `src/prompt.ts` — the tell is *"not present in the visible diff"* followed by a claim about program behaviour; those two things do not connect |

The proposal names a surface as a starting point, not an instruction. **The cycle never opens a PR** — a proposal is a discussion, and the change comes from normal development once the discussion settles.

## Thresholds

| Variable | Default | Effect |
|---|---|---|
| `IMPROVE_MIN_SAMPLE` | `8` | Minimum rated findings before a band or skill can be reported |
| `IMPROVE_MAX_USEFUL_RATIO` | `0.3` | A severity band at or below this is reported |
| `IMPROVE_MIN_CLUSTERS` | `2` | Duplicate clusters needed before filing |
| `IMPROVE_MIN_NEGATIVE_RATIO` | `0.5` | A skill at or above this is reported |
| `IMPROVE_CLASSIFY_LIMIT` | `500` | Feedback rows classified per cycle |

Every threshold requires a signal to be **both bad and well-observed**. A 0%-useful band with two samples is noise, and filing it trains the reader to ignore these issues — which costs more than missing one.

An unparseable value warns and falls back to the default. It does not disable detection: a `NaN` comparison is always false, so propagating it would silently switch the detector off with nothing to say why.

## Cadence

- **Daily** — drain reactions from the KV buffer into the corpus. No model calls.
- **Weekly** (Mon 06:00) — classify, detect, propose. Model calls happen here.

Both are `CRON_SECRET`-gated and both check `IMPROVE_ENABLED` *before* authenticating, so a deployment that never opted in skips cleanly rather than emitting a failed cron run forever.

## Running it by hand

```bash
ai-review backfill --repo <owner>/<name>   # harvest history; idempotent
ai-review classify                          # classify what is unclassified
ai-review trends                            # read the current picture
ai-review propose --dry-run                 # see what would be filed
```

All four are idempotent and safe to re-run. `backfill` re-reads GitHub and writes nothing new on a second pass; `classify` skips anything already classified.
