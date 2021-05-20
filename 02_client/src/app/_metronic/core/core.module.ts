import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { SendTokenInterceptorService } from 'src/app/modules/auth/_services/send-token-interceptor.service';
import { ItemServiceService } from './services/item-service.service'
import { BookingService } from './services/booking.service'
import { UsersService } from './services/users.service'


@NgModule({
  declarations: [FirstLetterPipe, SafePipe],
  imports: [CommonModule, HttpClientModule],
  providers: [ItemServiceService,
    BookingService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptorService, multi: true }],
  exports: [FirstLetterPipe, SafePipe],
})
export class CoreModule { }
