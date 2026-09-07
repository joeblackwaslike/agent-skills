# Browserless — Self-Hosted Headless Chrome

Self-hosted Browserless instance on Joe's K8s cluster. Use when a site actively blocks
agent/bot user agents (403, 429, CAPTCHA, empty body on a server-rendered page).

## Credentials

```bash
source ~/creds.zsh   # exports $BROWSERLESS_URL and $BROWSERLESS_TOKEN
```

Both vars must be set before any `curl` call.

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

Skip `webFetch` entirely for these hostnames — go straight to Browserless (step 3):

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
