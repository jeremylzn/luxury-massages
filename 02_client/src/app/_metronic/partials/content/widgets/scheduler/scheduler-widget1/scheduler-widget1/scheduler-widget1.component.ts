import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/daygrid';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@Component({
  selector: 'app-scheduler-widget1',
  templateUrl: './scheduler-widget1.component.html',
  styleUrls: ['./scheduler-widget1.component.scss']
})
export class SchedulerWidget1Component implements OnInit {
  @ViewChild('content') content : any;
  modalReference: any;
  title = 'luxury-massage';
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  name: string;
  date: string;
  termChecked = false;
  messageAlertTerm = false;
  closeResult: string;
  selectedTime;
  selectedWorker;
  showModal: boolean = false;
  Events = []
  Disabled = []
  isDisable = false
  public current_event;
  public alertMessage=false;
  public alertMessageDisable=false;
  adsIdsList: Observable<string[]>;
  pattern = 'https://luxury-massages.com/ads/'
  patternTerms = 'https://luxury-massages.com/dashboard/terms'
  public current_req; // value to the modal
  public all_availables_workers: Observable<any>; // value to the modal
  public all_urls_profile = [];
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef, private bookingService: BookingService, private usersService: UsersService, private advertisingService: AdvertisingService, private router: Router) { }

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [ interactionPlugin ],
      initialView: 'dayGridMonth',
      locale: heLocale,
      dateClick: this.dateClick.bind(this), // bind is important!
      eventBackgroundColor: "rgb(180, 180, 180)",
      eventBorderColor: "rgb(180, 180, 180)",
      eventColor: "rgb(0, 0, 0)",
      eventClick: this.eventClick.bind(this), // bind is important!
      events: JSON.parse(localStorage.getItem('Events')),
      eventContent: this.eventContent.bind(this)
    };
    
    this.adsIdsList = this.advertisingService.adsIds; // subscribe to entire collection
    this.advertisingService.getAdsIds();

    this.usersService.getDisabled().subscribe((res:any[])=> {
      for (let event of res){
        this.Disabled.push({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), id:event.id, color: '#777777',display: 'background', overlap:false, allDay:event.allDay, disabled: true})
        this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), id:event.id, color: '#777777',display: 'background', overlap:false, allDay:event.allDay, disabled: true})
      }
    })
  }

  eventClick(info) {
    if (info.event.extendedProps.disabled){
      this.isDisable = true
    } else{
      Swal.fire({
        title: `פרטי הזמנה`,
        html: '<h4>' + info.event.title + '</h4><br />' +
          '<p dir="rtl"><b>התחלה:</b> ' + info.event.extendedProps.datetime + '<br />' +
          '<p dir="rtl"><b>זמן:</b> ' + info.event.extendedProps.minutes + ' דק<br />' +
          '<p dir="rtl"><b>שם הלקוח:</b> ' + info.event.extendedProps.fullname + '<br />' +
          '<p dir="rtl"><b>כתובת הלקוח:</b> ' + info.event.extendedProps.address + '<br />',
        showCancelButton: false,
        confirmButtonText: `סגור`,
      })
    }
  }


  eventContent(info, createElement) {
    if (info.event.extendedProps.disabled){
      let titleEl = document.createElement('b')
      titleEl.innerHTML = 'סגור'
      var arrayOfDomNodes = [titleEl]
    } else {
      let titleEl = document.createElement('b')
      titleEl.innerHTML = info.event.title
      let textEl = document.createElement('p')
      textEl.innerHTML = info.event.extendedProps.fullname
      let smallEl = document.createElement('small')
      smallEl.innerHTML = info.event.extendedProps.datetime
  
      var arrayOfDomNodes = [titleEl, textEl, smallEl]
    }
    return { domNodes: arrayOfDomNodes }
  }

  refresh() {
    this.cd.detectChanges();
  }


  dateClick(event) {
    if (this.isDisable){
      this.isDisable = false
    } else {
      this.current_event = event
      this.all_urls_profile = []
      const serviceDetails = JSON.parse(localStorage.getItem('_id_service'))
      this.usersService.getAvailableWorkers(event.date.toString(), serviceDetails.minutes.toString()).subscribe((res:any) => {
          this.all_availables_workers = res
          res.forEach((worker, index) => {
            this.usersService.getProfilePicture('URL', worker._id).subscribe(x => this.all_availables_workers[index].img = x)
        });
      });
      this.modalReference = this.modalService.open(this.content, { size: 'lg' });
    }
  }


  selectWorker(worker, event){
    this.selectedWorker = worker
    var myElement = document.getElementsByClassName('active');
    if(myElement[0])
      myElement[0].classList.remove("active");
    var currentElement = document.getElementById('worker_' + worker._id);
    currentElement.classList.add("active");
  }

  ConfirmAppointmentCard(){
    console.log('test')
    console.log(this.termChecked)
    if (!this.termChecked){
      this.messageAlertTerm = !this.messageAlertTerm
      console.log('IN IF')
      console.log(this.messageAlertTerm)
    }
    else if (this.selectedTime && this.selectedWorker){
      let hours = this.selectedTime.split(":")[0];
      let minutes = this.selectedTime.split(":")[1];
      let now = this.current_event.date
      now.setHours(hours)
      now.setMinutes(minutes)
      for (let event of this.Disabled){
        if (now >= event.start && now <= this.addHours(event.start, 1)){
          this.alertMessageDisable = true
          this.alertMessage = false
          this.messageAlertTerm = false
          return
        }
      }
      const serviceDetails = JSON.parse(localStorage.getItem('_id_service'))
      var data = JSON.parse(localStorage.getItem(this.authLocalStorageToken))
      const customerDetails = { customerID: data.user._id, fullname: data.user.fullname, telephone: data.user.telephone, address: data.user.address, email: data.user.email, distributor: data.user.distributor }
      this.current_req = { date: this.current_event.date, dateStr: this.current_event.dateStr, customerDetails: customerDetails, serviceDetails: serviceDetails }
      this.current_req.date = new Date(this.current_req.dateStr + ' ' + this.selectedTime);
      this.current_req['timeStr'] = this.selectedTime
      this.current_req['workerDetails'] = {workerID: this.selectedWorker._id, fullname:this.selectedWorker.fullname, telephone:this.selectedWorker.telephone, email:this.selectedWorker.email}
      this.current_req['approved'] = true
      localStorage.setItem(data.user._id, JSON.stringify(this.current_req))
      this.selectedTime = ''
      this.alertMessage = false
      this.alertMessageDisable = false
      this.termChecked = false
      this.bookingService.CBPayment(serviceDetails.price, data.user.fullname, data.user.telephone,data.user.email, data.user._id, data.user.address, data.user.distributor, serviceDetails.name).subscribe((res:any)=>{ window.location.href = res; })
    } else this.alertMessage = true; this.alertMessageDisable = false ;


  }


  ConfirmAppointmentBit(){
    if (!this.termChecked){
      this.messageAlertTerm = !this.messageAlertTerm
    }
    else if (this.selectedTime && this.selectedWorker){
      let hours = this.selectedTime.split(":")[0];
      let minutes = this.selectedTime.split(":")[1];
      let now = this.current_event.date
      now.setHours(hours)
      now.setMinutes(minutes)
      for (let event of this.Disabled){
        if (now >= event.start && now <= this.addHours(event.start, 1)){
          this.alertMessageDisable = true
          this.alertMessage = false
          this.messageAlertTerm = false
          return
        }
      }
      const serviceDetails = JSON.parse(localStorage.getItem('_id_service'))
      var data = JSON.parse(localStorage.getItem(this.authLocalStorageToken))
      const customerDetails = { customerID: data.user._id, fullname: data.user.fullname, telephone: data.user.telephone, address: data.user.address, email: data.user.email, distributor: data.user.distributor }
      this.current_req = { date: this.current_event.date, dateStr: this.current_event.dateStr, customerDetails: customerDetails, serviceDetails: serviceDetails }
      this.current_req.date = new Date(this.current_req.dateStr + ' ' + this.selectedTime);
      this.current_req['timeStr'] = this.selectedTime
      this.current_req['workerDetails'] = {workerID: this.selectedWorker._id, fullname:this.selectedWorker.fullname, telephone:this.selectedWorker.telephone, email:this.selectedWorker.email}
      this.current_req['approved'] = true
      localStorage.setItem(data.user._id, JSON.stringify(this.current_req))
      this.selectedTime = ''
      this.alertMessage = false
      this.alertMessageDisable = false
      this.bookingService.BitPayment(serviceDetails.price, data.user.fullname, data.user.telephone,data.user.email, data.user._id, data.user.address, data.user.distributor, serviceDetails.name).subscribe((res:any)=>{ window.location.href = res; })
    } else this.alertMessage = true; this.alertMessageDisable = false ; this.messageAlertTerm = false


  }


  addHours(date, hours) {
    return new Date(date.getTime() + hours*60000*60);
  }

  checkingTerm(){
    this.termChecked = !this.termChecked
  }

}