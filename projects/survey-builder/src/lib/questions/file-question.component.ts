import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-file-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<input type="file" [formControlName]="controlName" [required]="question.required" />`,
})
export class FileQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
