import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-textarea-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<textarea [formControlName]="controlName" [required]="question.required"></textarea>`,
})
export class TextareaQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
