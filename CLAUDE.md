# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Pay Theory documentation website built with Docusaurus 3. The site contains comprehensive documentation for Pay Theory's APIs and SDKs across multiple platforms (JavaScript, Apple iOS, Android).

## Common Commands

### Development
- `npm start` - Start local development server with hot reload
- `npm run build` - Build static site for production
- `npm run serve` - Serve built site locally

### Code Quality
- `npm run lint` - Check TypeScript/JavaScript files for linting errors
- `npm run lint:fix` - Automatically fix linting errors
- `npm run check-ts` - Run TypeScript type checking without emitting files
- `npm run prettier` - Check code formatting
- `npm run prettier:fix` - Automatically fix code formatting

### Docusaurus Commands
- `npm run clear` - Clear Docusaurus cache
- `npm run deploy` - Deploy to GitHub Pages
- `npm run write-translations` - Extract translatable strings
- `npm run write-heading-ids` - Add heading IDs to markdown files

## Project Structure

### Documentation Organization
- `/docs/` - Main documentation content
  - `/api/` - REST API documentation 
  - `/main/` - Core guides (getting started, payments, billing, etc.)
  - `/sdk/` - SDK documentation for JavaScript, Apple, and Android
- `/versioned_docs/` - Version-specific documentation
- `/static/` - Static assets (images, downloads, scripts)

### Key Configuration Files
- `docusaurus.config.js` - Main Docusaurus configuration with site settings, navbar, footer, and Algolia search
- `sidebars.js` - Sidebar navigation structure for different doc sections
- `babel.config.js` - Babel configuration for build process

### Content Structure
The documentation is organized into multiple sidebars:
- `homeSidebar` - Main documentation (getting started, payments, recurring, invoicing)
- `apiSidebar` - REST API reference
- `javascriptSidebar` - JavaScript SDK docs
- `appleSidebar` - Apple iOS SDK docs  
- `androidSidebar` - Android SDK docs

### Versioning
Uses Docusaurus versioning with:
- `current` (Live) - Latest stable documentation
- `lab` - Preview/beta documentation

### Search Integration
Configured with Algolia DocSearch for site-wide search functionality.

## Development Notes

### Code Style
- Uses ESLint with TypeScript support and Prettier for formatting
- Husky pre-commit hooks run linting and formatting on staged files
- TypeScript configuration in `tsconfig.json`

### Content Guidelines
- Documentation uses MDX format for rich content with React components
- Custom components in `/components/` directory
- Styling via CSS modules and custom CSS in `/src/css/`
- Use semantic HTML and proper heading hierarchy for accessibility

### Build Process
- Generates static site deployable to any static hosting service
- Includes sitemap generation and SEO optimizations
- Integrates external scripts for Freshdesk widget and Hotjar analytics

## Documentation Patterns and Style Guide

### File Naming Conventions
- Use lowercase with underscores for directories: `getting_started`, `online_payments`
- Use lowercase with underscores for file names: `quickstart.mdx`, `payment_method_token.md`
- API documentation uses `.md` files, while guides use `.mdx` for rich content
- Each directory must contain a `_category_.json` file for sidebar configuration

### Front Matter Standards
```yaml
---
sidebar_position: 1
sidebar_label: "Short Name"
title: "Full Page Title"
hide_table_of_contents: true  # optional
---
```

