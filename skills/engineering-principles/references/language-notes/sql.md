# SQL

SQL reaches review in migrations, `.sql` files, query builders and raw strings inside application code. The queries and indexes, data modeling and migrations playbooks cover the design; the SQL files playbook is the review pass; this file is the reference.

## Tooling

- **SQLFluff** lints and formats SQL for many dialects, so layout and casing never reach review.
- **Squawk** lints PostgreSQL migrations for operations that lock tables or break running code.
- **`EXPLAIN (ANALYZE, BUFFERS)`** on production-sized data is the review tool for performance. Read it for sequential scans on large tables, row estimates far from actual rows, and sorts or hashes spilling to disk.
- **Tests against a real database** (a container in CI), not mocks: a query is only verified when the database has run it.

## Idioms

| Non-idiomatic | Idiomatic | Why it matters |
| --- | --- | --- |
| String-built SQL (`f"... WHERE id = {id}"`) | Bound parameters | Injection, and plans can't be reused |
| `SELECT *` in application queries | Named columns | A new column changes results and payload size silently |
| `WHERE col = NULL` | `WHERE col IS NULL` | `= NULL` is never true |
| `NOT IN (subquery)` where the subquery can return `NULL` | `NOT EXISTS (...)` | One `NULL` makes `NOT IN` return no rows |
| `WHERE date(created_at) = '2026-11-04'` | `WHERE created_at >= '2026-11-04' AND created_at < '2026-11-05'` | A function on the column defeats its index |
| Implicit joins in `FROM a, b WHERE ...` | Explicit `JOIN ... ON` | A missing condition becomes a visible bug, not a cross join |
| `COUNT(*) > 0` to test existence | `EXISTS (...)` | Stops at the first match |
| `OFFSET` pagination on large tables | Keyset pagination (`WHERE (created_at, id) < (...)`) | Deep pages stay fast |
| `DISTINCT` to hide duplicate rows | Fix the join that produces them | Duplicates usually mean a wrong join condition |
| Long nested subqueries | Named CTEs (`WITH ...`) | Readable top to bottom |
| `UPDATE` or `DELETE` without `WHERE` in a script | An explicit `WHERE`, checked by running the matching `SELECT` first | One missing line changes every row |

## SQL-specific smells

- **Transactions left implicit** for multi-statement changes that must succeed or fail together.
- **Read-modify-write in two statements** where one atomic `UPDATE ... SET x = x + 1` or `INSERT ... ON CONFLICT` would do.
- **Hidden type casts** in comparisons (`varchar_col = 123`) that stop an index from being used.
- **Dialect-specific features** used without noting it, in code meant to run on more than one database.
- **Unbounded queries** with no `LIMIT` on tables that grow, in anything a user can trigger.
