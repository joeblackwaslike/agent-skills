---
title: AI Gateway Routing Rules
product: vercel
url: /docs/ai-gateway/models-and-providers/routing-rules
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules"
last_updated: 2026-09-17
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/models-and-providers/virtual-models
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway
summary: Define team-wide rules that rewrite requests from one model to another or deny specific models in AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "796e0fa600c961f41370420b46a07fbbcd42bf562bf9033fd4bff31b2baff008"
---

# AI Gateway Routing Rules

Routing rules let you control how AI Gateway handles your team's requests at the model level. You define team-wide rules that either rewrite a request from one model to another, or deny a model so requests for it are blocked. Rules apply to every request made with your team's AI Gateway credentials, so you can change routing behavior without editing application code.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules)
- [Cat Jam is now available in stealth for free on AI Gateway](https://vercel.com/changelog/cat-jam-is-now-available-in-stealth-for-free-on-ai-gateway)
- [DeepSeek V4.1 Flash 1017 now available on AI Gateway](https://vercel.com/changelog/deepseek-v4-1-flash-1017-now-available-on-ai-gateway)
- [DeepSeek V4.1 Flash now available on AI Gateway](https://vercel.com/changelog/deepseek-v4-1-flash-now-available-on-ai-gateway)
- [Drama 3 now available on AI Gateway](https://vercel.com/changelog/drama-3-now-available-on-ai-gateway)
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [List rules](https://vercel.com/docs/rest-api/ai-gateway/list-rules) — GET /ai-gateway/rules — List the authenticated team's routing rules, oldest first. Without \\`limit\\` or \\`cursor\\`, retu
- [Create rule](https://vercel.com/docs/rest-api/ai-gateway/create-rule) — POST /ai-gateway/rules — Create a routing rule
- [Update rule](https://vercel.com/docs/rest-api/ai-gateway/update-rule) — PATCH /ai-gateway/rules — Update a routing rule \\(enabled, action, or description\\)
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code
- [Routing](https://vercel.com/docs/routing) — Learn how Vercel's CDN routes requests through firewall, project routes, and deployment routes before reaching your appl

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/routing-rules.graph.md](/docs/ai-gateway/models-and-providers/routing-rules.graph.md)
<!-- /docsgraph:related -->

## How routing rules work

Each rule has a type and matches requests by model:

- **Rewrite**: AI Gateway serves requests for the source model with a destination model instead. Use this to standardize on a model, roll out a replacement, or route an expensive model to a cheaper one.
- **Deny**: AI Gateway blocks requests for the matched model. Use this to stop your team from using a model you have not approved.

Each rule is scoped to a single team. You can attach an optional reason to a rule, which AI Gateway surfaces when the rule applies, and a description to document why the rule exists.

## Manage rules with the CLI

You manage routing rules with the [`vercel ai-gateway rules`](/docs/cli/ai-gateway#rules) command. Target a team with the global `--scope` flag, or use your currently selected team. Every subcommand supports `--format json` for scripting.

```bash filename="terminal"
vercel ai-gateway rules list --scope your-team
```

## Rewrite a model

Create a rewrite rule with a source model (`--source`) and a destination model (`--destination`):

```bash filename="terminal"
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-5 --destination anthropic/claude-haiku-4.5
```

Once the rule is active, AI Gateway serves any request for `anthropic/claude-opus-5` with `anthropic/claude-haiku-4.5`. Your application keeps requesting the source model and AI Gateway substitutes the destination.

## Deny a model

Create a deny rule with the model to block:

```bash filename="terminal"
vercel ai-gateway rules add --type deny --source openai/gpt-6-astra
```

A request for a denied model returns a `403`:

```json
{
  "error": {
    "message": "Request denied by a routing rule.",
    "param": { "ruleId": "rule_123" },
    "type": "forbidden"
  }
}
```

## Edit or disable a rule

Update a rule by its ID. You can change the destination, reason, or description, or toggle the rule on and off:

```bash filename="terminal"
vercel ai-gateway rules edit rule_123 --destination anthropic/claude-sonnet-5
```

```bash filename="terminal"
vercel ai-gateway rules edit rule_123 --disable
```

A disabled rule stays in your configuration but stops applying to requests. To include disabled rules in the list, pass `--include-disabled`.

## Remove a rule

Delete a rule by its ID:

```bash filename="terminal"
vercel ai-gateway rules remove rule_123
```

## How rules apply

Routing rules apply to every request made with your team's AI Gateway credentials. Rule changes can take a short time to propagate. In-flight requests finish under the previous configuration, and new requests respect the updated rules once the change has propagated.

### Virtual models

A deny rule also prevents the matched model from executing through a [virtual model](/docs/ai-gateway/models-and-providers/virtual-models).

Rewrites apply before virtual model resolution, so a rewrite can send direct callers to a virtual model:

```bash filename="terminal"
vercel ai-gateway rules add --type rewrite --source openai/gpt-6-astra --destination vmc/abc-123
```

The destination virtual model must be active: a missing or archived one is rejected with a `400`. AI Gateway does not apply rewrites again to the model inside the virtual model, so rewriting a model to a virtual model that points back at it does not loop.

For example, if `vmc/abc-123` points at `openai/gpt-6-astra`, that rewrite sends callers through the virtual model's configuration. A deny on `openai/gpt-6-astra` would also block its use through `vmc/abc-123`. Use the rewrite without the deny when you want callers to use the virtual model.

### Model fallbacks

Each [fallback](/docs/ai-gateway/models-and-providers/model-fallbacks) selection goes through routing rules before AI Gateway tries it. Rewrites change the fallback destination. Deny rules prevent the matched fallback from executing, including when a virtual model resolves to it.

AI Gateway skips denied fallback candidates and can continue to another allowed model. If every candidate is denied, the request returns `403`. If a deny matches the model you request directly, the request returns `403` immediately, even with fallbacks configured. A deny that matches only the model behind a requested virtual model skips that attempt and continues to the next fallback.

When an allowed model reaches a provider and fails, and every remaining candidate is denied, the request returns that failure. A candidate that never reaches a provider, for example when no provider matches its `only` filter, leaves the deny as the most specific result, so the request returns `403`.

A fallback rewrite can itself point at a model that another rule rewrites. A chain that cycles back to an earlier model, or exceeds ten rewrites, is a configuration error. On the model you request, it fails the request with a `400`. On a fallback, it skips that candidate the way a deny does, so an earlier failure or a later allowed candidate decides the response.

## Provider options

A rule only changes which model serves a request. Everything else you send is preserved and applied to the destination model, including [`providerOptions`](/docs/ai-gateway/models-and-providers/provider-options), the `only` filter, fallbacks, and BYOK.

One caveat: `providerOptions` are namespaced per provider and are not translated across providers. If a rewrite routes to a different provider, options for the original provider no longer apply (for example, `providerOptions.anthropic` has no effect on an `openai` destination). Keep rewrites within the same provider, or set the destination provider's options.

## Permissions

Routing rules are managed per team, so your access depends on your role in the team that owns the rules:

- **Owners** and **Members** can create, edit, and remove rules.
- **Developers** can view rules but not change them.
- Other roles have no access to routing rules.

## Related

- [`vercel ai-gateway rules` CLI reference](/docs/cli/ai-gateway#rules)
- [AI Gateway overview](/docs/ai-gateway)
- [Provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
