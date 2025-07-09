import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-checkbox-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      @for (o of question.options; track o; let cIndex = $index) {
        <label>
          <input type="checkbox" [formControlName]="controlName" /> {{ o }}
        </label>
      }
    </div>
  `,
})
export class CheckboxQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
