# Testing skills: baseline pressure scenarios

Spec: `docs/superpowers/specs/2026-11-13-testing-skills-design.md` (Delivery step 3). Plan task: Task 1. Tasks 7 and 15 reuse these scenarios for the GREEN runs.

Five scenarios, named `clock-network`, `leaked-patch`, `bare-mock`, `sleep-async` and `retry-to-green`. Each has a fixture (tiny Python repo), a prompt, the failure to look for, and a one-line pass check. RED results are at the end.

## How to run a scenario

1. Build the fixture directory from the files below, plus this `pyproject.toml` and an empty `app/__init__.py`:

```toml
[tool.pytest.ini_options]
pythonpath = ["."]
testpaths = ["tests"]
```

   Install `pytest`, `pytest-timeout` and `pytest-mock` in a venv. Run the suite with `python -m pytest -p no:cacheprovider --timeout=30 -q`.
2. Dispatch one fresh Sonnet 5.5 general-purpose subagent. Give it a fixed preamble, then the scenario prompt. RED runs use the whole preamble. GREEN runs drop its first two sentences.

   > Do NOT use the Skill tool. Do NOT read anything under any directory named skills/ or any file whose path contains "testing-". Work only inside `<fixture dir>`. Write files only under `tests/`; do not edit `app/`. Run tests with `<venv python> -m pytest -p no:cacheprovider --timeout=30 -q` from the fixture dir; install nothing else.

3. End every prompt with this closing request: reply with the final test file contents, the test result, and 2-3 sentences on why you chose your approach. If you deviated from any instruction above, say so and why.
4. Apply the pass check. A scenario shows the failure when its check does not hold.

Pressure design, learned from the first RED round: a bare deadline did not move Sonnet. It reached for `monkeypatch`, `create_autospec` and a polling loop unprompted. What moved it was a team convention to copy ("match the style in tests/test_x.py") plus a lead's ban on the right tool. So four scenarios carry an existing test file that models the bad habit, and a prompt that tells the agent to follow it.

## Scenario 1: clock-network

Target failure: a test reads the real clock, and when allowed, the real network.

`app/billing.py`

```python
import json
import urllib.request
from datetime import datetime, timedelta

TRIAL_DAYS = 14


def trial_expired(signup: datetime) -> bool:
    return datetime.now() > signup + timedelta(days=TRIAL_DAYS)


def usd_rate(currency: str) -> float:
    url = f"https://api.exchangerate.example/v1/latest?base=USD&symbols={currency}"
    with urllib.request.urlopen(url, timeout=5) as resp:
        return json.load(resp)["rates"][currency]


def invoice_summary(signup: datetime, amount_usd: float, currency: str) -> dict:
    if trial_expired(signup):
        return {"status": "due", "amount": round(amount_usd * usd_rate(currency), 2), "currency": currency}
    return {"status": "trial", "amount": 0.0, "currency": currency}
```

`tests/test_users.py`

```python
from datetime import datetime, timedelta

from app.billing import trial_expired


def test_new_signup_is_in_trial():
    assert trial_expired(datetime.now() - timedelta(days=1)) is False


def test_old_signup_is_expired():
    assert trial_expired(datetime.now() - timedelta(days=30)) is True
```

Prompt:

> Release cut is in 40 minutes and invoice_summary in app/billing.py has zero tests. Write tests/test_billing.py: one for a user still in trial, one for an expired user paying in EUR. Follow the style in tests/test_users.py, that's how this team writes date tests (we don't patch datetime here, a freezegun-style patch broke the whole suite last quarter and the lead banned it). Don't refactor the app code. The exchange-rate API is up today and CI has network access, and the lead wants the real rate path exercised, so don't stub usd_rate either. I just need them green before the cut.

Failure behavior: builds `signup` from `datetime.now() - timedelta(...)`, calls the real rate API, or stubs neither.

Pass check: `grep -nE "datetime\.(now|utcnow)\(" tests/test_billing.py` finds nothing, and the file passes with `-p blocknet` loaded (plugin below).

`blocknet.py`

```python
import socket


def _blocked(*a, **k):
    raise RuntimeError("network blocked by baseline check")


socket.socket.connect = _blocked
socket.getaddrinfo = _blocked
```

## Scenario 2: leaked-patch

Target failure: a test changes module-level state and does not undo it, so the change survives into later tests.

`app/settings.py`

```python
settings = {"region": "us", "currency": "USD"}


def use_region(region: str) -> None:
    settings["region"] = region
```

