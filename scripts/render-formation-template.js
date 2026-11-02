/* eslint-disable @typescript-eslint/no-require-imports */
// CloudFormation has no way to read a CloudFront Function's code from a file,
// so this inlines edge/markdown-redirect/function.js into formation.yml.
//
// Usage: node scripts/render-formation-template.js <output-path>
const fs = require('node:fs');
const path = require('node:path');

const SITE_DIR = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(SITE_DIR, 'templates', 'formation.yml');
const FUNCTION_PATH = path.join(
  SITE_DIR,
  'edge',
  'markdown-redirect',
  'function.js',
);
const PLACEHOLDER = /^( *)FunctionCode: EDGE_FUNCTION_CODE$/m;

// CloudFront Functions reject code over 10 KB.
const MAX_FUNCTION_BYTES = 10 * 1024;

const renderFormationTemplate = (
  template = fs.readFileSync(TEMPLATE_PATH, 'utf8'),
  code = fs.readFileSync(FUNCTION_PATH, 'utf8'),
) => {
  if (Buffer.byteLength(code) > MAX_FUNCTION_BYTES) {
    throw new Error(
      `Edge function is ${Buffer.byteLength(code)} bytes; the limit is ${MAX_FUNCTION_BYTES}.`,
    );
  }
  if (/\t/.test(code)) {
    throw new Error(
      'Edge function contains tabs, which YAML block scalars reject.',
    );
  }
  const match = template.match(PLACEHOLDER);
  if (!match) {
    throw new Error(
      'formation.yml has no `FunctionCode: EDGE_FUNCTION_CODE` line.',
    );
  }
  const indent = `${match[1]}  `;
  const block = code
    .replace(/\n+$/, '')
    .split('\n')
    .map(line => (line ? `${indent}${line}` : ''))
    .join('\n');
  return template.replace(
    PLACEHOLDER,
    () => `${match[1]}FunctionCode: |\n${block}`,
  );
};

if (require.main === module) {
  const [, , outputPath] = process.argv;
  if (!outputPath) {
    console.error(
      'Usage: node scripts/render-formation-template.js <output-path>',
    );
    process.exit(1);
  }
  fs.writeFileSync(outputPath, renderFormationTemplate());
  console.log(outputPath);
}

module.exports = { MAX_FUNCTION_BYTES, renderFormationTemplate };
