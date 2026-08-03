# Action Versions

Latest release versions for commonly used GitHub Actions.
Auto-updated by `scripts/update_docs.js` — do not edit manually.
Last updated: 2026-08-03

## GitHub Official

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `actions/checkout` | `v7.0.1` | `uses: actions/checkout@v7.0.1` |
| `actions/setup-node` | `v7.0.0` | `uses: actions/setup-node@v7.0.0` |
| `actions/setup-python` | `v7.0.0` | `uses: actions/setup-python@v7.0.0` |
| `actions/setup-java` | `v5.7.0` | `uses: actions/setup-java@v5.7.0` |
| `actions/setup-go` | `v7.0.0` | `uses: actions/setup-go@v7.0.0` |
| `actions/cache` | `v6.1.0` | `uses: actions/cache@v6.1.0` |

## Package Managers

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|

## Docker

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|

## Cloud Deployments

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|

## Release & Publishing

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|

## Code Quality

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|

## Pinning to SHA (recommended for production)

For production workflows, pin to a full commit SHA rather than a tag to prevent
supply-chain attacks where a tag is moved:

```yaml
# Resolve the SHA for a tag:
#   gh api repos/actions/checkout/git/refs/tags/v4 --jq '.object.sha'
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

Tools like `dependabot` and `pinact` can automate SHA pinning across your workflows.
