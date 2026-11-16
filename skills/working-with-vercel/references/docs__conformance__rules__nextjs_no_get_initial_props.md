---
title: NEXTJS_NO_GET_INITIAL_PROPS
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_GET_INITIAL_PROPS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_GET_INITIAL_PROPS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires any use of getInitialProps in Next.js pages be reviewed and approved, and encourages using getServerSideProps or getStaticProps instead.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_no_get_initial_props.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "57d52f79ff89dc361bdc52b763dd49b9a1994e546e585c11c3d1334e78bcb99b"
---

# NEXTJS_NO_GET_INITIAL_PROPS

> Conformance is available on Enterprise plans

`getInitialProps` is an older Next.js API for server-side rendering that can usually be replaced with
`getServerSideProps` or `getStaticProps` for more performant and secure code.

`getInitialProps` runs on both the server and the client after page load, so the JavaScript bundle will
contain any dependencies used by `getInitialProps`. This means that it is possible for unintended code to
be included in the client side bundle, for example, code that should only be used on the server such as
database connections.

If you need to avoid a server-round trip when performing a client side transition, `getInitialProps` could be used.
However, if you do not, `getServerSideProps` is a good API to use instead so that the code remains on the server and
does not bloat the JavaScript bundle, or `getStaticProps` can be used if the page can be statically generated at build time.

This rule is for highlighting these concerns and while there are still valid use cases for using `getInitialProps` if you do need to
do data fetching on both the client and the server, they should be reviewed and approved.

## Example

An example of when this check would fail:

```ts filename="src/pages/index.tsx"
import { type NextPage } from 'next';

const Home: NextPage = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default Home;
```

In this example, the `getInitialProps` function is used to fetch data from an API,
but it isn't necessary that we fetch the data on both the client and the server so we can fix it below.

## How to fix

Instead, we should use `getServerSideProps` instead of `getInitialProps`:

```ts filename="src/pages/index.tsx"
import { type GetServerSideProps } from 'next';

const Home = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return {
    props: {
      stars: json.stargazers_count
    },
  };
};

export default Home;
```

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
