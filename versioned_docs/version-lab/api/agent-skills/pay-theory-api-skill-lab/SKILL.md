---
name: pay-theory-api-skill-lab
description: Use generated GraphQL docs JSON for PayTheory Lab to discover operations and fetch schema details with examples.
---

# pay-theory-api-skill-lab

Use this skill to query generated GraphQL docs JSON in two steps:
1. List operations with short descriptions.
2. Fetch one operation with full argument/type details and examples.

## Workflow

1. Resolve `SKILL_DIR` as the directory that contains this `SKILL.md`.
2. Run `python3 <SKILL_DIR>/scripts/graphql_docs_skill.py list-operations --docs-root <docs-output-dir>` to shortlist operations.
3. Run `python3 <SKILL_DIR>/scripts/graphql_docs_skill.py get-operation <operation-name> --docs-root <docs-output-dir>` for full details.

If docs are packaged in `<SKILL_DIR>/_data`, `--docs-root` is optional.

## Commands

- `python3 <SKILL_DIR>/scripts/graphql_docs_skill.py list-operations --docs-root <docs-output-dir>`
- `python3 <SKILL_DIR>/scripts/graphql_docs_skill.py get-operation <operation-name> --docs-root <docs-output-dir>`

- Examples are included by default in `get-operation` output.

## Output Contract

- `list-operations`: JSON array with `name`, `operationType`, `description`, `docGroup`, `hasExamples`.
- `get-operation`: JSON object with `operation` and `relatedTypes`.

## Operation Preview

- `authorizations` (`query`): This query will return a list of authorizations for a merchant.
- `createAuthorization` (`mutation`): This mutation will create a new authorization for a merchant.
- `createWalletAuthorization` (`mutation`): This call is used to create an authorization for a wallet payment via Apple Pay or Google Pay.
- `createCapture` (`mutation`): This mutation will capture an authorization for a merchant.
- `createVoidForAuthorization` (`mutation`): This will void an authorization that has not been captured.
- `barcode` (`query`): This can be used to call back a single barcode.
- `createBarcode` (`mutation`): This mutation will create a barcode for a payor to use to make a cash payment.
- `disputes` (`query`): Returns disputes.
- ...
