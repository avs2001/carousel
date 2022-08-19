import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from './carousel/carousel.component';
import {CarouselItemDirective} from './carousel/carousel-item.directive';
import {CarouselScrollDirective} from './carousel-scroll.directive';
import {CarouselAutoScrollDirective} from './carousel-auto-scroll.directive';
import {CarouselDirective} from "./carousel/carousel.directive";


@NgModule({
  declarations: [
    CarouselComponent,
    CarouselDirective,
    CarouselItemDirective,
    CarouselScrollDirective,
    CarouselAutoScrollDirective,
  ],
  exports: [
    CarouselComponent,
    CarouselItemDirective,
    CarouselScrollDirective,
    CarouselAutoScrollDirective,
    CarouselDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class CarouselModule {
}
