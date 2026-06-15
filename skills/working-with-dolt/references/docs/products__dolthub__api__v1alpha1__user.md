---
title: "User"
description: User and organization endpoints.
source: "https://www.dolthub.com/docs/products/dolthub/api/v1alpha1/user.md"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "f9b02d6f236205a71b47c4dea3bfe95f950c4ad41d904031527e3dc86f5124e5"
---

# User

DoltHub provides a user API for retrieving information about the authenticated user.

> **Note:** Please make sure to send your requests to `https://www.dolthub.com` instead of `https://dolthub.com`.

## Get current user

Here's an example of how to fetch information about the authenticated user using an [authorization token](authentication).

This endpoint requires authentication, so you must include this authorization header in your request. See the [Authentication](authentication) section for more details.

```python
headers = {
    'authorization': 'token [api token you created]'
}
```

<div class="api-endpoint">
<div class="api-endpoint-header">
<span class="api-method" style="background:#29E3C1">GET</span>
<code class="api-path">/user</code>
</div>
<p class="api-summary">Get current user</p>
<p class="api-description">Returns information about the authenticated user, including their username, display name, profile picture, and email addresses.</p>
<div class="api-url"><strong>URL</strong> <code>https://www.dolthub.com/api/v1alpha1/user</code></div>
<div class="api-section">
<h5>Responses</h5>
<div class="api-response"><span class="api-status-success">200</span> Success</div>
<div class="api-response"><span class="api-status-error">401</span> Not authenticated. The request did not include a valid API token.</div>
</div>
</div>

