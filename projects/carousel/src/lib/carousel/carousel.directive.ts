import {Directive, ElementRef, Inject, Input, signal, computed} from '@angular/core';
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

  private readonly duration = signal(0);
  private readonly running = signal(false);

  private readonly output$ = toObservable(
    computed(() => ({duration: this.duration(), running: this.running()}))
  ).pipe(
    switchMap(({duration, running}) =>
      duration && running ? interval(duration) : EMPTY,
    ),
  );

  @Input()
  set duration(duration: number) {
    this.duration.set(duration);
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
  ) {
    merge(
      fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(mapTo(false)),
      fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(mapTo(false)),
      fromEvent(this.elementRef.nativeElement, 'touchend').pipe(mapTo(true)),
      fromEvent(this.elementRef.nativeElement, 'mouseleave').pipe(mapTo(true)),
    ).subscribe(v => this.running.set(v));

    super(subscriber => this.output$.subscribe(subscriber));
  }

}
