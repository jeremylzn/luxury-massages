import { Component, OnInit, Input, ChangeDetectorRef  } from '@angular/core';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/_metronic/core/services/booking.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { trigger, transition, animate, style } from '@angular/animations'
import { UsersService } from 'src/app/_metronic/core/services/users.service';
import { AdvertisingService } from 'src/app/_metronic/core/services/advertising.service';



@Component({
  selector: 'app-massages-list',
  templateUrl: './massages-list.component.html',
  styleUrls: ['./massages-list.component.scss']
})
export class MassagesListComponent implements OnInit {
  allData:any = []
  ads = []

  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private itemServiceService:ItemServiceService, private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private bookingService: BookingService, private usersService: UsersService, private advertisingService:AdvertisingService) { }

  ngOnInit(): void {
    // this.advertisingService.getAdsIds().subscribe((res)=>{
    //   for (let index in res){
    //     this.advertisingService.getAdsImage(res[index]).subscribe(x => {
    //       this.ads.push(x)
    //       this.refresh()
    //     })
    //   }
    // })


    // this.itemServiceService.getAllServicesActif().subscribe((res) => {
    //   this.allData = res
    //   this.refresh()
    // })
    if (localStorage.getItem(this.authLocalStorageToken)){
      this.bookingService.getAppointmentByCustomerID(JSON.parse(localStorage.getItem(this.authLocalStorageToken)).user._id).subscribe((res:any) => {
        var Events = []
        for (var item of res) {
          Events.push({title: ' טיפול ' + item.serviceDetails[0].name, date: item.dateStr, datetime: item.dateStr + ' - ' + item.timeStr, minutes: item.serviceDetails[0].minutes, fullname: item.customerDetails.fullname, address: item.customerDetails.address})
        }
        localStorage.setItem('Events', JSON.stringify(Events))
      })
    }
    
  }

  refresh() {
    this.cd.detectChanges();
  }
  



  openSwal(item){
    Swal.fire({
      title: item.name,
      html: `<p>${item.description}</p>` +
            `<hr>`+
            `<p> ₪ מחיר : ${item.price} </p>`+
            `<p>זמן : ${item.minutes} דק </p>`,
      showCancelButton: true,
      confirmButtonText: `להזמין`,
      cancelButtonText: `ביטול`,
    }).then((result) => {
      if (result.isConfirmed){
        if (localStorage.getItem(this.authLocalStorageToken)){
          localStorage.setItem('_id_service', JSON.stringify({name:item.name, price:item.price, minutes: item.minutes}));
          return this.router.navigate(['/dashboard/booking']);
        } else this.router.navigate(['/auth/login']);
      } 
    })

  }

}
