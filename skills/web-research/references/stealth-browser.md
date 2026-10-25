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
gateway is configured and reachable:

```bash
if [ -n "$STEALTH_BROWSER_URL" ] && [ -n "$STEALTH_BROWSER_TOKEN" ]; then
  curl -sS --connect-timeout 5 -m 10 -o /dev/null -w '%{http_code}\n' \
    "$STEALTH_BROWSER_URL/healthz" -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN"
else
  echo "not configured"
fi
```

Fetch only if this prints `200`. On `not configured`, a 401 (wrong token), or a DNS,
connection, or timeout error, skip the gateway and move to the next step. The gateway
often sits on a private network, so it may not be reachable from this machine.

## Fetching a page

```bash
url='<target-url>'   # write any ' in the URL as %27
dir=$(mktemp -d)     # one directory per fetch, so parallel fetches don't collide
echo "saved to $dir" # a later shell call can't see $dir, so keep this path
curl -sS -m 300 -X POST "$STEALTH_BROWSER_URL/content" \
  -H "Authorization: Bearer $STEALTH_BROWSER_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "$(jq -nc --arg url "$url" '{url:$url}')" \
  -D "$dir/headers.txt" -o "$dir/page.html" -w '%{http_code}\n'
head -c 200000 "$dir/page.html"
```

The recipe needs `jq`, which builds the JSON body so quotes in the URL can't break it.
If `jq` isn't installed, skip the gateway rather than hand-writing the body.

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

### Pacing

One browser serves every request, so the gateway runs them one at a time in FIFO
order. It waits a random gap between starts on the same profile: 20-40 s for `ebay`,
5-10 s for `reddit`, 3-8 s for `anon`. At most five requests wait behind the running
one, and each run can take about 50 s (30 s navigation timeout, plus `waitForTimeout`
and a margin). A request at the back of a full queue can therefore wait close to five
minutes, which is why the recipe uses `-m 300`. Raise it if you raise `waitForTimeout`.

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

Skip `webFetch` for these hostnames:

- `ebay.com` and any subdomain: sold comps (`/sch/i.html?...&LH_Sold=1&LH_Complete=1`) and
  Terapeak (Seller Hub research URLs). Both need the logged-in `ebay` profile;
  anonymous sold searches redirect to sign-in.
- `reddit.com` and any subdomain: threads and search, including login-walled threads.
- `www.amazon.com`: search results and product pages (`anon`).

For other domains, escalate from `webFetch` when the response shows any of:

- HTTP 403 or 429
- Body contains "captcha", "robot", "automated access", or "verify you are human"
  (case-insensitive)
- Body under ~300 characters on a page that is clearly server-rendered (no SPA root div)
- A redirect to a login or challenge page unrelated to the target content
