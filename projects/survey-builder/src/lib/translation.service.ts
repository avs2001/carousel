import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: Record<string, Record<string, string>> = {
    en: {
      addQuestion: 'Add Question',
      updateQuestion: 'Update Question',
      cancel: 'Cancel',
      duplicate: 'Duplicate',
      edit: 'Edit',
      remove: 'Remove',
      exportJson: 'Export JSON',
      importJson: 'Import JSON',
      questions: 'Questions',
      preview: 'Preview',
      addOption: 'Add option',
      removeOption: 'Remove'
    }
  };

  locale = 'en';

  t(key: string): string {
    return this.translations[this.locale]?.[key] || key;
  }
}
