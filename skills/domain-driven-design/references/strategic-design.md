# Strategic Design

Strategic DDD is about the **big picture**: before you write a single aggregate, you decide
*what* you're modeling, *where the boundaries are*, and *how the pieces talk*. Tactical
patterns (aggregates, value objects) build the parts; strategic patterns decide which parts
exist and how they relate. Getting this wrong is far more expensive than any class-level
mistake — you can refactor an aggregate in an afternoon, but a wrong boundary metastasizes
across teams for years.

## Ubiquitous language

A **ubiquitous language** is a shared, precise vocabulary used by developers and domain
experts *and* baked directly into the code. Not a translation layer — the same words.

The rule: if a domain expert says "when a customer **places** an order, we **reserve**
inventory and **capture** payment," the code has `order.place()`, `inventory.reserve()`,
`payment.capture()`. Not `order.setStatus(1)`, not `processOrder()`. When the language in
the code drifts from the language in the business, every conversation needs a mental
translation step, and bugs hide in the gap.

The language is **bounded** — it's only consistent *within* a context. "Order" means one
thing to the Sales team (a shopping intent, a quote) and another to Fulfillment (a packing
list with a shipping label). That's not a conflict to resolve; it's a signal that you have
two bounded contexts.

## Subdomains: where to spend your effort

Not all parts of a system deserve equal modeling investment. Classify each subdomain:

| Subdomain type | What it is | Strategy |
| --- | --- | --- |
| **Core** | Your competitive advantage; the reason the software exists | Invest the most. Richest model, best engineers, most tests. |
| **Supporting** | Necessary but not differentiating; specific to your business | Model it, but pragmatically. Custom code, modest investment. |
| **Generic** | Solved problems everyone needs (auth, billing, notifications) | Buy/adopt. Don't lovingly hand-craft — use Stripe, Auth0, etc. |

For our running example, an e-commerce company's **core** might be its
pricing/promotions engine or its fulfillment optimization — that's where DDD earns its
keep. **Supporting**: the order-assembly workflow. **Generic**: payment processing, email
delivery, tax calculation. A common, expensive mistake is pouring elaborate DDD modeling
into a generic subdomain (building your own auth) while treating the core subdomain as an
afterthought.

## Bounded contexts

A **bounded context** is an explicit boundary within which a model and its ubiquitous
language are internally consistent. Inside it, "Order" has exactly one meaning. Across the
boundary, the same word may mean something else, and that's fine — each context owns its
own model.

Boundaries usually align with:
- **Linguistic seams** — the same word means different things, or different words mean the
  same thing.
- **Team ownership** — one team should own a context end to end (Conway's Law works *with*
  you here).
- **Rate of change / scaling** — parts that change or scale together belong together.

For our domain, plausible bounded contexts:

```
┌─────────────────┐   places order    ┌──────────────────┐
│   Sales /        │ ─────────────────▶│   Fulfillment    │
│   Ordering       │   (OrderPlaced)   │                  │
│  "Order" = cart  │                   │ "Order" = pick   │
│   + pricing      │                   │  list + shipment │
└─────────────────┘                   └──────────────────┘
        │ uses                                  │ uses
        ▼                                        ▼
┌─────────────────┐                   ┌──────────────────┐
│  Payments        │                   │   Inventory      │
│  (generic)       │                   │  (supporting)    │
└─────────────────┘                   └──────────────────┘
```

The **Ordering** context owns placing/pricing an order. When an order is placed it emits an
`OrderPlaced` event; **Fulfillment** consumes it and builds its *own* model of an order
(a shipment with a pick list). The two never share a database table or a class — they share
a contract (the event payload).

> A bounded context is not a microservice. You can run several bounded contexts as modules
> in one deployable ("modular monolith"). The boundary is about the *model*, not the
> deployment unit. Split into services later, for operational reasons, along these seams.

## Context mapping

Once you have multiple contexts, you map the **relationships** between them. The map records
which contexts depend on which, and the *political/technical* nature of each link. The seven
classic patterns:

| Pattern | Meaning |
| --- | --- |
| **Partnership** | Two contexts/teams succeed or fail together; they coordinate closely. |
| **Shared Kernel** | Two contexts share a small, explicitly agreed subset of the model. High coupling — use sparingly. |
| **Customer / Supplier** | Downstream (customer) has a real say in the upstream (supplier) team's priorities. |
| **Conformist** | Downstream simply adopts the upstream model as-is, no translation. Cheap, but you inherit their model's warts. |
| **Anticorruption Layer (ACL)** | Downstream wraps the upstream in a translation layer that maps *their* model into *your* language, so their concepts never leak in. |
| **Open-Host Service (OHS)** | Upstream publishes a well-defined protocol/API for many consumers. |
| **Published Language** | A shared, well-documented interchange format (e.g., a versioned event schema) that contexts communicate through. |
| **Separate Ways** | The contexts don't integrate at all; duplication is cheaper than coupling. |

### Anticorruption layer — worked example

The Ordering context must consult a third-party tax service whose API speaks in `taxCode`,
`jurisdictionId`, and `rateBasisPoints`. You do **not** want those terms bleeding into your
domain. An ACL translates the foreign model into your ubiquitous language (`TaxRate`,
`Money`).

**TypeScript**

```ts
// Domain port — expressed purely in OUR language.
export interface TaxPolicy {
  taxFor(amount: Money, shipTo: Address): Promise<Money>;
}

// ACL adapter — the ONLY place the foreign vocabulary is allowed to exist.
export class VendorTaxAdapter implements TaxPolicy {
  constructor(private readonly client: VendorTaxApi) {}

  async taxFor(amount: Money, shipTo: Address): Promise<Money> {
    // translate OUR concepts → THEIR request
    const resp = await this.client.calculate({
      jurisdictionId: shipTo.postalCode,
      amountMinor: amount.amountMinor,
      currency: amount.currency,
    });
    // translate THEIR response → OUR language
    return Money.fromMinor(resp.taxAmountMinor, amount.currency);
  }
}
```

**Python**

```python
from typing import Protocol

class TaxPolicy(Protocol):  # domain port, our language only
    async def tax_for(self, amount: Money, ship_to: Address) -> Money: ...

class VendorTaxAdapter:  # ACL — foreign vocabulary quarantined here
    def __init__(self, client: VendorTaxApi) -> None:
        self._client = client

    async def tax_for(self, amount: Money, ship_to: Address) -> Money:
        resp = await self._client.calculate(
            jurisdiction_id=ship_to.postal_code,
            amount_minor=amount.amount_minor,
            currency=amount.currency,
        )
        return Money.from_minor(resp.tax_amount_minor, amount.currency)
```

The domain depends only on the `TaxPolicy` port. If you swap tax vendors, you write a new
adapter; nothing in the domain changes. That's the payoff of an ACL — foreign models can't
corrupt yours.

## How strategic feeds tactical

Strategic design hands you a set of bounded contexts, each with its own ubiquitous language
and a known relationship to its neighbors. *Inside* one context you then apply the tactical
patterns: aggregates, value objects, domain events, repositories. Read
`tactical-patterns.md` next, and `application-architecture.md` for how to lay a single
context's code out on disk.
