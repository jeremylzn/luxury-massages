import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth.component';
import { AuthService } from './_services/auth.service';
import { AuthHTTPService } from './_services/auth-http/auth-http.service';
import {TranslationModule} from '../i18n/translation.module';
import { SendTokenInterceptorService } from 'src/app/modules/auth/_services/send-token-interceptor.service';
import { RegistrationWorkerComponent } from './registration-worker/registration-worker.component';
import { LoginWorkerComponent } from './login-worker/login-worker.component';
import { ConfidentialComponent } from './confidential/confidential.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';


// function appInitializer(authService: AuthService) {
//   return () => {
//     return new Promise((resolve) => {
//       authService.getUserByToken().subscribe().add(resolve);
//     });
//   };
// }

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    RegistrationWorkerComponent,
    LoginWorkerComponent,
    ConfidentialComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [AuthHTTPService,AuthService]
})
export class AuthModule {}
