---
title: Routing Rules
product: vercel
url: /docs/ai-gateway/models-and-providers/routing-rules
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway
  - /docs/ai-gateway/security-and-compliance/provider-allowlist
summary: Learn about routing rules on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "9aa13e42e5abda67d86fa37a95cf7e484f4b6bbe44897838d6a001f75a94e255"
---

# Routing Rules

Routing rules let you control how AI Gateway handles your team's requests at the model level. You define team-wide rules that either rewrite a request from one model to another, or deny a model so requests for it are blocked. Rules apply to every request made with your team's AI Gateway credentials, so you can change routing behavior without editing application code.

> **💡 Note:** AI Gateway routing rules are in beta and may change before general
> availability. Avoid relying on them in production.

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
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-4.7 --destination anthropic/claude-haiku-4.5
```

Once the rule is active, AI Gateway serves any request for `anthropic/claude-opus-4.7` with `anthropic/claude-haiku-4.5`. Your application keeps requesting the source model and AI Gateway substitutes the destination.

## Deny a model

Create a deny rule with the model to block:

```bash filename="terminal"
vercel ai-gateway rules add --type deny --source openai/gpt-5.5
```

A request for a denied model returns a `403`:

```json
{
  "error": "Request denied by a routing rule.",
  "type": "forbidden",
  "statusCode": 403
}
```

## Edit or disable a rule

Update a rule by its ID. You can change the destination, reason, or description, or toggle the rule on and off:

```bash filename="terminal"
vercel ai-gateway rules edit rule_123 --destination anthropic/claude-sonnet-4.6
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
