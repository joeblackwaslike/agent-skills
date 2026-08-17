---
title: vercel routes
product: vercel
url: /docs/cli/routes
canonical_url: "https://vercel.com/docs/cli/routes"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Learn how to manage project-level routing rules using the vercel routes CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/routes.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1502060e89123602eac00e790d7d99adec340ec58914145f77fc37b7d6787697"
---

# vercel routes

The `vercel routes` command lets you manage routing rules for a project. These routing rules are managed at the project level and apply to all deployments and environments. They take effect immediately after being created and published, without requiring code changes or a new deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins?from=related) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [Can I use Vercel as a reverse proxy?](https://vercel.com/kb/guide/vercel-reverse-proxy-rewrites-external?from=related) — Learn how to use rewrites to proxy requests from Vercel to other deployments.
- [Project Routing Rules](https://vercel.com/docs/routing/project-routing-rules?from=related) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Edit a routing rule](https://vercel.com/docs/rest-api/project-routes/edit-a-routing-rule?from=related)
- [Promote, restore, or discard a routing rule version](https://vercel.com/docs/rest-api/project-routes/promote-restore-or-discard-a-routing-rule-version?from=related)
- [Add a routing rule](https://vercel.com/docs/rest-api/project-routes/add-a-routing-rule?from=related)
- [vercel redirects](https://vercel.com/docs/cli/redirects?from=related) — Learn how to manage project-level redirects using the vercel redirects CLI command.

Full cross-link map for this page: [/docs/cli/routes.graph.md](/docs/cli/routes.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Routes can also be defined in source control using `vercel.json` or
> `vercel.ts`.

## Usage

```bash filename="terminal"
vercel routes list
```

*Using the \`vercel routes\` command to list all
routing rules for the current project.*

## Staging workflow

When you add, edit, delete, enable, disable, or reorder routes, changes are staged first. Staged changes don't affect production traffic until you publish them:

```bash filename="terminal"
# Make changes (they're staged automatically)
vercel routes add --ai "Rewrite /api/* to https://backend.internal/*" --yes

# Review staged changes
vercel routes list --diff

# Publish to production
vercel routes publish
```

To discard staged changes without publishing, run `vercel routes discard-staging`.

## Commands

### `list`

List all routing rules for the current project.

```bash filename="terminal"
vercel routes list [options]
```

**Options:**

- `-s, --search <QUERY>`: Search by name, description, source, or destination
- `-f, --filter <TYPE>`: Filter by type: `rewrite`, `redirect`, `set_status`, `transform`
- `--production`: List routes from the live production version
- `--version-id <VERSION_ID>`: List routes from a specific version ID (supports prefix matching)
- `--diff`: Compare staged changes against production. Use with `--version-id` to compare a specific version.
- `-e, --expand`: Show expanded details for each route

**Examples:**

```bash filename="terminal"
# List all routes
vercel routes list

# Search for routes
vercel routes list --search "api"

# Filter by type
vercel routes list --filter rewrite

# Show staged changes with diff markers
vercel routes list --diff

# Show live production routes
vercel routes list --production

# Show expanded details
vercel routes list --expand
```

### `list-versions`

List all versions of routing rules for the current project.

```bash filename="terminal"
vercel routes list-versions [options]
```

**Options:**

- `--count <NUMBER>`: Number of versions to fetch (default: 20, max: 100)

**Examples:**

```bash filename="terminal"
# List route versions
vercel routes list-versions

# List more versions
vercel routes list-versions --count 50
```

### `inspect`

Show detailed information about a specific route.

```bash filename="terminal"
vercel routes inspect name-or-id [options]
```

**Options:**

- `--diff`: Compare staged changes against production for this route

**Examples:**

```bash filename="terminal"
# Inspect a route by name
vercel routes inspect "API Proxy"

# Inspect a route by ID
vercel routes inspect abc123

# Show staged changes for a route
vercel routes inspect "API Proxy" --diff
```

### `add`

Add a new routing rule. Run without flags for interactive mode, or use `--ai` to describe what you want in natural language.

```bash filename="terminal"
vercel routes add [name] [options]
```

**Options:**

- `--ai <PROMPT>`: Generate a route from a natural language description
- `--src <PATTERN>`: Path pattern to match
- `--src-syntax <SYNTAX>`: Path syntax: `regex` (default), `path-to-regexp`, `equals`
- `--action <TYPE>`: Action type: `rewrite`, `redirect`, or `set-status` (required with `--dest` or `--status`)
- `--dest <URL>`: Destination URL for rewrite or redirect
- `--status <CODE>`: HTTP status code (301, 302, 303, 307, 308 for redirects, or any valid code for set-status)
- `--has <CONDITION>`: Condition that must match (repeatable)
- `--missing <CONDITION>`: Condition that must not match (repeatable)
- `--set-response-header <KEY=VALUE>`: Set a response header (repeatable)
- `--append-response-header <KEY=VALUE>`: Append to a response header (repeatable)
- `--delete-response-header <KEY>`: Delete a response header (repeatable)
- `--set-request-header <KEY=VALUE>`: Set a request header (repeatable)
- `--append-request-header <KEY=VALUE>`: Append to a request header (repeatable)
- `--delete-request-header <KEY>`: Delete a request header (repeatable)
- `--set-request-query <KEY=VALUE>`: Set a query parameter (repeatable)
- `--append-request-query <KEY=VALUE>`: Append to a query parameter (repeatable)
- `--delete-request-query <KEY>`: Delete a query parameter (repeatable)
- `--description <TEXT>`: Route description (max 1024 characters)
- `--disabled`: Create the route in a disabled state
- `--position <POSITION>`: Position: `start`, `end`, `before:<id>`, `after:<id>`
- `-y, --yes`: Skip confirmation prompts

**Condition format:** `type:key`, `type:key:value`, or `type:key:op=value`. Types: `header`, `cookie`, `query`, `host`. Operators: `eq`, `contains`, `re`, `exists`.

**Examples:**

```bash filename="terminal"
# Interactive mode
vercel routes add

# Generate with AI
vercel routes add --ai "Rewrite /api/* to https://backend.internal/*" --yes

# Add a rewrite with path pattern syntax
vercel routes add "API Proxy" \
  --src "/api/:path*" --src-syntax path-to-regexp \
  --action rewrite --dest "https://api.example.com/:path*" --yes

# Add a redirect
vercel routes add "Old Blog" \
  --src "/blog" --src-syntax equals \
  --action redirect --dest "/articles" --status 301 --yes

# Add CORS response headers
vercel routes add "CORS" \
  --src "^/api/.*$" \
  --set-response-header "Access-Control-Allow-Origin=*" \
  --set-response-header "Access-Control-Allow-Methods=GET,POST,PUT,DELETE" --yes

# Block access with a status code
vercel routes add "Block Admin" \
  --src "^/admin/.*$" \
  --action set-status --status 403 --yes

# Conditional route (require a session cookie)
vercel routes add "Auth Required" \
  --src "/protected/:path*" --src-syntax path-to-regexp \
  --action redirect --dest "/login" --status 307 \
  --missing "cookie:session" --yes
```

### `edit`

Edit an existing routing rule. Run without edit flags for interactive mode, or use `--ai` to describe changes in natural language.

```bash filename="terminal"
vercel routes edit name-or-id [options]
```

**Options:**

- `--ai <PROMPT>`: Describe changes using natural language
- `--name <NAME>`: Change the route name
- `--description <TEXT>`: Change the description (use `""` to clear)
- `--src <PATTERN>`: Change the source path pattern
- `--src-syntax <SYNTAX>`: Change the path syntax: `regex`, `path-to-regexp`, `equals`
- `--action <TYPE>`: Set action type: `rewrite`, `redirect`, or `set-status` (required when switching types)
- `--dest <URL>`: Set the destination URL
- `--status <CODE>`: Set the status code
- `--no-dest`: Remove the destination
- `--no-status`: Remove the status code
- `--has <CONDITION>`: Add a condition that must match (repeatable)
- `--missing <CONDITION>`: Add a condition that must not match (repeatable)
- `--clear-conditions`: Remove all conditions
- `--set-response-header <KEY=VALUE>`: Set a response header (repeatable)
- `--append-response-header <KEY=VALUE>`: Append to a response header (repeatable)
- `--delete-response-header <KEY>`: Delete a response header (repeatable)
- `--clear-headers`: Remove all response headers
- `--set-request-header <KEY=VALUE>`: Set a request header (repeatable)
- `--append-request-header <KEY=VALUE>`: Append to a request header (repeatable)
- `--delete-request-header <KEY>`: Delete a request header (repeatable)
- `--set-request-query <KEY=VALUE>`: Set a query parameter (repeatable)
- `--append-request-query <KEY=VALUE>`: Append to a query parameter (repeatable)
- `--delete-request-query <KEY>`: Delete a query parameter (repeatable)
- `--clear-transforms`: Remove all request header and query transforms
- `-y, --yes`: Skip confirmation prompts

**Examples:**

```bash filename="terminal"
# Interactive mode
vercel routes edit "API Proxy"

# Edit with AI
vercel routes edit "API Proxy" --ai "Add a Cache-Control header set to no-store"

# Change the destination
vercel routes edit "API Proxy" --dest "https://new-api.example.com/:path*"

# Switch to a redirect
vercel routes edit "Old Route" --action redirect --dest "/new" --status 301

# Add a response header
vercel routes edit "My Route" \
  --set-response-header "Cache-Control=public, max-age=3600"

# Clear all conditions and add new ones
vercel routes edit "My Route" --clear-conditions --has "header:Authorization"
```

### `delete`

Delete one or more routing rules.

```bash filename="terminal"
vercel routes delete name-or-id [...name-or-id] [options]
```

**Options:**

- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Delete a route by name
vercel routes delete "Old Redirect"

# Delete multiple routes
vercel routes delete "Route A" "Route B"

# Delete without confirmation
vercel routes delete "Old Route" --yes
```

### `enable`

Enable a disabled routing rule.

```bash filename="terminal"
vercel routes enable name-or-id
```

**Example:**

```bash filename="terminal"
vercel routes enable "API Proxy"
```

### `disable`

Disable a routing rule without deleting it. Disabled routes remain in your configuration but don't affect traffic.

```bash filename="terminal"
vercel routes disable name-or-id
```

**Example:**

```bash filename="terminal"
vercel routes disable "API Proxy"
```

### `reorder`

Move a routing rule to a different position. Routes are evaluated in order, so position affects which route matches first.

```bash filename="terminal"
vercel routes reorder name-or-id [options]
```

**Options:**

- `--position <POSITION>`: Target position: a number (1-based), `start`, `end`, `before:<id>`, `after:<id>`
- `--first`: Move to the first position (highest priority)
- `--last`: Move to the last position (lowest priority)
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Move to first position
vercel routes reorder "Catch All" --first

# Move to a specific position
vercel routes reorder "API Proxy" --position 3

# Move after another route
vercel routes reorder "API Proxy" --position after:route-id-123

# Interactive reorder (prompts for position)
vercel routes reorder "API Proxy"
```

### `export`

Export routes in `vercel.json` or `vercel.ts` format.

```bash filename="terminal"
vercel routes export [name-or-id] [options]
```

**Options:**

- `--format <FORMAT>`: Output format: `json` (default) or `ts`

**Examples:**

```bash filename="terminal"
# Export as vercel.json format
vercel routes export

# Export as vercel.ts format
vercel routes export --format ts

# Export a specific route
vercel routes export "API Proxy"

# Export to a file
vercel routes export > routes.json
```

### `publish`

Publish staged routing changes to production.

```bash filename="terminal"
vercel routes publish [options]
```

**Options:**

- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Publish staged changes
vercel routes publish

# Publish without confirmation
vercel routes publish --yes
```

### `restore`

Restore a previous routing version to production. The restored version takes effect immediately.

```bash filename="terminal"
vercel routes restore version-id [options]
```

**Options:**

- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Restore a previous version
vercel routes restore version-id

# Restore without confirmation
vercel routes restore version-id --yes
```

### `discard-staging`

Discard all staged routing changes without publishing them.

```bash filename="terminal"
vercel routes discard-staging [options]
```

**Options:**

- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Discard staged changes
vercel routes discard-staging

# Discard without confirmation
vercel routes discard-staging --yes
```


---

[View full sitemap](/docs/sitemap)
