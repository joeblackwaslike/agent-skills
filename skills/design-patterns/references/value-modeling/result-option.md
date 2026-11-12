# Result / Option

## What it is and Problem it solves

A Result is a return value that is either a success (`Ok`) or a failure (`Err`), so the type signature says the call can fail and the caller has to handle both. An Option is the same idea for absence: a value or nothing. Both replace "raise an exception" and "return null" where the failure or absence is an expected outcome that callers should not forget. Null Object handles absence differently, by returning a do-nothing value so callers need no check.

## Do you need this?

Not for most code. Python exceptions and `T | None` already do this job, and a `try/except` around a database call is correct.

Use a Result for outcomes the business expects and the caller must branch on, such as a card declined, a coupon expired or a validation that failed. Use an exception for things that should not happen and that no caller can fix locally: the database is down, a bug, a timeout. The usual split is exceptions at the boundaries (I/O, parsing untrusted input) and Result in between, so the decision logic is a pure function returning a value and the edge converts a thrown error into a Result once.

The signal is a function whose callers keep forgetting a case, or a `try/except Exception` that catches too much because domain failures are exceptions too. For absence alone, `T | None` (or `T | undefined` under `strict`) is an Option, and the type checker already forces the check.

## Python

```python
from collections.abc import Callable
from dataclasses import dataclass
from typing import Literal, assert_never


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
        case _:
            assert_never(error)


def parse_cents(raw: str) -> Result[int, Literal["not_a_number"]]:
    if not (raw.isascii() and raw.isdigit()):
        return Err("not_a_number")
    return Ok(int(raw))


Discount = Callable[[int], int]
no_discount: Discount = lambda cents: cents
COUPONS: dict[str, Discount] = {"SPRING": lambda cents: cents * 9 // 10}


def discount_for(code: str | None) -> Result[Discount, Literal["unknown_coupon"]]:
    if code is None:
        return Ok(no_discount)
    found = COUPONS.get(code)
    return Ok(found) if found is not None else Err("unknown_coupon")


assert charge(500, 1000) == Ok("receipt:500")
assert charge(5000, 1000) == Err("declined") and charge(0, 1000) == Err("invalid_amount")
assert describe_error("declined") == "declined: insufficient funds"
assert all(parse_cents(raw) == Err("not_a_number") for raw in ("x", "1_000", " 5 ", "\u0661"))
spring, none, typo = discount_for("SPRING"), discount_for(None), discount_for("nope")
assert isinstance(spring, Ok) and spring.value(1000) == 900
assert isinstance(none, Ok) and none.value(1000) == 1000
assert typo == Err("unknown_coupon")
```

`charge` never raises for a declined card, and the `match` in `describe_error` ends in `assert_never`, so the type checker flags a new variant and a missed one fails loudly at runtime. `parse_cents` is a boundary: it validates the untrusted text up front, because `int()` also accepts `"1_000"`, `" 5 "` and non-ASCII digits. Its error is a closed `Literal`. Option needs no type of its own. `COUPONS.get(code)` returns `Discount | None`, and the checker forces the `is not None` check.

Null Object is the `no_discount` function. It is a real `Discount` that returns the price unchanged, so a checkout with no coupon code needs no `if discount is None`. Use it when absence has an obvious neutral behavior (no code given, a logger that discards). A code the customer typed that matches nothing is different. `discount_for` returns `Err("unknown_coupon")` for it, because the caller should react.

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
const discountFor = (code: string | null): Result<(cents: number) => number, "unknown_coupon"> => {
  if (code === null) return ok(noDiscount);
  const found = coupons.get(code);
  return found === undefined ? err("unknown_coupon") : ok(found);
};
const priced = (code: string | null): number | string => {
  const found = discountFor(code);
  return found.ok ? found.value(1000) : found.error;
};

assert.equal(describe(charge(500, 1000)), "receipt:500");
assert.equal(describe(charge(5000, 1000)), "declined: insufficient funds");
assert.equal(describe(charge(0, 1000)), "invalid amount 0");
assert.equal(priced("SPRING"), 900);
assert.equal(priced(null), 1000);
assert.equal(priced("constructor"), "unknown_coupon");
```

A discriminated union is enough. The `switch` has no default, so the compiler reports a missing return if a new `kind` is added without a case. `T | undefined` is the Option, as `coupons.get` shows. neverthrow's `Result.fromThrowable` wraps a throwing function into one that returns an `Err`, but `if (!result.ok)` covers most code.

## In production

- Rust's `Result` and `Option` are the model, with `?` for early return. Go returns an error value alongside the result. neverthrow brings `Result` and `ResultAsync` to TypeScript. HTTP layers map a domain `Err` to a 4xx response in one place and let unexpected exceptions become 500s.

## Smells and misuse

- Wrapping every function in Result, including ones that can only fail by bug. A bare exception is right there. Ignoring the returned Result is worse than ignoring an exception, because nothing surfaces it.
- `Err` carrying free text where callers need to branch. Use a closed set of error kinds.
- Null Object that hides a real failure. A coupon code that matches nothing, or a payment gateway that silently does nothing, should be an `Err`. Keep the no-op default for "nothing was asked for".

## Related

- [State](../behavioral/state.md) can return a Result from a transition instead of raising. A Null Object is a [Strategy](../behavioral/strategy.md) that does nothing.
