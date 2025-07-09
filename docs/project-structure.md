# Carousel Project Structure

## Overview
This project is an Angular library (v20.0.0) that implements a carousel component. The library is designed to be imported into other Angular applications.

## Project Structure

```
carousel/
├── .github/                  # GitHub configuration
│   └── workflows/            # GitHub Actions workflows
├── .vscode/                  # VS Code configuration
├── docs/                     # Project documentation
│   └── project-structure.md  # This file
├── node_modules/             # Dependencies (not tracked in git)
├── projects/                 # Angular projects directory
│   └── carousel/             # Carousel library
│       ├── src/              # Source code
│       │   ├── lib/          # Library code
│       │   │   ├── carousel.ts       # Main carousel component
│       │   │   └── carousel.spec.ts  # Tests for carousel component
│       │   └── public-api.ts # Exports from the library
│       ├── ng-package.json   # ng-packagr configuration
│       ├── package.json      # Library-specific package.json
│       ├── tsconfig.lib.json # TypeScript config for library
│       ├── tsconfig.lib.prod.json # TypeScript config for production
│       └── tsconfig.spec.json # TypeScript config for tests
├── .editorconfig             # Editor configuration
├── .gitignore                # Git ignore file
├── angular.json              # Angular CLI configuration
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked dependencies
├── README.md                 # Project README
└── tsconfig.json             # Root TypeScript configuration
```

## Key Files

### Configuration Files
- **angular.json**: Defines the project structure and build configurations
- **package.json**: Lists dependencies and scripts for the project
- **tsconfig.json**: Root TypeScript configuration

### Library Files
- **projects/carousel/src/public-api.ts**: Exports from the library
- **projects/carousel/src/lib/carousel.ts**: Main carousel component implementation
- **projects/carousel/src/lib/carousel.spec.ts**: Tests for the carousel component

## Technology Stack
- **Angular**: v20.0.0
- **TypeScript**: v5.8.2
- **RxJS**: v7.8.0
- **Testing**: Jasmine and Karma

## Build System
The project uses the Angular CLI and ng-packagr to build the library. The build configuration is defined in angular.json and projects/carousel/ng-package.json.

## Current State
The carousel component is currently in a minimal implementation state with a basic structure but no actual carousel functionality yet. It's set up as a standalone component following modern Angular practices.
