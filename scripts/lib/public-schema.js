/* eslint-disable @typescript-eslint/no-require-imports */
// Turns the internal AppSync schema into the SDL published for agents:
// - drops every definition marked @docIgnore (hidden from the docs on purpose)
// - drops @aws_* directives, which describe internal AppSync auth modes
// Types stay, matching the type pages the docs site already publishes. The
// result is standalone SDL that any GraphQL parser accepts.

const { Kind, buildASTSchema, parse, print, visit } = require('graphql');

const HIDDEN_DIRECTIVE = 'docIgnore';
const INTERNAL_DIRECTIVE_PREFIX = 'aws_';

const PUBLIC_SCHEMA_HEADER = [
  '# Pay Theory GraphQL API schema (public operations).',
  '# Generated from the documented schema at build time. Do not edit.',
  '# Reference docs: https://docs.paytheory.com/docs/api',
  '',
].join('\n');

const hasDirective = (node, name) =>
  (node.directives || []).some(directive => directive.name.value === name);

const isInternalDirectiveName = name =>
  name === HIDDEN_DIRECTIVE || name.startsWith(INTERNAL_DIRECTIVE_PREFIX);

const stripHiddenAndInternal = document =>
  visit(document, {
    enter(node) {
      if (node.kind === Kind.DIRECTIVE) {
        return isInternalDirectiveName(node.name.value) ? null : undefined;
      }
      if (node.kind === Kind.DIRECTIVE_DEFINITION) {
        return isInternalDirectiveName(node.name.value) ? null : undefined;
      }
      return hasDirective(node, HIDDEN_DIRECTIVE) ? null : undefined;
    },
  });

/**
 * @param {string[]} sources SDL sources, e.g. framework stubs then the schema.
 * @returns {string} Public SDL.
 */
const buildPublicSchema = sources => {
  const document = stripHiddenAndInternal(
    parse(sources.join('\n'), { noLocation: true }),
  );

  // Fails loudly if stripping ever leaves an invalid schema behind.
  buildASTSchema(document);
  return `${PUBLIC_SCHEMA_HEADER}\n${print(document)}\n`;
};

module.exports = {
  buildPublicSchema,
};
