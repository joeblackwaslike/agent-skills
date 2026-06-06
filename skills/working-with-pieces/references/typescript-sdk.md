---
name: typescript-sdk
description: Pieces TypeScript SDK — @pieces.app/pieces-os-client and pieces-copilot-sdk, platform config, connection, full CRUD patterns, Copilot chat, OSApi auth, example project
---

# Pieces TypeScript SDK

Two packages are used together:
- **`@pieces.app/pieces-os-client`** — REST API client generated from the OpenAPI spec; assets, search, connectors, OS operations
- **`pieces-copilot-sdk`** — Higher-level wrapper for Copilot conversations

## Installation

```bash
npm install @pieces.app/pieces-os-client pieces-copilot-sdk  # SDK v4.1.0
```

## Platform Configuration

Port differs by OS. Use `navigator.platform` in browsers, `process.platform` in Node.js:

```typescript
import * as Pieces from '@pieces.app/pieces-os-client';
import { PiecesClient } from 'pieces-copilot-sdk';

// Browser
const PORT = navigator.platform.toLowerCase().includes('linux') ? 5323 : 1000;

// Node.js
// const PORT = process.platform === 'linux' ? 5323 : 1000;

const BASE_URL = `http://localhost:${PORT}`;
const config = new Pieces.Configuration({ basePath: BASE_URL });
const piecesClient = new PiecesClient({ baseUrl: BASE_URL });

export { BASE_URL, config, piecesClient };
```

## Connection & Authentication

Call `connect()` once at app startup. The response contains `user`, `health`, and `application` — store `application` for use in `AssetsApi.assetsCreateNewAsset`.

```typescript
const connectorApi = new Pieces.ConnectorApi(config);

const ctx = await connectorApi.connect({
  seededConnectorConnection: {
    application: {
      name: Pieces.ApplicationNameEnum.Unknown,
      version: '0.0.1',
      platform: Pieces.PlatformEnum.Macos,  // adjust for platform
    }
  }
});

const applicationData = ctx.application;   // needed for asset creation
const userName = ctx.user?.name;
const osVersion = ctx.health.os?.version;
```

## Authentication (Sign In/Out)

```typescript
const osApi = new Pieces.OSApi();  // no config argument needed

await osApi.signIntoOS();          // opens Pieces sign-in flow
await osApi.signOutOfOS();
```

## Asset CRUD

### List All Assets

```typescript
const assets = await new Pieces.AssetsApi(config).assetsSnapshot({});
// assets.iterable → array of Asset objects
// asset.id, asset.name, asset.original.reference.classification.specific
```

### Get Single Asset

```typescript
const asset = await new Pieces.AssetApi(config).assetSnapshot({
  asset: assetId   // UUID string
});
// asset.id, asset.name, asset.mechanism, asset.preview.schema.semantic
```

### Create Asset

Requires `applicationData` from the `connect()` call.

```typescript
const seed: Pieces.Seed = {
  asset: {
    application: applicationData,
    format: {
      fragment: {
        string: { raw: 'const x = 42; // your code here' }
      }
    },
    metadata: {
      name: 'My Snippet Name'
    }
  } as Pieces.SeededAsset,
  type: Pieces.SeedTypeEnum.Asset
};

const newAsset = await new Pieces.AssetsApi(config).assetsCreateNewAsset({ seed });
```

### Update Asset (Rename)

```typescript
const assets = await new Pieces.AssetsApi(config).assetsSnapshot({});
const target = assets.iterable.find(a => a.id === assetId);
if (target) {
  target.name = 'New Name';
  await new Pieces.AssetApi(config).assetUpdate({ asset: target });
}
```

### Delete Asset

```typescript
await new Pieces.AssetsApi(config).assetsDeleteAsset({ asset: assetId });
```

### Full-Text Search

Returns identifiers — call `assetSnapshot` for full objects.

```typescript
const results = await new Pieces.SearchApi(config).fullTextSearch({
  query: 'react hooks'
});

if (results.iterable.length > 0) {
  const firstId = results.iterable[0].identifier;
  const asset = await new Pieces.AssetApi(config).assetSnapshot({ asset: firstId });
}
```

## Copilot Chat (`pieces-copilot-sdk`)

The `PiecesClient` from `pieces-copilot-sdk` wraps Copilot conversation management.

### Create Conversation

```typescript
const newConv = await piecesClient.createConversation({
  name: 'Debug Session'
});
const conversationId = newConv.conversation.id;
```

### Send Message

```typescript
const { text } = await piecesClient.promptConversation({
  message: 'Explain this TypeScript generic type',
  conversationId
});
// text → string response from Copilot
```

### List Conversations

```typescript
const conversations = await piecesClient.getConversations();
// each: { id, name, messages }
```

### Get Conversation History

```typescript
const { rawMessages } = await piecesClient.getConversation({
  conversationId,
  includeRawMessages: true
});
// rawMessages: [{ isUserMessage: boolean, message: string }, ...]
// rawMessages[0] is typically the system prompt; user/AI alternate from index 1
```

## Complete Operation Reference

| Operation | Class | Method |
|-----------|-------|--------|
| Connect / auth | `ConnectorApi` | `.connect({ seededConnectorConnection })` |
| Sign in | `OSApi` | `.signIntoOS()` |
| Sign out | `OSApi` | `.signOutOfOS()` |
| List assets | `AssetsApi` | `.assetsSnapshot({})` |
| Get asset | `AssetApi` | `.assetSnapshot({ asset: id })` |
| Create asset | `AssetsApi` | `.assetsCreateNewAsset({ seed })` |
| Update asset | `AssetApi` | `.assetUpdate({ asset })` |
| Delete asset | `AssetsApi` | `.assetsDeleteAsset({ asset: id })` |
| Full-text search | `SearchApi` | `.fullTextSearch({ query })` |
| Create conversation | `PiecesClient` | `.createConversation({ name })` |
| List conversations | `PiecesClient` | `.getConversations()` |
| Get conversation | `PiecesClient` | `.getConversation({ conversationId, includeRawMessages })` |
| Send message | `PiecesClient` | `.promptConversation({ message, conversationId })` |

## Example Project

A complete React application demonstrating the SDK is available at:

**https://github.com/pieces-app/example-typescript**

Features demonstrated:
- Platform-aware port detection
- `connect()` initialization with connection status indicator
- Asset CRUD (create, list, rename, delete, preview modal)
- Full-text search
- Copilot chat with conversation persistence
- Conversation history retrieval

```bash
git clone https://github.com/pieces-app/example-typescript.git
cd example-typescript
npm install
npm start
# → http://localhost:3000
```

Key files:
- `src/platform.config.ts` — port detection + both clients
- `src/utils/Connect.tsx` — `ConnectorApi` initialization pattern
- `src/app/components/Asset/Asset.tsx` — full CRUD operations
- `src/app/components/Copilot/Copilot.tsx` — conversation management

## Links

- **npm**: https://www.npmjs.com/package/@pieces.app/pieces-os-client
- **GitHub SDK**: https://github.com/pieces-app/pieces-os-client-sdk-for-typescript
- **GitHub example**: https://github.com/pieces-app/example-typescript
- **Vanilla TS Copilot example**: https://github.com/pieces-app/pieces-copilot-vanilla-typescript-example
- **OpenAPI spec**: https://github.com/pieces-app/pieces-os-client-openapi-spec
