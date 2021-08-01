import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/_metronic/core/models/appointment.model';
import { customerDetails } from 'src/app/_metronic/core/models/customerDetails.model';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import timeGridPlugin from '@fullcalendar/timegrid';



@Component({
  selector: 'app-worker-gestion',
  templateUrl: './worker-gestion.component.html',
  styleUrls: ['./worker-gestion.component.scss']
})
export class WorkerGestionComponent implements OnInit {
  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;

  public allWorkers:Observable<customerDetails[]>;
  public dataNotCompleted:Observable<Appointment[]>;
  public dataCompleted:Observable<Appointment[]>;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  public urlProfile:string;
  public option='';
  public display=false;
  public currentWorker:Observable<customerDetails>;
  calendarOptions: CalendarOptions;
  title = 'luxury-massage';
  Events = []
  constructor(private usersService: UsersService,private bookingService: BookingService) { }

  ngOnInit(): void {
    this.allWorkers = this.usersService.workers; // subscribe to entire collection
    this.usersService.getAllWorkers();
    this.calendarOptions = {
      plugins: [ timeGridPlugin ],
      initialView: 'timeGridWeek',
      locale: heLocale,
      eventClick: this.eventClick.bind(this), // bind is important!
      eventBackgroundColor: "rgb(255,255,255)",
      eventBorderColor: "rgb(255,255,255)",
      eventColor: "rgb(0, 0, 0)",
      events: this.Events,
      height: 400,
      slotDuration: '01:00'
    };
  }

  async onChangeCurrentWorker(){
    // Clear events : ------------------------------
    this.Events = []
    var eventSources = this.calendarComponent.getApi().getEvents(); 
    var len = eventSources.length;
    for (var i = 0; i < len; i++) {
      eventSources[i].remove();
    } 
    // Clear events : ------------------------------
    if (this.option != 'עובדים'){
      var worker = this.option;

      this.currentWorker = this.usersService.worker; // subscribe to entire collection
      await this.usersService.getworkerById(worker);

      this.urlProfile = 'https://luxury-massages.com/profile/' + worker
      this.dataNotCompleted = this.bookingService.currentNotCompleted; // subscribe to entire collection
      await this.bookingService.getAppointmentByWorkerIDNotCompleted(worker);

      this.dataCompleted = this.bookingService.currentCompleted; // subscribe to entire collection
      this.bookingService.getAppointmentByWorkerIDCompleted(worker);
      await this.usersService.getAvailability(worker).subscribe((res:any[]) => {
        for (let event of res){
          this.Events.push({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), reason:event.reason, id:event.id,  color: '#9ACD32',display: 'background', allDay:event.allDay})
          this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, start:new Date(event.start), end:new Date(event.end), reason:event.reason, id:event.id,  color: '#9ACD32',display: 'background', allDay:event.allDay})
        }
      });
    } else{
      this.display = false
    }

  }

  eventClick(info) {
    Swal.fire({
      icon: 'question',
      title: 'למחוק את האילוץ ?',
      html:`<h5><br><p><strong>: סיבה</strong></p><p>${info.event.extendedProps.reason}</p></h5>`,
      showCancelButton: true,
      confirmButtonText: `כן`,
      cancelButtonText: `לא`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.calendarComponent.getApi().getEventById(info.event.extendedProps.dateStr + '-' + this.option)){
          this.Events = this.removeByValue(this.Events, info.event.extendedProps.dateStr + '-' + this.option);
          this.calendarComponent.getApi().getEventById(info.event.extendedProps.dateStr + '-' + this.option).remove();
          this.usersService.sendAvailability(this.option, this.Events).subscribe(res => {
            Swal.fire('אילוץ מבוטל', '', 'success')
          })
        }
      }
    })
  }

  eventContent(info, createElement) {
    let main = document.createElement('div')
    main.innerHTML = ' &#10004; ' + ' סיבה  '
    main.style.width = "100%";
    main.style.border = "1px solid #0000FF";
    main.style.borderRadius  = "15px";
    main.style.fontSize  = "1.5vw";
    return { domNodes: [main] }
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

  
}
