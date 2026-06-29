---
title: OSS Coding Agent
product: vercel
url: /docs/platforms/examples/oss-coding-agent
canonical_url: "https://vercel.com/docs/platforms/examples/oss-coding-agent"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/examples
  - /docs/platforms
related:
  []
summary: Learn about oss coding agent on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/examples/oss-coding-agent.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "17d22fbf62d179eb8f8a5a5edc35dbeff546d5b41788150dfe1949c0f81a883e"
---

# OSS AI Vibe Coding Platform

The AI Vibe Coding Platform represents a new paradigm in development environments where AI doesn't just assist with code completion, but actively generates entire applications based on natural language descriptions. This open-source platform enables developers to create their own AI-powered coding environments that can generate, execute, and deploy full applications in isolated, secure sandboxes.

> **💡 Note:** Check out the live demo at
> [oss-vibe-coding-platform.vercel.app](https://oss-vibe-coding-platform.vercel.app/)

## What Makes It a "Vibe" Platform?

The term "vibe" captures the essence of natural, conversational development. Instead of writing code line by line, developers describe the vibe of what they want to build, and AI translates that vision into working code. It's about capturing intent and transforming it into implementation through the power of modern language models.

## How It Works

When you describe what you want to build, the platform:

1. **Creates an isolated sandbox** - A secure container for your application
2. **Generates application code** - AI writes all necessary files and configuration
3. **Executes the build** - Installs dependencies and runs your application
4. **Provides instant preview** - See your running application immediately
5. **Enables deployment** - Deploy to Vercel with a single click

## Getting Started

### Step 1: Clone and Set Up the Platform

Start by [cloning the project](/new/clone?demo-description=A+full-stack+coding+platform+built+with+Vercel%27s+AI+Cloud%2C+AI+SDK%2C+and+Next.js.\&demo-image=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1754588832%2FOSSvibecodingplatform%2Fscreenshot.png\&demo-title=Vibe+Coding+Platform\&demo-url=https%3A%2F%2Fvercel.fyi%2Fvibes\&project-name=Vibe+Coding+Platform\&repository-name=vibe-coding-platform\&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fexamples%2Ftree%2Fmain%2Fapps%2Fvibe-coding-platform\&from=vibe-coding-platform-app) and installing dependencies. The platform is built with Next.js and uses modern tools like:

- **Vercel AI SDK** for streaming AI responses
- **Vercel Sandboxes** for secure code execution
- **SWR** for data fetching and caching
- **Tailwind CSS** for styling

### Step 2: Configure Your Environment Variables

You'll only need one environment variable locally to run the project:

```text filename=".env.local"
AI_GATEWAY_API_KEY=""
```

This variable is used to authenticate with the AI Gateway and is sorted out for you when deployed to Vercel.

### Step 3: Run the Development Server

Launch your local vibe coding platform locally with:

```bash filename="Terminal"
pnpm dev
```

Open <http://localhost:3000> to see your platform running. You'll see:

- **Chat Interface** - Where you describe what you want to build
- **File Explorer** - Browse generated files in real-time
- **Live Preview** - See your application as it's being built
- **Logs Console** - Monitor build output and debugging information

### Step 4: Build Your First Application

Now for the fun part - let's build something! Try these example prompts:

**Simple React App:**

```text filename="Prompt"
"Create a todo list app with React that lets me add, complete, and delete tasks. Make it look modern with nice styling."
```

**API with Database:**

```text filename="Prompt"
"Build a REST API with Express that manages a book library. Include endpoints for CRUD operations and use SQLite for storage."
```

**Interactive Game:**

```text filename="Prompt"
"Make a simple memory card game where players match pairs of cards. Include a timer and score tracking."
```

The platform will:

1. Generate all necessary files
2. Set up the project structure
3. Install dependencies
4. Run the development server
5. Provide you with a live preview URL

## Core Components

### The Sandbox System

Each user session gets its own isolated sandbox:

```typescript filename="ai/tools/create-sandbox.ts"
export const createSandbox = async ({ timeout, ports }) => {
  // ...

  const sandbox = await Sandbox.create({
    timeout: timeout ?? 600000,
    ports,
  });

  return (
    `Sandbox created with ID: ${sandbox.sandboxId}.` +
    `\nYou can now upload files, run commands, and access services on the exposed ports.`
  );
};
```

### File Generation

The AI generates files directly into the sandbox:

```typescript filename="ai/tools/generate-files.ts"
export const generateFiles = tool({
  description: 'Generate multiple files for the application',
  execute: async ({ files, sandboxId }) => {
    const sandbox = getSandbox(sandboxId);

    for (const file of files) {
      await sandbox.writeFile(file.path, file.content);
    }

    return `Generated ${files.length} files`;
  },
});
```

### Command Execution

Run build commands and start servers in the sandbox:

```typescript filename="ai/tools/run-command.ts"
export const runCommand = tool({
  description: 'Execute shell commands in the sandbox',
  execute: async ({ command, sandboxId }) => {
    const sandbox = getSandbox(sandboxId);
    const result = await sandbox.runCommand({ cmd: command });

    return result.stdout;
  },
});
```

## Key Features

### Real-time Streaming

Watch as AI generates your application in real-time:

```tsx filename="app/chat.tsx"
export function Chat() {
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      // Stream updates to UI as code is generated
    },
  });

  return (
    <Conversation className="relative w-full">
      <ConversationContent className="space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
```

### Multi-Model Support

The platform supports all models supported by the AI Gateway.

```typescript filename="app/api/models/route.tsx"
import { SUPPORTED_MODELS } from '@/ai/constants';
import { getAvailableModels } from '@/ai/gateway';
import { NextResponse } from 'next/server';

export async function GET() {
  const allModels = await getAvailableModels();
  return NextResponse.json({
    models: allModels.filter((model) => SUPPORTED_MODELS.includes(model.id)),
  });
}
```

***

The AI Vibe Coding Platform democratizes application development by allowing anyone to build software through natural conversation. Whether you're a seasoned developer looking to prototype quickly or someone new to coding wanting to bring ideas to life, this platform provides the tools to make it happen.

By combining the power of modern AI models with secure sandbox environments, we're entering a new era where the barrier between idea and implementation is just a conversation.


---

[View full sitemap](/docs/sitemap)
