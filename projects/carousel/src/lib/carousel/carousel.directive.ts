import {Directive, ElementRef, Inject, Input} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  fromEvent,
  interval,
  mapTo,
  merge,
  Observable,
  switchMap,
  tap
} from "rxjs";

@Directive({
  selector: 'app-carousel',
  standalone: true,
})
export class CarouselDirective extends Observable<unknown> {

  private readonly duration$ = new BehaviorSubject(0);

  private readonly running$ = merge(
    fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(mapTo(false)),
    fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(mapTo(false)),
    fromEvent(this.elementRef.nativeElement, 'touchend').pipe(mapTo(true)),
    fromEvent(this.elementRef.nativeElement, 'mouseleave').pipe(mapTo(true)),
  );

  private readonly output$ = combineLatest([this.duration$, this.running$]).pipe(
    switchMap(([duration, running]) =>
      duration && running ? interval(duration) : EMPTY,
    ),
  );

  @Input()
  set duration(duration: number) {
    this.duration$.next(duration);
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
  ) {
    super(subscriber => this.output$.subscribe(subscriber));
  }

}
