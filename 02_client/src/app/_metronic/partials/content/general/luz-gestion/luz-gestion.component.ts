import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import timeGridPlugin from '@fullcalendar/timegrid';
import { environment } from 'src/environments/environment';
import { UsersService } from 'src/app/_metronic/core/services/users.service';

@Component({
  selector: 'app-luz-gestion',
  templateUrl: './luz-gestion.component.html',
  styleUrls: ['./luz-gestion.component.scss']
})
export class LuzGestionComponent implements OnInit {
  calendarOptions: CalendarOptions;
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  Events = []

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [ timeGridPlugin ],
      // businessHours: true, // display business hours
      initialView: 'timeGridWeek',
      locale: heLocale,
      eventBackgroundColor: "rgb(255,255,255)",
      eventBorderColor: "rgb(255,255,255)",
      eventColor: "rgb(0, 0, 0)",
      dateClick: this.dateClick.bind(this), // bind is important!
      events: this.Events,
      height: 600,
      slotDuration: '01:00'
    };


    
    this.usersService.getDisabled().subscribe((res:any[])=> {
      for (let event of res){
        this.Events.push({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), id:event.id, color: '#777777',display: 'background', allDay:event.allDay})
        this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), id:event.id, color: '#777777',display: 'background', allDay:event.allDay})
      }
    })
  }

  sendList(){
    this.usersService.insertDisabled(this.Events).subscribe((res:any)=>{
      res.message == 'OK' ? Swal.fire('מעודכן', '', 'success') : Swal.fire('שגיאה', '', 'error')
    })
  }

  dateClick(info) {    
    if (this.calendarComponent.getApi().getEventById(info.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id)){
      this.Events = this.removeByValue(this.Events, info.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id);
      this.calendarComponent.getApi().getEventById(info.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id).remove();
    } else {
      if (info.allDay){
        let all_events = this.calendarComponent.getApi().getEvents()
        for (let inf of all_events){
          let date = new Date(inf.extendedProps.dateStr)
          if (this.datesAreOnSameDay(date, info.date)){
            this.Events = this.removeByValue(this.Events, inf.id);
            this.calendarComponent.getApi().getEventById(inf.id).remove();
          }
        }
      }
      this.Events.push({dateStr:info.dateStr, start:info.date, end:info.date, id:info.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id, color: '#777777',display: 'background', allDay:info.allDay})
      this.calendarComponent.getApi().addEvent({dateStr:info.dateStr, start:info.date, end:info.date, id:info.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id, color: '#777777',display: 'background', allDay:info.allDay})
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

  datesAreOnSameDay(first, second){
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
  }

}
