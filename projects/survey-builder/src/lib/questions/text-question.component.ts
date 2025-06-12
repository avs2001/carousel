import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-text-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<input [formControlName]="controlName" type="text" [required]="question.required" />`,
})
export class TextQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
