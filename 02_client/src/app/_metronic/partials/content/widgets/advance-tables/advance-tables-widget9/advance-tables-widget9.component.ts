import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import studentsData from './review.json';
import { ItemServiceService } from 'src/app/_metronic/core/services/item-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';

interface Student {  
  img: String;
  name: String;  
  text: String;  

} 

@Component({
  selector: 'app-advance-tables-widget9',
  templateUrl: './advance-tables-widget9.component.html',
  styleUrls: ['./advance-tables-widget9.scss']
})
export class AdvanceTablesWidget9Component {
  students: Student[] = studentsData;  
  public allReviews:Observable<any[]>;
  public rating = 3;
  public name = ''
  public  message = ''
  public image;
  public newPhoto;
  public pattern = environment.apiUrl + 'review/image/';
  // Carouesl
  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
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

  onFileChange(event){
    this.image = event.target.files;
    console.log(event);
  }

  onClick(){
    this.itemServiceService.addReview({name:this.name, body:this.message, rating:this.rating}).subscribe((res:any)=>{
      if (this.image) {
        this.newPhoto = <File>this.image[0];
        console.log(this.newPhoto)
        console.log(typeof this.newPhoto)
        let fd = new FormData();
        fd.append('newReviewPicture', this.newPhoto, this.newPhoto.name);
        this.itemServiceService.addReviewImage(fd, res._id, this.newPhoto.name).subscribe((res)=>{
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
      } else {
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
      }

    })

  }
}
