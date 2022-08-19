import {Directive, ElementRef, Inject, Output} from '@angular/core';
import {filter, fromEvent, map, tap, throttleTime} from "rxjs";

@Directive({
  selector: '[appCarouselScroll]'
})
export class CarouselScrollDirective {
  @Output()
  readonly appCarouselScroll = fromEvent<WheelEvent>(this.element.nativeElement, 'wheel').pipe(
    filter(({deltaX}) => Math.abs(deltaX) > 20),
    throttleTime(500),
    map(({deltaX}) => Math.sign(deltaX)),
    tap(() => {
      this.element.nativeElement.scrollLeft = 10;
    }),
  )

  constructor(@Inject(ElementRef) private readonly element: ElementRef) {
  }

}
