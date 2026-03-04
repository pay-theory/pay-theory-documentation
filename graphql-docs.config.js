/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');
const fs = require('node:fs');
const TRUE_ENV_VALUES = new Set(['1', 'true', 'yes', 'on']);
const FALSE_ENV_VALUES = new Set(['0', 'false', 'no', 'off']);
const DEFAULT_MAIN_SCHEMA = './graphql/api.graphql';
const DEFAULT_LAB_SCHEMA = './graphql/api-lab.graphql';
const DEFAULT_LAB_VERSION = 'lab';

/**
 * Parse boolean-like environment variables with a safe default.
 * Defaults are intentionally conservative so local/dev runs do not produce
 * extra generated artifact churn unless explicitly enabled.
 */
const parseBooleanEnv = (value, defaultValue = false) => {
  if (typeof value !== 'string') {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();
  if (TRUE_ENV_VALUES.has(normalized)) {
    return true;
  }
  if (FALSE_ENV_VALUES.has(normalized)) {
    return false;
  }
  return defaultValue;
};

/**
 * Resolve configurable schema/version paths with safe defaults.
 * The lab schema can be a beta schema while still falling back to main.
 */
const mainSchemaPath =
  process.env.GRAPHQL_DOC_MAIN_SCHEMA?.trim() || DEFAULT_MAIN_SCHEMA;
const labSchemaPrimaryPath =
  process.env.GRAPHQL_DOC_LAB_SCHEMA?.trim() || DEFAULT_LAB_SCHEMA;
const labVersion =
  process.env.GRAPHQL_DOC_LAB_VERSION?.trim() || DEFAULT_LAB_VERSION;
const resolvedLabSchemaPath = fs.existsSync(
  path.resolve(__dirname, labSchemaPrimaryPath),
)
  ? labSchemaPrimaryPath
  : mainSchemaPath;

const introDocs = [
  {
    source: './graphql/intro_docs/main.md',
    outputPath: 'intro/main.mdx',
  },
  {
    source: './graphql/intro_docs/query.md',
    outputPath: 'intro/query.mdx',
  },
];

const mainSidebarPath = path.resolve(__dirname, 'sidebars.js');
const labSidebarPath = path.resolve(
  __dirname,
  `versioned_sidebars/version-${labVersion}-sidebars.json`,
);

module.exports = {
  configVersion: 1,
  cleanOutputDir: true,
  framework: 'docusaurus',
  metadataDir: './docs-metadata',
  exampleFiles: ['./graphql/examples/**/*.json'],
  schemaExtensions: ['./graphql/framework-stubs.graphql'],
  // Keep "Deprecated" visible at the end while leaving all other groups
  // alphabetically sorted in the middle.
  groupOrdering: {
    mode: 'pinned',
    pinToEnd: ['Sandbox', 'Deprecated'],
  },
  targets: [
    {
      name: 'main',
      schema: mainSchemaPath,
      outputDir: './docs/api',
      adapters: {
        docusaurus: {
          // Use an absolute path so generation always patches the real root sidebar.
          sidebarFile: mainSidebarPath,
          sidebarMerge: true,
          sidebarTarget: 'apiSidebar',
          sidebarInsertPosition: 'replace',
          introDocs,
        },
      },
      agentSkill: {
        enabled: parseBooleanEnv(
          process.env.GRAPHQL_DOC_AGENT_SKILL_ENABLED,
          true,
        ),
        name: 'pay-theory-api-skill',
        // Keep target outputs isolated to avoid collisions with lab skill artifacts.
        outputDir: './docs/api/agent-skills/pay-theory-api-skill',
        includeExamples: true,
        introDoc: {
          enabled: true,
          outputPath: 'intro/ai-agent-skill.mdx',
          label: 'AI Agent Skill',
          title: 'AI Agent Skill',
        },
      },
      llmDocs: {
        enabled: true,
        outputDir: './static/llm-docs',
        baseUrl: 'https://docs.paytheory.com',
        apiName: 'PayTheory',
      },
    },
    {
      name: 'lab',
      // If the beta schema file is unavailable, keep lab docs in sync with main.
      schema: resolvedLabSchemaPath,
      outputDir: `./versioned_docs/version-${labVersion}/api`,
      adapters: {
        docusaurus: {
          // Versioned docs IDs still need the `api/...` prefix for versioned sidebars.
          docIdPrefix: 'api',
          sidebarFile: labSidebarPath,
          sidebarFormat: 'json',
          sidebarMerge: true,
          sidebarTarget: 'apiSidebar',
          sidebarInsertPosition: 'replace',
          introDocs,
        },
      },
      llmDocs: {
        // Keep lab markdown artifacts isolated from main.
        enabled: true,
        outputDir: `./static/llm-docs/${labVersion}`,
        baseUrl: 'https://docs.paytheory.com',
        apiName: 'PayTheory Lab',
      },
      agentSkill: {
        // Keep the lab skill package/name distinct from main.
        enabled: true,
        name: 'pay-theory-api-skill-lab',
        outputDir: `./versioned_docs/version-${labVersion}/api/agent-skills/pay-theory-api-skill-lab`,
        includeExamples: true,
        introDoc: {
          enabled: true,
          label: 'AI Agent Skill (Lab)',
          title: 'AI Agent Skill (Lab)',
        },
      },
    },
  ],
  typeExpansion: {
    maxDepth: 5,
    defaultLevels: 0,
  },
};
