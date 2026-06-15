# Receiving and Verifying GitHub Webhooks

When something happens in a repo your app cares about (an issue opens, a PR is
pushed), GitHub sends an HTTP `POST` to your configured webhook URL. Your job:
verify it's really from GitHub, acknowledge fast, and do the work. Get the
verification wrong and anyone who finds your URL can forge events; get the
acknowledgment slow and GitHub marks your deliveries as failed.

## The delivery

Each delivery is a `POST` with a JSON body and these headers:

| Header | Meaning |
| --- | --- |
| `X-GitHub-Event` | The event type — `issues`, `pull_request`, `push`, … |
| `X-GitHub-Delivery` | A unique GUID for this delivery — use it for idempotency |
| `X-Hub-Signature-256` | `sha256=<hmac>` — HMAC-SHA256 of the raw body, keyed by your secret |
| `X-GitHub-Hook-Installation-Target-Type` | `integration` (GitHub App) vs `repository` etc. |

The body's shape is `{ action, ...resources, installation, sender, repository }`.
The **`action`** sub-field narrows the event: `X-GitHub-Event: issues` with
`action: "opened"` is what `@octokit/webhooks` exposes as the `issues.opened`
event. A GitHub App delivery also carries `installation.id` — that's how you get
an installation-scoped Octokit to respond.

**Redelivery:** GitHub retries nothing automatically on your 2xx, but you (or an
org admin) can manually redeliver any past delivery from the app's "Advanced" →
"Recent Deliveries" tab, and the API (`POST
/app/hook/deliveries/{id}/attempts`) can replay them. Redeliveries reuse the
**same** `X-GitHub-Delivery` GUID — which is exactly why you key idempotency on
it.

## Signature verification is mandatory

GitHub signs every delivery: `X-Hub-Signature-256 = "sha256=" +
HMAC_SHA256(secret, rawBody)`. You recompute that HMAC over the **raw request
body bytes** and compare, in **constant time**, against the header. If it
doesn't match, reject with `401` before doing anything else.

> **The #1 gotcha: use the raw body, not re-serialized JSON.** If you let a
> body-parser (`express.json()`, framework auto-parsing) consume the stream and
> then `JSON.stringify` the parsed object to verify, your bytes won't match
> GitHub's — key order, whitespace, and unicode escaping all differ, and every
> signature check fails. You must hash the exact bytes GitHub sent. Capture the
> raw body *before* any JSON parsing.

### With `@octokit/webhooks` (recommended)

The library does verification, parsing, and typed event dispatch for you.

```ts
import { createServer } from "node:http";
import { Webhooks, createNodeMiddleware } from "@octokit/webhooks";

const webhooks = new Webhooks({ secret: process.env.WEBHOOK_SECRET! });

webhooks.on("issues.opened", async ({ id, name, payload }) => {
  console.log(`[${id}] ${name}.${payload.action} on ${payload.repository.full_name}`);
  // ...handle it (verification already passed before this runs)
});

webhooks.onError((error) => {
  console.error("webhook error", error);
});

// createNodeMiddleware reads the raw body and verifies the signature for you,
// then dispatches to your .on() handlers. Default path: /api/github/webhooks
createServer(createNodeMiddleware(webhooks)).listen(3000);
```

For serverless / non-Node-http handlers, verify and dispatch explicitly — pass
the **raw string body**:

```ts
await webhooks.verifyAndReceive({
  id: req.headers["x-github-delivery"] as string,
  name: req.headers["x-github-event"] as string,
  signature: req.headers["x-hub-signature-256"] as string,
  payload: rawBody, // the raw string, NOT a re-stringified object
});
// throws if the signature is invalid — return 401 on throw
```

### Manual verification (when you can't use the library)

```ts
import { createHmac, timingSafeEqual } from "node:crypto";

function verifyGitHubSignature(rawBody: Buffer, signatureHeader: string | undefined): boolean {
  if (!signatureHeader) return false;
  const expected =
    "sha256=" +
    createHmac("sha256", process.env.WEBHOOK_SECRET!)
      .update(rawBody) // raw bytes — never JSON.stringify(parsedBody)
      .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  // timingSafeEqual throws if lengths differ, so guard first — and the
  // length check itself must not short-circuit the constant-time compare
  // for equal-length inputs.
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Capturing the raw body in Express (so the above has real bytes to hash):

```ts
import express from "express";

const app = express();
app.use(
  "/webhook",
  express.json({
    // stash the raw bytes on the request before parsing
    verify: (req, _res, buf) => {
      (req as express.Request & { rawBody?: Buffer }).rawBody = buf;
    },
  }),
);

app.post("/webhook", (req, res) => {
  const ok = verifyGitHubSignature(
    (req as express.Request & { rawBody?: Buffer }).rawBody!,
    req.header("x-hub-signature-256"),
  );
  if (!ok) return res.status(401).send("bad signature");
  res.status(202).send("ok"); // ack fast, then process
  // ...enqueue/process req.body asynchronously
});
```

> Never compare signatures with `===` or `==`. A naive string compare leaks
> timing information that can let an attacker recover the digest byte-by-byte.
> `crypto.timingSafeEqual` is the whole point.

## Respond fast — do work async

GitHub expects a response within roughly **10 seconds**; slow responses get the
delivery marked failed and hurt your delivery success rate. So **acknowledge
immediately (2xx) and process out of band:**

- Return `202 Accepted` (or `200`) the moment verification passes.
- Push the verified event onto a queue (SQS, BullMQ, a durable workflow, even an
  in-process task) and let a worker do the real work — API calls, DB writes,
  comment posting.
- Never block the HTTP response on the GitHub API calls you make in reaction.

## Handling failed deliveries and replay

- Inspect failures under the app's **Recent Deliveries** tab — it shows request,
  response, and lets you **redeliver**.
- Because redeliveries (and your own retries) reuse the same
  `X-GitHub-Delivery` GUID, make handlers **idempotent**: record processed
  delivery IDs and no-op on repeats.

  ```ts
  // pseudo: SETNX-style idempotency guard
  const deliveryId = req.header("x-github-delivery")!;
  if (await seen.has(deliveryId)) return res.status(202).send("dup");
  await seen.add(deliveryId, { ttlSeconds: 86_400 });
  ```

- Webhooks are at-least-once and unordered. Don't assume a `closed` arrives
  after its `opened`; reconcile against current API state when it matters.

## Local development with a tunnel

Your localhost isn't reachable from GitHub. Use a tunnel and point the app's
webhook URL at it:

```bash
# smee.io — purpose-built for GitHub webhooks; gives you a public proxy URL
npx smee-client --url https://smee.io/<your-channel> --target http://localhost:3000/api/github/webhooks

# or cloudflared — a quick public tunnel to your local port
cloudflared tunnel --url http://localhost:3000
```

Set the resulting public URL as the app's webhook URL while developing, then
trigger events (open an issue on a test repo) or **redeliver** past ones to
iterate without manually recreating events.
