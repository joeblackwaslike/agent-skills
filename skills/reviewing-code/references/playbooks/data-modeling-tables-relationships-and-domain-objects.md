# Data modeling: tables, relationships and domain objects

> Use when the diff: Adds or changes tables, ORM models, queries, `.sql` files, indexes or migrations

*Leans on: make illegal states unrepresentable, separation of concerns, high cohesion, YAGNI.*

A schema outlives the code that first used it, so it gets the most careful design review of anything in a PR. Review the tables and the Python objects that represent them together, because mismatches between the two are where bugs live.

**The tables**

- **Start from the queries.** Ask the author for the main reads and writes this model serves. The schema, keys and indexes should follow from them, not from the shape of a JSON payload.
- **Keys.** Every table has a primary key. Choose surrogate ids (`bigint` identity or UUID; UUIDv7 if inserts should stay index-friendly) consistently with the rest of the schema. Natural uniqueness (email per tenant, one active subscription per account) is a `UNIQUE` constraint, partial if needed, not an application check.
- **Constraints carry the invariants.** `NOT NULL`, `CHECK`, foreign keys and unique constraints make illegal states impossible regardless of which code path writes. An invariant enforced only in Python will be violated by the next script, migration or service that writes to the table.
- **Foreign key behavior.** Each `ON DELETE` (`CASCADE`, `RESTRICT`, `SET NULL`) is a deliberate choice. Cascades on large or important tables can delete far more than intended.
- **Normalization.** Normalize by default. Denormalized copies need a stated reason (a measured read path) and a mechanism that keeps them in step.
- **Soft deletes, audit and tenancy.** If `deleted_at` exists, every unique constraint and every query must account for it, usually with partial indexes. Decide whether audit history belongs in the table or a separate log. Tenant ids appear on every tenant-scoped table.
- **Naming.** Plural or singular table names, `_id` suffixes, timestamp column names (`created_at`, `updated_at`) consistent with the existing schema.

**Column types.** Check that the database's types fit the data:

| Smell | Why it hurts | Prefer |
| --- | --- | --- |
| Money as `float` or `REAL` | Rounding errors accumulate | `Decimal` with `NUMERIC(p, s)`, or integer minor units plus currency in a `Money` type |
| Timestamps as strings, naive datetimes, or `TIMESTAMP` without time zone | Ambiguous across zones and daylight saving changes | Timezone-aware UTC `datetime`, stored as `TIMESTAMPTZ` |
| UUIDs, IP addresses or fixed value sets as `VARCHAR` | No validation, larger indexes | Native `UUID` and `INET`; an enum, check constraint or lookup table for fixed sets |
| JSONB holding fields that are queried, joined, filtered or constrained | No integrity, awkward queries, silent schema drift | Real columns or tables; JSONB only for payloads that are rarely filtered and genuinely vary |
| Nullable columns that are never null in practice | Every reader handles a case that can't occur | `NOT NULL` wherever the domain requires a value |
| A list of ids packed into one column | No foreign keys, no joins | A join table |
| `is_active`, `is_deleted` and `deleted_at` side by side | Contradictory states are possible | One representation of state, with the rest derived |

**Relationship shapes.** Choose the structure that matches how the data relates:

- **One-to-many.** A foreign key on the many side, indexed, with a deliberate `ON DELETE` behavior.
- **One-to-one.** A foreign key with a unique constraint. First ask whether it should simply be one table; split only for a different lifecycle, access pattern, or large and rarely read columns.
- **Many-to-many.** An association table with a composite unique key. If the link carries data of its own (a role, a quantity, a start date), it is an entity and deserves a name.
- **Polymorphic references** (`target_type` plus `target_id`). The database can't enforce them. Prefer separate foreign keys with a check constraint, or a join table per target.
- **Hierarchies.** An adjacency list with a recursive CTE works for shallow or rarely queried trees. Use `ltree` or a closure table when subtree queries are frequent.
- **True graphs.** Variable-depth traversal, path finding, and many-to-many links among the same kind of entity, with questions like "who is connected to whom within N hops". If a SQL schema keeps accumulating self-joins and recursive CTEs, a graph database may fit better. The reverse also happens: data in a graph store whose queries are filters, aggregates and transactions belongs in a relational database. The dominant queries decide.

**The domain objects**

- **Persistence model vs. domain model.** For CRUD, one SQLModel class may serve as both. Once the domain has behavior and invariants, keep the ORM model at the repository boundary and map to domain objects, so the domain doesn't depend on SQLAlchemy and table changes don't ripple into business logic. The same applies to Prisma or Drizzle in TypeScript: map to domain types at the repository boundary instead of passing generated client types everywhere.
- **Relationships in code match the database.** A non-nullable foreign key is a non-optional attribute; a `UNIQUE` link is one object, not a list. Type hints, nullability and defaults on the Python side agree with the columns.
- **Aggregates.** Decide which objects are loaded and saved together and which are referenced by id only. An aggregate that pulls in half the database on load is the wrong boundary.
- **Loading strategy declared.** Relationships specify how they load. In async SQLAlchemy, `lazy="raise"` on relationships turns accidental lazy loads into immediate errors instead of hidden queries. In Prisma or Drizzle, relations load only when the query asks for them (include, with), so check list queries fetch them in one query rather than per row.
- **Value objects.** Money, addresses, date ranges and similar groups are value types in code, mapped to columns with composites or explicit mapping, not loose fields.
