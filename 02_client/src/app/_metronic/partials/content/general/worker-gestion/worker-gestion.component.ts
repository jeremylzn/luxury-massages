import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import heLocale from '@fullcalendar/core/locales/he'; //Hebrew language
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/_metronic/core/models/appointment.model';
import { customerDetails } from 'src/app/_metronic/core/models/customerDetails.model';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { UsersService } from 'src/app/_metronic/core/services/users.service';

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
  public currentWorker:customerDetails;
  public urlProfile:string;
  calendarOptions: CalendarOptions;
  title = 'luxury-massage';
  Events = []
  constructor(private usersService: UsersService,private bookingService: BookingService) { }

  ngOnInit(): void {
    this.allWorkers = this.usersService.workers; // subscribe to entire collection
    this.usersService.getAllWorkers();
    console.log(this.allWorkers)
  }

  onChangeCurrentWorker(worker){
    this.currentWorker = worker;
    this.urlProfile = 'https://luxury-massages.com/profile/' + worker._id
    console.log(this.urlProfile)
    this.dataNotCompleted = this.bookingService.currentNotCompleted; // subscribe to entire collection
    this.bookingService.getAppointmentByWorkerIDNotCompleted(worker._id);

    this.dataCompleted = this.bookingService.currentCompleted; // subscribe to entire collection
    this.bookingService.getAppointmentByWorkerIDCompleted(worker._id);

    this.usersService.getAvailability(worker._id).subscribe((res:any[]) => {
      this.Events = res
      for (let event of res)
        this.calendarComponent.getApi().addEvent({dateStr:event.dateStr, date:event.date, id:event.dateStr + '-' + worker._id})
    });
    this.calendarOptions = {
      initialView: 'dayGridWeek',
      locale: heLocale,
      // eventClick: this.eventClick.bind(this), // bind is important!
      eventBackgroundColor: "rgb(255,255,255)",
      eventBorderColor: "rgb(255,255,255)",
      eventColor: "rgb(0, 0, 0)",
      height: 210,
      eventContent: this.eventContent.bind(this),
      events: this.Events,
    };
  }


  eventContent(info, createElement) {
    let main = document.createElement('div')
    main.innerHTML = '&#10004;'

    return { domNodes: [main] }
  }
}
