import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselScrollDirective } from './carousel-scroll.directive';

@Component({
  template: `<div appCarouselScroll></div>`
})
class HostComponent {}

describe('CarouselScrollDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: CarouselScrollDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, CarouselScrollDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    directive = fixture.debugElement.query(By.directive(CarouselScrollDirective)).injector.get(CarouselScrollDirective);
    fixture.detectChanges();
  });

  it('should emit wheel direction', fakeAsync(() => {
    const values: number[] = [];
    directive.appCarouselScroll.subscribe(v => values.push(v));
    const el = fixture.debugElement.query(By.directive(CarouselScrollDirective)).nativeElement;
    el.dispatchEvent(new WheelEvent('wheel', { deltaX: 30 }));
    tick(0);
    expect(values).toEqual([1]);
  }));
});
