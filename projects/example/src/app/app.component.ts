import { Component } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CarouselComponent} from 'carousel';
import {CarouselItemDirective} from 'carousel';
import {CarouselScrollDirective} from 'carousel';
import {CarouselAutoScrollDirective} from 'carousel';
import {CarouselDirective} from 'carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    BrowserModule,
    CarouselComponent,
    CarouselItemDirective,
    CarouselScrollDirective,
    CarouselAutoScrollDirective,
    CarouselDirective,
  ]
})
export class AppComponent {
  title = 'example';
}
