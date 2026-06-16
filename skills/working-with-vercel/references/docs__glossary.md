---
title: Glossary
product: vercel
url: /docs/glossary
canonical_url: "https://vercel.com/docs/glossary"
last_updated: 2026-05-25
type: reference
prerequisites:
  []
related:
  - /docs/fluid-compute
  - /docs/activity-log
  - /docs/ai-gateway
  - /docs/ai-sdk
  - /docs/alerts
summary: "Learn about the terms and concepts used in Vercel's products and documentation."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/glossary.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "d0ce74ca54471a9eeb008d750e838934c26dd600ce3c9f77d9e26e862bfc8045"
---

# Glossary

A full glossary of terms used in Vercel's products and documentation.

## A

### Active CPU

A pricing model for [Fluid Compute](/docs/fluid-compute) where you only pay for the actual CPU time your functions use while executing, rather than provisioned capacity.

### Activity Log

A chronological record of events on your team, including user actions, [deployments](#deployment), domain changes, and integrations. Team owners and members use the [Activity Log](/docs/activity-log) to audit changes and diagnose issues.

### Agent

See [Vercel Agent](#vercel-agent).

### AI Gateway

A proxy service from Vercel that routes model requests to AI providers through a unified API, with budget management, usage monitoring, load balancing, and fallbacks. See [AI Gateway](/docs/ai-gateway).

### AI SDK

A TypeScript toolkit for building AI-powered applications with React, Next.js, Vue, Svelte, and Node.js through unified APIs for multiple LLM providers. See [AI SDK](/docs/ai-sdk).

### Alerts

Notifications that fire when something is wrong with your project, such as a spike in failed function invocations or unusual usage patterns. Configure delivery through email, Slack, or webhooks. See [Alerts](/docs/alerts).

### Analytics

See [Web Analytics](#web-analytics).

### Anycast Network

A network topology that shares an IP address among multiple nodes, routing requests to the nearest available node based on network conditions to improve performance and fault tolerance.

### Audit Logs

A record of team member activity for compliance and security review. Available to team owners on Enterprise plans, with optional Custom SIEM Log Streaming to AWS S3, Splunk, Datadog, and other destinations. See [Audit Logs](/docs/audit-log).

## B

### Bot Management

The umbrella term for observing and controlling bot traffic to your site. Includes signature-based detection, rate limiting, behavioral analysis, and managed rulesets in the [Vercel Firewall](#vercel-firewall). See [Bot Management](/docs/bot-management).

### Bot Protection

Managed [Vercel Firewall](#vercel-firewall) rulesets that mitigate malicious bot traffic such as content scrapers, credential-stuffing scripts, and traffic floods. Part of [Bot Management](#bot-management). See also [BotID](#botid) for invisible CAPTCHA protection.

### BotID

An invisible CAPTCHA from Vercel, powered by Kasada, that detects sophisticated bots without showing visible challenges or requiring user action. Use it to protect high-value routes such as checkouts, signups, and APIs. See [BotID](/docs/botid).

### Build

The process Vercel runs on every deployment that compiles, bundles, and optimizes your application. See [Builds](/docs/builds).

### Build Cache

A cache that stores build artifacts and dependencies to speed up subsequent deployments. Each build cache holds up to 1 GB and is retained for one month.

### Build Command

The command used to build your project during deployment. Vercel automatically configures this based on your framework, but you can override it.

### Build Output API

A file-system-based specification for a directory structure that produces a Vercel deployment, primarily targeted at framework authors. See [Build Output API](/docs/build-output-api).

## C

### Caching

The multi-layer cache between visitors and your backend. Covers the [CDN](#cdn-content-delivery-network) cache, [ISR](#incremental-static-regeneration-isr) cache, runtime cache, and image cache. See [Caching](/docs/caching) for how Vercel evaluates each layer in order.

### CDN (Content Delivery Network)

A distributed network of servers that stores static content in multiple locations around the globe to serve content from the closest server to users. See [Vercel's CDN](/docs/cdn).

### Checks

Automated tests and assertions that run after every successful deployment to validate quality, performance, and reliability. Use the [Checks API](/docs/checks) to gate promotion or report results from external tools.

### CI/CD (Continuous Integration/Continuous Deployment)

Development practices where code changes are automatically built, tested, and deployed. Vercel provides built-in CI/CD through Git integrations.

### CLI (Command Line Interface)

The Vercel CLI is a command-line tool for deploying projects, managing deployments, and configuring Vercel from your terminal. See [Vercel CLI](/docs/cli).

### Code Owners

A GitHub-integrated feature that automatically assigns the right reviewers based on the files changed, using colocated owners files and customizable review algorithms such as round-robin, on-call, and whole-team. See [Code Owners](/docs/code-owners).

### Comments

Discussion threads on [preview deployments](#preview-deployment) where teams and external collaborators leave feedback through the [Vercel Toolbar](#vercel-toolbar). Enabled by default on all preview deployments and free on every plan. See [Comments](/docs/comments).

### Compute

The processing power and execution environment where your application code runs. Vercel offers serverless compute through Functions and Routing Middleware.

### Concurrency

The ability to handle multiple requests simultaneously. Vercel Functions support concurrency scaling and [Fluid Compute](/docs/fluid-compute) offers enhanced concurrency.

### Conformance

An Enterprise feature that runs automated checks on your code for performance, security, and code health issues during local development and CI. Use [Conformance](/docs/conformance) to prevent regressions and burn down existing issues over time.

### Core Web Vitals

Key metrics defined by Google that assess your web application's loading speed, responsiveness, and visual stability, including Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).

### Cron Jobs

Scheduled tasks that run at specified intervals. Vercel supports cron jobs for automating recurring processes.

### Custom Domain

A [domain](#domains) you own and configure to point to your Vercel deployment, replacing the default `.vercel.app` domain.

### Custom Error Pages

An Enterprise feature that replaces Vercel's default platform error pages, such as function timeouts and throttling, with your own branded HTML pages. See [Custom error pages](/docs/custom-error-pages).

## D

### Data Cache

A specialized cache for the Next.js App Router that stores responses from data fetches, allowing for granular segment-level caching rather than per-route caching.

### DDoS (Distributed Denial of Service)

A type of cyber attack where multiple systems flood a target with traffic. Vercel provides built-in DDoS protection and mitigation.

### Deploy Button

A button you embed in a README or webpage that creates a new Vercel project and clones the source Git repository to a user's GitHub, GitLab, or Bitbucket account. See [Deploy Button](/docs/deploy-button).

### Deploy Hooks

URLs that accept HTTP POST requests to trigger deployments without requiring a new Git commit.

### Deployment

The result of a successful [build](#build) on Vercel. Each deployment has a unique URL and represents a specific version of your application.

### Deployment Checks

Conditions that must pass before Vercel promotes a build to your production domains. Sources include native Vercel checks, GitHub Actions and commit statuses, and Marketplace integrations. See [Deployment Checks](/docs/deployment-checks).

### Deployment Protection

Security features that restrict access to your deployments using methods like Vercel Authentication, Password Protection, or Trusted IPs.

### Deployment Retention

Policies that determine how long Vercel keeps each type of deployment before deleting it. Configure separate retention windows for canceled, errored, preview, and production deployments. See [Deployment Retention](/docs/deployment-retention).

### Directory Sync

An Enterprise feature that syncs team membership from an identity provider such as Okta or Google Directory, mapping IdP groups to Vercel roles. Available to Enterprise team owners. See [Directory Sync](/docs/directory-sync).

### Domains

A user-friendly address such as `vercel.com` that points to your application through DNS records. See [Domains](/docs/domains) for how DNS resolution, nameservers, and Vercel's anycast servers route traffic.

### Draft Mode

A mode that bypasses cached pages so you can preview unpublished CMS content with the site's normal styling and layout. Activate it through the [Vercel Toolbar](#vercel-toolbar) or share a draft URL. See [Draft Mode](/docs/draft-mode).

### Drains

A feature that allows you to send observability data (logs, traces, speed insights, and analytics) to external services for long-term retention and analysis.

## E

### Edge

Servers closest to users in a distributed network. Vercel's CDN serves content and runs code from edge locations globally.

### Edge Config

A global data store that enables ultra-fast data reads in the region closest to the user (within 15ms at P99, often less than 1ms) for configuration data like feature flags.

### Edge Runtime

A minimal JavaScript runtime that exposes Web Standard APIs, used for Vercel Functions and Routing Middleware.

### Edit Mode

A Pro and Enterprise feature that lets content authors edit CMS content in the context of the live website, with one-click jumps from any element to its editing interface. Supports Contentful, Sanity, Builder, TinaCMS, DatoCMS, Payload, Uniform, and Strapi. See [Edit Mode](/docs/edit-mode).

### Environment

A context for running your application, such as Local Development, Preview, or Production. Each environment can have its own configuration and environment variables.

### Environment Variables

Configuration values that can be accessed by your application at build time or runtime, used for API keys, database connections, and other sensitive information.

### Error Codes

Standardized codes for issues you may encounter on Vercel, covering both application errors such as build failures or function timeouts and platform errors. See [Error Codes](/docs/errors) for solutions and explanations.

### External Origins

An external origin is any API or website outside your Vercel project. You can use [rewrites to external origins](/docs/routing/rewrites#external-rewrites) to forward requests to these destinations, allowing Vercel to function as a reverse proxy or standalone CDN.

## F

### Fast Data Transfer

Data transfer between the Vercel CDN and user devices, optimized for performance and charged based on usage.

### Feature Flags

Configuration switches that allow you to enable or disable features without deploying new code. Vercel offers the [Flags SDK](/docs/feature-flags) for implementing flags in Next.js and SvelteKit, and Flags Explorer for managing flags through the Vercel Toolbar.

### Firewall

See [Vercel Firewall](#vercel-firewall).

### Fluid Compute

An enhanced execution model for Vercel Functions that provides in-function concurrency, and a new pricing model where you only pay for the actual CPU time your functions use while executing, rather than provisioned capacity.

### Framework

A software library that provides a foundation for building applications. Vercel supports over 30 frameworks including Next.js, React, Vue, and Svelte.

### Framework Preset

A configuration setting that tells Vercel which framework your project uses, enabling automatic optimization and build configuration.

### Functions

See [Vercel Functions](#vercel-functions).

## G

### Git Integration

Automatic connection between your Git repository (GitHub, GitLab, Bitbucket, Azure DevOps) and Vercel for continuous deployment.

## H

### Headers

HTTP headers you configure to modify request and response behavior, improving security, performance, and functionality. See [Headers](/docs/headers).

### HTTPS/SSL

Secure HTTP protocol that encrypts communication between clients and servers. All Vercel deployments automatically use HTTPS with SSL certificates.

## I

### I/O-bound

Processes limited by input/output operations rather than CPU speed, such as database queries or API requests. Optimized through concurrency.

### Image Optimization

Automatic optimization of images including format conversion, resizing, and compression to improve performance and reduce bandwidth.

### Incremental Static Regeneration (ISR)

A feature that allows you to update static content without redeployment by rebuilding pages in the background on a specified interval.

### Install Command

The command used to install dependencies before building your project, such as `npm install` or `pnpm install`.

### Integration

Third-party services and tools that connect with Vercel to extend functionality, available through the [Vercel Marketplace](#vercel-marketplace).

## J

### JA3/JA4 Fingerprints

TLS fingerprinting techniques used by Vercel's security systems to identify and restrict malicious traffic patterns.

## L

### Limits

Per-plan caps and usage allowances on resources such as concurrent builds, project count, deployment size, and cron jobs. See [Limits](/docs/limits) for the full list by Hobby, Pro, and Enterprise plans.

### Logs

Records that capture what happens during your application's [build](#build) and runtime. Includes build logs, [runtime logs](#runtime-logs), [activity logs](#activity-log), and [audit logs](#audit-logs). See [Logs](/docs/logs).

## M

### Managed Infrastructure

Vercel's fully managed platform that handles server provisioning, scaling, security, and maintenance automatically.

### Marketplace

See [Vercel Marketplace](#vercel-marketplace).

### MCP (Model Context Protocol)

A protocol for AI applications that enables secure and standardized communication between AI models and external data sources.

### Microfrontends

A development approach that allows you to split a single application into smaller, independently deployable units that render as one cohesive application for users. Different teams can use different technologies to develop, test, and deploy each microfrontend independently.

### Middleware

See [Routing Middleware](#routing-middleware).

### Monorepo

A version control strategy where multiple packages or modules are stored in a single repository, facilitating code sharing and collaboration.

### Multi-repo

A version control strategy where each package or module has its own separate repository, also known as "polyrepo."

### Multi-tenant

Applications that serve multiple customers (tenants) from a single codebase, with each tenant getting their own domain or subdomain.

## N

### Node.js

A JavaScript runtime environment that Vercel supports for Vercel Functions and applications.

### Notebooks

A workspace in [Observability](#observability) that groups multiple [queries](#query) into a dashboard or analysis flow, with personal and team-shared scopes. Requires Observability Plus on Pro or Enterprise plans. See [Notebooks](/docs/notebooks).

### Notifications

Configurable alerts about deployments, domains, integrations, account changes, and usage. Vercel delivers them through the dashboard, email, push, and SMS (for [Spend Management](#spend-management) only). See [Notifications](/docs/notifications).

## O

### Observability

Tools and features that help you monitor, analyze, and understand your application's performance, traffic, and behavior in production.

### OG Image Generation

Dynamic Open Graph image generation using the `@vercel/og` library, which renders HTML and CSS into social card images through [Vercel Functions](#vercel-functions). See [OG Image Generation](/docs/og-image-generation).

### OIDC (OpenID Connect)

A federation protocol that issues short-lived, non-persistent tokens for secure backend access without storing long-lived credentials.

### Origin Server

The server that stores and runs the original version of your application code. Vercel's CDN forwards requests to it when no cached response is available.

### Output Directory

The folder containing your final build output after the build process completes, such as `dist`, `build`, or `.next`.

## P

### Package

A collection of files and directories grouped together for a common purpose, such as libraries, applications, or development tools.

### Package Managers

Tools that install your project's dependencies. Vercel auto-detects npm, Yarn, pnpm, Bun, and Vlt by reading the lock file in your repository. See [Package Managers](/docs/package-managers).

### Password Protection

A deployment protection method that restricts access to deployments using a password, available on Enterprise plans or through the Advanced Deployment Protection add-on for Pro plans.

### Plans

Vercel's account tiers: Hobby (free, for personal projects), Pro (credit-based, with team collaboration), and Enterprise (custom limits, SSO, and SLAs). See [Plans](/docs/plans) for what each one includes.

### Points of Presence (PoPs)

Distributed servers in Vercel's CDN that provide the first point of contact for requests. PoPs terminate TCP and route traffic over a private network to the nearest Vercel region, where TLS termination and caching occur.

### Postgres

A relational database connected to your Vercel project through the [Vercel Marketplace](#vercel-marketplace) which provisions instances from providers such as Neon, Supabase, or AWS Aurora and enables Vercel to inject credentials as environment variables. See [Postgres on Vercel](/docs/postgres).

### Preview Deployment

A deployment created from non-production branches that allows you to test changes in a live environment before merging to production.

### Pricing

Vercel's billing model and per-resource rates for products such as [Vercel Functions](#vercel-functions), [Image Optimization](#image-optimization), [Edge Config](#edge-config), [Web Analytics](#web-analytics), and [Speed Insights](#speed-insights). See [Pricing on Vercel](/docs/pricing).

### Private Registry

A private npm registry from Vercel that distributes packages under the `@vercel-private` scope, requiring authentication through a Vercel account. See [Private Registry](/docs/private-registry).

### Production Deployment

The live version of your application that serves end users, typically deployed from your main branch.

### Project

An application that you have deployed to Vercel, which can have multiple deployments and is connected to a Git repository.

### Project Configuration

The set of overrides for build, routing, function, cron, and image-optimization defaults. Define them in `vercel.json`, `vercel.ts`, or the dashboard. See [Project Configuration](/docs/project-configuration).

### Protected Git Scopes

An Enterprise feature that restricts deployments of an organization's Git repositories to authorized Vercel teams, preventing accidental deployments to personal accounts. Up to five scopes per team. See [Protected Git Scopes](/docs/protected-git-scopes).

## Q

### Query

An [Observability](#observability) tool for exploring traffic, errors, latency, and similar metrics across your projects. Save queries to [Notebooks](#notebooks) for reuse and team collaboration. See [Query](/docs/query).

### Queues

See [Vercel Queues](#vercel-queues).

## R

### RBAC (Role-Based Access Control)

A system for managing what each team member can do on Vercel through assigned roles such as owner, member, billing, and developer. See [Role-based access control](/docs/rbac).

### Real Experience Score (RES)

A performance metric in Speed Insights that uses real user data to measure your application's actual performance in production.

### Redirects

HTTP responses that tell clients to make a new request to a different URL, useful for enforcing HTTPS or directing traffic.

### Redis

An in-memory key-value store connected to your Vercel project through the [Vercel Marketplace](#vercel-marketplace), provisioned from providers such as Upstash. Replaces the deprecated Vercel KV. See [Redis on Vercel](/docs/redis).

### Region

Geographic locations where Vercel can run your functions and store data. Vercel has 20 compute-capable regions globally.

### Release Phases

The stages a Vercel product passes through before becoming generally available: Alpha (under development), Beta (pre-GA without an SLA), Private Beta (under NDA), Limited Beta (publicly announced with gated access), and General Availability (GA). See [Release Phases](/docs/release-phases).

### Repository

A location where files and source code are stored and managed in version control systems like Git, maintaining history of all changes.

### REST API

A programmatic interface for managing your Vercel account, projects, and deployments through HTTP requests or the Vercel SDK. See [REST API Reference](/docs/rest-api).

### Rewrites

URL transformations that change what the server fetches internally without changing the URL visible to the client.

### Rolling Releases

A deployment strategy that rolls out a new build to a configurable fraction of traffic before promoting it to 100%. You can pair it with [Skew Protection](#skew-protection) and [Instant Rollback](/docs/instant-rollback). Available on Pro and Enterprise plans. See [Rolling Releases](/docs/rolling-releases).

### Routing

How Vercel's CDN evaluates rules on every request before checking the cache or invoking your code. Order: firewall, bulk redirects, project-level routes, deployment-level routes. Define rules in your framework, in `vercel.json` or `vercel.ts`, or from the dashboard. See [Routing](/docs/routing).

### Routing Middleware

Code that executes before a request is processed, running on [Fluid Compute](/docs/fluid-compute) to modify responses, implement authentication, or perform redirects.

### Runtime

The execution environment for your functions, such as Node.js, Edge Runtime, Python, or other supported runtimes.

### Runtime Logs

Logs generated by your functions during execution, useful for debugging and monitoring application behavior.

## S

### SAML SSO (Single Sign-On)

An authentication protocol that allows teams to log into Vercel using their organization's identity provider. Available on Enterprise plans and as a Pro add-on.

### Sandbox

See [Vercel Sandbox](#vercel-sandbox).

### Secure Compute

An Enterprise add-on that creates private connections between Vercel Functions and backend infrastructure using dedicated static IP addresses, VPC peering, and isolated networks.

### Serverless

A cloud computing model where code runs without managing servers, automatically scaling based on demand and charging only for actual usage.

### Session

A single running microVM instance inside a [Vercel Sandbox](#vercel-sandbox). Persistent sandboxes can have many sessions over time: each time a sandbox resumes from its last snapshot, a new session begins. See [Persistent Sandboxes](/docs/sandbox/concepts/persistent-sandboxes).

### Services

A beta feature that lets you deploy multiple backends and frontends within a single Vercel project, such as a Next.js frontend and a FastAPI backend in the same repository sharing routing, environment variables, and a domain. See [Services](/docs/services).

### Skew Protection

A feature that prevents version mismatches between client and server during a deployment by pinning framework-managed requests to a specific deployment ID. On by default for projects created after November 19, 2024. Available on Pro and Enterprise plans. See [Skew Protection](/docs/skew-protection).

### Speed Insights

Performance monitoring that provides detailed insights into your website's Core Web Vitals and loading performance metrics.

### Spend Management

A Pro feature that notifies you, triggers a webhook, or pauses production deployments when team spend reaches a threshold within a billing cycle. Configurable by team owners and billing roles. See [Spend Management](/docs/spend-management).

### Storage

Vercel's suite of storage products including [Vercel Blob](#vercel-blob) for large files, [Edge Config](#edge-config) for low-latency configuration data, and the [Vercel Marketplace](#vercel-marketplace) for databases such as [Postgres](#postgres) and [Redis](#redis).

### Streaming

A technique for sending data progressively from functions to improve perceived performance and responsiveness.

## T

### Toolbar

See [Vercel Toolbar](#vercel-toolbar).

### Tracing

The collection and analysis of how a request flows through your application and Vercel's infrastructure, captured as spans. Use trace [drains](#drains), Session Tracing in the [Vercel Toolbar](#vercel-toolbar), or `@vercel/otel` for OpenTelemetry. See [Tracing](/docs/tracing).

### Trusted IPs

A deployment protection method that restricts access to deployments based on IP address allowlists, available on Enterprise plans.

### Turborepo

A high-performance build system for monorepos that provides fast incremental builds and remote caching capabilities.

### Two-factor Authentication (2FA)

An additional login verification step using either an authenticator app for time-based one-time passwords or a passkey through a WebAuthN-compatible device. You can configure recovery codes to regain access if you lose your second factor. See [Two-factor authentication](/docs/two-factor-authentication).

## V

### v0

An AI-powered tool that converts natural language descriptions into React code and UI components, integrated with Vercel for deployment.

### Vercel Agent

A suite of AI-powered development tools that includes Code Review for pull request feedback and Investigations for automatically diagnosing production alerts. See [Vercel Agent](/docs/agent).

### Vercel Authentication

A deployment protection method that restricts access to team members and authorized users with Vercel accounts.

### Vercel Blob

Scalable object storage service for static assets like images, videos, and files, optimized for global content delivery.

### Vercel Firewall

A multi-layered security system that protects applications from threats, including platform-wide DDoS protection and customizable WAF rules.

### Vercel Functions

Serverless compute that allows you to run server-side code without managing servers. Functions automatically scale based on demand and offer enhanced concurrency through [Fluid Compute](/docs/fluid-compute) for AI workloads and I/O-bound tasks.

### Vercel Marketplace

A catalog of third-party services that integrate directly with your Vercel projects, including databases, observability tools, AI providers, and CMSs. Marketplace integrations inject credentials as environment variables and bill through your Vercel account. See [Vercel Marketplace](/docs/marketplace-storage).

### Vercel Queues

A durable event-streaming system for serverless applications. Producers publish messages to topics, and consumer groups process them in parallel with automatic retries and replay. Powers [Vercel Workflows](#vercel-workflows). See [Vercel Queues](/docs/queues) (beta).

### Vercel Sandbox

A compute primitive for safely running untrusted or user-generated code in isolated Linux microVMs, designed for AI agents, code generation, and developer experimentation. Sandboxes are persistent by default: the filesystem is snapshotted when a session stops, and the sandbox configuration is preserved across sessions, so both are restored on the next resume.

### Vercel Toolbar

A browser overlay for iterating on deployments, with [Comments](#comments), [Feature Flags](#feature-flags), [Draft Mode](#draft-mode), [Edit Mode](#edit-mode), layout shift inspection, and accessibility audits. Enabled by default on previews. See [Vercel Toolbar](/docs/vercel-toolbar).

### Vercel Workflows

A managed platform for building durable applications and AI agents in JavaScript, TypeScript, and Python. The code can pause, resume, and maintain state across [Vercel Functions](#vercel-functions) and [Vercel Queues](#vercel-queues), with managed persistence handling state and event logs. See [Vercel Workflows](/docs/workflows).

### Virtual Experience Score (VES)

A predictive performance metric that anticipates the impact of changes on application performance before deployment.

## W

### WAF (Web Application Firewall)

A customizable security layer that allows you to define rules to protect against attacks, scrapers, and unwanted traffic.

### Web Analytics

Privacy-friendly analytics that provide insights into website visitors, page views, and user behavior without using cookies.

### Webhooks

HTTP POST endpoints that fire when an event happens in your Vercel team, such as a deployment finishing or a domain changing. Use them to trigger external workflows or integration logic. Available on Pro and Enterprise plans. See [Webhooks](/docs/webhooks).

### Workflows

See [Vercel Workflows](#vercel-workflows).

### Workspace

In JavaScript, an entity in a repository that can be either a single package or a collection of packages, often at the repository root.


---

[View full sitemap](/docs/sitemap)
