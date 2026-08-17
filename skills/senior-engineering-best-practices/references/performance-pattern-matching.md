# Performance Pattern-Matching

## The instinct

Recognize the small set of scaling footguns that show up constantly, on sight, without needing to
profile first — while resisting the urge to micro-optimize code that doesn't matter. The senior
instinct isn't "always optimize" or "never optimize," it's knowing which situation you're in.

## Patterns to recognize on sight

- **N+1 queries** — a loop that issues one database/API call per item instead of one batched call
  for all items. Looks innocuous at small N, becomes the dominant cost as data grows. Watch for:
  a query or fetch call sitting inside a `for`/`map` over a collection that itself came from a
  query.
- **Unindexed lookups inside loops** — a linear search (`.find()`, `.filter()`, array scan)
  repeated once per item of an outer loop, turning an O(n) operation into O(n²). Watch for: a
  lookup into an array/list (not a map/set/index) inside another iteration.
- **Unbounded pagination / unbounded reads** — fetching "all" of something with no limit, page
  size, or cursor, on data whose size isn't actually bounded. Works fine in dev with 10 rows,
  falls over in production with 10 million.
- **Synchronous I/O on a hot path** — a blocking network/disk call inside code that's expected to
  handle concurrent requests or run frequently, with no async/batching/caching.

## What to do instead

When you see one of these patterns in code you're writing or reviewing, that's the trigger to ask
"does this run on data that could grow, or at a frequency that compounds?" — not to reflexively
"fix" every instance regardless of context. A one-time migration script doing an N+1 over 50 rows
is fine; the same pattern in a request handler serving production traffic is not.

## Balance: don't over-optimize the cold path

The complementary failure mode is spending effort micro-optimizing code that doesn't matter —
a config-loading function that runs once at startup, a rarely-hit error branch, a script run
manually once a quarter. Premature optimization there is wasted effort and often adds complexity
(caching, manual memory management, clever-but-unreadable code) for no measurable benefit. The
instinct this runbook teaches is pattern-matching on *scale-sensitive* shapes (loops over
data that grows, code on a path that runs often or concurrently) — not a blanket call to optimize
everything on sight.