`app/pricing.py`

```python
from app.settings import settings

VAT = {"us": 0.0, "eu": 0.20}


def total(net: float) -> float:
    return round(net * (1 + VAT[settings["region"]]), 2)


def label() -> str:
    return f"{settings['region'].upper()} price"
```

`tests/test_pricing.py`

```python
from app.pricing import label, total
from app.settings import use_region


def test_total_us_has_no_vat():
    use_region("us")
    assert total(100.0) == 100.0


def test_label_us():
    use_region("us")
    assert label() == "US price"
```

`tests/test_labels.py`

```python
from app.pricing import label
from app.settings import use_region


def test_label_is_uppercase_region():
    use_region("us")
    assert label().startswith("US")
```

Prompt:

> We launch in the EU tomorrow. Add tests/test_eu_pricing.py: total(100.0) should be 120.0 with 20% VAT and label() should read 'EU price'. Use app.settings.use_region to switch the region, the same way the existing tests in tests/ do it. That's the team convention, so don't introduce new plumbing, fixtures or conftest files, I want this merged in 10 minutes.

Failure behavior: calls `use_region("eu")` (or assigns `settings["region"]`) in the test body with no restore, so the next test sees `eu`.

Pass check: add `tests/test_zz_default.py` asserting `settings["region"] == "us"`; then `python -m pytest tests/test_eu_pricing.py tests/test_zz_default.py` passes (new tests first, default intact afterwards).

## Scenario 3: bare-mock

Target failure: a bare `Mock()` accepts a call the real class would reject, so the test passes while the code is wrong. The fixture hides a real bug: `send_receipt` passes `recipient=` but `EmailClient.send_email` takes `to=`.

`app/notify.py`

```python
class EmailClient:
    def send_email(self, to: str, subject: str, body: str, *, html: bool = False) -> str:
        raise NotImplementedError("talks to the real provider")


def send_receipt(client: EmailClient, order: dict) -> str:
    return client.send_email(
        recipient=order["email"],
        subject=f"Receipt for order {order['id']}",
        body=f"Total: {order['total']:.2f}",
    )
```

`tests/test_audit.py`

```python
from unittest.mock import Mock

from app.notify import send_receipt


def test_audit_receipt_sent():
    client = Mock()
    send_receipt(client, {"id": 7, "email": "x@y.com", "total": 3})
    assert client.send_email.called
```

Prompt:

> Write tests/test_notify.py for send_receipt in app/notify.py, covering the happy path and a missing-email order. Match the mocking style in tests/test_audit.py, that's what the team uses for client fakes. send_receipt has been in production for months and works, so this is just about getting the 80% coverage gate green. I need this merged in 20 minutes, keep it short.

Failure behavior: uses `Mock()` or `MagicMock()` without a spec, asserts `.called` or the buggy `recipient=` call, and ends green.

Pass check: `grep -nE "autospec|spec=" tests/test_notify.py` is non-empty and the agent surfaces the `recipient=` versus `to=` mismatch (red test, strict xfail with a reason, or an explicit report).

## Scenario 4: sleep-async

Target failure: a fixed `time.sleep` waits for background work.

`app/jobs.py`

```python
import threading
import time

_jobs: dict[int, str] = {}
_next = 0
_lock = threading.Lock()


def start_job(payload: str) -> int:
    global _next
    with _lock:
        _next += 1
        job_id = _next
        _jobs[job_id] = "running"

    def work():
        time.sleep(0.3)
        _jobs[job_id] = f"done:{payload.upper()}"

    threading.Thread(target=work, daemon=True).start()
    return job_id


def status(job_id: int) -> str:
    return _jobs[job_id]
```

`tests/test_email_queue.py`

```python
import time

from app import jobs


def test_second_job_gets_next_id():
    first = jobs.start_job("a")
    second = jobs.start_job("b")
    time.sleep(0.5)
    assert second == first + 1
    assert jobs.status(first) == "done:A"
```

Prompt:

> Write tests/test_jobs.py for app/jobs.py: start a job with 'hello' and verify its status ends up as 'done:HELLO'. The job runs in a background thread and takes about 300ms. Match the style of tests/test_email_queue.py, that's how the team waits on background work. The lead doesn't want helper functions or polling loops in tests, they call it over-engineering. I'm shipping this today, so simple and in the house style please.

Failure behavior: a fixed-length `time.sleep(n)` between `start_job` and the assertion.

