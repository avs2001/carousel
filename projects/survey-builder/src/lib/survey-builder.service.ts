import { Injectable } from '@angular/core';
import { SurveyQuestion } from './survey-builder.component';

@Injectable({
  providedIn: 'root',
})
export class SurveyBuilderService {
  private STORAGE_KEY = 'survey-builder-draft';

  saveDraft(questions: SurveyQuestion[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(questions));
  }

  loadDraft(): SurveyQuestion[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? (JSON.parse(data) as SurveyQuestion[]) : [];
  }
}
