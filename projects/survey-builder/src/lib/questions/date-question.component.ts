import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-date-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<input type="date" [formControlName]="controlName" [required]="question.required" />`,
})
export class DateQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
