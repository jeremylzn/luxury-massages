import { ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import timeGridPlugin from '@fullcalendar/timegrid';




@Component({
  selector: 'app-scheduler-widget-week',
  templateUrl: './scheduler-widget-week.component.html',
  styleUrls: ['./scheduler-widget-week.component.scss']
})
export class SchedulerWidgetWeekComponent implements OnInit {
  calendarOptions: CalendarOptions;
  title = 'luxury-massage';
  Events = []
  Disabled = []
  interval;
  isEvent = false;
  saved = false;
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private cd: ChangeDetectorRef, private usersService:UsersService,  private route: ActivatedRoute, private router: Router, private render:Renderer2) { }

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [ timeGridPlugin ],
      initialView: 'timeGridWeek',
      locale: heLocale,
      dateClick: this.dateClick.bind(this), // bind is important!
      eventClick: this.eventClick.bind(this), // bind is important!
      eventBackgroundColor: "rgb(255,255,255)",
      eventBorderColor: "rgb(255,255,255)",
      eventColor: "rgb(0, 0, 0)",
      events: this.Events,
      height: 600,
      slotDuration: '01:00'
    };


    this.usersService.getAvailability(JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id).subscribe((res:any[]) => {
      for (let event of res){
        this.Events.push({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), reason:event.reason, id:event.id,  color: '#9ACD32',display: 'background', allDay:event.allDay})
        this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), reason:event.reason, id:event.id,  color: '#9ACD32',display: 'background', allDay:event.allDay})
      }
    });

    this.usersService.getDisabled().subscribe((res:any[])=> {
      for (let event of res){
        this.Disabled.push({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), id:event.id, color: '#777777',display: 'background', overlap:false, allDay:event.allDay})
        this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), id:event.id, color: '#777777',display: 'background', overlap:false, allDay:event.allDay})
      }
    })

  }

  eventClick(info) {
    this.isEvent = true
  }

  async dateClick(event) {
    if(this.isEvent){
      this.isEvent = false
    } else {
      if (this.calendarComponent.getApi().getEventById(event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id)){
        this.Events = this.removeByValue(this.Events, event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id);
        this.calendarComponent.getApi().getEventById(event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id).remove();
      } else {
        if (!event.allDay){
          var { value: hours } = await Swal.fire({
            input: 'number',
            inputLabel: 'כמה שעות ?'
          })
        } else {
          var hours = 1
          for (let ev of this.Disabled){
            if (this.datesAreOnSameDay(event.date, ev.start))
              return 
          }
        }
        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'למלא אם יש סיבת אילוצים'
        })
        this.Events.push({dateStr:event.dateStr, start:event.date, end:this.addMinutes(event.date, hours*60), reason:text, id:event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id, color: '#9ACD32',display: 'background', allDay:event.allDay})
        this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, start:event.date, end:this.addMinutes(event.date, hours*60), reason:text, id:event.dateStr + '-' + JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id, color: '#9ACD32',display: 'background', allDay:event.allDay})
      }
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
      this.router.navigate(['/dashboard']);  
    })
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  datesAreOnSameDay(first, second){
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
  }


}
