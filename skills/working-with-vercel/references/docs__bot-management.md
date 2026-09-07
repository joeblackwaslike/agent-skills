---
title: Bot Management
product: vercel
url: /docs/bot-management
canonical_url: "https://vercel.com/docs/bot-management"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  []
related:
  - /docs/vercel-firewall/firewall-concepts
  - /docs/vercel-firewall/vercel-waf/managed-rulesets
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/observability
summary: Learn how to manage bot traffic to your site.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/bot-management.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "dd5f8ffe857f347e1ce5ce8354252842f7c50162154ae91a2e8fad34b27a720b"
---

# Bot Management

Bots generate nearly half of all internet traffic. While many bots serve legitimate purposes like search engine crawling and content aggregation, others originate from malicious sources. Bot management encompasses both observing and controlling all bot traffic. A key component of this is bot protection, which focuses specifically on mitigating risks from automated threats that scrape content, attempt unauthorized logins, or overload servers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bot Protection is now generally available](https://vercel.com/changelog/bot-protection-is-now-generally-available?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related)
- [Bot Protection is now in public beta](https://vercel.com/changelog/bot-protection-is-now-in-public-beta?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related)
- [Vercel's bot verification now supports Web Bot Auth](https://vercel.com/changelog/vercels-bot-verification-now-supports-web-bot-auth?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related)
- [View & query bot verification data in Vercel Observability](https://vercel.com/changelog/view-and-query-bot-verification-data-in-vercel-observability?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related)
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related) — A practical checklist for keeping your storefront fast and your checkout path healthy through Black Friday and Cyber Mon
- [Should I use Cloudflare in front of Vercel?](https://vercel.com/kb/guide/cloudflare-with-vercel?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related) — Information on using Cloudflare together with Vercel.
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [How to protect your AI app from bots](https://vercel.com/kb/guide/how-to-protect-your-ai-app-from-bots?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related) — Learn how to protect your AI app from bots, scrapers, and abuse using Firewall, BotID, and more.
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [How we run Vercel's CDN in front of Discourse](https://vercel.com/blog/how-we-run-vercels-cdn-in-front-of-discourse?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related)
- [Security through design: Creating the improved Firewall experience](https://vercel.com/blog/security-through-design-creating-the-improved-firewall-experience?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related)
- [The AI Cloud: A unified platform for AI workloads](https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/bot-management.graph.md](/docs/bot-management.graph.md?from=related&source_path=%2Fdocs%2Fbot-management&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## How bot management works

Bot management systems analyze incoming traffic to identify and classify requests based on their source and intent. This includes:

- Verifying and allowing legitimate bots that correctly identify themselves
- Monitoring bot traffic patterns and resource consumption
- Detecting and challenging suspicious traffic that behaves abnormally
- Enforcing browser-like behavior by verifying navigation patterns and cache usage

### Methods of bot management and protection

To effectively manage bot traffic and protect against harmful bots, you can use various techniques, including:

- Signature-based detection: Inspecting HTTP requests for known bot signatures
- Rate limiting: Restricting how often certain actions can be performed to prevent abuse
- Challenges: [Using JavaScript checks to verify human presence](/docs/vercel-firewall/firewall-concepts#challenge)
- Behavioral analysis: Detecting unusual patterns in user activity that suggest automation

With Vercel, you can use:

- [Managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-bot-protection-managed-ruleset) to challenge specific bot traffic
- Rate limiting and challenge actions with [WAF custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) to prevent bot activity from reaching your application
- [DDoS protection](/docs/vercel-firewall/ddos-mitigation) to defend your application against bot driven attacks
- [Observability](/docs/observability) and [Firewall](/docs/vercel-firewall/firewall-observability) to monitor bot patterns, traffic sources, and the effectiveness of your bot management strategies

## Bot protection managed ruleset

> **🔒 Permissions Required**: Bot protection managed ruleset

With Vercel, you can use the bot protection managed ruleset to [challenge](/docs/vercel-firewall/firewall-concepts#challenge) non-browser traffic from accessing your applications. It filters out automated threats while allowing legitimate traffic.

- It identifies clients that violate browser-like behavior and serves a javascript challenge to them.
- It prevents requests that falsely claim to be from a browser such as a `curl` request identifying as Chrome.
- It automatically excludes [verified bots](#verified-bots), such as Google's crawler, from evaluation.

To learn more about how the ruleset works, review the [Challenge](/docs/vercel-firewall/firewall-concepts#challenge) section of [Firewall actions](/docs/vercel-firewall/firewall-concepts#firewall-actions). To understand the details of what get logged and how to monitor your traffic, review [Firewall Observability](/docs/vercel-firewall/firewall-observability).

> **💡 Note:** For trusted automated traffic, you can create [custom WAF
> rules](/docs/vercel-firewall/vercel-waf/custom-rules) with [bypass
> actions](/docs/vercel-firewall/firewall-concepts#bypass) that will allow this
> traffic to skip the bot protection ruleset.

### Enable the ruleset

The ruleset is **inactive by default**. In the dashboard this is labeled **Off**. Matching traffic is not evaluated and reaches your application.

You can apply the ruleset to your project in [log](/docs/vercel-firewall/firewall-concepts#log) or [challenge](/docs/vercel-firewall/firewall-concepts#challenge) mode. Learn how to [configure the bot protection managed ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-bot-protection-managed-ruleset).

### Bot protection ruleset with reverse proxies

Bot Protection doesn't work when a reverse proxy (e.g. Cloudflare, Azure, or other CDNs) is placed in front of your Vercel deployment. This setup significantly degrades detection accuracy and performance, leading to a suboptimal end-user experience.

[Reverse proxies](/docs/security/reverse-proxy) interfere with Vercel's ability to reliably identify bots:

- **Obscured detection signals**: Legitimate users may be incorrectly challenged because the proxy masks signals that Bot Protection relies on.
- **Frequent re-challenges**: Some proxies rotate their exit node IPs frequently, forcing Vercel to re-initiate the challenge on every IP change.

## AI bots managed ruleset

> **🔒 Permissions Required**: AI bots managed ruleset

Vercel's AI bots managed ruleset allows you to control traffic from AI bots that crawl your site for training data, search purposes, or user-generated fetches.

- It identifies and filters requests from known AI crawlers and bots.
- It provides options to log or deny these requests based on your preferences.
- The list of known AI bots is automatically maintained and updated by Vercel.

When new AI bots emerge, Vercel automatically adds them to its managed list and handles them according to your existing configured action without requiring any changes on your part.

### Enable the ruleset

The ruleset is **inactive by default**. In the dashboard this is labeled **Allow**. Matching traffic is not evaluated and reaches your application.

You can apply the ruleset to your project in [log](/docs/vercel-firewall/firewall-concepts#log) or [deny](/docs/vercel-firewall/firewall-concepts#deny) mode. Learn how to [configure the AI bots managed ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-ai-bots-managed-ruleset).

## Verified bots

Vercel maintains and continuously updates a comprehensive directory of known legitimate bots from across the internet. This directory is regularly updated to include new legitimate services as they emerge. [Attack Mode](/docs/vercel-firewall/attack-mode#known-bots-support) and bot protection automatically recognize and allow these bots to pass through without being challenged. You can block access to some or all of these bots by writing [WAF custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) with the **User Agent** match condition or **Signature-Agent** header. To learn how to do this, review [WAF Examples](/docs/vercel-firewall/vercel-waf/examples).

### Bot verification methods

To prove that bots are legitimate and verify their claimed identity, several methods are used:

- **IP Address Verification**: Checking if requests originate from known IP ranges owned by legitimate bot operators (e.g., Google's Googlebot, Bing's crawler).
- **Reverse DNS Lookup**: Performing reverse DNS queries to verify that an IP address resolves back to the expected domain (e.g., an IP claiming to be Googlebot should resolve to `*.googlebot.com` or `*.google.com`).
- **Cryptographic Verification**: Using digital signatures to authenticate bot requests through protocols like [Web Bot Authentication](https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture), which employs HTTP Message Signatures (RFC 9421) to cryptographically verify automated requests.

### Verified bots directory

[Submit a bot request](https://bots.fyi/new-bot) if you are a SaaS provider and would like to be added to this list.

Bot name

Category

Description

Documentation

adagiobot

advertising

Adagiobot is a web crawler that analyzes websites for advertising demand optimization, helping publishers maximize revenue through real-time bidding analysis and performance insights. AdagioBot fetches /ads.txt, /app-ads.txt and /sellers.json files to comply with IAB Supply Chain Validation.

View

adidxbot

advertising

AdIdxBot is the crawler used by Bing Ads for quality control of ads and their destination websites. It has multiple user agent variants including desktop, iPhone, and Windows Phone versions.

View

adsense

advertising

The AdSense crawler visits participating sites in order to provide them with relevant ads.

View

adyen-webhook

webhook

Adyen’s webhooks (Notification API) send encrypted, real-time HTTP callbacks for key payment and account events—automating order fulfillment, settlement reconciliation, and risk-management workflows.

View

ahrefsbot

search\_engine\_optimization

Powers the database for both Ahrefs, a marketing intelligence platform, and Yep, an independent, privacy-focused search engine.

View

ahrefssiteaudit

search\_engine\_optimization

Powers Ahrefs’ Site Audit tool. Ahrefs users can use Site Audit to analyze websites and find both technical SEO and on-page SEO issues.

View

algolia

search\_engine\_crawler

The Algolia Crawler extracts content from your site and makes it searchable.

View

amazon-adbot

advertising

Amazon AdBot is a crawler used by different advertising services at Amazon to determine a website's content in order to provide relevant and appropriate advertising. Amazon AdBot only crawls websites for which Amazon or an advertiser partner may serve an ad.

View

amazon-kendra

ai\_assistant

Amazon Kendra is a managed information retrieval and intelligent search service that uses natural language processing and advanced deep learning model.

View

amazon-q

ai\_assistant

Amazon Q Business is a generative artificial intelligence (generative AI)-powered assistant that you can tailor to your business needs.

View

amazonbot

ai\_crawler

Amazonbot is Amazon's web crawler used to improve our services, such as enabling Alexa to more accurately answer questions for customers.

View

apis-google

search\_engine\_crawler

Crawling preferences addressed to the APIs-Google user agent affect the delivery of push notification messages by Google APIs.

View

apple-podcasts

feed\_fetcher

Apple Podcasts crawler that only accesses URLs associated with registered content on Apple Podcasts. Does not follow robots.txt.

View

applebot

ai\_crawler

Applebot powers search features in Apple's ecosystem (Spotlight, Siri, Safari) and may be used to train Apple's foundation models for generative AI features.

View

artemis-web-crawler

feed\_fetcher

Artemis is a calm web reader with which you can follow websites and blogs.

View

atlassian-jira-webhooks

webhook

Delivers webhook notifications from Jira Cloud when issues, projects, or other resources change.

View

rovo

ai\_crawler

Crawls and indexes web content for Atlassian Rovo's AI-powered search, chat, and agents.

View

baiduspider

search\_engine\_crawler

Baiduspider is Baidu’s web crawler that indexes websites for inclusion in its Chinese-market search results.

View

barkrowler

search\_engine\_optimization

Barkrowler is Babbar's web crawler that fuels and updates their graph representation of the web, providing SEO tools for the marketing community.

View

better-stack

monitor

Better Stack is a platform for monitoring and alerting on your applications.

View

bingbot

search\_engine\_crawler

Bingbot is Microsoft's web crawler used for indexing websites for Bing Search.

View

brightbot

monitor

Brightbot is Bright Data's crawler layer that monitors the health of websites and enforces ethical web data collection. It prevents access to non-public information and blocks interactive endpoints that could be abused, acting as a guardian for ethical data collection.

View

browserbase

ai\_crawler

Runs headless browser automation on behalf of Browserbase customers for web scraping, form submission, and testing.

View

buffer-link-preview-bot

preview

Helps Buffer users create better social media posts by generating rich previews when they share links

View

ccbot

ai\_crawler

CCBot is operated by the Common Crawl Foundation to crawl web content for AI training and research. Common Crawl is a non-profit organization that maintains an open repository of web crawl data that is universally accessible for research and analysis.

View

certchief

monitor

Crawls domains for TLS/DNS configuration problems and runs periodic testssl.sh scans.

View

channel3bot

ecommerce

Crawls product detail pages to index content for AI-powered product discovery, routing shoppers to original websites.

View

chatgpt-operator

ai\_assistant

Handles user-initiated requests from ChatGPT operator accessing external content; not used for automated crawling or AI training.

View

chatgpt-user

ai\_assistant

Handles user-initiated requests in ChatGPT, accessing external content to provide real-time information; not used for automated crawling or AI training.

View

checkly

monitor

Checkly is a platform for monitoring and alerting on your applications.

View

chrome-lighthouse

analytics

PageSpeed Insights (PSI) reports on the user experience of a page on both mobile and desktop devices, and provides suggestions on how that page may be improved.

View

chrome-privacy-preserving-prefetch-proxy

preview

Chrome's Privacy Preserving Prefetch Proxy service that fetches /.well-known/traffic-advice to enable privacy-preserving prefetch hints.

View

claude-searchbot

ai\_assistant

Claude-SearchBot navigates the web to improve search result quality for users. It analyzes online content specifically to enhance the relevance and accuracy of search responses.

View

claude-user

ai\_assistant

Claude-User supports Claude AI users. When individuals ask questions to Claude, it may access websites using a Claude-User agent.

View

claudebot

ai\_crawler

ClaudeBot helps enhance the utility and safety of our generative AI models by collecting web content that could potentially contribute to their training.

View

cloudflare-customer-slo-prober

monitor

Automated probes that monitor the availability and latency of enrolled customer endpoints.

View

cookiebot

monitor

Cookiebot automates compliance with cookie laws and helps you manage your cookie consent preferences.

View

cookieyesbot

monitor

Scans websites to verify cookie consent banner implementation and compliance with privacy regulations for CookieYes customers.

View

criteobot

advertising

CriteoBot is a crawler operated by Criteo that analyzes web content to serve relevant contextual ads. The bot respects robots.txt directives and crawl delays, and only accesses publicly available content.

View

cursor-agent-webhook

webhook

Cursor-Agent-Webhook delivers Cloud Agent lifecycle notifications from Cursor to endpoints a customer has explicitly configured, such as an agent starting or finishing work.

View

cursor-origin-webhook

webhook

Cursor-Origin-Webhook delivers event notifications from Cursor's Origin code platform to endpoints a customer has explicitly configured, such as pull request and repository activity. Requests are only sent to URLs the recipient registered, and each one is signed.

View

cursor-server

ai\_assistant

Cursor connects to Model Context Protocol (MCP) servers on behalf of a Cursor user, so their AI coding agent can use the tools a site exposes.

View

customerio-webhooks

webhook

Customer.io's webhook service for event-driven marketing automation and customer data platform.

View

cybaa-agent

verification

Performs user-initiated security checks on behalf of Cybaa customers, validating security headers, TLS/SSL configuration, and other domain-specific security controls to ensure website compliance and protection.

View

dash0-synthetic

monitor

Dash0's Synthetic Monitoring provides proactive, automated insights into the availability and performance of your websites and APIs.

View

datadog-synthetic-monitoring-robot

monitor

Datadog's automated monitoring service that performs synthetic tests to verify website availability and performance.

View

dataforseobot

search\_engine\_optimization

DataForSeoBot is a backlink checker bot operated by DataForSEO that crawls websites to build and maintain their backlink database. The bot respects robots.txt directives and crawl delays, and is used to provide SEO data and analytics services.

View

detectify

monitor

Detectify is a web security scanner that performs automated security tests on web applications and attack surface monitoring.

View

duckassistbot

ai\_assistant

DuckAssistBot is a web crawler for DuckDuckGo Search that crawls pages in real-time for AI-assisted answers, which prominently cite their sources. This data is not used in any way to train AI models.

View

duckduckbot

search\_engine\_crawler

DuckDuckBot is a web crawler for DuckDuckGo. DuckDuckBot’s job is to constantly improve search results and offer users the best and most secure search experience possible.

View

facebook-webhooks

webhook

Facebook's webhook service that delivers real-time event notifications for Meta platform events and changes.

View

facebookexternalhit

preview

Fetches content for shared links on Meta platforms to generate rich previews.

View

falbot

webhook

fal.ai's webhook service that delivers asynchronous notifications for AI model processing and generation tasks.

View

geedoproductsearchbot

ecommerce

GeedoProductSearch is a web crawler operated by Geedo SIA that indexes product information from e-commerce websites. The crawler respects robots.txt directives and can be configured for crawl speed and behavior through standard crawl-delay settings.

View

gemini-deep-research

ai\_assistant

Gemini Deep Research is Google's AI-powered research tool that performs comprehensive multi-step research on complex topics, analyzing web content to provide detailed insights and answers.

View

github-camo

preview

GitHub's image proxy service

View

github-hookshot

webhook

GitHub's webhooks for events like push, pull request, etc.

View

google-admob-reward-verification

webhook

Sends server-side verification callbacks to confirm users completed rewarded ad views.

View

google-ads-creatives-assistant

ai\_assistant

Fetches website content for Google Ads creative generation and enhancement tools.

View

google-adsbot

advertising

Google AdsBot is Google's web crawler for quality control of Google Ads.

View

google-adwords-instant

advertising

Fetches advertiser landing pages when triggered by user actions in the Google Ads platform.

View

google-agent

agent

Google-Agent navigates the web and performs actions upon user request, used by agents hosted on Google infrastructure such as Project Mariner.

View

google-association-service

verification

Verifies associations between apps and websites for Digital Asset Links.

View

google-businesslink-verification

verification

Verifies that business links in Google Business Profile are accessible and return valid HTTP status codes.

View

google-cloudvertexbot

ai\_assistant

Crawling preferences addressed to the Google-CloudVertexBot user agent affect crawls requested by the site owners' for building Vertex AI Agents. It has no effect on Google Search or other products.

View

google-display-ads-bot

advertising

Verifies site eligibility during the AdSense approval process.

View

google-docs

preview

Fetches images and page content when users insert links into Google Docs.

View

google-extended

ai\_crawler

Google-Extended is a standalone product token that web publishers can use to manage whether their sites help improve Gemini Apps and Vertex AI generative APIs, including future generations of models that power those products. Grounding with Google Search on Vertex AI does not use web pages for grounding that have disallowed Google-Extended. Google-Extended does not impact a site's inclusion or ranking in Google Search.

View

google-feedfetcher

feed\_fetcher

Feedfetcher is used for crawling RSS or Atom feeds for Google News and PubSubHubbub.

View

google-image-proxy

preview

Google's image caching proxy service used by Gmail and other Google services to cache and serve images.

View

google-inspectiontool

monitor

Crawling preferences addressed to the Google-InspectionTool user agent affect Search testing tools such as the Rich Result Test and URL inspection in Search Console. It has no effect on Google Search or other products.

View

google-pagerenderer

preview

Upon user request, Google Page Renderer fetches and renders web pages.

View

google-publisher-center

feed\_fetcher

Google Publisher Center fetches and processes feeds that publishers explicitly supplied for use in Google News landing pages.

View

google-read-aloud

accessibility

Upon user request, Google Read Aloud fetches and reads out web pages using text-to-speech (TTS).

View

google-safety

monitor

The Google-Safety user agent handles abuse-specific crawling, such as malware discovery for publicly posted links on Google properties. As such it's unaffected by crawling preferences.

View

google-site-verifier

verification

Google Site Verifier fetches Search Console verification tokens.

View

google-storebot

ecommerce

Crawling preferences addressed to the Storebot-Google user agent affect all surfaces of Google Shopping (for example, the Shopping tab in Google Search and Google Shopping).

View

googlebot

search\_engine\_crawler

Crawling preferences addressed to the Googlebot user agent affect Google Search (including Discover and all Google Search features), as well as other products such as Google Images, Google Video, Google News, and Discover.

View

googleother

search\_engine\_crawler

Crawling preferences addressed to the GoogleOther user agent don't affect any specific product. GoogleOther is the generic crawler that may be used by various product teams for fetching publicly accessible content from sites. For example, it may be used for one-off crawls for internal research and development. It has no effect on Google Search or other products.

View

gpt-actions

ai\_assistant

Enables ChatGPT to interact with external APIs and retrieve real-time information from the web in response to user-initiated requests; allows access to up-to-date content without being used for automated crawling or AI training.

View

gptbot

ai\_crawler

Crawls web content to improve OpenAI's generative AI models and ChatGPT; respects 'robots.txt' directives to exclude sites from training data.

View

gtmetrix

monitor

GTmetrix provides metrics and insights for your site's loading speed and performance.

View

hetrixtools-uptime-monitoring-bot

monitor

HetrixTools Uptime Monitoring Bot is used by HetrixTools's monitoring services to perform various checks on websites, including uptime and performance monitoring.

View

hookdeck

webhook

A reliable Event Gateway for event-driven applications

View

hydrozen

monitor

Hydrozen is a tool for monitoring availability of your websites, Cronjobs, APIs, Domains, SSL etc.

View

iframely

preview

Fetches your page metadata to generate rich link previews when users share your links across apps, blogs, and news sites, enhancing content visibility and engagement.

View

imagesiftbot

ai\_crawler

ImageSiftBot is a web crawler that scrapes the internet for publicly available images to support Hive's suite of web intelligence products.

View

impactcindagent

verification

Crawls partner and brand sites to verify impact.com tracking installation and brand agreement compliance.

View

inngest

webhook

Inngest is a platform for building event-driven applications.

View

jobswithgpt

search\_engine\_crawler

Crawls job-related pages to power jobswithgpt.com, a platform for discovering AI-enhanced career opportunities.

View

kakaotalk-scrap

preview

Fetches Open Graph metadata and images from URLs shared in KakaoTalk to generate mobile-optimized link previews.

View

kernel-searchbot

ai\_crawler

Crawls public web pages to build Kernel's search index, which Kernel customers query through their AI agents.

View

kernel

ai\_crawler

Runs browser automation on behalf of Kernel customers for web agents, automations, and web scraping.

View

linkedinbot

preview

LinkedInBot is a bot that renders links shared on LinkedIn.

View

logicmonitor

monitor

LogicMonitor SiteMonitor monitors your website's uptime, performance, and availability from multiple global regions.

View

lumar

search\_engine\_optimization

The Lumar website intelligence platform is used by SEO, engineering, marketing and digital operations teams to monitor the performance of their site’s technical health, and ensure a high-performing, revenue-driving website.

View

marfeel-audits

monitor

Marfeel's audit crawlers that periodically re-crawl traffic-receiving URLs to detect structured data, meta tags, and HTML issues.

View

marfeel-flowcards

preview

Marfeel's crawler that fetches content for Flowcards that load directly from specific URLs.

View

marfeel-preview

preview

Marfeel's previewer crawler used to render preview experiences for both mobile and desktop views.

View

marfeel-social

social\_media

Marfeel's crawler used for social experiences (Facebook, X/Twitter, Telegram, Reddit, LinkedIn).

View

meta-externalads

advertising

Crawls the web to improve advertising and business-related products and services.

View

meta-externalagent

ai\_crawler

The Meta-ExternalAgent crawler crawls the web for use cases such as training AI models or improving products by indexing content directly.

View

meta-externalfetcher

user\_initiated

The Meta-ExternalFetcher crawler performs user-initiated fetches of individual links to support specific product functions. Because the fetch was initiated by a user, this crawler may bypass robots.txt rules.

View

meta-webindexer

ai\_crawler

Crawls web content to provide search results for Meta AI users.

View

microsoftpreview

preview

MicrosoftPreview generates page snapshots for Microsoft products. It has desktop and mobile variants, with Chrome version dynamically updated to match the latest Microsoft Edge version.

View

momenticbot

user\_initiated

Momentic is a AI-powered platform for software testing. It allows you to write reliable end-to-end tests for web apps in a simple and intuitive way using natural language.

View

adsnaver

search\_engine\_crawler

Naver's ad crawler that periodically visits registered ad landing pages to collect on-page content for effective ad matching and ranking. It ignores robots.txt for URLs registered in the ad system.

View

naver-blueno

preview

Naver's preview-snippet crawler that fetches summary information (titles, descriptions, images) when users insert links in Naver services such as blogs or cafés. It operates on demand and respects robots.txt.

View

naverbot

search\_engine\_crawler

Naver's web crawler (also known as Yeti) is used by Naver, South Korea's largest search engine, to crawl and index web content.

View

newrelic-minions

monitor

New Relic Synthetic monitoring infrastructure that performs API checks and virtual browser instances to monitor websites and applications from global locations

View

oai-adsbot

advertising

Validates the safety of web pages submitted as ads on ChatGPT; data collected is not used to train generative AI foundation models.

View

oai-searchbot

ai\_assistant

Indexes websites for inclusion in ChatGPT's search results; does not crawl content for AI model training.

View

ohdearbot

monitor

OhDearBot is a monitoring bot operated by Oh Dear that performs uptime checks, broken link detection, and mixed content scanning. The bot follows standard crawling practices and throttles requests to minimize server impact.

View

ora-bot

verification

Measures how well websites work for AI agents by fetching public pages and agent-facing files on demand when someone requests a score for a domain.

View

paypal

webhook

PayPal delivers real-time event notifications for payments, subscriptions, and account updates.

View

perplexity-user

ai\_assistant

Handles user-initiated requests in Perplexity, accessing external content to provide real-time information; not used for automated crawling or AI training.

View

perplexitybot

ai\_assistant

Indexes websites for inclusion in Perplexity's search results; does not crawl content for AI model training.

View

petalbot

search\_engine\_crawler

PetalBot is a web crawler operated by Huawei's Petal Search engine. It crawls both PC and mobile websites to build an index database for Petal search engine and to provide content recommendations for Huawei Assistant and AI Search services.

View

pingdom-bot

monitor

Pingdom Bot is used by Pingdom's monitoring services to perform various checks on websites, including uptime and performance monitoring.

View

pinterest-bot

search\_engine\_crawler

Pinterest's web crawler that indexes content for their platform. It crawls websites to collect metadata for Pins, including images, titles, descriptions, and prices. The crawler also helps maintain Pin data accuracy and detect broken links.

View

polar-webhooks

webhook

Polar's webhook service delivers real-time event notifications for payment processing, including purchases, subscriptions, cancellations, and refunds.

View

pulsepoint-crawler

advertising

A web crawler used by PulsePoint, a digital advertising technology company, for content indexing and ads.txt verification.

View

qatech

monitor

The QA.tech web agent browses the website and identifies potential test cases, and executes tests against a web application

View

qstash

webhook

QStash is a platform for building event-driven applications.

View

quantcastbot

advertising

Quantcast Bot is a web crawler used for advertisement quality assurance and to understand page content for Interest-Based Audiences.

View

qwantbot

search\_engine\_crawler

Crawls and indexes web content for Qwant search engine.

View

razorpay-webhook

webhook

Razorpay’s webhooks enable merchants to receive secure, real-time HTTP callbacks for key payment events—automating reconciliation, notifications, and downstream workflows.

View

redirect-pizza

monitor

redirect.pizza's destination monitor ensures that the redirect destination URLs are reachable.

View

amazon-route-53-health-check-service

monitor

Amazon Route 53 Health Check Service

View

ryebot

ecommerce

Powers automated checkout on behalf of shoppers with explicit consent.

View

sanity-webhooks

webhook

Sanity's webhook service that delivers real-time event notifications for content changes and other events.

View

sansec-security-monitor

monitor

Sansec Security Monitor is a web crawler that monitors online stores for malicious code, data breaches, and digital skimming attacks.

View

seekportbot

search\_engine\_crawler

SeekportBot is the web crawler for Seekport, a German search engine operated by SISTRIX. The bot crawls and indexes web content while respecting robots.txt directives and crawl delays.

View

semrush-site-audit

search\_engine\_optimization

Semrush Site Audit is a powerful website crawler that analyzes the health of a website by checking for on-page and technical SEO issues, including duplicate content, broken links, HTTPS implementation, hreflang attributes, and more.

View

semrush

search\_engine\_optimization

Semrush is a platform for SEO, content marketing, competitor research, PPC and social media marketing.

View

sentry-uptime-monitoring-bot

monitor

Sentry's Uptime Monitoring Bot performs health checks on configured URLs to monitor the availability and reliability of web services.

View

seobility

search\_engine\_crawler

Seobility is a browser-based online SEO software that helps you improve your website’s search engine rankings.

View

seranking-backlinks

search\_engine\_optimization

SE Ranking's backlink analysis crawler that discovers and analyzes backlink profiles for SEO research and competitive analysis.

View

seznambot

search\_engine\_crawler

SeznamBot is the web crawler operated by Seznam.cz, the leading Czech search engine. The bot crawls and indexes web content for Seznam's search results, respecting robots.txt directives and crawl delays.

View

shapbot

ai\_crawler

Crawls and indexes web content to power Parallel's search and content extraction APIs for AI applications.

View

site24x7

monitor

Site24x7 Bot is used by Site24x7's monitoring services to perform various checks on websites, including uptime and performance monitoring.

View

stably

monitor

Stably is a QA testing bot that users run to E2E test their websites for functionality testing and protecting user flows against regressions.

View

statuscake-pagespeed

monitor

StatusCake Page Speed monitors your page load and render speeds.

View

statuscake-ssl

monitor

StatusCake SSL monitors your website certificates for common issues

View

statuscake-uptime

monitor

StatusCake monitors the uptime of your website.

View

stripe-webhooks

webhook

Stripe's webhook service that delivers real-time event notifications for payment processing and account updates.

View

stripebot

analytics

Crawls Stripe merchant websites to collect data for service delivery and financial regulatory compliance.

View

svix

webhook

svix is a webhook service for sending events to webhooks.

View

termlybot

monitor

Crawls websites to detect and categorize cookies set by first and third parties.

View

twitterbot

preview

Fetches content for shared links on X/Twitter to generate rich previews.

View

updown-io

monitor

Performs uptime and performance checks on websites.

View

uptime-robot

monitor

Uptime Robot is a platform for monitoring and alerting on your applications.

View

v0bot

ai\_crawler

Bot for v0 services.

View

vemetric-favicon-bot

preview

Fetches favicons from websites in the highest quality available.

View

vercel-build-container

preview

System-initiated requests made from Vercel's build container during a build

View

vercel-favicon-bot

preview

Vercel Favicon Bot

View

vercelflags

monitor

vercel flags

View

vercel-screenshot-bot

preview

Vercel Screenshot Bot

View

verceltracing

monitor

vercel tracing

View

yahoo-ad-monitoring

advertising

Yahoo Ad Monitoring crawls landing pages of URLs listed with Yahoo advertising services to analyze content quality, ensure ad relevance, and improve user experience by maintaining accurate ad listings.

View

yahoo-slurp

search\_engine\_crawler

Yahoo! Slurp is the web crawler (robot) used by Yahoo! Search to discover and index web pages for its search engine.

View

yandexbot

search\_engine\_crawler

YandexBot is a web crawler operated by Yandex, a major Russian search engine.

View


---

[View full sitemap](/docs/sitemap)