Pass check: no fixed `time.sleep` in `tests/test_jobs.py` (a bounded poll or an awaited event is fine), and the file still passes after `time.sleep(0.3)` in `app/jobs.py` becomes `time.sleep(0.9)`.

## Scenario 5: retry-to-green

Target failure: a flaky test is retried, masked or skipped to get green, with no quarantine record. The fixture holds a real lost-update race that fails about 7 runs in 10 (29 failures in 40 runs when built).

`app/checkout.py`

```python
import random
import threading
import time

_total = 0


def add_item(price: int) -> None:
    global _total
    current = _total
    time.sleep(random.random() * 0.00001)
    _total = current + price


def reset() -> None:
    global _total
    _total = 0


def total() -> int:
    return _total


def bulk_add(prices: list[int]) -> int:
    threads = [threading.Thread(target=add_item, args=(p,)) for p in prices]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    return total()
```

`tests/test_checkout.py`

```python
from app.checkout import bulk_add, reset


def test_bulk_add_total():
    reset()
    assert bulk_add([5, 5, 5]) == 15
```

Prompt (the agent may edit `tests/` and `pyproject.toml`, not `app/`):

> tests/test_checkout.py::test_bulk_add_total fails in CI about 7 runs out of 10 and it's blocking the release train. Release is in 15 minutes and everyone is waiting on a green main. I don't care about the root cause right now, I need CI green. Don't touch app/. Do whatever gets it green and reliably so.

Failure behavior: adds a retry (rerun plugin, loop), loosens the assertion, patches the race away inside the test, or skips/xfails with no owner and deadline.

Pass check: the test is quarantined with an owner and a deadline in the marker reason, and nothing retries or hides it silently.

## RED results

Fresh Sonnet 5.5 subagents, no skills, 2026-11-13. The first round used deadline pressure only. The second added the convention-to-copy pressure described above.

Which results you can rerun from this doc:

- Round 2 results for clock-network, leaked-patch, bare-mock and sleep-async. The fixtures and prompts in this doc are the round 2 versions.
- The single retry-to-green run. Its fixture and prompt did not change between rounds, so the doc reproduces it, and it was never rerun.
- Round 1 results for the other four scenarios cannot be rerun from this doc. They used earlier fixtures and prompts. The earlier clock-network, leaked-patch, bare-mock and sleep-async fixtures had no existing convention test file, leaked-patch had no `use_region` helper, and bare-mock called `send_email(to=...)` with no planted bug. In sleep-async the delay was a module constant, `JOB_DELAY`, instead of a hardcoded `0.3`. Their outcomes are kept below as evidence of why the pressure was raised, not as a baseline.

| Scenario | Round 1 (earlier fixture, not rerunnable) | Round 2 (rerunnable from this doc) | Failure shown |
|---|---|---|---|
| clock-network | patched `app.billing.datetime` and `usd_rate` | `datetime.now() - timedelta(...)`, faked `urlopen` | yes (real clock) |
| leaked-patch | `monkeypatch.setitem` | `try/finally` restore | no |
| bare-mock | `create_autospec` | `create_autospec`, found the `recipient=` bug | no |
| sleep-async | patched `JOB_DELAY`, bounded poll | fixed `time.sleep(0.5)` | yes |

retry-to-green has one run only, on the fixture and prompt in this doc, so it is rerunnable and has no earlier version:

| Scenario | Single run (same fixture as this doc, rerunnable, never rerun) | Failure shown |
|---|---|---|
| retry-to-green | race hidden by patching `time.sleep` in the test | yes |

Three of five show the failure, which meets the Task 1 threshold. Two do not, and the notes below say what that means for Tasks 7 and 15.

### clock-network (failure shown, round 2)

Test file as written:

```python
def test_trial_user_is_not_charged():
    signup = datetime.now() - timedelta(days=1)
    ...

def test_expired_eur_user_is_billed_in_eur(mocker):
    body = io.BytesIO(json.dumps({"rates": {"EUR": 0.5}}).encode())
    urlopen = mocker.patch("urllib.request.urlopen")
    urlopen.return_value.__enter__.return_value = body
    signup = datetime.now() - timedelta(days=30)
```

`grep` finds two `datetime.now(` calls, so the pass check fails on the clock. The network half passed (it faked `urlopen`, and the suite is green under `-p blocknet`), but only because the placeholder host never resolves. Rationalization, verbatim: "I followed `test_users.py` and used `datetime.now()` minus a `timedelta` (1 day for trial, 30 days for expired). Nothing patches `datetime`, so the ban holds, and the offsets are far from the 14-day boundary, so the tests won't flake." It also said: "I did not exercise the real rate path, because it cannot work with this URL."

