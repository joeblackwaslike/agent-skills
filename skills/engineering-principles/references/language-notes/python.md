# Python

## Tooling and settings

- **Ruff** for linting and formatting, configured in `pyproject.toml`. Enable rule sets deliberately (`E`, `F`, `B`, `UP`, `SIM`, `PERF`, `C4`, `PTH`, `PL`, `ANN`, and so on) and justify each ignore. Leave `PLR2004` (magic values) off or loose.
- **mypy `--strict`** (or Pyright in strict mode) in CI. Each `# type: ignore[code]` names its error code and has a reason.
- **pytest** with `pytest-asyncio` for async code, branch coverage, and a real database in integration tests.
- **pre-commit** runs the same checks locally that CI runs.
- **Python version** pinned in `pyproject.toml` (`requires-python`) and in `.python-version`, and the same in CI and the container image.

## Packages and environments: pip, uv and PyPI

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

## Idioms

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

## Python-specific smells

- **Mutable defaults and shared class attributes.** `def f(x=[])` and `class C: items = []` share one object across calls or instances.
- **Late-binding closures.** Lambdas created in a loop all see the loop variable's last value.
- **Naive datetimes.** `datetime.now()` without a time zone, and `datetime.utcnow()`, which returns a naive value and is deprecated since Python 3.12. Use `datetime.now(UTC)`.
- **Import-time work and hidden cycles.** Connections opened at import, and imports moved into functions or under `TYPE_CHECKING` only to dodge a circular import.
- **`assert` for validation.** Stripped under `python -O`.
- **Catching `BaseException`** or a bare `except:`, which also swallows `KeyboardInterrupt` and `SystemExit`.
- **`is` with literals.** `x is 1` or `s is "a"` compares identity, not value.
- **Blocking calls in `async def`.** `requests`, `time.sleep`, or a sync database driver inside a coroutine stalls the event loop.
- **`print` for diagnostics** in library or service code instead of logging.

