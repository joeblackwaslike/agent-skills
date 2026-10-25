# stealth-browser gateway

Joe's self-hosted gateway in front of Camoufox, a patched Firefox with a pinned
fingerprint. It runs on the home IP with no proxy and keeps two logged-in profiles.
Use it when a site blocks agents: 403, 429, a CAPTCHA, a login wall, or a near-empty
body on a server-rendered page. Source lives at `~/github/joeblackwaslike/stealth-browser`.

The old Browserless instance still answers, but on Reddit it returns HTTP 200 with a
"You've been blocked" page, so a status check won't catch the failure. Use this
gateway instead of `$BROWSERLESS_URL` for bot-blocked sites.

## Credentials

```bash
source ~/creds.zsh   # exports STEALTH_BROWSER_URL and STEALTH_BROWSER_TOKEN
```

The URL is `https://stealth-browser.napoleon-catfish.ts.net` and only resolves on the
tailnet. If DNS or the connection fails, the machine is off Tailscale or the gateway
is down. Never print the token, not even a prefix. Check that it's set and reachable:

```bash
source ~/creds.zsh
[ -n "$STEALTH_BROWSER_TOKEN" ] && echo "token set"
curl -sS -o /dev/null -w '%{http_code}\n' "$STEALTH_BROWSER_URL/healthz" \
  -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN"   # 200 = ok
```

## Fetching a page

```bash
source ~/creds.zsh
curl -sS -m 120 -X POST "$STEALTH_BROWSER_URL/content" \
  -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"url":"<target-url>"}' | head -c 200000
```

The JSON body takes three fields.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `url` | string | required | Public `http`/`https` only. Loopback, private IPs, and bare hostnames get a 400. |
| `waitForTimeout` | int, 0-15000 ms | 3000 | Extra wait after load. Raise it only when lazy-loaded content is missing. |
| `profile` | `"ebay"` \| `"reddit"` \| `"anon"` | from URL | Overrides the profile picked from the URL. |

A 200 returns the rendered HTML (`text/html`). Parse it like a `webFetch` result. The
`X-Final-Url` header holds the URL after redirects. `head -c 200000` caps the output
at about 200 KB to save context. That cap is fine for Reddit (~190 KB) but cuts
Amazon search off before the first result, because the page is ~2 MB and results
start past byte 300,000. For pages that size, save with `-o page.html` and pull what you
need with `grep`.

### Profiles

When `profile` is omitted, the gateway matches the URL's exact hostname. It does no
suffix matching and doesn't strip `www`.

| Hostname | Profile | Logged in as |
| --- | --- | --- |
| `ebay.com`, `www.ebay.com` | `ebay` | A dedicated scraping account, never Joe's main seller account |
| `reddit.com`, `old.reddit.com`, `www.reddit.com` | `reddit` | Joe's Reddit account |
| anything else | `anon` | No login |

Any other eBay or Reddit host (`m.ebay.com`, `np.reddit.com`) falls through to
`anon`. For those, pass `"profile"` explicitly or rewrite the URL to a listed host.

### Pacing

One browser serves every request, so the gateway runs them one at a time in FIFO
order. It waits a random gap between starts on the same profile: 20-40 s for `ebay`,
5-10 s for `reddit`, 3-8 s for `anon`. A request can sit behind others for a minute
or more, so give curl a long `-m`. At most five requests can wait behind the running
one.

Keep eBay requests few. They go out from the home IP, and a block pauses the eBay
profile for everyone.

## Responses

| Status | Body | Meaning | What to do |
| --- | --- | --- | --- |
| 200 | HTML | Page rendered | Parse it |
| 400 | `{"error":"invalid_request","message":...}` | Bad body or a disallowed URL | Fix the request |
| 401 | `Unauthorized` (plain text) | Token missing or wrong | Re-source `~/creds.zsh` |
| 401 | `{"session_expired":true,"profile":...}` | Saved login for that profile is missing or expired | Ask Joe to run `pnpm signin <profile>` in the stealth-browser repo; don't retry |
| 423 | `{"blocked":true,"profile":...,"reason":...}` | Site served a bot check; profile now paused 30 min | Don't retry; fall back to the next escalation step |
| 423 | same, `"reason":"paused"`, `Retry-After` header (seconds) | Profile still paused from an earlier block | Don't retry before `Retry-After` |
| 429 | `{"error":"rate_limited","profile":...}` | Target site rate-limited the request; no pause | Back off before the next request to that site |
| 429 | `{"error":"queue_full"}` | Gateway queue is full | Retry shortly |
| 502 | `{"error":"navigation_failed","message":...}` | Navigation failed or timed out | Retry once, then escalate |

The `reason` on a fresh block is one of `ebay_challenge_redirect`,
`interruption_page`, `ebay_error_page`, `captcha`, `verify_human`, or `http_block_status` (the site returned 403).

`pnpm signin` opens a real browser for Joe to log in by hand, so an agent can't run it.
Report the expired profile and move on.

## Domains to send straight here

Skip `webFetch` for these hostnames (exact match, as above). Each one has been tested
through the gateway:

- `www.ebay.com`: sold comps (`/sch/i.html?...&LH_Sold=1&LH_Complete=1`) and Terapeak
  (Seller Hub research URLs). Both need the `ebay` profile; anonymous sold searches
  redirect to sign-in.
- `reddit.com`, `old.reddit.com`, `www.reddit.com`: threads and search, including
  login-walled threads.
- `www.amazon.com`: search results (`anon`).

For other domains, escalate from `webFetch` when the response shows any of:

- HTTP 403 or 429
- Body contains "captcha", "robot", "automated access", or "verify you are human"
  (case-insensitive)
- Body under ~300 characters on a page that is clearly server-rendered (no SPA root div)
- A redirect to a login or challenge page unrelated to the target content
