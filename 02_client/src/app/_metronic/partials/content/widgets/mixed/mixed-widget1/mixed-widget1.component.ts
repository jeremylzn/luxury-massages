import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { UsersService } from 'src/app/_metronic/core/services/users.service';

@Component({
  selector: 'app-mixed-widget1',
  templateUrl: './mixed-widget1.component.html',
})
export class MixedWidget1Component implements OnInit {

  constructor(private layout: LayoutService, private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  newWorker(){
    Swal.fire({
      title: `עובד חדש`,
      html: '<div class="form-group row">' +
      '<div class="col-12">'+
        '<input class="form-control" placeholder="שם מלא" name="fullname" type="text" id="swal-fullname">'+
      '</div> </div>' + 
      '<div class="form-group row">' +
      '<div class="col-12">'+
        `<input class="form-control" placeholder='דוא"ל' name="email" type="email" id="swal-email">`+
      '</div> </div>' + 
      '<div class="form-group row">' +
      '<div class="col-12">'+
        '<input class="form-control" placeholder="סיסמה" name="password" type="password" id="swal-password">'+
      '</div> </div>' + 
      '<div class="form-group row">' +
      '<div class="col-12">'+
        '<input class="form-control" placeholder="טלפון" name="telephone" type="number" id="swal-telephone">'+
      '</div> </div>' + 
      '<div class="form-group row">' +
      '<div class="col-12">'+
        '<input class="form-control" placeholder="כתובת" name="address" type="text" id="swal-address">'+
      '</div> </div>' + 
      '<div class="input-group row">' +
      '<div class="col-12 input-group-prepend">'+
      '<select class="custom-select" aria-label="select gender" id="swal-gender">'+
      '<option value="נקבה" selected>נקבה</option>'+
      '<option value="זכר" class="">זכר</option>'+
      '</select></div> </div>',
      showCancelButton: true,
      confirmButtonText: `שלח`,
      cancelButtonText: 'ביטול',
      preConfirm: function() {
        if ((<HTMLInputElement>document.getElementById('swal-fullname')).value && (<HTMLInputElement>document.getElementById('swal-email')).value && (<HTMLInputElement>document.getElementById('swal-password')).value && (<HTMLInputElement>document.getElementById('swal-telephone')).value && (<HTMLInputElement>document.getElementById('swal-address')).value){
          return {fullname: (<HTMLInputElement>document.getElementById('swal-fullname')).value,
          email: (<HTMLInputElement>document.getElementById('swal-email')).value,
          password : (<HTMLInputElement>document.getElementById('swal-password')).value,
          telephone : (<HTMLInputElement>document.getElementById('swal-telephone')).value,
          address: (<HTMLInputElement>document.getElementById('swal-address')).value,
          gender: (<HTMLInputElement>document.getElementById('swal-gender')).value,
          role: 2};
        } else return ''
      }
    })
    .then((result) => {
      if (result.isConfirmed && result.value){
        this.usersService.createWorker(result.value).subscribe(res => 
          { 
            this.usersService.getAllWorkers();
            Swal.fire('מעודכן', '', 'success')
          })
      } else {
        Swal.fire('חסר נתונים', '', 'error')
      }
        
    })

  }

  
}
