import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyQuestion } from '../survey-builder.component';

@Component({
  selector: 'lib-video-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<input type="url" [formControlName]="controlName" [required]="question.required" placeholder="Video URL" />`,
})
export class VideoQuestionComponent {
  @Input() question!: SurveyQuestion;
  @Input() controlName!: string;
}
