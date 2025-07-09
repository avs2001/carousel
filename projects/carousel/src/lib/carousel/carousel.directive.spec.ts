import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselDirective } from './carousel.directive';

@Component({
  standalone: true,
  template: `<app-carousel [duration]="50"></app-carousel>`,
  imports: [CarouselDirective]
})
class TestComponent { }

describe('CarouselDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: CarouselDirective;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    directive = fixture.debugElement.query(By.directive(CarouselDirective)).injector.get(CarouselDirective);
    element = fixture.debugElement.query(By.directive(CarouselDirective)).nativeElement;
    fixture.detectChanges();
  });

  it('emits periodically when enabled', fakeAsync(() => {
    const values: number[] = [];
    directive.duration = 50; // Set duration via the setter
    directive.subscribe(() => values.push(values.length));
    element.dispatchEvent(new Event('mouseleave'));
    tick(120);
    expect(values.length).toBeGreaterThan(0);

    element.dispatchEvent(new Event('mouseenter'));
    const prev = values.length;
    tick(60);
    expect(values.length).toBe(prev);
  }));
});
