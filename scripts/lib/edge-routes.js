// Turns the build's route manifest into CloudFront KeyValueStore entries and
// plans the update. The edge function (edge/markdown-redirect/function.js)
// reads these entries on Markdown requests.

// Value for a route that has an HTML page but no Markdown twin.
const HTML_ONLY = 'html';

// KeyValueStore quotas.
const MAX_KEY_BYTES = 512;
const MAX_VALUE_BYTES = 1024;
const MAX_KEYS_PER_UPDATE = 50;

const buildRouteEntries = manifest => {
  if (
    !manifest ||
    !Array.isArray(manifest.htmlRoutes) ||
    manifest.htmlRoutes.length === 0
  ) {
    // An empty list would delete every key and turn every Markdown request
    // into a 404.
    throw new Error('Route manifest has no htmlRoutes; refusing to sync.');
  }

  const entries = {};
  for (const route of manifest.htmlRoutes) {
    entries[route] = HTML_ONLY;
  }
  for (const [route, target] of Object.entries(manifest.routes || {})) {
    entries[route] = target;
  }

  for (const [key, value] of Object.entries(entries)) {
    if (Buffer.byteLength(key) > MAX_KEY_BYTES) {
      throw new Error(`Route is longer than ${MAX_KEY_BYTES} bytes: ${key}`);
    }
    if (Buffer.byteLength(value) > MAX_VALUE_BYTES) {
      throw new Error(
        `Value for ${key} is longer than ${MAX_VALUE_BYTES} bytes`,
      );
    }
  }
  return entries;
};

// Puts come before deletes so a route never disappears mid-sync.
const planRouteSync = (desired, current) => {
  const puts = Object.keys(desired)
    .filter(key => current[key] !== desired[key])
    .sort()
    .map(key => ({ Key: key, Value: desired[key] }));
  const deletes = Object.keys(current)
    .filter(key => !Object.prototype.hasOwnProperty.call(desired, key))
    .sort()
    .map(key => ({ Key: key }));
  return { puts, deletes };
};

const chunk = (items, size = MAX_KEYS_PER_UPDATE) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
};

module.exports = {
  HTML_ONLY,
  MAX_KEYS_PER_UPDATE,
  buildRouteEntries,
  chunk,
  planRouteSync,
};
