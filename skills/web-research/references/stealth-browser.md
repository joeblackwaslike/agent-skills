# stealth-browser gateway

[stealth-browser](https://github.com/joeblackwaslike/stealth-browser) is a self-hosted
gateway in front of Camoufox, a patched Firefox with a pinned fingerprint. It can keep
logged-in eBay and Reddit sessions. Use it when a site blocks agents: 403, 429, a
CAPTCHA, a login wall, or a near-empty body on a server-rendered page. The repo README
covers what the gateway is and how to deploy it.

## Credentials

The agent needs `STEALTH_BROWSER_URL` and `STEALTH_BROWSER_TOKEN` in its environment.
If either is unset, skip the gateway and go to the next escalation step. Don't search
the machine for credentials. Never print the token, not even a prefix. Check that the
gateway is reachable:

```bash
[ -n "$STEALTH_BROWSER_URL" ] && [ -n "$STEALTH_BROWSER_TOKEN" ] || echo "not configured"
curl -sS -o /dev/null -w '%{http_code}\n' "$STEALTH_BROWSER_URL/healthz" \
  -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN"   # 200 = ok
```

If DNS or the connection fails, the gateway is down or not reachable from this machine
(it often sits on a private network). Move to the next step.

## Fetching a page

```bash
curl -sS -m 120 -X POST "$STEALTH_BROWSER_URL/content" \
  -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"url":"<target-url>"}' | head -c 200000
```

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `url` | string | required | Public `http`/`https` only. Loopback, private IPs, and bare hostnames get a 400. |
| `waitForTimeout` | int, 0-15000 ms | 3000 | Extra wait after load. Raise it only when lazy-loaded content is missing. |

A 200 returns the rendered HTML (`text/html`). Parse it like a `webFetch` result. The
`X-Final-Url` header holds the URL after redirects. `head -c 200000` caps the output
at about 200 KB to save context. That cap is fine for Reddit (~190 KB) but cuts
Amazon search off before the first result, because the page is ~2 MB and results
start past byte 300,000. For pages that size, save with `-o page.html` and pull what you
need with `grep`.

### Profiles

The gateway picks the profile from the URL's hostname, so send only `url`. A profile
owns its domain and every subdomain of it:

| Hostname | Profile |
| --- | --- |
| `ebay.com` or any subdomain (`www.ebay.com`, `m.ebay.com`) | `ebay`, logged in |
| `reddit.com` or any subdomain (`old.reddit.com`, `www.reddit.com`) | `reddit`, logged in |
| anything else (Amazon included) | `anon`, no login |

### Pacing

One browser serves every request, so the gateway runs them one at a time in FIFO
order. It waits a random gap between starts on the same profile: 20-40 s for `ebay`,
5-10 s for `reddit`, 3-8 s for `anon`. A request can sit behind others for a minute
or more, so give curl a long `-m`. At most five requests can wait behind the running
one.

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
`interruption_page`, `ebay_error_page`, `captcha`, `verify_human`, or `http_block_status` (the site returned 403).

`pnpm signin` has a person log in by hand in a remote browser, so an agent can't run it.
Report the expired profile and move on.

## Domains to send straight here

Skip `webFetch` for these hostnames. Each one has been tested through the gateway:

- eBay (any subdomain): sold comps (`/sch/i.html?...&LH_Sold=1&LH_Complete=1`) and
  Terapeak (Seller Hub research URLs). Both need the logged-in `ebay` profile;
  anonymous sold searches redirect to sign-in.
- Reddit (any subdomain): threads and search, including login-walled threads.
- `www.amazon.com`: search results and product pages (`anon`).

For other domains, escalate from `webFetch` when the response shows any of:

- HTTP 403 or 429
- Body contains "captcha", "robot", "automated access", or "verify you are human"
  (case-insensitive)
- Body under ~300 characters on a page that is clearly server-rendered (no SPA root div)
- A redirect to a login or challenge page unrelated to the target content
