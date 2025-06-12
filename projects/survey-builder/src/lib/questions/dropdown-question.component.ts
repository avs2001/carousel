import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-dropdown-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <select [formControlName]="controlName" [required]="question.required">
      @for (o of question.options) {
        <option [value]="o">{{ o }}</option>
      }
    </select>
  `,
})
export class DropdownQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
