# Part 3: Language Notes

> Snapshot of [Code-Review-Guide-and-Playbooks.md](https://github.com/joeblackwaslike/ai-review-bot/blob/main/docs/Code-Review-Guide-and-Playbooks.md) in ai-review-bot, copied verbatim on 2026-11-07 (last source commit 6ea9ab3). Edit the source, not this copy.


The guide and the playbooks apply to any language. This part holds what differs between Python, TypeScript, shell (Bash and zsh) and SQL: the toolchain that enforces the mechanical rules, how packages are managed, how the principles show up in each language, and the idioms and smells specific to it. Review a diff against the guide first, then against the section for its language.

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

## Python

### Tooling and settings

- **Ruff** for linting and formatting, configured in `pyproject.toml`. Enable rule sets deliberately (`E`, `F`, `B`, `UP`, `SIM`, `PERF`, `C4`, `PTH`, `PL`, `ANN`, and so on) and justify each ignore. Leave `PLR2004` (magic values) off or loose.
- **mypy `--strict`** (or Pyright in strict mode) in CI. Each `# type: ignore[code]` names its error code and has a reason.
- **pytest** with `pytest-asyncio` for async code, branch coverage, and a real database in integration tests.
- **pre-commit** runs the same checks locally that CI runs.
- **Python version** pinned in `pyproject.toml` (`requires-python`) and in `.python-version`, and the same in CI and the container image.

### Packages and environments: pip, uv and PyPI

- **PyPI** is the public package index. Anyone can publish to it, so a package name is not a guarantee of who wrote it.
- **`pyproject.toml`** declares the project's dependencies with version ranges. A **lockfile** pins the exact versions of everything, including transitive dependencies, so every install is identical. Applications commit a lockfile; libraries declare ranges and let applications lock.
- **uv** manages Python versions, virtual environments, dependencies and the lockfile (`uv.lock`) in one tool. `uv add` and `uv remove` edit `pyproject.toml` and the lock together; `uv sync --locked` installs from the lockfile and fails if it is out of date, while `uv sync --frozen` uses the existing lockfile without checking whether it is up to date; `uv run` runs a command in the project environment. Dependency groups keep dev, test and docs tools out of production installs.
- **pip** installs packages into the active environment. It doesn't manage a lockfile on its own; projects using pip pin with a fully resolved `requirements.txt` (from `pip-tools` or `uv pip compile`), ideally with hashes and `--require-hashes`.
- **Virtual environments** isolate each project's packages. Nothing is installed into the system Python, and `.venv` is never committed.
- **Wheels and sdists.** A wheel is a prebuilt package and installs without running code. A source distribution runs its build backend during install, which is arbitrary code on your machine.

In review:

- A change to `pyproject.toml` comes with the matching `uv.lock` change, and the lock diff contains only what the change implies. Unexpected upgrades of unrelated packages are worth a question.
- New packages go in the right group: test and lint tools aren't runtime dependencies.
- Version ranges are sensible: no unbounded `*`, no exact pins in a library's `pyproject.toml`.
- CI and Dockerfiles install from the lock (`uv sync --locked`), never with a fresh resolve.
- New dependencies get the dependencies playbook.

### Idioms

Idioms reduce astonishment because they are what a Python reader expects to see. Python usually offers several ways to do any one thing; some are idiomatic and some are transliterated from another language. Flag code that works but fights the language:

| Non-idiomatic | Idiomatic | Why it matters |
| --- | --- | --- |
| `for i in range(len(xs)): use(xs[i])` | `for x in xs:`, with `enumerate` or `zip` when you need an index or a pairing | Removes index errors and says what is iterated |
| `if x == None`, `if flag == True` | `if x is None`, `if flag` | `is` for singletons; truthiness states the intent |
| `if len(xs) == 0` | `if not xs` | Use `is None` instead when `None` and empty mean different things |
| `f = open(p)` ... `f.close()` | `with open(p) as f:` or `Path(p).read_text()` | Released on every path |
| `s += piece` in a loop | `"".join(pieces)` | Avoids quadratic copying |
| `if k in d: v = d[k]` `else: v = default` | `d.get(k, default)`, `defaultdict`, `Counter` | One lookup, no branch |
| `def f(items=[])` | `items: list[X] \| None = None`, or `field(default_factory=list)` | A mutable default is shared across calls |
| `os.path.join(a, b)` | `Path(a) / b` | Paths as objects |
| `get_name()` and `set_name()` | A plain attribute; `@property` only to compute or validate | Java-style accessors add noise without protection |
| A class of only `@staticmethod`s, or a hand-built singleton | A module of functions | Modules are already singletons |
| A tuple used as a record (`row[3]`) | `NamedTuple`, `dataclass`, `TypedDict` | Named fields are checkable |
| Hand-written `__init__`, `__repr__`, `__eq__` | `@dataclass` | Less code, fewer inconsistencies |
| `except Exception: pass` | The specific error, or `contextlib.suppress(FileNotFoundError)` when ignoring is intended | States what is ignored |
| `"%s" % x`, `"{}".format(x)` | f-strings | Except in log calls: pass fields so formatting is deferred |

Idioms can be overdone. A comprehension stops being idiomatic once it needs a second `for` and an `if` to read, and a plain loop is clearer.

When several idioms are acceptable, the one chosen should reflect how the behavior is meant to be used. A construct picked against its intent tells the reader something false:

| Choice | Use it when | The wrong pick signals |
| --- | --- | --- |
| `tuple`, `list`, `set` | A tuple is a fixed-shape record or immutable sequence; a list grows and holds one kind of thing; a set is for membership and uniqueness | A list used for membership tests, or a tuple rebuilt to "modify" it |
| `NamedTuple`, frozen `dataclass`, `TypedDict`, Pydantic model | Light immutable record; value object with behavior; dict-shaped JSON payload; parsing untrusted input | Pydantic for internal data that is already valid, or a `dict` for a stable shape |
| `@property` vs. method | A property is cheap and side-effect free; a method does work, I/O, or can fail | A property that queries the database |
| `@classmethod`, `@staticmethod`, module function | A classmethod is an alternate constructor; a module function covers almost every staticmethod | Staticmethods used as a namespace |
| Generator vs. list | A generator for large or streamed data consumed once; a list for `len`, indexing or several passes | A list built only to iterate once, or a generator consumed twice |
| `Enum` vs. `Literal` | `Enum` for a closed set with identity or behavior; `Literal` for a few strings at an API boundary | String constants compared with `==` |
| `Protocol` vs. ABC | A `Protocol` for a consumer-owned contract; an ABC for shared implementation or instantiation checks | An ABC with no shared code |
| Check first vs. `try`/`except` | `try` when the check is racy or duplicates the work; an explicit check when it is cheap and the miss is normal | `os.path.exists` followed by `open` |

### Python-specific smells

- **Mutable defaults and shared class attributes.** `def f(x=[])` and `class C: items = []` share one object across calls or instances.
- **Late-binding closures.** Lambdas created in a loop all see the loop variable's last value.
- **Naive datetimes.** `datetime.now()` without a time zone, and `datetime.utcnow()`, which returns a naive value and is deprecated since Python 3.12. Use `datetime.now(UTC)`.
- **Import-time work and hidden cycles.** Connections opened at import, and imports moved into functions or under `TYPE_CHECKING` only to dodge a circular import.
- **`assert` for validation.** Stripped under `python -O`.
- **Catching `BaseException`** or a bare `except:`, which also swallows `KeyboardInterrupt` and `SystemExit`.
- **`is` with literals.** `x is 1` or `s is "a"` compares identity, not value.
- **Blocking calls in `async def`.** `requests`, `time.sleep`, or a sync database driver inside a coroutine stalls the event loop.
- **`print` for diagnostics** in library or service code instead of logging.

## TypeScript and JavaScript

### Tooling and settings

- **`tsconfig.json` in strict mode.** `"strict": true` at minimum. `noUncheckedIndexedAccess` (indexing returns `T | undefined`), `exactOptionalPropertyTypes`, `noImplicitOverride` and `noFallthroughCasesInSwitch` catch more. Loosening any of these in a PR needs a reason.
- **ESLint with typescript-eslint's type-checked configs** (`recommended-type-checked` or `strict-type-checked`), or Biome. The rules that matter most in review: `no-floating-promises`, `no-misused-promises`, `no-explicit-any`, `switch-exhaustiveness-check`, `no-unnecessary-condition` and `consistent-type-imports`. React projects add `eslint-plugin-react-hooks` and `eslint-plugin-jsx-a11y`.
- **Prettier or Biome** for formatting, so style never reaches review.
- **Vitest or Jest** for unit and integration tests, React Testing Library for components, Playwright for end to end.
- **Node version** pinned (`.nvmrc` or `.node-version`, and `engines` in `package.json`), matching CI and the container image.

### Packages: npm, pnpm and Bun

- **The npm registry** is the public package index for JavaScript and TypeScript, used by all three tools. As with PyPI, anyone can publish, and package names can be typosquatted.
- **`package.json`** lists `dependencies` (shipped with the app), `devDependencies` (build, test and lint only) and sometimes `peerDependencies` (a library expects the host app to provide them, such as `react`). Version ranges use semver: `^1.2.3` allows minor and patch updates, `~1.2.3` patch only.
- **The lockfile** pins every installed version, transitive ones included: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `bun.lock` (Bun; older projects have the binary `bun.lockb`). Exactly one package manager and one lockfile per project; a PR that adds a second lockfile is a finding. The `packageManager` field in `package.json` records which tool and version the project uses.
- **npm** is bundled with Node and installs a flat `node_modules`. `npm ci` installs exactly what the lockfile says and fails if it doesn't match `package.json`.
- **pnpm** stores packages once in a content-addressed store and links them into each project. Its strict `node_modules` layout means code can only import what it declares, which surfaces missing dependencies early. Workspaces (`pnpm-workspace.yaml`) handle monorepos; `pnpm install --frozen-lockfile` is the CI install.
- **Bun** is a runtime and toolkit with a fast npm-compatible package manager. `bun install --frozen-lockfile` is the CI install. Check that the code actually runs on the runtime it will be deployed on: Node and Bun differ in places.
- **Install scripts.** Packages can run `preinstall` and `postinstall` scripts, which is arbitrary code on install. npm runs dependencies' scripts by default. pnpm (version 10 and later) doesn't run them unless the package is allowed: `onlyBuiltDependencies`, or `allowBuilds` in `pnpm-workspace.yaml` on newer versions (pnpm 11 uses it). Bun runs them only for trusted packages, but when a project sets no `trustedDependencies` it trusts a built-in default list of popular packages, so adding one of those can bring install-time code with no config change. Use `--ignore-scripts` (npm, pnpm, Bun) for an install that must not run any. A PR that allows a new package to run install scripts gets a closer look.
- **`package.json` scripts** (`build`, `test`, `lint`, `dev`) are the project's task runner; new scripts are reviewed like shell scripts.

In review:

- A `package.json` change comes with the matching lockfile change, made by the project's package manager, and the lock diff contains only what the change implies.
- New packages are in the right section: build and test tools in `devDependencies`, never shipped to production.
- CI and Dockerfiles install from the lockfile (`npm ci`, `pnpm install --frozen-lockfile`, `bun install --frozen-lockfile`).
- In monorepos, internal packages use the workspace protocol (`workspace:*`) and versions of shared dependencies don't diverge between packages without a reason.
- New dependencies get the dependencies playbook.

### How the principles show up

- **Parse, don't validate.** Data from outside (request bodies, `JSON.parse`, `fetch` responses, `process.env`, `localStorage`) is typed `unknown` until a schema parses it (`UserSchema.parse(data)`, with the type from `z.infer`). `JSON.parse(text) as User` is a finding: the cast is a promise the compiler can't check.
- **Make illegal states unrepresentable.** Discriminated unions instead of a bag of optional fields and booleans; an exhaustive `switch` whose `default` assigns to `never`, so adding a variant breaks the build until it's handled.
- **Explicit over implicit.** No `any`; use `unknown` and narrow. No non-null assertions (`value!`) to silence the compiler. `// @ts-expect-error` with a reason instead of `// @ts-ignore`, so it fails when the error goes away.
- **Fail fast.** No floating promises: every promise is awaited, returned, or explicitly handled. Errors in `catch` are `unknown` and narrowed before use; wrapped errors keep the original (`new Error(msg, { cause: err })`). No empty `catch` blocks.
- **Consumer-owned interfaces.** TypeScript is structural: any object with the right shape satisfies an interface, with or without `implements`. Declare the interface where it's used, narrow to what that code needs.
- **Encapsulation.** `private` is compile-time only; `#private` fields are private at runtime. `readonly`, `ReadonlyArray` and `as const` stop accidental mutation.
- **Distinct ids.** Branded types (`type UserId = string & { readonly __brand: "UserId" }`) keep a `UserId` from being passed where an `OrderId` is expected.
- **Composition over inheritance.** Same as anywhere: functions and modules first, small classes when there's state with invariants, deep class hierarchies rarely.

### Idioms

| Non-idiomatic | Idiomatic | Why it matters |
| --- | --- | --- |
| `any` | `unknown` and narrowing, or the precise type | `any` switches off checking for everything it touches |
| `JSON.parse(x) as User` | `UserSchema.parse(JSON.parse(x))` | The cast is unchecked; the schema checks at runtime |
| `enum Status { ... }` | `type Status = "active" \| "suspended"` or an `as const` object | Unions erase cleanly and need no runtime code |
| `obj!.field` | Narrow first, or handle `undefined` explicitly | `!` hides the bug it should report |
| `{ isLoading, isError, data? }` | `{ status: "loading" } \| { status: "error"; error } \| { status: "ok"; data }` | Contradictory states become impossible |
| `==` | `===` | No coercion surprises |
| `items.forEach(async (x) => ...)` | `for (const x of items) await ...`, or `await Promise.all(items.map(...))` | `forEach` doesn't wait; errors are lost |
| `for (const i in array)` | `for (const x of array)` or array methods | `for...in` iterates keys as strings, including inherited ones |
| `x as unknown as T` | Fix the types | A double cast is a type error being hidden |
| A class with only static methods | A module of functions | Modules are already namespaces |
| `new Promise` wrapping a function that already returns a promise | `await` it directly | Extra wrapper, lost errors |
| `process.env.API_KEY!` scattered through code | One module that parses `process.env` with a schema at startup | Missing configuration fails at boot, not mid-request |
| Barrel files re-exporting whole folders | Import from the module that defines the thing | Barrels slow builds, defeat tree-shaking and hide cycles |

### TypeScript-specific smells

- **Floating promises** and `async` callbacks passed where nothing awaits them (event handlers, `forEach`, `setTimeout`).
- **Types that lie.** Casts on external data, `as` to make an error go away, and generics that default to `any`.
- **Optional everything.** Props or types where every field is optional, so no caller is ever wrong and no consumer can rely on anything.
- **Duplicated types** for the same shape on the server and client, instead of one schema both sides import.
- **Mixing module systems.** CommonJS `require` and ESM `import` in the same package, or `"type"` in `package.json` that doesn't match the build output.
- **Mutating arguments** passed in by callers, including arrays sorted in place with `.sort()` (use `.toSorted()` where the runtime supports it, or copy first).
- **Dates handled by hand.** Timestamps stored as local-time strings, or month arithmetic on `Date`. Store instants as UTC ISO 8601 and use a date library for calendar math.

## Shell: Bash and zsh

Shell is the right tool for glue: running commands, moving files, short pipelines. KISS cuts both ways here. A ten-line script beats a Python program for the same job, but past roughly a hundred lines, or once a script needs data structures, JSON beyond `jq` one-liners, or careful error recovery, it should become Python or TypeScript. The shell scripts playbook is the review pass; this section is the reference.

### Tooling

- **ShellCheck** for Bash and POSIX sh. Each disabled check (`# shellcheck disable=SC2086`) has a reason next to it. ShellCheck doesn't support zsh.
- **shfmt** for consistent formatting of Bash and sh.
- **Bats** for tests of non-trivial scripts.
- **`bash -n` and `zsh -n`** parse a script without running it; useful in CI for zsh, which has no linter of ShellCheck's depth.

### Bash and zsh differences

The two look alike and behave differently in ways that bite. A script's shebang decides which rules apply, so review it against the right column.

| Behavior | Bash | zsh |
| --- | --- | --- |
| Unquoted `$var` | Split on whitespace and glob-expanded | Not split and not globbed by default (`SH_WORD_SPLIT` and `GLOB_SUBST` are off) |
| Array indexes | Start at 0 | Start at 1 by default |
| Glob with no matches | Passed through literally (unless `nullglob` or `failglob`) | Error: "no matches found" (`NOMATCH` is on) |
| `echo "a\nb"` | Prints the backslash literally | Interprets the escape |
| Strict mode | `set -euo pipefail` | `set -euo pipefail` works too; functions use `emulate -L zsh` to get predictable local options |
| Version on macOS | `/bin/bash` is 3.2, without many modern features; Homebrew bash is current | Current, and the default login shell |
| Linting | ShellCheck | No ShellCheck support; `zsh -n` and careful review |

Practical rules that hold in both: always quote expansions, use `printf` instead of `echo` for anything but fixed text, and don't write a script for one shell and run it with the other.

### Idioms

| Non-idiomatic | Idiomatic | Why it matters |
| --- | --- | --- |
| `$var`, `$@` unquoted | `"$var"`, `"$@"`, `"${arr[@]}"` | Spaces and globs in values break commands, sometimes destructively |
| `for f in $(ls *.txt)` | `for f in *.txt` (with `nullglob` in Bash) | Parsing `ls` breaks on spaces and newlines |
| `` `cmd` `` | `$(cmd)` | Nests and reads clearly |
| `[ $a == $b ]` | `[[ $a == "$b" ]]` in Bash and zsh | No word splitting inside `[[ ]]`, and fewer quoting traps |
| `echo "$data"` | `printf '%s\n' "$data"` | `echo` treats some values as options or escapes |
| `cat file \| grep x` | `grep x file` | One process, same result |
| `grep`, `sed` or `awk` over JSON | `jq` | JSON isn't line-oriented |
| `cd dir` then work | `cd dir \|\| exit 1`, or `( cd dir && ... )` | Otherwise the work runs in the wrong directory |
| Fixed temp paths (`/tmp/out.txt`) | `tmp=$(mktemp)` with `trap 'rm -f "$tmp"' EXIT` | No collisions, always cleaned up |
| `which cmd` | `command -v cmd` | Built in and reliable |
| `read line` | `IFS= read -r line` | Keeps backslashes and leading whitespace |
| `rm -rf $dir/` | `rm -rf -- "${dir:?}/"` | An empty variable no longer means `rm -rf /` |
| `local out=$(cmd)` | `local out` then `out=$(cmd)` | Combined, the exit status of `cmd` is lost |

### Shell-specific smells

- **No strict mode**, or strict mode trusted where it doesn't apply: `set -e` is ignored inside a function called from `if`, `&&` or `||`, and a pipeline without `pipefail` reports only its last command.
- **Secrets on the command line** (`curl -H "Authorization: Bearer $TOKEN"`), visible to anyone running `ps`. Pass them through files, stdin or environment variables.
- **`curl ... | sh`** without a checksum or signature check.
- **Assumed environment.** Scripts run by cron, launchd or CI get a minimal `PATH` and may not have `HOME` or your dotfiles; set what the script needs explicitly.
- **`sudo` inside a script** rather than documenting that the script needs root and failing clearly without it.
- **Long scripts without functions**, a `main`, or `--help`.

## SQL

SQL reaches review in migrations, `.sql` files, query builders and raw strings inside application code. The queries and indexes, data modeling and migrations playbooks cover the design; the SQL files playbook is the review pass; this section is the reference.

### Tooling

- **SQLFluff** lints and formats SQL for many dialects, so layout and casing never reach review.
- **Squawk** lints PostgreSQL migrations for operations that lock tables or break running code.
- **`EXPLAIN (ANALYZE, BUFFERS)`** on production-sized data is the review tool for performance. Read it for sequential scans on large tables, row estimates far from actual rows, and sorts or hashes spilling to disk.
- **Tests against a real database** (a container in CI), not mocks: a query is only verified when the database has run it.

### Idioms

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

### SQL-specific smells

- **Transactions left implicit** for multi-statement changes that must succeed or fail together.
- **Read-modify-write in two statements** where one atomic `UPDATE ... SET x = x + 1` or `INSERT ... ON CONFLICT` would do.
- **Hidden type casts** in comparisons (`varchar_col = 123`) that stop an index from being used.
- **Dialect-specific features** used without noting it, in code meant to run on more than one database.
- **Unbounded queries** with no `LIMIT` on tables that grow, in anything a user can trigger.
