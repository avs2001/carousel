import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-yesno-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label>
      <input type="checkbox" [formControlName]="controlName" />
      {{ question.label }}
    </label>
  `,
})
export class YesNoQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
