import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselDirective } from './carousel.directive';

@Component({
  standalone: true,
  template: `<div app-carousel [duration]="duration"></div>`,
  imports: [CarouselDirective]
})
class TestComponent {
  duration = 50;
}

describe('CarouselDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: CarouselDirective;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('div');
    directive = fixture.debugElement.query(By.directive(CarouselDirective)).componentInstance;
    fixture.detectChanges();
  });

  xit('emits periodically when enabled', fakeAsync(() => {
    const values: number[] = [];
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
