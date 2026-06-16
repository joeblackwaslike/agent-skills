---
title: Configuring the Runtime for Vercel Functions
product: vercel
url: /docs/functions/configuring-functions/runtime
canonical_url: "https://vercel.com/docs/functions/configuring-functions/runtime"
last_updated: 2026-03-17
type: how-to
prerequisites:
  - /docs/functions/configuring-functions
  - /docs/functions
related:
  - /docs/functions/runtimes
  - /docs/functions/runtimes/go
  - /docs/functions/runtimes/python
summary: Learn how to configure the runtime for Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/configuring-functions/runtime.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "24ae8f8b9412f7c29e4ca6fa43458a9abf07400823a87a151f598ddc3607b0ef"
---

# Configuring the Runtime for Vercel Functions

The runtime of your function determines the environment in which your function will execute. Vercel supports various runtimes including Node.js, Python, Ruby, and Go. You can also configure [other runtimes](/docs/functions/runtimes#community-runtimes) using the `vercel.json` file. Here's how to set up each:

## Node.js

By default, a function with no additional configuration will be deployed as a Vercel Function on the Node.js runtime.

> For \['nextjs']:

```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js v0="build" filename="app/api/hello/route.js" framework=nextjs
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

```ts filename="api/hello.ts" framework=other
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js filename="api/hello.js" framework=other
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs-app
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js v0="build" filename="app/api/hello/route.js" framework=nextjs-app
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

> **💡 Note:** If you're not using a framework, you must either add
> `"type": "module"` to your
> `package.json` or change your JavaScript Functions'
> file extensions from `.js` to
> `.mjs`

## Go

For Go, write a server in `main.go`, `cmd/api/main.go`, or
`cmd/server/main.go`. The server must listen on the `PORT` environment
variable:

```go filename="main.go"
package main

import (
  "fmt"
  "log"
  "net/http"
  "os"
)

func main() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello from Go on Vercel")
  })

  port := os.Getenv("PORT")
  if port == "" {
    port = "3000"
  }

  log.Fatal(http.ListenAndServe(":"+port, nil))
}
```

Vercel also supports file-based Go functions under `/api`. For that model,
export an `http.HandlerFunc` from a `.go` file. For more details, see [Using
the Go Runtime with Vercel Functions](/docs/functions/runtimes/go).

## Python

For Python, write an ASGI (Asynchronous Server Gateway Interface) or
WSGI (Web Server Gateway Interface) application that exposes an `app` variable in
`app.py`, `index.py`, `server.py`, or `main.py`. Here's a FastAPI example:

```python filename="app.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello from Python on Vercel"}
```

Vercel also supports file-based Python functions under `/api`. For that model,
define a `handler` class or an `app` variable in a `.py` file. For more details,
see [Using the Python Runtime with Vercel Functions](/docs/functions/runtimes/python).

## Ruby

For Ruby, define an HTTP handler from `.rb` files within an `/api` directory at your project's root. Ruby files must have one of the following variables defined:

- `Handler` proc that matches the `do |request, response|` signature
- `Handler` class that inherits from the `WEBrick::HTTPServlet::AbstractServlet` class

For example:

```ruby filename="api/index.rb"
require 'cowsay'

Handler = Proc.new do |request, response|
  name = request.query['name'] || 'World'

  response.status = 200
  response['Content-Type'] = 'text/text; charset=utf-8'
  response.body = Cowsay.say("Hello #{name}", 'cow')
end
```

Don't forget to define your dependencies inside a `Gemfile`:

```ruby filename="Gemfile"
source "https://rubygems.org"

gem "cowsay", "~> 0.3.0"
```

## Other runtimes

You can configure other runtimes by using the `functions` property in your `vercel.json` file. For example:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/test.php": {
      "runtime": "vercel-php@0.5.2"
    }
  }
}
```

In this case, the function at `api/hello.ts` would use the custom runtime specified.

For more information, see [Community runtimes](/docs/functions/runtimes#community-runtimes)


---

[View full sitemap](/docs/sitemap)
