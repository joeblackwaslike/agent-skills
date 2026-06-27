# SOLID in One System — TypeScript

A complete, copy-paste-ready **notification dispatcher** that honors all five principles
together. The job: take a notification, **format** it for a channel, **send** it over that
channel, and **record** the delivery. Channels: email, SMS, push — with new ones addable
without touching existing code.

The same system is built in Python in `python-examples.md`. The code is framework-agnostic so
the principles stay visible; notes at the end show where real adapters plug in.

## The "before" — one god class that violates all five

```ts
// ❌ NotificationManager does everything and is welded to every detail.
class NotificationManager {
  // hard-coded concrete dependencies (DIP violation)
  private readonly smtp = new SmtpClient("smtp.prod", 587);
  private readonly twilio = new TwilioClient("AC...", "token");
  private readonly db = new PostgresClient("postgres://prod/...");

  send(channel: string, to: string, subject: string, body: string): void {
    // formatting tangled with sending (SRP violation)
    let payload: string;
    if (channel === "email") {
      payload = `Subject: ${subject}\n\n${body}`;         // OCP violation: grows per channel
      this.smtp.send(to, payload);
    } else if (channel === "sms") {
      payload = `${subject}: ${body}`.slice(0, 160);
      this.twilio.message(to, payload);
    } else if (channel === "push") {
      payload = JSON.stringify({ title: subject, body });
      // ...another concrete client...
    } else {
      throw new Error(`unknown channel: ${channel}`);
    }
    // persistence tangled in, can't test without a DB (DIP + SRP)
    this.db.insert("deliveries", { to, channel, at: Date.now() });
  }
}
```

Adding a "Slack" channel means editing this method (OCP), it has at least three reasons to
change (SRP), and you can't test it without SMTP/Twilio/Postgres (DIP).

## The "after" — refactored to SOLID

### 1. The core data type and the role abstractions (ISP + DIP)

Each seam is a **narrow role interface** owned by the dispatcher (the high-level policy), not by
any concrete client.

```ts
// notification.ts — a small, immutable value type.
export interface Notification {
  readonly to: string;
  readonly subject: string;
  readonly body: string;
}

// ports.ts — narrow roles. Each client depends only on what it uses (ISP).
export interface Formatter {
  // Turns a notification into the wire payload for one channel.
  format(n: Notification): string;
}

export interface Channel {
  readonly name: string;
  // Sends an already-formatted payload. Substitutable across channels (LSP).
  send(to: string, payload: string): Promise<void>;
}

export interface DeliveryLog {
  // The dispatcher depends on this abstraction, not on Postgres (DIP).
  record(to: string, channel: string): Promise<void>;
}
```

### 2. Concrete channels — added without editing the dispatcher (OCP), substitutable (LSP)

```ts
// channels/email.ts
import type { Channel } from "../ports.js";

export class EmailChannel implements Channel {
  readonly name = "email";
  constructor(private readonly smtp: SmtpClient) {} // detail injected (DIP)
  async send(to: string, payload: string): Promise<void> {
    await this.smtp.send(to, payload);
  }
}

// channels/sms.ts
export class SmsChannel implements Channel {
  readonly name = "sms";
  constructor(private readonly twilio: TwilioClient) {}
  async send(to: string, payload: string): Promise<void> {
    await this.twilio.message(to, payload);
  }
}

// channels/push.ts — a NEW channel is a NEW file. Nothing existing changes (OCP).
export class PushChannel implements Channel {
  readonly name = "push";
  constructor(private readonly fcm: FcmClient) {}
  async send(to: string, payload: string): Promise<void> {
    await this.fcm.push(to, payload);
  }
}
```

Every `Channel.send` honors the same contract — accept a recipient and a payload, deliver it,
reject nothing the others accept, throw only on genuine delivery failure. That substitutability
(LSP) is what makes the dispatcher's OCP promise hold.

### 3. Formatters — one responsibility each (SRP), per channel

```ts
// formatters.ts — formatting is its OWN responsibility, separate from sending (SRP).
import type { Formatter, Notification } from "./ports.js";

export class EmailFormatter implements Formatter {
  format(n: Notification): string {
    return `Subject: ${n.subject}\n\n${n.body}`;
  }
}

export class SmsFormatter implements Formatter {
  format(n: Notification): string {
    return `${n.subject}: ${n.body}`.slice(0, 160); // SMS length rule lives here, nowhere else
  }
}

export class PushFormatter implements Formatter {
  format(n: Notification): string {
    return JSON.stringify({ title: n.subject, body: n.body });
  }
}
```

