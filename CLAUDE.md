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

### Build Process
- Generates static site deployable to any static hosting service
- Includes sitemap generation and SEO optimizations
- Integrates external scripts for Freshdesk widget and Hotjar analytics