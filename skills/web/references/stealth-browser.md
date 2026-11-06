# stealth-browser gateway

[stealth-browser](https://github.com/joeblackwaslike/stealth-browser) is a self-hosted
gateway in front of Camoufox, a patched Firefox with a pinned fingerprint. It runs on
Joe's Kubernetes cluster, reachable over the tailnet. It returns the fully rendered,
JavaScript-executed HTML of a page and keeps logged-in eBay and Reddit sessions. Use it
when a site blocks agents or `WebFetch`: 403, 429, a CAPTCHA, a login wall, or a
near-empty body on a server-rendered page. The repo README covers deployment.

It has two endpoints, `GET /healthz` and `POST /content`. There is no separate search
API. Searching Google, eBay, Reddit, or Amazon means fetching that site's search URL
through `/content` (see "Searching" below). The same gateway also powers the
`stealth google` engine inside [SearXNG](searxng.md).

## Credentials

The agent needs `STEALTH_BROWSER_URL` and `STEALTH_BROWSER_TOKEN` in its environment.
If either is unset, tell the user plainly (message in `SKILL.md`, fetch step 3) and
name the missing variable. This gateway is the only tool here that handles bot-blocked
and JavaScript-rendered pages, so a silent skip hides the real reason a fetch failed.
Don't search the machine for credentials. Never print the token, not even a prefix.
Check that the gateway is configured and reachable:

```bash
if [ -n "$STEALTH_BROWSER_URL" ] && [ -n "$STEALTH_BROWSER_TOKEN" ]; then
  curl -sS --connect-timeout 5 -m 10 -o /dev/null -w '%{http_code}\n' \
    "$STEALTH_BROWSER_URL/healthz" -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN"
else
  echo "not configured"
fi
```

Fetch only if this prints `200`. On `not configured`, a 401 (wrong token), or a DNS,
connection, or timeout error, report that stealth-browser is unavailable and why, then
use the degraded fallbacks in `SKILL.md` fetch step 4. The gateway sits on the
tailnet, so it may not be reachable from this machine.

## Fetching a page

```bash
url='<target-url>'   # write any ' in the URL as %27
dir=$(mktemp -d)     # one directory per fetch, so parallel fetches don't collide
echo "saved to $dir" # a later shell call can't see $dir, so keep this path
curl -sS -m 600 -X POST "$STEALTH_BROWSER_URL/content" \
  -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "$(jq -nc --arg url "$url" '{url:$url}')" \
  -D "$dir/headers.txt" -o "$dir/page.html" -w '%{http_code}\n'
head -c 200000 "$dir/page.html"
```

The recipe needs `jq`, which builds the JSON body so quotes in the URL can't break it.
If `jq` isn't installed, report that and install it or stop. Don't hand-write the body.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `url` | string | required | Public `http`/`https` only. Loopback, private IPs, and bare hostnames get a 400. |
| `waitForTimeout` | int, 0-15000 ms | 3000 | Extra wait after load. Raise it only when lazy-loaded content is missing. |

curl prints the status code. On a 200, `$dir/page.html` holds the rendered HTML;
parse it like a `webFetch` result. On any other status it holds the error body from
the Responses table below. `$dir/headers.txt` holds `X-Final-Url` (the URL after
redirects) and, for a paused profile, `Retry-After`.

`head -c 200000` reads about 200 KB to save context. That is enough for Reddit
(~190 KB) but stops Amazon search before the first result, because the page is ~2 MB
and results start past byte 300,000. For pages that size, `grep` the file for what you
need, using the directory path the recipe printed.

### Profiles

The gateway picks the profile from the URL's hostname, so the body needs only `url`. A profile
owns its domain and every subdomain of it:

| Hostname | Profile |
| --- | --- |
| `ebay.com` or any subdomain (`www.ebay.com`, `m.ebay.com`) | `ebay`, logged in |
| `reddit.com` or any subdomain (`old.reddit.com`, `www.reddit.com`) | `reddit`, logged in |
| anything else (Amazon included) | `anon`, no login |

### Searching

Build the site's own search URL and fetch it. URL-encode the query.

| Site | Search URL | Profile |
| --- | --- | --- |
| Google | `https://www.google.com/search?q=<query>` | `anon` |
| eBay (active) | `https://www.ebay.com/sch/i.html?_nkw=<query>` | `ebay` |
| eBay (sold comps) | `https://www.ebay.com/sch/i.html?_nkw=<query>&LH_Sold=1&LH_Complete=1` | `ebay` |
| Reddit | `https://www.reddit.com/search/?q=<query>` | `reddit` |
| Amazon | `https://www.amazon.com/s?k=<query>` | `anon` |

The response is raw HTML, so `grep` it for result titles and links instead of reading it
whole. For plain Google queries, prefer [SearXNG](searxng.md), which already routes
through this gateway and returns parsed results.

### Captcha solving

The gateway can solve a reCAPTCHA v2 challenge and continue to the real page. It is
off unless the operator sets `SOLVER_API_KEY` (a 2Captcha-compatible service;
`SOLVER_BASE_URL` overrides the host, and `SOLVER_MAX_PER_HOUR` caps attempts, default
100, failures included). It acts only on a visible challenge form. Anything else, or an
exhausted budget, returns the original page and is classified as a block. Callers see
no change except slower responses when a solve happens.

### Pacing

One browser serves every request, so the gateway runs them one at a time in FIFO
order. It waits a random gap between starts on the same profile: 20-40 s for `ebay`,
5-10 s for `reddit`, 3-8 s for `anon`. At most five requests wait behind the running
one, and each run can take about 50 s (30 s navigation timeout, plus `waitForTimeout`
and a margin). On `ebay`, a request at the back of a full queue waits behind five runs
and four 20-40 s gaps before its own run, about 500 s in the worst case, which is why
the recipe uses `-m 600`. Add the extra seconds if you raise `waitForTimeout`.

Keep eBay requests few. The gateway uses no proxy, and a block pauses the eBay profile
for every caller.

## Responses

| Status | Body | Meaning | What to do |
| --- | --- | --- | --- |
| 200 | HTML | Page rendered | Parse it |
| 400 | `{"error":"invalid_request","message":...}` | Bad body or a disallowed URL | Fix the request |
| 401 | not JSON | Token missing or wrong | Check `STEALTH_BROWSER_TOKEN`; don't retry |
| 401 | `{"session_expired":true,"profile":...}` | Saved login for that profile is missing or expired | Tell the user; the gateway operator re-captures it with `pnpm signin <profile>`. Don't retry |
| 423 | `{"blocked":true,"profile":...,"reason":...}` | Site served a bot check; profile now paused 30 min | Don't retry; fall back to the next escalation step |
| 423 | same, `"reason":"paused"`, `Retry-After` header (seconds) | Profile still paused from an earlier block | Don't retry before `Retry-After` |
| 429 | `{"error":"rate_limited","profile":...}` | Target site rate-limited the request; no pause | Back off before the next request to that site |
| 429 | `{"error":"queue_full"}` | Gateway queue is full | Retry shortly |
| 502 | `{"error":"navigation_failed","message":...}` | Navigation failed or timed out | Retry once, then escalate |

The `reason` on a fresh block is one of `ebay_challenge_redirect`,
`interruption_page`, `ebay_error_page`, `captcha`, `captcha_widget:*`, `verify_human`,
`google_sorry` (Google's `/sorry` page), or `http_block_status` (the site returned 403).

`pnpm signin` has a person log in by hand in a remote browser, so an agent can't run it.
Report the expired profile and move on.

## Which hosts and responses come here

The blocked-host list and the escalation triggers (403/429, captcha text, login wall,
unhydrated SPA, near-empty body) live in `SKILL.md` under "Route a fetch". They are not
repeated here, so there is one copy to maintain.

## Skills

None. The gateway is plain HTTP with no MCP server or plugin, so this file is the
only guidance. For interactive browsing (clicks, forms, screenshots), use the
`agent-browser` skill instead.

## Install

There is no plugin or MCP server. It is a self-hosted gateway, so setting it up means
deploying it and exporting two variables.

1. Deploy to the cluster from the
   [stealth-browser repo](https://github.com/joeblackwaslike/stealth-browser)
   (`deploy/deploy.sh`; manifests in `deploy/k8s/`). The README's deploy section covers
   the secrets and first-run steps.
2. Export `STEALTH_BROWSER_URL` (the gateway's tailnet URL) and `STEALTH_BROWSER_TOKEN`
   (from the gateway's `stealth-browser-secrets` Secret) in the environment Claude Code
   starts from.
3. Check with the health command under "Credentials". It must print `200`.
4. For logged-in eBay and Reddit, an operator captures the sessions with
   `pnpm signin <profile>` (a person logs in by hand; an agent can't).

## Free tier and fallback

- **Cost:** self-hosted, so no per-request fee. The optional captcha solver bills
  per solve at the 2Captcha-compatible service, capped by `SOLVER_MAX_PER_HOUR`.
- **Gateway unavailable, paused, or queue full:** follow "Route a fetch" in `SKILL.md`:
  report that stealth-browser is down, then use the degraded fallbacks (SearXNG
  `fetch_url` with `rendered=true`, Firecrawl `firecrawl_scrape`, `agent-browser`).
  For a `423` pause, wait out `Retry-After` instead of retrying.
