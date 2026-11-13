# Worked Example

> A complete review of one change, for calibrating tone and what to include.


A PR adds refunds: `POST /v1/orders/{order_id}/refunds`, a `refunds` table and its migration. The linked spec says support staff can issue full or partial refunds, never more than was paid, with an audit trail of who refunded what and why. An abridged excerpt:

```python
# fragment
@router.post("/v1/orders/{order_id}/refunds", status_code=201)
async def create_refund(
    order_id: int,
    body: dict,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(current_user),
) -> dict:
    order = await session.get(Order, order_id)
    if body["amount"] > order.total - order.refunded_total:
        raise HTTPException(400, "too much")
    refund = Refund(
        order_id=order_id,
        amount=body["amount"],
        reason=body.get("reason"),
        notify_customer=body.get("notify_customer", True),
    )
    session.add(refund)
    order.refunded_total += body["amount"]
    await session.commit()
    await payments.refund(order.payment_id, body["amount"])
    return refund.__dict__
```

```python
# fragment
def upgrade() -> None:
    op.create_table(
        "refunds",
        sa.Column("id", sa.BigInteger, primary_key=True),
        sa.Column("order_id", sa.BigInteger, sa.ForeignKey("orders.id")),
        sa.Column("amount", sa.Float, nullable=False),
        sa.Column("reason", sa.Text),
        sa.Column("notify_customer", sa.Boolean),
        sa.Column("created_at", sa.DateTime),
    )
```

The review follows the principles' order (see the `engineering-principles` skill): intent, scope and design, then correctness, then the rest. It opens with a summary, so the author knows what matters before reading individual comments.

**Summary comment**

> The happy path matches the spec, and the migration being its own commit made this easy to follow. Three blockers before this can merge: there's no authorization check, money is stored as a float, and the payment call runs after the commit, so a gateway failure leaves a refund recorded that never happened. Two spec gaps (audit trail, input validation) are marked `issue`. The `notify_customer` question is about scope. Happy to pair on the transaction part.

**Line comments**

- `blocker` on `user: User = Depends(current_user)`: Any logged-in user can refund any order. The spec limits refunds to support staff, and the order lookup isn't scoped to the caller's tenant. Suggest `Depends(require_role(Role.SUPPORT))` and a tenant-scoped query, plus tests for a customer, a support user from another tenant, and an anonymous caller.
- `blocker` on `order.refunded_total += ...` through `payments.refund(...)`: If the gateway call fails, the database already says the order was refunded. Two concurrent refunds can also both pass the limit check, because the read-modify-write isn't atomic. Suggest: accept an `Idempotency-Key` header and store it on the refund under a unique constraint, so a client or proxy retry returns the existing refund instead of creating a second one. Then reserve the amount in one transaction, inserting the refund as `pending` and applying the total with a guarded update (`UPDATE orders SET refunded_total = refunded_total + :amount WHERE id = :id AND refunded_total + :amount <= total`), and stop if no row was updated. Only then call the gateway, with an idempotency key derived from that stored refund. On success mark the refund `succeeded` and record the gateway's refund id; on a definite failure mark it `failed` and release the reservation; on an uncertain outcome such as a timeout, leave it `pending` and resolve it later by retrying the gateway call with the same idempotency key, which returns the original result instead of refunding twice.
- `blocker` on `sa.Column("amount", sa.Float, ...)`: Money as a float will accumulate rounding errors. `orders.total` uses `Numeric(12, 2)`; this column should match.
- `issue` on `body: dict`: A missing `amount` raises `KeyError` and returns a 500, and a negative amount passes the limit check. Suggest a `RefundRequest` model with a positive `Money` amount, a length-limited `reason`, and `extra="forbid"`.
- `issue` on `await session.get(Order, order_id)`: A missing order raises `AttributeError` on the next line. Return a 404 (or 404 for other tenants' orders too, so ids can't be probed).
- `issue` on the migration's `order_id` and `created_at`: `order_id` should be `nullable=False` and indexed, since PostgreSQL doesn't index the referencing side and every "refunds for this order" query will scan. `created_at` should be `DateTime(timezone=True)` with `server_default=sa.func.now()`.
- `issue` on the PR as a whole: The spec requires an audit trail of who issued each refund and why. I can't find one in the diff. A non-null `created_by` column and a required `reason` would cover it.
- `question` on `notify_customer`: The spec doesn't mention customer notifications. Is this needed for this release? If not, please leave it for a separate PR so this one matches the spec, no more and no less.
- `issue` on `return refund.__dict__`: This exposes every column plus SQLAlchemy's internal `_sa_instance_state`. Suggest a `RefundResponse` model declared as the route's `response_model`.
- `praise` on the migration's `downgrade`: Clean and complete, thanks.

**Verdict:** Request changes, naming the three blockers and the five issues as required. Everything else is the author's call.

Notice what the review doesn't contain: no comments on formatting or import order (the linter owns those), no rewrite of working code into the reviewer's style, and nothing about lines the PR didn't change.

