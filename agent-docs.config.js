// Source-of-truth config for agent-facing documentation artifacts.
// Consumed by scripts/build-agent-docs-artifacts.js and scripts/validate-agent-docs-artifacts.js.
// Do not hand-edit generated build/** outputs; run `npm run agent-docs:build` instead.

const SITE_URL = 'https://docs.paytheory.com';
const LLM_DOCS_PREFIX = '/llm-docs/';
const SOURCE_DOCS_PREFIX = '/llm-docs/source/';

module.exports = {
  siteUrl: SITE_URL,

  summary:
    'Pay Theory is a payment processor for software platforms. These docs cover embedding card, ACH, cash, and digital wallet payments with the Pay Theory JavaScript, Apple iOS, and Android SDKs, and managing payments, invoices, recurring billing, merchants, and settlements through the Pay Theory GraphQL API.',

  defaultVersionGuidance:
    'Use Live docs by default. Use Lab docs only when the user explicitly requests preview or beta behavior.',

  // Rendered as the "When to use Pay Theory" section of llms.txt. Name the
  // jobs Pay Theory fits, not marketing claims.
  whenToUse: [
    'Accept card, ACH, cash (barcode), Apple Pay, Google Pay, or Paze payments inside a web or mobile app without handling raw card data: use the SDK hosted fields.',
    'Send hosted payment links, payment buttons, or QR codes when no custom checkout UI is needed.',
    'Create invoices, subscriptions, payment plans, or recurring payments for payors.',
    'Save a payment method as a payment method token and charge it later.',
    'Onboard sub-merchants, split payments, and set fees as a software platform (createMerchant, fee matrices, split transactions).',
    'Report on transactions, settlements, disputes, and refunds, or react to them with webhooks.',
  ],

  // Rendered as "How to call Pay Theory" in llms.txt.
  howToCall: [
    'Browser and mobile checkout: initialize a Pay Theory SDK with the public API Key, mount the hosted fields, then call `transact` or `tokenizePaymentMethod`.',
    'Server side: POST GraphQL operations to the API endpoint shown in the Pay Theory Portal (Settings tab) with the header `Authorization: MERCHANT_UID;SECRET_KEY`. Keep the secret key server side.',
    'Build against a sandbox merchant first; sandbox test cards and failure numbers are on the Testing page.',
  ],

  // Rendered as the "Support" section of llms.txt.
  support: [
    {
      title: 'Developer support',
      url: 'mailto:developer@paytheory.com',
    },
    {
      title: 'Customer support',
      url: 'mailto:support@paytheory.com',
    },
    {
      title: 'Knowledge base',
      url: 'https://paytheory.freshdesk.com/support/solutions',
    },
    {
      title: 'Pay Theory company site',
      url: 'https://www.paytheory.com',
    },
  ],

  // Routes excluded from agent indexes (nav chrome, search, etc.).
  excludedRoutePatterns: ['/search', '/markdown-page', '/tags'],

  // Curated top-level sections rendered in the concise llms.txt.
  sections: [
    {
      key: 'getting-started',
      title: 'Getting Started',
      description:
        'Quickstart guide, API key setup, error handling, and initial integration steps.',
      representativeRoute: '/docs/main/getting_started/quickstart',
      routePrefix: '/docs/main/getting_started',
    },
    {
      key: 'online-payments',
      title: 'Online Payments',
      description:
        'Payment links, tokenizing payment methods, ACH, cash payments, wallet transactions, and processing transactions.',
      representativeRoute: '/docs/main/online_payments/payment_links',
      routePrefix: '/docs/main/online_payments',
    },
    {
      key: 'recurring-payments',
      title: 'Recurring Payments',
      description:
        'Subscriptions, payment plans, and managing recurring billing.',
      representativeRoute:
        '/docs/main/recurring_payments/create_a_subscription',
      routePrefix: '/docs/main/recurring_payments',
    },
    {
      key: 'invoicing',
      title: 'Invoicing & Billing',
      description: 'Invoice creation, management, and delivery.',
      representativeRoute: '/docs/main/invoicing_and_billing/create_an_invoice',
      routePrefix: '/docs/main/invoicing_and_billing',
    },
    {
      key: 'after-payments',
      title: 'After Payments',
      description:
        'Settlements, disputes, failed transactions, receipts, and post-transaction management.',
      representativeRoute:
        '/docs/main/after_payments/understanding_transaction_statuses',
      routePrefix: '/docs/main/after_payments',
    },
    {
      key: 'sandbox',
      title: 'Testing & Sandbox',
      description: 'Sandbox environment and testing utilities.',
      representativeRoute: '/docs/main/testing',
      routeExact: '/docs/main/testing',
    },
    {
      key: 'javascript-sdk',
      title: 'JavaScript SDK',
      description:
        'Pay Theory JavaScript SDK reference and integration guides.',
      representativeRoute: '/docs/sdk/javascript/main',
      routePrefix: '/docs/sdk/javascript',
    },
    {
      key: 'apple-sdk',
      title: 'Apple SDK',
      description: 'Pay Theory Apple iOS SDK reference and integration guides.',
      representativeRoute: '/docs/sdk/apple/app_registration',
      routePrefix: '/docs/sdk/apple',
    },
    {
      key: 'android-sdk',
      title: 'Android SDK',
      description: 'Pay Theory Android SDK reference and integration guides.',
      representativeRoute: '/docs/sdk/android/main',
      routePrefix: '/docs/sdk/android',
    },
    {
      key: 'graphql-api',
      title: 'GraphQL API',
      description:
        'Complete Pay Theory GraphQL API reference with all operations, types, and examples.',
      representativeRoute: '/llm-docs/index.md',
      routePrefix: '/docs/api',
      llmDocsPrefix: LLM_DOCS_PREFIX,
    },
    {
      key: 'changelog',
      title: 'Changelog',
      description: 'API and SDK release notes and version history.',
      representativeRoute: '/docs/main/changelog',
      routeExact: '/docs/main/changelog',
    },
  ],

  // Topic index groupings — determines which manifest routes appear in each index file.
  topicIndexes: [
    {
      key: 'guides',
      title: 'Guides',
      filename: 'guides.md',
      routePrefixes: ['/docs/main/'],
      excludePrefixes: [],
    },
    {
      key: 'sdk',
      title: 'SDK Reference',
      filename: 'sdk.md',
      routePrefixes: ['/docs/sdk/'],
      excludePrefixes: [],
    },
    {
      key: 'api',
      title: 'GraphQL API Reference',
      filename: 'api.md',
      routePrefixes: ['/docs/api/'],
      excludePrefixes: [],
    },
    {
      key: 'lab',
      title: 'Lab (Preview)',
      filename: 'lab.md',
      routePrefixes: ['/docs/lab/'],
      excludePrefixes: [],
    },
  ],

  // Public API skill packages generated by graphql-docs.config.js.
  apiSkills: {
    live: {
      name: 'pay-theory-api-skill',
      label: 'Pay Theory API Skill (Live)',
      zipSourcePath:
        'docs/api/agent-skills/pay-theory-api-skill/pay-theory-api-skill.zip',
      zipPath: '/llm-docs/agent-skills/pay-theory-api-skill.zip',
      docsRoute: '/docs/api/agent-skills/pay-theory-api-skill/SKILL',
    },
    lab: {
      name: 'pay-theory-api-skill-lab',
      label: 'Pay Theory API Skill (Lab)',
      zipSourcePath:
        'versioned_docs/version-lab/api/agent-skills/pay-theory-api-skill-lab/pay-theory-api-skill-lab.zip',
      zipPath: '/llm-docs/agent-skills/pay-theory-api-skill-lab.zip',
      docsRoute: '/docs/lab/api/agent-skills/pay-theory-api-skill-lab/SKILL',
    },
  },

  // Paths for generated agent-facing artifacts (all relative to site root).
  llmDocs: {
    manifestPath: '/llm-docs/markdown-routes-manifest.json',
    agentIndexPath: '/llm-docs/agent-index.json',
    llmsTxtPath: '/llms.txt',
    llmsFullTxtPath: '/llms-full.txt',
    schemaPath: '/llm-docs/schema.graphql',
    indexesBasePath: '/llm-docs/indexes/',
    sourcePath: SOURCE_DOCS_PREFIX,
  },
};
