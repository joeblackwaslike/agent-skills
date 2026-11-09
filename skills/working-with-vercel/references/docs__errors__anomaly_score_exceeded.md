---
title: ANOMALY_SCORE_EXCEEDED
product: vercel
url: /docs/errors/ANOMALY_SCORE_EXCEEDED
canonical_url: "https://vercel.com/docs/errors/ANOMALY_SCORE_EXCEEDED"
last_updated: 2026-04-14
type: reference
prerequisites:
  []
related:
  - /docs/security/vercel-waf/managed-rulesets
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/firewall-concepts
  - /docs/drains/reference/logs
  - /docs/observability/log-drains
summary: The request was blocked by the OWASP Core Ruleset managed ruleset because its cumulative anomaly score exceeded the configured threshold.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/anomaly_score_exceeded.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "a49c599f4c0370c2e1d6e9f15ebddb8deee15ed828103c02b874307269f7bbdb"
---

# ANOMALY_SCORE_EXCEEDED

The `ANOMALY_SCORE_EXCEEDED` error occurs when a request is blocked by the [OWASP Core Ruleset](/docs/security/vercel-waf/managed-rulesets#configure-owasp-core-ruleset) managed ruleset. The OWASP CRS uses an anomaly scoring model: each rule that matches a request adds points to a cumulative score. When the total score exceeds the configured threshold, the request is denied with this error.

This typically means the request contained patterns associated with common web threats (SQL injection, cross-site scripting, etc.) that triggered enough OWASP rules to exceed the blocking threshold.

**Error Code:** `403`

**Name:** Forbidden

## Troubleshoot

If the blocked request is legitimate traffic (a false positive), the project owner can adjust the firewall configuration:

1. **Review matched rules**:
   - From your project's [dashboard](/dashboard), open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar
   - Navigate to **Rules** > **OWASP Core Ruleset** > **Configure**
   - Review which specific rules triggered and contributed to the anomaly score
2. **Set rules to Log mode**: For rules causing false positives, change the action from **Deny** to **Log**. This allows you to monitor traffic without blocking it while you assess whether the rule applies to your application
3. **Disable overly aggressive rules**: If certain rules consistently trigger with legitimate traffic, consider disabling them. Review each rule's purpose to ensure you're not reducing security unnecessarily
4. **Create bypass rules**: Use a [WAF Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules) with a [bypass](/docs/vercel-firewall/firewall-concepts#bypass) action to allow specific requests that should not be evaluated by the OWASP ruleset
5. **Monitor firewall logs**: After making changes, monitor the **Firewall** overview page to verify that legitimate traffic is no longer blocked and that your application remains protected

For more details on configuring the OWASP Core Ruleset, see [WAF Managed Rulesets](/docs/security/vercel-waf/managed-rulesets).

## CLI and API troubleshooting

You can also investigate and resolve `ANOMALY_SCORE_EXCEEDED` errors using the Vercel CLI and API.

### View blocked requests

Use the CLI to filter logs for blocked requests:

```bash
vercel logs requests --query 'httpStatus:403' --since 1h
```

To show only the requests that the firewall denied, add a `wafAction` filter:

```bash
vercel logs requests --query 'httpStatus:403 AND wafAction:deny' --since 1h
```

For JSON output with more request details:

```bash
vercel logs requests --query 'httpStatus:403' --json
```

The JSON output has one line for each request and ends with a summary line. Each request line has a `data` object with fields such as `requestHostname`, `requestMethod`, `requestPath`, `httpStatus`, and `wafAction`. A request that the firewall denied has `wafAction` set to `deny`. The output doesn't include the ID of the firewall rule that matched. To get the rule ID, use [Log Drains](/docs/drains/reference/logs), which include it in the `proxy.wafRuleId` field.

### Read firewall configuration

Query your project's firewall config via the API:

```bash
vercel api "/v1/security/firewall/config?projectId=<project-id>"
```

### Update OWASP rules

To switch a rule to Log mode, use a PATCH request:

```bash
vercel api "/v1/security/firewall/config?projectId=<project-id>" -X PATCH \
  --input config.json
```

Where `config.json` contains:

```json filename="config.json"
{
  "action": "crs.update",
  "id": "xss",
  "value": { "active": true, "action": "log" }
}
```

Available OWASP rule IDs: `sd` (scanner detection), `ma` (multipart attack), `lfi` (local file inclusion), `rfi` (remote file inclusion), `rce` (remote code execution), `php`, `gen` (generic), `xss`, `sqli` (SQL injection), `sf` (session fixation), `java`.

To disable a rule entirely, set `"active": false`. To disable all OWASP rules at once, use the `crs.disable` action.

### Create bypass rules via API

Add a bypass rule with `rules.insert`:

```json filename="config.json"
{
  "action": "rules.insert",
  "value": {
    "name": "Bypass for internal API",
    "active": true,
    "conditionGroup": [
      {
        "conditions": [{ "type": "path", "op": "pre", "value": "/api/internal" }]
      }
    ],
    "action": { "mitigate": { "action": "bypass" } }
  }
}
```

### Ongoing monitoring

For continuous monitoring, use [Log Drains](/docs/observability/log-drains) with `source: "firewall"` to stream WAF events to your SIEM or logging infrastructure.

You can also manage firewall rules as code using the [Terraform provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/firewall_config) with the `vercel_firewall_config` resource.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
