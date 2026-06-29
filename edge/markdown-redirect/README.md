# Markdown Redirect Edge Function

This Lambda@Edge function rewrites documentation page requests to Markdown
objects when the caller explicitly asks for Markdown. It runs at
`viewer-request`, before CloudFront cache lookup, so HTML and Markdown cache as
separate S3 objects.

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
`build/llm-docs/markdown-routes-manifest.json`.

- API operation routes rewrite to generated `/llm-docs/**` Markdown from
  `static/llm-docs` and `static/llm-docs/lab`.
- Non-API docs rewrite to exported source files under `/llm-docs/source/**`.
- Unknown routes, static assets, `/llms.txt`, and `/llm-docs/**` pass through.

The handler rewrites `request.uri`; it does not redirect the browser.

## Runtime Contract

- `npm run build` writes `build/llm-docs/markdown-routes-manifest.json` and
  source fallback files under `build/llm-docs/source/**`.
- `shell/package_markdown_edge_lambda.sh` embeds that manifest into
  `manifest.js` inside the Lambda zip.
- `templates/distribution.yml` publishes a numbered Lambda version in
  `us-east-1`; CloudFront cannot use `$LATEST` for Lambda@Edge.
- `templates/formation.yml` associates that published version on
  `viewer-request`, before CloudFront cache lookup.

## Local Smoke Test

After `npm run build`, package the Lambda artifact and inspect the generated
manifest copy:

```bash
bash shell/package_markdown_edge_lambda.sh pay-theory-documentation
```

You can also import `rewriteRequest` from `index.js` and pass a test manifest
object without invoking AWS.
