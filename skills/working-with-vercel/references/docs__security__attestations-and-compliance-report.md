---
title: Attestations and Compliance Report
product: vercel
url: /docs/security/attestations-and-compliance-report
canonical_url: "https://vercel.com/docs/security/attestations-and-compliance-report"
last_updated: 2026-08-26
type: how-to
prerequisites:
  - /docs/security
related:
  - /docs/activity-log
  - /docs/audit-log
summary: Learn how to preview and download Vercel compliance documents from the dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/attestations-and-compliance-report.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "68978d9fad716bb12ce203e8e76db8efddcab55f3ada3de9463db1c2e4d33298"
---

# Attestations and Compliance Report

Team members on Pro and Enterprise plans can preview and download Vercel's compliance certificates, attestations, policies, and other security documents from the dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Does Vercel have a SOC 2 Type 2 attestation?](https://vercel.com/kb/guide/is-vercel-soc-2-compliant) — Vercel holds a SOC 2 Type 2 attestation for Security, Confidentiality, and Availability. See what the report covers, how
- [Compliance documents are now available in Team settings](https://vercel.com/changelog/compliance-documents-are-now-available-in-team-settings)
- [Vercel Security Dashboard is now generally available](https://vercel.com/changelog/vercel-security-dashboard-is-now-generally-available)
- [Security Dashboard](https://vercel.com/docs/security/security-dashboard) — The Security Dashboard aggregates the security posture of every account and project on your team, flags misconfiguration
- [Get certs](https://vercel.com/docs/rest-api/certs/get-certs) — GET /v8/certs — Get certs
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Upload a cert](https://vercel.com/docs/rest-api/certs/upload-a-cert) — PUT /v8/certs — Upload a cert

Full cross-link map for this page: [/docs/security/attestations-and-compliance-report.graph.md](/docs/security/attestations-and-compliance-report.graph.md)
<!-- /docsgraph:related -->

To access compliance documents:

1. In the Vercel dashboard, select your team.
2. Go to **Settings** > [**Compliance**](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fcompliance).
3. To access the documents, select:
   - **Download All** to download all available documents as a `.zip` archive.
   - One or more documents to preview or download them. To download multiple documents as a `.zip` archive, select **Download Selected**.

Vercel watermarks each PDF with details about the team member and team that accessed it. Some resources link to an external certificate directory instead of providing a PDF.

Preview and download actions appear in the [Activity Log](/docs/activity-log). Enterprise team owners can also review `compliance.document.previewed` and `compliance.document.downloaded` actions in [Audit Logs](/docs/audit-log#compliance). A bulk download creates one audit log action for each document in the archive.

For public reports and more information about Vercel's security and compliance program, visit the [Vercel Trust Center](https://security.vercel.com/).


---

[View full sitemap](/docs/sitemap)
