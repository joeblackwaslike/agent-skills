# Iterator

## What it is and Problem it solves

Iterator produces items one at a time without exposing how they are stored or fetched. The consumer asks for the next item; the producer decides how to get it. It lets you walk 10 million orders, or a paginated API, without holding them all in memory.

## Do you need this?

You almost never write an iterator class. Return a list when the data is small and the caller needs all of it. When it is large, remote or unbounded, write a generator function. In Python that is `yield`; in TypeScript, `function*` and `async function*`. The language already provides the protocol, so the pattern comes down to using it.

## Python

```python
import asyncio
from collections.abc import AsyncIterator, Iterable, Iterator
from dataclasses import dataclass
from itertools import batched
from typing import Protocol


@dataclass(frozen=True)
class Order:
    id: str


@dataclass(frozen=True)
class Page:
    items: list[Order]
    next_cursor: str | None


class OrdersApi(Protocol):
    async def list_orders(self, cursor: str | None) -> Page: ...


async def iter_orders(api: OrdersApi) -> AsyncIterator[Order]:
    cursor: str | None = None
    while True:
        page = await api.list_orders(cursor)
        for order in page.items:
            yield order
        if page.next_cursor is None:
            return
        cursor = page.next_cursor


def chunks(orders: Iterable[Order], size: int) -> Iterator[tuple[Order, ...]]:
    return batched(orders, size)


class FakeApi:
    def __init__(self) -> None:
        self.calls = 0

    async def list_orders(self, cursor: str | None) -> Page:
        self.calls += 1
        start = int(cursor or 0)
        items = [Order(f"o-{n}") for n in range(start, min(start + 2, 5))]
        return Page(items, str(start + 2) if start + 2 < 5 else None)


async def main() -> None:
    api = FakeApi()
    ids: list[str] = []
    async for order in iter_orders(api):
        ids.append(order.id)
        if len(ids) == 2:
            break
    assert api.calls == 1

    ids = [o.id async for o in iter_orders(FakeApi())]
    assert ids == ["o-0", "o-1", "o-2", "o-3", "o-4"]
    assert [len(c) for c in chunks([Order("a"), Order("b"), Order("c")], 2)] == [2, 1]


asyncio.run(main())
```

The loop that hits the API is hidden inside `iter_orders`. Callers see a flat stream, and breaking out early means later pages are never fetched.

## TypeScript

```typescript
type Order = { id: string };
type Page = { items: Order[]; nextCursor: string | null };
type ListOrders = (cursor: string | null) => Promise<Page>;

export async function* iterOrders(listOrders: ListOrders): AsyncGenerator<Order> {
  let cursor: string | null = null;
  do {
    const page: Page = await listOrders(cursor);
    yield* page.items;
    cursor = page.nextCursor;
  } while (cursor !== null);
}

export async function take<T>(source: AsyncIterable<T>, n: number): Promise<T[]> {
  const out: T[] = [];
  if (n <= 0) return out;
  for await (const item of source) {
    out.push(item);
    if (out.length === n) break;
  }
  return out;
}

let calls = 0;
const fakeList: ListOrders = async (cursor) => {
  calls += 1;
  const start = Number(cursor ?? 0);
  const items = Array.from({ length: Math.min(2, 5 - start) }, (_, i) => ({ id: `o-${start + i}` }));
  return { items, nextCursor: start + 2 < 5 ? String(start + 2) : null };
};

async function main(): Promise<void> {
  const firstTwo = await take(iterOrders(fakeList), 2);
  console.assert(firstTwo.length === 2 && calls === 1);
}

void main();
```

Breaking out of a `for await` loop calls the generator's `return()`, so `finally` blocks inside it run and any open connection or cursor is released.

## In production

- Database drivers: server-side cursors (`psycopg` named cursors, SQLAlchemy `yield_per`) stream rows instead of loading them.
- File reads: iterating over a file object yields one line at a time.
- AWS SDK paginators and Octokit's `paginate.iterator` wrap cursor or page-number APIs behind an async iterator.
- Node streams, and the web `ReadableStream`, are async iterables.
- `itertools` and `Array.from` pipelines compose small lazy steps.

## Smells and misuse

- Calling `list(generator)` on an unbounded or huge source, which defeats the point.
- A generator you can only consume once, passed to code that iterates twice and sees nothing the second time. Pass a function that creates one, or materialize on purpose.
- Holding a transaction or connection open across a generator that the caller consumes slowly.
- Writing an `__iter__`/`__next__` class by hand when `yield` would do.
- Hiding I/O inside a sync iterator. If each step awaits the network, it should be an async iterator so the event loop is not blocked.
- Buffering the whole result inside the generator before yielding.

## Related

- [Repository](../data-access/repository.md) often returns an iterator for large result sets.
- [Retry with backoff](../resilience/retry-backoff.md) belongs around each page fetch, not around the whole loop.
- [Observer](observer.md) pushes items to subscribers; Iterator lets the consumer pull at its own pace.
- [Adapter](../structural/adapter.md) can wrap a callback-style source as an iterator.
