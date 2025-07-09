import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-radio-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      @for (o of question.options; track o) {
        <label>
          <input type="radio" [value]="o" [formControlName]="controlName" [required]="question.required" /> {{ o }}
        </label>
      }
    </div>
  `,
})
export class RadioQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
