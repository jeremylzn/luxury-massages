import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gallery } from 'src/app/_metronic/core/models/gallery.model';
import { GalleryService } from 'src/app/_metronic/core/services/gallery.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 


@Component({
  selector: 'app-gallery-gestion',
  templateUrl: './gallery-gestion.component.html',
  styleUrls: ['./gallery-gestion.component.scss']
})
export class GalleryGestionComponent implements OnInit {
  public gallery:Observable<Gallery[]>;
  public newPhoto;
  public pattern = 'https://luxury-massages.com/gallery/'
  constructor(private galleryService:GalleryService) { }

  ngOnInit(): void {

    this.gallery = this.galleryService.gallery; // subscribe to entire collection
    this.galleryService.getAllGallery();
  }


  onChangeActif(value, id){
    this.galleryService.updateActifGallery(id, value.target.checked).subscribe(res=>{})
  }

  onClickPlus(){
    Swal.fire({
      title:"הוספת תמונה לגלריה",
      html:'<form>'+
            // input file
            '<div class="form-group">'+
            '<label for="file">הוספת תמונה</label>'+
            '<input type="file" class="form-control-file" id="file">'+
            '</div>'+
            // input title
            '<div class="form-group">'+
            '<label for="inputf">כותרת</label>'+
            '<input type="email" class="form-control" id="inputf">'+
            '</div>' +
            // input text
            '<div class="form-group">'+
            '<label for="textarea">טקסט</label>'+
            '<textarea class="form-control" id="textarea" rows="3"></textarea>'+
            '</div></form>',
      preConfirm: function() {
        var title = (<HTMLInputElement>document.getElementById('inputf')).value
        var text = (<HTMLInputElement>document.getElementById('textarea')).value
        var file = (<HTMLInputElement>document.getElementById('file')).files[0]
        return [title, text, file]
      }
    }).then((result => {
      this.galleryService.addGallery({title:result.value[0], text:result.value[1]}).subscribe((res:any)=>{
        this.newPhoto = <File>result.value[2];
        let fd = new FormData();
        fd.append('newGalleryPicture', this.newPhoto, this.newPhoto.name);
        this.galleryService.addGalleryImage(fd, res._id, this.newPhoto.name).subscribe((res)=>{
          this.gallery = this.galleryService.gallery; // subscribe to entire collection
          this.galleryService.getAllGallery();
        })

      })

    }))




  }
}
