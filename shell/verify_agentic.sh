#!/usr/bin/env bash
# Post-deploy smoke test for the agent-facing behavior of the docs site.
# Usage: bash shell/verify_agentic.sh [https://docs.paytheory.com]
set -uo pipefail

BASE_URL=${1:-https://docs.paytheory.com}
BASE_URL=${BASE_URL%/}
FAILURES=0

# Prints "<status>\t<content-type>\t<vary>\t<location>" for the final response.
probe() {
  local url=$1
  shift
  curl -sS -o /dev/null --max-time 20 "$@" \
    -w '%{http_code}\t%{content_type}\t%header{vary}\t%{redirect_url}' "$url"
}

body() {
  local url=$1
  shift
  curl -sS --max-time 20 "$@" "$url"
}

check() {
  local label=$1
  local actual=$2
  local pattern=$3
  if [[ "$actual" =~ $pattern ]]; then
    echo "ok   $label"
  else
    echo "FAIL $label"
    echo "     expected /$pattern/, got: ${actual:0:200}"
    FAILURES=$((FAILURES + 1))
  fi
}

MD=(-H 'Accept: text/markdown')
HTML=(-H 'Accept: text/html')
MISSING_PATH="/agent-check-$(date +%s)-missing"

echo "Verifying ${BASE_URL}"

check 'homepage HTML' "$(probe "${BASE_URL}/" "${HTML[@]}")" $'^200\ttext/html'
check 'homepage Markdown + Vary: Accept' \
  "$(probe "${BASE_URL}/" "${MD[@]}")" $'^200\ttext/markdown[^\t]*\t[^\t]*[Aa]ccept'
check 'homepage Markdown body' "$(body "${BASE_URL}/" "${MD[@]}" | head -1)" '^# Pay Theory'

check 'docs page HTML has its own title' \
  "$(body "${BASE_URL}/docs/main/getting_started/quickstart" "${HTML[@]}" | grep -o '<title[^<]*</title>')" \
  'Quickstart'
check 'docs page Markdown' \
  "$(probe "${BASE_URL}/docs/main/getting_started/quickstart" "${MD[@]}")" $'^200\ttext/markdown'

check 'unknown path HTML is a 404' \
  "$(probe "${BASE_URL}${MISSING_PATH}" "${HTML[@]}")" $'^404\ttext/html'
check 'unknown path Markdown is a 404' \
  "$(probe "${BASE_URL}${MISSING_PATH}" "${MD[@]}")" $'^404\ttext/markdown'
check 'unknown path Markdown body points to llms.txt' \
  "$(body "${BASE_URL}${MISSING_PATH}" "${MD[@]}" | tr '\n' ' ')" '^# Page not found.*llms\.txt'

check '/privacy redirects' "$(probe "${BASE_URL}/privacy")" $'^301\t.*\thttps://www\\.paytheory\\.com/privacy-policy$'
check '/developers redirects' "$(probe "${BASE_URL}/developers")" $'^301\t.*/docs/main/getting_started/quickstart$'

check 'llms.txt' "$(probe "${BASE_URL}/llms.txt")" $'^200\ttext/plain'
check 'llms.txt has when-to-use guidance' \
  "$(body "${BASE_URL}/llms.txt")" 'When to use Pay Theory'
check 'GraphQL schema served as text' \
  "$(probe "${BASE_URL}/llm-docs/schema.graphql")" $'^200\ttext/plain'
SCHEMA_SDL=$(body "${BASE_URL}/llm-docs/schema.graphql")
check 'GraphQL schema is SDL' "$(grep -c '^type Query' <<<"${SCHEMA_SDL}")" '^1$'
check 'GraphQL schema has no internal directives' \
  "$(grep -c '@aws_\|@docIgnore' <<<"${SCHEMA_SDL}")" '^0$'
check 'sitemap.xml' "$(probe "${BASE_URL}/sitemap.xml")" $'^200\t'
check 'robots.txt' "$(probe "${BASE_URL}/robots.txt")" $'^200\t'
check 'homepage JSON-LD' "$(body "${BASE_URL}/" "${HTML[@]}" | grep -c 'application/ld+json')" '^[1-9]'

echo
if [[ ${FAILURES} -gt 0 ]]; then
  echo "${FAILURES} check(s) failed"
  exit 1
fi
echo 'All checks passed'
