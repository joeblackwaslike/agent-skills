# Observability Instinct

## The instinct

Write code as if the person debugging its failure has no context and won't be you. That means
instrumenting decision points with enough information that a failure is diagnosable from its
evidence trail, not just its existence. "It failed" is not a diagnosis; "it failed because X was
Y when Z was expected" is.

## What it looks like when missing

An error path exists, but the message just says "failed" or re-throws a generic exception with no
context about what was expected, what was actually observed, or what state the system was in.
Nothing logs the decision points that would let someone reconstruct what happened after the fact.
The first anyone learns something is silently going wrong is a support ticket, a spike in a
metric nobody was watching, or — worst case — an accident.

## What to do instead

- **State expected vs. actual** in error messages and logs, not just "operation failed." "Expected
  a positive integer, got -1" is diagnosable; "invalid input" is not.
- **Log at decision points**, not just at failures — the branch taken, the value that drove it.
  A silent success and a silent failure look identical in the absence of logs; the ambiguity is
  the cost.
- **Ask, before shipping:** "if this breaks in production, does the evidence to diagnose it
  already exist, or does someone have to reproduce it live, with no clues?" If the answer is the
  latter, add the instrumentation now — it's dramatically cheaper before the incident than during
  one.
- **Consider anomaly detection for background/automated processes specifically** — a process that
  runs unattended (a hook, a cron job, a background worker) has no human in the loop noticing
  something looks off in real time. If it can misbehave silently, something should be watching its
  rate/volume, not just its individual failures.

## Worked example

PM-005 (`/Users/joe/github/joeblackwaslike/postmortems/postmortems/005-pieces-stop-hook-session-pollution.md`)
— a Stop hook spawned ~36,468 ghost Claude Code sessions over 59 days, at a peak rate of one every
28 seconds, entirely undetected. The postmortem states this directly: "No monitoring, alerting, or
session-count anomaly detection existed to catch the 35x weekly session rate increase." It was
found by accident — a user noticed leaked system-prompt text while asking an unrelated question,
and traced it back manually. Fifty-nine days and tens of thousands of ghost sessions is the cost
of a background process with no observability layer watching its own volume. The fix that was
eventually built didn't just close the isolation gap — it also made the hook's behavior visible in
a way it wasn't before, which is what should have existed from the start for any unattended,
self-triggering process.

## Balance

This isn't a call to instrument everything uniformly — see `performance-pattern-matching.md` for
the parallel "don't over-optimize cold paths" instinct, and the same balance applies here: put the
instrumentation where a silent failure would be expensive (background/automated processes,
anything touching money or shared state, anything with no human directly watching), not on every
line of every hot path where it would just add noise.
