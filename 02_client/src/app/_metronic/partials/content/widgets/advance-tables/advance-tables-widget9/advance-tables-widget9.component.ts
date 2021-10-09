import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import studentsData from './review.json';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-advance-tables-widget9',
  templateUrl: './advance-tables-widget9.component.html',
  styleUrls: ['./advance-tables-widget9.scss']
})
export class AdvanceTablesWidget9Component {
  students: any[] = studentsData;  
  public allReviews:Observable<any[]>;
  rating = 3;
  name = ''
  message = ''
  // Carouesl
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    navSpeed: 700,
    margin: 10,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      120: {
        items: 4
      }
    },
    nav: false
  }
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
