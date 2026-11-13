# SQL testing mechanics

How to write the tests the [runbooks](../runbooks/unit.md) describe for a PostgreSQL schema, its functions and its migrations, using pgTAP. Standards are in [testing-principles](../../../testing-principles/SKILL.md); the shape of a test body is the [test body template](../test-body-template.md). The thirteen sections match the [Python page](python.md) in order, but this page is shorter: SQL has no mock library and no async, so it spends its words on rollback isolation, determinism inside a query, and migration tests. Everything here is PostgreSQL. Other databases have their own tools, which this page does not cover.

## Toolchain and verified versions

Versions below were checked on 2026-11-13 against the pgTAP GitHub releases, the pgTAP docs shipped in its repository, and the CPAN index for the runner. Re-check before you pin.

| Tool | Version | Used for |
|---|---|---|
| pgTAP | 1.3.4 (latest release 2025-10-04) | TAP-producing test functions inside PostgreSQL |
| PostgreSQL | 18.6 locally; the project's versions page lists 18.7 as current | the database under test |
| pg_prove | ships in the CPAN distribution TAP::Parser::SourceHandler::pgTAP 3.37 (2025-03-30) | runs test files, sets the exit code |

What ran: I built pgTAP 1.3.4 from its tag with `make`, loaded the generated `sql/pgtap.sql` into a database on a throwaway PostgreSQL 18.6 cluster, and ran every SQL example below through `psql`. That used no `CREATE EXTENSION`, so the packaged-extension install path (`make install`, then `CREATE EXTENSION pgtap`, which the pgTAP README gives) was not run. `pg_prove` was not installed and not run. `pgtap_version()` on the loaded file returned `1.3`. The throwaway cluster was stopped afterwards.

Plain `psql` runs a test file but always exits 0, even when a test fails. I confirmed that with a deliberately failing test. The pass or fail verdict, and a non-zero exit for CI, comes from `pg_prove`, which reads the TAP stream. A pipeline that runs only `psql -f` does not gate anything.

```sh
pg_prove -d mydb db/tests/*.test.sql db/tests/migrations/*.test.sql
```

pgTAP's docs give `pg_prove -U postgres sql/*.sql` as the form for a batch of files; pass the usual PostgreSQL connection options.

## Layout and naming

```text
db/migrations/0007_rename_name_to_display_name.sql
db/tests/schema.test.sql
db/tests/accounts.test.sql
db/tests/migrations/0007.test.sql
```

