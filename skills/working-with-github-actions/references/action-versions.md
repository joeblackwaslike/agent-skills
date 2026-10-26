# Action Versions

Latest release versions for commonly used GitHub Actions.
Auto-updated by `scripts/update_docs.js` — do not edit manually.
Last updated: 2026-10-26

## GitHub Official

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `actions/checkout` | `v7.0.1` | `uses: actions/checkout@v7.0.1` |
| `actions/setup-node` | `v7.1.0` | `uses: actions/setup-node@v7.1.0` |
| `actions/setup-python` | `v7.1.0` | `uses: actions/setup-python@v7.1.0` |
| `actions/setup-java` | `v6.1.0` | `uses: actions/setup-java@v6.1.0` |
| `actions/setup-go` | `v7.0.0` | `uses: actions/setup-go@v7.0.0` |
| `actions/cache` | `v6.1.0` | `uses: actions/cache@v6.1.0` |
| `actions/upload-artifact` | `v7.0.2` | `uses: actions/upload-artifact@v7.0.2` |
| `actions/download-artifact` | `v8.0.2` | `uses: actions/download-artifact@v8.0.2` |
| `actions/github-script` | `v9.0.0` | `uses: actions/github-script@v9.0.0` |
| `actions/labeler` | `v7.0.0` | `uses: actions/labeler@v7.0.0` |
| `actions/stale` | `v11.0.0` | `uses: actions/stale@v11.0.0` |
| `actions/dependency-review-action` | `v5.0.0` | `uses: actions/dependency-review-action@v5.0.0` |

## Package Managers

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `pnpm/action-setup` | `v6.1.0` | `uses: pnpm/action-setup@v6.1.0` |

## Docker

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `docker/login-action` | `v4.7.0` | `uses: docker/login-action@v4.7.0` |
| `docker/build-push-action` | `v7.4.0` | `uses: docker/build-push-action@v7.4.0` |
| `docker/metadata-action` | `v6.2.0` | `uses: docker/metadata-action@v6.2.0` |
| `docker/setup-buildx-action` | `v4.4.1` | `uses: docker/setup-buildx-action@v4.4.1` |
| `docker/setup-qemu-action` | `v4.4.0` | `uses: docker/setup-qemu-action@v4.4.0` |

## Cloud Deployments

| Action | Latest tag | Pin usage |
|--------|-----------|-----------|
| `aws-actions/configure-aws-credentials` | `v6.3.0` | `uses: aws-actions/configure-aws-credentials@v6.3.0` |
| `aws-actions/amazon-ecr-login` | `v2.1.7` | `uses: aws-actions/amazon-ecr-login@v2.1.7` |

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
