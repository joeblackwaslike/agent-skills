# Language Notes

The principles apply to any language. This file holds what differs between Python, TypeScript, shell (Bash and zsh) and SQL: the toolchain that enforces the mechanical rules, how packages are managed, how the principles show up in each language, and the idioms and smells specific to it. Write to the principles first, then check the section for your language.

Open the file for the language you are writing:

- [python.md](python.md)
- [typescript.md](typescript.md)
- [shell.md](shell.md)
- [sql.md](sql.md)

## Quick map

| Concern | Python | TypeScript | Shell (Bash, zsh) | SQL |
| --- | --- | --- | --- | --- |
| Formatter | `ruff format` | Prettier or Biome | `shfmt` | SQLFluff, or the project's formatter |
| Linter | Ruff | ESLint with typescript-eslint, or Biome | ShellCheck (not zsh) | SQLFluff; Squawk for PostgreSQL migrations |
| Type checker | mypy `--strict` or Pyright | `tsc` with `strict` | None | The database itself, via tests against a real instance |
| Tests | pytest, pytest-asyncio | Vitest or Jest; Playwright end to end | Bats | Tests against a real database (containers) |
| Packages and lockfile | uv with `uv.lock`, or pip with hashed requirements | npm, pnpm or Bun, with their lockfile | None; pin the tools the script calls | Migration tool's revision history |
| Parse at the boundary | Pydantic | zod or Valibot | Validate arguments first, `getopts` | Constraints and types on the table |
| Consumer-owned interface | `Protocol` | `interface` or `type` (structural by default) | n/a | Views or functions as a stable interface |
| Closed set | `StrEnum`, `Literal` | String literal union, `as const` | `case` | Enum type, `CHECK`, or lookup table |
| Exhaustive handling | `match` with `assert_never` | `switch` with a `never` check | `case` with a `*)` error branch | n/a |
| Value object | Frozen `dataclass` | `Readonly<...>` type | n/a | Composite type or grouped columns |
| Distinct ids | `NewType` | Branded type | n/a | Separate key types per table |
| Concurrency | `asyncio`, `TaskGroup` | Promises, `Promise.all`, `AbortSignal` | Background jobs and `wait` | Transactions and locks |
| Structured logging | structlog | pino | Messages to stderr | n/a |
