import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 


@Component({
  selector: 'app-advance-tables-widget9',
  templateUrl: './advance-tables-widget9.component.html',
})
export class AdvanceTablesWidget9Component {
  public allReviews:Observable<any[]>;
  rating = 3;
  name = ''
  message = ''
  constructor(private itemServiceService:ItemServiceService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.allReviews = this.itemServiceService.reviewActif; // subscribe to entire collection
    this.itemServiceService.getAllReviewsActif();
  }

  refresh() {
    this.cd.detectChanges();
  }

  onClick(){
    this.itemServiceService.addReview({name:this.name, body:this.message, rating:this.rating}).subscribe((res)=>{
      console.log(res)
      this.name = ''
      this.message = ''
      this.rating = 3
      this.allReviews = this.itemServiceService.reviewActif; // subscribe to entire collection
      this.itemServiceService.getAllReviewsActif();
      Swal.fire({
        icon: 'success',
        title: 'המלצה נשלח בהצלחה', 
        showConfirmButton: false,
        timer: 1500
      })
    })

  }
}
