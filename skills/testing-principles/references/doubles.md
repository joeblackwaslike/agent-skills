# Test doubles

Which stand-in to use for a collaborator, and how to check it. Covers P8 to P11. Library syntax, spec'd mocks and the Python helpers live in [`testing-code`](../../testing-code/references/languages/index.md), not here.

## Real or double

Use the real collaborator when it is cheap and deterministic: a value object, a pure function, an in-process helper (P8). Use a double at the boundaries where the real thing is slow, random, shared or outside your control: network, clock, third-party services, slow stores.

A double costs you something. It can drift from the real thing (P11), and it ties the test to how the code talks to it. If the real collaborator is fast and predictable, the double is pure overhead.

## Five doubles, by job

The vocabulary follows Meszaros's xUnit Patterns, as Fowler's "Mocks Aren't Stubs" summarizes it.

| Double | Its job | Test checks |
|---|---|---|
| Dummy | Fills a parameter that the code never uses | Nothing |
| Stub | Returns canned data the code reads | The result, not the stub |
| Fake | A small working implementation that takes a shortcut, such as an in-memory repository | The result, via state |
| Mock | Stands in for an effect the code causes, and the test asserts it | The interactions (P10) |
| Spy | A stub that also records how it was called | The recorded calls, after the fact |

P9 names the three main jobs (stub, mock, fake). Dummy and spy are the other two Meszaros terms. Pick by what the code does with the collaborator (P9).

- The code reads from it: stub.
- The code causes an effect through it (sends a message, writes a record, enqueues a job): mock.
- The behavior across several calls matters (write, then read it back; a lookup that depends on earlier writes): fake.
- It must be passed but is never touched: dummy.

## Stubs for data, mocks for behavior

House style draws a hard line between the two, because the double tells the reviewer what the test is about.

- A stub signals "this object only exists so the code under test has something to read". Reviewers can skip it.
- A mock signals "this test asserts something about this object". Reviewers read its expectations.
- A stub is either a plain data record, or built against the real type. For a non-record stub, set only the attributes the code reads, which documents the minimal interface the test needs. Anything else the code touches fails loudly because the real type has no such attribute, so a stray access cannot return a silent default. Plain data records are exempt from this structural check.
- Data records (rows, models, DTOs) are almost always stubs. Handlers, services and clients that cause effects are usually mocks, and their methods return stubs.

Do not use a mock as a data container. A permissive mock invents every attribute you ask for, so a typo in the code under test still passes.

## Assert the interactions exactly

When a test uses a mock, say precisely what should have happened (P10). Assert four things:

1. Which calls the code made.
2. Their arguments.
3. Their order: assert the calls in the order the code makes them.
4. That nothing else was called.

People skip the fourth. A check that a call happened passes when the code also made three extra, wrong calls. Compare the full list of calls to the expected list, so an extra, missing or reordered call fails the test. Where order truly does not matter to the outcome, say so once in the test and compare the calls as an unordered collection that keeps duplicates, so one expected call and two identical actual calls still fail. That is the only exception to P10's order rule.

Give each mock its own expected-call block. A double that must stay untouched gets an explicit not-called assertion, so a regression that starts using it is caught.

Keep expectations about outcomes the behavior depends on. Do not mock logger-like collaborators (those whose calls are not part of the behavior under test, such as logging or metrics); use a real or no-op one. That way the exact-list rule is never relaxed for a mock. A call that charges a card is always worth pinning.

### Where this departs from common advice

Fowler's "Mocks Aren't Stubs" prefers state verification where it is practical, and notes that mock-based tests couple to how the code works. Google's chapter 13 prefers state testing over interaction testing. For a double that only supplies data, that advice holds. For effects it doesn't. When the behavior is "the code told a collaborator to do X", the call is the observable result, and asserting it exactly is how the test proves anything. That is the house position (P10), so don't remove such assertions by consulting those sources.

## Never nest separately created mocks

Do not assign one independently created mock as an attribute of another. This is house style. In some libraries a parent does not record a child's calls, so ordering and "nothing else was called" checks can silently miss them.

Build the whole collaborator once, from one description of the real object, and let that one object own its attributes. If the code reaches through two hops, treat that as a signal that the seam is too deep and move it closer (see `patches.md`).

## Check doubles against the real thing

A double is a claim about how the real collaborator behaves. When the real one changes, the double does not, and the test stays green against a world that no longer exists (P11).

- **Mocks and stubs** are checked structurally (plain data-record stubs are exempt, per the stub rule above): the double only accepts the names and call shapes the real object has. A call with a wrong argument count or a misspelled method fails in the test, not in production. [`testing-code`](../../testing-code/references/languages/index.md) shows the mechanism per language.
- **Fakes** are checked behaviorally. Run one shared contract suite against both the fake and the real implementation. If the fake passes cases the real one fails, the fake is wrong.
- **Boundary doubles** (a payment provider, a third-party API) are covered by a contract test (P11), or by a periodic run against the real service.

A double with no such check is a stale-double risk. Name it as a gap in review.

## Related

- `fixtures.md` for where doubles live in a test.
- `patches.md` for how a double gets in front of the code.
- `test-structure.md` for the body order that puts expectations last.
