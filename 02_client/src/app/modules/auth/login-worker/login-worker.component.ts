import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-worker',
  templateUrl: './login-worker.component.html',
  styleUrls: ['./login-worker.component.scss']
})
export class LoginWorkerComponent implements OnInit {

  // KeenThemes mock, change it to:
  // defaultAuth = {
  //   email: '',
  //   password: '',
  // };
  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;


  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router, private bookingService:BookingService) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: UserModel) => {
        this.bookingService.getAppointmentByWorkerID(JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id).subscribe((res:any) => {
          console.log(res)
          var Events = []
          for (var item of res) {
            Events.push({title: 'טיפול' + item.serviceDetails[0].name, date: item.dateStr , datetime: item.dateStr + ' - ' + item.timeStr, minutes :item.serviceDetails[0].minutes, fullname :item.customerDetails.fullname, address :item.customerDetails.address})
          }
          localStorage.setItem('Events', JSON.stringify(Events))
          this.router.navigate([this.returnUrl]);
        })
      }, (err) => { this.hasError = true; });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
