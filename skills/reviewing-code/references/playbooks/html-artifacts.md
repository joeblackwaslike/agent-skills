# HTML artifacts

> Use when the diff: Adds or changes UI components, pages, styles, or standalone HTML files

*Leans on: KISS, least privilege, explicit over implicit.*

Standalone HTML files (generated reports, dashboards, docs pages, one-off tools, pages an AI agent produced) are shared widely and reviewed lightly. Review them as small web apps.

- **Pinned dependencies.** External scripts and stylesheets load from trusted CDNs at exact versions, with Subresource Integrity (`integrity`) hashes where possible. A floating version such as `@latest` changes the page without a code change.
- **XSS.** Data inserted with `innerHTML`, template strings or `document.write` is escaped or sanitized; `textContent` and DOM APIs are preferred. Where the page is served, a Content Security Policy is set.
- **Nothing private embedded.** API keys, tokens, internal URLs and personal data in the HTML, inline JSON or comments are visible to anyone who has the file.
- **Semantic and accessible.** A `lang` attribute, a viewport meta tag, real headings, labels and sufficient contrast; the accessibility playbook applies.
- **Responsive and themed.** Works at phone width without horizontal scrolling, and respects `prefers-color-scheme` if it has a dark mode.
- **Offline when that's the point.** A report meant to be emailed or archived works without the network; otherwise, the page fails gracefully when a CDN is unreachable.
- **Size.** Embedded images and data are compressed; large `data:` URIs bloat the file.
- **Generated output.** When a script or template produces the HTML, review the generator and a sample of its output, and reject hand edits to generated files.
