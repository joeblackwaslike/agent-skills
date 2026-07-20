---
title: BFCACHE_INTEGRITY_NO_UNLOAD_LISTENERS
product: vercel
url: /docs/conformance/rules/BFCACHE_INTEGRITY_NO_UNLOAD_LISTENERS
canonical_url: "https://vercel.com/docs/conformance/rules/BFCACHE_INTEGRITY_NO_UNLOAD_LISTENERS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/rules/BFCACHE_INTEGRITY_REQUIRE_NOOPENER_ATTRIBUTE
summary: "Disallows the use of the unload and beforeunload events to eliminate a source of eviction from the browser's Back-Forward Cache."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/bfcache_integrity_no_unload_listeners.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "65d8f725d7d85f300bdf21c9fe30d84a6085615db868fcf5b5c5182055f1f009"
---

# BFCACHE_INTEGRITY_NO_UNLOAD_LISTENERS

> **🔒 Permissions Required**: Conformance

This rule disallows the use of the `unload` and `beforeunload` events to improve the integrity of the Back-Forward Cache in browsers.

The Back-Forward Cache (bfcache) is a browser feature that allows pages to be cached in memory when the user navigates
away from them. When the user navigates back to the page, it can be loaded almost instantly from the cache instead of
having to be reloaded from the network. Breaking the bfcache's integrity can cause a page to be reloaded from the network
when the user navigates back to it, which can be slow and jarring.

The most important rule for maintaining the integrity of the bfcache is to not use the `unload` event. This event is fired
when the user navigates away from the page, but it is unreliable and disables the cache on most browsers.

The `beforeunload` event can also make your page ineligible for the cache in browsers so it is better to avoid using.
However there are some legitimate use cases for this event, such as checking if the user has unsaved work before they exit
the page. In this case it is recommended to add the listener conditionally and remove it as soon as the work as been saved.

Alternative events that can be considered are `pagehide` or `visibilitychange`, which are more reliable
events that do not break the bfcache and will fire when the user navigates away from or unfocuses the page.

To learn more about the bfcache, see the [web.dev docs](https://web.dev/bfcache).

## Related Rules

- [BFCACHE\_INTEGRITY\_REQUIRE\_NOOPENER\_ATTRIBUTE](/docs/conformance/rules/BFCACHE_INTEGRITY_REQUIRE_NOOPENER_ATTRIBUTE)

## Example

Two examples of when this check would fail:

```ts filename="src/utils/handle-user-navigation.ts"
export function handleUserNavigatingAway() {
  window.onunload = (event) => {
    console.log('Page has unloaded.');
  };
}

export function handleUserAboutToNavigateAway() {
  window.onbeforeunload = (event) => {
    console.log('Page is about to be unloaded.');
  };
}
```

```ts filename="src/utils/handle-user-navigation.ts"
export function handleUserNavigatingAway() {
  window.addEventListener('unload', (event) => {
    console.log('Page has unloaded.');
  });
}

export function handleUserAboutToNavigateAway() {
  window.addEventListener('beforeunload', (event) => {
    console.log('Page is about to be unloaded.');
  });
}
```

## How to fix

Instead, we can use the `pagehide` event to detect when the user navigates away from the page.

```ts filename="src/utils/handle-user-navigation.ts"
export function handleUserNavigatingAway() {
  window.onpagehide = (event) => {
    console.log('Page is about to be hidden.');
  };
}
```

```ts filename="src/utils/handle-user-navigation.ts"
export function handleUserNavigatingAway() {
  window.addEventListener('pagehide', (event) => {
    console.log('Page is about to be hidden.');
  });
}
```


---

[View full sitemap](/docs/sitemap)
