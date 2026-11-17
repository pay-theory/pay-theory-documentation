/* eslint-disable @typescript-eslint/no-require-imports */
// Syncs the build's route manifest into the CloudFront KeyValueStore that the
// edge function reads. Run after the site is uploaded to S3, so every route the
// store lists already has its objects.
//
// Usage: node scripts/sync-edge-routes.js <kvs-arn> [manifest-path]
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const {
  MARKDOWN_ROUTES_MANIFEST_BUILD_PATH,
} = require('../edge/markdown-redirect/constants');
const {
  buildRouteEntries,
  chunk,
  planRouteSync,
} = require('./lib/edge-routes');

const [, , kvsArn, manifestPath = MARKDOWN_ROUTES_MANIFEST_BUILD_PATH] =
  process.argv;

if (!kvsArn || !kvsArn.startsWith('arn:aws:cloudfront::')) {
  console.error('Usage: node scripts/sync-edge-routes.js <kvs-arn> [manifest]');
  process.exit(1);
}

// The KeyValueStore API signs with SigV4A, which the AWS CLI v2 supports.
const kvsCli = (command, args = []) => {
  const output = execFileSync(
    'aws',
    [
      'cloudfront-keyvaluestore',
      command,
      '--kvs-arn',
      kvsArn,
      ...args,
      '--region',
      'us-east-1',
      '--output',
      'json',
    ],
    { encoding: 'utf8', env: { ...process.env, AWS_PAGER: '' } },
  );
  return output.trim() ? JSON.parse(output) : {};
};

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const desired = buildRouteEntries(manifest);

// The CLI follows NextToken and returns every key.
const current = {};
for (const item of kvsCli('list-keys').Items || []) {
  current[item.Key] = item.Value;
}

const { puts, deletes } = planRouteSync(desired, current);
console.log(
  `[edge-routes] ${Object.keys(desired).length} routes: ${puts.length} to put, ${deletes.length} to delete`,
);

let etag = kvsCli('describe-key-value-store').ETag;
const batches = [
  ...chunk(puts).map(batch => ['--puts', JSON.stringify(batch)]),
  ...chunk(deletes).map(batch => ['--deletes', JSON.stringify(batch)]),
];
for (const batch of batches) {
  etag = kvsCli('update-keys', ['--if-match', etag, ...batch]).ETag;
}

console.log('[edge-routes] Key value store is up to date');
