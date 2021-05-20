import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { Subscription, Observable } from 'rxjs';
import { Appointment } from '../../../../../core/models/appointment.model'
import { Router } from '@angular/router';



@Component({
  selector: 'app-advance-tables-widget2',
  templateUrl: './advance-tables-widget2.component.html',
})
export class AdvanceTablesWidget2Component implements OnInit {
  currentTab = 'Day';

  public dataNotCompleted:Observable<Appointment[]>;
  public currentData:Appointment
  public currentAvailableWorkers = []
  public scheduler=false;

  constructor(public bookingService: BookingService, private cd: ChangeDetectorRef, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.dataNotCompleted = this.bookingService.notCompleted; // subscribe to entire collection
    this.bookingService.getNotCompletedAppoitment();
  }
  
  viewAppointmentData(index){
    this.dataNotCompleted.subscribe(data => {
      this.currentData = data[index]
      Swal.fire({
        title: `הזמנה`,
        html: `<ul class="list-group">`+
                `<li class="list-group-item">${this.currentData.customerDetails.fullname}  : שם מלא</li>`+
                `<li class="list-group-item">${this.currentData.customerDetails.email} : כתובת דוא"ל</li>`+
                `<li class="list-group-item">${this.currentData.customerDetails.address} : כתובת</li>`+
                `<li class="list-group-item">${this.currentData.customerDetails.telephone} : טלפון</li>`+
                `<li class="list-group-item">מפיץ של הלקוח : ${this.currentData.customerDetails.distributor}</li>`+
                `<li class="list-group-item">שם טיפול : ${this.currentData.serviceDetails[0].name}</li>`+
                `<li class="list-group-item">${this.currentData.serviceDetails[0].price} : (₪) מחיר טיפול</li>`+
                `<li class="list-group-item">${this.currentData.serviceDetails[0].minutes} : (דק) זמן טיפול</li>`+
                `<li class="list-group-item">${this.currentData.dateStr} - ${this.currentData.timeStr} : תאריך טיפול</li>`+
                `<li class="list-group-item">${this.currentData.workerDetails.fullname} :  עובד להזמנה</li>`+
              `</ul>`,
        showCancelButton: false,
        confirmButtonText: `סגור`,
      })
    })

  }

  availableWorkers(datetime, minutes, appointmentId){
    this.usersService.getAvailableWorkers(datetime.toString(), minutes.toString()).subscribe((res:any) => {
      // var html = '<div class="list-group">'
      var selectOptions = {}
      this.currentAvailableWorkers = res
      this.currentAvailableWorkers.forEach((worker, index, object) => {
        // html += `<a><button class="list-group-item list-group-item-action cursor-pointer" id="${worker._id}" (click)="addWorker(${index}, '${appointmentId}')">${worker.fullname}</button></a>`
        selectOptions[`${index}`] = worker.fullname
      });
      // html += '</div>'
      const { value: worker } = Swal.fire({
        title: `עובדים פנויים`,
        // html: html,
        input: 'select',
        inputOptions : selectOptions,
        inputPlaceholder: 'תבחר עובד',
        showCancelButton: true,
        confirmButtonText: `בחר`,
        cancelButtonText: `סגור`,
      }).then((value) => {
        if (value.isConfirmed)
          this.addWorker(value.value, appointmentId)
      })
    });
  }

  addWorker(index, appointmentId){
    let worker = {workerID: this.currentAvailableWorkers[index]._id, fullname:this.currentAvailableWorkers[index].fullname, telephone:this.currentAvailableWorkers[index].telephone, email:this.currentAvailableWorkers[index].email}
    this.bookingService.addWorkerToAppointment(appointmentId, worker).subscribe((res)=>{
      this.bookingService.getNotCompletedAppoitment();
    })
  }



  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  toScheduler(){
    this.scheduler = !this.scheduler
    // this.router.navigate(['/dashboard/admin/scheduler'])
  }
}
