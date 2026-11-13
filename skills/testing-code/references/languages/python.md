# Python testing mechanics

How to write the tests the [runbooks](../runbooks/unit.md) describe, in Python with pytest. Standards are in [testing-principles](../../../testing-principles/SKILL.md); the shape of a test body is the [test body template](../test-body-template.md). This page is the template for every other language page: the same thirteen sections, in the same order.

## Toolchain and verified versions

Versions below were checked on 2026-11-13 against PyPI and the tool's own docs. Re-check before you pin; the numbers move.

| Tool | Version | Python | Used for |
|---|---|---|---|
| pytest | 9.2.0 (released 2026-10-27) | 3.10+ | runner, fixtures, marks |
| pytest-mock | 3.17.0 | 3.10+ | `mocker` fixture |
| pretend | 1.0.9 (last release 2018) | pure Python | `stub` data objects |
| time-machine | 3.6.0 | 3.11+ | freezing time |
| freezegun | 1.5.5 | 3.8+ | freezing time |
| pytest-socket | 0.8.1 | 3.10+ | blocking the network |
| pytest-randomly | 5.1.0 | 3.11+ | random order and seeding |
| pytest-random-order | 1.2.0 | 3.9+ | opt-in random order |
| pytest-asyncio | 1.5.0 | 3.10+ | async tests on asyncio |
| anyio | 4.16.0 | 3.10+ | async tests on asyncio or trio |
| pytest-xdist | 3.8.0 | 3.9+ | parallel runs |
| pytest-timeout | 2.4.0 | 3.7+ | hang guard |
| coverage.py | 7.17.3 | 3.11+ | line and branch coverage |
| pytest-cov | 7.1.0 | 3.9+ | coverage inside pytest |
| hypothesis | 6.170.15 | 3.11+ | property-based tests |
| mutmut | 3.8.1 | 3.10+ | mutation testing |
| factory_boy | 3.3.3 | 3.8+ | factories |
| polyfactory | 3.5.0 | 3.9+ | type-driven factories |

pytest 9 behaviors this page relies on, each from the pytest docs and changelog:

- `strict = true` (added in 9.0) turns on `strict_config`, `strict_markers`, `strict_xfail` and `strict_parametrization_ids` together. An individual option you set explicitly wins over `strict`. The docs warn that new strictness options join the umbrella later, so enable it only with a pinned or locked pytest.
- A native TOML table, `[tool.pytest]`, has been supported since 9.0. The older `[tool.pytest.ini_options]` still works.
- From 9.2, the `indirect`, `ids` and `scope` arguments of `parametrize` are keyword-only. Passing them positionally raises a `TypeError`.
- `yield_fixture` is scheduled for removal in pytest 10 or 11. Use `@pytest.fixture` with `yield`.

A minimal `pyproject.toml` for a new project:

```toml
[tool.pytest]
testpaths = ["tests"]
addopts = ["--import-mode=importlib", "-ra"]
strict = true
```

Run the suite with `uv run pytest` (or `python -m pytest`). `-ra` prints a summary of everything that was not a plain pass, including skips and xfails, so quarantined tests stay visible.

## Layout and naming

Use a `src/` layout and keep tests outside the package:

```text
pyproject.toml
src/orders/__init__.py
src/orders/service.py
tests/conftest.py
tests/unit/test_service.py
tests/integration/conftest.py
tests/integration/test_service_db.py
```

- Name files `test_*.py`, functions `test_*`, classes `Test*` with no `__init__`. Name each test for the behavior: `test_place_order_sends_receipt_after_charge`, not `test_place_order_1`.
- Use `--import-mode=importlib`. The pytest docs describe it as importing test modules without changing `sys.path`, so test file names do not need to be unique and no `__init__.py` files are required under `tests/`. The cost is that test modules do not rely on importing each other, so a `tests/helpers.py` is not importable by name. Fixtures are unaffected because tests never import `conftest.py`. Put helpers that tests import directly inside the package, for example `src/orders/testing/`, or expose them as fixtures.
- With `src/` layout, install the project into the environment (`uv sync`) so tests import the installed package, not the working directory.
- Mirror the package in `tests/unit/`. A kind-specific directory (`tests/integration/`) is how you scope fixtures and markers; see the conftest section below.

## Fixtures, setup, teardown

A fixture is a function decorated with `@pytest.fixture` that a test requests by naming it as a parameter. Use `yield` for teardown; code after the `yield` runs even when the test fails.

```python
import pytest


@pytest.fixture
def upload_dir(tmp_path):
    directory = tmp_path / "uploads"
    directory.mkdir()
    yield directory
```

