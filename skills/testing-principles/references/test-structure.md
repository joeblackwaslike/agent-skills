# Test structure

How one test is shaped so a reader sees what it proves and a failure says why. Covers P3, P4 and P16. The Python helpers and fixture mechanics live in `testing-code`, not here.

## Arrange, Act, Assert

Three blocks, in this order, separated by blank lines.

1. **Arrange.** Build the inputs, set what the doubles return.
2. **Act.** Call the code under test, once.
3. **Assert.** Check the result, then the interactions.

One Act per test. A second Act means a second behavior and a second test. Given/When/Then is the same shape in scenario words.

## Naming

Name the behavior, not the method. A reader should learn the rule from the test list alone.

| Weak | Better |
|---|---|
| `test_login` | `test_login_rejects_expired_credential` |
| `test_process_order_2` | `test_order_over_stock_is_backordered` |
| `test_get_user_error` | `test_missing_user_returns_not_found` |

Put the condition and the outcome in the name. If the name needs "and", the test covers two behaviors (P3).

## One behavior

A test fails for one reason. Several asserts are fine when they describe one outcome (a response's status, body and headers). They are wrong when they check unrelated outcomes, because the first failure hides the rest and the name stops being true.

## No logic

No loops, conditionals or computed expectations in a test. A test is a statement of fact, and logic inside it can be wrong in the same way the code is.

- Write the expected value as a literal, not as the result of the formula the code uses.
- To cover many inputs, use a parameter table where each row is a plain example, or a property-based test (`property-based.md`).
- A branch in a test usually hides two tests.

## DAMP over DRY

DAMP means descriptive and meaningful phrases. Repeating a value in a test is cheaper than making the reader jump to a helper to learn what the test depends on (P4).

- Every value the test depends on is visible in the test, or in a constant or fixture whose name says what it is, close by.
- Share setup that is truly irrelevant to the behavior. Do not share setup that carries the test's meaning.
- A helper that hides the one input that makes the test interesting is the wrong helper.

## Failure messages

A failing test should say what was expected, what happened, and enough context to find the cause (P16).

- Prefer asserts that print both sides (equality on a value) over bare truthiness checks.
- When the framework's default message loses context, add it: the input, the identifier, the state.
- Assert on the thing you care about. Checking that a list "is not empty" says little when the failure is a wrong item.

## Body shape

Use the same order in every test so a reviewer's eye lands on the same parts each time. Uniformity is the readability tool here: the reader pattern-matches instead of decoding.

1. Constants and stubs: the data the code reads.
2. Mock set-up: what each double returns or raises.
3. Act: one call.
4. Expected values: built as literals or from the stubs.
5. Result assertions: the return value first, then anything else not about doubles.
6. Interaction assertions: each mock's expected calls, in the order the code makes them, and that nothing else was called (P10).
7. Not-called assertions: doubles that must have stayed untouched.

Mocks are asserted together, each with its own block of expected calls. Checking "called once with these arguments" and "no other calls" in one shape is what keeps a wrong or extra call from passing.

## Argument and parameter order

When a test takes parameters (parametrized values, fixtures, doubles), list them in order of importance so reviews go faster:

1. Parametrized values, in the order the parametrization is declared.
2. Stubs: data objects supplied by fixtures.
3. The instance under test (a handler, a service). It usually has something doubled, but not always.
4. Mocks the test asserts on at the end.
5. Doubles the test needs but never asserts on (for example a patched HTTP client).

The order tells the reader which items the test is about, before they read the body.

## Sources

The body shape and argument order come from Joe's backend testing guide. The DAMP and behavior-first points paraphrase Google's *Software Engineering at Google* chapter 12 and its testing blog. Naming and one-behavior guidance is common to all the sources.
