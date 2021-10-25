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


  onClickCreate(){
    var steps = [
      {
        title: 'שם מלא',
        input: 'text',
        inputValidator: (value) => {
        return !value && 'חסר נתון'
        }
      },
      {
        title: 'טקסט',
        html:this.textareaCreation(),
        preConfirm: function() {
          if ((<HTMLInputElement>document.getElementById('swal-body')).innerHTML){
            var text = (<HTMLInputElement>document.getElementById('swal-body')).innerHTML
            return text
          } else return ''
        }
      },
      {
        title: 'תמונה',
        input: 'file'
      }
    ];
    Swal.mixin({
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue(steps).then((result) => {
      if (result.value) {
        this.itemServiceService.addReview({name:result.value[0], body:result.value[1], rating:this.rating}).subscribe((res:any)=>{
          if (result.value[2]) {
            this.newPhoto = <File>result.value[2];
            let fd = new FormData();
            let nameImage = (((((this.newPhoto.name.split(' ').join('_')).split('-').join('')).split('(').join('')).split(')').join('')).split('1').join('')).toLowerCase()
            fd.append('newReviewPicture', this.newPhoto, nameImage);
            this.itemServiceService.addReviewImage(fd, res._id, nameImage).subscribe((res)=>{
              this.allReviews = this.itemServiceService.reviewActif; // subscribe to entire collection
              this.itemServiceService.getAllReviewsActif();
            })
          } else {
            this.allReviews = this.itemServiceService.reviewActif; // subscribe to entire collection
            this.itemServiceService.getAllReviewsActif();
          }
        })

      }
    })
}

textareaCreation(){
  return `<div id="swal-body" dir="rtl" style="border: 3px inset grey; height: 100px; width: 100%; text-align: right; overflow-x: hidden; overflow-y: auto;" contenteditable="true">`+
          `</div>`+
          `<fieldset style="margin: 2px auto 15px;  width: 100%;">`+
          `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand('italic',false,null);" title="Italicize Highlighted Text"><i>I</i>`+
          `</button>`+
          `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand( 'bold',false,null);" title="Bold Highlighted Text"><b>B</b>`+
          `</button>`+
          `<button style="width: 5ex; text-align: center; padding: 1px 3px;" onclick="document.execCommand( 'underline',false,null);"><u>U</u>`+
          `</button>`+
          `</fieldset>`
}

}
