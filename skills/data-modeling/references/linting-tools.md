# Linting a model with tools

The checklist in `model-review-checklist.md` is the default way to lint a model, and it needs nothing installed. Use the tools below when a scratch database is easy to get and the schema is large enough that reading it misses things. Nothing here is required to finish a design. The tool facts below were checked against each project's docs on 2026-11-13, so confirm current versions and licensing before relying on them.

## Two kinds of linter

A schema linter reads the model. A migration linter reads the statement you are about to run. At design time only the first kind applies. Migration linters belong in the plan and in CI, once the SQL exists.

## Check that the DBML parses

`dbml-tools check schema.dbml` reports parse and semantic errors in a DBML file. It checks that the file is valid DBML. It does not judge design quality. The tool is a small third-party project at version 0.9.x written in Go, so treat it as a convenience. Source: [dbml-tools](https://github.com/mevdschee/dbml-tools).

The official CLI converts DBML to SQL. A file that fails to convert has a problem to fix. See `dbml-cli.md` for the commands.

## Lint design quality

The pipeline is DBML to SQL to a scratch database to a schema linter.

1. Convert the DBML to SQL with the official CLI, `dbml2sql schema.dbml --postgres -o schema.sql`. It ships in `@dbml/cli` and needs Node 18 or newer. Pass the dialect flag that matches the scratch database. `dbml-cli.md` lists the flags.
2. Load the SQL into a throwaway database. An in-memory or container database is enough.
3. Run [SchemaCrawler Lint](https://www.schemacrawler.com/lint.html) against it. It works across databases through JDBC, so it needs a Java runtime.

SchemaCrawler's linters that matter for a new model:

- Tables with no primary key, no indexes, or a single column
- Foreign keys with no index, or whose type differs from the referenced key
- Nullable columns inside a unique index
- Redundant indexes
- Tables where every non-key column is nullable
- Incrementing column names such as `contact1` and `contact2`, a sign of denormalization
- Cycles between tables
- Columns with the same name but different types in different tables

Atlas also has `schema lint` with custom rules, but its docs say the rules language is Pro-only. Source: [Atlas schema policy](https://atlasgo.io/lint/rules).

## Later, when the SQL exists

Run a migration linter in CI. Pick one that supports the database and migration tool named in `joe-stack-preferences`, and check its current rule coverage and licensing before adopting it.
