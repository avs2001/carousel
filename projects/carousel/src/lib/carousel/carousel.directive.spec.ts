import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { CarouselDirective } from './carousel.directive';

describe('CarouselDirective', () => {
  it('emits periodically when enabled', fakeAsync(() => {
    const div = document.createElement('div');
    const directive = new CarouselDirective(new ElementRef(div));
    const values: number[] = [];
    directive.duration = 50;
    directive.subscribe(() => values.push(values.length));
    div.dispatchEvent(new Event('mouseleave'));
    tick(120);
    expect(values.length).toBeGreaterThan(0);

    div.dispatchEvent(new Event('mouseenter'));
    const prev = values.length;
    tick(60);
    expect(values.length).toBe(prev);
  }));
});
