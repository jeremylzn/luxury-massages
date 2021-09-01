import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { MassagesListComponent } from '../widgets/data-massages/list-services/massages-list/massages-list.component';
import { CarouselComponent } from '../widgets/carousel/carousel/carousel.component';
import { SchedulerWidget1Component } from '../widgets/scheduler/scheduler-widget1/scheduler-widget1/scheduler-widget1.component';
import { SchedulerWidget3Component } from '../widgets/scheduler/scheduler-widget3/scheduler-widget3.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { WidgetsModule } from '../widgets/widgets.module';
// import {DashboardRoutingModule} from './dashboard3/dashboard-routing.module'
import { Routes, RouterModule } from '@angular/router';
import { WorkerCardComponent } from '../general/worker-card/worker-card.component';
import { AdvertisingGestionComponent } from '../general/advertising-gestion/advertising-gestion.component';
import { WorkerGestionComponent } from '../general/worker-gestion/worker-gestion.component';
import {TranslationModule} from '../../../../modules/i18n/translation.module';
import { SendTokenInterceptorService } from 'src/app/modules/auth/_services/send-token-interceptor.service';
import { SchedulerWidgetWeekComponent } from '../widgets/scheduler/scheduler-widget-week/scheduler-widget-week.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FeaturedCarouselComponent } from 'src/app/pages/_layout/components/featured-carousel/featured-carousel.component';
import { ArticleCardComponent } from 'src/app/pages/_layout/components/article-card/article-card.component';
import { TherapyComponent } from 'src/app/pages/_layout/components/therapy/therapy.component';
import { DistributorGestionComponent } from '../general/distributor-gestion/distributor-gestion.component'; 
import { ArticleGestionComponent } from '../general/article-gestion/article-gestion.component';
import {  TruncatePipeSecond}   from './pipe-limit';
import { ArticleMoreComponent } from 'src/app/pages/_layout/components/article-more/article-more.component';
import { GalleryComponent } from '../general/gallery/gallery.component';
import { GalleryGestionComponent } from '../general/gallery-gestion/gallery-gestion.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SmsGestionComponent } from '../general/sms-gestion/sms-gestion.component';
import { LuzGestionComponent } from '../general/luz-gestion/luz-gestion.component';
import { AboutComponent } from '../general/about/about.component'; // ->  imported directive
import { AdvanceTablesWidget9Component } from '../widgets/advance-tables/advance-tables-widget9/advance-tables-widget9.component';
import { AdvanceTablesWidget10Component } from '../widgets/advance-tables/advance-tables-widget10/advance-tables-widget10.component';
import { TermsComponent } from '../general/terms/terms.component';







const routes: Routes = [
  {
    path: '',
    component: DashboardWrapperComponent,
  },
  { path: 'booking', component: SchedulerWidget1Component },
  { path: 'profile', component: WorkerCardComponent},
  { path: 'admin/ads', component: AdvertisingGestionComponent},
  { path: 'admin/scheduler', component: SchedulerWidget3Component},
  { path: 'availabilities', component: SchedulerWidgetWeekComponent},
  { path: 'admin/worker', component: WorkerGestionComponent},
  { path: 'admin/distributor', component: DistributorGestionComponent},
  { path: 'admin/article', component: ArticleGestionComponent},
  { path: 'article/more/:id', component: ArticleMoreComponent},
  { path: 'therapy', component: TherapyComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'admin/gallery', component: GalleryGestionComponent},
  { path: 'admin/sms', component: SmsGestionComponent},
  { path: 'admin/luz', component: LuzGestionComponent},
  { path: 'about', component: AboutComponent},
  {path: 'reviews', component: AdvanceTablesWidget9Component},
  {path: 'admin/reviews', component: AdvanceTablesWidget10Component},
  {path: 'terms', component: TermsComponent}
];

@NgModule({
  declarations: [Dashboard1Component, Dashboard2Component, DashboardWrapperComponent, Dashboard3Component, WorkerCardComponent, 
    FeaturedCarouselComponent, ArticleCardComponent, TherapyComponent, TruncatePipeSecond, ArticleMoreComponent],
  imports: [CommonModule, WidgetsModule, ShareButtonsModule.withConfig({debug: true}), ShareIconsModule, TranslationModule, RouterModule.forChild(routes)],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptorService, multi: true }],
  exports: [DashboardWrapperComponent, WorkerCardComponent, Dashboard3Component],
})
export class DashboardsModule { }
