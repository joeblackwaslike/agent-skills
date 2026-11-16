# Ground truth: design-patterns review findings

Source: the combined `/self-review` of the design-patterns skill (24 files), run by six fresh reviewers (code, Python, TypeScript, database, silent-failure, prose), plus the two bot rounds on PR 3 and the reviews of PRs 1 and 2. The raw count was about 100 because several reviewers found the same defect; this list merges duplicates into 48 distinct issues. Severity is the highest any reviewer gave it. Use it to score a skill reviewer run against the files as they stood before the review fixes (commit `2a3ed18d` for the 15 later files; `d15e9b3a` for the behavioral files; `2e8f239d` for the scaffold).

Classes: **A** prose and code disagree, **B** the example commits the smell it warns about, **C** correctness bug in an example, **D** contradiction between files or with a sibling skill, **E** missing or weak defense or specificity in the skill itself, **F** unverified or overclaimed statement, **G** example quality, **H** process.

| # | Class | Severity | Issue |
|---|---|---|---|
| 1 | A | major | idempotency-key: prose says a concurrent duplicate sees InFlight, the dict code only shows re-entrancy |
| 2 | A | minor | factory: the "function version" claims the same guarded lookup but is a bare dict index |
| 3 | A | major | singleton: prose says the module-level object is the default, both code blocks teach the lazy cached getter |
| 4 | A | major | outbox: prose says publish and mark share one transaction with the row locked; the sqlite sample publishes with no transaction open |
| 5 | A | minor | unit-of-work: prose says the caller still sees the original error; a failing ROLLBACK replaces it |
| 6 | A | major | circuit-breaker: intro promises one half-open probe, code admits every caller |
| 7 | A | minor | observer: prose offers `Promise.allSettled`, but `publish` returns void |
| 8 | A | minor | state: prose says cancel is allowed "before it ships", the table has no (PAID, CANCEL) |
| 9 | A | minor | template-method: function version "covers the same ground" but skips the validation |
| 10 | A | minor | retry-backoff: claims an abortable sleep, ships only a fake |
| 11 | A | minor | decorator: paragraph under the Python example discusses TypeScript-only code |
| 12 | A | major | iterator: says `Array.from` is lazy; it is eager |
| 13 | A | major | result-option: an unknown coupon "silently priced at full is right", contradicting the file's own opening |
| 14 | B | major | adapter: maps any non-ok vendor state to failed (a pending charge looks failed), truncates sub-cent money, drops decline reasons |
| 15 | B | minor | builder: claims invariants live in `build()`, negative prices and NaN pass |
| 16 | B | minor | proxy: presented as a generic lazy proxy but traps only `get` |
| 17 | B | major | singleton: settings parsing fails open (`Number("")` is 0, `Number("abc")` is NaN) while a sibling fails fast |
| 18 | B | minor | idempotency-key TS: no fingerprint check, a smell the file lists |
| 19 | B | minor | dependency-injection: the "real" composition root hardcodes a frozen clock |
| 20 | B | minor | strategy and factory: part of a secret (key prefix, key length) appears in returned output |
| 21 | C | major | strategy and state TS: plain-object lookup with an external key returns inherited members for "constructor" |
| 22 | C | major | idempotency-key: any exception releases the key, so a post-effect failure double-charges on retry |
| 23 | C | minor | idempotency-key: expiry set at creation, dead process leaves InFlight for the whole TTL, an expired record can be clobbered |
| 24 | C | major | unit-of-work: the rollback demo raises before any INSERT is flushed, so it passes without a rollback |
| 25 | C | major | circuit-breaker TS: half-open admits concurrent probes, a stale success or failure changes state |
| 26 | C | minor | outbox: a poison row blocks the rest; `SKIP LOCKED` advice contradicts the file's lock-across-network smell |
| 27 | C | minor | all TS blocks: `console.assert` logs and exits 0, so failures pass |
| 28 | C | minor | observer: a throwing `onError` defeats the isolation it claims |
| 29 | C | minor | chain-of-responsibility: no guard against calling `next()` twice |
| 30 | C | minor | command: `undo_last` pops before undo succeeds, losing the command on failure |
| 31 | C | minor | retry-backoff: `Retry-After` uncapped, no attempt timeout, non-idempotent path skips the timeout |
| 32 | C | nit | dto-mapper: `Decimal` accepts exponent, underscore and over-precise input |
| 33 | D | major | factory: adoption threshold (second call site) conflicts with SKILL.md (third variant) |
| 34 | D | nit | observer: count-gated in SKILL.md, coupling-gated in its own file |
| 35 | D | minor | decorator, proxy and circuit-breaker disagree on whether a breaker is a proxy or a decorator |
| 36 | D | minor | template-method: "steps share a lot of state" versus a smell about state set by earlier steps |
| 37 | E | major | SKILL.md: "fewer than three" rule applied to resilience patterns, which are triggered by a failure mode |
| 38 | E | major | SKILL.md description: generic lead, missing trigger words, no reverse exclusions in the sibling skills |
| 39 | E | minor | SKILL.md and references: Python 3.12 assumption never stated |
| 40 | E | minor | dependency injection missing from the description while a sibling skill triggers on it |
| 41 | E | major | skill not registered in README.md |
| 42 | F | major | library claims unverified (tenacity, p-retry, cockatiel, pybreaker, Stripe retention) |
| 43 | F | minor | unit-of-work: "on Postgres a failed COMMIT ends the transaction" not supported by the docs read |
| 44 | F | minor | command: CQRS "only code that changes state" and Redux-actions claims overstated |
| 45 | F | minor | iterator: "AWS SDK paginators are async iterators" true only for the JS SDK v3 |
| 46 | G | minor | iterator: an unrelated `chunks` helper; adapter and decorator: TypeScript half of the example missing |
| 47 | H | major | the spec's invented 80 to 150 line target was enforced as a cap and made implementers cut real content |
| 48 | H | minor | dead links in the router for the minutes between stacked merges |

Counts by class: A 13, B 7, C 12, D 4, E 5, F 4, G 1, H 2 (48 total). The classes a skill reviewer should find without language-specific help are A, B, D, E, F, G and H (36 issues). C needs code execution or per-language review.
