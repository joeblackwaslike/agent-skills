# Result / Option

## What it is and Problem it solves

A Result is a return value that is either a success (`Ok`) or a failure (`Err`), so the type signature says the call can fail and the caller has to handle both. An Option is the same idea for absence: a value or nothing. Both replace "raise an exception" and "return null" where the failure or absence is an expected outcome that callers should not forget. Null Object, at the end, handles absence differently: return a do-nothing value so callers need no check.

## Do you need this?

Not for most code. Python exceptions and `T | None` already do this job, and a `try/except` around a database call is correct.

Use a Result for outcomes the business expects and the caller must branch on: a card declined, a coupon expired, a validation that failed. Use an exception for things that should not happen and that no caller can fix locally: the database is down, a bug, a timeout. The usual split is exceptions at the boundaries (I/O, parsing untrusted input) and Result in between, so the decision logic is a pure function returning a value and the edge converts a thrown error into a Result once.

The signal is a function whose callers keep forgetting a case, or a `try/except Exception` that catches too much because domain failures are exceptions too. For absence alone, `T | None` (or `T | undefined` under `strict`) is an Option, and the type checker already forces the check.

## Python

```python
from collections.abc import Callable
from dataclasses import dataclass
from typing import Literal


@dataclass(frozen=True)
class Ok[T]:
    value: T


@dataclass(frozen=True)
class Err[E]:
    error: E


type Result[T, E] = Ok[T] | Err[E]


type ChargeError = Literal["declined", "invalid_amount"]


def charge(amount_cents: int, balance_cents: int) -> Result[str, ChargeError]:
    if amount_cents <= 0:
        return Err("invalid_amount")
    if amount_cents > balance_cents:
        return Err("declined")
    return Ok(f"receipt:{amount_cents}")


def describe_error(error: ChargeError) -> str:
    match error:
        case "declined":
            return "declined: insufficient funds"
        case "invalid_amount":
            return "invalid amount"


def describe(result: Result[str, ChargeError]) -> str:
    match result:
        case Ok(value=receipt):
            return receipt
        case Err(error=error):
            return describe_error(error)


def parse_cents(raw: str) -> Result[int, str]:
    try:
        return Ok(int(raw))
    except ValueError:
        return Err(f"not a number: {raw!r}")


assert describe(charge(500, 1000)) == "receipt:500"
assert describe(charge(5000, 1000)) == "declined: insufficient funds"
assert describe(charge(0, 1000)) == "invalid amount"
assert parse_cents("x") == Err("not a number: 'x'")


Discount = Callable[[int], int]


def no_discount(cents: int) -> int:
    return cents


COUPONS: dict[str, Discount] = {"SPRING": lambda cents: cents * 9 // 10}


def discount_for(code: str | None) -> Discount:
    return COUPONS.get(code, no_discount) if code is not None else no_discount


assert discount_for("SPRING")(1000) == 900
assert discount_for("nope")(1000) == 1000
assert discount_for(None)(1000) == 1000
```

`parse_cents` is the boundary: `int()` raises on bad input, and the `except` turns that one expected failure into a value. Inside, `charge` never raises for a declined card. The `match` in `describe_error` covers every `ChargeError` variant, so adding one makes the type checker flag each handler that misses it. The last block is a Null Object. `no_discount` is a real `Discount` that returns the price unchanged, so `discount_for` always returns something callable and the checkout code needs no `if discount is None`. Use it when absence has an obvious neutral behavior (no discount, a logger that discards). Use `None` or an `Err` when the caller should react to absence.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

type ChargeError = { kind: "declined"; reason: string } | { kind: "invalid_amount"; cents: number };

export function charge(amountCents: number, balanceCents: number): Result<string, ChargeError> {
  if (amountCents <= 0) return err({ kind: "invalid_amount", cents: amountCents });
  if (amountCents > balanceCents) return err({ kind: "declined", reason: "insufficient funds" });
  return ok(`receipt:${amountCents}`);
}

export function describe(result: Result<string, ChargeError>): string {
  if (result.ok) return result.value;
  switch (result.error.kind) {
    case "declined":
      return `declined: ${result.error.reason}`;
    case "invalid_amount":
      return `invalid amount ${result.error.cents}`;
  }
}

const noDiscount = (cents: number): number => cents;
const coupons = new Map([["SPRING", (cents: number) => Math.floor((cents * 9) / 10)]]);
const discountFor = (code: string | null) => (code === null ? noDiscount : (coupons.get(code) ?? noDiscount));
assert.equal(describe(charge(500, 1000)), "receipt:500");
assert.equal(describe(charge(5000, 1000)), "declined: insufficient funds");
assert.equal(describe(charge(0, 1000)), "invalid amount 0");
assert.equal(discountFor("SPRING")(1000), 900);
assert.equal(discountFor("constructor")(1000), 1000);
assert.equal(discountFor(null)(1000), 1000);
```

A discriminated union is enough. The `switch` has no default, so the compiler reports a missing return if a new `kind` is added without a case. neverthrow's `Result.fromThrowable` wraps a throwing function into one that returns an `Err`, but `if (!result.ok)` covers most code.

## In production

- Rust's `Result` and `Option` are the model, with `?` for early return. Go returns an error value alongside the result. neverthrow brings `Result` and `ResultAsync` to TypeScript.
- HTTP layers map a domain `Err` to a 4xx response in one place and let unexpected exceptions become 500s.

## Smells and misuse

- Wrapping every function in Result, including ones that can only fail by bug. A bare exception is right there. Ignoring the returned Result is worse than ignoring an exception, because nothing surfaces it.
- `Err` carrying free text where callers need to branch, or built by catching `Exception`. Use a closed set of error kinds and catch the specific error you expect.
- Null Object that hides a real failure: an unknown coupon silently priced at full is right, an unknown payment gateway silently doing nothing is not.

## Related

- [State](../behavioral/state.md) can return a Result from a transition instead of raising. A Null Object is a [Strategy](../behavioral/strategy.md) that does nothing.
