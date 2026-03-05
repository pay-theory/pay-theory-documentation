#!/usr/bin/env bash

set -euo pipefail

ARTIFACT_BUCKET=${1:-}
ARTIFACT_KEY=${2:-}

if [[ -z "${ARTIFACT_BUCKET}" || -z "${ARTIFACT_KEY}" ]]; then
  echo "Usage: $0 <artifact-bucket> <artifact-key>"
  exit 1
fi

LAMBDA_SOURCE_DIR="edge/markdown-redirect"
MANIFEST_SOURCE_PATH="build/llm-docs/markdown-routes-manifest.json"

for required_file in \
  "${LAMBDA_SOURCE_DIR}/index.js" \
  "${LAMBDA_SOURCE_DIR}/constants.js" \
  "${LAMBDA_SOURCE_DIR}/path-config.cjs" \
  "${LAMBDA_SOURCE_DIR}/manifest.js" \
  "${MANIFEST_SOURCE_PATH}"
do
  if [[ ! -f "${required_file}" ]]; then
    echo "Required file missing for Lambda package: ${required_file}"
    exit 1
  fi
done

TMP_DIR=$(mktemp -d)
ARTIFACT_NAME=$(basename "${ARTIFACT_KEY}")
ARTIFACT_PATH="${TMP_DIR}/${ARTIFACT_NAME}"

cp "${LAMBDA_SOURCE_DIR}/index.js" "${TMP_DIR}/index.js"
cp "${LAMBDA_SOURCE_DIR}/constants.js" "${TMP_DIR}/constants.js"
cp "${LAMBDA_SOURCE_DIR}/path-config.cjs" "${TMP_DIR}/path-config.cjs"
cp "${LAMBDA_SOURCE_DIR}/manifest.js" "${TMP_DIR}/manifest.js"
cp "${MANIFEST_SOURCE_PATH}" "${TMP_DIR}/markdown-routes-manifest.json"

(
  cd "${TMP_DIR}"
  zip -q "${ARTIFACT_PATH}" \
    index.js \
    constants.js \
    path-config.cjs \
    manifest.js \
    markdown-routes-manifest.json
)

echo "Uploading markdown Lambda artifact to s3://${ARTIFACT_BUCKET}/${ARTIFACT_KEY}"
aws s3 cp "${ARTIFACT_PATH}" "s3://${ARTIFACT_BUCKET}/${ARTIFACT_KEY}"

rm -rf "${TMP_DIR}"
