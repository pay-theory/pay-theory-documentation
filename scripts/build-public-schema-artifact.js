/* eslint-disable @typescript-eslint/no-require-imports */
// Publishes the filtered GraphQL SDL at /llm-docs/schema.graphql. Runs from the
// `postbuild` npm script before build-agent-docs-artifacts.js links to it.

const fs = require('node:fs');
const path = require('node:path');
const {
  LLM_DOCS_DIRNAME,
  PUBLIC_SCHEMA_FILENAME,
} = require('../edge/markdown-redirect/constants');
const { buildPublicSchema } = require('./lib/public-schema');
const graphqlDocsConfig = require('../graphql-docs.config.js');

const SITE_DIR = process.cwd();
const OUTPUT_PATH = path.join(
  SITE_DIR,
  'build',
  LLM_DOCS_DIRNAME,
  PUBLIC_SCHEMA_FILENAME,
);

const mainTarget = graphqlDocsConfig.targets.find(
  target => target.name === 'main',
);
const sourcePaths = [
  ...(graphqlDocsConfig.schemaExtensions || []),
  mainTarget.schema,
].map(sourcePath => path.resolve(SITE_DIR, sourcePath));

const schema = buildPublicSchema(
  sourcePaths.map(sourcePath => fs.readFileSync(sourcePath, 'utf8')),
);

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, schema);

console.log(
  `[public-schema] Wrote ${path.relative(SITE_DIR, OUTPUT_PATH)} from ${sourcePaths
    .map(sourcePath => path.relative(SITE_DIR, sourcePath))
    .join(' + ')}`,
);
