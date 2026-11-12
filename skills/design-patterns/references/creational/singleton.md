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
from functools import cache


@dataclass(frozen=True)
class Settings:
    currency: str
    max_charge_cents: int


def load_settings(env: Mapping[str, str]) -> Settings:
    return Settings(
        currency=env.get("CURRENCY", "USD"),
        max_charge_cents=int(env.get("MAX_CHARGE_CENTS", "100000")),
    )


@cache
def get_settings() -> Settings:
    return load_settings(os.environ)


def can_charge(amount_cents: int, settings: Settings) -> bool:
    return 0 < amount_cents <= settings.max_charge_cents


assert get_settings() is get_settings()

test_settings = load_settings({"MAX_CHARGE_CENTS": "500"})
assert can_charge(500, test_settings)
assert not can_charge(501, test_settings)
assert can_charge(501, load_settings({}))
```

`get_settings` builds the object on first call, so importing the module does no work, and `functools.cache` returns the same one afterwards. `can_charge` takes the settings as a parameter and never calls `get_settings` itself. The entry point calls `get_settings()` once and passes the result down, so tests build their own `Settings` and need no reset. The cache keeps the value alive for the life of the process; if a test must rebuild it, `get_settings.cache_clear()` does that, but passing the value in avoids needing it.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Settings = { readonly currency: string; readonly maxChargeCents: number };

export function loadSettings(env: Record<string, string | undefined>): Settings {
  return {
    currency: env["CURRENCY"] ?? "USD",
    maxChargeCents: Number(env["MAX_CHARGE_CENTS"] ?? "100000"),
  };
}

let cached: Settings | undefined;
export function getSettings(): Settings {
  return (cached ??= loadSettings(process.env));
}

export function canCharge(amountCents: number, settings: Settings): boolean {
  return amountCents > 0 && amountCents <= settings.maxChargeCents;
}

assert.equal(getSettings(), getSettings());

const testSettings = loadSettings({ MAX_CHARGE_CENTS: "500" });
assert.ok(canCharge(500, testSettings));
assert.ok(!canCharge(501, testSettings));
assert.ok(canCharge(501, loadSettings({})));
```

A top-level `export const settings = loadSettings(process.env)` is simpler when loading is cheap and cannot fail. The lazy getter is for values that are expensive or that should not run at import time. In both cases `canCharge` receives its settings and stays testable.

## In production

- Python's `logging.getLogger(name)` returns the same logger object for the same name each time, so modules share loggers without a singleton class.
- Database engines and HTTP client sessions are created once per process, then shared. The shared part is the pool; each request still gets its own connection or session.
- An ES module is evaluated once per realm and its exports are shared, which is what makes `export const` work as a singleton.
- In `functools.cache`, a call from two threads at once can run the wrapped function more than once before the first result lands, so a lazy singleton with side effects needs its own lock or should be created at startup.

## Smells and misuse

- A `Singleton` metaclass, decorator, or `__new__` trick. A module-level object does the same job with less to read.
- Mutable global state that many modules write to. Reads of immutable settings are fine; shared mutable state is where bugs come from.
- Business code that calls `get_settings()` or `getDb()` directly, so the function cannot be tested with other values.
- Work at import time: opening a connection, reading env vars, calling a remote service. Import should be cheap and safe.
- A test suite with a "reset the singleton" fixture in every file. That is the injection point you skipped.

## Related

- [Dependency Injection](dependency-injection.md) is the replacement: build once at the root, pass it in.
- [Factory](factory.md) builds the instance that the root then shares.
- [Decorator](../structural/decorator.md) is how `functools.cache` is applied, as a wrapper around one function.