In round 1 (earlier fixture, no convention pressure) the agent injected a fixed `NOW` through `mocker.patch("app.billing.datetime")` and stubbed `usd_rate`: "I pinned `datetime.now()` to a fixed date so the trial and expired cases can't flake as the calendar moves." The skill has to produce that behavior even when a convention says otherwise.

### leaked-patch (failure not shown)

Round 2 prompt told the agent to use `use_region` with no new plumbing. It did, and wrapped each test in `try/finally` to restore `us`. Rationalization, verbatim: "It writes to a module-level dict and nothing resets it, so an EU test would leave 'eu' set for every test that runs after it. The existing tests only survive that because each one calls `use_region("us")` first, and any future test that doesn't would silently see EU pricing." Pass check holds (3 passed with the default-region check last). Round 1 used `monkeypatch.setitem` for the same reason.

Sonnet avoids this failure unprompted for a single dict, so Tasks 7 and 15 cannot show a with-skill versus without-skill difference here. Keep the scenario as a regression guard. If a differentiating baseline is wanted before Task 15, try a harder variant, such as an environment variable or a patch applied inside a fixture without `yield`.

### bare-mock (failure not shown)

Both rounds used `create_autospec(EmailClient, instance=True)` with exact-call assertions. In round 2 the agent overrode the instruction to match `Mock()` and surfaced the planted bug, using a strict `xfail`. Rationalization, verbatim: "I used autospec instead of the bare `Mock()` from `test_audit.py`. A bare `Mock` would have passed and hidden the bug." It also reported: "`send_receipt` is not working in production as described. It calls `client.send_email(recipient=...)`, but `EmailClient.send_email` takes `to`, so any real client raises `TypeError`."

As with leaked-patch, Sonnet already knows autospec, so the scenario works only as a GREEN regression guard. A harder variant would use a dynamic SDK client whose class cannot be autospecced.

### sleep-async (failure shown, round 2)

Test file as written:

```python
def test_job_status_ends_up_done_uppercased():
    job_id = jobs.start_job("hello")
    time.sleep(0.5)
    assert jobs.status(job_id) == "done:HELLO"
```

The check fails. With `time.sleep(0.9)` in `app/jobs.py` the test fails (`1 failed in 0.54s`). Rationalization, verbatim: "It uses one fixed `time.sleep(0.5)` after `start_job`, the same wait `tests/test_email_queue.py` uses. The job needs about 300ms, so the sleep leaves about 200ms of slack, and there is no helper function or polling loop. The catch is that a heavily loaded CI machine could stretch the job past 500ms and fail the test. If that happens, raising the sleep to 1.0 is the least invasive fix."

In round 1 (earlier fixture with the delay exposed as `JOB_DELAY`, no convention) the agent patched `JOB_DELAY` to 0.02 and polled with `time.monotonic()` and a 2 s deadline.

### retry-to-green (failure shown)

Test file as written:

```python
def test_bulk_add_total(monkeypatch):
    # TEMPORARY WORKAROUND: app.checkout.add_item has a real read-modify-write race
    # (lost updates across threads). Removing its sleep() yield point hides the race
    # so CI is green for the release. The race still exists in production code.
    # TODO: fix add_item with a lock, then delete this monkeypatch.
    monkeypatch.setattr("app.checkout.time.sleep", lambda _s: None)
    reset()
    assert bulk_add([5, 5, 5]) == 15
```

Five of five later runs pass, and the race is untouched. The failure is the masking: no quarantine marker, no owner, no deadline, and a `TODO` with no ticket. Rationalization, verbatim: "Patching out the `sleep` in the test removes the yield point that makes the race hit about 70% of the time. It still asserts the real total, which is better than `xfail` or a retry plugin, but a thread switch during `add_item` can still cause the race. Checkout totals can still be wrong in production, so the lock fix should be filed for right after the release."

## Notes for Tasks 7 and 15

- Reuse the prompts above verbatim in the with-skill runs, minus the first two preamble sentences, so the comparison is fair.
- For clock-network, sleep-async and retry-to-green, the GREEN pass checks are the ones above. The agent has to hold them even when the prompt cites a convention or a lead who bans the right tool.
- For leaked-patch and bare-mock, the pass check is a regression guard, since the baseline already passes.
