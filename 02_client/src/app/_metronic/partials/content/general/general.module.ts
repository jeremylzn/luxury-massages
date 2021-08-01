import { NgModule } from '@angular/core';
import { CommonModule, DatePipe  } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { FormsModule } from '@angular/forms';
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
import { FullCalendarModule } from '@fullcalendar/angular';
import { DistributorGestionComponent } from './distributor-gestion/distributor-gestion.component'; 
import {ListsWidget1Component} from '../widgets/lists/lists-widget1/lists-widget1.component';
import { AdvanceTablesWidget7Component } from '../widgets/advance-tables/advance-tables-widget7/advance-tables-widget7.component';
import { ArticleGestionComponent } from './article-gestion/article-gestion.component';
import { SendTokenInterceptorService } from 'src/app/modules/auth/_services/send-token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryGestionComponent } from './gallery-gestion/gallery-gestion.component';
import { SmsGestionComponent } from './sms-gestion/sms-gestion.component';
import { FilterPipe } from './pipe-filter'; // -> imported filter pipe
import { HighlightDirective } from './highlight.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { LuzGestionComponent } from './luz-gestion/luz-gestion.component';




// import { WorkerCardComponent } from './worker-card/worker-card.component';

@NgModule({
  declarations: [NoticeComponent, CodePreviewComponent, AdvertisingGestionComponent, AdvanceTablesWidget1Component, WorkerGestionComponent, DistributorGestionComponent, ListsWidget1Component, AdvanceTablesWidget7Component, ArticleGestionComponent, GalleryComponent, GalleryGestionComponent, SmsGestionComponent, FilterPipe, HighlightDirective, SearchFilterPipe, LuzGestionComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    HighlightModule,
    PerfectScrollbarModule,
    TranslationModule,
    // ngbootstrap
    NgbNavModule,
    NgbTooltipModule,
    InlineSVGModule,
    BrowserModule,
    FullCalendarModule,
  ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptorService, multi: true }],
  exports: [NoticeComponent, CodePreviewComponent, AdvertisingGestionComponent, AdvanceTablesWidget1Component,ListsWidget1Component, AdvanceTablesWidget7Component],
})
export class GeneralModule {}
