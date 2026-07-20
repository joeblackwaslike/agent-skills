---
title: NEXTJS_UNNEEDED_GET_SERVER_SIDE_PROPS
product: vercel
url: /docs/conformance/rules/NEXTJS_UNNEEDED_GET_SERVER_SIDE_PROPS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_UNNEEDED_GET_SERVER_SIDE_PROPS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Catches usages of getServerSideProps that could use static rendering instead, improving the performance of those pages.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_unneeded_get_server_side_props.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "5ccbce8d44744ceeda39e19b90e98c4f95f610b8cd273ec06b9d873f3c1b72f3"
---

# NEXTJS_UNNEEDED_GET_SERVER_SIDE_PROPS

> **🔒 Permissions Required**: Conformance

This rule will analyze each Next.js page's `getServerSideProps` to see if the context parameter is being used and if not
then it will fail.

When using `getServerSideProps` to render a Next.js page on the server, if the page doesn't require any information
from the request, consider using [SSG](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) with
`getStaticProps`. If you are using `getServerSideProps` to refresh the data on each page load, consider using
[ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) instead with a `revalidate`
property to control how often the page is regenerated. If you are using `getServerSideProps` to randomize the data on
each page load, consider moving that logic to the client instead and use `getStaticProps` to reuse the statically generated
page.

## Example

An example of when this check would fail:

```tsx filename="src/pages/index.tsx"
import { type GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return {
    props: { stargazersCount: json.stargazers_count },
  };
};

function Home({ stargazersCount }) {
  return <h1>The Next.js repo has {stargazersCount} stars.</h1>;
}

export default Home;
```

In this example, the `getServerSideProps` function is used to pass data from an API to the page,
but it isn't using any information from the context argument so `getServerSideProps` is unnecessary.

## How to fix

Instead, we can convert the page to use [SSG](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
with `getStaticProps`. This will generate the page at build time and serve it statically. If you need the page to
be updated more frequently, then you can also use [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
with the revalidate option:

```tsx filename="src/pages/index.tsx"
import { type GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return {
    props: { stargazersCount: json.stargazers_count },
    revalidate: 60, // Using ISR, regenerate the page every 60 seconds
  };
};

function Home({ stargazersCount }) {
  return <h1>The Next.js repo has {stargazersCount} stars.</h1>;
}

export default Home;
```

Or, you can use information from the context argument to customize the page:

```tsx filename="src/pages/index.tsx"
import { type GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://api.github.com/repos/vercel/${context.query.repoName}`,
  );
  const json = await res.json();
  return {
    props: {
      repoName: context.query.repoName,
      stargazersCount: json.stargazers_count,
    },
  };
};

function Home({ repoName, stargazersCount }) {
  return (
    <h1>
      The {repoName} repo has {stargazersCount} stars.
    </h1>
  );
}

export default Home;
```


---

[View full sitemap](/docs/sitemap)
