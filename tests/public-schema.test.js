/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildASTSchema, parse } = require('graphql');
const { buildPublicSchema } = require('../scripts/lib/public-schema');

const SITE_DIR = path.resolve(__dirname, '..');

const fixture = [
  'directive @aws_iam on FIELD_DEFINITION | OBJECT',
  'directive @docIgnore on FIELD_DEFINITION | OBJECT',
  'directive @docGroup(name: String!) on FIELD_DEFINITION',
  'scalar AWSDateTime',
  'type Query @aws_iam {',
  '  visible: Item @docGroup(name: "Items")',
  '  hidden: Secret @docIgnore',
  '  old: String @deprecated(reason: "Use visible")',
  '}',
  'type Item @aws_iam { id: ID! created: AWSDateTime }',
  'type Secret { value: String }',
  'schema { query: Query }',
].join('\n');

test('strips @docIgnore fields and @aws_* directives, keeps doc metadata', () => {
  const sdl = buildPublicSchema([fixture]);
  assert.doesNotMatch(sdl, /hidden/);
  assert.doesNotMatch(sdl, /@aws_/);
  assert.doesNotMatch(sdl, /docIgnore/);
  assert.match(sdl, /visible: Item @docGroup\(name: "Items"\)/);
  assert.match(sdl, /@deprecated\(reason: "Use visible"\)/);
  assert.match(sdl, /^# Pay Theory GraphQL API schema/);
  buildASTSchema(parse(sdl));
});

test('the real schema produces valid public SDL', () => {
  const config = require('../graphql-docs.config.js');
  const mainTarget = config.targets.find(target => target.name === 'main');
  const sources = [...config.schemaExtensions, mainTarget.schema].map(
    sourcePath => fs.readFileSync(path.resolve(SITE_DIR, sourcePath), 'utf8'),
  );
  const internalSchema = sources.join('\n');
  const ignoredFields = [
    ...internalSchema.matchAll(/^\s+(\w+)(?:\([^)]*\))?:[^\n]*@docIgnore/gm),
  ].map(match => match[1]);

  assert.ok(ignoredFields.length > 0);

  const sdl = buildPublicSchema(sources);
  const schema = buildASTSchema(parse(sdl));

  assert.doesNotMatch(sdl, /@aws_|@docIgnore/);
  const rootFields = {
    ...schema.getQueryType().getFields(),
    ...schema.getMutationType().getFields(),
  };
  assert.ok(Object.keys(rootFields).length > 50);
  for (const field of ignoredFields) {
    assert.equal(rootFields[field], undefined, `${field} should be hidden`);
  }
});
