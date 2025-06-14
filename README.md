# Carousel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Survey Builder

The library also includes a Survey Builder component located under `projects/survey-builder`.
Install dependencies and build the library:

```bash
npm install
ng build survey-builder
```

Include `<lib-survey-builder>` in your standalone Angular components to allow administrators to create surveys. The builder supports editing, drag-and-drop ordering, duplication, advanced validation and import/export of survey definitions.

## Example application

The `projects/example` Angular app demonstrates the carousel components and also
contains a basic `<lib-survey-builder>` instance. Run it with:

```bash
ng serve example
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Documentation

Documentation sources are stored under `docs-src/docs`. Generate the static site
using [Docusaurus](https://docusaurus.io) with:

```bash
npx docusaurus build docs-src --out-dir docs
```

The resulting HTML will be written to the `docs/` directory, which is ignored by
git. Deploy the contents of `docs/` to any static hosting service (for example
GitHub Pages) to publish the documentation.
