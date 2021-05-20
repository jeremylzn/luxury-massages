import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { environment } from 'src/environments/environment';
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/_metronic/core/models/appointment.model';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';



@Component({
  selector: 'app-scheduler-widget3',
  templateUrl: './scheduler-widget3.component.html',
  styleUrls: ['./scheduler-widget3.component.scss']
})
export class SchedulerWidget3Component implements OnInit {

  title = 'luxury-massage';
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  name:string;
  date:string;
  Events = []
  public dataNotCompleted:Observable<Appointment[]>;
  selectedTime = '00:00:00';
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  
  constructor(public bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.notCompleted.subscribe((res)=>{
      for (var event of res){
      this.Events.push({date: event.dateStr, title:event.serviceDetails[0].name, fullname:event.customerDetails.fullname, datetime:event.dateStr + ' - ' + event.timeStr, minutes:event.serviceDetails[0].minutes, address:event.customerDetails.address})
    }
    })

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: heLocale,
      eventClick: this.eventClick.bind(this), // bind is important!
      eventBackgroundColor: "rgb(180, 180, 180)",
      eventBorderColor: "rgb(180, 180, 180)",
      eventColor: "rgb(0, 0, 0)",
      eventClassNames: "event-data",
      height: 500,
      events: this.Events,
      eventContent : this.eventContent.bind(this)
    };
  }

  eventClick(info) {
    Swal.fire({
      title: `פרטי משמרת`,
      html: '<h4>'+ info.event.title+'</h4><br />' + 
      '<p dir="rtl"><b>התחלה:</b> '+ info.event.extendedProps.datetime +'<br />' + 
      '<p dir="rtl"><b>זמן:</b> '+ info.event.extendedProps.minutes +' דק<br />' + 
      '<p dir="rtl"><b>שם הלקוח:</b> '+ info.event.extendedProps.fullname +'<br />' + 
      '<p dir="rtl"><b>כתובת הלקוח:</b> '+ info.event.extendedProps.address +'<br />',
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

    let arrayOfDomNodes = [ titleEl,  textEl, smallEl]

    return { domNodes: arrayOfDomNodes }
  }


}
