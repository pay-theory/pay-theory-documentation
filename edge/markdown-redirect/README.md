# Markdown Redirect Edge Function

This Lambda@Edge function routes documentation requests at the edge. One
published version is associated with two CloudFront events:

- `viewer-request` (before cache lookup): rewrites page requests to Markdown
  objects when the caller asks for Markdown, rewrites pretty URLs to their
  `index.html` object, answers unknown routes with a real 404, and redirects
  trust/portal paths. HTML and Markdown cache as separate S3 objects.
- `origin-response` (on cache miss): adds `Vary: Accept` to HTML and Markdown
  responses and serves `.graphql` files as `text/plain`.

CloudFront does not allow CloudFront Functions on viewer events alongside a
Lambda@Edge viewer trigger, so all edge logic lives in this one function.

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

## Route Behavior

Packaging replaces `manifest.js` with the route map generated at
`build/llm-docs/markdown-routes-manifest.json`. `routes` maps docs routes to
Markdown; `htmlRoutes` lists every route with a built `index.html`.

- `/about`, `/contact`, `/privacy`, and `/developers` return a 301 (see
  `REDIRECTS` in `constants.js`).
- With a Markdown request, `/` rewrites to `/llm-docs/home.md` (a copy of
  `llms.txt`), API operation routes rewrite to generated `/llm-docs/**`
  Markdown, and other docs rewrite to `/llm-docs/source/**`.
- Pages without a Markdown twin, and all HTML requests, rewrite to
  `<route>/index.html`.
- Extensionless routes missing from `htmlRoutes` return a generated Markdown
  404 when Markdown was requested. HTML requests miss in S3 and CloudFront
  serves `/404.html` with status 404 (`CustomErrorResponses` in
  `templates/formation.yml`).
- Static assets, `/llms.txt`, and `/llm-docs/**` pass through.
- A manifest without `htmlRoutes` (the local fallback) disables 404 detection.

Page rewrites change `request.uri`; only the trust/portal paths redirect the
browser.

## Runtime Contract

- `npm run build` writes `build/llm-docs/markdown-routes-manifest.json` and
  source fallback files under `build/llm-docs/source/**`.
- `shell/package_markdown_edge_lambda.sh` embeds that manifest into
  `manifest.js` inside the Lambda zip.
- `templates/distribution.yml` publishes a numbered Lambda version in
  `us-east-1`; CloudFront cannot use `$LATEST` for Lambda@Edge.
- `templates/formation.yml` associates that published version on
  `viewer-request` and `origin-response`, and switches the custom error
  responses from the SPA fallback to `/404.html` only when the version ARN is
  present.

## Tests

`npm test` runs the handler unit tests in `tests/edge-markdown-redirect.test.js`.
After a deploy, run `bash shell/verify_agentic.sh https://<docs host>` to check
the live behavior.

## Local Smoke Test

After `npm run build`, package the Lambda artifact and inspect the generated
manifest copy:

```bash
bash shell/package_markdown_edge_lambda.sh pay-theory-documentation
```

You can also import `rewriteRequest` from `index.js` and pass a test manifest
object without invoking AWS.
