import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LogoutComponent} from './logout/logout.component';
import {RegistrationWorkerComponent} from './registration-worker/registration-worker.component'
import {LoginWorkerComponent} from './login-worker/login-worker.component'
import { ConfidentialComponent } from './confidential/confidential.component';




const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {returnUrl: window.location.pathname}
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'worker/login',
        component: LoginWorkerComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'confidential',
        component: ConfidentialComponent
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
