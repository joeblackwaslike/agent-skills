---
title: Using the Ruby Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/ruby
canonical_url: "https://vercel.com/docs/functions/runtimes/ruby"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  []
summary: Learn how to use the Ruby runtime to compile Ruby Vercel Functions on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/ruby.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "211b2c7c56f0e1a67d507ae209650227efe3d6367f81279b238abf97b29ecf05"
---

# Using the Ruby Runtime with Vercel Functions

> **🔒 Permissions Required**: The Ruby runtime


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out?from=related) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [Does Vercel support Ruby on Rails applications?](https://vercel.com/kb/guide/does-vercel-support-ruby-on-rails-applications?from=related) — Learn how you can use Ruby on Rails with your frontend on Vercel.
- [Runtime](https://vercel.com/docs/functions/configuring-functions/runtime?from=related) — Learn how to configure the runtime for Vercel Functions.
- [Rust](https://vercel.com/docs/functions/runtimes/rust?from=related) — Build fast, memory-safe serverless functions with Rust on Vercel.
- [Go](https://vercel.com/docs/functions/runtimes/go?from=related) — Learn how to use the Go runtime to run Go APIs on Vercel.
- [Python](https://vercel.com/docs/functions/runtimes/python?from=related) — Learn how to use the Python runtime to run Python applications on Vercel.
- [Supported Frameworks](https://vercel.com/docs/frameworks?from=related) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w

Full cross-link map for this page: [/docs/functions/runtimes/ruby.graph.md](/docs/functions/runtimes/ruby.graph.md)
<!-- /docsgraph:related -->

The Ruby runtime is used by Vercel to compile Ruby Vercel functions that define a singular HTTP handler from `.rb` files within an `/api` directory at your project's root.

Ruby files must have one of the following variables defined:

- `Handler` proc that matches the `do |request, response|` signature.
- `Handler` class that inherits from the `WEBrick::HTTPServlet::AbstractServlet` class.

For example, define a `index.rb` file inside a `/api` directory as follows:

```ruby filename="api/index.rb"
require 'cowsay'

Handler = Proc.new do |request, response|
  name = request.query['name'] || 'World'

  response.status = 200
  response['Content-Type'] = 'text/text; charset=utf-8'
  response.body = Cowsay.say("Hello #{name}", 'cow')
end
```

*An example \`index.rb\` file inside an
\`/api\` directory.*

Inside a `Gemfile` define:

```ruby filename="Gemfile"
source "https://rubygems.org"

gem "cowsay", "~> 0.3.0"
```

*An example \`Gemfile\` file that defines
\`cowsay\` as a dependency.*

## Ruby Version

New deployments use Ruby 3.3.x as the default version.

You can specify the version of Ruby by defining `ruby` in a `Gemfile`, like so:

```ruby filename="Gemfile"
source "https://rubygems.org"
ruby "~> 3.3.x"
```

> **💡 Note:** If the patch part of the version is defined, like
> `3.3.1` it will be ignored and assume the latest
> `3.3.x`.

## Ruby Dependencies

This runtime supports installing dependencies defined in the `Gemfile`. Alternatively, dependencies can be vendored with the `bundler install --deployment` command (useful for gems that require native extensions). In this case, dependencies are not built on deployment.


---

[View full sitemap](/docs/sitemap)
