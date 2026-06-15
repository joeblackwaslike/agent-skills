---
source: "https://raw.githubusercontent.com/github/docs/main/content/graphql/overview/public-schema.md"
fetched_at: "2026-06-15T17:25:57.300Z"
sha256: "ddc9879a34ce65d41a9555c865e71a2216c734565656e6068ec60fed148fc1a4"
---

You can [perform introspection](/graphql/guides/introduction-to-graphql#discovering-the-graphql-api) against the GraphQL API directly.

Alternatively, you can download the latest version of the public schema here:

{% ifversion fpt %}

[{% octicon "desktop-download" aria-label="Download" %} `schema.docs.graphql`](/public/fpt/schema.docs.graphql)

{% endif %}

{% ifversion ghec %}

[{% octicon "desktop-download" aria-label="Download" %} `schema.docs.graphql`](/public/ghec/schema.docs.graphql)

{% endif %}

{% ifversion ghes %}

[{% octicon "desktop-download" aria-label="Download" %} `schema.docs-enterprise.graphql`](/public/ghes-{{ allVersions[currentVersion].currentRelease }}/schema.docs-enterprise.graphql) ({{ allVersions[currentVersion].versionTitle }})

{% endif %}
