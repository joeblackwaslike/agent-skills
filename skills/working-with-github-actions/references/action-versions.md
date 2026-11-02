# Action Versions

Latest release versions for commonly used GitHub Actions.
Auto-updated by `scripts/update_docs.js` — do not edit manually.
Last updated: 2026-11-02

## GitHub Official

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|

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
