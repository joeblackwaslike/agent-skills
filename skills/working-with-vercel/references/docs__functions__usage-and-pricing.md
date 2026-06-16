---
title: Fluid compute pricing
product: vercel
url: /docs/functions/usage-and-pricing
canonical_url: "https://vercel.com/docs/functions/usage-and-pricing"
last_updated: 2026-03-19
type: reference
prerequisites:
  - /docs/functions
related:
  - /docs/fluid-compute
summary: Learn about usage and pricing for fluid compute on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/usage-and-pricing.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "f6f37b83d6556df93db06d577437f5a7951f44545b62aa28e5dc3e4f08cc6cc5"
---

# Fluid compute pricing

Vercel Functions on fluid compute are priced based on your plan and resource usage. Each plan includes a set amount of resources per month:

| Resource | Hobby | Pro |
| --- | --- | --- |
| **Active CPU** | 4 hours included | N/A |
| *On-demand Active CPU* | - | Costs vary by region |
| **Provisioned Memory** | 360 GB-hrs included | N/A |
| *On-demand Provisioned Memory* | - | Costs vary by region |
| **Invocations** | 1 million included | N/A |
| *On-demand Invocations* | - | N/A |


Enterprise plans have custom terms. Speak to your Vercel account representative for details.

### Resource Details

#### Active CPU

- This is the CPU time your code actively consumes in milliseconds
- You are only billed during actual code execution and not during I/O operations (database queries, like AI model calls, etc.)
- Billed per CPU-hour
- Pauses billing when your code is waiting for external services

For example: If your function takes 100ms to process data but spends 400ms waiting for a database query, you're only billed for the 100ms of active CPU time. This means computationally intensive tasks (like image processing) will use more CPU time than I/O-heavy tasks (like making API calls).

#### Provisioned Memory

- Memory allocated to your function instances (in GB)
- Billed for the entire instance lifetime in GB-hours
- Continues billing while handling requests, even during I/O operations
- Each instance can handle multiple requests with [optimized concurrency](/docs/fluid-compute#optimized-concurrency)
- Memory is reserved for your function even when it's waiting for I/O
- Billing continues until the last in-flight request completes

For example: If you have a 1GB function instance running for 1 hour handling multiple requests, you're billed for 1 GB-hour of provisioned memory, regardless of how many requests it processed or how much of that hour was spent waiting for I/O.

#### Invocations

- Counts each request to your function
- Billed per incoming request
- First million requests included in both Hobby and Pro plans
- Counts regardless of request success or failure

For example: If your function receives 1.5 million requests on a Pro plan, you'll be billed for the 500,000 requests beyond your included million at $0.60 per million (approximately $0.30).

## Regional pricing

The following table shows the regional pricing for fluid compute resources on Vercel. The prices are per hour for CPU and per GB-hr for memory:

| Region | Active CPU (per hour) | Provisioned Memory (per GB-hr) |
| --- | --- | --- |
| Cape Town, South Africa (cpt1) | $0.200 | $0.0166 |
| Cleveland, USA (cle1) | $0.128 | $0.0106 |
| Dubai, UAE (dxb1) | $0.185 | $0.0153 |
| Dublin, Ireland (dub1) | $0.168 | $0.0139 |
| Frankfurt, Germany (fra1) | $0.184 | $0.0152 |
| Hong Kong (hkg1) | $0.176 | $0.0146 |
| London, UK (lhr1) | $0.177 | $0.0146 |
| Montreal, Canada (yul1) | $0.147 | $0.0122 |
| Mumbai, India (bom1) | $0.140 | $0.0116 |
| Osaka, Japan (kix1) | $0.202 | $0.0167 |
| Paris, France (cdg1) | $0.177 | $0.0146 |
| Portland, USA (pdx1) | $0.128 | $0.0106 |
| San Francisco, USA (sfo1) | $0.177 | $0.0147 |
| São Paulo, Brazil (gru1) | $0.221 | $0.0183 |
| Seoul, South Korea (icn1) | $0.169 | $0.0140 |
| Singapore (sin1) | $0.160 | $0.0133 |
| Stockholm, Sweden (arn1) | $0.160 | $0.0133 |
| Sydney, Australia (syd1) | $0.180 | $0.0149 |
| Tokyo, Japan (hnd1) | $0.202 | $0.0167 |
| Washington D.C., USA (iad1) | $0.128 | $0.0106 |


## How pricing works

A function instance runs in a region, and its pricing is based on the resources it uses in that region. The cost for each invocation is calculated based on the **Active CPU** and **Provisioned memory** resources it uses in that region.

When the first request arrives, Vercel starts an instance with your configured memory. Provisioned memory is billed continuously until the last in-flight request finishes. **Active CPU is billed only while your code is actually running. If the request is waiting on I/O, CPU billing pauses but memory billing continues**.

After all requests complete, the instance is paused, and no CPU or memory charges apply until the next invocation. This means, you pay for memory whenever work is in progress, never for idle CPU, and nothing at all between requests.

### Example

Suppose you deploy a function with 4 GB of memory in the São Paulo, Brazil region, where the rates are $0.221/hour for CPU and $0.0183/GB-hour for memory. If one request takes 4 seconds of active CPU time and the instance is alive for 10 seconds (including I/O), the cost will be:

- CPU: (4 seconds / 3600) × $0.221 = $0.0002456
- Memory: (4 GB × 10 seconds / 3600) × $0.0183 = $0.0002033
- Total: $0.0002456 + $0.0002033 = $0.0004489 for each invocation.


---

[View full sitemap](/docs/sitemap)
