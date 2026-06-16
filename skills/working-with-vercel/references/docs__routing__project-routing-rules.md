---
title: Project-Level Routing Rules
product: vercel
url: /docs/routing/project-routing-rules
canonical_url: "https://vercel.com/docs/routing/project-routing-rules"
last_updated: 2026-04-02
type: how-to
prerequisites:
  - /docs/routing
related:
  - /docs/routing/redirects/bulk-redirects
  - /docs/routing
  - /docs/rest-api/project-routes
  - /docs/routing-middleware
summary: Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/project-routing-rules.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "d6950cf7a69ae785f7a0b64bdbc1c1f186bdaac993d11283174088857843401b"
---

# Project-Level Routing Rules

Project-level routing rules let you add redirects, rewrites, response headers, and other routing logic from the dashboard, API, or CLI, without deploying new code. Changes take effect immediately after publishing.

These rules are separate from deployment-level routes defined in `vercel.json` or your framework configuration. They run at the CDN level on every request, after [bulk redirects](/docs/routing/redirects/bulk-redirects) and before your deployment's own routes. See the [routing order](/docs/routing#routing-order) for the full sequence.

## Create a routing rule

1. Open your project in the Vercel dashboard.
2. Navigate to [**CDN** > **Routing Rules**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fcdn%2Frouting\&title=Go+to+Project+Routing+Rules).
3. Select **Add Rule**.
4. Enter a **name** and optional **description** for the rule.
5. Define the [match conditions](#match-conditions) that determine which requests the rule applies to.
6. Choose one or more [actions](#available-actions) to apply when a request matches.
7. Select **Save** to add the rule to your staging configuration.

The rule appears in your staging list. To apply it to production, select **Publish**.

## Match conditions

Each rule requires a path condition and supports additional conditions to narrow the match.

### Path matching

Every rule matches against the request path. You can choose from three syntax modes:

| Mode             | Description                                  | Example                      |
| ---------------- | -------------------------------------------- | ---------------------------- |
| **Exact match**  | Matches a specific path                      | `/blog`                      |
| **Path pattern** | Express-style `:param` syntax with wildcards | `/blog/:slug`, `/api/:path*` |
| **Regex**        | Full regular expression                      | `^/posts/[0-9]+$`            |

### Additional conditions

You can add conditions to match on other parts of the request. Each condition specifies a field, an operator, and a value.

| Field      | Description                     | Example use case                                             |
| ---------- | ------------------------------- | ------------------------------------------------------------ |
| **Host**   | The request hostname            | Route differently for `app.example.com` vs `www.example.com` |
| **Header** | A request header key and value  | Match requests with a specific `Accept-Language`             |
| **Cookie** | A cookie key and value          | Target users with a specific session or feature flag cookie  |
| **Query**  | A query parameter key and value | Match requests with `?preview=true`                          |

Each condition supports these operators:

| Operator          | Description                            |
| ----------------- | -------------------------------------- |
| **Equals**        | Exact string match                     |
| **Contains**      | Substring match                        |
| **Matches regex** | Regular expression match               |
| **Exists**        | Field is present (value isn't checked) |

You can also negate any condition to match when the field is *missing* or doesn't match.

## Available actions

When a request matches a rule, one or more actions run. Actions fall into two groups: **primary actions** (mutually exclusive) and **modify actions** (combinable).

### Primary actions

You can use one primary action per rule.

| Action              | Description                                                                                  | Configuration                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Rewrite**         | Forwards the request to a different URL. The visitor's browser still shows the original URL. | A destination URL. Can be internal (`/new-path`) or external (`https://api.example.com/:path*`).                |
| **Redirect**        | Sends the visitor's browser to a different URL with an HTTP status code.                     | A destination URL and a status code: `301` (permanent), `302` (found), `307` (temporary), or `308` (permanent). |
| **Set status code** | Returns a specific HTTP status code without changing the URL.                                | An HTTP status code (e.g., `404`, `503`).                                                                       |

### Modify actions

You can combine multiple modify actions with each other, or pair one with a primary action.

| Action                      | Description                                                                                   | Operations                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Modify response headers** | Adds, changes, or removes response headers.                                                   | **Set**: replace or add a header. **Append**: add a value to an existing header. **Delete**: remove a header. |
| **Modify request headers**  | Adds, changes, or removes headers on the incoming request before it reaches your application. | **Set**, **Append**, **Delete**                                                                               |
| **Modify request query**    | Adds, changes, or removes query parameters on the incoming request.                           | **Set**, **Append**, **Delete**                                                                               |

## Stage, test, and publish

Routing rules use a staging workflow so you can review changes before they affect production traffic.

1. **Stage**: When you create or edit a rule, it's saved to a staging version. Staging changes are visible in the dashboard but don't affect production.
2. **Test**: Use the **Test Rules** feature to verify that a specific URL matches the expected rule and produces the correct action.
3. **Publish**: Select **Publish** to promote your staging changes to production. Changes take effect immediately across all regions.

If a published change causes issues, you can roll back to a previous version from the **History** tab.

## Rule ordering

Rules execute in the order they appear in the list. You can drag and drop rules to change their priority. When a request matches multiple rules, the first matching rule with a primary action (rewrite, redirect, or set status) wins. Modify actions from all matching rules still apply.

## Manage rules with the API

You can also create, read, update, and delete routing rules through the [Vercel REST API](/docs/rest-api/project-routes). Use the API to automate rule management in CI/CD pipelines or manage rules through infrastructure-as-code tools like Terraform.

## Differences from deployment-level routes

Project-level routing rules support the same core actions as `vercel.json` routes: rewrites, redirects, status codes, and header modifications. The main difference is that project-level rules run at the CDN without access to your deployment's code, so [Routing Middleware](/docs/routing-middleware) isn't available. If your routing logic requires custom code (for example, authentication checks or A/B test assignments), use Routing Middleware in your deployment instead.

A few other `vercel.json` fields are also deployment-only: `locale` for i18n routing, and the internal fields `handle`, `check`, `continue`, and `mitigate`.


---

[View full sitemap](/docs/sitemap)
