# Building a GitHub App End-to-End

This is the full lifecycle: register the app, install it, then authenticate and
make API calls as the installation. The auth dance (private key → JWT →
installation token) sounds involved but Octokit collapses it to two lines. We
show the raw flow first so you understand what's happening, then the easy way
you'll actually ship.

## 1. Register the app

GitHub → Settings → Developer settings → GitHub Apps → **New GitHub App**.
Decide up front:

- **Permissions** — the most important choice. Grant the minimum. A PR-comment
  bot needs `Issues: write` (PR comments are issue comments) and `Pull
  requests: read`; a labeler needs `Issues: write` / `Pull requests: write` and
  `Metadata: read` (always required). Adding permissions later forces every
  existing installation to re-consent, so think before you ship.
- **Subscribe to events** — only the webhook events you actually handle
  (`issues`, `pull_request`, `push`, …). Each event you subscribe to must be
  backed by a corresponding permission.
- **Webhook URL + secret** — the HTTPS endpoint that receives deliveries, plus
  a high-entropy secret string. **Always set a secret** — it's what lets you
  verify deliveries are really from GitHub (see `webhooks.md`).
- **Where can this app be installed?** — "Only on this account" for internal
  tooling, "Any account" for a public/multi-tenant integration.

After creating it, GitHub gives you an **App ID** (and a **Client ID**), and
lets you **generate a private key** (a `.pem` download — this is the only time
you can download it; store it immediately).

## 2. Install it

From the app's public page (`https://github.com/apps/<app-slug>`) click
**Install**, choose the account, and select **All repositories** or specific
ones. Each install creates an **installation** with its own `installation_id` —
the unit of access and rate limiting. One app, many installations.

## 3. The auth flow in detail (raw)

Three steps, three credentials (see `auth-strategies.md` for the full taxonomy):

### a. Private key → short-lived RS256 JWT (app auth)

Sign a JWT locally with your RSA private key. The payload claims:

- `iat` — issued-at, in Unix seconds. **Set it ~60s in the past** to absorb
  clock skew between your server and GitHub. If your `iat` is in GitHub's
  future, the JWT is rejected.
- `exp` — expiry, Unix seconds. **Max 10 minutes** past `iat`; GitHub rejects
  anything longer. Keep it short (e.g. 9 minutes) so a leaked JWT is useless
  fast.
- `iss` — the issuer: your **Client ID** (recommended) or App ID.
- Signed with `alg: RS256`.

```ts
import { readFileSync } from "node:fs";
import jwt from "jsonwebtoken"; // illustrative; Octokit does this for you

const privateKey = readFileSync("private-key.pem", "utf8");
const now = Math.floor(Date.now() / 1000);

const appJwt = jwt.sign(
  {
    iat: now - 60,        // 60s in the past for clock skew
    exp: now + 9 * 60,    // 9 min — under the 10 min hard cap
    iss: process.env.GITHUB_APP_CLIENT_ID, // Client ID (or App ID)
  },
  privateKey,
  { algorithm: "RS256" },
);
```

> Clock-skew tips: run NTP on your server; never set `exp` to the full 10 min
> if your `iat` is already 60s back (60 + 600 > 600 cap — use `exp = now + 540`).
> If you see `'Expiration time' claim ('exp') is too far in the future`, your
> clock is behind GitHub's.

### b. Exchange the JWT for an installation access token

Authenticate to the token endpoint with the JWT as a Bearer token:

```bash
curl -X POST \
  -H "Authorization: Bearer $APP_JWT" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/app/installations/$INSTALLATION_ID/access_tokens
```

Returns a token (`ghs_…`) that expires in **1 hour** and is scoped to that
installation's repos and permissions. You can optionally narrow it further in
the request body with `repositories` and `permissions`.

### c. Call the API as the installation

```bash
curl -H "Authorization: token $INSTALLATION_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/octocat/hello-world/issues
```

## 4. The easy way — `App` from `octokit`

In practice you never hand-sign JWTs or hit the token endpoint yourself.
`App` (and the underlying `@octokit/auth-app`) signs the JWT, exchanges it for
an installation token, caches the token, and re-mints it when it expires —
transparently, on every request.

```ts
import { App } from "octokit";

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY!, // PEM, newlines intact
});

// App-level (JWT) client — for app-management endpoints:
const { data: appInfo } = await app.octokit.rest.apps.getAuthenticated();
console.log("Running as", appInfo.slug);

// Installation-scoped client — for real work:
const octokit = await app.getInstallationOctokit(
  Number(process.env.INSTALLATION_ID),
);

await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: `Hello from ${appInfo.slug}`,
  body: "Created via an installation access token.",
});
```

Need the raw token (e.g. to hand to a sub-process or git over HTTPS)?

```ts
import { createAppAuth } from "@octokit/auth-app";

const auth = createAppAuth({ appId, privateKey });
const { token } = await auth({ type: "installation", installationId });
// token is the 1-hour ghs_… installation token
```

## Managing the private key safely

The private key *is* your app's identity — anyone with it can mint tokens for
every installation. Treat it like a root credential:

- **Never commit it.** No `.pem` in the repo, no key in source.
- **Load from a secret store / env var** — AWS Secrets Manager, GCP Secret
  Manager, Vault, or platform secrets (Railway/Vercel/Fly). When stuffing a
  multi-line PEM into an env var, preserve newlines: store with `\n` escapes
  and normalize, or base64-encode it and decode at boot.

  ```ts
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY_BASE64
    ? Buffer.from(process.env.GITHUB_APP_PRIVATE_KEY_BASE64, "base64").toString("utf8")
    : process.env.GITHUB_APP_PRIVATE_KEY!;
  ```

- **Rotate keys** in the app settings (you can have multiple keys active at
  once). Generate a new key, deploy it, then delete the old one — zero downtime.
  Rotate immediately on any suspected leak; deleting a key invalidates every JWT
  signed with it.

> WebCrypto note: GitHub hands you a `PKCS#1` key, but some runtimes (browsers,
> Workers) only accept `PKCS#8`. Convert once:
> `openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in key.pem -out key-pkcs8.pem`.
> Node's `@octokit/auth-app` handles PKCS#1 natively — no conversion needed.

## Finding installation IDs

You usually don't hardcode an installation ID — you discover it:

- **From webhooks** — every delivery payload includes `installation.id`. This is
  the normal path for an event-driven bot: read it off the event and call
  `app.getInstallationOctokit(payload.installation.id)`.
- **Programmatically**, using the app-level (JWT) client:

  ```ts
  // All installations of this app:
  for await (const { installation } of app.eachInstallation.iterator()) {
    console.log(installation.id, installation.account?.login);
  }

  // Resolve an installation for a known repo/owner:
  const { data } = await app.octokit.rest.apps.getRepoInstallation({
    owner: "octocat",
    repo: "hello-world",
  });
  const installationId = data.id;
  ```

## Per-installation rate limits

Rate limits are pooled **per installation**, not per app — so a multi-tenant app
gets independent budgets across its installations. An installation authenticated
with an installation access token starts at 5,000 requests/hour and scales up
with the number of repositories and users it covers, to a ceiling of **15,000
requests/hour** (Enterprise Cloud installations get higher floors). Because each
installation has its own bucket, you don't have to globally serialize work
across tenants — but within one installation, use `@octokit/plugin-throttling`
to respect primary and secondary limits (see `octokit-bot-example.md`).
