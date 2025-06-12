import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyBuilderService } from './survey-builder.service';

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'file'
  | 'video';

export interface SurveyQuestion {
  id: number;
  label: string;
  type: QuestionType;
  required: boolean;
  options?: string[]; // used for radio/checkbox/dropdown
}

@Component({
  selector: 'lib-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SurveyBuilderComponent {
  questions: SurveyQuestion[] = [];
  nextId = 1;

  newQuestionForm: FormGroup;
  previewForm: FormGroup;

  constructor(private fb: FormBuilder, private service: SurveyBuilderService) {
    this.newQuestionForm = this.fb.group({
      label: ['', Validators.required],
      type: ['text', Validators.required],
      required: [false],
      options: this.fb.array([]),
    });
    this.previewForm = this.fb.group({});
    this.questions = this.service.loadDraft();
    if (this.questions.length) {
      this.nextId = Math.max(...this.questions.map(q => q.id)) + 1;
      this.buildPreviewForm();
    }
  }

  get options(): FormArray {
    return this.newQuestionForm.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.control(''));
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  addQuestion(): void {
    if (this.newQuestionForm.invalid) {
      return;
    }
    const question: SurveyQuestion = {
      id: this.nextId++,
      label: this.newQuestionForm.value.label,
      type: this.newQuestionForm.value.type,
      required: this.newQuestionForm.value.required,
      options: this.newQuestionForm.value.options.filter((o: string) => o),
    };
    this.questions.push(question);
    this.newQuestionForm.reset({ type: 'text', required: false });
    this.options.clear();
    this.buildPreviewForm();
    this.service.saveDraft(this.questions);
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
    this.buildPreviewForm();
    this.service.saveDraft(this.questions);
  }

  moveUp(index: number): void {
    if (index > 0) {
      const tmp = this.questions[index - 1];
      this.questions[index - 1] = this.questions[index];
      this.questions[index] = tmp;
      this.service.saveDraft(this.questions);
    }
  }

  moveDown(index: number): void {
    if (index < this.questions.length - 1) {
      const tmp = this.questions[index + 1];
      this.questions[index + 1] = this.questions[index];
      this.questions[index] = tmp;
      this.service.saveDraft(this.questions);
    }
  }

  private buildPreviewForm(): void {
    const group: { [key: string]: any } = {};
    this.questions.forEach(q => {
      const validators = q.required ? [Validators.required] : [];
      group['q' + q.id] = [''];
      if (validators.length) {
        group['q' + q.id].push(validators);
      }
    });
    this.previewForm = this.fb.group(group);
  }
}
