import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyBuilderComponent } from './survey-builder.component';

@NgModule({
  declarations: [SurveyBuilderComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SurveyBuilderComponent],
})
export class SurveyBuilderModule {}
