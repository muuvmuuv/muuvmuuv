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

1. **visits** - Next.js serverless application that generates dynamic SVG visit counters for GitHub profiles using GoatCounter

### Visits App Architecture

The `apps/visits` is a Next.js application deployed to Vercel that:

- Exposes a `/api/image.svg` route that returns dynamically generated SVG images
- Tracks page views with GoatCounter in `app/libs/GoatCounter.ts`: `sendView()` posts a hit to `/api/v0/count` after the response, and `getAnalytics()` reads the lifetime total from `/api/v0/stats/total?start=2010-01-01T00:00:00Z`
- Requires `GOATCOUNTER_TOKEN`; optional `GOATCOUNTER_SITE_URL` overrides the default `https://muuvmuuv.goatcounter.com`
- Adds `HISTORICAL_PAGEVIEWS` (463) on top of the GoatCounter total, because earlier counts cannot be backdated
- Supports themes `tiles`, `mosaic`, `flip`, `board`, `lcd`, and `nixie` via query parameter `?theme=<name>`
- With no `theme` param, picks at random from `tiles`, `mosaic`, `board`, and `lcd`. `flip` and `nixie` render when `?theme=` names them. Any other name falls back to `tiles`
- `mosaic` accepts a `color` option (hex, `#` optional, so `color=38c172` and `color=%2338c172` both work)
- Has a debug mode whenever a `debug` query param is present (`?debug=true`). It shows the fixed count `1234567890` and skips the GoatCounter hit
- Uses Next.js App Router with route handlers in `app/api/image.svg/route.tsx`
- Renders React components to SVG using `react-dom/server`
- Theme components are located in `app/components/` (`Tiles`, `Mosaic`, `Flip`, `Board`, `Lcd`, `Nixie`)

## Common Commands

### Workspace-level commands (run from root):

```bash
# Install dependencies
pnpm install

# Lint and check formatting across the workspace (oxlint + oxfmt)
pnpm check

# Auto-fix lint issues and format files
pnpm format

# Update README files across packages
pnpm update-readme

# Bump versions with release-it, then commit and tag
pnpm release
```

### Visits app (Next.js app):

```bash
# Navigate to visits app
cd apps/visits

# Development server
pnpm dev

# Build for production
pnpm build
```

### CLI packages (marvin, marvinheilemann, muuvmuuv):

```bash
# Run any CLI package
cd packages/<package-name>
pnpm start
```

## Code Style and Formatting

- Uses [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting (`.oxlintrc.json`)
  and [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting (`.oxfmtrc.json`)
- Tabs, line width, and EOL come from `.editorconfig` (oxfmt reads it)
- Formatting preferences:
  - Tabs for indentation (width: 2)
  - Single quotes for JavaScript strings
  - No semicolons (ASI)
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

This repository uses pnpm. The root `package.json` pins it with `"packageManager": "pnpm@11.1.1"`. `apps/visits/package.json` has no `packageManager` field.

## Publishing Packages

The CLI packages (marvin, marvinheilemann, muuvmuuv) in the `packages/` directory can be published to NPM. The visits app in `apps/` is private and won't be published.

### Package Metadata

All publishable packages include:

- MIT license
- Repository information with monorepo directory paths
- Homepage, bugs, and keywords
- `prepublishOnly` script that runs `pnpm oxlint && pnpm oxfmt --check` before publishing
- `publishConfig` with public access

### Publishing Commands

Publish from a package directory. The root package is private, so the publish runs inside `packages/<package-name>`.

```bash
cd packages/<package-name>
pnpm publish
```

`prepublishOnly` runs first (`pnpm oxlint && pnpm oxfmt --check`). The GitHub Actions workflow publishes with `npm publish` in the package directory, which runs that same hook. `pnpm publish` replaces `workspace:*` dependencies with the current version in the published tarball.

### Manual Publishing

To publish manually, you need to authenticate with NPM:

```bash
npm login
cd packages/<package-name>
pnpm publish
```

### Automated Publishing via GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/publish.yml`) that:

- Can be triggered manually via workflow_dispatch
- Also runs when a `v*` tag is pushed
- Publishes `muuvmuuv`, then `marvinheilemann`, with `npm publish` in each package directory. The `marvin` publish step is commented out
- Uses the `production` environment and npm provenance through OIDC (`id-token: write`)

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

`pnpm release` runs [release-it](https://github.com/release-it/release-it) (`.release-it.json`). [@release-it/bumper](https://github.com/release-it/bumper) writes the released version into `packages/*/package.json`.

From a clean working tree on `main`, that command:

1. Runs `pnpm check` (`hooks.before:init`)
2. Bumps the version in the root `package.json`. `npm.publish` is false, so the npm step stops after the version bump
3. Writes that version to every `packages/*/package.json`
4. Commits `Release v${version}`, creates the tag `v${version}`, and pushes

`github.release` is false. The pushed `v*` tag is what starts `.github/workflows/publish.yml`.

`apps/visits/package.json` sits outside the bumper `out` glob, so `pnpm release` leaves its version alone. CLI packages depend on each other with `workspace:*`.
