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
  closeResult: string;
  selectedTime;
  showModal: boolean = false;
  Events = []
  public current_event;
  public alertMessage=false;
  ads = []
  public current_req; // value to the modal
  public all_availables_workers: Observable<any>; // value to the modal
  public all_urls_profile = [];
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef, private bookingService: BookingService, private usersService: UsersService, private advertisingService: AdvertisingService) { }

  ngOnInit(): void {
    this.calendarOptions = {
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

    this.advertisingService.getAdsIds().subscribe((res) => {
      for (let index in res) {
        this.advertisingService.getAdsImage(res[index]).subscribe(x => {
          this.ads.push(x)
          this.refresh()
        })
      }
    })
  }

  eventClick(info) {
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

  eventContent(info, createElement) {
    let titleEl = document.createElement('b')
    titleEl.innerHTML = info.event.title
    let textEl = document.createElement('p')
    textEl.innerHTML = info.event.extendedProps.fullname
    let smallEl = document.createElement('small')
    smallEl.innerHTML = info.event.extendedProps.datetime

    let arrayOfDomNodes = [titleEl, textEl, smallEl]

    return { domNodes: arrayOfDomNodes }
  }

  refresh() {
    this.cd.detectChanges();
  }


  dateClick(event) {
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

  ConfirmAppointment(worker){
    if (this.selectedTime){
      const serviceDetails = JSON.parse(localStorage.getItem('_id_service'))
      var data = JSON.parse(localStorage.getItem(this.authLocalStorageToken))
      const customerDetails = { customerID: data.user._id, fullname: data.user.fullname, telephone: data.user.telephone, address: data.user.address, email: data.user.email, distributor: data.user.distributor }
      this.current_req = { date: this.current_event.date, dateStr: this.current_event.dateStr, customerDetails: customerDetails, serviceDetails: serviceDetails }
      this.current_req.date = new Date(this.current_req.dateStr + ' ' + this.selectedTime);
      this.current_req['timeStr'] = this.selectedTime
      this.current_req['workerDetails'] = {workerID: worker._id, fullname:worker.fullname, telephone:worker.telephone, email:worker.email}
      this.current_req['approved'] = true
      this.bookingService.addAppoitment(this.current_req).subscribe((res) => { this.modalReference.close();})
      this.alertMessage = false
      this.selectedTime = ''
    } else this.alertMessage = true

  }


  test() {
    return '<div class="card-body pt-0 pb-3">'+
        '<div class="tab-content">'+
          '<div class="table-responsive">'+
            '<table class="table table-head-custom table-vertical-center table-head-bg table-borderless">'+
              '<thead><tr class="text-left">'+
                  '<th style="min-width: 250px" class="pl-7"><span class="text-dark-75">products</span></th>'+
                  '<th style="min-width: 120px">earnings</th>'+
                  '<th style="min-width: 100px">comission</th>'+
                  '<th style="min-width: 100px">company</th>'+
                  '<th style="min-width: 100px">rating</th>'+
                  '<th style="min-width: 100px"></th>'+
                '</tr></thead>'+
                '<tbody><tr>'+
                  '<td class="pl-0 py-8"><div class="d-flex align-items-center"><div class="symbol symbol-50 symbol-light mr-4">'+
                    '<span class="symbol-label"><span class="svg-icon h-75 align-self-end">'+
                      '<img src="images/ico_mandatory.gif"></img>' +
                    '</span></span></div><div>'+
                    '<a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Brad Simmons</a>'+
                    '<span class="text-muted font-weight-bold d-block">HTML, JS, ReactJS</span></div></div></td>'+
                  '<td><span class="text-dark-75 font-weight-bolder d-block font-size-lg">$8,000,000</span><span class="text-muted font-weight-bold"> In Proccess </span></td>'+
                  '<td><span class="text-dark-75 font-weight-bolder d-block font-size-lg">$520</span><span class="text-muted font-weight-bold"> Paid </span></td>'+
                  '<td><span class="text-dark-75 font-weight-bolder d-block font-size-lg">Intertico</span><span class="text-muted font-weight-bold">Web, UI/UX Design</span></td>'+
                  '<td><img src="./assets/media/logos/stars.png" alt="image" style="width: 5rem"/><span class="text-muted font-weight-bold d-block">Best Rated</span></td>'+
                  '<td class="pr-0 text-right"><a href="#" class="btn btn-light-success font-weight-bolder font-size-sm">View Offer</a></td>'+
                '</tr></tbody></table></div></div></div></div>'
  }

}