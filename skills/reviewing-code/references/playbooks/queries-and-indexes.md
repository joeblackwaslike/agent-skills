# Queries and indexes

*Leans on: premature optimization (measure), Fail Fast (catch it before production), explicit over implicit.*

A missing index rarely fails a test. It fails in production, when the table is large and a page or a job does a sequential scan under load. Review every new query against the data it will meet, not the test fixtures.

**Finding missing indexes**

- **Every new query, every new filter.** For each `WHERE`, `JOIN`, `ORDER BY` and `GROUP BY` on a table that is or will be large, find the index that serves it. If there isn't one, it's a finding.
- **Foreign keys.** PostgreSQL indexes the referenced primary key but not the referencing column. Without an index on the foreign key, joins from the parent and every cascading delete scan the child table.
- **Composite order.** Columns used with equality come first, then the range or sort column. An index on `(tenant_id, created_at)` serves `WHERE tenant_id = ? ORDER BY created_at`; one on `(created_at, tenant_id)` mostly doesn't.
- **Read the plan.** For anything non-trivial, ask for `EXPLAIN (ANALYZE, BUFFERS)` against production-sized data. A `Seq Scan` on a large table, a large `Rows Removed by Filter`, or a sort spilling to disk are the things to look for.
- **Partial and covering indexes.** `WHERE deleted_at IS NULL` or `WHERE status = 'pending'` partial indexes are smaller and faster for hot queries; `INCLUDE` columns can make a query index-only.
- **Don't over-index.** Each index slows every write and costs storage. Redundant indexes (a prefix of another index) and indexes no query uses are findings too.

**String matching, prefixes and wildcards**

| Pattern | Can use a plain B-tree index? | What to use |
| --- | --- | --- |
| `col = 'abc'` | Yes | B-tree |
| `col LIKE 'abc%'` (prefix) | Only with `C` collation, or an index built with `text_pattern_ops` / `varchar_pattern_ops` | B-tree with a pattern operator class |
| `col LIKE '%abc'` (suffix) | No | Trigram GIN index (`pg_trgm`), or an index on `reverse(col)` |
| `col LIKE '%abc%'` (contains) | No | Trigram GIN index (`pg_trgm`) |
| `col ILIKE ...` or `lower(col) = ...` | No | Expression index on `lower(col)`, `citext`, or trigram for patterns |
| Words in prose | No | Full-text search (`tsvector` with a GIN index) or a search engine |

- **Escape user input in patterns.** `%` and `_` in user input are wildcards. Escape them (and the escape character) before building a `LIKE` pattern, or a search for `100%` matches everything, and a leading `%` from a user turns an indexed prefix search into a full scan.
- **Minimum lengths.** Contains-searches on one or two characters match most rows even with a trigram index. Require a minimum length or cap results.
- **Regex and functions on columns.** `WHERE lower(email) = ...`, `WHERE date(created_at) = ...` or `~` regex matches can't use a plain index on the column. Index the expression or rewrite as a range.

**N+1 and other ORM traps**

- **Spot the loop.** Any relationship attribute accessed inside a loop over query results is a query per row unless it was eager-loaded. Look at templates and serializers too; they are where N+1 hides.
- **Load explicitly.** `selectinload` for collections, `joinedload` for many-to-one, and `lazy="raise"` so a missed one fails in tests. In TypeScript ORMs, use include or one findMany with an in filter rather than a query per item; in GraphQL resolvers, batch per-request lookups with DataLoader.
- **Count queries in tests.** A test that asserts the number of queries for a list endpoint (via an SQLAlchemy `before_cursor_execute` event listener, for example) stays green as the fixture grows only if there is no N+1.
- **Unbounded reads.** `.all()` on a table that grows, with no `LIMIT`. Paginate, stream, or batch.
- **Deep `OFFSET`.** Page 10,000 still reads and discards all earlier rows. Use keyset pagination.
- **Writes in loops.** One `INSERT` or `UPDATE` per row inside a loop. Use bulk operations.
