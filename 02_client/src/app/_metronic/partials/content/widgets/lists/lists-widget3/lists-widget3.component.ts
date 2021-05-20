import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { Subscription, Observable } from 'rxjs';
import {customerDetails} from '../../../../../core/models/customerDetails.model'



@Component({
  selector: 'app-lists-widget3',
  templateUrl: './lists-widget3.component.html',
})
export class ListsWidget3Component implements OnInit {
  public allWorkers:Observable<customerDetails[]>;
  public worker:customerDetails
  public subscription: Subscription;

  constructor(private cd: ChangeDetectorRef, private usersService: UsersService) {}

  ngOnInit(): void {
    this.allWorkers = this.usersService.workers; // subscribe to entire collection
    this.usersService.getAllWorkers();
  }

  refresh() {
    this.cd.detectChanges();
  }


  viewWorkerData(index){
    this.allWorkers.subscribe(workers => {
      this.worker = workers[index];
      Swal.fire({
        title: `פרטי עובד`,
        html: `<ul class="list-group">`+
                `<li class="list-group-item">${this.worker.fullname}  : שם מלא</li>`+
                `<li class="list-group-item">${this.worker.email} : כתובת דוא"ל</li>`+
                `<li class="list-group-item">${this.worker.address} : כתובת</li>`+
                `<li class="list-group-item">${this.worker.telephone} : טלפון</li>`+
              `</ul>`,
        showCancelButton: false,
        confirmButtonText: `סגור`,
      })
    })

  }
}
