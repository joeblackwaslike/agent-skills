# Test body template

A fixed shape for the body of a test. Every test reads the same way, so a reviewer finds the act, the expectation and the interactions in the same place each time. The template serves P3, P4 and P10.

## The shape

Seven blocks, in this order, separated by one blank line each. Skip a block when the test has nothing for it; never reorder.

1. **Constants.** Values the test depends on, including stubs: arguments for the code under test, and anything you will assign as a return value or side effect.
2. **Mocks.** Assign return values and side effects to the mocks that came in as fixtures. Create a mock inline here only when no fixture supplies it.
3. **Act.** Call the code under test once. Keep the result if there is one.
4. **Expected.** Build the expected object with helpers or plain literals. This is the only place the test prepares data for its assertions.
5. **Result asserts.** Assert the return value against the expected object first, then any other assertion that does not involve a mock. Follow the order in which the code under test does things.
6. **Mock asserts.** One exact-call assertion per mock, listed in the order the code under test makes the calls. Write each call to look like the call in the production code. When a mock stands for a collaborator with a nested object, keep the object name with the method in the call list.
7. **Not-called asserts.** A mock that must stay untouched gets `assert mock.mock_calls == []`. That covers every method and child, where `assert_not_called` checks only the mock's own call.

## Rules that make it work

- Constants live in the test or on the test class, never in a distant helper (see [values defined far from the test](code-smells.md#values-defined-far-from-the-test)).
- A mock assertion lists every call the mock received, and fails on any extra one (P10). Asserting only that one method was called once leaves everything else unchecked.
- Order assertions as the code does its work. A reader can then hold the production function in one hand and the test in the other.
- No loops, conditionals or computed expectations in any block (P3).
- Each mock normally comes from a fixture, so the test body only configures it. The fixture mechanics belong to the language page.

## One worked example

Python, with a neutral domain: placing an order charges a card and sends a receipt. The test uses `create_autospec` mocks from fixtures, the `assert_calls_on` helper and a `stub` data object. All three are covered on the [Python page](languages/python.md) and are only used by name here.

```python
def test_place_order_charges_card_and_sends_receipt(
    self,
    payment_gateway_mock,
    mailer_mock,
    audit_log_mock,
):
    customer_email = "ada@example.com"
    card_token = "tok_visa"
    total_cents = 4200
    charge = stub(id="ch_123", status="succeeded")

    payment_gateway_mock.charge.return_value = charge

    result = place_order(
        customer_email,
        card_token,
        total_cents,
        gateway=payment_gateway_mock,
        mailer=mailer_mock,
        audit_log=audit_log_mock,
    )

    expected_result = OrderConfirmation(charge_id="ch_123", total_cents=4200)

    assert result == expected_result

    assert_calls_on(
        payment_gateway_mock,
        [call.charge(card_token, total_cents)],
        exact_count=True,
    )
    assert_calls_on(
        mailer_mock,
        [call.send_receipt(customer_email, charge_id="ch_123")],
        exact_count=True,
    )

    assert audit_log_mock.mock_calls == []
```

Block by block: the first four lines are constants (the last is a stub), the assignment is the mock block, `place_order` is the act, `expected_result` is the expected block, `assert result` is the result assert, the two `assert_calls_on` calls are the mock asserts in the order the function calls the gateway and then the mailer, and the last line is the not-called assert.

## Before and after

A test that checks each interaction in a different shape forces the reader to decode every line:

```python
assert result.charge_id == "ch_123"
payment_gateway_mock.charge.assert_called_once_with(card_token, total_cents)
assert mailer_mock.send_receipt.call_count == 1
args, kwargs = mailer_mock.send_receipt.call_args
assert args[0] == customer_email
```

The template gives each mock the same block and fails if the code calls anything else on it, so a reviewer can match patterns instead of decoding lines.

## Where it comes from

This is Joe Black's house template, refined across his own backend tests. The claim that a uniform shape lowers review effort is his. The no-logic rule is informed by the Google Testing Blog's "Don't Put Logic in Tests".

## Related

- [Code smells](code-smells.md): what the template prevents.
- [test-structure](../../testing-principles/references/test-structure.md): the principle behind this test shape.
- [doubles](../../testing-principles/references/doubles.md): stub, mock and fake, and the exact-call rule.
