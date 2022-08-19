import {Directive, InjectionToken, TemplateRef} from '@angular/core';

export const CAROUSEL_ITEM = new InjectionToken<CarouseItem>('Carousel item');

export interface CarouseItem {
  tpl: TemplateRef<any>;
}

@Directive({
  selector: '[appCarouselItem]',
  providers: [
    {provide: CAROUSEL_ITEM, useExisting: CarouselItemDirective}
  ]
})
export class CarouselItemDirective implements CarouseItem {

  constructor(public readonly tpl: TemplateRef<any>) {
  }
}
