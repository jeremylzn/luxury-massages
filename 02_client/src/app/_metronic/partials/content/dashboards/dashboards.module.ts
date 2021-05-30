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
  { path: 'article/more', component: ArticleMoreComponent},
  { path: 'therapy', component: TherapyComponent}

];

@NgModule({
  declarations: [Dashboard1Component, Dashboard2Component, DashboardWrapperComponent, Dashboard3Component, WorkerCardComponent, 
    FeaturedCarouselComponent, ArticleCardComponent, TherapyComponent, TruncatePipeSecond, ArticleMoreComponent],
  imports: [CommonModule, WidgetsModule, TranslationModule, RouterModule.forChild(routes)],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptorService, multi: true }],
  exports: [DashboardWrapperComponent, WorkerCardComponent, Dashboard3Component],
})
export class DashboardsModule { }
