import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-redirect',
  templateUrl: './payment-redirect.component.html',
  styleUrls: ['./payment-redirect.component.scss']
})
export class PaymentRedirectComponent implements OnInit {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private router:Router, private bookingService:BookingService) { }

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id
    let req = JSON.parse(localStorage.getItem(id))
    let message =  'הזמנה : '  + '\n' + 'שם טיפול : '
    message +=  req.serviceDetails.name + '\n'
    message +=   'זמן טיפול : '
    message +=  req.serviceDetails.minutes + ' דק \n'
    message +=   'כתובת : '
    message +=  req.customerDetails.address + ' \n'
    message +=   'תאריך : '
    message +=  req.timeStr + ' ' + req.dateStr + ' \n'
    message +=   'שם המטפל : '
    message +=  req.workerDetails.fullname + ' \n'
    let user = [req.customerDetails]
    this.bookingService.sendSms(message, user).subscribe((res)=>{})
    this.bookingService.addAppoitment(req).subscribe((res) => { })
    this.router.navigate(['/dashboard/therapy'])
  }

}
