# Singleton

## What it is and Problem it solves

A singleton is one shared instance that the whole program uses: a settings object, a connection pool, a registry. The textbook version is a class that blocks a second instantiation and exposes a static `get_instance()`. In Python and TypeScript you almost never write that class, because a module-level object already gives you exactly one instance per process.

## Do you need this?

Start with a module-level object. A module is executed once and cached, so `settings = load_settings()` at module scope in Python, or `export const settings = ...` in TypeScript, is the singleton. Callers import it.

The better default is one step further: create the instance once at the composition root and pass it to whoever needs it (see [Dependency Injection](dependency-injection.md)). Then the instance is shared in production and replaceable in tests.

The signal that a global instance is hurting you is a test that has to reset it, a test order that changes results, or an import that opens a connection. Do not write a `Singleton` base class, a metaclass, or a `__new__` override to prevent a second instance. Nobody was going to create one.

## Python

```python
import os
from collections.abc import Mapping
from dataclasses import dataclass


class SettingsError(ValueError):
    pass


@dataclass(frozen=True)
class Settings:
    currency: str
    max_charge_cents: int


def load_settings(env: Mapping[str, str]) -> Settings:
    raw = env.get("MAX_CHARGE_CENTS", "100000")
    if not (raw.isascii() and raw.isdigit()):
        raise SettingsError(f"MAX_CHARGE_CENTS must be a non-negative integer, got {raw!r}")
    return Settings(currency=env.get("CURRENCY", "USD"), max_charge_cents=int(raw))


settings = load_settings(os.environ)


def can_charge(amount_cents: int, settings: Settings) -> bool:
    return 0 < amount_cents <= settings.max_charge_cents


test_settings = load_settings({"MAX_CHARGE_CENTS": "500"})
assert can_charge(500, test_settings)
assert not can_charge(501, test_settings)
assert can_charge(501, load_settings({}))
for bad in ("", "abc", "-1", "1_000"):
    try:
        load_settings({"MAX_CHARGE_CENTS": bad})
    except SettingsError as err:
        assert "MAX_CHARGE_CENTS" in str(err)
    else:
        raise AssertionError(f"{bad!r} must be rejected")
```

`settings` is the singleton: one object, created when the module is first imported. `can_charge` takes it as a parameter and never imports it, so the entry point passes `settings` down and tests pass their own. A missing variable gets a documented default, since the cap has a safe one. A present but malformed value raises an error that names the variable, so a typo cannot silently refuse every charge. Secrets with no safe default should fail on a missing key instead, as in [Dependency Injection](dependency-injection.md).

When creation is expensive or unsafe at import time (opening a pool, reading a file), build it on first use:

```python
import os
from dataclasses import dataclass
from functools import cache


@dataclass(frozen=True)
class Pool:
    url: str


@cache
def get_pool() -> Pool:
    return Pool(os.environ.get("DATABASE_URL", "postgres://localhost/orders"))


assert get_pool() is get_pool()
```

`functools.cache` keeps the first result for the life of the process. Tests that need a fresh one call `get_pool.cache_clear()`, or better, receive the pool as a parameter.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Settings = { readonly currency: string; readonly maxChargeCents: number };

export function loadSettings(env: Record<string, string | undefined>): Settings {
  const raw = env["MAX_CHARGE_CENTS"] ?? "100000";
  const cents = Number(raw);
  if (!/^\d+$/.test(raw) || !Number.isSafeInteger(cents)) {
    throw new Error(`MAX_CHARGE_CENTS must be a non-negative integer, got "${raw}"`);
  }
  return { currency: env["CURRENCY"] ?? "USD", maxChargeCents: cents };
}

export const settings = loadSettings(process.env);

export function canCharge(amountCents: number, settings: Settings): boolean {
  return amountCents > 0 && amountCents <= settings.maxChargeCents;
}

const testSettings = loadSettings({ MAX_CHARGE_CENTS: "500" });
assert.ok(canCharge(500, testSettings));
assert.ok(!canCharge(501, testSettings));
assert.ok(canCharge(501, loadSettings({})));
for (const bad of ["", "abc", "-1", "1.5"]) {
  assert.throws(() => loadSettings({ MAX_CHARGE_CENTS: bad }), /MAX_CHARGE_CENTS/);
}
```

An ES module is evaluated once and its exports are shared, so `export const` is the singleton. For a value that is expensive or unsafe to build at import, use a lazy getter:

```typescript
import assert from "node:assert/strict";

type Pool = { readonly url: string };

let pool: Pool | undefined;
export function getPool(): Pool {
  return (pool ??= { url: process.env["DATABASE_URL"] ?? "postgres://localhost/orders" });
}

assert.equal(getPool(), getPool());
```

## In production

- Python's `logging.getLogger(name)` returns the same logger object for the same name each time, so modules share loggers without a singleton class.
- Database engines and HTTP client sessions are created once per process, then shared. The shared part is the pool; each request still gets its own connection or session.
- In `functools.cache`, a call from two threads at once can run the wrapped function more than once before the first result lands, so a lazy singleton with side effects needs its own lock or should be created at startup.

## Smells and misuse

- A `Singleton` metaclass, decorator, or `__new__` trick. A module-level object does the same job with less to read.
- Mutable global state that many modules write to. Reads of immutable settings are fine; shared mutable state is where bugs come from.
- Business code that imports `settings` or calls `get_pool()` itself, so the function cannot be tested with other values.
- Slow or failing work at import time, such as opening a connection or calling a remote service. Parsing validated env vars is fine.
- A test suite with a "reset the singleton" fixture in every file. That is the injection point you skipped.

## Related

- [Dependency Injection](dependency-injection.md) is the replacement: build once at the root, pass it in.
- [Factory](factory.md) builds the instance that the root then shares.
- [Decorator](../structural/decorator.md) is how `functools.cache` is applied, as a wrapper around one function.
