# A Minimal GitHub App Bot with Octokit

A complete, copy-paste-shaped TypeScript bot: a GitHub App that listens for
`issues.opened`, then comments and labels the new issue using an
installation-scoped Octokit. It wires `App` from the `octokit` package to an
HTTP server via `createNodeMiddleware` — `App` handles JWT signing, installation
token minting, signature verification, and typed event dispatch, so the bot
logic is just the handler.

## Project layout

```
my-bot/
├── package.json
├── tsconfig.json
├── .env            # never commit
└── src/
    └── index.ts
```

## `package.json`

```json
{
  "name": "my-github-bot",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --env-file=.env --experimental-strip-types src/index.ts",
    "start": "node --env-file=.env dist/index.js",
    "build": "tsc"
  },
  "dependencies": {
    "octokit": "^5.0.0",
    "@octokit/plugin-throttling": "^11.0.0",
    "@octokit/plugin-retry": "^8.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0"
  }
}
```

> `octokit` v5 re-exports `App`, `Octokit`, and `createNodeMiddleware`. Node 20+
> can run `.ts` directly via `--experimental-strip-types`; otherwise `tsc` to
> `dist/` and run the JS. Set `"moduleResolution": "node16"`/`"module":
> "node16"` in `tsconfig.json` — Octokit uses conditional exports.

## Environment variables (`.env`)

```bash
GITHUB_APP_ID=123456
# PEM contents with literal \n for newlines, OR base64 the whole key (see below)
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...\n-----END RSA PRIVATE KEY-----\n"
GITHUB_WEBHOOK_SECRET=your-high-entropy-webhook-secret
PORT=3000
```

## `src/index.ts`

```ts
import { createServer } from "node:http";
import { App, Octokit, createNodeMiddleware } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";

const appId = process.env.GITHUB_APP_ID!;
const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET!;
const port = Number(process.env.PORT ?? 3000);

// Support either a raw PEM (with \n) or a base64-encoded one.
const privateKey = process.env.GITHUB_APP_PRIVATE_KEY_BASE64
  ? Buffer.from(process.env.GITHUB_APP_PRIVATE_KEY_BASE64, "base64").toString("utf8")
  : process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, "\n");

// Harden every installation-scoped client with retry + throttling.
const HardenedOctokit = Octokit.plugin(throttling, retry);

const app = new App({
  appId,
  privateKey,
  webhooks: { secret: webhookSecret },
  Octokit: HardenedOctokit,
  // Throttling needs primary/secondary rate-limit callbacks. Return true to retry.
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(`Rate limit hit for ${options.method} ${options.url}`);
      return retryCount < 2; // retry up to twice
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      octokit.log.warn(`Secondary rate limit for ${options.method} ${options.url}`);
      return true;
    },
  },
});

// React to new issues: comment + label, as the installation.
app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const issue_number = payload.issue.number;

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number,
    body: `Thanks for opening this, @${payload.issue.user.login}! A maintainer will triage shortly.`,
  });

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number,
    labels: ["needs-triage"],
  });

  console.log(`Handled issue #${issue_number} in ${owner}/${repo}`);
});

// Surface signature/handler errors instead of swallowing them.
app.webhooks.onError((error) => {
  console.error("Webhook processing error:", error);
});

// createNodeMiddleware verifies signatures and dispatches to the handlers above.
// Default webhook path: POST /api/github/webhooks
createServer(createNodeMiddleware(app)).listen(port, () => {
  console.log(`Bot listening on :${port} (POST /api/github/webhooks)`);
});
```

The `octokit` injected into each handler is **already installation-scoped** for
the delivering installation — `App` read `payload.installation.id`, minted the
1-hour installation token, and wired it in. You never touch the JWT or token
yourself.

## Run it

```bash
npm install
npm run dev

# In another terminal, tunnel localhost to a public URL and point the app's
# webhook URL at it (see webhooks.md):
npx smee-client --url https://smee.io/<channel> --target http://localhost:3000/api/github/webhooks
```

Open an issue on a repo where the app is installed — the bot comments and labels.

## Production hardening

- **`@octokit/plugin-throttling`** (wired above) — respects GitHub's primary and
  secondary rate limits and backs off automatically. The two callbacks are
  required; return `true` to retry.
- **`@octokit/plugin-retry`** (wired above) — retries transient 5xx/network
  errors with backoff (skips non-retryable codes like 401/404/422).
- **Acknowledge fast, work async** — for anything beyond a quick comment, return
  2xx immediately and push the verified event to a queue/worker so you never
  blow GitHub's ~10s delivery window (see `webhooks.md`).
- **Idempotency** — key on `X-GitHub-Delivery`; redeliveries reuse the GUID.
- **Structured logging** — replace `console.*` with `pino`; log the delivery ID,
  event, installation ID, and repo on every handler so failures are traceable.
- **Secrets** — `GITHUB_APP_PRIVATE_KEY` and `GITHUB_WEBHOOK_SECRET` come from a
  secret store / platform secrets, never the repo. Rotate the key on suspected
  leak.
- **Deploy targets** — any always-on Node host works (Railway, Fly, Render, a
  container on ECS/Cloud Run). For serverless/edge (Vercel, Cloudflare Workers,
  Lambda), skip `createNodeMiddleware` and call `app.webhooks.verifyAndReceive`
  in your handler with the raw body; on Workers, convert the private key to
  PKCS#8 first (see `building-a-github-app.md`).
