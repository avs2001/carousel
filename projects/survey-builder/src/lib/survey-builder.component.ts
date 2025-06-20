import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyBuilderService } from './survey-builder.service';
import { TranslationService } from './translation.service';
import {
  TextQuestionComponent,
  TextareaQuestionComponent,
  RadioQuestionComponent,
  CheckboxQuestionComponent,
  DropdownQuestionComponent,
  DateQuestionComponent,
  FileQuestionComponent,
  VideoQuestionComponent,
  YesNoQuestionComponent,
} from './questions';

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'file'
  | 'video'
  | 'yesno';

export interface SurveyQuestion {
  id: number;
  label: string;
  type: QuestionType;
  required: boolean;
  minLength?: number;
  pattern?: string;
  options?: string[]; // used for radio/checkbox/dropdown
}

@Component({
  selector: 'lib-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    TextQuestionComponent,
    TextareaQuestionComponent,
    RadioQuestionComponent,
    CheckboxQuestionComponent,
    DropdownQuestionComponent,
    DateQuestionComponent,
    FileQuestionComponent,
    VideoQuestionComponent,
    YesNoQuestionComponent,
  ],
})
export class SurveyBuilderComponent {
  questions: SurveyQuestion[] = [];
  nextId = 1;

  editingIndex: number | null = null;

  @Input() background = '#ffffff';
  @Input() borderColor = '#cccccc';
  @HostBinding('style.--sb-bg') get bg() { return this.background; }
  @HostBinding('style.--sb-border') get border() { return this.borderColor; }

  newQuestionForm: FormGroup;
  previewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SurveyBuilderService,
    public i18n: TranslationService,
  ) {
    this.newQuestionForm = this.fb.group({
      label: ['', Validators.required],
      type: ['text', Validators.required],
      required: [false],
      minLength: [],
      pattern: [],
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
      id: this.editingIndex != null ? this.questions[this.editingIndex].id : this.nextId++,
      label: this.newQuestionForm.value.label,
      type: this.newQuestionForm.value.type,
      required: this.newQuestionForm.value.required,
      minLength: this.newQuestionForm.value.minLength,
      pattern: this.newQuestionForm.value.pattern,
      options: this.newQuestionForm.value.options.filter((o: string) => o),
    };
    if (this.editingIndex != null) {
      this.questions[this.editingIndex] = question;
    } else {
      this.questions.push(question);
    }
    this.newQuestionForm.reset({ type: 'text', required: false, minLength: null, pattern: null });
    this.options.clear();
    this.editingIndex = null;
    this.buildPreviewForm();
    this.service.saveDraft(this.questions);
  }

  editQuestion(index: number): void {
    this.editingIndex = index;
    const q = this.questions[index];
    this.newQuestionForm.patchValue({
      label: q.label,
      type: q.type,
      required: q.required,
      minLength: q.minLength,
      pattern: q.pattern,
    });
    this.options.clear();
    q.options?.forEach(o => this.options.push(this.fb.control(o)));
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.newQuestionForm.reset({ type: 'text', required: false, minLength: null, pattern: null });
    this.options.clear();
  }

  duplicateQuestion(index: number): void {
    const q = this.questions[index];
    const clone = { ...q, id: this.nextId++ };
    this.questions.splice(index + 1, 0, clone);
    this.buildPreviewForm();
    this.service.saveDraft(this.questions);
  }

  exportSurvey(): void {
    const data = JSON.stringify(this.questions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survey.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importSurvey(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        this.questions = JSON.parse(reader.result as string) as SurveyQuestion[];
        this.nextId = this.questions.length
          ? Math.max(...this.questions.map(q => q.id)) + 1
          : 1;
        this.buildPreviewForm();
        this.service.saveDraft(this.questions);
      } catch {
        console.error('Invalid survey JSON');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
    this.buildPreviewForm();
    this.service.saveDraft(this.questions);
  }


  drop(event: CdkDragDrop<SurveyQuestion[]>): void {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.service.saveDraft(this.questions);
  }

  private buildPreviewForm(): void {
    const group: { [key: string]: any } = {};
    this.questions.forEach(q => {
      const validators = [] as any[];
      if (q.required) {
        validators.push(Validators.required);
      }
      if (q.minLength) {
        validators.push(Validators.minLength(q.minLength));
      }
      if (q.pattern) {
        validators.push(Validators.pattern(q.pattern));
      }
      group['q' + q.id] = ['', validators];
    });
    this.previewForm = this.fb.group(group);
  }
}
