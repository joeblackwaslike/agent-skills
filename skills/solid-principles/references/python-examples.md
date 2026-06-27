# SOLID in One System — Python

The same **notification dispatcher** as `typescript-examples.md`, built in idiomatic Python
3.11+. The job: take a notification, **format** it for a channel, **send** it over that channel,
and **record** the delivery. Channels: email, SMS, push — new ones addable without touching
existing code.

Uses `Protocol` (structural typing) for the seams, frozen dataclasses for value types, and
constructor injection. Framework-agnostic so the principles stay visible.

## The "before" — one god class that violates all five

```python
# ❌ NotificationManager does everything and is welded to every detail.
class NotificationManager:
    def __init__(self) -> None:
        # hard-coded concrete dependencies (DIP violation)
        self._smtp = SmtpClient("smtp.prod", 587)
        self._twilio = TwilioClient("AC...", "token")
        self._db = PostgresClient("postgres://prod/...")

    def send(self, channel: str, to: str, subject: str, body: str) -> None:
        # formatting tangled with sending (SRP); grows per channel (OCP)
        if channel == "email":
            payload = f"Subject: {subject}\n\n{body}"
            self._smtp.send(to, payload)
        elif channel == "sms":
            payload = f"{subject}: {body}"[:160]
            self._twilio.message(to, payload)
        elif channel == "push":
            payload = json.dumps({"title": subject, "body": body})
            ...  # another concrete client
        else:
            raise ValueError(f"unknown channel: {channel}")
        # persistence tangled in; can't test without a DB (DIP + SRP)
        self._db.insert("deliveries", {"to": to, "channel": channel})
```

Adding "Slack" edits this method (OCP), it has several reasons to change (SRP), and it can't be
tested without SMTP/Twilio/Postgres (DIP).

## The "after" — refactored to SOLID

### 1. The core data type and the role abstractions (ISP + DIP)

```python
# notification.py — a small, immutable value type.
from dataclasses import dataclass


@dataclass(frozen=True)
class Notification:
    to: str
    subject: str
    body: str
```

```python
# ports.py — narrow roles, each owned by the policy. Clients depend only on what they use (ISP).
from typing import Protocol

from notification import Notification


class Formatter(Protocol):
    def format(self, n: Notification) -> str: ...


class Channel(Protocol):
    name: str
    async def send(self, to: str, payload: str) -> None: ...  # substitutable across channels (LSP)


class DeliveryLog(Protocol):
    async def record(self, to: str, channel: str) -> None: ...  # abstraction, not Postgres (DIP)
```

### 2. Concrete channels — added without editing the dispatcher (OCP), substitutable (LSP)

```python
# channels.py
class EmailChannel:
    name = "email"

    def __init__(self, smtp: "SmtpClient") -> None:   # detail injected (DIP)
        self._smtp = smtp

    async def send(self, to: str, payload: str) -> None:
        await self._smtp.send(to, payload)


class SmsChannel:
    name = "sms"

    def __init__(self, twilio: "TwilioClient") -> None:
        self._twilio = twilio

    async def send(self, to: str, payload: str) -> None:
        await self._twilio.message(to, payload)


class PushChannel:                                    # a NEW channel is a NEW class (OCP)
    name = "push"

    def __init__(self, fcm: "FcmClient") -> None:
        self._fcm = fcm

    async def send(self, to: str, payload: str) -> None:
        await self._fcm.push(to, payload)
```

Each `send` honors the same contract — accept a recipient and payload, deliver, reject nothing
the others accept, raise only on genuine delivery failure. That substitutability (LSP) makes the
dispatcher's OCP promise hold. Structural typing means none of these need to inherit from
`Channel` — they satisfy it just by shape.

### 3. Formatters — one responsibility each (SRP)

```python
# formatters.py — formatting is its OWN responsibility, separate from sending (SRP).
import json

from notification import Notification


class EmailFormatter:
    def format(self, n: Notification) -> str:
        return f"Subject: {n.subject}\n\n{n.body}"


class SmsFormatter:
    def format(self, n: Notification) -> str:
        return f"{n.subject}: {n.body}"[:160]   # the SMS length rule lives here, nowhere else


class PushFormatter:
    def format(self, n: Notification) -> str:
        return json.dumps({"title": n.subject, "body": n.body})
```

### 4. The dispatcher — high-level policy depending only on abstractions (DIP + OCP)

