# Patching runbook

How to replace a dependency in a test without leaving a mess, and how to change untestable code so no patch is needed. The standard is [patches](../../../testing-principles/references/patches.md) (P12, P13). Helper names and spec options are on the language pages: [python.md](../languages/python.md), [typescript.md](../languages/typescript.md), [rust.md](../languages/rust.md), [shell.md](../languages/shell.md) and [sql.md](../languages/sql.md).

## Decision procedure

Take the first step that applies.

1. **Can the code take the dependency as a parameter?** Inject the double. No patch.
2. **Can you make it take one?** If the code builds its collaborator inline, refactor (next section), then inject.
3. **Is the dependency a boundary** (network, clock, third-party service, slow store, environment variable)? Patch it, at the lookup site, in a form that undoes itself.
4. **None of the above.** The name is your own internal function. Do not patch it. Test through the public interface, or add a seam.

## Refactor to inject

Code that creates its own collaborator cannot be tested without a patch:

```python
import smtplib

def send_receipt(order):
    server = smtplib.SMTP("mail.internal")
    server.sendmail("shop@example.com", order.email, render(order))
```

Move the construction to a parameter. Production callers pass the real thing, and the test passes a double:

```python
def send_receipt(order, sender):
    sender.send(to=order.email, body=render(order))
```

```python
def test_send_receipt_mails_the_customer(email_sender_mock):
    customer_email = "ada@example.com"
    receipt_body = "1 x lamp"
    order = Order(email=customer_email, lines=[("lamp", 1)])

    send_receipt(order, email_sender_mock)

    assert email_sender_mock.mock_calls == [call.send(to=customer_email, body=receipt_body)]
```

The test assumes `render(order)` returns `"1 x lamp"` for that order. The assertion lists every call the mock received, so an extra call fails it (P10).

The thin wrapper that production code passes in holds the one third-party call:

```python
class SmtpSender:
    def send(self, to, body):
        smtplib.SMTP("mail.internal").sendmail("shop@example.com", to, body)
```

The steps:

1. Name what the code needs in your own terms (`sender`), not the library's (`SMTP`).
2. Put the third-party call behind a thin class like `SmtpSender` (P18).
3. Add the parameter. If many callers exist, give it a default that builds the real one, so no caller changes.
4. Write the test against the parameter. The double is built against the real class so a wrong call fails (P11).
5. Test the thin wrapper once, with a [contract](contract.md) or [integration](integration.md) test.

## Patch where the name is looked up

When you must patch, replace the name in the module that reads it, not the module that defines it.

1. Open the code under test and find the line that uses the dependency.
2. Find how that file got the name. If it imported the name from another module, it holds its own reference.
3. Patch the reference in the file under test.
4. If the patch seems to do nothing, you replaced the name at the wrong end of the import. Go back to step 2.

```python
# b.py
from a import f      # b now holds its own reference to f

def run():
    return f()
```

Patch `b.f`, not `a.f`: `run` reads the name from `b`, so replacing it in `a` changes nothing it sees.

The exception is a module imported as a whole. If `b.py` does `import smtplib` and calls `smtplib.SMTP(...)`, the lookup happens on the `smtplib` module at call time. Patch the attribute on the module you import (`smtplib.SMTP`), and every caller that goes through that module sees the double.

## Boundaries only

Patch network, clock, third-party services, slow stores and process-wide state (P8). Never patch your own internals, the object under test, or a private helper; add a seam instead. The reasons are in [patches](../../../testing-principles/references/patches.md).

## Make it auto-undone

1. Use the form your tool provides that restores the original when the test ends, pass or fail.
2. Put the patch and its double in one named fixture (see [fixtures](fixtures.md)).
3. Verify: run the next test in the file alone and confirm it sees the original.

## Build the replacement carefully

Create it from the real object so a wrong signature fails the test (P11), and assert a mock's full call list (P10). See [doubles](../../../testing-principles/references/doubles.md). A [contract](contract.md) test keeps the double honest.

## Common mistakes

- Patching the definition site, so the code keeps calling the original: patch where the name is looked up (above).
- Patching internals to make a test easier: [testing private internals](../code-smells.md#testing-private-internals).
- A replacement built without the real object's shape: [stale doubles](../code-smells.md#stale-doubles).
- Mocking everything near the code: [over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup).

## Done check

- [ ] Injection was considered first.
- [ ] Anything patched is a boundary, patched at the lookup site.
- [ ] The patch is undone by the tool, and the next test sees the original.
- [ ] The replacement is built against the real object and asserted exactly.
