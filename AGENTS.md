# Contributor Guide


## Prerequisites

- Node.js v22 or higher
- npm v11 or higher (with workspace support)

## Dev Environment Tips

1. **Install dependencies**:

   ```bash
   git clone <repo-url>
   cd <repo-root>
   npm install
   ```

2. **Run the carousel library** in development mode:

  - From the monorepo root (using workspace name defined in `projects/carousel/package.json`):
    ```bash
    npm run build:carousel
    ```

3. **Watch on change** for the library:

   ```bash
   npm run watch:carousel
   ```

4. **Add a new dependency** to the carousel package:

   ```bash
   npm install <package> 
   ```

5. **Generate applications or libraries** via Angular CLI:

   ```bash
   npx ng generate application <app-name>
   npx ng generate library <library-name>
   ```

6. **Validate project names** in `angular.json` under `projects` before running commands.

## Testing Instructions

- **CI workflows** located in `.github/workflows`.

- **Run tests** for the carousel library:

  ```bash
  npm test --project=carousel
  ```

- **Run all tests** across all workspaces:

  ```bash
  npm test
  ```

- **Focus tests** with Jasmine's `fit` or `fdescribe`, or adjust `karma.conf.js` settings.

- Resolve any test failures or TypeScript errors before merging.


## Building

- **Build the carousel package**:

  ```bash
  npm run build:carousel
  ```



- Output artifacts follow `ng-package.json` settings for distribution.

## PR Instructions

- **Branch naming**: `feature/carousel-<description>` or `bugfix/carousel-<description>`.

- **PR title** format:

  ```text
  [carousel] <Short descriptive title>
  ```

- **PR description** should include:

  - What was changed and why
  - Link to the issue or ticket (e.g., `#1234`)
  - Screenshots or GIFs for visual updates
  - Steps to verify changes locally

## Commit Message Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/):

  ```text
  <type>(<scope>): <subject>
  ```

- **Sample**:

  ```text
  feat(carousel): add autoplay configuration
  ```

