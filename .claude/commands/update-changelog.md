# Update Changelog Command

## When to use this command
Use this command to automatically detect and document API/SDK changes that need to be added to the changelog.

## Command: `update-changelog`

To update the changelog with recent changes, follow these steps:

### 1. Analyze changes since last changelog entry
```bash
# Get the date of the last changelog entry
LAST_DATE=$(grep -E "^## " versioned_docs/version-lab/main/changelog.mdx | head -1 | sed 's/## //')

# Find all modified API and SDK files since the last changelog update
git log --since="November 20, 2024" --name-only --pretty=format: | grep -E "(versioned_docs/version-lab/(api|sdk))" | sort -u
```

### 2. Review specific file changes
- **API changes**: Check files in `/versioned_docs/version-lab/api/`
- **JavaScript SDK**: Check files in `/versioned_docs/version-lab/sdk/javascript/`
- **Apple SDK**: Check files in `/versioned_docs/version-lab/sdk/apple/`
- **Android SDK**: Check files in `/versioned_docs/version-lab/sdk/android/`

### 3. Look for these types of changes
- New mutations or queries in API files
- New fields added to existing schemas
- New functions or methods in SDK files
- New parameters added to existing functions
- Deprecated fields or functions
- Breaking changes or behavior modifications
- Items marked as deprecated (search for "deprecated", "@deprecated", "DEPRECATED")

### 4. Format changelog entries
```markdown
## [Today's Date in format: Month DD, YYYY]
#### Added to API
* Description of new API feature/field/mutation
* Another API addition

#### Added to JS SDK
* Description of JavaScript SDK addition

#### Added to Apple SDK
* Description of Apple/Swift SDK addition

#### Added to Android SDK  
* Description of Android SDK addition

#### Changed
* Description of breaking changes or modifications

#### Deprecated
* Description of deprecated API fields/mutations/queries
* Description of deprecated SDK functions/methods
```

### 5. Key patterns to detect
- **New GraphQL fields**: Look for additions to type definitions
- **New mutations**: Search for `mutation` additions
- **New queries**: Search for `query` additions
- **SDK functions**: Look for new function definitions
- **Parameter changes**: Compare function signatures
- **Enum additions**: Check for new enum values
- **Deprecations**: Search for "@deprecated", "deprecated:", "DEPRECATED", or deprecation notices in documentation

### 6. Update both changelog files
- Lab version: `/versioned_docs/version-lab/main/changelog.mdx`
- Production version: `/docs/main/changelog.mdx` (after verification)

## Example Usage
When running the changelog update command, analyze:
1. Git diff of API/SDK files since last changelog date
2. Extract meaningful changes (not formatting or documentation updates)
3. Group by category (API, JS SDK, Apple SDK, Android SDK, Changed)
4. Write clear, concise descriptions following existing patterns

## Changelog Entry Guidelines

### Writing Style
- Use clear, concise descriptions
- Start with the action verb (added, removed, deprecated, etc.)
- Include the specific field/function name in backticks
- Explain the purpose or impact when relevant

### Examples of Good Changelog Entries
```markdown
#### Added to API
* `createBatchCapture` mutation added to API. Only works in sandbox environments. Captures all `PENDING` transactions for a merchant in a batch and shortly after creates a settlement for the merchant.
* `metadata` added to Merchant schema
  * Can be passed in when calling `createMerchant`
  * Can be managed with the `updateMetadata` and `deleteMetadata` mutations
  * Can be requested in the `merchant` and `merchants` queries
  * Can be used to filter the `merchants` query

#### Added to JS SDK
* `skipValidation` added to the `tokenizePaymentMethod` function. If set to true, the payment method will be created without validation.
* `country` added to the payTheoryFields function to tell the SDK what fields to look for when initializing the Bank Fields. Defaults to USA but also accepts CAN

#### Changed
* `avs_status` now included in the Authorization and Transaction schema
* All successful transactions from the SDK/API will now have the state/status of `PENDING` instead of the potential of both `PENDING` or `SUCCEEDED`

#### Deprecated
* `createRefund` mutation is deprecated. Recommend using `createReversal` call now
* `void_amount` argument is deprecated in the `createVoidForAuthorization` mutation as only full voids are supported
* `paymentMethodTokenId` field deprecated in favor of `payment_method_id` for consistency
```

## Implementation Steps

1. **Check current changelog date**: The most recent entry is November 20, 2024
2. **Run git commands** to identify changed files
3. **Examine each changed file** for substantive changes
4. **Search for deprecations** using grep:
   ```bash
   grep -r -i "deprecated\|@deprecated" versioned_docs/version-lab/api/
   grep -r -i "deprecated\|@deprecated" versioned_docs/version-lab/sdk/
   ```
5. **Group changes** by category (Added to API, Added to SDKs, Changed, Deprecated)
6. **Write descriptions** following the pattern
7. **Update the lab changelog** first
8. **Copy to production** after review

## Deprecation Detection Tips

- Look for `@deprecated` annotations in GraphQL schemas
- Check for "deprecated" in field descriptions
- Review the `/versioned_docs/version-lab/api/deprecated.md` file for comprehensive list
- Search SDK documentation for deprecated functions or parameters
- Include migration path in deprecation notes (e.g., "Recommend using X instead")