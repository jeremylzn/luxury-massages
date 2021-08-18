import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditSms } from 'src/app/_metronic/core/models/credit-sms.model';
import { customerDetails } from 'src/app/_metronic/core/models/customerDetails.model';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-sms-gestion',
  templateUrl: './sms-gestion.component.html',
  styleUrls: ['./sms-gestion.component.scss']
})
export class SmsGestionComponent implements OnInit {
  @ViewChild('checkbox', { static: true }) checkboxEl: ElementRef;

  public allUsers:Observable<customerDetails[]>;
  public creditSms:Observable<CreditSms>;
  public searchFilter: any = '';
  public query: any = '';
  public allRecipients:customerDetails[] = []
  public textarea_message:string= ''
  public displayCustomers = true;
  public displayWorkers = false;


  constructor(private renderer: Renderer2, private bookingService:BookingService, private usersService:UsersService) { }
  @ViewChildren("checkbox") checkbox: QueryList<ElementRef>

  ngOnInit(): void {
    this.allUsers = this.usersService.customers; // subscribe to entire collection
    this.usersService.getAllCustomers();

    this.creditSms = this.bookingService.creditSms; // subscribe to entire collection
    this.bookingService.getCreditSms();
  }


  onClickTab(role, customerEl:Element, workerEl:Element, phoneEl:Element){
    if (role==2){
      this.displayCustomers = false;
      this.displayWorkers = true;
      this.allUsers = this.usersService.workers; // subscribe to entire collection
      this.usersService.getAllWorkers();
      this.renderer.removeClass(customerEl, 'active');
      this.renderer.removeClass(phoneEl, 'active');
      this.renderer.addClass(workerEl, 'active');
      this.checkboxEl.nativeElement.checked = false
    } else if (role==3){
      this.displayCustomers = true;
      this.displayWorkers = false;
      this.allUsers = this.usersService.customers; // subscribe to entire collection
      this.usersService.getAllCustomers();
      this.renderer.removeClass(workerEl, 'active');
      this.renderer.removeClass(phoneEl, 'active');
      this.renderer.addClass(customerEl, 'active');
      this.checkboxEl.nativeElement.checked = false
    } else {
      this.displayCustomers = false;
      this.displayWorkers = false;
      this.renderer.removeClass(workerEl, 'active');
      this.renderer.removeClass(customerEl, 'active');
      this.renderer.addClass(phoneEl, 'active');
    }
  }

  addRecipient(user){
    user['customerID'] = user._id
    if (!this.allRecipients.includes(user))
      this.allRecipients.push(user)
  }

  removeRecipient(user){
    var index = this.allRecipients.indexOf(user);
    if (index !== -1)
      this.allRecipients.splice(index, 1);
  }

  sendMessage(){
    if (this.displayCustomers || this.displayWorkers){
      this.bookingService.sendSms(this.textarea_message, this.allRecipients).subscribe((res)=>{
        Swal.fire({
          icon: 'success',
          title: 'הודעה נשלח בהצלחה',
          showConfirmButton: false,
          timer: 1500
        })
        this.creditSms = this.bookingService.creditSms; // subscribe to entire collection
        this.bookingService.getCreditSms();
      })
    } else {
      this.bookingService.sendSmstoNumber(this.textarea_message, this.query).subscribe((res)=>{
        Swal.fire({
          icon: 'success',
          title: 'הודאה נשלח בהצלחה',
          showConfirmButton: false,
          timer: 1500
        })
        this.textarea_message = ''
        this.query = ''
        this.creditSms = this.bookingService.creditSms; // subscribe to entire collection
        this.bookingService.getCreditSms();
      })
    }
  }

  allSelectedCheckbox(){
    if (this.displayCustomers)
      this.allRecipients = this.usersService.customersStore
    else if (this.displayWorkers)
      this.allRecipients = this.usersService.workerStore

    for (let user of this.allRecipients)
      user['customerID'] = user._id
  }
}