### 4. The dispatcher — high-level policy depending only on abstractions (DIP + OCP)

```ts
// dispatcher.ts
import type { Channel, DeliveryLog, Formatter, Notification } from "./ports.js";

export class Dispatcher {
  // Registry of channel name -> {channel, formatter}. Closed for modification (OCP):
  // new channels are REGISTERED, never switched-on inside dispatch().
  private readonly routes = new Map<string, { channel: Channel; formatter: Formatter }>();

  constructor(private readonly log: DeliveryLog) {} // depends on the abstraction (DIP)

  register(channel: Channel, formatter: Formatter): this {
    this.routes.set(channel.name, { channel, formatter });
    return this;
  }

  async dispatch(channelName: string, n: Notification): Promise<void> {
    const route = this.routes.get(channelName);
    if (!route) throw new Error(`no channel registered: ${channelName}`);
    const payload = route.formatter.format(n);   // format (SRP)
    await route.channel.send(n.to, payload);      // send   (SRP, polymorphic — OCP/LSP)
    await this.log.record(n.to, channelName);     // record (SRP, via abstraction — DIP)
  }
}
```

`dispatch()` never mentions email, SMS, or push. Adding a channel does not edit it.

### 5. The composition root — the one place that knows the concretes

```ts
// main.ts — wiring lives here and ONLY here (the DIP composition root).
import { Dispatcher } from "./dispatcher.js";
import { EmailChannel, SmsChannel, PushChannel } from "./channels/index.js";
import { EmailFormatter, SmsFormatter, PushFormatter } from "./formatters.js";
import { PostgresDeliveryLog } from "./infra/postgres-delivery-log.js";

const dispatcher = new Dispatcher(new PostgresDeliveryLog(/* pool */))
  .register(new EmailChannel(new SmtpClient("smtp.prod", 587)), new EmailFormatter())
  .register(new SmsChannel(new TwilioClient("AC...", "token")), new SmsFormatter())
  .register(new PushChannel(new FcmClient("key")), new PushFormatter());

await dispatcher.dispatch("email", {
  to: "joe@example.com",
  subject: "Order shipped",
  body: "Your order #1234 is on its way.",
});
```

### 6. Testing — the payoff of DIP + ISP

Because the dispatcher depends on narrow abstractions, a test needs no SMTP, no Twilio, no DB:

```ts
// dispatcher.test.ts (Vitest)
import { expect, test, vi } from "vitest";
import { Dispatcher } from "./dispatcher.js";

test("formats, sends, and records a notification", async () => {
  const sent: Array<{ to: string; payload: string }> = [];
  const recorded: Array<{ to: string; channel: string }> = [];

  const fakeChannel = {
    name: "email",
    send: async (to: string, payload: string) => void sent.push({ to, payload }),
  };
  const fakeLog = { record: async (to: string, channel: string) => void recorded.push({ to, channel }) };

  const dispatcher = new Dispatcher(fakeLog).register(fakeChannel, new (class {
    format = (n: { subject: string; body: string }) => `Subject: ${n.subject}\n\n${n.body}`;
  })());

  await dispatcher.dispatch("email", { to: "a@b.com", subject: "Hi", body: "There" });

  expect(sent).toEqual([{ to: "a@b.com", payload: "Subject: Hi\n\nThere" }]);
  expect(recorded).toEqual([{ to: "a@b.com", channel: "email" }]);
});
```

## Which principle did each move satisfy?

| Move | Principle |
| --- | --- |
| Split format / send / record into separate types | **SRP** |
| New channel = new `Channel` class, dispatcher untouched | **OCP** |
| Every `Channel.send` honors the same contract, no surprises | **LSP** |
| `Formatter`, `Channel`, `DeliveryLog` are narrow roles, not one fat interface | **ISP** |
| Dispatcher depends on abstractions; concretes injected at the root | **DIP** |

## Where real adapters plug in

- `SmtpClient` / `TwilioClient` / `FcmClient` are the concrete SDKs — wrapped by the `Channel`
  implementations so the SDK never leaks into the dispatcher.
- `PostgresDeliveryLog implements DeliveryLog` lives in an infra module; the dispatcher never
  imports it directly.
- Input validation (Zod) belongs at the boundary that builds the `Notification`, before
  `dispatch()` — keeping the core types clean.
- This is the same dependency-direction discipline as hexagonal architecture in
  `domain-driven-design`: the policy owns the ports; infrastructure implements them.
