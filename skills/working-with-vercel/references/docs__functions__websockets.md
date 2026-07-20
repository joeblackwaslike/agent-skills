---
title: WebSockets
product: vercel
url: /docs/functions/websockets
canonical_url: "https://vercel.com/docs/functions/websockets"
last_updated: 2026-07-06
type: how-to
prerequisites:
  - /docs/functions
related:
  - /docs/functions/limitations
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/functions/usage-and-pricing
  - /docs/manage-cdn-usage
  - /docs/fluid-compute
summary: Serve WebSocket connections in Vercel Functions for realtime features like chat, collaboration, and AI streaming.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/websockets.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "56399382058dd4f8d3eb0dacbcce0051891321466cb9efebace5ffd20fc2c898"
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

Python frameworks like FastAPI also work with WebSockets on Vercel Functions. Add a WebSocket library (`websockets`, `wsproto`, or just `uvicorn[standard]`) to your dependencies:

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

You can also use `python-socketio` for the same rooms, namespaces, and broadcast features as the JavaScript Socket.IO library. The two are protocol-compatible, so clients can connect to either server:

```python filename="app.py"
import socketio

sio = socketio.AsyncServer(async_mode="asgi")
app = socketio.ASGIApp(sio)

@sio.on("message")
async def handle_message(sid, data):
    await sio.emit("message", data, to=sid)
```

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

Frameworks with native WebSocket support can serve WebSocket connections on Vercel Functions without additional configuration. If your app uses Nitro, either directly or through a framework like Nuxt, you can use Nitro’s native WebSocket support on Vercel.

View the [Nitro](https://vercel.com/templates/nitro/nitro-websockets-starter) and [Nuxt](https://vercel.com/templates/nuxt/nuxt-websockets-starter) examples.

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

Nitro has native WebSocket support powered by [crossws](https://crossws.h3.dev/guide). Enable it in your Nitro config:

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

## Limits and pricing

WebSocket connections use Vercel Functions and follow the same [limits](/docs/functions/limitations) and [pricing model](/docs/functions/usage-and-pricing) as other Function invocations. This includes Function usage while the connection is active, plus [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) and [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) for data sent over the connection.

WebSockets require [Fluid compute](/docs/fluid-compute) to be enabled. This is the default for new projects created on or after April 23, 2025.

## Related

- [Vercel Functions](/docs/functions)
- [Streaming with Vercel Functions](/docs/functions/streaming-functions)
- [`@vercel/functions` API Reference](/docs/functions/functions-api-reference/vercel-functions-package)


---

[View full sitemap](/docs/sitemap)
