import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { NoticeComponent } from './notice/notice.component';
import { CodePreviewComponent } from './code-preview/code-preview.component';
import { CoreModule } from '../../../core';
import {TranslationModule} from '../../../../modules/i18n/translation.module';
import { AdvertisingGestionComponent } from './advertising-gestion/advertising-gestion.component';
import {AdvanceTablesWidget1Component} from '../widgets/advance-tables/advance-tables-widget1/advance-tables-widget1.component';
import { WorkerGestionComponent } from './worker-gestion/worker-gestion.component'


// import { WorkerCardComponent } from './worker-card/worker-card.component';

@NgModule({
  declarations: [NoticeComponent, CodePreviewComponent, AdvertisingGestionComponent, AdvanceTablesWidget1Component, WorkerGestionComponent],
  imports: [
    CommonModule,
    CoreModule,
    HighlightModule,
    PerfectScrollbarModule,
    TranslationModule,
    // ngbootstrap
    NgbNavModule,
    NgbTooltipModule,
    InlineSVGModule,
    BrowserModule
  ],
  exports: [NoticeComponent, CodePreviewComponent, AdvertisingGestionComponent, AdvanceTablesWidget1Component],
})
export class GeneralModule {}
