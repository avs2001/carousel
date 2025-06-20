import {Directive, Inject} from '@angular/core';
import {CarouselDirective} from "./carousel/carousel.directive";
import {Observable} from "rxjs";

@Directive({
  selector: '[appCarouselAutoScroll]',
  outputs: ['appCarouselAutoScroll'],
  standalone: true
})
export class CarouselAutoScrollDirective {

  constructor(@Inject(CarouselDirective) readonly appCarouselAutoScroll: Observable<unknown>) {
  }

}
