# Chain of Responsibility

## What it is and Problem it solves

A request passes through an ordered list of handlers. Each one can act on it, stop it, or hand it to the next. It keeps cross-cutting steps (authentication, validation, rate limiting, logging) out of the code that handles the request itself, and lets you add or reorder them without editing it.

## Do you need this?

Not for two checks. Call them in order inside the handler: `authenticate(req)`, then `validate(req)`. A list of functions that you loop over is the next step up.

Use the chain when steps need to wrap the rest (time the whole request, catch errors from everything downstream, add a header after the response is built), or when different routes assemble different stacks. That wrapping behavior is the reason web frameworks use it.

## Python

```python
import asyncio
from collections.abc import Awaitable, Callable
from dataclasses import dataclass


@dataclass(frozen=True)
class Request:
    user: str | None
    amount_cents: int


@dataclass(frozen=True)
class Response:
    status: int
    body: str


Handler = Callable[[Request], Awaitable[Response]]
Middleware = Callable[[Handler], Handler]


def require_user(next_handler: Handler) -> Handler:
    async def handle(req: Request) -> Response:
        if req.user is None:
            return Response(401, "login required")
        return await next_handler(req)

    return handle


def limit_amount(max_cents: int) -> Middleware:
    def middleware(next_handler: Handler) -> Handler:
        async def handle(req: Request) -> Response:
            if req.amount_cents > max_cents:
                return Response(422, "amount too large")
            return await next_handler(req)

        return handle

    return middleware


def build(handler: Handler, *stack: Middleware) -> Handler:
    for middleware in reversed(stack):
        handler = middleware(handler)
    return handler


async def pay(req: Request) -> Response:
    return Response(200, f"charged {req.amount_cents}")


app = build(pay, require_user, limit_amount(100_000))


async def main() -> None:
    assert (await app(Request(None, 500))).status == 401
    assert (await app(Request("ada", 999_999))).status == 422
    assert (await app(Request("ada", 500))).status == 200


asyncio.run(main())
```

Each middleware takes the next handler and returns a new one, so the first in `stack` runs first. A middleware ends the chain by returning without calling `next_handler`.

## TypeScript

```typescript
import assert from "node:assert/strict";

type Ctx = { user: string | null; amountCents: number; status: number; body: string };
type Middleware = (ctx: Ctx, next: () => Promise<void>) => Promise<void>;

function compose(stack: Middleware[]): (ctx: Ctx) => Promise<void> {
  return (ctx) => {
    let last = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= last) throw new Error("next() called multiple times");
      last = i;
      const middleware = stack[i];
      if (middleware) await middleware(ctx, () => dispatch(i + 1));
    };
    return dispatch(0);
  };
}

const requireUser: Middleware = async (ctx, next) => {
  if (ctx.user === null) {
    ctx.status = 401;
    return;
  }
  await next();
};

const timing: Middleware = async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
  } finally {
    ctx.body += ` (${Date.now() - start}ms)`;
  }
};

const pay: Middleware = async (ctx) => {
  ctx.status = 200;
  ctx.body = `charged ${ctx.amountCents}`;
};

const app = compose([timing, requireUser, pay]);

const ctx: Ctx = { user: "ada", amountCents: 500, status: 0, body: "" };
await app(ctx);
assert.equal(ctx.status, 200);
const twice: Middleware = async (_c, next) => { await next(); await next(); };
await assert.rejects(compose([twice, pay])(ctx), /multiple times/);
```

`timing` runs code before `await next()` on the way in and after it on the way out. The `finally` records the time even when something downstream throws, and `compose` rejects a second `next()` call the way Koa's compose does. A middleware that returns without calling `next` stops everything downstream, as `requireUser` does.

## In production

- Express: a middleware receives `req`, `res` and `next`. If it does not end the response it must call `next()`, or the request hangs. Error-handling middleware has the four-argument signature `(err, req, res, next)`, and Express 5 forwards a rejected promise from an async handler to it as if `next(err)` had been called.
- Koa: middleware are async functions that `await next()`. Control goes downstream through the stack, then back upstream, which is what makes `timing` above possible. Express's `next()` does not await downstream work.
- ASGI (Starlette, FastAPI): a pure ASGI middleware is itself an ASGI app that wraps another one, called with `scope`, `receive` and `send`. It is the same wrapping shape as the Python example, with a different call signature.

## Smells and misuse

- Order bugs. Authentication after the rate limiter, or error handling registered last so it never sees earlier errors. Keep the order visible in one place.
- Forgetting to call `next()` and leaving the request open, or calling it twice and running the rest of the chain twice.
- Business logic in middleware, or a fixed chain of five that is just a function with five steps.

## Related

- [Decorator](../structural/decorator.md) is the same wrapping idea applied to one function; middleware is a decorator stack on the request handler.
