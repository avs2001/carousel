# Carousel

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Code scaffolding

Run `ng generate component component-name --project carousel` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project carousel`.
> Note: Don't forget to add `--project carousel` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build carousel` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build carousel`, go to the dist folder `cd dist/carousel` and run `npm publish`.

## Running unit tests

Run `ng test carousel` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Usage
```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  index = signal(0);
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  remove(index: number) {
    this.items = [...this.items.filter((_, i) => i !== index)]
  }

  add() {
    this.items = [...this.items, this.items.length + 1];
  }

  scroll(e: any) {
    console.log(e);
  }
}



<button (click)="carousel.prev()">prev</button>
<button (click)="carousel.next()">next</button>
<button (click)="add()">ADD</button>
<app-carousel #carousel [display]="2" [duration]="10000">
  <ng-container *ngFor="let i of items; let index = index">
    <div class="c-item" *appCarouselItem>
      {{i}}
      <button mat-button (click)="remove(index)">Remove</button>
    </div>
  </ng-container>
</app-carousel>
<router-outlet></router-outlet>
```

