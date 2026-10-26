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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6363720506b027c001dbdb20ddf904d70e4e981306979adde99ecfbc70e6b5c2"
---

# Using the Ruby Runtime with Vercel Functions

> The Ruby runtime is available in Beta on all plans

The Ruby runtime is used by Vercel to compile Ruby Vercel functions that define a singular HTTP handler from `.rb` files within an `/api` directory at your project's root.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [Does Vercel support Ruby on Rails applications?](https://vercel.com/kb/guide/does-vercel-support-ruby-on-rails-applications) — Learn how to deploy a Ruby on Rails application on Vercel — either as a container image on Vercel Functions or as a head
- [Customizing Serverless Functions](https://vercel.com/blog/customizing-serverless-functions)
- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions) — Learn how to import files inside Serverless Functions on Vercel.
- [Configuring the Runtime for Vercel Functions](https://vercel.com/docs/functions/configuring-functions/runtime) — Learn how to configure the runtime for Vercel Functions.
- [Using the Rust Runtime with Vercel functions](https://vercel.com/docs/functions/runtimes/rust) — Build fast, memory-safe serverless functions with Rust on Vercel.
- [Frameworks on Vercel](https://vercel.com/docs/frameworks) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w
- [Build image overview](https://vercel.com/docs/builds/build-image) — Learn about the container image used for Vercel builds.
- [Secure Compute](https://vercel.com/docs/networking/secure-compute) — Secure Compute provides dedicated private networks with VPC peering for Enterprise teams.

Full cross-link map for this page: [/docs/functions/runtimes/ruby.graph.md](/docs/functions/runtimes/ruby.graph.md)
<!-- /docsgraph:related -->

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
