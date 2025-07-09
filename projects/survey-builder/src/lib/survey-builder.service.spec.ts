import { TestBed } from '@angular/core/testing';
import { SurveyBuilderService } from './survey-builder.service';
import { SurveyQuestion } from './survey-builder.component';

describe('SurveyBuilderService', () => {
  let service: SurveyBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyBuilderService);
    localStorage.clear();
  });

  it('should save and load drafts', () => {
    const questions: SurveyQuestion[] = [{ id: 1, label: 'Q', type: 'text', required: false }];
    service.saveDraft(questions);
    expect(service.loadDraft()).toEqual(questions);
  });
});
