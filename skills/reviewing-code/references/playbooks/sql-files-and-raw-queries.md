# SQL files and raw queries

*Leans on: Parse Don't Validate, Fail Fast, explicit over implicit, least privilege.*

SQL shows up as `.sql` files (migrations, views, functions, seed data, reporting queries), as raw strings inside application code, and as query-builder chains. Review it as code that runs against production data, often with more privilege than the application has. The SQL section of the `engineering-principles` skill's `language-notes.md` has the idioms; this is the review pass.

- **Parameters, never interpolation.** Values reach the query as bound parameters. Identifiers that must be dynamic (a sort column, a table name) come from an allowlist and are quoted with the driver's identifier quoting, never from raw user input.
- **Read it against the schema.** Check join conditions against the actual keys: a missing or wrong condition multiplies rows, and `DISTINCT` added to hide duplicates is a sign of it. Check `NULL` handling in comparisons, `NOT IN`, outer joins and aggregates.
- **Correct results on edge data.** Empty tables, `NULL` columns, duplicate keys, time zone boundaries and the first and last page of a paginated query.
- **Performance on real data.** Every new query or changed predicate gets the queries and indexes playbook, and `EXPLAIN (ANALYZE, BUFFERS)` on production-sized data for anything that touches large tables.
- **Transactions and locking.** Multi-statement changes run in one transaction. Long-running statements, `SELECT ... FOR UPDATE`, and bulk `UPDATE` or `DELETE` are checked for how long they hold locks and what waits behind them; large changes run in batches.
- **Destructive statements.** `DELETE`, `UPDATE`, `TRUNCATE` and `DROP` in scripts have an explicit `WHERE` or scope, a matching `SELECT` that shows what will change, a row-count check or `RETURNING`, and a backup or rollback plan for production.
- **Views, functions and triggers.** Views used as an interface are versioned like an API. Functions declare their volatility and security (`SECURITY DEFINER` sets `search_path` explicitly). Triggers are a last resort, because they hide behavior from everyone reading the application code.
- **Least privilege.** Reporting and analytics queries run as read-only roles. Scripts run with the narrowest role that works, not the owner or superuser.
- **Idempotent scripts.** Seeds and one-off scripts can be re-run safely (`CREATE ... IF NOT EXISTS`, `INSERT ... ON CONFLICT`), or say clearly that they can't.
- **Readable and linted.** Formatted by SQLFluff or the project's formatter, with CTEs named for what they hold and comments explaining business rules the query encodes.
- **Tested.** Queries with logic in them (reports, aggregates, complex filters) have tests against a real database with known fixture data and expected results.
