import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  Inject,
  Input,
  QueryList
} from '@angular/core';
import {CarouseItem, CAROUSEL_ITEM} from "./carousel-item.directive";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {
  @Input() display = 1;
  @Input() index = 0;

  @ContentChildren(CAROUSEL_ITEM)
  readonly items: QueryList<CarouseItem> = new QueryList<CarouseItem>();

  @HostBinding('class.animate')
  transitioned = true;


  constructor(
    @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get transform(): string {
    const x = this.calcTranslate;
    return `translateX(${100 * x * this.display}%)`;
  }

  private get calcTranslate(): number {
    return -this.index / this.display;
  }

  next() {
    this.updateIndex(this.index + 1);
  }

  prev() {
    this.updateIndex(this.index - 1);
  }


  onScroll(delta: number) {
    this.updateIndex(this.index + delta);
  }

  onAutoscroll(): void {
    console.log('ON AUTOSCROLL');
    this.updateIndex(this.index === this.items.length - 1 ? 0 : this.index + 1);
  }

  private updateIndex(index: number) {
    const screens = Math.ceil(this.items.length / this.display);
    if (screens - 1 === this.index) {
      this.index = 0;
      return;
    }
    this.index = clamp(index, 0, screens - 1);
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
