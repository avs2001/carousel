import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselComponent } from './carousel.component';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselDirective } from './carousel.directive';
import { CarouselAutoScrollDirective } from '../carousel-auto-scroll.directive';
import { CarouselScrollDirective } from '../carousel-scroll.directive';

@Component({
  template: `
    <app-carousel [display]="1" [index]="0">
      <ng-template appCarouselItem>Item 1</ng-template>
      <ng-template appCarouselItem>Item 2</ng-template>
      <ng-template appCarouselItem>Item 3</ng-template>
    </app-carousel>
  `
})
class HostComponent { }

describe('CarouselComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let component: CarouselComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        CarouselComponent,
        CarouselDirective,
        CarouselItemDirective,
        CarouselScrollDirective,
        CarouselAutoScrollDirective,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.debugElement.query(By.directive(CarouselComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should render all carousel items', () => {
    const items = fixture.nativeElement.querySelectorAll('.item');
    expect(items.length).toBe(3);
  });

  it('should advance to next and previous item', () => {
    component.next();
    expect(component.index).toBe(1);
    component.prev();
    expect(component.index).toBe(0);
  });

  it('should wrap around when reaching the end', () => {
    component.index = 2;
    fixture.detectChanges();
    component.next();
    expect(component.index).toBe(0);
  });
});