- Scope defaults to `function`, which gives each test a fresh object (P13). Widen to `module` or `session` only for state that is expensive to build and read-only afterwards. A wider fixture must never be mutated by a test.
- Request `tmp_path` for a per-test temporary directory (a `pathlib.Path`). pytest keeps the directories of the last 3 runs by default, so you can inspect a failure; `tmp_path_retention_count` and `tmp_path_retention_policy` change that. Use `tmp_path_factory` for a wider scope.
- Prefer a fixture over `setup_method`/`teardown_method`. A fixture names what it provides; a setup method hides it.
- Avoid `autouse=True` except for safety nets that every test needs (blocking the network, resetting a global). An autouse fixture that creates data makes the test body unreadable (see [values defined far from the test](../code-smells.md#values-defined-far-from-the-test)).
- Fixtures can be methods on a test class. The class then holds the constants the fixtures and the test share, which keeps expected values next to the code that uses them:

```python
import pytest
from pretend import stub


class TestPlaceOrder:
    customer_email = "ada@example.com"
    total_cents = 4200

    @pytest.fixture
    def charge(self):
        return stub(id="ch_123", status="succeeded")
```

The [fixtures runbook](../runbooks/fixtures.md) has the steps for deciding what a fixture should build.

### conftest.py

`conftest.py` is a per-directory file that pytest loads on its own. Nothing imports it.

- **Where it lives.** At `tests/conftest.py` for anything the whole suite shares, and in a subdirectory (`tests/integration/conftest.py`) for anything only that directory needs. Fixtures defined in a `conftest.py` are visible to every test in that directory and below, and invisible to its siblings.
- **Overriding.** A fixture with the same name in a nearer `conftest.py`, or in the test module itself, overrides the farther one for the tests under it. Use this to swap a real database fixture for a stub in `tests/unit/` without touching the shared one. The pytest docs cover overriding at directory, module and parametrization level.
- **What belongs there.** Fixtures used by more than one test module, hook implementations (`pytest_configure`, `pytest_collection_modifyitems`, `pytest_addoption`), and marker registration. Hooks can only live in a `conftest.py` or a plugin.
- **What stays in the test module.** A fixture used by one module or one class, and every constant a test asserts against. Move a fixture up only when a second module needs it.
- **Scoping across directories.** Put the widest fixtures at the root and the narrowest at the leaf. A `session` fixture in the root `conftest.py` is created once per run (once per worker under xdist). A `function` fixture next to the tests that use it is easiest to read.
- **`pytest_plugins`.** Declare it only in the top-level `conftest.py`; pytest raises an error for it in any other `conftest.py`. When the file grows, split fixtures into modules under `tests/fixtures/` or in the package, and list them in `pytest_plugins`.
- **Keep it small.** A `conftest.py` that mixes ten unrelated fixtures hides what each test depends on. Once a reader can no longer hold the file in their head, move fixtures down to the directory that uses them, or into plugin modules named for what they provide.
- **Do not import from it.** `from tests.conftest import x` couples a test to the file and breaks under `importlib` mode. Make `x` a fixture.

A minimal root `tests/conftest.py` that registers a marker and applies it by directory. The `engine` fixture lives in `tests/integration/conftest.py`, so a unit run never imports `sqlalchemy`:

```python
import pytest


def pytest_configure(config):
    config.addinivalue_line("markers", "integration: needs a real database")


def pytest_collection_modifyitems(config, items):
    integration_dir = config.rootpath / "tests" / "integration"
    for item in items:
        if item.path.is_relative_to(integration_dir):
            item.add_marker(pytest.mark.integration)
            item.add_marker(pytest.mark.enable_socket)
```

```python
# tests/integration/conftest.py
import pytest
from sqlalchemy import create_engine


@pytest.fixture(scope="session")
def engine():
    return create_engine("postgresql+psycopg://localhost/app_test")
```

With `strict = true`, every marker a test uses must be registered, so the `pytest_configure` line (or the `markers` ini option) is required, not optional. The `enable_socket` mark is registered by pytest-socket, and it lifts the suite-wide socket block (see the network section below) for the integration directory.

## Doubles: stub, mock, autospec equivalent, fake

Choose the kind of double by what the test asserts (see [doubles](../../../testing-principles/references/doubles.md) for the principle). A stub supplies data. A mock is an object the test asserts calls on. A fake is a small working replacement.

### Stub: `pretend.stub`

Use `stub` for data. It responds only to the attributes you gave it, so reading an attribute the code was never meant to read raises `AttributeError` instead of returning a silent `Mock`.

```python
import pytest
from pretend import stub

charge = stub(id="ch_123", status="succeeded")

assert charge.id == "ch_123"
with pytest.raises(AttributeError):
    charge.refunded
```

- Give a stub only the attributes the code under test reads. The stub then documents the interface the test needs.
- Most database rows and value objects are best as stubs. Most handlers, services and clients are best as mocks whose methods return stubs.
- `pretend` has not had a release since 2018. It is pure Python and still works, but if you would rather not depend on it, `types.SimpleNamespace(id="ch_123")` behaves the same for this purpose.
- A bare `mock.Mock()` standing in for data accepts any attribute, so a typo or a renamed field passes silently.

### Mock: `mocker` and autospec

`pytest-mock` supplies the `mocker` fixture. It wraps `unittest.mock` and undoes every patch when the test ends, so you never write a `with` block or a manual `stop`. It also exposes the `unittest.mock` names (`mocker.call`, `mocker.ANY`, `mocker.sentinel`, `mocker.NonCallableMock`, `mocker.create_autospec`), so one fixture replaces the imports.

Build every mock from the real signature. A bare `Mock()` accepts any call, including calls with the wrong arguments and calls to methods that do not exist; a renamed method keeps the test green while production breaks ([stale doubles](../code-smells.md#stale-doubles)). Autospec fixes that: attribute access and call signatures are checked against the real object, and a wrong call raises.

```python
# class body elided: these fixtures are methods of a test class
@pytest.fixture
def payment_gateway_mock(self, mocker):
    gateway = mocker.create_autospec(PaymentGateway, instance=True)
    gateway.client = mocker.NonCallableMock()
    return gateway
```

- `create_autospec(Cls, instance=True)` returns a non-callable mock shaped like an instance of `Cls`. Without `instance=True`, you get a mock of the class itself, which is callable and returns another specced mock. Pass a constructed instance instead of the class when you need attributes that only `__init__` sets.
- Autospec is recursive. An attribute the real object receives at runtime (injected by a decorator, a descriptor or a setup call) cannot be introspected and makes the mock complain. Replace that one attribute with `mocker.NonCallableMock()`, as the `client` line above does. The attribute name is arbitrary; use whichever one your class has.
- For a function or a method, use `mocker.patch("package.module.name", autospec=True)`.
- Autospecing an `async def` method gives a mock whose calls you await.
- Patch where the name is looked up, not where it is defined. If `orders/service.py` does `from payments import PaymentGateway`, patch `orders.service.PaymentGateway`.
- When the code under test instantiates the class itself, patch the class with the instance mock as its return value:

```python
# class body elided, as above
@pytest.fixture
def payment_gateway_mock(self, mocker):
    gateway = mocker.create_autospec(PaymentGateway, instance=True)
    gateway.client = mocker.NonCallableMock()
    mocker.patch("orders.service.PaymentGateway", return_value=gateway)
    return gateway
```

If the code also calls class methods, create a class mock too: `klass = mocker.create_autospec(PaymentGateway)`, set `klass.return_value = instance_mock`, and patch the name with `klass`. Skip the class mock when the instance is all the code uses.

- Never nest mocks you created separately. This is house style, and it has two real costs. A separately built child carries no spec, so a call with the wrong arguments or a misspelled method is accepted. And the parent records the child's calls only when the child is unnamed and not already attached to another mock. Create one mock that covers the children you need and set `return_value` or `side_effect` on the child attributes:

```python
# avoid
logic = mocker.Mock()
logic.users = mocker.Mock(get=mocker.Mock(return_value=user))
service.logic = logic

# prefer
service_mock = mocker.create_autospec(UserService, instance=True)
service_mock.get_user.return_value = user
```

The recording rule, run on Python 3.15.2 on 2026-11-13:

```python
parent = mock.Mock()
parent.users = mock.Mock(name="users")      # child has a name
parent.users.get(1)
parent.mock_calls                            # []

other = mock.Mock()
parent = mock.Mock()
parent.users = other.users                   # child already belongs to `other`
parent.users.get(1)
parent.mock_calls                            # []
other.mock_calls                             # [call.users.get(1)]

parent = mock.Mock()
parent.users = mock.Mock()                   # unnamed, unattached child
parent.users.get(1)
parent.mock_calls                            # [call.users.get(1)]
```

An exact-call assertion on the parent passes while a named or reused child's calls are missing from it. The unnamed case records fine, so the gap appears only once someone adds a `name=` or shares the child.

- `mocker.spy(module, "func")` keeps the real function and records calls, with `spy_return` holding the last result. Use it when the real behavior is fine and you only need to see the calls.
- Expected values live as named constants on the test class (`customer_email`, `total_cents`), not inline in the fixture and the assert separately. The fixture and the assert then use the same name, and the [constants block](../test-body-template.md) of the test body reads them.

### Argument order

List the parameters of a test in order of importance, so a reviewer finds the same kind of thing in the same place every time:

1. Parametrized arguments, in the order of the decorator stack.
2. Stubs (data objects) from fixtures.
3. The subject under test, such as a service or handler. It often has something mocked, but not always.
4. Mocks the test asserts on, the ones that appear in `assert_calls_on` or `assert_not_called` at the end.
5. Fixtures and mocks the test needs but never asserts on, for example the patch that stops an HTTP request.

```python
def test_place_order_applies_member_discount(
    self,
    is_member,
    customer,
    order_service,
    payment_gateway_mock,
    mailer_mock,
    http_blocker,
):
```

### Asserting calls: `assert_calls_on`

`assert_calls_on` is a snippet to copy into your own test-support module, not a package to install. It is the exact-call rule from the [test body template](../test-body-template.md) in one helper: the listed calls must appear on the mock in that order with nothing between them, and with `exact_count=True` the mock may have received no other call.

```python
from unittest.mock import NonCallableMock, _Call


def assert_calls_on(
    mock_obj: NonCallableMock,
    calls: list[_Call],
    exact_count: bool = False,
) -> None:
    """Assert that `calls` were made on `mock_obj`, in order.

    `calls` is a list of `unittest.mock.call` objects. They must appear in
    `mock_obj.mock_calls` as one contiguous run, in the order given.

    With `exact_count=True`, also assert that `mock_obj` received no other calls.
    """
    mock_obj.assert_has_calls(calls)

    if exact_count:
        actual = len(mock_obj.mock_calls)
        assert actual == len(calls), (
            f"expected exactly {len(calls)} calls on {mock_obj!r}, got {actual}:\n"
            f"{mock_obj.mock_calls}"
        )
```

Usage, with the mock from a fixture:

```python
from unittest.mock import call

assert_calls_on(
    payment_gateway_mock,
    [call.charge(card_token, total_cents)],
    exact_count=True,
)
```

- `mock_calls` records calls on child attributes, so `call.charge(...)` keeps the method name with the call. That is why the list reads like the production code.
- An autospecced mock is still a `MagicMock`. An unset method return value is another `MagicMock`, and truthiness, `str()` or iteration of it records a magic-method call on the parent: after `if gateway.is_ready(): ...`, `mock_calls` holds `call.is_ready()` and `call.is_ready().__bool__()`. Give each method the code branches on a concrete `return_value` before using `exact_count=True`, as the decorator example below does. Leave `exact_count` off only for a mock whose return value the code turns into a string.
- A mock that must stay untouched gets `mock.assert_not_called()` (the last block of the template). To say that nothing at all happened on a mock with children, assert `mock.mock_calls == []`.

### Fake

A fake is a small, working stand-in: an in-memory repository, a `dict`-backed cache, an `io.BytesIO` for an HTTP response body. Use one when the test cares about the outcome, not the calls, and when a mock would restate the implementation ([change-detector tests](../code-smells.md#change-detector-tests)). Keep it small enough to read next to the real thing, and test it against the same contract when it stands in for a boundary.

```python
class InMemoryOrders:
    def __init__(self):
        self.rows = {}

    def save(self, order):
        self.rows[order.id] = order

    def get(self, order_id):
        return self.rows[order_id]
```

`urllib.request.urlopen` returns an object that works as a context manager and has `.read()`, so `io.BytesIO(b'{"ok": true}')` is a drop-in response body when you patch it.

### Decorated code

A decorator is tested by decorating a plain function and patching the collaborator where the decorator looks it up. The inner function is a stub returning a sentinel, so the test asserts on what the decorator did around it.

The decorator under test, in `orders/auth.py`:

```python
import functools


class PermissionService:
    def has_scope(self, user_id, scope):
        raise NotImplementedError


def require_scope(scope):
    def decorator(view):
        @functools.wraps(view)
        def wrapper(*args, user_id=None, **kwargs):
            if not PermissionService().has_scope(user_id, scope):
                raise PermissionError(scope)
            return view(*args, user_id=user_id, **kwargs)

        return wrapper

    return decorator
```

The test, with `assert_calls_on` saved in `src/orders/testing.py` as the layout section suggests. The fixture gives `has_scope` a concrete `return_value`, so the `if` in the decorator records no `__bool__` call and `exact_count=True` holds:

```python
from unittest.mock import call, sentinel

import pytest
from orders.auth import PermissionService, require_scope
from orders.testing import assert_calls_on


class TestRequireScope:
    scope = "orders:write"

    @staticmethod
    def view(*args, user_id=None, **kwargs):
        return sentinel.view_result

    @pytest.fixture
    def decorated_view(self):
        return require_scope(self.scope)(self.view)

    @pytest.fixture
    def permissions_mock(self, mocker):
        permissions = mocker.create_autospec(PermissionService, instance=True)
        permissions.has_scope.return_value = True
        mocker.patch("orders.auth.PermissionService", return_value=permissions)
        return permissions

    def test_calls_view_when_scope_granted(self, decorated_view, permissions_mock):
        user_id = 7

        result = decorated_view(user_id=user_id)

        assert result == sentinel.view_result

        assert_calls_on(
            permissions_mock,
            [call.has_scope(user_id, self.scope)],
            exact_count=True,
        )

    def test_rejects_user_without_scope(self, decorated_view, permissions_mock):
        permissions_mock.has_scope.return_value = False

        with pytest.raises(PermissionError, match=self.scope):
            decorated_view(user_id=7)
```

Run on pytest 9.2.0 with pytest-mock 3.17.0: both tests pass. Delete the `return_value = True` line and the first fails with `expected exactly 1 calls ... got 2`.

## Parametrization

`@pytest.mark.parametrize` runs one test body over several cases, one row per case. It replaces a loop in a test (P3, [logic in tests](../code-smells.md#logic-in-tests)). Write the expected value as a literal in each row, never computed.

```python
@pytest.mark.parametrize(
    "cents, expected",
    [
        pytest.param(0, "$0.00", id="zero"),
        pytest.param(5, "$0.05", id="under-a-dollar"),
        pytest.param(123456, "$1,234.56", id="thousands-separator"),
    ],
)
def test_format_price(cents, expected):
    assert format_price(cents) == expected
```

- Give rows readable ids with `pytest.param(..., id=...)`. The failure then names the case. `strict_parametrization_ids` (part of strict mode) turns duplicate ids into an error instead of silently suffixing them.
- Parameters come first in the signature, in decorator order, then the rest in the order below.
- Pass `indirect`, `ids` and `scope` by keyword. From pytest 9.2 a positional use is an error.
- **Stacked decorators** run the cartesian product of the lists. Two lists of two make four tests; use it when the dimensions are truly independent, and keep the lists short because the count multiplies.

```python
@pytest.mark.parametrize("is_member", [True, False])
@pytest.mark.parametrize("has_coupon", [True, False])
def test_checkout_total_is_shown(is_member, has_coupon):
    ...
```

A stacked test whose expected value depends on the combination ends up with an `if` in the assert. When that happens, list the combinations as explicit rows instead.

### Indirect parametrization (advanced)

This is supported by pytest and is useful when the thing you vary is an object a fixture builds, but it is the hardest form to read. Reach for it only after plain rows stop being enough, and expect a reviewer to need the comment that explains which fixture each parameter feeds.

`indirect=True` sends the parameter value to the fixture of the same name as `request.param`, rather than to the test body. The fixture turns it into the object.

```python
import pytest
from pretend import stub


class TestPlaceOrder:
    member_cases = [
        stub(email="ada@example.com", is_member=True, discount_cents=500),
        stub(email="bo@example.com", is_member=False, discount_cents=0),
    ]
    cart_cases = [
        stub(items=["book"], subtotal_cents=2000),
        stub(items=["book", "pen"], subtotal_cents=2300),
    ]

    # customer_factory is the project's own factory fixture (see the data section)
    @pytest.fixture
    def customer(self, request, customer_factory):
        return customer_factory.create(
            email=request.param.email,
            is_member=request.param.is_member,
        )

    @pytest.fixture
    def cart(self, request):
        return request.param

    # "customer" feeds the customer fixture, "cart" feeds the cart fixture:
    # each value arrives there as request.param, not in the test body.
    @pytest.mark.parametrize(
        "cart", cart_cases, indirect=True, ids=["one-item", "two-items"]
    )
    @pytest.mark.parametrize(
        "customer", member_cases, indirect=True, ids=["member", "non-member"]
    )
    def test_order_is_confirmed(self, customer, cart, order_service):
        result = order_service.place(customer, cart)

        assert result.status == "confirmed"
```

- Pass `indirect=["x"]` to route only some of the names to fixtures; the rest stay plain parameters.
- The decorator runs when the class body is executed, so its lists can only use module-level names and class attributes, not other fixtures. Define the lists on the class, as above.
- Each stacked decorator multiplies the test count, and the combined cases are only as readable as the ids. Add `ids=` to every list, as the example does.
- Assert on a literal that holds for all the combinations. If the expected result differs per case, carry the expected value inside the parameter object, not in an `if` in the test.
- Prefer separate, named fixtures when you only have two or three variants. They read better and fail with a clearer name.

## Determinism: time, randomness, network, ordering

A test that reads the clock, the random generator, the network or the order of its neighbors will flake on some machine. The principles are in [testing-principles](../../../testing-principles/SKILL.md); these are the Python tools.

### Time

Four options, in order of preference:

1. **Inject a clock.** Give the code a `now` callable (or a clock object) as a parameter with a real default, and pass a fixed one in the test. It needs no library, works under threads and async, and shows the dependency in the signature.

```python
from datetime import datetime, timezone

from pretend import stub


def is_expired(token, now=lambda: datetime.now(timezone.utc)):
    return token.expires_at <= now()


def test_token_is_expired_at_its_expiry_time():
    expires_at = datetime(2026, 1, 1, tzinfo=timezone.utc)
    token = stub(expires_at=expires_at)

    result = is_expired(token, now=lambda: expires_at)

    assert result is True
```

2. **time-machine** when you cannot change the signature. It has a marker and a function-scoped fixture, and by default time keeps ticking from the destination (`tick=True`); pass `tick=False` to freeze it.

```python
import datetime as dt
import pytest


@pytest.mark.time_machine(dt.datetime(2026, 1, 1, tzinfo=dt.timezone.utc), tick=False)
def test_report_is_stamped_with_today():
    ...


def test_token_expires_after_an_hour(time_machine):
    time_machine.move_to(dt.datetime(2026, 1, 1, tzinfo=dt.timezone.utc))
    time_machine.shift(dt.timedelta(hours=1))
    ...
```

3. **freezegun** (`@freeze_time("2026-01-01")`) patches the `datetime` module and the `time` functions. It has the longer history and the bigger user base; its PyPI classifiers list Python up to 3.13 as of this check, so confirm your interpreter before choosing it for a new project.

4. **Fixed dates, when you can neither inject nor patch.** A date built as `datetime.now() - timedelta(days=30)` reads the real clock too, however wide the margin. Use literal dates far from the present on each side of the boundary, such as `datetime(2000, 1, 1)` for "long ago" and `datetime(3000, 1, 1)` for "far ahead". This protects the test from the real date drifting across the boundary, so the answer is the same on any day the test runs. It does not make the clock call inside the code under test deterministic. That call still reads real time, so a test that needs one exact instant needs one of the first three options.

Time is process-global: while it is frozen, every thread and coroutine sees it, and other processes (a database server) do not. Never leave a freeze active across tests; use the fixture or the marker, which undo it.

### Randomness

Do not call `random` in a way the test cannot control. Either inject the generator (`rng=random.Random(1234)`) or seed it. `pytest-randomly` resets `random.seed()` before each test's setup, run and teardown to a value derived from a base seed and the test id, and it also reseeds factory_boy, Faker and Model Bakery when installed. It prints the base seed at the start of a run, and `--randomly-seed=<value>` repeats a run.

### Network

Block the network for the whole suite and allow it per test where a kind needs it:

```toml
[tool.pytest]
addopts = ["--disable-socket", "--allow-unix-socket"]
```

`pytest-socket` also gives the `socket_enabled` fixture, the `enable_socket` mark, and `--allow-hosts=127.0.0.1` for local services. The suite-wide block applies to fixtures too, so a session-scoped integration `engine` fixture would fail on its first connection. The `enable_socket` mark that `pytest_collection_modifyitems` adds to everything under `tests/integration` (see the conftest section) lifts the block there. If you would rather not add a plugin, an autouse fixture is a coarser substitute:

```python
@pytest.fixture(autouse=True)
def no_network(monkeypatch):
    def refuse(self, *args, **kwargs):
        raise RuntimeError("network access in a test")

    monkeypatch.setattr("socket.socket.connect", refuse)
```

The fixture is coarser than pytest-socket. It blocks `connect` on every socket type and nothing else, so `connect_ex`, `sendto`, UDP and DNS lookups stay open, and there is no per-test opt-out.

With the network blocked, a unit test that calls the internet fails at once instead of passing on a good day. For a service you do control, run it locally in the integration kind instead of mocking the socket.

### Ordering

Run the suite in random order to find tests that depend on their neighbors ([shared mutable state](../code-smells.md#shared-mutable-state)).

- `pytest-randomly` shuffles by default once installed (modules, then classes, then functions) and prints its seed. Disable it for a run with `-p no:randomly`.
- `pytest-random-order` has been opt-in since 1.0: it does nothing until you pass `--random-order` (or a bucket option). Use it if you want shuffling only in CI.

When a shuffled run fails, rerun with the printed seed to reproduce the order, then bisect to the neighbor that leaks state.

### Reaching work the code does not expose

Code that starts a background thread or schedules an async task and gives you no handle makes a test either `sleep` or race. Choose in this order:

1. **Inject the executor or queue.** Accept it as a parameter, pass a synchronous one in the test, and nothing runs in the background.
2. **Patch the thread factory** so the target runs inline. The module under test imports the name it owns (`from threading import Thread`), and the test patches that name:

```python
def test_close_publishes_event(mocker, service):
    thread_mock = mocker.patch("service.Thread", autospec=True)

    service.close()

    target = thread_mock.call_args.kwargs["target"]
    target()
```

This works when the code passes `target` as a keyword; read it from `call_args.args` otherwise. Assert on the effect after calling `target()`, as in any other test. Patching `service.threading.Thread` replaces more than it appears to. `service.threading` is the global `threading` module, so every thread started anywhere in the process, including by libraries, gets the mock until the test ends. After `mock.patch("service.threading.Thread")`, `threading.Thread` is the mock; after `mock.patch("service.Thread")` it stays real. Patch a name the module owns, or inject the factory (option 1).

3. **Find and join the real thread.** When you cannot change the code, locate the worker and wait for it with a timeout rather than a sleep:

```python
import threading


def wait_for_worker(name, timeout_seconds=5):
    for thread in threading.enumerate():
        if thread.name == name:
            thread.join(timeout_seconds)
            assert not thread.is_alive(), f"worker {name} did not finish"
            return
    raise AssertionError(f"no thread named {name}")
```

For asyncio work, await the task instead of sleeping: `await asyncio.gather(*(asyncio.all_tasks() - {asyncio.current_task()}))`, or have the code expose an `asyncio.Event` the test waits on with `asyncio.wait_for(event.wait(), timeout=1)`. A fixed `sleep` is the [bare sleep](../code-smells.md#bare-sleeps) smell; a bounded wait on a condition is its fix.

## Isolation and cleanup

Every test starts from the same state and leaves nothing behind (P13).

- **`monkeypatch`** is built into pytest and undoes every change at the end of the test. Use it for environment, paths and simple attributes: `monkeypatch.setattr(obj_or_dotted_path, "name", value)`, `monkeypatch.setitem(mapping, "key", value)`, `monkeypatch.setenv("NAME", "value")`, `monkeypatch.delenv("NAME", raising=False)`, `monkeypatch.chdir(tmp_path)`, `monkeypatch.syspath_prepend(path)`. Use `mocker` when you need a mock object with call assertions; use `monkeypatch` when you only replace a value.
- **`tmp_path`** for files. Never write to the repository, the home directory or a fixed `/tmp` path.
- **Environment variables.** Set what the test needs with `setenv` and remove what it must not see with `delenv(raising=False)`, so a developer's shell does not change the result.
- **Module state.** A module-level cache or singleton that tests mutate is [shared mutable state](../code-smells.md#shared-mutable-state). Reset it in a fixture with `yield`, or patch it per test.
- **Order independence.** Run a shuffled pass (above) and a parallel pass (below) in CI; passing alone and failing together is the signature.
- **Prefer self-cleaning fixtures** (`mocker`, `monkeypatch`, `tmp_path`) over manual teardown or `try/finally` in the test body.
- A patch that outlives its test is a leak. The usual cause is a manual `mock.patch(...).start()` with no matching `stop()`; use `mocker.patch`, which stops it for you.

## Async

pytest does not run `async def` tests by itself; a plugin does.

**pytest-asyncio** (asyncio only). It has two modes, set with `asyncio_mode`:

- `strict` (the default): only tests marked `@pytest.mark.asyncio` and fixtures decorated with `@pytest_asyncio.fixture` are handled. This lets the plugin coexist with other async plugins.
- `auto`: every `async def` test and fixture is handled without markers. Simplest when the project uses asyncio only.

```toml
[tool.pytest]
asyncio_mode = "auto"
asyncio_default_fixture_loop_scope = "function"
```

Set `asyncio_default_fixture_loop_scope` explicitly so the event loop scope of fixtures does not depend on the plugin's default. A test and the fixtures it uses share a loop only when their loop scopes match; use `@pytest.mark.asyncio(loop_scope="module")` to share one deliberately.

**anyio** ships its own pytest plugin. Mark tests `@pytest.mark.anyio` (or set `anyio_mode = "auto"`), and parametrize the `anyio_backend` fixture to run on asyncio or trio. The anyio docs warn that its auto mode does not work while pytest-asyncio is installed in auto mode, so pick one plugin per project.

Rules that apply to both:

- Autospec of an `async def` method returns something awaitable. Set results with `return_value` or `side_effect` as with a sync mock.
- Wait on a condition, not on time (see [Reaching work the code does not expose](#reaching-work-the-code-does-not-expose)). A bounded `asyncio.wait_for(..., timeout=...)` makes a hang a failure instead of a stuck CI job.
- Do not freeze the clock for code that awaits `asyncio.sleep` unless your freezing tool is documented to handle the event loop; time-machine's docs warn that mocking time affects every concurrent coroutine and some do not tolerate it. Inject the clock instead.
- Add `pytest-timeout` (`--timeout=60`) as a backstop for deadlocks.

## Performance

Measure first ([slow tests runbook](../slow-tests.md)). The Python-specific levers:

- `pytest --durations=10` lists the slowest tests and setups. Fix the outliers before tuning anything else.
- **Parallel with pytest-xdist:** `pytest -n auto`. Each worker is a separate process with its own interpreter, so session-scoped fixtures run once per worker. The default `--dist load` sends tests to whichever worker is free; `loadscope` groups by module or class, `loadfile` by file, `loadgroup` by `xdist_group` mark, and `worksteal` rebalances when test durations vary a lot.
- **Isolation preconditions for xdist.** Tests must not share a database, a port, a fixed file path or a global resource, because two workers will run at once. Give each worker its own with the `worker_id` fixture (`"master"` when not parallel): a database named `app_test_{worker_id}`, a port offset, a temp directory from `tmp_path`.
- Widen a fixture's scope only for expensive, read-only setup; building a database schema once per session and rolling back per test is the standard use.
- Do not trade away determinism for speed: no real `sleep` to "make it pass faster", and no shared mutable fixtures across tests.
- Re-run only what failed while iterating: `pytest --lf` (last failed) or `--ff` (failed first). Run the full suite before you push.

## Coverage, mutation and property-based tools

**Coverage.** coverage.py with the `pytest-cov` plugin. Turn on branch coverage; line coverage alone passes an `if` whose else branch is never run.

```toml
[tool.coverage.run]
branch = true
source = ["orders"]

[tool.coverage.report]
show_missing = true
```

Run `pytest --cov --cov-report=term-missing`. Coverage shows what the suite never executed. It does not show whether the executed code is checked. Use the number to find gaps, not as a goal, and use mutation testing to check that tests assert something.

**Mutation: mutmut** (3.8.1). It needs `fork`, so on Windows run it inside WSL. Configure it in `pyproject.toml`:

```toml
[tool.mutmut]
source_paths = ["src/"]
pytest_add_cli_args_test_selection = ["tests/unit/"]
```

`mutmut run` mutates the code, reruns the tests and records which mutants survived. `mutmut browse` lets you inspect the survivors, and `mutmut run "orders.service*"` limits a run to matching names. A surviving mutant is a missing or weak assertion; add the test and rerun. The [mutation testing runbook](../runbooks/mutation-testing.md) has the procedure.

**Property-based: hypothesis** (6.170.15). Write the property a function always satisfies and let hypothesis search for a counterexample, which it then shrinks to a minimal case.

```python
from hypothesis import given, strategies as st


@given(st.lists(st.integers()))
def test_sorting_is_idempotent(values):
    once = sorted(values)

    assert sorted(once) == once
```

A found failure is stored in the example database and replayed on the next run. In CI, register a profile with `derandomize=True` so a run is repeatable, and keep a local profile with more examples. The [property-based runbook](../runbooks/property-based.md) covers choosing properties.

## Integration and data: factories, databases, rollbacks

Build test data with a factory, not a pre-baked fixture file. A factory creates a valid object with sensible defaults and takes overrides for the one value the test cares about ([values defined far from the test](../code-smells.md#values-defined-far-from-the-test)).

```python
from uuid import uuid4


class UserFactory:
    def __init__(self, session):
        self.session = session

    def create(self, **overrides):
        fields = dict(email=f"user-{uuid4().hex[:8]}@example.com", is_member=False)
        fields.update(overrides)
        user = User(**fields)
        self.session.add(user)
        self.session.flush()
        return user
```

Libraries:

- **factory_boy** (3.3.3): declarative factories with ORM integrations, such as `SQLAlchemyModelFactory` and `DjangoModelFactory`. pytest-randomly reseeds it per test.
- **polyfactory** (3.5.0): builds objects from type hints for dataclasses, Pydantic models, TypedDicts and msgspec structs, with no model class to declare twice. Good for data transfer objects.
- A hand-written factory like the one above is fine for a handful of models.

**A cleaned database per test.** Pick one of two approaches.

*Rollback per test* (preferred, fast). Open a connection and a transaction, bind the session to it, and roll back when the test ends. In SQLAlchemy 2.0, `join_transaction_mode="create_savepoint"` lets the code under test call `commit()` without committing the outer transaction.

```python
import pytest
from sqlalchemy.orm import Session


@pytest.fixture
def db_session(engine):
    connection = engine.connect()
    transaction = connection.begin()
    session = Session(bind=connection, join_transaction_mode="create_savepoint")
    yield session
    session.close()
    transaction.rollback()
    connection.close()
```

*Truncate after each test.* Use it when the code under test opens its own connections, so a surrounding transaction cannot see or contain its writes:

```python
@pytest.fixture(autouse=True)
def clean_database(request):
    yield
    if request.node.get_closest_marker("integration"):
        truncate_all_tables()
```

Rules for both:

- Run migrations once per session against a throwaway database, then rely on rollback or truncate per test.
- Under xdist, give each worker its own database (`worker_id`).
- Do not let a test depend on rows another test inserted. Create what you need through the factory in the test or its fixtures.
- Keep the real-database tests marked (`integration`) and register the mark, so unit runs can deselect them with `-m "not integration"`.

The [integration runbook](../runbooks/integration.md) has the steps.

## Anti-patterns

The shared list is in [code smells](../code-smells.md). The ones that show up most in Python suites:

- A bare `Mock()` for data, or a mock with no spec ([stale doubles](../code-smells.md#stale-doubles)). Use `stub` for data and `create_autospec` for behavior.
- Patching the definition site instead of the lookup site, then wondering why the real code runs.
- Asserting `mock.called` or `assert_called_once()` alone, which leaves the arguments and every other call unchecked ([tests that cannot fail](../code-smells.md#tests-that-cannot-fail)).
- Mocking every collaborator and asserting the order of internal calls ([change-detector tests](../code-smells.md#change-detector-tests)).
- A loop or `if` in the test body to compute the expected value ([logic in tests](../code-smells.md#logic-in-tests)). Parametrize with literals instead.
- `time.sleep` to wait for work ([bare sleeps](../code-smells.md#bare-sleeps)).
- Module-level lists, dicts, singletons or class attributes that tests mutate ([shared mutable state](../code-smells.md#shared-mutable-state)).
- Many unrelated autouse fixtures, or a huge `conftest.py`, that hide what a test depends on ([values defined far from the test](../code-smells.md#values-defined-far-from-the-test)).
- Importing underscore-prefixed functions, or patching private methods, to reach logic ([testing private internals](../code-smells.md#testing-private-internals)).
- Several acts and asserts in one test, or one test that spans create, update and delete ([one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors)). Stacked parametrization that multiplies unrelated dimensions is the same smell in a different shape.
- Twenty lines of mock setup for a three-line behavior ([over-specified or over-mocked setup](../code-smells.md#over-specified-or-over-mocked-setup)).
- Many assertions with no message and no structure ([assertion roulette](../code-smells.md#assertion-roulette)). Compare one expected object.
- `pytest.raises(Exception)` with no `match`. It passes on any failure, including a typo.
- A `skip` or `xfail` with no reason, owner or date.

### Quarantining a flaky test

The [quarantine runbook](../flakes/quarantine.md) decides whether to quarantine and which mechanism to use. The syntax:

```python
@pytest.mark.xfail(
    strict=False,
    raises=AssertionError,
    reason="flaky: depends on worker startup order, tracked in ORDERS-412, owner ada, review 2026-12-01",
)
def test_worker_publishes_event():
    ...


@pytest.mark.xfail(
    strict=True,
    reason="fails every run until the retry fix lands, tracked in ORDERS-418, owner ada, review 2026-12-01",
)
def test_retry_gives_up_after_three_attempts():
    ...
```

- `xfail` keeps the test running and reporting. A failure shows as XFAIL and does not gate.
- `strict=True` turns an unexpected pass (XPASS) into a failure. Use it for a test that fails on every run, so the day the fix lands the marker has to come off. For a test that is flaky, a pass is expected some of the time, so use `strict=False` and watch the XPASS count in the `-ra` summary, or run the quarantine marker in a separate non-gating job. The default comes from `strict_xfail` (included in `strict = true`).
- `raises=AssertionError` narrows the expected failure so a different exception still fails the run.
- `@pytest.mark.skip(reason="...")` or `@pytest.mark.skipif(condition, reason="...")` removes the test from the run entirely. Use it only when running the test has a cost (a paid service, shared state you cannot isolate), as the runbook says.
- `pytest.xfail("reason")` and `pytest.skip("reason")` inside a body stop the test at that point; prefer the markers, which are visible without running the test.
- Register a `quarantine` marker and select with `-m quarantine` for the non-gating job and `-m "not quarantine"` for the gate.

## Further reading

- [ECC python-testing skill](https://github.com/affaan-m/ECC/blob/main/skills/python-testing/SKILL.md) (MIT, Copyright Affaan Mustafa): a broad pytest cookbook covering fixtures, parametrization, markers, mocking, async, coverage and configuration. Nothing on this page is copied from it.
- [pytest good practices](https://docs.pytest.org/en/stable/explanation/goodpractices.html) and [import mechanisms and `rootdir`](https://docs.pytest.org/en/stable/explanation/pythonpath.html)
- [pytest fixtures](https://docs.pytest.org/en/stable/how-to/fixtures.html), [parametrize](https://docs.pytest.org/en/stable/how-to/parametrize.html), [monkeypatch](https://docs.pytest.org/en/stable/how-to/monkeypatch.html), [tmp_path](https://docs.pytest.org/en/stable/how-to/tmp_path.html) and [skip and xfail](https://docs.pytest.org/en/stable/how-to/skipping.html)
- [pytest configuration reference](https://docs.pytest.org/en/stable/reference/customize.html) and the [changelog](https://docs.pytest.org/en/stable/changelog.html)
- [pytest-mock usage](https://pytest-mock.readthedocs.io/en/latest/usage.html), [`unittest.mock.create_autospec`](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.create_autospec)
- [time-machine](https://time-machine.readthedocs.io/en/latest/), [pytest-socket](https://pypi.org/project/pytest-socket/), [pytest-randomly](https://pypi.org/project/pytest-randomly/), [pytest-xdist](https://pytest-xdist.readthedocs.io/en/stable/), [pytest-asyncio](https://pytest-asyncio.readthedocs.io/en/stable/) and [anyio testing](https://anyio.readthedocs.io/en/stable/testing.html)
- [coverage.py branch coverage](https://coverage.readthedocs.io/en/latest/branch.html), [hypothesis](https://hypothesis.readthedocs.io/en/latest/), [mutmut](https://pypi.org/project/mutmut/)
- [SQLAlchemy: joining a session into an external transaction](https://docs.sqlalchemy.org/en/20/orm/session_transaction.html)

Where it comes from: the `stub` over `Mock` rule, the autospec-with-`NonCallableMock` pattern, fixture-housed mocks with class constants, the argument order and the `assert_calls_on` helper are Joe Black's house style, from his backend testing guide, with the domain renamed. The rest is paraphrased from the tool documentation linked above and checked on 2026-11-13.
