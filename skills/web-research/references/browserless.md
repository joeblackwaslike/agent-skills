# Browserless — Self-Hosted Headless Chrome

Self-hosted Browserless instance on Joe's K8s cluster. Use when a site actively blocks
agent/bot user agents (403, 429, CAPTCHA, empty body on a server-rendered page).

## Credentials

```bash
source ~/creds.zsh   # exports $BROWSERLESS_URL and $BROWSERLESS_TOKEN
```

Both `BROWSERLESS_URL` and `BROWSERLESS_TOKEN` must be set before any `curl` call.

**Credential setup:** Create `~/creds.zsh` with:
```bash
export BROWSERLESS_URL="<self-hosted-instance-url>"
export BROWSERLESS_TOKEN="<auth-token>"
```

**Verify credentials before use:**
```bash
source ~/creds.zsh
echo "URL: $BROWSERLESS_URL | Token: ${BROWSERLESS_TOKEN:0:10}..."
```

**Diagnosing HTTP errors:**
- **401 Unauthorized**: `BROWSERLESS_TOKEN` is missing, empty, or expired. Re-check `~/creds.zsh` was sourced and token is correct.
- **403 Forbidden**: Token is valid but does not have permission for this endpoint (unlikely; contact operator).
- **404 Not Found**: `BROWSERLESS_URL` is incorrect or instance is not running.
- **5xx errors**: Browserless instance is down or overloaded. Retry after a short delay.

## Page Content Endpoint

```bash
source ~/creds.zsh
curl -sS -X POST "$BROWSERLESS_URL/content" \
  -H "Authorization: Bearer $BROWSERLESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"url":"<target-url>","waitForTimeout":3000}' | head -c 200000
```

- Response is fully rendered HTML. Parse it exactly like a `webFetch` response.
- `head -c 200000` caps the output at ~200KB to keep context manageable.

### `waitForTimeout` tuning

| Page type | Recommended timeout |
|-----------|-------------------|
| Standard server-rendered | 3000 ms (default) |
| JS-heavy / lazy-loaded content | 5000–8000 ms |
| Feed or infinite-scroll pages | 6000–10000 ms |

## Known-Blocking Domains

Skip `webFetch` entirely for these hostnames — go straight to Browserless (step 3).

**Hostname matching:** Extract the hostname from the URL (e.g., `urllib.parse.urlparse(url).netloc`), then check for an exact string match against this list. The list includes both bare domains and www-prefixed variants; do not strip www or perform suffix matching.

- `reddit.com`, `old.reddit.com`, `www.reddit.com`
- `ebay.com`, `www.ebay.com`
- `linkedin.com`, `www.linkedin.com`
- `instagram.com`, `www.instagram.com`
- `twitter.com`, `x.com`, `www.twitter.com`, `www.x.com`
- `zillow.com`, `www.zillow.com`
- `glassdoor.com`, `www.glassdoor.com`

## Detection Heuristics (for unknown domains)

Escalate from `webFetch` to Browserless when the response shows any of:

- HTTP status 403 or 429
- Body contains "captcha", "robot", "automated access", "verify you are human" (case-insensitive)
- Body is < ~300 characters on a page that is clearly server-rendered (no SPA root div)
- Body contains a redirect to a login/challenge page unrelated to the target content
