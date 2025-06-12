# Carousel Library

This documentation describes how to use the Carousel Angular library.

## Installation

Install the package from GitHub Packages:

```bash
npm install @avs2001/carousel
```

## Usage

Import the standalone component and directives into your bootstrap configuration.

```
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {CarouselComponent, CarouselItemDirective} from '@avs2001/carousel';

bootstrapApplication(AppComponent, {
  providers: [],
  imports: [CarouselComponent, CarouselItemDirective]
});
```

Refer to the project README for more details.
