---
title: Report Abuse
product: vercel
url: /docs/platforms/platform-elements/blocks/report-abuse
canonical_url: "https://vercel.com/docs/platforms/platform-elements/blocks/report-abuse"
last_updated: 2026-06-26
type: reference
prerequisites:
  - /docs/platforms/platform-elements/blocks
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/blocks/custom-domain
summary: A content moderation interface for reporting abuse with categorization, validation, and privacy-focused design.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/blocks/report-abuse.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "81e3fddbb76c8e0cf84e9801ce67c453420f110a3f1f1ff96163969c36ba8389"
---

# Report Abuse

## Overview


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Modals](https://chat-sdk.dev/docs/modals?from=related) — Collect structured user input through modal dialogs with text fields, dropdowns, and validation.
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk?from=related) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [useReportWebVitals](https://nextjs.org/docs/pages/api-reference/functions/use-report-web-vitals?from=related) — useReportWebVitals
- [Cards](https://chat-sdk.dev/docs/cards?from=related) — Send rich interactive cards with buttons, fields, and images across all platforms.
- [useReportWebVitals](https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals?from=related) — API Reference for the useReportWebVitals function.
- [Error Reports for Your Projects with URIports and Vercel](https://vercel.com/kb/guide/client-side-error-reports-with-uriports-vercel?from=related) — Enable error reporting for your websites deployed with Vercel and act fast on issues.
- [Redacting Sensitive Data](https://vercel.com/docs/analytics/redacting-sensitive-data?from=related) — Learn how to redact sensitive data from your Web Analytics events.
- [Claim Deployment](https://vercel.com/docs/platforms/platform-elements/blocks/claim-deployment?from=related) — A component for users to claim ownership of Vercel deployments created on their behalf.
- [Get Started with BotID](https://vercel.com/docs/botid/get-started?from=related) — Step-by-step guide to setting up BotID protection in your Vercel project
- [DNS Table](https://vercel.com/docs/platforms/platform-elements/blocks/dns-table?from=related) — A DNS record display component with one-click copying for guiding users through domain configuration.
- [Accessibility Audit Tool](https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool?from=related) — Learn how to use the Accessibility Audit Tool to automatically check the Web Content Accessibility Guidelines 2.0 level

Full cross-link map for this page: [/docs/platforms/platform-elements/blocks/report-abuse.graph.md](/docs/platforms/platform-elements/blocks/report-abuse.graph.md)
<!-- /docsgraph:related -->

The Report Abuse block provides platforms with a professional content moderation interface. Essential for platforms like Mintlify and Hashnode that host user-generated content, this component enables visitors to report inappropriate content while maintaining user privacy and preventing false reports. It features a clean dialog interface with comprehensive form validation and clear submission flow.

## Installation

Install the `report-abuse` block into your project using the Platform Elements installer.

## Features

- **Categorized reporting**: Customizable abuse categories for accurate classification
- **Optional URL field**: Users can specify the exact content location
- **Detailed descriptions**: Textarea for comprehensive issue reporting
- **Email validation**: Collects reporter contact for follow-up if needed
- **Privacy notice**: Built-in privacy disclosure for transparency
- **Form validation**: Required fields and input validation
- **Clean dialog UI**: Non-intrusive modal interface
- **Responsive design**: Works seamlessly across all devices
- **Visual indicators**: Icons and colors enhance user understanding

## Usage

### Basic implementation

```tsx filename="report-abuse.tsx"
import { ReportAbuse } from '@/components/blocks/report-abuse';

export default function ContentPage() {
  const abuseTypes = [
    { value: 'spam', label: 'Spam or Advertising' },
    { value: 'inappropriate', label: 'Inappropriate Content' },
    { value: 'copyright', label: 'Copyright Violation' },
    { value: 'misinformation', label: 'False Information' },
    { value: 'harassment', label: 'Harassment or Hate Speech' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="content-footer">
      <ReportAbuse types={abuseTypes} />
    </div>
  );
}
```

### With server action

```tsx filename="report-abuse.tsx"
import { ReportAbuse } from '@/components/blocks/report-abuse';
import { reportContent } from '@/actions/moderation';

export default function BlogPost({ postId }) {
  const handleReport = async (data) => {
    await reportContent({
      ...data,
      postId,
      reportedAt: new Date(),
    });
  };

  const types = [
    { value: 'spam', label: 'Spam' },
    { value: 'inappropriate', label: 'Inappropriate' },
    { value: 'copyright', label: 'Copyright' },
  ];

  return (
    <>
      <article>...</article>
      <ReportAbuse types={types} onSubmit={handleReport} />
    </>
  );
}
```

## Props

| Prop    | Type                                    | Required | Description                   |
| ------- | --------------------------------------- | -------- | ----------------------------- |
| `types` | `Array<{value: string, label: string}>` | Yes      | Categories of abuse to report |

## Form fields

### Category selection

- **Required**: Yes
- **Type**: Select dropdown
- **Purpose**: Classifies the type of abuse for proper routing

### Content URL

- **Required**: No
- **Type**: URL input
- **Purpose**: Links directly to problematic content
- **Validation**: Must be valid URL format

### Description

- **Required**: Yes
- **Type**: Textarea
- **Purpose**: Detailed explanation of the issue
- **Min length**: Recommended 20+ characters

### Reporter email

- **Required**: Yes
- **Type**: Email input
- **Purpose**: Enables follow-up communication
- **Validation**: Standard email format

## Advanced examples

### Platform-specific categories

```tsx filename="report-abuse.tsx"
// Documentation platform
const docAbuseTypes = [
  { value: 'outdated', label: 'Outdated Information' },
  { value: 'broken-code', label: 'Non-functional Code Examples' },
  { value: 'security-issue', label: 'Security Vulnerability' },
  { value: 'plagiarism', label: 'Plagiarized Content' },
  { value: 'spam', label: 'Spam or Promotional' },
];

// Blog platform
const blogAbuseTypes = [
  { value: 'hate-speech', label: 'Hate Speech' },
  { value: 'misinformation', label: 'Misinformation' },
  { value: 'adult-content', label: 'Adult Content' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'copyright', label: 'Copyright Infringement' },
];

// E-commerce platform
const shopAbuseTypes = [
  { value: 'counterfeit', label: 'Counterfeit Product' },
  { value: 'misleading', label: 'Misleading Description' },
  { value: 'prohibited', label: 'Prohibited Item' },
  { value: 'scam', label: 'Potential Scam' },
];
```

### Integration with moderation system

```tsx filename="report-abuse.tsx"
import { ReportAbuse } from '@/components/blocks/report-abuse';
import { createModerationTicket } from '@/lib/moderation';
import { sendAlertEmail } from '@/lib/email';

export function ModeratedContent({ content }) {
  const handleAbuseReport = async (report) => {
    // Create moderation ticket
    const ticket = await createModerationTicket({
      contentId: content.id,
      reportType: report.category,
      description: report.description,
      reporterEmail: report.email,
      contentUrl: report.contentUrl || content.url,
      status: 'pending',
    });

    // Send alert for high-priority categories
    const highPriority = ['hate-speech', 'illegal', 'csam'];
    if (highPriority.includes(report.category)) {
      await sendAlertEmail({
        to: 'moderation@platform.com',
        subject: `Urgent: ${report.category} reported`,
        ticketId: ticket.id,
      });
    }

    return { success: true, ticketId: ticket.id };
  };

  const types = [
    { value: 'spam', label: 'Spam' },
    { value: 'hate-speech', label: 'Hate Speech' },
    { value: 'illegal', label: 'Illegal Content' },
  ];

  return (
    <div>
      {content.body}
      <ReportAbuse types={types} onSubmit={handleAbuseReport} />
    </div>
  );
}
```

### With rate limiting

```tsx filename="report-abuse.tsx"
import { ReportAbuse } from '@/components/blocks/report-abuse';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  maxReports: 3,
});

export function RateLimitedReporting() {
  const handleSubmit = async (data) => {
    try {
      await limiter.check(data.email, 3);
      // Process report
    } catch {
      throw new Error('Too many reports. Please try again later.');
    }
  };

  return <ReportAbuse types={types} onSubmit={handleSubmit} />;
}
```

## Customization

### Styling the dialog

```css
/* Custom dialog styles */
[data-report-abuse-dialog] {
  @apply bg-background/95 backdrop-blur-md;
}

/* Custom button styling */
[data-report-abuse-trigger] {
  @apply bg-red-600 hover:bg-red-700;
}
```

### Custom privacy notice

```tsx filename="report-abuse.tsx"
const CustomReportAbuse = ({ types }) => {
  return (
    <ReportAbuse
      types={types}
      privacyNotice={
        <div className="text-sm text-muted-foreground">
          <p>
            Your report is confidential and will be reviewed within 24 hours.
          </p>
          <a href="/privacy" className="underline">
            Learn more about our moderation process
          </a>
        </div>
      }
    />
  );
};
```

## Security considerations

- **Rate limiting**: Implement rate limits to prevent spam reports
- **Authentication**: Consider requiring login for reporting
- **IP logging**: Log IP addresses for abuse prevention
- **Validation**: Sanitize all inputs before processing
- **CAPTCHA**: Add CAPTCHA for anonymous reporting

## Best practices

- **Clear categories**: Use specific, non-overlapping categories
- **Quick response**: Acknowledge reports immediately
- **Follow-up**: Send confirmation emails when appropriate
- **Transparency**: Publish moderation guidelines
- **Appeals process**: Provide a way to contest false reports
- **Analytics**: Track report patterns to identify issues

## Moderation workflow

```tsx filename="report-abuse.tsx"
// Example moderation workflow
const ModerationWorkflow = {
  // 1. Receive report
  receiveReport: async (report) => {
    const ticket = await createTicket(report);
    await notifyModerators(ticket);
    return ticket.id;
  },

  // 2. Review content
  reviewContent: async (ticketId) => {
    const ticket = await getTicket(ticketId);
    const content = await getContent(ticket.contentId);
    return { ticket, content };
  },

  // 3. Take action
  takeAction: async (ticketId, action) => {
    switch (action) {
      case 'remove':
        await removeContent(ticketId);
        break;
      case 'warning':
        await sendWarning(ticketId);
        break;
      case 'dismiss':
        await dismissReport(ticketId);
        break;
    }
  },

  // 4. Notify reporter
  notifyReporter: async (ticketId, outcome) => {
    const ticket = await getTicket(ticketId);
    await sendEmail(ticket.reporterEmail, outcome);
  },
};
```

## Related

- [Custom Domain block](/docs/platforms/platform-elements/blocks/custom-domain)


---

[View full sitemap](/docs/sitemap)
