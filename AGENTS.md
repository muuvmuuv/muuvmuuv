# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal monorepo containing multiple packages related to Marvin Heilemann's GitHub profile and online presence. The repository uses pnpm workspaces for managing multiple packages.

## Workspace Structure

The monorepo is organized into two main directories:

**packages/** - Three publishable CLI packages:
1. **marvin** - CLI package that displays info about Marvin (depends on muuvmuuv package)
2. **marvinheilemann** - CLI package similar to marvin (depends on muuvmuuv package)
3. **muuvmuuv** - Shared base package with common functionality, used by other CLI packages

**apps/** - Applications (private, not published):
1. **visits** - Next.js serverless application that generates dynamic SVG visit counters for GitHub profiles using SimpleAnalytics

### Visits App Architecture

The `apps/visits` is a Next.js application deployed to Vercel that:
- Exposes a `/api/image.svg` route that returns dynamically generated SVG images
- Tracks page views via SimpleAnalytics server-side API
- Supports multiple themes (classic, cyber, flip) via query parameter `?theme=<name>`
- Has a debug mode (`?debug=true`) that shows test data without sending analytics
- Uses Next.js App Router with route handlers in `app/api/image.svg/route.tsx`
- Renders React components to SVG using `react-dom/server`
- Theme components are located in `app/components/` (Classic, Cyber, Flip)

## Common Commands

### Workspace-level commands (run from root):
```bash
# Install dependencies
pnpm install

# Format and lint all packages with Biome
pnpm check

# Auto-fix formatting and linting issues
pnpm format

# Update README files across packages
pnpm update-readme
```

### Visits app (Next.js app):
```bash
# Navigate to visits app
cd apps/visits

# Development server
pnpm dev

# Build for production
pnpm build

# Run Vercel dev server (simulates serverless environment)
pnpm start

# Deploy to Vercel
pnpm vercel
```

### CLI packages (marvin, marvinheilemann, muuvmuuv):
```bash
# Run any CLI package
cd packages/<package-name>
pnpm start
```

## Code Style and Formatting

- Uses Biome for formatting and linting (configured in `biome.json`)
- Formatting preferences:
  - Tabs for indentation (width: 2)
  - Single quotes for JavaScript strings
  - Double quotes for JSX attributes
  - Trailing commas everywhere
  - Semicolons as needed (ASI-safe)
  - Line width: 90 characters
  - LF line endings
- TypeScript is used for the visits package
- ES modules (`type: "module"`) for all packages

## TypeScript Configuration

The visits app uses TypeScript with strict mode enabled. The tsconfig includes:
- Path aliases configured in `apps/visits/tsconfig.json`:
  - `@/components/*` → `src/components/*`
  - `@/libs/*` → `src/libs/*`
  - `@//*` → `src/*`
- Note: The path mappings reference `src/` but the actual app structure uses `app/` directory (Next.js App Router). These paths may need adjustment if used.

## Development Dependencies

When updating dependencies in the visits app, check React version compatibility:
- React version reference: https://github.com/facebook/react/blob/v19.2.0/package.json#L115
- Keep TypeScript version aligned with React's requirements

## Tools and Automation

The `tools/update-readme.js` script syncs the root README.md to the CLI packages (marvin, marvinheilemann, muuvmuuv), appending a notice that it's copied from the original.

## Package Manager

This repository uses pnpm. The visits app specifies `pnpm@10.20.0` in package.json.

## Publishing Packages

The CLI packages (marvin, marvinheilemann, muuvmuuv) in the `packages/` directory can be published to NPM. The visits app in `apps/` is private and won't be published.

### Package Metadata

All publishable packages include:
- MIT license
- Repository information with monorepo directory paths
- Homepage, bugs, and keywords
- `prepublishOnly` script that runs `pnpm check` before publishing
- `publishConfig` with public access

### Publishing Commands

All npm publishing includes provenance information for supply chain security.

```bash
# Publish all packages to NPM
pnpm publish
```

### Manual Publishing

To publish manually, you need to authenticate with NPM:

```bash
npm login
pnpm publish
```

### Automated Publishing via GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/publish.yml`) that:
- Can be triggered manually via workflow_dispatch
- Automatically publishes on GitHub releases
- Uses npm provenance for enhanced security and transparency

#### Setup: NPM Trusted Publishers (Recommended)

This repository is configured to use [npm trusted publishers](https://docs.npmjs.com/trusted-publishers), which uses OIDC tokens instead of long-lived access tokens for better security.

**To set up trusted publishers on npm:**

First, create the GitHub environment:
1. Go to repository Settings → Environments
2. Create a new environment named `production`
3. (Optional) Add protection rules like required reviewers or wait timers

Then configure npm trusted publishers:
1. Log in to https://www.npmjs.com/
2. For each package (marvin, marvinheilemann, muuvmuuv):
   - Go to package settings → Publishing access
   - Click "Configure trusted publisher"
   - Add GitHub as a trusted publisher with:
     - Repository owner: `muuvmuuv`
     - Repository name: `muuvmuuv`
     - Workflow: `publish.yml`
     - Environment: `production`

Once configured, the workflow will automatically authenticate using OIDC tokens without needing an `NPM_TOKEN` secret.

#### Alternative: Using NPM_TOKEN

If you prefer not to use trusted publishers, you can still use traditional token-based authentication:
1. Create an NPM access token at https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Add it as `NPM_TOKEN` secret in GitHub repository settings

**To publish via GitHub Actions:**
1. Go to Actions tab in GitHub
2. Select "Publish Packages" workflow
3. Click "Run workflow"

### Version Management

Version numbers are managed manually in each package's `package.json`. Before publishing:
1. Update version numbers in the packages you want to publish
2. Ensure workspace dependencies use `workspace:*` protocol (they will be resolved to actual versions during publish)
3. Run `pnpm check` to ensure code quality
4. Commit the version changes
5. Tag the release if desired
6. Publish using `pnpm publish`