### Heading Structure
- H1 (#) - Page title only
- H2 (##) - Major sections (use `***` separator before each)
- H3 (###) - Subsections
- H4 (####) - Minor subsections (rarely used)
- Scroll margin applied to H2 and H3 for better navigation

### Writing Style and Voice
- Clear, instructional tone - direct and concise
- Use present tense for instructions
- Step-by-step format for tutorials (numbered sections)
- Active voice preferred over passive voice
- Brief, scannable paragraphs
- Use "you" to address the reader directly

### Terminology Consistency
- "Pay Theory" (not "PayTheory" in text)
- "payment method token" (not "payment token")
- "SDK" (uppercase)
- "API Key" (capitalized)
- Function names in backticks: `transact`, `tokenizePaymentMethod`
- Use consistent product/feature names throughout

### MDX Components Usage

#### Tabs Component
```jsx
import Tabs from '@site/components/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="javascript"
  groupId="current-os"
  queryString
  values={[
    {label: 'Javascript', value: 'javascript'},
    {label: 'Apple', value: 'apple'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="javascript">
    // Content
  </TabItem>
</Tabs>
```

#### Admonitions
```markdown
:::note Note Title
Content here
:::

:::tip Recommended
Content here
:::

:::danger Before you start
Content here
:::

:::info Additional Information
Content here
:::
```

### Code Block Formatting
- Always specify language: ` ```javascript `, ` ```swift `, ` ```graphql `
- Use `title` attribute for JavaScript: ` ```jsx title="javascript" `
- GraphQL for API schemas and queries
- Consistent indentation (2 spaces)
- Include comments for complex code

### API Documentation Pattern
1. **Object/Schema Definition** (GraphQL code block)
2. **Property Table** with columns: Key | type | description
3. **Enum Definitions** (if applicable)
4. **Query/Mutation Examples**
5. **Parameters Table**
6. **Returns Section**
7. **Usage Notes/Warnings**

### Table Formatting
```markdown
| Key | type | description |
|-----|------|-------------|
| field | String | Field description |
```
- Always include header row
- Use consistent column alignment
- Keep descriptions concise but complete

### Cross-References
- Internal links: `[Link Text](../relative/path)` or `[Link Text](/docs/absolute/path)`
- Object references: `[Object Name](#anchor)`
- External downloads: `<a target="_blank" href={require('/static/file.zip').default} download>`

### Button Links
```html
<a href="../../path/to/doc" class="button button--primary button--md">Button Text</a>
```

### Image Guidelines
- Store in `/static/img/`
- Use descriptive alt text
- Format: `![Alt Text](/img/image-name.jpg)`
- External images from S3 for dynamic content

### SDK Documentation Pattern
1. **Function Signature** (code block)
2. **Parameters Table** (name | type | description)
3. **Returns Documentation**
4. **Usage Examples** (with async/await and callbacks)
5. **Related Notes/Warnings**
6. **Error Handling** (if applicable)

### Custom Styling Classes
- Tables automatically styled with rounded corners and alternating rows
- Code blocks use dark theme with syntax highlighting
- Custom font stack: 'halyard-text' for body, 'halyard-display' for headings
- Purple primary color scheme (#600075)

### Interactive Elements
- Freshworks widget: `<a onClick={() => FreshworksWidget('open')} class="button button--primary button--md">Request a Sandbox</a>`
- Avoid adding interactive elements unless necessary

### Version Documentation
- Current version in `/docs/`
- Lab/preview features in versioned docs
- Use version-specific admonitions when needed

### Changelog Format
```markdown
## Date
#### Added to API
* Change description

#### Added to JS SDK
* SDK-specific change
```

### Common Patterns
- Use horizontal rules (`***`) to separate major sections
- Number tutorial steps with H2 headings (## 1. Step Title)
- Include code examples immediately after explanations
- Link to related documentation with buttons for important references
- Use note admonitions for additional context (API keys, prerequisites)

### Custom Components
- `Tabs` component from `/components/Tabs` - Custom styled tabs with sticky positioning
- `Highlight` component from `/components/highlight.jsx` - For interactive highlights (rarely used)

### CSS Variables and Theming
- Primary color: `--ifm-color-primary: #600075`
- Custom gray scale from 100-900
- Success (green), warning (orange), danger (red) color schemes
- Dark mode support with adjusted color values

### Accessibility Considerations
- Proper heading hierarchy for screen readers
- Descriptive link text (avoid "click here")
- Alt text for all images
- Semantic HTML structure

### Best Practices
- Keep paragraphs short and focused (2-3 sentences)
- Use bullet points for lists of options or features
- Include practical examples for every concept
- Test all code examples before documenting
- Maintain consistent formatting across all documentation
- Update related docs when making changes