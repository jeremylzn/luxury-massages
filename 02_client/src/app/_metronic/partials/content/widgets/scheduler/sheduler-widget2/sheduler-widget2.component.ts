import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/daygrid';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { BookingService } from 'src/app/_metronic/core/services/booking.service';

@Component({
  selector: 'app-sheduler-widget2',
  templateUrl: './sheduler-widget2.component.html',
  styleUrls: ['./sheduler-widget2.component.scss']
})
export class ShedulerWidget2Component implements OnInit {
  title = 'luxury-massage';
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  name:string;
  date:string;
  selectedTime = '00:00:00';
  Events = []
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: heLocale,
      dateClick: this.dateClick.bind(this), // bind is important!
      eventClick: this.eventClick.bind(this), // bind is important!
      eventBackgroundColor: "rgb(180, 180, 180)",
      eventBorderColor: "rgb(180, 180, 180)",
      eventColor: "rgb(0, 0, 0)",
      events: JSON.parse(localStorage.getItem('Events')),
      eventContent : this.eventContent.bind(this)
    };
  }

  eventClick(info) {
    console.log(info.event.title)
    console.log(info.event.extendedProps.datetime)
    console.log(info.event.extendedProps.minutes)
 
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

  dateClick(event) {
    console.log(event)
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
