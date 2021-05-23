import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { UsersService } from 'src/app/_metronic/core/services/users.service';

@Component({
  selector: 'app-scheduler-widget-week',
  templateUrl: './scheduler-widget-week.component.html',
  styleUrls: ['./scheduler-widget-week.component.scss']
})
export class SchedulerWidgetWeekComponent implements OnInit {
  calendarOptions: CalendarOptions;
  title = 'luxury-massage';
  Events = []
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private cd: ChangeDetectorRef, private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.getAvailability(JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id).subscribe((res:any[]) => {
      console.log(res)
      this.Events = res
      for (let event of res)
        this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, date:event.date, id:event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id})
    });
    this.calendarOptions = {
      initialView: 'dayGridWeek',
      locale: heLocale,
      dateClick: this.dateClick.bind(this), // bind is important!
      eventClick: this.eventClick.bind(this), // bind is important!
      eventBackgroundColor: "rgb(255,255,255)",
      eventBorderColor: "rgb(255,255,255)",
      eventColor: "rgb(0, 0, 0)",
      height: 210,
      eventContent: this.eventContent.bind(this),
      events: this.Events,
    };
  }

  eventClick(info) {
    console.log(this.Events)
  }

  eventContent(info, createElement) {
    let main = document.createElement('div')
    main.innerHTML = '&#10004;'

    return { domNodes: [main] }
  }

  dateClick(event) {
    if (this.calendarComponent.getApi().getEventById(event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id)){
      this.Events = this.removeByValue(this.Events, event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id);
      this.calendarComponent.getApi().getEventById(event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id).remove();
    } else {
      this.Events.push({dateStr:event.dateStr, date:event.date, id:event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id})
      this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, date:event.date, id:event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id})
    }
  }


  removeByValue(arr, value){
    var index;
    for (let i in arr){
      if (arr[i].id == value)
        index = i
    }
    arr.splice(index, 1);
    return arr
  }


  send_availibility(events){
    this.usersService.sendAvailability(JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id, events).subscribe(res => {
      console.log(res)
    })
    console.log(events)
  }

}
