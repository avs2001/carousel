import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  Inject,
  input,
  Signal,
  signal,
  computed,
  QueryList
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouseItem, CAROUSEL_ITEM, CarouselItemDirective} from "./carousel-item.directive";
import {CarouselScrollDirective} from '../carousel-scroll.directive';
import {CarouselAutoScrollDirective} from '../carousel-auto-scroll.directive';
import {CarouselDirective} from './carousel.directive';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CarouselItemDirective,
    CarouselScrollDirective,
    CarouselAutoScrollDirective,
    CarouselDirective,
  ]
})
export class CarouselComponent {
  readonly display = input<number>(1);
  readonly indexSignal = signal<number>(0);

  @ContentChildren(CAROUSEL_ITEM)
  readonly items: QueryList<CarouseItem> = new QueryList<CarouseItem>();

  @HostBinding('class.animate')
  transitioned = true;


  constructor(
    @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  readonly transform = computed(() => {
    const x = this.calcTranslate();
    return `translateX(${100 * x * this.display()}%)`;
  });

  private calcTranslate(): number {
    return -this.indexSignal() / this.display();
  }

  next() {
    this.updateIndex(this.indexSignal() + 1);
  }

  prev() {
    this.updateIndex(this.indexSignal() - 1);
  }


  onScroll(delta: number) {
    this.updateIndex(this.indexSignal() + delta);
  }

  onAutoscroll(): void {
    console.log('ON AUTOSCROLL');
    this.updateIndex(this.indexSignal() === this.items.length - 1 ? 0 : this.indexSignal() + 1);
  }

  private updateIndex(index: number) {
    const screens = Math.ceil(this.items.length / this.display());
    if (screens - 1 === this.indexSignal()) {
      this.indexSignal.set(0);
      return;
    }
    this.indexSignal.set(clamp(index, 0, screens - 1));
    this.changeDetectorRef.markForCheck();
  }

  getStyle(itemsCount: number): Partial<CSSStyleDeclaration> {
    const p = `${100 / itemsCount}%`;
    return {
      flexBasis: p,
      minWidth: p,
      maxWidth: p,
    };
  }
}


export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}


export function pPure<T>(
  _target: object,
  propertyKey: string,
  {get, enumerable, value}: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T> {
  if (get) {
    return {
      enumerable,
      get(): T {
        const value = get.call(this);

        Object.defineProperty(this, propertyKey, {enumerable, value});

        return value;
      },
    };
  }

  if (typeof value !== 'function') {
    throw new Error('Error');
  }

  const original = value;

  return {
    enumerable,
    get(): T {
      let previousArgs: readonly unknown[] = [];
      let originalFnWasCalledLeastAtOnce = false;
      let pureValue: unknown;

      const patched = (...args: unknown[]): unknown => {
        const isPure =
          originalFnWasCalledLeastAtOnce &&
          previousArgs.length === args.length &&
          args.every((arg, index) => arg === previousArgs[index]);

        if (isPure) {
          return pureValue;
        }

        previousArgs = args;
        pureValue = original.apply(this, args);
        originalFnWasCalledLeastAtOnce = true;

        return pureValue;
      };

      Object.defineProperty(this, propertyKey, {value: patched});

      return patched as unknown as T;
    },
  };
}
