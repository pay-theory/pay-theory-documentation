# Version Comparison Command

## Purpose
This command performs a deep comparison between the production documentation (`docs/`) and the lab/preview version (`versioned_docs/version-lab/`) to identify differences that need review.

## What it does
1. Scans all markdown files (`.md`, `.mdx`) and `_category_.json` files in both directories
2. **Normalizes formatting** before comparison to eliminate false positives from spacing/formatting differences:
   - Removes trailing whitespace
   - Normalizes line endings
   - Standardizes table formatting
   - Reduces multiple blank lines
3. Identifies files that exist only in production or only in lab
4. Compares content of files that exist in both locations (after formatting normalization)
5. Provides detailed analysis of differences including:
   - Line count differences
   - Size differences
   - First line where differences occur
   - Preview of modified sections

## How to use this command

Run the comparison tool using Node.js:
```bash
node .claude/commands/tools/version-comparison-tool.js
```

## Understanding the output

The tool provides a comprehensive report with:

### Formatting Normalization
- Files are automatically normalized before comparison
- This eliminates false positives from:
  - Trailing whitespace differences
  - Line ending variations (CRLF vs LF)
  - Table spacing inconsistencies
  - Multiple blank line differences
- Only actual content changes are reported

### Summary Statistics
- Total files in each version
- Count of unique files in each version
- Number of files with differences
- Number of identical files

### Detailed Sections

1. **Files Only in Production** - Files that exist in `docs/` but not in `versioned_docs/version-lab/`
   - These may need to be added to the lab version
   - Shown with green `+` indicators

2. **Files Only in Lab** - Files that exist in `versioned_docs/version-lab/` but not in `docs/`
   - These are preview features that may need to be promoted to production
   - Shown with yellow `+` indicators

3. **Files with Content Differences** - Files that exist in both but have different content
   - Shows line count and size differences
   - Indicates first line where differences occur
   - Provides preview of modified sections
   - Limited to first 3 sections for readability

### Recommendations
The tool provides actionable recommendations based on findings:
- Review unique files for inclusion/promotion decisions
- Use diff tools for detailed content comparison
- Ensure intentional changes are preserved

## Example workflow

1. Run the comparison tool
2. Review files only in production - decide if they should be in lab
3. Review files only in lab - decide if they're ready for production
4. For files with differences:
   - Use `diff docs/path/to/file.md versioned_docs/version-lab/path/to/file.md` for detailed comparison
   - Determine if differences are intentional
   - Update as needed to maintain consistency

## Key files to watch

Common areas where differences occur:
- API documentation updates
- New features in lab that haven't been promoted
- Testing documentation variations
- SDK-specific changes
- Wallet transaction implementations (Apple Pay, Google Pay)