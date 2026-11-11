# Language Notes

The principles apply to any language. These files hold what differs between Python, TypeScript, Rust, shell (Bash and zsh) and SQL: the toolchain that enforces the mechanical rules, how packages are managed, how the principles show up in each language, and the idioms and smells specific to it. Write to the principles first, then check the file for your language.

Open the file for the language you are writing:

- [python.md](python.md)
- [typescript.md](typescript.md)
- [rust.md](rust.md)
- [shell.md](shell.md)
- [sql.md](sql.md)

## Quick map

| Concern | Python | TypeScript | Rust | Shell (Bash, zsh) | SQL |
| --- | --- | --- | --- | --- | --- |
| Formatter | `ruff format` | Prettier or Biome | `rustfmt` | `shfmt` | SQLFluff, or the project's formatter |
| Linter | Ruff | ESLint with typescript-eslint, or Biome | Clippy, configured in `[lints]` | ShellCheck (not zsh) | SQLFluff; Squawk for PostgreSQL migrations |
| Type checker | mypy `--strict` or Pyright | `tsc` with `strict` | The compiler, including the borrow checker | None | The database itself, via tests against a real instance |
| Tests | pytest, pytest-asyncio | Vitest or Jest; Playwright end to end | `cargo test`, nextest (plus `cargo test --doc`) | Bats | Tests against a real database (containers) |
| Packages and lockfile | uv with `uv.lock`, or pip with hashed requirements | npm, pnpm or Bun, with their lockfile | Cargo with `Cargo.lock`, built with `--locked` | None; pin the tools the script calls | Migration tool's revision history |
| Parse at the boundary | Pydantic | zod or Valibot | serde into newtypes via `TryFrom` | Validate arguments first, `getopts` | Constraints and types on the table |
| Consumer-owned interface | `Protocol` | `interface` or `type` (structural by default) | A trait defined where it's used | n/a | Views or functions as a stable interface |
| Closed set | `StrEnum`, `Literal` | String literal union, `as const` | `enum` | `case` | Enum type, `CHECK`, or lookup table |
| Exhaustive handling | `match` with `assert_never` | `switch` with a `never` check | `match` with no `_` arm | `case` with a `*)` error branch | n/a |
| Value object | Frozen `dataclass` | `Readonly<...>` type | Struct with private fields | n/a | Composite type or grouped columns |
| Distinct ids | `NewType` | Branded type | Newtype struct | n/a | Separate key types per table |
| Concurrency | `asyncio`, `TaskGroup` | Promises, `Promise.all`, `AbortSignal` | Tokio, `std::thread`, rayon | Background jobs and `wait` | Transactions and locks |
| Structured logging | structlog | pino | tracing | Messages to stderr | n/a |
