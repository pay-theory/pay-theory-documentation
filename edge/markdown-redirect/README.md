# Docs Edge Router

`function.js` is a CloudFront Function (`cloudfront-js-2.0`) that routes
documentation requests at the edge. It's associated with two CloudFront events:

- `viewer-request` (before cache lookup): rewrites page requests to Markdown
  objects when the caller asks for Markdown, rewrites pretty URLs to their
  `index.html` object, answers unknown routes with a real 404, and redirects
  trust/portal paths. HTML and Markdown cache as separate S3 objects.
- `viewer-response`: adds `Vary: Accept` to HTML and Markdown responses.

The route list lives in a CloudFront KeyValueStore, not in the code, so new
pages don't change the function. See `adr/0002-edge-routing-in-a-cloudfront-function.md`.

## Request Detection

The function mirrors the `@lewl/graphql-doc` Docusaurus plugin defaults:

- `Accept: text/markdown`
- `Accept: text/x-markdown`
- `x-accept-markdown: 1|true|markdown|md|text/markdown`
- `x-doc-format: 1|true|markdown|md|text/markdown`
- `x-format: 1|true|markdown|md|text/markdown`
- `x-response-format: 1|true|markdown|md|text/markdown`
- `x-return-format: 1|true|markdown|md|text/markdown`

Only `GET` and `HEAD` requests are eligible.

## Route Store

`npm run build` writes `build/llm-docs/markdown-routes-manifest.json`.
`scripts/sync-edge-routes.js` turns it into one key per route:

| Key | Value |
|-----|-------|
| `/docs/main/getting_started/quickstart` | `/llm-docs/source/docs/main/getting_started/quickstart.md` |
| `/docs/api/transaction/create-transaction` | `/llm-docs/transaction/create-transaction.md` |
| `/docs/api/types/enums/card-type` | `html` (page has no Markdown twin) |

Keys have no trailing slash; the homepage is `/`.

## Route Behavior

- `/about`, `/contact`, `/privacy`, and `/developers` return a 301 (see
  `REDIRECTS` in `function.js`).
- With a Markdown request, routes whose value is a `/llm-docs/**` path
  rewrite to it. `/` rewrites to `/llm-docs/home.md` (a copy of `llms.txt`).
- Routes stored as `html`, and all HTML requests, rewrite to
  `<route>/index.html`. HTML requests never read the store.
- Extensionless routes missing from the store return a generated Markdown 404
  when Markdown was requested. HTML requests miss in S3 and CloudFront serves
  `/404.html` with status 404 (`CustomErrorResponses` in
  `templates/formation.yml`).
- If the store can't be read, Markdown requests get the HTML page instead of a
  404.
- Static assets, `/llms.txt`, and `/llm-docs/**` pass through.

## Runtime Contract

- The runtime is ES 5.1 plus a few later features. There's no `require`,
  `Set`, `Map`, spread, `for...of` or optional chaining, and the code must
  stay under 10 KB. `tests/edge-router.test.js` checks for these.
- `templates/distribution.yml` creates the KeyValueStore and stores its ARN in
  SSM.
- `shell/02_deploy.sh` uploads the site to S3 (`.graphql` files as
  `text/plain`), syncs the store, then deploys `templates/formation.yml` with
  this file inlined by `scripts/render-formation-template.js`.
- `AutoPublish` publishes code changes in place. CloudFront keeps the same
  function ARN, so a code change doesn't redeploy the distribution.

## Tests

`npm test` runs `function.js` in a Node sandbox with a fake store
(`tests/edge-router.test.js`). After a deploy, run
`bash shell/verify_agentic.sh https://<docs host>` to check the live behavior.

To try the function in the real runtime before deploying, create it in the
`DEVELOPMENT` stage and run `aws cloudfront test-function` against it.