- One test file per table, function or migration. Name each assertion for the behavior: `a negative balance is rejected`, not `test 4`. The text is the line in the TAP output.
- A file is a script: `BEGIN;`, `SELECT plan(n);`, the assertions, `SELECT * FROM finish();`, `ROLLBACK;`. The count in `plan` is the number of assertions, so adding one without bumping it fails the file, which is the guard against a test silently not running.
- For xUnit style, put test functions in a schema, named `test_*`, and run them with `runtests()` (below). It plans and finishes for you and wraps each test in its own rollback.
- Test through the public surface: tables, views, functions and constraints your application relies on. Do not assert the internal helper function an implementation happens to use ([testing private internals](../code-smells.md#testing-private-internals)).

## Fixtures, setup, teardown

There is no teardown. The whole file runs in a transaction that ends in `ROLLBACK`, so everything a test creates disappears, and so does the schema if the file created it (PostgreSQL DDL is transactional, which is what makes a throwaway schema in a test possible). The file below creates the table it tests, so it runs the same anywhere.

```sql
BEGIN;
SELECT plan(8);

CREATE TABLE accounts (
    id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email         text   NOT NULL UNIQUE,
    balance_cents bigint NOT NULL CHECK (balance_cents >= 0),
    expires_at    timestamptz NOT NULL
);

CREATE FUNCTION is_expired(expires timestamptz, as_of timestamptz DEFAULT now())
RETURNS boolean LANGUAGE sql STABLE AS $$ SELECT expires <= as_of $$;

SELECT has_table('accounts');
SELECT col_not_null('accounts', 'email');
SELECT col_type_is('accounts', 'balance_cents', 'bigint');

INSERT INTO accounts (email, balance_cents, expires_at)
VALUES ('ada@example.com', 500, '2026-01-01T00:00:00Z'),
       ('bob@example.com', 0,   '2027-01-01T00:00:00Z');

SELECT throws_ok(
    $$INSERT INTO accounts (email, balance_cents, expires_at)
      VALUES ('eve@example.com', -1, '2027-01-01T00:00:00Z')$$,
    '23514', NULL, 'a negative balance is rejected');

SELECT throws_ok(
    $$INSERT INTO accounts (email, balance_cents, expires_at)
      VALUES ('ada@example.com', 1, '2027-01-01T00:00:00Z')$$,
    '23505', NULL, 'a duplicate email is rejected');

SELECT is(is_expired('2026-06-01T00:00:00Z', '2026-06-01T00:00:00Z'), true,
          'expired exactly at the boundary');

SELECT results_eq(
    $$SELECT email FROM accounts WHERE is_expired(expires_at, '2026-06-01T00:00:00Z') ORDER BY email$$,
    ARRAY['ada@example.com'],
    'only the account past its fixed expiry date is listed');

SELECT is_empty(
    $$SELECT 1 FROM accounts WHERE balance_cents < 0$$,
    'no row holds a negative balance');

SELECT * FROM finish();
ROLLBACK;
```

This ran: eight `ok` lines, and afterwards neither the table nor the function existed in the database. `throws_ok` takes the statement as a string, the SQLSTATE to expect (23514 is a check violation, 23505 a unique violation) and an optional message pattern. Checking the SQLSTATE means the test passes only for the failure you meant, not for a typo.

For real tests the schema comes from your migrations, applied once before the run, and the file contains only the seed rows. Put the values each assertion depends on in the test file next to the assertion ([values defined far from the test](../code-smells.md#values-defined-far-from-the-test)). The [fixtures runbook](../runbooks/fixtures.md) has the steps for deciding what a fixture should build.

### The xUnit form

`runtests()` finds functions named `startup*`, `setup*`, `teardown*`, `shutdown*` and `test*` in a schema, runs them as subtests, and rolls back after each test function. It runs `setup*` functions before every test, which is the SQL form of a fixture.

```sql
BEGIN;
CREATE TABLE items (id int PRIMARY KEY, qty int NOT NULL);
CREATE FUNCTION setup_items() RETURNS SETOF text LANGUAGE plpgsql AS $$
BEGIN INSERT INTO items VALUES (1, 5); RETURN; END $$;
CREATE FUNCTION test_each_test_starts_clean() RETURNS SETOF text LANGUAGE plpgsql AS $$
BEGIN UPDATE items SET qty = 99; RETURN NEXT is((SELECT count(*) FROM items), 1::bigint, 'one row'); END $$;
CREATE FUNCTION test_qty_is_seeded() RETURNS SETOF text LANGUAGE plpgsql AS $$
BEGIN RETURN NEXT is((SELECT qty FROM items WHERE id = 1), 5, 'seed row present'); END $$;
SELECT * FROM runtests();
ROLLBACK;
```

Both tests passed. The second one reads `qty = 5` even though the first one changed it to 99, because the rollback between tests undid the change and `setup_items` ran again. Define the test functions in a schema that is part of the test database, not in production.

## Doubles: stub, mock, autospec equivalent, fake

SQL has no mock library, and for the usual targets it needs none. The database is the real thing and the test runs against it (P8). The cheap, deterministic parts are never doubled.

- **A stub for data** is a row. Insert the rows the test reads, in the test file.
- **A stub for a function** is a replacement defined in the test: create a schema `stubs` with a same-named function, then `SET LOCAL search_path = stubs, pg_catalog, public;`. It disappears at the rollback. Use this for a function that reads the clock or calls out of the database. pgTAP does not do this for you. Two limits, both observed here. Built-in schemas are searched first unless you list them yourself, so name `pg_catalog` after `stubs`. And the stub reaches only names resolved when the function runs: a stubbed `now()` took effect inside a SQL function body, but not in a parameter default (`as_of timestamptz DEFAULT now()`), which was bound to the real `now()` when the function was created.
- **A mock does not exist.** A trigger or function that logs calls to a temporary table gives you recorded calls to assert on (assert the table's whole contents with `results_eq`, ordered). That is the exact-call rule (P10) for SQL. I did not run such a trigger; the pattern needs only ordinary PostgreSQL.
- **A fake** is a table with the same shape as the real one but no constraints or indexes, used when a function takes a table name. It trades fidelity for convenience, so test at least once with the real table.

Autospec has no equivalent, because SQL checks the names and types when the statement is prepared. A call with the wrong arguments fails at once.

## Parametrization

pgTAP has no parametrized test. Two approaches that keep each case named:

- `VALUES` plus a set comparison. State the table of inputs and expected outputs and compare it to what the function returns, and a failure prints the differing rows. This is a table the database runs in one query.

```sql
SELECT results_eq(
    $$SELECT n, is_expired(timestamptz '2026-01-01' + n * interval '1 day', timestamptz '2026-01-01')
      FROM generate_series(-1, 1) AS n ORDER BY n$$,
    $$VALUES (-1, true), (0, true), (1, false)$$,
    'expiry is inclusive of the as-of date');
```

- A `SELECT` per case, each with its own description, for a handful of cases. This reads like a table of tests and each failure names its case.

Write the expected value as a literal in each row (P3). If the expected side is computed with the same expression as the code under test, the test cannot fail ([logic in tests](../code-smells.md#logic-in-tests)). The `VALUES` form above ran and passed.

## Determinism: time, randomness, network, ordering

### Time

`now()` and `current_timestamp` return the start time of the transaction, so inside one test file they do not change between statements. That is stable within a file but different on every run, so never assert on a value derived from them.

- **Inject the time as a parameter.** Give the function an `as_of timestamptz DEFAULT now()` argument and have the test pass a fixed value, as `is_expired` above does. Both assertions in the file ran against fixed dates.
- If you cannot change the function, redefine the one function that reads the clock in the test (the stub above, mind its limit with defaults), or compute the expected value from `now()` the same way outside the code under test and compare with a tolerance, which is the weaker choice.

### Randomness

`setseed(x)` makes `random()` repeat within a session. I confirmed two reads after the same `setseed(0.5)` were equal. Better to pass the value in. Do not assert on a generated UUID or random token; assert its format (`matches` in pgTAP, or a length and character check).

### Network

A query does not reach the network unless an extension such as a foreign data wrapper does. A test that touches a foreign table is an integration test of that wrapper. Use a local table with the same shape for a quick check.

### Ordering

SQL gives no row order without `ORDER BY`, and the same query can return rows differently after an index or a vacuum. Always `ORDER BY` in a query you compare with `results_eq`, or use `set_eq` or `bag_eq` when order does not matter and say so. Do not assert on a sequence or identity value: sequences are not rolled back, so a `GENERATED ... AS IDENTITY` column returns different ids depending on what ran before. I checked this: after an insert inside a rolled-back transaction, the next insert received id 2, not 1. Assert on the columns you set, not on the generated key.

## Isolation and cleanup

- Each file runs in a transaction and ends in `ROLLBACK`, so nothing a test creates outlives it (P13). The pgTAP docs say `runtests()` also rolls back after each test function and at the end, and name one exception, sequences.
- A transaction does not isolate everything. A `COMMIT` inside the code under test, a call through `dblink`, `VACUUM`, `CREATE INDEX CONCURRENTLY` or anything else that cannot run inside a transaction, ends the isolation. For those, use a database made for the test.
- **Separate database per run.** Create a database from a template that already has the migrations applied (`CREATE DATABASE test_run_17 TEMPLATE migrated_template`), run the files against it, drop it. No other connection may be open on the template while it is cloned, so keep migrations and test sessions off it. This is the PostgreSQL feature for cloning a database quickly; I did not run it on this page. It makes parallel runs safe, because each has its own database.
- **Parallel runs against one database** work only when every file rolls back and no two files touch the same fixed row or lock the same table. A DDL statement takes locks that make parallel files wait or deadlock. If files create the same table name in separate transactions, one blocks the other until it ends, so give each file its own schema or prefer the template database.
- Keep test objects out of production. Use a test database, never the one your application uses. A test file must not point at a production connection string.

## Async

SQL has no async model of its own. What applies is concurrency: two sessions touching the same rows. A pgTAP file runs in one session, so it cannot test locking, deadlocks or isolation anomalies. Test those with a script that opens two `psql` sessions, or in the application's tests using two connections. Do not use `pg_sleep` to order two sessions ([bare sleeps](../code-smells.md#bare-sleeps)); coordinate with advisory locks or wait on a condition with a bound. `LISTEN` and `NOTIFY` messages are delivered only at commit, so a test that rolls back will never see one.

## Performance

Measure first ([slow tests runbook](../slow-tests.md)). The levers for SQL:

- Applying migrations dominates. Apply them once to a template database and clone it per run, rather than re-running them in each test.
- Transactions that roll back are cheap. A test that creates a table or two per file is fast; loading thousands of rows per test is not. Keep seed data to the rows the assertion names.
- Test an execution plan only where the plan is a requirement, such as "this lookup uses the index", and say why in the test. An `EXPLAIN` text check breaks when PostgreSQL's planner changes between versions and when table statistics change, so use it for a few important queries, and have the test insert enough rows for the planner to prefer the index. A latency threshold on a shared machine is a flaky test ([flakes](../flakes/triage.md)). I did not run an `EXPLAIN` test on this page.
- Run one file while iterating (`psql -f db/tests/accounts.test.sql` shows the TAP lines) and `pg_prove` over the whole directory before you push.

## Coverage, mutation and property-based tools

**Coverage:** I found no standard line-coverage tool for SQL or PL/pgSQL that I could verify, so I do not recommend one. The substitute is structural: pgTAP's schema assertions (`has_table`, `has_column`, `col_not_null`, `has_function`, `has_index`) state what must exist, so a dropped constraint fails a test. Coverage is a signal, not a target (P7).

**Mutation:** there is no standard mutation tool for SQL that I could verify. The manual form of the [mutation testing runbook](../runbooks/mutation-testing.md) works: weaken a constraint (drop a `CHECK`, remove `NOT NULL`, change `<=` to `<`) in a scratch copy and see which test fails. The assertions on this page that expect an error (`throws_ok` on 23514 and 23505) fail if the constraint is removed.

**Property-based:** there is no generator-and-shrink tool for pgTAP that I could verify. What exists is plain SQL. `generate_series` builds a range of inputs and `is_empty` asserts that no input breaks the property, so it is an exhaustive check over a range, not random generation:

```sql
SELECT is_empty($$
    SELECT d FROM generate_series(-3650, 3650) AS d
    WHERE is_expired(timestamptz '2026-01-01' + d * interval '1 day', timestamptz '2026-01-01') <> (d <= 0)
$$, 'expired exactly when the date is on or before the as-of date');
```

This ran and passed. If a counterexample exists, `is_empty` fails and prints the rows. Constraints themselves are a property check that runs on every write: a `CHECK` that rejects a bad row is stronger than any single test, and the test of it is a `throws_ok` for a few boundary values. The [property-based runbook](../runbooks/property-based.md) covers choosing properties.

## Integration and data: factories, databases, rollbacks

Rollback is the default isolation. Open a transaction, do the work, assert, roll back, as every example above does. DDL is transactional in PostgreSQL, so a migration can be applied and checked inside a test and undone.

**Factories.** A seed function builds a row with defaults and takes the one value the test cares about:

```sql
CREATE FUNCTION make_account(p_email text DEFAULT 'ada@example.com', p_balance bigint DEFAULT 0)
RETURNS bigint LANGUAGE sql AS $$
    INSERT INTO accounts (email, balance_cents, expires_at)
    VALUES (p_email, p_balance, '2030-01-01T00:00:00Z') RETURNING id
$$;
```

This factory ran. Define it in a test-only schema or inside the test file. Pass the value that matters (`make_account(p_balance => 500)`) and leave the rest to the defaults. The test body then shows what the assertion depends on (P4).

**Migration tests.** For each migration test up, down and up again, with rows in the table so data is preserved:

```sql
BEGIN;
SELECT plan(4);

CREATE TABLE users (id int PRIMARY KEY, name text NOT NULL);
INSERT INTO users VALUES (1, 'Ada'), (2, 'Bob');

ALTER TABLE users RENAME COLUMN name TO display_name;
SELECT results_eq('SELECT display_name FROM users ORDER BY id',
                  ARRAY['Ada', 'Bob'], 'up keeps the existing rows');

ALTER TABLE users RENAME COLUMN display_name TO name;
SELECT results_eq('SELECT name FROM users ORDER BY id',
                  ARRAY['Ada', 'Bob'], 'down restores the old column with the same data');
SELECT hasnt_column('users', 'display_name', 'down removed the new column');

ALTER TABLE users RENAME COLUMN name TO display_name;
SELECT has_column('users', 'display_name', 'up works again after down');

SELECT * FROM finish();
ROLLBACK;
```

This ran and passed. In a real suite the `ALTER` lines are your migration's up and down scripts, run with `\i` or from a function, and the starting table comes from the previous migration. The second `up` is what catches a down that leaves something behind. A migration that rewrites data (splitting a column, backfilling) gets seed rows that cover each branch of the rewrite and an assertion on every row, not only the count. To compare the migrated schema with the model, dump both with `pg_dump --schema-only` and diff them, or use pgTAP's `has_*` and `col_*` assertions for the columns that matter. I did not run a schema diff on this page.

Run the migration tests against a database built from the real migration files, not a hand-built copy. The [integration runbook](../runbooks/integration.md) has the steps. Application code that talks to the database is usually tested through its own language's page with a database fixture; this page covers the SQL objects themselves.

## Anti-patterns

The shared list is in [code smells](../code-smells.md). The ones that show up most in SQL suites:

- A test that depends on `now()`, on an identity value, or on the order of an unordered query ([shared mutable state](../code-smells.md#shared-mutable-state), [tests that cannot fail](../code-smells.md#tests-that-cannot-fail) when it passes by luck).
- Omitting `plan(n)` or `finish()`, so a test that never ran looks like a pass.
- Asserting that a statement fails without naming the SQLSTATE, so any error passes.
- Testing against a hand-built schema instead of the one the migrations produce, so the test and production drift ([stale doubles](../code-smells.md#stale-doubles)).
- Running tests against a shared or production database, or leaving a `COMMIT` in a test file.
- Comparing an expected value computed with the same SQL as the code under test ([logic in tests](../code-smells.md#logic-in-tests)).
- Big seed scripts that load everything for every file ([over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup)).
- Asserting the text of a query plan for a query that is not a performance requirement ([change-detector tests](../code-smells.md#change-detector-tests)).
- Many unrelated assertions in one file with generic descriptions ([assertion roulette](../code-smells.md#assertion-roulette)). Give each a description that names the behavior.
- `todo()` or `skip()` with no reason, owner or date.

### Quarantining a flaky test

The [quarantine runbook](../flakes/quarantine.md) decides whether to quarantine and which mechanism to use. pgTAP has both mechanisms. `skip(why, n)` replaces the next `n` assertions with a SKIP result and does not run them. `todo(why, n)` runs the next `n` assertions normally and tells the harness to treat their failure as expected, and report an unexpected success if they pass. That makes `todo` the expected-failure form: the test keeps running and reporting, which is the runbook's "separate non-gating run" in one marker.

```sql
SELECT todo('flaky: depends on refund rounding, tracked in ORDERS-412, owner ada, review 2026-12-01', 1);
SELECT is(2 + 2, 5, 'known failing');

SELECT CASE WHEN current_setting('server_version_num')::int >= 180000
    THEN skip('only meaningful before 18', 1)
    ELSE ok(true, 'old-server check') END;
```

Run through `psql`, the first assertion printed `not ok 2 - known failing # TODO ORDERS-412...` followed by the failure diagnostics, and the second printed `ok 3 # SKIP only meaningful before 18`. Whether a `# TODO` failure counts as a pass for the exit code is `pg_prove`'s TAP harness behavior, which I did not run. Check it before you rely on it in CI.

- Use `todo` for a test of a known bug or a flake you still want data on; it reports when it starts passing.
- Use `skip` for a test that cannot run in this environment, or for a flaky test you are deleting or fixing. It stops reporting.
- A flaky pgTAP test is usually a missing `ORDER BY`, a dependence on `now()` or on identity values, or a lock wait between parallel files. Look there before quarantining.
- Put owner, date and the tracking link in the reason string so a search finds them.

## Further reading

- There is no ECC SQL testing skill. The nearest is [ECC tdd-workflow](https://github.com/affaan-m/ECC/blob/main/skills/tdd-workflow/SKILL.md), a general test-first workflow (MIT, Copyright Affaan Mustafa). Nothing on this page is copied from it. The ECC database-reviewer is a query and schema reviewer, not a testing skill, so it is not linked here.
- [pgTAP](https://pgtap.org/) and its [documentation](https://pgtap.org/documentation.html), including [pg_prove](https://pgtap.org/pg_prove.html)
- [pgTAP on GitHub](https://github.com/theory/pgtap) and [TAP::Parser::SourceHandler::pgTAP on MetaCPAN](https://metacpan.org/pod/TAP::Parser::SourceHandler::pgTAP)
- [PostgreSQL: CREATE DATABASE and template databases](https://www.postgresql.org/docs/current/manage-ag-templatedbs.html) and [transactions and DDL](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [PostgreSQL: sequences are not rolled back](https://www.postgresql.org/docs/current/functions-sequence.html)

The exact-call rule and the test body order are this skill's house style. The rest is paraphrased from the documentation linked above and checked on 2026-11-13, with the examples run on PostgreSQL 18.6 and pgTAP 1.3.4 loaded from its generated SQL file.
