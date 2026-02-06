module.exports = {
  outputDir: './docs/api',
  cleanOutputDir: true,
  framework: 'docusaurus',
  metadataDir: './docs-metadata',
  exampleFiles: ['./graphql/examples/**/*.json'],
  schemaExtensions: ['./graphql/framework-stubs.graphql'],
  sidebarFile:
    '/Users/austinzani/GitHub/PayTheory/Static Apps/pay-theory-documentation/sidebars.js',
  sidebarMerge: true,
  sidebarTarget: 'apiSidebar',
  sidebarInsertPosition: 'replace',
  introDocs: [
    {
      source: './graphql/intro_docs/main.md',
      outputPath: 'intro/main.mdx',
    },
    {
      source: './graphql/intro_docs/query.md',
      outputPath: 'intro/query.mdx',
    },
  ],
  agentSkill: {
    enabled: true,
    name: 'pay-theory-api-skill',
    includeExamples: true,
    introDoc: {
      enabled: true,
      outputPath: 'intro/ai-agent-skill.mdx',
      label: 'AI Agent Skill',
      title: 'AI Agent Skill',
    },
  },
  llmDocs: {
    outputDir: './static/llm-docs',
  },
  typeExpansion: {
    maxDepth: 5,
    defaultLevels: 0,
  },
};
