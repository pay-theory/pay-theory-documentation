#!/usr/bin/env bash

set -euo pipefail

STAGE=${1:-}
if [[ -z "${STAGE}" ]]; then
  echo "Usage: $0 <stage> [docs-domain]"
  exit 1
fi

DOCS_DOMAIN=${2:-${DOCS_DOMAIN:-docs.${STAGE}.com}}
BASE_URL="https://${DOCS_DOMAIN}"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "${TMP_DIR}"' EXIT

run_check() {
  local name=$1
  local path=$2
  local expected_status=$3
  local response_type=$4
  local header_name=${5:-}
  local header_value=${6:-}

  local body_file="${TMP_DIR}/${name}.body"
  local status

  if [[ -n "${header_name}" ]]; then
    status=$(curl -sS -o "${body_file}" -w '%{http_code}' \
      --connect-timeout 10 --max-time 30 --retry 5 --retry-delay 5 --retry-connrefused \
      -H "${header_name}: ${header_value}" \
      "${BASE_URL}${path}")
  else
    status=$(curl -sS -o "${body_file}" -w '%{http_code}' \
      --connect-timeout 10 --max-time 30 --retry 5 --retry-delay 5 --retry-connrefused \
      "${BASE_URL}${path}")
  fi

  if [[ "${status}" != "${expected_status}" ]]; then
    echo "[markdown-smoke] ${name}: expected status ${expected_status}, got ${status}"
    echo "[markdown-smoke] URL: ${BASE_URL}${path}"
    exit 1
  fi

  if [[ "${response_type}" == "non-html" ]] && grep -Eqi '<!doctype html|<html' "${body_file}"; then
    echo "[markdown-smoke] ${name}: expected non-HTML response but HTML content was detected"
    echo "[markdown-smoke] URL: ${BASE_URL}${path}"
    exit 1
  fi

  if [[ "${response_type}" == "html" ]] && ! grep -Eqi '<!doctype html|<html' "${body_file}"; then
    echo "[markdown-smoke] ${name}: expected HTML response but none was detected"
    echo "[markdown-smoke] URL: ${BASE_URL}${path}"
    exit 1
  fi

  echo "[markdown-smoke] ${name}: passed"
}

echo "[markdown-smoke] Running checks against ${BASE_URL}"

run_check \
  "markdown-api" \
  "/docs/api/transaction/create-transaction" \
  "200" \
  "non-html" \
  "Accept" \
  "text/markdown"

run_check \
  "markdown-non-api" \
  "/docs/main/after_payments/failed_transactions" \
  "200" \
  "non-html" \
  "x-format" \
  "md"

run_check \
  "browser-html" \
  "/docs/api/transaction/create-transaction" \
  "200" \
  "html"

run_check \
  "missing-markdown" \
  "/docs/api/non-existent-markdown-operation" \
  "404" \
  "non-html" \
  "Accept" \
  "text/markdown"

echo "[markdown-smoke] All markdown redirect smoke checks passed"
