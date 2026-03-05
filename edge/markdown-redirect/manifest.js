'use strict';

const fs = require('node:fs');
const path = require('node:path');

const MANIFEST_FILENAME = 'markdown-routes-manifest.json';
const MANIFEST_PATH = path.join(__dirname, MANIFEST_FILENAME);

let manifestCache;
let manifestLoadError;

function normalizeRoute(route) {
  if (!route || route === '/') {
    return '/';
  }
  const [pathname] = String(route).split('?');
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

/**
 * Load and memoize route manifest from the Lambda package.
 * If the manifest is unavailable we intentionally fail soft and let requests
 * pass through as HTML.
 */
function loadManifest() {
  if (manifestCache) {
    return manifestCache;
  }
  if (manifestLoadError) {
    throw manifestLoadError;
  }

  try {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    manifestCache = {
      graphqlRoutes: parsed?.graphqlRoutes ?? {},
      nonApiRoutes: parsed?.nonApiRoutes ?? {},
    };
    return manifestCache;
  } catch (error) {
    manifestLoadError = error;
    throw error;
  }
}

function resolveTargetFromManifest(requestUri) {
  const routeKey = normalizeRoute(requestUri);
  const manifest = loadManifest();
  return manifest.graphqlRoutes[routeKey] || manifest.nonApiRoutes[routeKey];
}

module.exports = {
  MANIFEST_FILENAME,
  MANIFEST_PATH,
  normalizeRoute,
  resolveTargetFromManifest,
};
