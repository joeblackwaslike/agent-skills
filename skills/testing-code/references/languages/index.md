# Language pages

Tool mechanics for each language: how to run tests, build doubles, parametrize, control time and the network, and measure whether the tests are any good. Standards live in [testing-principles](../../../testing-principles/SKILL.md); procedures live in the runbooks. Open the page for the language you are writing in.

Every page has the same thirteen sections in the same order, so you can jump to the same heading on any of them:

1. Toolchain and verified versions
2. Layout and naming
3. Fixtures, setup, teardown
4. Doubles: stub, mock, autospec equivalent, fake
5. Parametrization
6. Determinism: time, randomness, network, ordering
7. Isolation and cleanup
8. Async
9. Performance
10. Coverage, mutation and property-based tools
11. Integration and data: factories, databases, rollbacks
12. Anti-patterns
13. Further reading

## Quick map

| Language | Toolchain | Runner | Double library | Property tool | Mutation tool | Page |
|---|---|---|---|---|---|---|
| Python | uv, pytest | pytest | pytest-mock (`mocker`), `unittest.mock.create_autospec`, `pretend.stub` | hypothesis | mutmut | [python.md](python.md) |
| TypeScript | pnpm for dependencies and Bun for app code by default, unless the project already uses another toolchain; run vitest and MSW on Node (see the page) | vitest 5 (jest differences noted) | vitest `vi` mocks with `satisfies`-typed objects, MSW for HTTP | fast-check | Stryker (config read from docs, not run) | [typescript.md](typescript.md) |
| Rust | cargo | cargo test, cargo-nextest | mockall, rstest for cases | proptest | cargo-mutants (exists, version checked, not run) | [rust.md](rust.md) |
| shell | bash, shellcheck | bats-core 1.14 with bats-support, bats-assert, bats-file | commands stubbed through `PATH` with a call-recording stub | none standard | none standard (manual mutation only) | [shell.md](shell.md) |
| SQL | PostgreSQL | pgTAP 1.3.4, run with `pg_prove` | rollback isolation; a stub function in a `stubs` schema for the clock | none standard (`generate_series` with `is_empty` for range checks) | none standard (manual mutation only) | [sql.md](sql.md) |

The tool names come from the design for this skill. Each page checks its own versions and records them under "Toolchain and verified versions"; take versions from the page, not from memory.

The tool names above were corrected against verification on 2026-11-13. Unverified on the shell and SQL pages, and labeled as such there: kcov coverage for shell, `pg_prove` itself (not installed on the checking machine), `bats --jobs` (GNU parallel was absent), and template-database cloning.

## Choosing a page

- Writing or reviewing Python tests: [python.md](python.md).
- TypeScript or JavaScript tests: [typescript.md](typescript.md).
- Rust tests: [rust.md](rust.md).
- Bash scripts: [shell.md](shell.md).
- PostgreSQL schema, function and migration tests: [sql.md](sql.md).
- The page for your language is missing: use the nearest runbook for the kind of test and the principles, and say in your answer that the language page was not available.
- Several languages in one change: read each page for the code it touches. Shared standards do not change between them.
