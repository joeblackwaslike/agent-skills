---
title: WebSockets
product: vercel
url: /docs/functions/websockets
canonical_url: "https://vercel.com/docs/functions/websockets"
last_updated: 2026-07-24
type: how-to
prerequisites:
  - /docs/functions
related:
  - /docs/functions/limitations
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/frameworks/full-stack/django
  - /docs/functions/usage-and-pricing
  - /docs/manage-cdn-usage
summary: Serve WebSocket connections in Vercel Functions for realtime features like chat, collaboration, and AI streaming.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/websockets.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "12f61ac015439ced231cf1f62ebb671f14aa23054246c1ce52f283d3297d4f7f"
---

# WebSockets

> **🔒 Permissions Required**: WebSockets

Vercel Functions can serve WebSocket connections, keeping a bidirectional connection open between a client and your server-side code. Use WebSockets for realtime features such as interactive AI streaming, chat, and collaborative apps.

A single WebSocket connection is pinned to one Vercel Function instance. Messages sent over that connection reach the same function instance for the lifetime of the connection, and Fluid compute allows a single function instance to handle multiple WebSocket connections.

[View and deploy a starter template](https://vercel.com/templates/nitro/nitro-websockets-starter).

## Request lifecycle

A WebSocket connection starts as an HTTP `GET` request with an `Upgrade` header. Before the connection is upgraded, the request goes through the same routing and security controls as other requests to Vercel Functions, including Routing Middleware, rewrites, Firewall rules, and rate limits. You can write Firewall rules that target the WebSocket request path, and rate limits apply to each upgrade request.

After the upgrade succeeds, messages sent over the WebSocket connection are delivered to the Vercel Function instance that accepted the connection.

## Set up a WebSocket endpoint

WebSockets in Vercel Functions work exactly like any distributed WebSocket server, so you can use libraries like `ws` to upgrade connections with no additional configuration:

```ts filename="api/ws.ts"
import http from 'http';
import { WebSocketServer } from 'ws';

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    ws.send(data);
  });
});

export default server;
```

You can also use higher-level realtime libraries like [Socket.IO](https://socket.io/) with a client configured to use the WebSocket transport directly:

```ts filename="api/socket-io.ts"
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    socket.send(data);
  });
});

export default server;
```

```ts filename="client.ts"
import { io } from 'socket.io-client';

const socket = io('https://your-domain.com', {
  // Socket.IO appends /socket.io to the path by default,
  // so the full path becomes /api/socket-io/socket.io
  path: '/api/socket-io/socket.io',
  transports: ['websocket'], // required — Socket.IO defaults to HTTP long-polling
});
```

Python applications can use [`python-socketio`](https://pypi.org/project/python-socketio/) with Asynchronous Server Gateway Interface (ASGI) or Web Server Gateway Interface (WSGI) applications. See the [`python-socketio` server documentation](https://python-socketio.readthedocs.io/en/stable/server.html) for setup options. Flask applications can use [`Flask-SocketIO`](https://pypi.org/project/Flask-SocketIO/) for a Flask-specific integration. See the [Flask-SocketIO documentation](https://flask-socketio.readthedocs.io/en/latest/) for configuration details. These libraries implement the Socket.IO protocol, so clients must use a compatible Socket.IO client.

## Handle disconnections and reconnects

WebSocket connections close when a Vercel Function reaches its [maximum duration](/docs/functions/limitations#max-duration).

Follow WebSocket client best practices by handling reconnects when a connection closes. Reconnect logic should recreate the connection, resubscribe to any channels or topics, and reload any state the client needs to continue.

```ts filename="client.ts"
let socket: WebSocket;
let reconnectDelay = 1000;

function connect() {
  socket = new WebSocket('wss://your-domain.com/api/ws');

  socket.addEventListener('open', () => {
    reconnectDelay = 1000;
  });

  socket.addEventListener('message', (event) => {
    console.log(event.data);
  });

  socket.addEventListener('close', () => {
    setTimeout(connect, reconnectDelay);
    reconnectDelay = Math.min(reconnectDelay * 2, 30000);
  });
}

connect();
```

## Manage persistent state

New WebSocket connections are not guaranteed to reach the same Vercel Function instance. If a client reconnects, it may connect to a different instance. After a new deployment, new connections may reach the new deployment while existing connections remain on the previous deployment until they close.

Store durable state, presence, counters, rooms, and pub/sub coordination in an external data store instead of relying on in-memory variables. For example, you can use [Redis from the Vercel Marketplace](https://vercel.com/marketplace/redis) to share state across function instances and deployments.

## Use with frameworks

Frameworks with native WebSocket support can serve WebSocket connections on Vercel Functions without additional Vercel-specific configuration. Choose the example that matches your framework.

### Node.js server frameworks

Node.js server frameworks such as Express, Hono, and h3 can also serve WebSocket connections on Vercel:

```ts filename="api/server.ts" framework=express
import { createServer } from 'node:http';
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    ws.send(data);
  });
});

export default server;
```

```ts filename="api/server.ts" framework=hono
import { serve, upgradeWebSocket } from '@hono/node-server';
import { Hono } from 'hono';
import { WebSocketServer } from 'ws';

const app = new Hono();

app.get(
  '/ws',
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      ws.send(event.data);
    },
  })),
);

const wss = new WebSocketServer({ noServer: true });

const server = serve({
  fetch: app.fetch,
  websocket: { server: wss },
});

export default server;
```

```ts filename="api/server.ts" framework=h3
import { H3, serve, defineWebSocketHandler } from 'h3';
import { plugin as ws } from 'crossws/server';

const app = new H3();

app.get(
  '/ws',
  defineWebSocketHandler({
    message(peer, message) {
      peer.send(message);
    },
  }),
);

export default serve(app, {
  plugins: [ws()],
});
```

### Nitro

Nitro has native WebSocket support powered by [crossws](https://crossws.h3.dev/guide). If your app uses Nitro directly or through a framework like Nuxt, enable WebSockets in your Nitro config:

```ts filename="nitro.config.ts"
import { defineConfig } from 'nitro';

export default defineConfig({
  features: {
    websocket: true,
  },
});
```

Then export a handler with `defineWebSocketHandler()` from a route file. The route path is the connection path, so `routes/_ws.ts` handles connections on `/_ws`:

```ts filename="routes/_ws.ts"
import { defineWebSocketHandler } from 'nitro';

export default defineWebSocketHandler({
  message(peer, message) {
    peer.send(message.text());
  },
});
```

View the [Nitro](https://vercel.com/templates/nitro/nitro-websockets-starter) and [Nuxt](https://vercel.com/templates/nuxt/nuxt-websockets-starter) examples.

### Next.js

Next.js does not expose an API for handling WebSocket upgrades. As a workaround, you can use the `experimental_upgradeWebSocket()` API:

```ts filename="app/api/ws/route.ts"
import {
  experimental_upgradeWebSocket,
  type WebSocketData,
} from '@vercel/functions';

export async function GET() {
  return experimental_upgradeWebSocket((ws) => {
    ws.on('message', (data: WebSocketData) => {
      ws.send(data);
    });
  });
}
```

[Learn more about how to use this API with Next.js.](/docs/functions/functions-api-reference/vercel-functions-package#experimental_upgradewebsocket)

### Python frameworks

Python frameworks that use the Asynchronous Server Gateway Interface (ASGI) or Web Server Gateway Interface (WSGI) can serve WebSocket connections on Vercel Functions. You don't need a Vercel-specific upgrade API.

#### FastAPI with ASGI

Add a WebSocket implementation (`websockets`, `wsproto`, or the dependencies included with `uvicorn[standard]`) to your project:

```toml filename="pyproject.toml"
[project]
name = "my-python-websocket"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.137",
    "uvicorn[standard]>=0.49",
]
```

```python filename="app.py"
import fastapi

app = fastapi.FastAPI()

@app.websocket("/api/ws")
async def websocket_endpoint(websocket: fastapi.WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(data)
    except fastapi.WebSocketDisconnect:
        pass
```

#### Django Channels with ASGI

Django applications can use Django Channels to add WebSocket consumers and
routing to their ASGI entrypoint. Follow the [Django Channels setup
guide](/docs/frameworks/full-stack/django#websockets).

#### Flask-Sock with WSGI

Flask applications can use `flask-sock` to accept WebSocket connections. Add `flask` and `flask-sock` to your project:

```toml filename="pyproject.toml"
[project]
name = "my-python-websocket"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "flask>=3.1",
    "flask-sock>=0.7",
]
```

```python filename="app.py"
from flask import Flask
from flask_sock import Sock

app = Flask(__name__)
sock = Sock(app)

@sock.route("/api/ws")
def websocket_endpoint(websocket):
    while True:
        data = websocket.receive()
        if data is None:
            break
        websocket.send(data)
```

## Limits and pricing

WebSocket connections use Vercel Functions and follow the same [limits](/docs/functions/limitations) and [pricing model](/docs/functions/usage-and-pricing) as other Function invocations. This includes Function usage while the connection is active, plus [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) and [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) for data sent over the connection.

WebSockets require [Fluid compute](/docs/fluid-compute) to be enabled. This is the default for new projects created on or after April 23, 2025.

## Related

- [Vercel Functions](/docs/functions)
- [Streaming with Vercel Functions](/docs/functions/streaming-functions)
- [`@vercel/functions` API Reference](/docs/functions/functions-api-reference/vercel-functions-package)


---

[View full sitemap](/docs/sitemap)