```python
# dispatcher.py
from dataclasses import dataclass

from notification import Notification
from ports import Channel, DeliveryLog, Formatter


@dataclass
class _Route:
    channel: Channel
    formatter: Formatter


class Dispatcher:
    def __init__(self, log: DeliveryLog) -> None:   # depends on the abstraction (DIP)
        self._log = log
        # Registry of name -> route. Closed for modification (OCP):
        # new channels are REGISTERED, never switched-on inside dispatch().
        self._routes: dict[str, _Route] = {}

    def register(self, channel: Channel, formatter: Formatter) -> "Dispatcher":
        self._routes[channel.name] = _Route(channel, formatter)
        return self

    async def dispatch(self, channel_name: str, n: Notification) -> None:
        try:
            route = self._routes[channel_name]
        except KeyError:
            raise ValueError(f"no channel registered: {channel_name}") from None
        payload = route.formatter.format(n)        # format (SRP)
        await route.channel.send(n.to, payload)    # send   (SRP, polymorphic — OCP/LSP)
        await self._log.record(n.to, channel_name) # record (SRP, via abstraction — DIP)
```

`dispatch()` never mentions email, SMS, or push. Adding a channel does not edit it.

### 5. The composition root — the one place that knows the concretes

```python
# main.py — wiring lives here and ONLY here (the DIP composition root).
import asyncio

from channels import EmailChannel, PushChannel, SmsChannel
from dispatcher import Dispatcher
from formatters import EmailFormatter, PushFormatter, SmsFormatter
from infra import PostgresDeliveryLog
from notification import Notification


async def main() -> None:
    dispatcher = (
        Dispatcher(PostgresDeliveryLog(pool))
        .register(EmailChannel(SmtpClient("smtp.prod", 587)), EmailFormatter())
        .register(SmsChannel(TwilioClient("AC...", "token")), SmsFormatter())
        .register(PushChannel(FcmClient("key")), PushFormatter())
    )

    await dispatcher.dispatch(
        "email",
        Notification(to="joe@example.com", subject="Order shipped", body="On its way."),
    )


asyncio.run(main())
```

### 6. Testing — the payoff of DIP + ISP

No SMTP, no Twilio, no DB — inject fakes that satisfy the Protocols structurally:

```python
# test_dispatcher.py (pytest)
import pytest

from dispatcher import Dispatcher
from notification import Notification


class FakeChannel:
    name = "email"

    def __init__(self) -> None:
        self.sent: list[tuple[str, str]] = []

    async def send(self, to: str, payload: str) -> None:
        self.sent.append((to, payload))


class FakeLog:
    def __init__(self) -> None:
        self.recorded: list[tuple[str, str]] = []

    async def record(self, to: str, channel: str) -> None:
        self.recorded.append((to, channel))


class EmailFormatter:
    def format(self, n: Notification) -> str:
        return f"Subject: {n.subject}\n\n{n.body}"


@pytest.mark.asyncio
async def test_formats_sends_and_records() -> None:
    channel, log = FakeChannel(), FakeLog()
    dispatcher = Dispatcher(log).register(channel, EmailFormatter())

    await dispatcher.dispatch("email", Notification("a@b.com", "Hi", "There"))

    assert channel.sent == [("a@b.com", "Subject: Hi\n\nThere")]
    assert log.recorded == [("a@b.com", "email")]
```

## Which principle did each move satisfy?

| Move | Principle |
| --- | --- |
| Split format / send / record into separate types | **SRP** |
| New channel = new class, dispatcher untouched | **OCP** |
| Every channel's `send` honors the same contract | **LSP** |
| `Formatter`, `Channel`, `DeliveryLog` are narrow Protocols | **ISP** |
| Dispatcher depends on abstractions; concretes injected at the root | **DIP** |

## Where real adapters plug in

- `SmtpClient` / `TwilioClient` / `FcmClient` are the concrete SDKs, wrapped by the channel
  classes so the SDK never leaks into the dispatcher.
- `PostgresDeliveryLog` satisfies `DeliveryLog` and lives in an infra module; the dispatcher
  never imports it.
- Input validation (Pydantic) belongs at the boundary that builds the `Notification`, before
  `dispatch()` — keeping the core dataclass clean.
- Same dependency direction as hexagonal architecture in `domain-driven-design`: the policy owns
  the ports; infrastructure implements them; dependencies point inward.
