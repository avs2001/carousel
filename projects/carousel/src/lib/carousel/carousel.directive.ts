import {Directive, ElementRef, Input, signal, computed, inject} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  EMPTY,
  fromEvent,
  interval,
  mapTo,
  merge,
  Observable,
  switchMap
} from "rxjs";

@Directive({
  selector: 'app-carousel',
  standalone: true,
})
export class CarouselDirective extends Observable<unknown> {

  private readonly durationSignal = signal(0);
  private readonly running = signal(false);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Input()
  set duration(duration: number) {
    this.durationSignal.set(duration);
  }

  constructor() {
    // Create output$ in constructor where injection context is available
    const output$ = toObservable(
      computed(() => ({duration: this.durationSignal(), running: this.running()}))
    ).pipe(
      switchMap(({duration, running}) =>
        duration && running ? interval(duration) : EMPTY,
      ),
    );
    
    super(subscriber => output$.subscribe(subscriber));
    
    merge(
      fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(mapTo(false)),
      fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(mapTo(false)),
      fromEvent(this.elementRef.nativeElement, 'touchend').pipe(mapTo(true)),
      fromEvent(this.elementRef.nativeElement, 'mouseleave').pipe(mapTo(true)),
    ).subscribe(v => this.running.set(v));
  }

}
